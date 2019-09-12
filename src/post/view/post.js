import React, {Component, useState} from 'react';
import {Link, withRouter, Route} from "react-router-dom";
import config from '../../config.js';
import {connect} from 'react-redux'
import Cookies from 'js-cookie';
import './post.css';
import fetch from "cross-fetch";
import {collectionPost, likePost, requestPost} from "../../home/Actions";


const li = (data, loginUser, likeComment, postId) => {
    return <li className='post-comment-li'>
        <div>

            <div>
                <Link to={`/user/${data.userId}`} className='userid'>{data.userId} </Link>
                <span className='comment-text'>{data.text}</span>
                <span
                    className={data.like.findIndex((item) => item === loginUser) === loginUser ? 'unlike-reply' : 'like-reply'}> </span>
            </div>
        </div>
    </li>
};
const jumpRoute = () => window.location.pathname = '/login';
const Post = (data, loginUser, likePost, collectionPost, likeComment, avatar) => {
    let value = data.likeUser.findIndex((item) => item === loginUser);
    let list = data.comment.length <= 0 ? '' : data.comment.map((item) => {
        return li(item, loginUser, likeComment, data.postId)
    });
    let label = data.label.map((item) => {
        return <span className='label-text-style'>{`#${item} `}</span>
    });
    return <div key={data._id} className='post'>
        <div className='post-userInfo'>
            <div className='avatar'>
                <img src={config.url + 'image/' + avatar}/>
            </div>
            <span className='userid'>{data.userId}</span>
        </div>
        <div className='post-image'>
            <img src={config.url + 'image/' + data.pictureUrl[0]}/>
        </div>
        <div className='post-operating'>
            <div className='button'>
                <span className={value >= 0 ? 'like' : 'unlike'}
                      onClick={() => {
                          loginUser === undefined ? jumpRoute() : likePost(data._id, loginUser)
                      }}> </span>
                <Link to={`/comment/${data._id}`}><span className='comment'> </span></Link>
                <span className='share'> </span>
                <span
                    className={data.CollectionUser.findIndex((item) => item === loginUser) >= 0 ? 'collection' : 'unCollection'}
                    onClick={() => {
                        loginUser === undefined ? jumpRoute() : collectionPost(data._id, loginUser)
                    }}> </span>
            </div>
            <span className='likeNum'>{data.likeUser.length} 次赞</span>
            <div className='postText'>
                <Link to={`/user/${data.userId}`}>{data.userId + ' '}</Link><span>{label} {data.text}</span>
            </div>
            <div className='post-comment'>
                <Link to={`/comment/${data._id}`}><span
                    className='comment-num'>{`全部 ${data.comment.length} 条评论`}</span></Link>
                <div className='comment'>
                    <ul>
                        {list[0]}
                        {list[1]}
                    </ul>
                </div>
                <span className='timeDifferent'>{data.createTime}</span>
            </div>
        </div>
    </div>

};

// export default Post;


class PostSingle extends Component {
    constructor() {
        super(...arguments);
    }

    componentDidMount() {
        this.props.requestPost(this.props.postId);
    }

    render() {
        const {data} = this.props;
        const loginUser = Cookies.get('u_id');
        let Placeholder = <div className='Placeholder'>
            <div className='Placeholder-one'></div>
            <div className='Placeholder-two'></div>
            <div className='Placeholder-three'></div>
            <div className='Placeholder-four'></div>
        </div>;
        return (
            <div>
                {data[this.props.postId] === undefined ?
                    Placeholder :
                    Post(data[this.props.postId], loginUser, this.props.likePost, this.props.collectionPost, null, data[this.props.postId].pictureUrl[data[this.props.postId].pictureUrl.length-1])}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.homeReducer,
        loginUser: Cookies.get('u_id')
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        requestPost: (postId) => {
            dispatch(requestPost(postId))
        },
        likePost: (postId, userId) => {
            dispatch(likePost(postId, userId))
        },
        collectionPost: (postId, userId) => {
            dispatch(collectionPost(postId, userId))
        },
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSingle))
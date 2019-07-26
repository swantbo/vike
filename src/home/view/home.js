import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import {ReFresh, likePost, collectionPost, likeComment, requestPost} from "../Actions";
import {view as Post} from '../../post';
import Cookies from 'js-cookie';
import './home.css';
import fetch from "cross-fetch";
import config from "../../config";

class Home extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            avatar: 0
        }
    }


    render() {
        let li  = this.props.postId.map((item)=>{
            return Post(this.props.data[item],this.props.loginUser,this.props.likePost,this.props.collectionPost,this.props.likeComment)
        });
        return (
            <div className='Home'>
                {li}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list:state.headerReducer,
        postId:Object.keys(state.homeReducer),
        data:state.homeReducer,
        loginUser:Cookies.get('u_id')
    }
};
const mapDispatchToProps = (dispatch)=>{

    return{
        requestPost:(postId)=>{
          dispatch(requestPost(postId))
        },
        likePost:(postId,userId)=>{
            dispatch(likePost(postId,userId))
        },
        collectionPost:(postId,userId)=>{
            dispatch(collectionPost(postId,userId))
        },
        likeComment:(postId,commentId,userId)=>{
            dispatch(likeComment(postId,commentId,userId))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
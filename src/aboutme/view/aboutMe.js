import React, {Component} from 'react';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {Link, withRouter} from "react-router-dom";
import config from '../../config.js';
import {requestLoginUserInfo} from '../Actions.js';
import {myPost} from "../Actions";
import './aboutMe.css';

const categoryList = (num, text) => {
    return <div className='categoryList'>
        <p className='num'>{num}</p>
        <p>{text}</p>
    </div>
};
const listIcon = (className, click) => {
    return <span onClick={() => click(className)} className={className + ' ' + 'listIcon'}>
        <span></span>
    </span>
};
const setList = (url, text) => {
    return <li><Link to={`/${url}`}/>{text}<span></span></li>
};
const labelList = (labelName, img) => {
    return <div key={labelName} className='userPost_List_image'>
        <Link to={`/post/${labelName}`}>
            <img src={config.url + '/image/' + img}/>
        </Link>
    </div>
};

class AboutMe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: true,
            categoryName: ['帖子', '粉丝', '正在关注'],
            icon: ['grid', 'Collection'],
            setListUrl: [{url: 'edit', text: '编辑主页'}, {
                url: 'changePassword',
                text: '更改密码'
            }, {url: 'privacy_and_security', text: '隐私和安全'}, {url: 'help', text: '帮助中心'}, {
                url: 'us',
                text: '关于我们'
            }, {url: '', text: '退出'}]
        };
        this.changListOne = this.changListOne.bind(this);
    }

    // componentDidMount() {
    //     this.props.requestLoginUserInfo(Cookies.get('u_id'))
    // }
    changListOne(str) {
        if (str === 'grid') {
            this.props.myPost(this.props.posts);
            this.setState({list: true})
        } else {
            this.props.myPost(this.props.myColl);
            this.setState({list: false})
        }

    }

    render() {
        const {myPost, myCollection, dataState, requesting, avatar, userId, website, Introduction, userName, posts, myFens, myFriends, option} = this.props;
        let webUrl = 'http://' + website;
        console.log(posts);
        let loading = (text) => <div className='aboutMe-loading'>
            <div>{text}</div>
        </div>;
        let listIconArr = this.state.icon.map((item) => {
            return listIcon(item, this.changListOne)
        });
        let setPage = this.state.setListUrl.map((item) => {
            return setList(item.url, item.text)
        });
        let labelImage = this.state.list ? Object.keys(myPost).length<=0?<div></div>:Object.keys(myPost).map((i) => {
            labelList(i, myPost[i])
        }) : Object.keys(myCollection).map((i) => {
            labelList(i, myCollection[i])
        });
        let aboutMe = dataState === 0 ? loading('数据加载中……') : dataState === -1 ? loading('数据请求错误！') : option ?
            <div className='aboutMe_box'>
                <div className='userInfo'>
                    <div className='avatar' onClick={this.onTest}>
                        <img src={`${config.url}image/${avatar}`}/>
                    </div>
                    <div className='userId'>
                        <h2>{userName}</h2>
                        <span></span>
                    </div>
                    <Link to='/edit'>
                        <div className='button'>
                            编辑主页
                        </div>
                    </Link>
                    <div className='introduction'>
                        <p className='username'>{userId}</p>
                        <p>{Introduction}</p>
                        <a target='_blank' href={webUrl}>{website}</a>
                    </div>
                </div>
                <div className='userPostAndFriends'>
                    {this.state.categoryName.map((item) => {
                        return categoryList(item === '帖子' ? posts.length : item === '粉丝' ? myFens.length : myFriends.length, item)
                    })}
                </div>
                <div className='userPost'>
                    <div className='userPost_List'>
                        {listIconArr}
                        {labelImage}
                    </div>
                </div>
            </div> : <div className='setPage'>
                <div>账户</div>
                <ul>
                    {setPage}
                </ul>
            </div>;
        return (
            aboutMe
        )
    }
}

const mapStateToProps = (state) => {
    return {
        requesting: state.aboutMeReducer.requesting,
        userName: state.aboutMeReducer.loginUserInfo.userName,
        userId: state.aboutMeReducer.loginUserInfo.userId,
        email: state.aboutMeReducer.loginUserInfo.email,
        avatar: state.aboutMeReducer.loginUserInfo.avatar,
        Introduction: state.aboutMeReducer.loginUserInfo.Introduction,
        website: state.aboutMeReducer.loginUserInfo.website,
        gender: state.aboutMeReducer.loginUserInfo.gender,
        addTime: state.aboutMeReducer.loginUserInfo.addTime,
        posts: state.aboutMeReducer.loginUserInfo.posts,
        myFens: state.aboutMeReducer.loginUserInfo.myFens,
        myFriends: state.aboutMeReducer.loginUserInfo.myFriends,
        myColl: state.aboutMeReducer.loginUserInfo.myCollection,
        isActive: state.aboutMeReducer.loginUserInfo.isActive,
        isRecommend: state.aboutMeReducer.loginUserInfo.isRecommend,
        isPrivate: state.aboutMeReducer.loginUserInfo.isPrivate,
        dataState: state.aboutMeReducer.dataState,
        option: state.headerReducer.isShowOptions,
        myPost: state.aboutMeReducer.myPost,
        myCollection: state.aboutMeReducer.myColl
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        requestLoginUserInfo: (name) => {
            dispatch(requestLoginUserInfo(name))
        },
        myPost: (arr) => {
            dispatch(myPost(arr))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AboutMe));
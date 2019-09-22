import React, {Component} from 'react';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {Link, withRouter} from "react-router-dom";
import config from '../../config.js';
import {requestLoginUserInfo, requestOtherUser} from '../Actions.js';
import {myPost,follow,requestMany} from "../Actions";
import './aboutMe.css';

const categoryList = (num, text,fuck) => {
    let link = '';
    if (text==='粉丝'&&fuck==='me'){
        link='/friendsList?status=1&a=1'
    }else if (text==='正在关注'&&fuck==='me'){
        link='/friendsList?status=2&a=1'
    }else if (text==='粉丝'&&fuck==='other'){
        link='/friendsList?status=1&a=2'
    }else if (text==='正在关注'&&fuck==='other'){
        link='/friendsList?status=2&a=2'
    }
    return <Link onClick={text==='帖子'?(e)=>e.preventDefault():''} className='categoryList-a' to={link}>
        <div className='categoryList'>
            <p className='num'>{num}</p>
            <p>{text}</p>
        </div>
    </Link>

};
const listIcon = (className, click, id) => {
    let temp;
    if (id === true && className === 'grid') {
        temp = className + 'Action';
    } else if (id === false && className === 'Collection') {
        temp = className + 'Action';
    } else {
        temp = className
    }
    return <span onClick={() => click(className)} className={temp + ' ' + 'listIcon'}>
        <span></span>
    </span>
};
const setList = (url, text) => {
    return <li onClick={text==='退出'?()=>Cookies.remove('u_id'):''}><Link to={`/${url}`}/>{text}<span></span></li>
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

    componentDidMount() {
        if (this.props.user === 'other') {
            this.props.requestOtherUser(window.location.pathname.match('[^/]+(?!.*/)')[0])
        }
    }

    changListOne(str) {
        if (str === 'grid') {
            this.props.requestMyPost(this.props.UserInfo.posts, null, true);
            this.setState({list: true})
        } else {
            this.setState({list: false});
            if (this.props.user === 'me') {
                this.props.requestMyPost(this.props.UserInfo.myCollection, null, false);
            }
            return true;


        }

    }

    render() {
        const {isPrivate, avatar, userId, website, Introduction, userName, posts} = this.props.UserInfo;
        const {myFriends,myFens} = this.props;
        let webUrl = 'http://' + website;
        let loading = (text) => <div className='aboutMe-loading'>
            <div>{text}</div>
        </div>;

        let listIconArr = this.props.user === 'me' ? this.state.icon.map((item) => {
            return listIcon(item, this.changListOne, this.state.list)
        }) : '';
        let setPage = this.state.setListUrl.map((item) => {
            return setList(item.url, item.text)
        });
        let imageList = this.state.list ? this.props.myPost : this.props.myColl;
        let labelImage = Object.keys(imageList).length <= 0 ? <div></div> : Object.keys(imageList).map((i) => {
            return labelList(i, imageList[i])
        });
        let aboutMe = myFriends===undefined||myFens===undefined||Object.keys(this.props.UserInfo).length<0 ? loading('数据加载中……') : this.props.dataState === -1 ? loading('数据请求错误！') : this.props.option ?
            <div className='aboutMe_box'>
                <div className='userInfo'>
                    <div className='avatar' onClick={this.onTest}>
                        <img src={`${config.url}image/${avatar}`}/>
                    </div>
                    <div className='userId'>
                        <h2>{userName}</h2>
                        <span></span>
                    </div>
                    {this.props.user === 'me' ? <Link className='errrrrrrrr' to='/edit'>
                        <div className='button'>
                            编辑主页
                        </div>
                    </Link> : <div onClick={()=>this.props.follow(Cookies.get('u_id'),userId)} className='errrrrrrrre'>
                        <div style={myFens.find((i) => i === Cookies.get('u_id')) === undefined ? {
                            background: '#1679ff',
                            color: '#ffffff'
                        } : {background: '#ffffff', color: '#6b6b6b'}} className='button'>
                            {myFens.find((i) => i === Cookies.get('u_id')) === undefined ? '关注' : '取消关注'}
                        </div>
                    </div>}
                    <div className='introduction'>
                        <p className='username'>{userId}</p>
                        <p>{Introduction}</p>
                        <a target='_blank' href={webUrl}>{website}</a>
                    </div>
                </div>
                <div className='userPostAndFriends'>
                    {this.state.categoryName.map((item) => {
                        return categoryList(item === '帖子' ? posts.length || 0 : item === '粉丝' ? myFens.length || 0 : myFriends.length || 0, item,this.props.user)
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
    let stateUserInfo, user;
    if (window.location.pathname.match(/\/aboutme/) !== null) {
        stateUserInfo = state.aboutMeReducer.loginUserInfo;
        user = 'me'
    } else if (window.location.pathname.match(/\/user/) !== null) {
        stateUserInfo = state.aboutMeReducer.otherUserInfo;
        user = 'other'
    }
    return {
        UserInfo: stateUserInfo,
        myFriends:stateUserInfo.myFriends,
        myFens:stateUserInfo.myFens,
        dataState: state.aboutMeReducer.dataState,
        myPost: state.aboutMeReducer.myPost,
        myColl: state.aboutMeReducer.myColl,
        option: state.headerReducer.isShowOptions,
        user: user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        requestLoginUserInfo: (name) => {
            dispatch(requestLoginUserInfo(name))
        },
        requestMyPost: (arr, userId, id) => {
            dispatch(myPost(arr, userId, id))
        },
        requestOtherUser: (userId) => {
            dispatch(requestOtherUser(userId))
        },
        follow:(userId,followId)=>{
            dispatch(follow(userId,followId))
        },
        requestMany:(userId)=>{
            dispatch(requestMany(userId))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AboutMe));
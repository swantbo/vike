import React,{Component} from "react";
import {withRouter,Link} from "react-router-dom";
import {connect} from 'react-redux';
import fetch from "cross-fetch";
import Cookies from "js-cookie";
import {follow,requestMany} from "../Actions";
import './friends.css';
import config from "../../config";

const userList = (userId,userName,url,onClick,status)=>{
    return(
        <div className='friendSingle'>
            <Link className='friendSingle-link' to='/userId'>
                <div className='link-avatar'><img src={config.url + '/image/' + url}/></div>
                <div className='link-text'>
                    <span className='id'>{userId}</span>
                    <span className='name'>{userName}</span>
                </div>
                <div onClick={onClick} className='but'></div>
            </Link>
        </div>
    )
};

function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
class FriendsList extends Component{
    constructor(){
        super(...arguments);
        this.state={
            list:-1,
            status:getQueryString('status')
        }
    }
    changeList(){
        this.setState({list:1})
    }
    changeList2(){
        this.setState({list:-1})
    }
    componentDidMount() {
        this.props.requestMany(Cookies.get('u_id'))
    }

    render() {
        const friends = this.props.friends;
        return(
            Object.keys(friends).length>0?
            <div className='friends'>
                <div className='friendsHeader'>
                    <span className='fens'>{friends.fens.length}个粉丝</span>
                    <span className={'follows'}>已关注{friends.follows.length}</span>
                </div>
                <div className='friendsList'>
                    {this.state.list===-1?friends.fens.map((i)=>{
                        return userList(i.userId,i.userName,i.avatar,this.props.follow,i.status)
                    }):friends.follows.map((i)=>{
                        return userList(i.userId,i.userName,i.avatar,this.props.follow,i.status)
                    })}
                </div>
            </div>:<div className='Placeholder-chart'>
                    <span></span>
                    <span></span>
                </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        friends: state.aboutMeReducer.friends
    }
};
const mapDispatchToProps=(dispatch)=>{
    return{
        follow:(userId,followId)=>{
            dispatch(follow(userId,followId))
        },
        requestMany:(userId)=>{
            dispatch(requestMany(userId))
        }
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FriendsList))
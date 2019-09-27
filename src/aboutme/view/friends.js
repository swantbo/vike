import React, {Component} from "react";
import {withRouter, Link} from "react-router-dom";
import {connect} from 'react-redux';
import fetch from "cross-fetch";
import Cookies from "js-cookie";
import Button from "antd/es/button";
import 'antd/dist/antd.css'
import {follow, requestMany} from "../Actions";
import './friends.css';
import config from "../../config";

const userList = (userId, userName, url, onClick, status, a) => {
    return (
        <div className='friendSingle'>
            <div className='link-avatar'><img src={config.url + '/image/' + url}/></div>
            <div className='link-text'>
                <Link className='friendSingle-link' to={`/user/${userId}`}>
                    <span className='id'>{userId}</span>
                </Link>
                <span className='name'>{userName}</span>
            </div>
            {
                a === 1 ? <Button onClick={() => {onClick(Cookies.get('u_id'), userId)}} className='but'
                                  type={status === -1 ? "primary" : ""}>{status === -1 ? '关注ta' : '已关注'}</Button> :a!==1&&status===-1?
                    <Button onClick={()=>{onClick(Cookies.get('u_id'),userId)}} type='primary' className='but'>关注</Button>:''

            }
        </div>
    )
};

function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

class FriendsList extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            status: parseInt(getQueryString('status')),
            friends: this.props.friends,
            a: parseInt(getQueryString('a')),
            temp:1
        };
        this.request = this.request.bind(this);
        // this.changeFriend = this.changeFriend.bind(this);
    }

    changeList() {
        this.setState({status: 1})
    }

    changeList2() {
        this.setState({status: 2})
    }

    request() {
        if (this.state.a === 1) {
            this.props.requestMany(Cookies.get('u_id'))
        } else if (this.state.a === 2) {
            this.props.requestMany(this.props.otherUserInfo.userId)
        }
    }

    componentDidMount() {
        this.request();
    }
    changeFriend(a){
        let that = this;
    }
    render() {
        // const friends = this.state.friends;
        const A = this.props.A;
        const B=this.props.B;
        let that = this;
        return (
            A.length > 0||B.length>0 ?
                <div className='friends'>
                    <div className='friendsHeader'>
                        <span onClick={this.changeList.bind(this)}
                              className={that.state.status === 1 ? 'Action' : ''}>{A.length}个粉丝</span>
                        <span onClick={this.changeList2.bind(this)}
                              className={that.state.status === 2 ? 'Action' : ''}>已关注{B.length}</span>
                    </div>
                    <div className='friendsList'>
                        {this.state.status === 1 ? A.map((i) => {
                            return userList(i.userId, i.userName, i.avatar, this.props.follow, i.status, this.state.a)
                        }) : B.map((i) => {
                            return userList(i.userId, i.userName, i.avatar, this.props.follow, i.status, this.state.a)
                        })}
                    </div>
                </div> : <div className='Placeholder-chart'>
                    <span></span>
                    <span></span>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        A:state.aboutMeReducer.A,
        B:state.aboutMeReducer.B,
        // friends: state.aboutMeReducer.friends,
        otherUserInfo: state.aboutMeReducer.otherUserInfo,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId, followId) => {
            dispatch(follow(userId, followId))
        },
        requestMany: (userId) => {
            dispatch(requestMany(userId))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FriendsList))
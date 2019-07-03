import React, {Component} from 'react';
import {connect} from 'react-redux';
import config from '../../config.js';
import {Link, Route, withRouter} from "react-router-dom";
import fetch from 'cross-fetch'
import {timeDifferent} from "../../tool/tool";
import {likeComment, replyComment, inputComment} from "../../home/Actions";
import './comment.css'


class SingleComment extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            commentUserId:this.props.commnetUserId,
            commentUserAvatar:'defaultAvatar.png',
            singleComment:this.props.singleComment,
            loginUser:this.props.loginUser,
        }
    }

    componentDidMount() {
        fetch(config.avatar+`userId=${this.state.commentUserId}`,{method: 'GET'}).then(response=>response.json()).then(
            json=>{this.setState({commentUserAvatar:json.avatar})}
        ).catch(this.setState({commentUserAvatar:'defaultAvatar.png'}))
    }

    render() {
        return (
            <li className='SingleComment'>
                <div className='SingleComment-userAvatar'>
                    <img src={require('../../image/userAvatar/'+this.state.commentUserAvatar)}/>
                </div>
                <div className='SingleComment-text'><Link to={`/user/${this.state.commentUserId}`}>{this.state.singleComment.userId+' '}</Link><span>{this.state.singleComment.text}</span></div>
                <span className={this.state.singleComment.like.find((item)=>item===this.state.loginUser.userId)===this.state.loginUser.userId?'SingleComment-like':'SingleComment-unlike'}> </span>
            </li>
        )
    }
}


class Comment extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            postUserAvatar: 'defaultAvatar.png',
            myAvatar: this.props.loginUser.avatar || 'defaultAvatar.png',
            postId: this.props.match.params.paramName
        }

    };

    componentDidMount() {
        fetch(config.avatar + `userId=${this.props.commentData[this.state.postId].userId}`, {method: 'GET'}).then(response => response.json()).then(
            json => {
                this.setState({postUserAvatar: json.avatar})
            }
        ).catch(this.setState({postUserAvatar: 'defaultAvatar.png'}))
    }

    render() {
        const commentData = this.props.commentData[this.state.postId];

        return (<div className='Comment'>
            <div className='Comment-postText'>
                <div className='Comment-postText-avatar'><img
                    src={require('../../image/userAvatar/' + this.state.postUserAvatar)} alt={'434'}/></div>
                <div className='Comment-postText-text'><Link
                    to={`/user/${commentData.userId}`}>{commentData.userId + ' '}</Link><span>{commentData.postText}</span>
                </div>
                <span
                    className='Comment-postText-time'>{timeDifferent(new Date().getTime(), commentData.sendPostTime)}</span>
            </div>
            <ul>
                <SingleComment singleComment={commentData.comment[0]} loginUser={this.props.loginUser}/>
            </ul>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        commentData: state.homeReducer,
        loginUser: state.aboutMeReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        replyComment: (postId, commentId, userId, replyId, text) => {
            dispatch(replyComment(postId, commentId, userId, replyId, text))
        },
        inputComment: (postId, text, userId) => {
            dispatch(inputComment(postId, text, userId))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment))
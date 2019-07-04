import React, {Component} from 'react';
import {connect} from 'react-redux';
import config from '../../config.js';
import {Link, Route, withRouter} from "react-router-dom";
import fetch from 'cross-fetch'
import {timeDifferent} from "../../tool/tool";
import {likeComment, replyComment, inputComment} from "../../home/Actions";
import './comment.css'

class SingleReply extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            replyUserAvatar:'defaultAvatar.png',
        }
    }
    componentDidMount() {
        fetch(config.avatar + `userId=${this.props.singleReply.userId}`, {method: 'GET'}).then(response => response.json()).then(
            json => {
                this.setState({replyUserAvatar: json.avatar})
            }
        ).catch(this.setState({replyUserAvatar: 'defaultAvatar.png'}))
    }

    render() {
        console.log(this.props.singleReply);
        return (
            <li className='SingleReply'>
                <div className='replyAvatar'>
                    <img src={require('../../image/userAvatar/' + this.state.replyUserAvatar)}/>
                </div>
                <div className='replyuser'>
                    <Link to={`/user/${this.props.singleReply.userId}`}>{this.props.singleReply.userId}</Link> 回复 <Link to={`/user/${this.props.singleReply.reply}`}>{this.props.singleReply.reply}</Link><span className='replytext'>{this.props.singleReply.text}</span>
                 </div>

            </li>
        )
    }
}

class SingleComment extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            commentUserId: this.props.commnetUserId,
            commentUserAvatar: 'defaultAvatar.png',
            singleComment: this.props.singleComment,
            loginUser: this.props.loginUser,
        }
    }

    componentDidMount() {
        fetch(config.avatar + `userId=${this.state.commentUserId}`, {method: 'GET'}).then(response => response.json()).then(
            json => {
                this.setState({commentUserAvatar: json.avatar})
            }
        ).catch(this.setState({commentUserAvatar: 'defaultAvatar.png'}))
    }

    render() {
        let that = this;
        let singleReply = this.state.singleComment.reply.length>=1?this.state.singleComment.reply.map((item,index)=>{
            return <SingleReply singleReply={that.state.singleComment.reply[index]}/>
        }):'';
        return (
            <li className='SingleComment'>
                <div className='SingleComment-userAvatar'>
                    <img src={require('../../image/userAvatar/' + this.state.commentUserAvatar)}/>
                </div>
                <div className='SingleComment-text'><Link
                    to={`/user/${this.state.commentUserId}`}>{this.state.singleComment.userId + ' '}</Link><span>{this.state.singleComment.text}</span>
                    <span
                        className='SingleComment-time'>{timeDifferent(new Date().getTime(), this.state.singleComment.time)}</span>
                    <span className='SingleComment-likeNum'>{this.state.singleComment.like.length}次赞</span>
                    <span className='SingleComment-reply'>回复</span>
                </div>
                <span
                    className={this.state.singleComment.like.find((item) => item === this.state.loginUser.userId) === this.state.loginUser.userId ? 'SingleComment-like' : 'SingleComment-unlike'}> </span>
                <div className={this.state.singleComment.reply.length >= 1 ? 'showReplyNum' : 'unshowReplyNum'}>
                    <span></span>查看回复
                </div>
                <ul>
                    {singleReply}
                </ul>
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
        let that = this;
        let single = commentData.comment.map((item, index) => {
            return <SingleComment singleComment={commentData.comment[index]} loginUser={that.props.loginUser}/>
        });
        return (
            <div className='Comment-Box'>
                <div className='Comment-input'>
                    <div className='Comment-input-ava'><img
                        src={'http://www.xwvike.com/static/media/26395177.cd83fabd.jpeg'}/></div>
                    <from className='Comment-inputtext'>
                        <textarea placeholder='添加评论' maxLength='256'></textarea>
                        <button type='submit'>发布</button>
                    </from>
                </div>
                <div className='Comment'>
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
                        {single}
                        {/*<SingleComment singleComment={commentData.comment[0]} loginUser={this.props.loginUser}/>*/}
                    </ul>
                </div>
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
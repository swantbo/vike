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
            replyUserAvatar: 'defaultAvatar.png',
        }
    }

    componentDidMount() {
        fetch(config.url+'/getUserInfo?'`userId=${this.props.singleReply.userId}`, {method: 'GET'}).then(response => response.json()).then(
            json => {
                this.setState({replyUserAvatar: json.avatar})
            }
        ).catch(this.setState({replyUserAvatar: 'defaultAvatar.png'}))
    }

    render() {
        return (
            <li className='SingleReply'>
                <div className='replyAvatar'>
                    <img src={config.url+'/image/'+this.state.replyUserAvatar}/>
                </div>
                <div className='replyuser'>
                    <Link to={`/user/${this.props.singleReply.userId}`}>{this.props.singleReply.userId}</Link> 回复 <Link
                    to={`/user/${this.props.singleReply.reply}`}>{this.props.singleReply.reply + ' '}</Link><span
                    className='replytext'>{this.props.singleReply.text}</span>
                    <span
                        className='replyTime'>{timeDifferent(new Date().getTime(), this.props.singleReply.time)}</span>
                    <span onClick={() => this.props.changereply(this.props.singleReply.userId)}
                          className='reply'>回复</span>
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
            showReply: -1,
            replying: this.props.replying,
        };
        this.showReply = this.showReply.bind(this);
    }

    componentDidMount() {
        fetch(config.url+'/getUserInfo?'`userId=${this.state.commentUserId}`, {method: 'GET'}).then(response => response.json()).then(
            json => {
                this.setState({commentUserAvatar: json.avatar})
            }
        ).catch(this.setState({commentUserAvatar: 'defaultAvatar.png'}))
    }

    showReply() {
        this.setState({showReply: this.state.showReply * -1})
    }

    render() {
        let that = this;
        let singleReply = this.state.singleComment.reply.length >= 1 ? this.state.singleComment.reply.map((item, index) => {
            return <SingleReply changereply={this.props.changereply}
                                singleReply={that.state.singleComment.reply[index]}/>
        }) : '';
        return (
            <li className='SingleComment'>
                <div className='SingleComment-userAvatar'>
                    <img src={config.url+'image/' + this.state.commentUserAvatar}/>
                </div>
                <div className='SingleComment-text'><Link
                    to={`/user/${this.state.commentUserId}`}>{this.state.singleComment.userId + ' '}</Link><span>{this.state.singleComment.text}</span>
                    <span
                        className='SingleComment-time'>{timeDifferent(new Date().getTime(), this.state.singleComment.time)}</span>
                    <span className='SingleComment-likeNum'>{this.state.singleComment.like.length}次赞</span>
                    <span onClick={() => this.props.changereply(this.state.singleComment.userId)}
                          className='SingleComment-reply'>回复</span>
                </div>
                <span
                    className={this.state.singleComment.like.find((item) => item === this.state.loginUser.userId) === this.state.loginUser.userId ? 'SingleComment-like' : 'SingleComment-unlike'}> </span>
                <div onClick={this.showReply}
                     className={this.state.singleComment.reply.length >= 1 ? 'showReplyNum' : 'unshowReplyNum'}>
                    <span></span>{this.state.showReply !== 1 ? '查看回复' : '隐藏回复'}
                </div>
                <ul style={this.state.showReply === 1 ? {display: 'block'} : {display: 'none'}}>
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
            postId: this.props.match.params.paramName,
            replying: null,
            text: '',
        };
        this.changeReply = this.changeReply.bind(this);
        this.changeReplyNull = this.changeReplyNull.bind(this);
        this.changeText = this.changeText.bind(this);
        this.cleatText = this.cleatText.bind(this);
    };

    componentDidMount() {
        fetch(config.url+'/getUserInfo'`userId=${this.props.commentData[this.state.postId].userId}`, {method: 'GET'}).then(response => response.json()).then(
            json => {
                this.setState({postUserAvatar: json.avatar})
            }
        ).catch(this.setState({postUserAvatar: 'defaultAvatar.png'}))
    }

    changeReply(string) {
        this.setState({replying: string});
        this.setState({text:''})
    }

    changeReplyNull() {
        this.setState({replying: null});
        this.setState({text:''})
    }
    cleatText(){
        this.setState({text:''})
    }
    changeText(v) {
        this.setState({text: v})
    }

    render() {
        const commentData = this.props.commentData[this.state.postId];
        let that = this;
        let single = commentData.comment.map((item, index) => {
            return <SingleComment changereply={this.changeReply} replying={that.state.replying}
                                  singleComment={commentData.comment[index]} loginUser={that.props.loginUser}/>
        });
        return (
            <div className='Comment-Box'>
                <div className='Comment-input'>
                    <div className='Comment-input-ava'><img
                        src={'http://www.xwvike.com/static/media/26395177.cd83fabd.jpeg'}/></div>
                    <from className='Comment-inputtext'>
                        <textarea placeholder={this.state.replying === null ? '添加评论' : `回复${' ' + this.state.replying}`}
                                  maxLength='256' value={this.state.text}
                                  onChange={(e) => this.changeText(e.target.value)}/>
                        <button
                            onClick={this.state.replying === null ?
                                () => {this.props.inputComment(this.state.postId, this.state.text, this.props.loginUser.userId);this.cleatText()} :
                                () => {this.props.replyComment(this.state.postId,commentData.comment.id,this.props.loginUser.userId,this.state.replying,this.state.text);this.cleatText()}}
                            type='submit'>发布
                        </button>
                    </from>
                </div>
                <div className='Comment'>
                    <div className='Comment-postText'>
                        <div className='Comment-postText-avatar'><img
                            src={config.url+'/image/' + this.state.postUserAvatar} alt={'434'}/></div>
                        <div className='Comment-postText-text'><Link
                            to={`/user/${commentData.userId}`}>{commentData.userId + ' '}</Link><span>{commentData.postText}</span>
                        </div>
                        <span
                            className='Comment-postText-time'>{timeDifferent(new Date().getTime(), commentData.sendPostTime)}</span>
                        <span onClick={this.changeReplyNull} className='Comment-Comment'>评论</span>
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
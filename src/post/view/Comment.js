import React, {Component} from 'react';
import {connect} from 'react-redux';
import config from '../../config.js';
import {Link, Route, withRouter} from "react-router-dom";
import fetch from 'cross-fetch'
import Cookies from 'js-cookie'
import {timeDifferent} from "../../tool/tool";
import {likeComment, replyComment, inputComment} from "../../home/Actions";
import './comment.css'
const jumpRoute=()=>window.location.pathname = '/login';
class SingleReply extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            replyUserAvatar: 'defaultAvatar.png',
        }
    }

    componentDidMount() {
        fetch(`${config.url}getUserInfo?userId=${this.props.singleReply.userId}`, {method: 'GET'}).then(response => response.json()).then(
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
                    <span onClick={() => this.props.changereply(this.props.singleReply.userId,this.props.commentId)}
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
            commentUserId: this.props.singleComment.userId,
            commentUserAvatar: 'defaultAvatar.png',
            loginUser: this.props.loginUser,
            showReply: -1,
            replying: this.props.replying,
        };
        this.showReply = this.showReply.bind(this);
    }

    componentDidMount() {
        fetch(`${config.url}getUserInfo?userId=${this.state.commentUserId}`, {method: 'GET'}).then(response => response.json()).then(
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
        let singleReply = this.props.singleComment.reply.length >= 1 ? this.props.singleComment.reply.map((item, index) => {
            return <SingleReply changereply={this.props.changereply}
                                singleReply={that.props.singleComment.reply[index]}
                                commentId={that.props.singleComment._id}
            />
        }) : '';
        return (
            <li className='SingleComment'>
                <div className='SingleComment-userAvatar'>
                    <img src={config.url+'image/' + this.state.commentUserAvatar}/>
                </div>
                <div className='SingleComment-text'><Link
                    to={`/user/${this.state.commentUserId}`}>{this.props.singleComment.userId + ' '}</Link><span className='kkkkkkkkkkkkkkk'>{this.props.singleComment.text}</span>
                    <span
                        className='SingleComment-time'>{timeDifferent(new Date().getTime(), this.props.singleComment.time)}</span>
                    <span className='SingleComment-likeNum'>{this.props.singleComment.like.length}次赞</span>
                    <span onClick={() => this.props.changereply(this.props.singleComment.userId,this.props.singleComment._id)}
                          className='SingleComment-reply'>回复</span>
                </div>
                <span
                    className={this.props.singleComment.like.findIndex((item) => item === this.state.loginUser) >=1? 'SingleComment-like' : 'SingleComment-unlike'}> </span>
                <div onClick={this.showReply}
                     className={this.props.singleComment.reply.length >= 1 ? 'showReplyNum' : 'unshowReplyNum'}>
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
            myAvatar: 'defaultAvatar.png',
            postId: this.props.match.params.paramName,
            commentId:'',
            replying: null,
            text: '',
        };
        this.changeReply = this.changeReply.bind(this);
        this.changeReplyNull = this.changeReplyNull.bind(this);
        this.changeText = this.changeText.bind(this);
        this.cleatText = this.cleatText.bind(this);
    };

    componentDidMount() {
        fetch(`${config.url}getUserInfo?userId=${this.props.commentData[this.state.postId].userId}`, {method: 'GET'}).then(response => response.json()).then(
            json => {
                this.setState({postUserAvatar: json.avatar})
            }
        ).catch(this.setState({postUserAvatar: 'defaultAvatar.png'}))
    }

    changeReply(string1,string2) {
        this.setState({replying: string1});
        this.setState({commentId:string2});
        this.setState({text:''})
    }

    changeReplyNull() {
        this.setState({commentId:''});
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
                            onClick={()=>{
                                if (this.props.loginUser === undefined) {
                                    jumpRoute()
                                }else if (this.props.loginUser!==undefined&&this.state.replying === null) {
                                    this.props.inputComment(this.state.postId, this.state.text, this.props.loginUser);
                                    this.cleatText()
                                }else {
                                    this.props.replyComment(this.state.postId,this.state.commentId,this.props.loginUser,this.state.replying,this.state.text);
                                    this.cleatText()
                                }
                            }}
                            type='submit'>发布
                        </button>
                    </from>
                </div>
                <div className='Comment'>
                    <div className='Comment-postText'>
                        <div className='Comment-postText-avatar'><img
                            src={`${config.url}image/${this.state.postUserAvatar}`} alt={'434'}/></div>
                        <div className='Comment-postText-text'><Link
                            to={`/user/${commentData.userId}`}>{commentData.userId + ' '}</Link><span>{commentData.text}</span>
                        </div>
                        <span
                            className='Comment-postText-time'>{timeDifferent(new Date().getTime(), commentData.createTime)}</span>
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
        loginUser:Cookies.get('u_id')
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
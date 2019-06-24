import React, {Component, useState} from 'react';
import {Link, withRouter, Route} from "react-router-dom";
import {timeDifferent} from "../../tool/tool";
import {connect} from 'react-redux'
import './post.css';


const li = (data,loginUser) => {
    // const{count,setCount} = useState(1);
    return <li className='post-comment-li'>
        <div>
            {/*<span className='userAvatar'>*/}
            {/*    <img src='http://www.xwvike.com/static/media/26395177.cd83fabd.jpeg'/>*/}
            {/*</span>*/}
            <div>
                <Link to={`/user/${data.userId}`} className='userid'>{data.userId} </Link>
                <span className='comment-text'>{data.text}</span>
                <span className={data.like.find((item)=>item===loginUser.userId)===loginUser.userId?'unlike-reply':'like-reply'}> </span>
            </div>
            {/*<span className='likeLength'>{data.like.length}次赞</span><span className='reply'>回复</span>*/}
        </div>
    </li>
};

const Post = (data,loginUser,likePost,collectionPost) => {
    // console.log(data);
    let value = data.like.find((item)=>item===loginUser.userId)===loginUser.userId?1:-1;
    return <div className='post'>
        <div className='post-userInfo'>
            <div className='avatar'>
                <img src={require('../../image/userAvatar/' + data.userAvatar)}/>
            </div>
            <span className='userid'>{data.userId}</span>
        </div>
        <div className='post-image'>
            <img src={data.postImgUrl}/>
        </div>
        <div className='post-operating'>
            <div className='button'>
                <span className={value===1?'like':'unlike'} onClick={()=>likePost(data.postId,loginUser.userId)}> </span>
                <Link to={`/comment/${data.postId}`}><span className='comment'> </span></Link>
                <span className='share'> </span>
                <span className={data.Collection.find((item)=>item===loginUser.userId)===loginUser.userId?'collection':'unCollection'} onClick={()=>collectionPost(data.postId,loginUser.userId)}> </span>
            </div>
            <span className='likeNum'>{data.like.length} 次赞</span>
            <div className='postText'>
                <Link to={`/user/${data.userId}`}>{data.userId + ' '}</Link><span>{data.postText}</span>
            </div>
            <div className='post-comment'>
                <Link to={`/comment/${data.postId}`}><span
                    className='comment-num'>{`全部 ${data.comment.length} 条评论`}</span></Link>
                <div className='comment'>
                    <ul>
                        {li(data.comment[data.comment.length-1],loginUser)}
                        {li(data.comment[data.comment.length-2],loginUser)}
                        {/*{data.comment.map((item) => {*/}
                        {/*    return li(item)*/}
                        {/*})}*/}
                    </ul>
                </div>
                <span className='timeDifferent'>{timeDifferent(new Date().getTime(), data.sendPostTime)}</span>
            </div>
        </div>
    </div>

};

export default Post;

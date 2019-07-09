import React, {Component, useState} from 'react';
import {Link, withRouter, Route} from "react-router-dom";
import {timeDifferent} from "../../tool/tool";
import config from '../../config.js';
import {connect} from 'react-redux'
import './post.css';


const li = (data,loginUser,likeComment,postId) => {
    // const{count,setCount} = useState(1);
    return <li className='post-comment-li'>
        <div>
            {/*<span className='userAvatar'>*/}
            {/*    <img src='http://www.xwvike.com/static/media/26395177.cd83fabd.jpeg'/>*/}
            {/*</span>*/}
            <div>
                <Link to={`/user/${data.userId}`} className='userid'>{data.userId} </Link>
                <span className='comment-text'>{data.text}</span>
                <span  className={data.like.find((item)=>item===loginUser.userId)===loginUser.userId?'unlike-reply':'like-reply'}> </span>
            </div>
            {/*<span className='likeLength'>{data.like.length}次赞</span><span className='reply'>回复</span>*/}
        </div>
    </li>
};

const Post = (data,loginUser,likePost,collectionPost,likeComment) => {
    let value = data.likeUser.find((item)=>item===loginUser.userId)===loginUser.userId?1:-1;
    let list = data.comment.length<=0?'':data.comment.map((item)=>{
        return li(item,loginUser,likeComment,data.postId)
    });
    return <div className='post'>
        <div className='post-userInfo'>
            <div className='avatar'>
                <img src={'http://www.xwvike.com/static/media/26395177.cd83fabd.jpeg'}/>
            </div>
            <span className='userid'>{data.userId}</span>
        </div>
        <div className='post-image'>
            <img src={config.url+'image/'+data.pictureUrl[0]}/>
        </div>
        <div className='post-operating'>
            <div className='button'>
                <span className={value===1?'like':'unlike'} onClick={()=>likePost(data._id,loginUser.userId)}> </span>
                <Link to={`/comment/${data._id}`}><span className='comment'> </span></Link>
                <span className='share'> </span>
                <span className={data.CollectionUser.find((item)=>item===loginUser.userId)===loginUser.userId?'collection':'unCollection'} onClick={()=>collectionPost(data._id,loginUser.userId)}> </span>
            </div>
            <span className='likeNum'>{data.likeUser.length} 次赞</span>
            <div className='postText'>
                <Link to={`/user/${data.userId}`}>{data.userId + ' '}</Link><span>{data.text}</span>
            </div>
            <div className='post-comment'>
                <Link to={`/comment/${data._id}`}><span
                    className='comment-num'>{`全部 ${data.comment.length} 条评论`}</span></Link>
                <div className='comment'>
                    <ul>
                        {list[list.length-1]}
                        {list[list.length-2]}
                        {/*{li(data.comment[data.comment.length-1],loginUser,likeComment,data.postId)}*/}
                        {/*{li(data.comment[data.comment.length-2],loginUser,likeComment,data.postId)}*/}
                        {/*{data.comment.map((item) => {*/}
                        {/*    return li(item,loginUser,likeComment,data.postId)*/}
                        {/*})}*/}
                    </ul>
                </div>
                <span className='timeDifferent'>{timeDifferent(new Date().getTime(), data.createTime)}</span>
            </div>
        </div>
    </div>

};

export default Post;

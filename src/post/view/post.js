import React, {Component} from 'react';
import {Link, withRouter, Route} from "react-router-dom";
import './post.css';

const Post = (data) => {
    console.log(data);
    return <div className='post'>
        <div className='post-userInfo'>
            <div className='avatar'>
                <img src={require('../../image/userAvatar/'+data.userAvatar)}/>
            </div>
            <span className='userid'>{data.userId}</span>
        </div>
        <div className='post-image'>
            <img src={data.postImgUrl}/>
        </div>
        <div className='post-operating'>
            <div className='button'>
                <span className='like'></span>
                <span className='comment'></span>
                <span className='share'></span>
                <span className='collection'></span>
            </div>
            <span className='likeNum'>{data.like.length} 次赞</span>
            <div className='postText'>

            </div>
            <div></div>
        </div>
    </div>

};

export default Post

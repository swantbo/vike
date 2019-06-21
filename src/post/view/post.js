import React, {Component} from 'react';
import {Link, withRouter, Route} from "react-router-dom";
import {timeDifferent} from "../../tool/tool";
import './post.css';



const li = (data)=>{
  return <li className='post-comment-li'>
      <span className='like-reply'></span>
      <div>
          <span className='userAvatar'>
              <img src='http://www.xwvike.com/static/media/26395177.cd83fabd.jpeg'/>
          </span>
          <div>
              <Link to={`/user/${data.userId}`} className='userid'>{data.userId} </Link>
              <span className='comment-text'>{data.text}</span>
          </div>
          <span>{timeDifferent(new Date().getTime(),data.time)}</span>
          <div className='reply'>
              {data.reply.map((item)=>{
                  return <li>
                      <span></span>
                      <p></p>
                  </li>
              })}
          </div>
      </div>
  </li>
};

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
                <Link to={`/user/${data.userId}`}>{data.userId}</Link><span> {data.postText}</span>
            </div>
            <div className='post-comment'>
                <span className='comment-num'>{data.comment.length>2?`全部 ${data.comment.length} 条评论`:''}</span>
                <div className='comment'>
                    <ul>
                        {data.comment.map((item)=>{
                            return li(item)
                        })}
                    </ul>
                </div>
            </div>
        </div>
    </div>

};

export default Post

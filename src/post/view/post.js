import React, {Component} from 'react';
import {Link, withRouter, Route} from "react-router-dom";
import './post.css';

const Post = (data) => {
    console.log(data);
    return <div className='post'>{data.userId}</div>

};

export default Post

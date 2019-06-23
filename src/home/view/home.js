import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import {ReFresh,likePost,collectionPost} from "../Actions";
import {view as Post} from '../../post';
import './home.css';

class Home extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        let li  = this.props.postId.map((item)=>{
            return Post(this.props.data[item],this.props.loginUser,this.props.likePost,this.props.collectionPost)
        });
        return (
            <div className='Home'>
                {li}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postId:Object.keys(state.homeReducer),
        data:state.homeReducer,
        loginUser:state.aboutMeReducer
    }
};
const mapDispatchToProps = (dispatch)=>{
    return{
        likePost:(postId,userId)=>{
            dispatch(likePost(postId,userId))
        },
        collectionPost:(postId,userId)=>{
            dispatch(collectionPost(postId,userId))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
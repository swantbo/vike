import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import {ReFresh,likePost,collectionPost} from "../Actions";
import {view as Post} from '../../post';
import './home.css';

// const post = (data) => {
//     return <div>{data}</div>
//
// };

class Home extends Component {
    constructor() {
        super(...arguments);
        this.state ={
            postList:this.props.postId,
            data:this.props.data
        }
    }

    render() {
        let li  = this.state.postList.map((item)=>{
            return Post(this.state.data[item])
        });
        return (
            <div className='home'>
                {li}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(Object.keys(state.homeReducer));
    return {
        postId:Object.keys(state.homeReducer),
        data:state.homeReducer
    }
};
const mapDispatchToProps = (dispatch)=>{
    return{

    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
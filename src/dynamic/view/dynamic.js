import React,{Component} from "react";
import {connect} from 'react-redux';
import {withRouter,Link} from "react-router-dom";
import {timeDifferent} from '../../tool/tool.js';
import config from "../../config";
import {requestDynamic,changeDynamic} from "../Actions";
import {follow} from "../../aboutme/Actions";
import Cookies from 'js-cookie';
import './dynamic.css';

const dynamicSingle = (dynamicId,userId,reply,operating,text,time)=>{
    return <div className='dynamicSingle'>
        <div className='dynamicSingle-msg'>
            <Link className='dynamicSingle-msg-userId' to={`/user/${userId}`}>@{userId}</Link>
            <span className='dynamicSingle-msg-operating' > {operating}了你{operating==='评论'?'的帖子':operating==='回复'?'的评论':''}: </span>
            <span className='dynamicSingle-msg-text' >{text}</span>
        </div>
        <div className='dynamicSingle-time'>{timeDifferent(new Date().getTime(),time)}</div>
        {/*{operating==='关注'?<div className='dynamicSingle-follow' onClick={onclick}>{status===0?'关注':'已关注'}</div>:''}*/}
    </div>
};

class Dynamic extends Component{
    constructor(){
        super(...arguments);
        this.state={
            followed:0
        };
        this.onChangeStatus = this.onChangeStatus.bind(this)
    }
    componentDidMount() {
        this.props.requestDynamic(Cookies.get('u_id'));
    }

    onChangeStatus(){
        this.setState({status:1})
    }
    render() {
        const {status,data} = this.props;
        console.log(data);
        const dynamicList = status===0?<div>数据加载中……</div>:Object.keys(data).map((i)=>{
            let j = data[i];
           return dynamicSingle(j.id,j.userId,j.reply,j.operating,j.text,j.time)
        });
        return(
            <div className='dynamic-page'>
                {dynamicList}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        status:state.dynamicReducer.status,
        data:state.dynamicReducer.data,
        changing:state.dynamicReducer.changing
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        requestDynamic:(userId)=>{
            dispatch(requestDynamic(userId))
        },
        changeDynamic:(dynamicId)=>{
            dispatch(changeDynamic(dynamicId))
        },
        follow:(userId,followId)=>{
            dispatch(follow(userId,followId))
        }
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Dynamic))
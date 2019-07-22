import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Link,Route} from "react-router-dom";
import {sendPost,updateImage} from "../Actions";
import Cookie from 'js-cookie';
import './sendPost.css';

class SendPost extends Component{
    constructor(){
        super(...arguments)
    }
    render() {
        return(
            <div>
                1
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
    }
};
const mapDispatchToProps=(dispatch)=>{
    return{
        sendPost:(userId,text,file,label)=>{
            dispatch(sendPost(userId,text,file,label))
        }
    }
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SendPost))
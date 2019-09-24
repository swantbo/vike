import React,{Component} from "react";
import {withRouter,Link} from "react-router-dom";
import {connect} from 'react-redux';
import config from "../../config";
import {requestLabelId} from '../Actions.js';
import './labelPage.css'

class LabelPage extends Component{
    constructor(){
        super(...arguments)
    };
    render() {
        return(
            <div>
                {}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    console.log(state.searchReducer.labelPost);
    return{
        labelPost:state.searchReducer.labelPost
    }
};
const mapDispatchToProps=(dispatch)=>{
    return{
        requestLabelId:(labelName,num)=>{
            dispatch(requestLabelId(labelName,num))
        }
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LabelPage))
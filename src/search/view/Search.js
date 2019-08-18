import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Route, withRouter} from "react-router-dom";
import {requestLabel,requestSearch} from "../Actions";
import config from "../../config";
import './scarch.css';
import {saveImg} from "../../aboutme/Actions";


const labelList = (labelName,img)=>{
    return <div className='Search-label-list'>
        <img src={config.url+'/image/'+img}/>
        <span>{labelName}</span>
    </div>
};
class Search extends Component {
    constructor() {
        super(...arguments)
    };

    render() {
        return (
            <div className='Search'>

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        label: state.searchReducer.label,
        num: state.searchReducer.num,
        status: state.searchReducer.status,
        searchResults: state.searchReducer.searchResults
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        requestLabel:(tempId,num)=>{
            dispatch(requestLabel(tempId,num))
        },
        requestSearch:(text)=>{
            dispatch(requestSearch(text))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))
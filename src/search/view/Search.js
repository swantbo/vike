import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Route, withRouter} from "react-router-dom";
import {requestLabel, requestSearch} from "../Actions";
import config from "../../config";
import './scarch.css';


const labelList = (labelName, img) => {
    return <div key={labelName} className='Search-label-list'>
        <Link to={`/label/${labelName}`}>
            <img src={config.url + '/image/' + img}/>

        <span>{'#'+labelName}</span>
        </Link>
    </div>
};

class Search extends Component {
    constructor() {
        super(...arguments)
    };

    render() {
        const {label,num} = this.props;
        let single = num===0?<div/>:Object.keys(label).map((i) => {
            return labelList(i, label[i])
        });
        return (
            <div className='Search'>
                {single}
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
        requestLabel: (tempId, num) => {
            dispatch(requestLabel(tempId, num))
        },
        requestSearch: (text) => {
            dispatch(requestSearch(text))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))
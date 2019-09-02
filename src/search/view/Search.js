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
const searchList = (title,text,url)=>{
    let link;
    if (url===undefined){
        link=`/label/${title}`;
        url='label.png';
        text=text +'帖子';
        title='#'+title
    }else {
        link=`/user/${title}`
    }
    return <Link className='Search-single' to={link}>
        <div className='Search-single-box'>
            <div className='img'><img src={config.url + '/image/' + url}/></div>
            <div className='text'>
                <span className='text-title'>{title}</span>
                <span className='text-text'>{text}</span>
            </div>
        </div>
    </Link>
};
class Search extends Component {
    constructor() {
        super(...arguments);
    };

    render() {
        const {label,num,searchResults} = this.props;
        let single = num===0?<div/>:Object.keys(label).map((i) => {
            return labelList(i, label[i])
        });
        let list = searchResults.map((i)=>{
            if (Object.keys(i).length===2){
                return searchList(i.label,i.length)
            }else {
                return searchList(i.userId,i.userName,i.avatar)
            }
        });
        let searchHistory = <div className='search-box'>
            <span className='guess'>{searchResults.length<=0?'热门搜索':'搜索结果'}</span>
            {list}
        </div>;
        return (
            <div className='Search'>
                {window.location.pathname==='/search'?single:searchHistory}
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
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))
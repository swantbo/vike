import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Route, withRouter} from "react-router-dom";
import {requestLabel, requestSearch} from "../Actions";
import {requestLabelId} from "../Actions";
import config from "../../config";
import './scarch.css';


const labelList = (labelName, img,click) => {
    return <div onClick={()=>click(labelName,0)} key={labelName} className='Search-label-list'>
        <Link to={`/label/${labelName}`}>
            <img src={config.url + '/image/' + img}/>

        <span>{'#'+labelName}</span>
        </Link>
    </div>
};
const searchList = (title,text,url,tag,click)=>{
    let link;
    if (tag==='label'){
        link=`/label/${title}`;
        url='label.png';
        text=text +'帖子';
        title='#'+title
    }else if (tag==='user') {
        link=`/user/${title}`
    }else if (tag==='hot'){
        link=``;
        text=text +'次搜索'
    }
    return <Link key={title} onClick={tag==='hot'?(e)=>e.preventDefault():''} className='Search-single' to={link}>
        <div onClick={tag==='hot'?()=>click(title):tag==='label'?()=>click(title,0):''} className='Search-single-box'>
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
            return labelList(i, label[i],this.props.requestLabelId)
        });
        let list = searchResults.map((i)=>{
            if (i.tag==='label'){
                return searchList(i.label,i.length,null,i.tag,this.props.requestLabelId)
            }else if(i.tag==='user') {
                return searchList(i.userId,i.userName,i.avatar,i.tag,null)
            }else if (i.tag==='hot') {
                return searchList(i.text,i.num,i.img,i.tag,this.props.requestSearch)
            }
        });
        let searchHistory = <div className='search-box'>
            <span className='guess'>{searchResults.length<=0||searchResults[0].tag==='hot'?'热门搜索':'搜索结果'}</span>
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
        requestLabelId:(labelName,num)=>{
            dispatch(requestLabelId(labelName,num))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))
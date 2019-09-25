import React,{Component} from "react";
import {withRouter,Link} from "react-router-dom";
import {connect} from 'react-redux';
import config from "../../config";
import {view as PostSingle} from '../../post';
import {requestLabelId} from '../Actions.js';
import './labelPage.css'
import Cookies from "js-cookie";

class LabelPage extends Component{
    constructor(){
        super(...arguments);
        this.state={
            start:0,
            bool:false
        }
        this.handleScroll =this.handleScroll.bind(this);
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        if (window.location.pathname.match(/\/label/)!==null){
            let labelName = window.location.pathname.match('[^/]+(?!.*/)')[0];
            let height = document.documentElement.scrollHeight;
            let scrollY = window.scrollY;
            const that = this;
            if (height - scrollY <= 1366 && this.state.bool === false) {
                this.setState({start: height - scrollY}, function () {
                    that.props.requestLabelId(labelName, 1);
                    that.setState({bool: true})
                });
            } else if (this.state.bool && height - scrollY > 1366) {
                this.setState({bool: false})
            }

        }
    }
    render() {
        const {labelPost} = this.props;
        console.log(labelPost);
        return(
            <div>
                {labelPost.map((i)=>{
                    return <PostSingle key={i} postId={i}/>
                })}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        labelPost:state.searchReducer.labelPost,
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
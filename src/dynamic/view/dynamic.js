import React,{Component} from "react";
import {connect} from 'react-redux';
import {withRouter,Link} from "react-router-dom";
import config from "../../config";
import './dynamic.css';

class Dynamic extends Component{
    constructor(){
        super(...arguments)
    }
    render() {
        return(
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {

    }
};

const mapDispatchToProps=(dispatch)=>{
    return {

    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Dynamic))
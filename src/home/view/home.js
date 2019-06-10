import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link,withRouter} from "react-router-dom";
import './home.css';

class Home extends Component{
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

const mapStateToProps  = ()=>{
    return{

    }
};

export default withRouter(connect(mapStateToProps,{})(Home))
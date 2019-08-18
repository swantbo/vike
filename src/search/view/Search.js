import React,{Component} from "react";
import {connect} from "react-redux";
import {Link,Route,withRouter} from "react-router-dom";
import './scarch.css';

class Search extends Component{
    constructor(){
        super(...arguments)
    };

    render() {
        return(
            <div></div>
        )
    }

}

const mapStateToProps =(state)=>{
    return{

    }
}
const mapDispatchToProps =()=>{
    return{

    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Search))
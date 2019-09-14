import React,{Component} from "react";
import {withRouter,Link} from "react-router-dom";
import {connect} from 'react-redux';
import config from "../../config";
import './changeAvatar.css';

class ChangePassword extends Component{
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

const mapStateToProps =(state)=>{
    return {

    }
};
const mapDispatchToProps =(dispatch)=>{
    return{

    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ChangePassword))
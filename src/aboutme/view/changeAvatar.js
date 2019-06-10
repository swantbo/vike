import React,{Component} from 'react'
import {connect} from 'react-redux';
import {withRouter,Link} from "react-router-dom";
import './changeAvatar.css';

class ChangeAvatar extends Component{
    constructor(){
        super(...arguments)
    }
    render() {
        return(
            <div className='changeAvatar'>
                <input type='file'/>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{}
};

export default withRouter(connect(mapStateToProps,{})(ChangeAvatar))
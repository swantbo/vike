import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import {changeFloatInterFaceClose} from "../../aboutme/Actions";
import {addFiles} from "../../imageCrop";
import './floatInterface.css'
import Login from "../../login/view/Login";

class FloatInterface extends Component {
    constructor() {
        super(...arguments);
    }



    render() {
        let {aboutMeFloat, aboutMeFloatTitle, aboutMeFloatText, avatarFloat, avatarFloatTitle, avatarFloatText, changeFloatInterFaceClose} = this.props;
        let title = () => {
            return aboutMeFloat ? '' : avatarFloat ? <h2>{avatarFloatTitle}</h2> : <h2>{56}</h2>
        };
        let avatarLi = avatarFloatText.map((item) => {
            return item === '上传头像' ? <li onClick={changeFloatInterFaceClose}><Link to='/changeAvatar'>{item}</Link>
            </li> : item === '移除当面头像' ? <li onClick={changeFloatInterFaceClose}>{item}</li> :
                <li onClick={changeFloatInterFaceClose}>{item}</li>
        });
        let aboutMeLi = aboutMeFloatText.map((item) => {
            return item === '举报' ? <li onClick={changeFloatInterFaceClose}>{item}</li> : item === '拉黑' ?
                <li onClick={changeFloatInterFaceClose}>{item}</li> :
                <li onClick={changeFloatInterFaceClose}>{item}</li>
        });
        let FloatBox = () => {
            return aboutMeFloat || avatarFloat ? <div className='fuck'>
                <div className='colBox'>
                    {title()}
                    <ul>
                        {aboutMeFloat ? aboutMeLi : avatarFloat ? avatarLi : ''}
                    </ul>
                </div>
            </div> : ''
        };
        return (
            <div className='floatCol'>
                {FloatBox()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        aboutMeFloat: state.aboutMeReducer.aboutMeFloat,
        aboutMeFloatTitle: state.aboutMeReducer.aboutMeFloatTitle,
        aboutMeFloatText: state.aboutMeReducer.aboutMeFloatText,
        avatarFloat: state.aboutMeReducer.avatarFloat,
        avatarFloatTitle: state.aboutMeReducer.avatarFloatTitle,
        avatarFloatText: state.aboutMeReducer.avatarFloatText
    }
};

export default withRouter(connect(mapStateToProps, {changeFloatInterFaceClose})(FloatInterface))
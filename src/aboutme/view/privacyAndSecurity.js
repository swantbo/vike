import React, {Component} from "react";
import {withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";
import './privacyAndSecurity.css';
import fetch from "cross-fetch";
import config from "../../config";

class PrivacyAndSecurity extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        return (
            <div className='privacyAndSecurity'>
                    暂未开放
            </div>
        )
    }
}

export default withRouter(connect(null, null)(PrivacyAndSecurity))
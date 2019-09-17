import React, {Component} from "react";
import {withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";
import './us.css';
import fetch from "cross-fetch";
import config from "../../config";

const listText = (title, text) => {
    return <div className='us-listText'>
        <span className='us-listText-title'>{title}</span>
        <span className='us-listText-text'>{text}</span>
    </div>
};

class Us extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            us: {}
        }
    }

    componentDidMount() {
        fetch(`${config.url}us`, {method: 'GET'}).then(response => response.json()).then(
            json => {
                this.setState({us: json.data})
            }
        ).catch(this.setState({us: {}}))
    }

    render() {
        const us = this.state.us;
        const list = Object.keys(us);
        return (
            <div className='us'>
                {list.length > 0 ?
                    list.map((i) => {
                        return listText(us[i].title, us[i].text)
                    }) : <div className='Placeholder-chart'>
                        <span></span>
                        <span></span>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(connect(null, null)(Us))
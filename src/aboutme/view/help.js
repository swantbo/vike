import React, {Component} from "react";
import {withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";
import './help.css';
import fetch from "cross-fetch";
import config from "../../config";

const listText = (num, title, text, link) => {
    return <div className='listText'>
        <span className='listText-num'>{num}.</span>
        <span className='listText-title'>{title}</span>
        <span className='listText-text'>{text}</span>
        <Link className='listText-link' to={link}>[?]</Link>
    </div>
};

class Help extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            help: {}
        }
    }

    componentDidMount() {
        fetch(`${config.url}help`, {method: 'GET'}).then(response => response.json()).then(
            json => {
                this.setState({help: json.data})
            }
        ).catch(this.setState({help: {}}))
    }

    render() {
        const help = this.state.help;
        const list = Object.keys(help);
        return (
            <div className='help-page'>
                {list.length > 0 ?
                    list.map((i) => {
                        return listText(help[i].num, help[i].title, help[i].text, help[i].link, help[i].linkText)
                    }) : <div className='Placeholder-chart'>
                        <span></span>
                        <span></span>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(connect(null, null)(Help))
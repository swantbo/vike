import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Home, Search, SendPost, Dynamic, AboutMe} from '../Actions.js';
import {Link, withRouter} from "react-router-dom";
import './footer.css';

class Footer extends Component {
    constructor() {
        super(...arguments);
        this.arr = ['home', 'search', 'sendPost', 'dynamic', 'aboutMe'];
    }

    render() {
        let that = this, url = '/';
        let {Home, SendPost, Search, Dynamic, AboutMe} = this.props;
        let click = {0: Home, 1: Search, 2: SendPost, 3: Dynamic, 4: AboutMe};
        const temp = this.arr.map((item) => {
                let index = that.arr.indexOf(item);
                index === 0 ? url = '/' : index === 1 ? url = '/search' : index === 2 ? url = '/' : index === 3 ? url = '/dynamic' : url = '/aboutme';
                if (index === that.props.id) {
                    item += 'Action';
                }
                let className = 'footerSwitch ';
                return <Link to={url}>
                    <div onClick={click[index]} key={item} className={className}>
                        <div className={item}></div>
                    </div>
                </Link>
            }
        );
        return (
            <div className='footer'>
                {temp}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {id: state.footerReducer.state}
};

export default withRouter(connect(mapStateToProps, {Home, SendPost, Search, Dynamic, AboutMe})(Footer))

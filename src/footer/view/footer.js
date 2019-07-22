import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Home, Search, SendPost, Dynamic, AboutMe} from '../Actions.js';
import {Link, withRouter} from "react-router-dom";
import {requestLoginUserInfo} from '../../aboutme/Actions.js';
import Cookies from 'js-cookie';
import './footer.css';

class Footer extends Component {
    constructor() {
        super(...arguments);
        this.arr = ['home', 'search', 'sendPost', 'dynamic', 'aboutMe', 'login'];
    }

    render() {
        let path = window.location.pathname;
        let that = this, url = '/';
        let {Home, SendPost, Search, Dynamic, AboutMe} = this.props;
        let click = {0: Home, 1: Search, 2: SendPost, 3: Dynamic, 4: AboutMe};
        const temp = this.arr.map((item) => {
                let index = that.arr.indexOf(item);
                index === 0 ?
                    url = '/' : index === 1 ?
                    url = '/search' : index === 2 && Cookies.get('u_id') !== undefined ?
                        url = '/sendPost' : index === 3 && Cookies.get('u_id') !== undefined ?
                            url = '/dynamic' : index === 4 && Cookies.get('u_id') !== undefined ?
                                url = '/aboutme' : url = '/login';
                if (index === that.props.id) {
                    item += 'Action';
                }
                let className = 'footerSwitch ';
                return <Link to={url}>
                    <div onClick={() => {
                        if (index<=3) {
                            click[index]()
                        } else {
                            click[4]();
                            // this.props. requestLoginUserInfo(Cookies.get('u_id'))
                        }
                    }

                    } key={item} className={className}>
                        <div className={item}></div>
                    </div>
                </Link>
            }
        );
        return (
            <div style={path === '/login' ? {display: 'none'} : {display: 'block'}} className='footer'>
                {temp}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {id: state.footerReducer.state}
};
const mapDispatchToProps=(dispatch)=>{
    return{
        requestLoginUserInfo:(userId)=>{
            dispatch(requestLoginUserInfo(userId))
        },
        Home:()=>{
            dispatch(Home())
        },
        SendPost:()=>{
            dispatch(SendPost())
        },
        Search:()=>{
            dispatch(Search())
        },
        Dynamic:()=>{
            dispatch(Dynamic())
        },
        AboutMe:()=>{
            dispatch(AboutMe())
        }
    }
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Footer))

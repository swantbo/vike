import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Home, Search, SendPost, Dynamic, AboutMe} from '../Actions.js';
import {Link, withRouter} from "react-router-dom";
import {requestLoginUserInfo} from '../../aboutme/Actions.js';
import Cookies from 'js-cookie';
import {requestLabel} from "../../search/Actions";
import {myPost} from "../../aboutme/Actions";
import './footer.css';



function reqUserData(that,userId){
    return new Promise(resolve => {
        that.props.requestLoginUserInfo(userId);
        let temp = setInterval(()=>{
            if (that.props.posts!==undefined){
                resolve(that.props.posts);
                clearInterval(temp)
            }
        },200)
    })
}
async function requestData(that,userId, arr, id) {
    let temp = await reqUserData(that,userId);
    that.props.myPost(temp,null,id)
}

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
                        if (index===1){that.props.requestLabel(Cookies.get('temp_id'),that.props.num);click[1]()} else if (index<=3) {
                            click[index]()
                        } else if (index===4) {
                            click[4]();
                            requestData(that,Cookies.get('u_id'),this.props.posts,true)
                           // this.props.requestLoginUserInfo(Cookies.get('u_id'));
                           // this.props.myPost(this.props.posts,null,true);
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
    return {
        id: state.footerReducer.state,
        num:state.searchReducer.num,
        posts: state.aboutMeReducer.loginUserInfo.posts
    }
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
        },
        requestLabel:(tempId,num)=>{
            dispatch(requestLabel(tempId,num))
        },
        myPost:(arr,userId,id)=>{
            dispatch(myPost(arr,userId,id))
        }
    }
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Footer))

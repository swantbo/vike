import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import {view as PostSingle} from '../../post';
import {requestId} from "../../header";
import Cookies from 'js-cookie';
import './home.css';

function throttle(func, wait, mustRun) {
    let timeout, startTime = new Date();
    return function () {
        clearTimeout(timeout);
        timeout = () => {
            if (new Date() - startTime >= mustRun) {
                clearTimeout(timeout);
                // func.call(context, arg);unc();

            }


        }
    }
}

class Home extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            bool :false,
            start:0,
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        let height = document.documentElement.scrollHeight;
        let scrollY = window.scrollY;
        const that = this;
        if (height-scrollY<=1000&&this.state.bool===false){
            this.setState({start:height-scrollY},function () {
                that.props.requestId(Cookies.get('temp_id'),1);
                that.setState({bool:true})
            });
        }
    }

    render() {
        console.log('render')
        const {postId} = this.props;
        let li = postId.map((item) => {
            return <PostSingle postId={item}/>
        });
        return (
            <div className='Home'>
                {li}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postId: state.headerReducer.list,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        requestId: (tempId, s) => {
            dispatch(requestId(tempId, s))
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
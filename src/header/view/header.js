import React, {Component} from 'react';
import {connect} from 'react-redux';
import {UserNameNull, SendUserName, ChangeOptions} from "../Actions";
import {Link, withRouter} from "react-router-dom";
import './header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {a: null, b: -1};
        this.changeA = this.changeA.bind(this);
        this.changeB = this.changeB.bind(this);
        this.backUp = this.backUp.bind(this);
        this.historyBack = this.historyBack.bind(this);
    }

    changeA() {
        this.setState({a: !this.state.a})
    }

    changeB() {
        this.setState({b: this.state.b * -1})
    }

    backUp() {
        document.documentElement.scrollTop = 0;
    }

    componentDidMount() {
        this.setState({a: false})
    }

    historyBack() {
        window.history.back();
    }

    render() {
        let {name, UserNameNull, SendUserName, option, ChangeOptions, setListUrl} = this.props;
        let path = window.location.pathname;
        let logo = <div className='header-home'>
            <div className='header-post'></div>
            <div className='header-logo' onClick={this.backUp}></div>
            <div className='header-addfriend'></div>
        </div>;
        let search = <div className='search-box'>
            <Link to='/result'>
                <div onClick={this.changeA} style={{border: this.state.a ? 'none' : null}}
                     className='header-search'><input onChange={() => {
                    SendUserName();
                    this.changeB()
                }} value={name} type='text'/>
                    <div style={{display: this.state.a ? 'none' : 'block'}}
                         className='header-prompt'>搜索
                    </div>

                </div>
            </Link>
            <Link to='/search'>
                <div onClick={() => {
                    this.changeB();
                    this.changeA();
                    UserNameNull()
                }} style={{display: !this.state.a ? 'none' : 'block'}} className='close'>取消
                </div>
            </Link>
        </div>;
        let changeAvatar = <div className='header-changeAvatar'><span onClick={this.historyBack}></span>头像<p>保存</p></div>;
        let dynamic = <div className='header-dynamic'>动态</div>;
        let aboutme = <div className='header-five'>
            <div onClick={() => ChangeOptions()}
                 className={option ? 'header-option' : 'heacder-option-close'}></div>
            <div className='header-aboutme'>{option ? '个人主页' : '选项'}</div>
            {option ? <div className='header-addfriend'></div> : <div></div>}
        </div>;
        const tips = (text) => <div className='header-tips'><span onClick={this.historyBack}></span>{text}</div>;
        let header = <div className='header'>
            {path==='/changeAvatar'?changeAvatar:path === '/' ? logo : path === '/search' ? search : path === '/result' ? search : path === '/dynamic' ? dynamic : path === '/aboutme' ? aboutme : path === '/edit' ? tips(setListUrl[0].text) : path === '/changePassword' ? tips(setListUrl[1].text) : path === '/privacy_and_security' ? tips(setListUrl[2].text) : path === '/help' ? tips(setListUrl[3].text) : tips(setListUrl[4].text)}
        </div>;
        return (
            <div>
                {header}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        option: state.headerReducer.isShowOptions,
        name: state.headerReducer.name,
        setListUrl: state.aboutMeReducer.setListUrl
    }
};

export default withRouter(connect(mapStateToProps, {UserNameNull, SendUserName, ChangeOptions})(Header))
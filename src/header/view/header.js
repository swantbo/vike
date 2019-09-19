import React, {Component} from 'react';
import {connect} from 'react-redux';
import {UserNameNull, SendUserName, ChangeOptions, requestId} from "../Actions";
import {Link, withRouter} from "react-router-dom";
import {updateUserAvatar} from "../../aboutme/Actions";
import './header.css';
import {requestLabel} from "../../search/Actions";
import Cookies from 'js-cookie';
import {changeStatus, sendPost, dataClear, isClick} from "../../sendpost/Actions";
import {collectionPost, likeComment, likePost} from "../../home/Actions";

class Header extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.state = {
            a: false, b: -1, listUrl: {
                '/edit': '编辑主页',
                '/changePassword': '更改密码',
                '/privacy_and_security': '隐私和安全',
                '/help': '帮助中心',
                '/us': '关于我们',
                '/login': '注册或登录',
                '/sendPost': '发帖',
                '': '退出',
            },
            text: ''
        };
        this.changeA = this.changeA.bind(this);
        this.changeB = this.changeB.bind(this);
        this.changeC = this.changeC.bind(this);
        this.backUp = this.backUp.bind(this);
        this.historyBack = this.historyBack.bind(this);
        this.changeText = this.changeText.bind(this);
        this.clearText = this.clearText.bind(this);
    }

    changeA() {
        this.setState({a: true})
    }

    changeC() {
        this.setState({a: false})
    }

    changeB() {
        this.setState({b: this.state.b * -1})
    }

    backUp() {
        document.documentElement.scrollTop = 0;
    }

    changeText(e) {
        this.setState({text: e.target.value.replace(/\s+/g, "")})
    }

    clearText() {
        this.setState({text: ''})
    }

    componentWillMount() {
        this.setState({a: false});
        this.props.requestId();
    }

    historyBack() {
        window.history.back();
    }

    render() {
        let {name, UserNameNull, SendUserName, option, ChangeOptions, requestLabel} = this.props;
        let path = window.location.pathname;
        let logo = <div className='header-home'>
            <Link to='/sendPost'>
                <div className='header-post'></div>
            </Link>

            <div className='header-logo' onClick={this.backUp}></div>
            <Link to='search'>
                <div className='header-addfriend'></div>
            </Link>

        </div>;
        let style = {border: '1px solid rgba(0, 0, 0, .0975)'};
        let style2 = {border: 'none'};
        let search = <div className='search-box'>
            <Link className='header-search-a' to='/result'>
                <div onClick={this.changeA} style={{border: this.state.a ? 'none' : null}}
                     className='header-search'><input style={this.state.a ? style : style2}
                                                      onChange={(e) => {
                                                          this.changeText(e);
                                                          // console.log();
                                                          SendUserName(e.target.value.replace(/\s+/g, ""));
                                                          this.changeB()
                                                      }} value={this.state.text} type='text'/>
                    <div style={{display: this.state.a ? 'none' : 'block'}}
                         className='header-prompt'>搜索
                    </div>

                </div>
            </Link>
            <Link className='close-a' to='/search'>
                <div onClick={() => {
                    this.changeB();
                    this.changeC();
                    UserNameNull();
                    requestLabel();
                    this.clearText()
                }} style={{display: !this.state.a ? 'none' : 'block'}} className='close'>取消
                </div>
            </Link>
        </div>;
        let changeAvatar = <div className='header-changeAvatar'><span onClick={this.historyBack}></span>上传头像<p
            onClick={() => this.props.updateUserAvatar(this.props.tempImage, Cookies.get('u_id'))}><Link
            to='/aboutMe'>保存</Link></p>
        </div>;

        let sendPost = <div className='header-sendPost'>
            <span onClick={() => {
                this.historyBack();
                this.props.dataClear()
            }}></span>
            {this.props.sendStatus === 0 ? '上传图片' : '发送动态'}
            <p onClick={() => {
                if (this.props.isClick === 0) {
                    alert('请先上传图片')
                } else {
                    if (this.props.sendStatus === 0) {
                        this.props.changeStatus()
                    } else if (this.props.sendStatus === 1) {
                        this.props.sendPost(Cookies.get('u_id'), this.props.text, this.props.img, this.props.label);
                    }
                }
            }}>{this.props.sendStatus === 0 ? '下一步' : '发送'}</p>
        </div>;

        let dynamic = <div className='header-dynamic'>动态</div>;
        let comment = <div className='header-comment'><span onClick={this.historyBack}> </span>评论</div>;
        let aboutme = <div className='header-five'>
            <div onClick={() => ChangeOptions()}
                 className={option ? 'header-option' : 'heacder-option-close'}></div>
            <div className='header-aboutme'>{option ? '个人主页' : '选项'}</div>
            {option ? <div className='header-addfriend'></div> : <div></div>}
        </div>;
        const tips = (text) => <div className='header-tips'><span onClick={this.historyBack}> </span>{text}</div>;
        let header = <div className='header'>
            {path.match(/\/comment/) !== null ?
                comment : path.match(/\/user/) !== null ?
                    tips(path.match('[^/]+(?!.*/)')[0]) : path.match(/\/post/) !== null ?
                        tips('照片') : path === '/sendPost' ?
                            sendPost : path === '/changeAvatar' ?
                                changeAvatar : path === '/' ?
                                    logo : path === '/search' ?
                                        search : path === '/result' ?
                                            search : path === '/dynamic' ?
                                                dynamic : path === '/aboutme' ?
                                                    aboutme : path.match(/\/friendsList/) !== null ?
                                                        tips('我的好友') : tips(this.state.listUrl[Object.keys(this.state.listUrl).find((item) => item === path)])}
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
        tempImage: state.aboutMeReducer.tempImage,
        img: state.sendPostReducer.img,
        sendStatus: state.sendPostReducer.sendStatus,
        text: state.sendPostReducer.text,
        label: state.sendPostReducer.label,
        isClick: state.sendPostReducer.isClick,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        requestId: () => {
            dispatch(requestId())
        },
        UserNameNull: () => {
            dispatch(UserNameNull())
        },
        SendUserName: (text) => {
            dispatch(SendUserName(text))
        },
        ChangeOptions: () => {
            dispatch(ChangeOptions())
        },
        updateUserAvatar: (file, userId) => {
            dispatch(updateUserAvatar(file, userId))
        },
        changeStatus: () => {
            dispatch(changeStatus())
        },
        sendPost: (userId, text, file, label) => {
            dispatch(sendPost(userId, text, file, label))
        },
        dataClear: () => {
            dispatch(dataClear())
        },
        requestLabel: () => {
            dispatch(requestLabel())
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
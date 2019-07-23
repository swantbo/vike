import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link, Route} from "react-router-dom";
import {sendPost, updateImage} from "../Actions";
import Cookie from 'js-cookie';
import './sendPost.css';

class SendPost extends Component {
    constructor() {
        super(...arguments);
        this.canvas = React.createRef();
        this.state = {
            fileType: '',
            img: '',
            devWidth: document.documentElement.clientWidth,
            show: 1,
            scale: 0,
            imgWidth: 0,
            imgHeight: 0,
            cropW: 0,
            cropH: 0,
            sx: 0,
            sy: 0,
            dx: 0,
            dy: 0,
            dw: 0,
            dh: 0,

            startX: 0,
            startY: 0,
            moveX: 0,
            moveY: 0,
            ctx: ''

        };
        this.inputFile = this.inputFile.bind(this);
        this.changeShow = this.changeShow.bind(this);
    }

    changeShow() {
        this.setState({show: this.state.show * -1})
    }

    inputFile(e) {
        if (!e.target.files || e.target.files.length <= 0) {
            return
        }
        const file = e.target.files[0];
        if (file.type.split('/')[0] !== 'image') {
            alert('请上传图片');
            return;
        }
        let reader = new FileReader(file);
        reader.onload = (e) => {
            let Base64 = e.target.result;
            let img = new Image();
            img.src = Base64;


            img.onload = () => {
                const Width = img.width;
                const Height = img.height;
                const cvs = document.getElementById('cvs');
                cvs.width = this.state.devWidth;
                cvs.height = this.state.devWidth;
                let ctx = cvs.getContext('2d');
                this.setState({
                    img: img,
                    imgWidth: Width,
                    imgHeight: Height,
                    sx: 0,
                    sy: 0,
                    dx: 0,
                    dy: 0,
                    dw: this.state.devWidth,
                    dh: this.state.devWidth,
                    ctx: ctx
                });

                let imgWidth = Width, imgHeight = Height, sx = 0, sy = 0, dx = 0, dy = 0, dw = this.state.devWidth,
                    dh = this.state.devWidth;

                if (imgWidth > imgHeight) {
                    let temp = this.state.devWidth / Height;
                    sx = ((Width * temp / 2) - (this.state.devWidth / 2)) / temp;
                    this.setState({
                        sx: ((Width * temp / 2) - (this.state.devWidth / 2)) / temp,
                        cropW: imgHeight,
                        cropH: imgHeight,
                        scale: temp
                    });
                    imgWidth = imgHeight;
                }else if (imgWidth < imgHeight) {
                    let temp = this.state.devWidth/Width;
                    sy = ((Height*temp/2)-(this.state.devWidth/2))/temp;

                    imgHeight=imgWidth
                }

                ctx.clearRect(0, 0, this.state.devWidth, this.state.devWidth);
                ctx.drawImage(img, sx, sy, imgWidth, imgHeight, dx, dy, dw, dh);
                this.props.updateImage(this.canvas.current.toDataURL('image'));
            }
        };
        reader.readAsDataURL(file);
    }

    render() {
        let updateImg = <div className='sendPost-upIMG'>
            <div className='sendPost-upIMG-box'>
                <canvas id='cvs' ref={this.canvas}></canvas>
            </div>
            <label style={this.state.show === 1 ? {display: 'block'} : {display: 'none'}}>
                <input onClick={this.changeShow} onChange={this.inputFile} className='input' type='file'
                       accept='image/jpeg,image/png'/>
                <span>选择图片</span>
            </label>
            <span className='changeSize'></span>
        </div>

        let send = <div>
            2
        </div>
        return (
            <div className='sendPost-page'>
                {this.props.sendStatus === 0 ? updateImg : send}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        text: state.sendPostReducer.text,
        label: state.sendPostReducer.label,
        sendStatus: state.sendPostReducer.sendStatus,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateImage: (img) => {
            dispatch(updateImage(img))
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SendPost))
import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter, Link} from "react-router-dom";
// import {addFiles, view as ImageCrop} from '../../imageCrop';
import './changeAvatar.css';

class ChangeAvatar extends Component {
    constructor() {
        super(...arguments);
        this.input = React.createRef();
        this.box = React.createRef();
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

    imgMove = {
        onTouchStart: (e) => {
            let touch = e.touches[0];
            this.setState({moveX: Number(touch.pageX), moveY: Number(touch.pageY)});
            this.box.current.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, {passive: false});
        },
        onTouchMove: (e) => {
            let touch = e.touches[0];
            this.setState({
                sx: this.state.sx + (Number(touch.pageX) - this.state.startX) <= 0 ?
                    0 : this.state.sx + (Number(touch.pageX) - this.state.startX) >= this.state.imgWidth * this.state.scale - this.state.devWidth ?
                        this.state.imgWidth * this.state.scale - this.state.devWidth : this.state.sx + (Number(touch.pageX) - this.state.startX),
                sy: this.state.sy + (Number(touch.pageY) - this.state.startY)<=0?
                    0:this.state.sy + (Number(touch.pageY) - this.state.startY)>=this.state.imgHeight*this.state.scale-this.state.devWidth?
                        this.state.imgHeight*this.state.scale-this.state.devWidth:this.state.sy + (Number(touch.pageY) - this.state.startY)
            });
            console.log(this.state.sx);
            console.log(this.state.sy);
            let {img, sx, sy, cropW, cropH, dx, dy, dw, dh, ctx} = this.state;
            ctx.clearRect(0, 0, this.state.devWidth, this.state.devWidth);
            ctx.drawImage(img, sx, sy, cropW, cropH, dx, dy, dw, dh);
        },
        onTouchEnd: (e) => {
            this.box.current.removeEventListener('touchmove', function (e) {
                e.preventDefault();
            }, {passive: false});
        }
    };

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
                const cvs = document.getElementById('canvas');
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
                    let temp2 = Height / this.state.devWidth;
                    sx = ((Width * temp / 2) - (this.state.devWidth / 2)) / temp;
                    this.setState({
                        sx: ((Width * temp / 2) - (this.state.devWidth / 2)) / temp,
                        cropW: imgHeight,
                        cropH: imgHeight,
                        scale: temp2
                    });
                    console.log(this.state.moveX);
                    imgWidth = imgHeight;
                }


                ctx.clearRect(0, 0, this.state.devWidth, this.state.devWidth);
                ctx.drawImage(img, sx, sy, imgWidth, imgHeight, dx, dy, dw, dh)
            }
        };
        reader.readAsDataURL(file);
    }

    render() {

        return (
            <div className='changeAvatar'>

                <div {...this.imgMove} ref={this.box} className='imageCrop'>
                    <div style={this.state.show === 1 ? {display: 'none'} : {display: 'block'}}
                         className='imageCrop-line'>
                        <span className='imageCrop-up'></span>
                        <span className='imageCrop-down'></span>
                        <span className='imageCrop-left'></span>
                        <span className='imageCrop-right'/>
                    </div>
                    <canvas id='canvas' ref={this.canvas} className='imageCrop-canvas'></canvas>
                    <div className='imageCrop-back'></div>
                </div>

                <label style={this.state.show === 1 ? {display: 'block'} : {display: 'none'}}
                       className='imageCrop-label'>
                    <input onClick={this.changeShow} className='inputImage' onChange={this.inputFile} type='file'/>
                    <span>选择图片</span>
                </label>
                <div>{this.state.moveX}:{this.state.moveY}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default withRouter(connect(mapStateToProps, {})(ChangeAvatar))
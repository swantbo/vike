import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter, Link} from "react-router-dom";
// import {addFiles, view as ImageCrop} from '../../imageCrop';
import './changeAvatar.css';

class ChangeAvatar extends Component {
    constructor() {
        super(...arguments);
        this.input = React.createRef();
        this.state = {
            fileType: '',
            img: '',
            imgWidth: '',
            imgHeight: '',
            devWidth: document.documentElement.clientWidth,
            show: 1
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
                let imgWidth = img.width, imgHeight = img.height, sx = 0, sy = 0, dx = 0, dy = 0,
                    dw = this.state.devWidth, dh = this.state.devWidth;

                if (imgWidth > imgHeight) {
                    //如果图片宽度比高度大。则绘制图片在正方形区域位置居中的位置。
                    imgWidth = imgHeight;
                }

                this.setState({img: img});
                const cvs = document.getElementById('canvas');
                cvs.width = this.state.devWidth;
                cvs.height = this.state.devWidth;

                let ctx = cvs.getContext('2d');
                ctx.drawImage(img, sx, sy, imgWidth, imgHeight, dx, dy, dw, dh)
            }
        };
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div className='changeAvatar'>
                <div className='imageCrop'>
                    <div style={this.state.show === 1 ? {display: 'none'} : {display: 'block'}}
                         className='imageCrop-line'>
                        <span className='imageCrop-up'></span>
                        <span className='imageCrop-down'></span>
                        <span className='imageCrop-left'></span>
                        <span className='imageCrop-right'></span>
                    </div>
                    <canvas id='canvas' ref={this.canvas} className='imageCrop-canvas'></canvas>
                    <div className='imageCrop-back'></div>
                </div>

                <label style={this.state.show === 1 ? {display: 'block'} : {display: 'none'}}
                       className='imageCrop-label'>
                    <input onClick={this.changeShow} className='inputImage' onChange={this.inputFile} type='file'/>
                </label>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default withRouter(connect(mapStateToProps, {})(ChangeAvatar))
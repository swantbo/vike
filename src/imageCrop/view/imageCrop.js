import React,{Component} from 'react';
import './imageCrop.css';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

class ImageCrop extends Component{
    constructor(){
        super(...arguments);
        this.state = {
            data:this.props.data,
            devWidth:document.documentElement.clientWidth,
        }
    }
    componentDidMount() {
        console.log(this.props.data);
        const {img} = this.state.data;
        if (!img) {
            return
        }
        let cvs = this.createCanvas();
        this.drawCanvas(cvs,img)
    }
    createCanvas(){
        const cvs = document.getElementById('canvas');
        return cvs
    }
    drawCanvas(cvs,img){
        console.log(img);
        let ctx = cvs.getContext('2d');
        ctx.drawImage(img,0,0)
    }
    render() {
        return(
            <div className='imageCrop'>
                <canvas id='canvas' ref={this.canvas} className='imageCrop-canvas'/>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        data:state.imageRendering
    }
};
const mapDispatchToProps = (dispatch)=>{
    return {}
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ImageCrop))
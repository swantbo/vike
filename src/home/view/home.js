import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import {view as PostSingle} from '../../post';
import './home.css';

class Home extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            data: ["5d7a0442a3d0b809748c2f6e"
                , "5d78ca2463e1240b3400235c"
                , "5d78c97bbe71282830a11254"
                , "5d78bf10be71282830a11244"
                , "5d79af7fa3d0b809748c2f6c"
                , "5d79aee7a3d0b809748c2f6b"]
        }

    }


    render() {
        console.log('render');
        const{postId} = this.props;
        let li = postId.map((item) => {
            return <PostSingle key={item} postId={item}/>
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
export default withRouter(connect(mapStateToProps, null)(Home))
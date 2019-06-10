import React, {Component} from 'react';
import './test.css'


class HomeTest extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            num: 100,
        };
    }

    render() {
        let li = [], that = this;
        let getRandomColor = function () {
            return  '#'+(Math.random()*0xffffff<<0).toString(16);
        };
        let getRandomHeight = function () {
            return Math.floor(Math.random() * (120 - 60) + 60) + 'vh'
        };

        (function () {
            for (let i = 0; i < that.state.num; i++) {
                let style = {
                    backgroundColor: getRandomColor(),
                    height: getRandomHeight()
                };
                li.push(<li className='home-li' style={style}>这是一个测试组件</li>)
            }
        })();
        return (
            <div className='test-home'>
                <ul>{li}</ul>
            </div>
        )
    }
}


export default HomeTest;
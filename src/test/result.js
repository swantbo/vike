import React,{Component} from 'react';
import './test.css'

class ResultTest extends Component{
    constructor(){
        super(...arguments);
        this.state={
            num:5
        }
    }

    render() {
        let getRandomColor = function () {
            return  '#'+(Math.random()*0xffffff<<0).toString(16);
        };
        let li = [],that = this;
        (function () {
            for (let i = 0; i < that.state.num; i++) {
                let style = {
                    backgroundColor: getRandomColor(),
                };
                li.push(<li key={i} className='result-li' style={style}>这是一个测试组件</li>)
            }
        })();
        return(
            <div className='test-result'>
                <ul>{li}</ul>
            </div>
        )
    }
}

export default ResultTest;
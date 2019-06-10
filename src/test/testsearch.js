import React, {Component} from 'react';
import './test.css'

class SearchTest extends Component{
    constructor(){
        super(...arguments);
        this.state = {
            num : 100
        }
    }

    render() {
        let getRandomColor = function () {
            return  '#'+(Math.random()*0xffffff<<0).toString(16);
        };
        let li = [], that = this;

        (function () {
            for (let i = 0; i < that.state.num; i++) {
                let style = {
                    backgroundColor: getRandomColor(),
                };
                li.push(<li className='search-li' style={style}>这是一个测试组件</li>)
            }
        })();
        return(
            <div className='test-search'>
                <ul>{li}</ul>
            </div>
        )
    }
}

export default SearchTest;
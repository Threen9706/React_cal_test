import React, { Component } from 'react';
import Cal from './Cal';
import List from './List'
import './css/index.css'
// import LittleSisterItem from './LittleSisterItem';


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: ['计算器', '收入分析']
        }
    }
    componentDidMount() {
        var tabList = document.querySelectorAll('#tab_nav')[0].children
        var childCon = document.querySelectorAll('.childCon')[0].children
        
        childCon[1].classList =  'hide_tab'
        
        for (let i = 0; i < tabList.length; i++) {
            tabList[i].onclick = () => {
                // console.log(tabList[i].classList)
                for (let j = 0; j < tabList.length; j++) {
                    tabList[j].classList = 'tab_bar'
                    childCon[j].classList = 'hide_tab'
                }
                tabList[i].classList = "tab_bar active_tab"
                childCon[i].classList = ''
            }
        }
    }

    render() {
        return (
            <div>
                <div id="tab_nav">
                    <div id="cal" className="tab_bar active_tab">计算器</div>
                    <div id="list" className="tab_bar">收入分析</div>
                </div>
                <div className="childCon">
                    <div> <Cal /></div>
                    <div> <List /></div> 
                </div>
            </div>
        );
    }

}

export default NavBar;
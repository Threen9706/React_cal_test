import React, { Component } from "react"
import LittleSisterItem from './LittleSisterItem';




class LittleSister extends Component {
    //在某一时刻，可以自动执行的函数  根本上constructor是es6的语法，而不属于react生命周期
    constructor(props) {
        super(props) //调用父类的构造函数，固定写法
        this.state = {
            inputValue: 'Threen', //input中的值
            //1:虽然已经绑定数据，但是是单向：state中的数据绑定到输入框中，实际上的输入框的值已不能改变（未绑定事件）
            list: ['jio部按摩', '骑行跑腿'] //服务列表
        }
    }

    render() {
        console.log('render---组件挂载中')
        return (
            <React.Fragment>

                <div>
                    <input value={this.state.inputValue} onChange={this.inputChange.bind(this)} />

                    <button onClick={this.addList.bind(this)}>增加服务</button>
                </div>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (
                            
                                    <LittleSisterItem 
                                    key = {index+item}
                                    content={item}
                                    index={index}
                                    deleteItem={this.deleteItem.bind(this)}
                                    />
                             

                            )
                        })
                    }
                </ul>
            </React.Fragment >
        )
    }

    inputChange(e) {
        console.log(e.target.value)
        // this.state.inputValue = e.target.value
        //this的指向错误，此处的this为undefined，在react中，修改state中的值，应该用setState方法
        this.setState({
            inputValue: e.target.value
        })
    }

    addList() {
        this.setState({
            list: [...this.state.list, this.state.inputValue]
        })
    }

    deleteItem(index) {
        // console.log(index)
        let list = this.state.list
        list.splice(index, 1)
        this.setState({
            list: list
        })
    }
}

export default LittleSister
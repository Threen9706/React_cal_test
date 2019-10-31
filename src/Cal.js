import React, { Component } from 'react';
import './css/cal.css'


class Cal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            str: '',
        }
    }
    componentDidMount() {
        this.setState({
            str: '',
        })

    }
    btnClick(e) {
        // console.log(e.target.classList)
        if (e.target.classList.contains('command')) {
            if(e.target.innerHTML=='AC'){
                this.ac()
            }
            if(e.target.innerHTML=='+/-'){
                this.zhengfu()
            }
            if(e.target.innerHTML=='%'){
                this.percent()
            }
            

        } else if (e.target.classList.contains('result')) {
                this.result()
        }else{
                this.func(e.target.id)

        }
    }

    func(num) {
        this.setState({
            str: this.state.str + num,
        }, () => { this.refs.screen.innerHTML = this.state.str })
    }

    ac(){
        this.refs.screen.innerHTML = '0'
        this.setState({
            str: '',
        }, () => { console.log(this.state.str) })

    }
    zhengfu(){
        if(!(isNaN(this.state.str))){
            // this.state.str= Number(this.state.str)*(-1)
            // console.log(scr.innerHTML)
            this.setState({
                str:Number(this.state.str)*(-1)
            },() => { this.refs.screen.innerHTML = this.state.str })
        }else{
            alert('请输入数字')
            this.ac()
        }
    }
    percent(){
        if(!(isNaN(this.state.str))){
            this.setState({
                str:Number(this.state.str)*(0.01)
            },() => { this.refs.screen.innerHTML = this.state.str })
        }else{
            alert('请输入数字')
            this.ac()
        }
    }
    result(){
        this.refs.mask.className='mask'
        var timeID = setTimeout(()=>{
            this.refs.mask.className='maskAfter'
            this.setState({
                str:this.state.str === "" ? "" : eval(this.state.str)
            },() => { this.refs.screen.innerHTML = this.state.str })
            window.clearTimeout(timeID)
        }, 1000)
    }
    render() {
        return (
            <div className="tabs">
                <div className="bg">
                    <div className="maskAfter" ref='mask' id="mask">
                        <div className="loading">
                            <div className="line1" ></div>
                            <div className="line2"></div>
                            <div className="line3"></div>
                            <div className="line4"></div>
                            <div className="line5"></div>
                            <div className="line6"></div>
                            <div className="line7"></div>
                            <div className="line8"></div>
                            <div className="line9"></div>
                            <div className="line10"></div>
                            <div className="line11"></div>
                            <div className="line12"></div>
                        </div>
                    </div>
                    <div id="screen" ref='screen'>0</div>
                    <table className="cal_table" onClick={this.btnClick.bind(this)}>
                        <tbody>
                            <tr className="cal_tr">
                                <td className="btn_black command">AC</td>
                                {/* onClick={this.ac.bind(this)} */}
                                <td className="btn_black command">+/-</td>

                                <td className="btn_black command" >%</td>
                                {/* onClick={this.func('/')} */}
                                <td className="btn_orange" id='/'>÷</td>
                            </tr>
                            <tr className="cal_tr">
                                <td id='7'>7</td>
                                <td id='8'>8</td>
                                <td id='9'>9</td>
                                <td className="btn_orange" id='*'>×</td>
                            </tr>
                            <tr className="cal_tr">
                                <td id='4'>4</td>
                                <td id='5'>5</td>
                                <td id='6'>6</td>
                                <td className="btn_orange" id='-'>-</td>
                            </tr>
                            <tr className="cal_tr">
                                <td id='1'>1</td>
                                <td id='2'>2</td>
                                <td id='3'>3</td>
                                <td className="btn_orange" id='+'>+</td>
                            </tr>
                            <tr className="cal_tr">
                                <td className='td0' id='0'>0</td>
                                <td id='.'>.</td>
                                <td className="btn_orange result" >=</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Cal;
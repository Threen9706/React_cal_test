import React, { Component } from 'react'
import './css/list.css'



class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchData: '',
            template: '',
            currentPage: 1,
            pageSize: 3,
            pageCount: '',
            pageAll: ''

        }
    }


    componentDidMount() {


        fetch('./data.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(response => response.json()) //解析为Promise
            .then(data => {
                this.setState({ //复制到本地数据
                    fetchData: data.content,
                    pageCount: Math.ceil(data.content.length / this.state.pageSize)
                }, () => {
                    this.dataRenderFn(this.state.fetchData)
                    this.renderPage(this.state.pageCount)
                })

            })

        this.search()

    }

    dataRenderFn(arr) {
        let dataToRender = arr.slice((this.state.currentPage - 1) * this.state.pageSize, this.state.pageSize * this.state.currentPage)
        let template = ''
        dataToRender.forEach((item, index) => {
            template += `
                          <div class='data_item'>
                         <span class='date'>`+ item.day + `</span>
                         <span>`+ item.payorder + `</span>
                         <span>`+ item.freeorder + `</span>
                         <span>`+ item.singleprice + `(元)</span>
                         <span>`+ item.totalprice + `(元)</span>
                         <span>`+ item.vipafterdatenum + `</span>
                         <span>`+ item.neworder + `</span>
                         <span>`+ item.againorder + `</span>
                         <span>`+ item.updateorder + `</span>
                         <span>`+ item.getbackorder + `</span>
                         <span>`+ item.vipagainpaynum + `</span>
                         <span>`+ item.monthcycle + `</span>
                         <span>`+ item.aquartercycle + `</span>
                         <span>`+ item.sixmonthscycle + `</span>
                         <span>`+ item.ayearcycle + `</span>
                         <span><a href='#'>分析</a></span>
                         </div>   
                        `
        })
        this.refs.table_body.innerHTML = template;

    }

    renderPage(num) {
        this.refs.pagination.innerHTML = ''
        for (let i = 1; i <= num; i++) {
            this.refs.pagination.innerHTML += `<a class='page_a'>${i}</a>`;
            var pageAll = this.refs.pagination.querySelectorAll('.page_a')
            // console.log(this.refs.pagination.children)
            //默认第一页高亮
            pageAll[this.state.currentPage - 1].classList.add('active_a')

        }
        this.changePage(pageAll)
        this.prevNext(pageAll)
    }

    changePage(pageAll) {
        let this1 = this
        // console.log(pageAll)
        pageAll.forEach((item, index) => {
            // for (let i = 0; i < pageAll.length; i++) {
            item.onclick = function () {
                for (let j = 0; j < pageAll.length; j++) {
                    pageAll[j].classList.remove('active_a')
                }
                this.classList.add('active_a')
                this1.setState({
                    currentPage: index + 1
                })
                this1.dataRenderFn(this1.state.fetchData)

            }
        }
            // }
        )

    }

    changePageClass(pageAll) {
        for (let j = 0; j < pageAll.length; j++) {
            pageAll[j].classList.remove('active_a')
        }
        pageAll[this.state.currentPage - 1].classList.add('active_a')
    }

    prevNext(pageAll) {
        let this1 = this
        console.log(pageAll.length)
        if (!pageAll.length < 1) {
            this.refs.prev.onclick = () => {
                if (this1.state.currentPage <= 1) {
                    return
                } else {
                    this1.setState({
                        currentPage: this1.state.currentPage - 1
                    })
                    this1.changePageClass(pageAll)
                    this1.dataRenderFn(this1.state.fetchData)
                }
            }

            this.refs.next.onclick = () => {
                if (this1.state.currentPage >= pageAll.length) {
                    return
                } else {
                    this1.setState({
                        currentPage: this1.state.currentPage + 1
                    })
                    this1.changePageClass(pageAll)
                    this1.dataRenderFn(this1.state.fetchData)
                }
            }
        }
    }

    //查询事件
    search() {
        let searchBtn = document.querySelector('#search')
        let this1 = this
        searchBtn.onclick = () => {
            let pageSizeBox = document.querySelector('#page_num')
            let pageIndex = pageSizeBox.selectedIndex //获取被选中的索引
            this1.setState({
                pageSize: pageSizeBox[pageIndex].value

            })
            let start = document.querySelector('#start').value
            let end = document.querySelector('#end').value
            let tempArr = []
            let len = this1.state.fetchData.length
            if (start == '' && end == '') {
                this1.dataRenderFn(this1.state.fetchData)
                this1.renderPage(Math.ceil(len / this1.state.pageSize))
            } else if (start == '' && end != '') {
                for (let i = 0; i < len; i++) {
                    if (this1.state.fetchData[i].day <= end) {
                        tempArr.push(this1.state.fetchData[i])
                    }
                }
                console.log(tempArr.length)
                this1.dataRenderFn(tempArr)
                this1.renderPage(Math.ceil(tempArr.length / this1.state.pageSize))

            } else if (start != '' && end == '') {
                for (let i = 0; i < len; i++) {
                    if (this1.state.fetchData[i].day >= start) {
                        tempArr.push(this1.state.fetchData[i])
                    }
                }
                // console.log(tempArr.length)
                this1.dataRenderFn(tempArr)
                this1.renderPage(Math.ceil(tempArr.length / this1.state.pageSize))

            } else if (start != '' && end != '') {
                for (let i = 0; i < len; i++) {
                    if (this1.state.fetchData[i].day >= start && this1.state.fetchData[i].day <= end) {
                        tempArr.push(this1.state.fetchData[i])
                        // console.log(tempArr)
                    }
                }
                // console.log(tempArr.length)
                this1.dataRenderFn(tempArr)
                this1.renderPage(Math.ceil(tempArr.length / this1.state.pageSize))
            }
        }
    }


    render() {
        return (

            <div className="tabs">
                <div className="table_container">
                    <div className="select_box">
                        <select name="交易">
                            <option value="交易">交易</option>
                        </select>
                        <select name="页条数" id="page_num">
                            <option value="7">页条数</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        <span className="date_sel">
                            日期选择:
                    </span>
                        <div className="time_table">
                            <input type="date" name="start" id="start"></input>
                            <span>-</span>
                            <input type="date" name="end" id="end"></input>
                            <button id="search">查询</button>
                            <button id="sync">同步</button>
                            <span className="last_time"></span>
                        </div>


                    </div>

                    <div className="table_head">
                        <span>日期</span>
                        <span>付费人数</span>
                        <span>免费人数</span>
                        <span>客单价</span>
                        <span>总收入</span>
                        <span>到期(人)</span>
                        <span>新订(单)</span>
                        <span>续订(单)</span>
                        <span>升级(单)</span>
                        <span>后台(单)</span>
                        <span>续订率</span>
                        <span>一个月(单)</span>
                        <span>一季度(单)</span>
                        <span>半年(单)</span>
                        <span>一年(单)</span>
                        <span>来源</span>
                    </div>
                    <div ref='table_body' className="table_body">

                    </div>
                    <span ref='next' className="page_change next rightConer">下一页</span>
                    <div ref='pagination' className="pagination rightConer"></div>
                    <span ref='prev' className="page_change prev rightConer">上一页</span>
                </div>
            </div>
        );
    }
}

export default List;
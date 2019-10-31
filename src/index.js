import React from 'react'
import ReactDOM from 'react-dom'
// import LittleSister from './LittleSister'
import NavBar from './NavBar'


//JSX  javaScript and XML
//可以方便地利用HTML语法来创建虚拟DOM，当遇到<，jsx就当做HTML解析，遇到 { 就当做Js解析
ReactDOM.render(<NavBar/>,document.getElementById('root'))

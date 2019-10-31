import React,{Component} from 'react'

// 等同于 ： import React from 'react'
// const COmponent = React.Component

class App extends Component {
    render(){
        return(
    
        <ul className="my-list">
            <li>{false?'Threen':'鹿文'}</li>
            <li>hello</li>
            
        </ul>
        
        )
    }
}
export default App
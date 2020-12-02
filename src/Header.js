import React from 'react'

const Header = (props) => {
    const { text } = props    

    return (
        <header className="App-header"> 
            <h1> { text } </h1>
        </header>
    )
}

export default Header

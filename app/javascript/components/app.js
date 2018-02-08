import React, { Component } from 'react';
import Sidebar from './sidebar'
import Main from './main'

class App extends React.Component {
  render() {
    return(
      <div>
        <Sidebar />
        <Main />
      </div>
    )
  }
}

export default App;

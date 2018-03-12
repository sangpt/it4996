import React, { Component } from 'react'
import Home from './home'
import Forms from './forms';
import Extras from './extras'
import Dashboard from './dashboard'

class PageContent extends Component {
  render() {
    return (
      <div className="right_col" role="main">
        { Dashboard }
        { Forms }
        { Extras }
        { Home }
      </div>
    )
  }
}

export default PageContent

import React from 'react';
import ReactDOM from 'react-dom';
// import './css/custom.css';
// import registerServiceWorker from './registerServiceWorker';

import { Left, Top, Footer } from './navigation';
import history from './history';
import { Router } from 'react-router';
import PageContent, { Menu } from './routes';

// import AppFactory from './js/App';
// const App = AppFactory(React, Router, history, Left, Top, Footer, PageContent, Menu);

class App extends React.Component {
  render() {
    return (
      <Router history={ history }>
        <div className="container body">
          <div className="main_container">
            <Left>
              { Menu }
            </Left>
            <Top/>
            <PageContent/>
            <Footer/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

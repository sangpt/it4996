import React from 'react';
import { DatePicker } from 'antd';
// import { BrowserRouter } from 'react-router-dom';
// import 'antd/dist/antd.css';
import MainLayout from './Layout/MainLayout';
import WrappedNormalLoginForm from './Layout/NormalLoginForm';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './routes/dashboard';
import { router } from './Layout/config';
import axios from 'axios';

const {
    home,
    socialNetworks, sponsors, introductContent,
    staffs, policies, terms,
    intent, recruitment,
  } = router;

class App extends React.Component {
  constructor(props) {
    super(props);
    let loggedIn = !!this.getAccessToken();
    this.state = {
      loggedIn: loggedIn,
      loginData: {}
    }
  }

  getAccessToken = () => {
    return localStorage.getItem('access_token');
  }

  authorize = () => {
    let loggedIn = false;
    let data = {
      access_token: localStorage.getItem('access_token'),
    };
    axios.get('http://localhost:3000/sessions', {params: data})
      .then((res) => {
        console.log(res)
        if(res.data.status == 1) {
          // this.setState({loggedIn: true});
          loggedIn = true;
        }
      })
      .catch((err) => {
        console.log(err);
        loggedIn = false;
      })
    return loggedIn;
  }

  mainLayout = (
    <MainLayout handleLogout={this.handleLogout.bind(this)}>
      <Switch>
        <Route exact path={home} component={Dashboard} />
      </Switch>
    </MainLayout>
  );
  
  loginLayout = (
    <WrappedNormalLoginForm cb={this.getLoginData.bind(this)} />
  );

  getLoginData(loggedIn, loginData){
    this.setState({loggedIn: loggedIn, loginData: loginData})
  };

  handleLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    this.setState({loggedIn: false});
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          { this.state.loggedIn ? this.mainLayout : this.loginLayout }
        </Switch>
      </BrowserRouter>
    )
  }
}


function test(date, dateString) {
  console.log(date);
  console.log(dateString);
}

export default App;

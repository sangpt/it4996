import { Layout, Menu, Form, Icon, Input, Button, Checkbox, message, Spin } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../public/images/vbee-logo.png';
import logoIco from '../../../public/images/favicon.ico';
import './NormalLoginForm.scss';
import axios from 'axios';

const FormItem = Form.Item;
const spin = <Spin />;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getAccessToken();
      }
    });
  }

  getAccessToken = () => {
    axios.post('http://sso.baonoivn.vn/api/oath',
      {...this.props.form.getFieldsValue(), type: 'password'},
      {headers: {'Content-Type': 'application/json',}})
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          // document.cookie = `access_token=${res.data.access_token};user_id=${res.data.user_id}`;
          localStorage.setItem('access_token', res.data.access_token);
          localStorage.setItem('user_id', res.data.user_id);
          this.storeAccessToken(res.data);
        }
      })
      .catch((error) => {
        message.error('Wrong email or password!');
        console.log(error);
        let btn_login = document.getElementById('btn_login');
        btn_login.innerHTML = 'Log in';
      })
  }

  storeAccessToken = (data) => {
    axios.post('http://localhost:3000/sessions/', data)
      .then((res) => {
        console.log(res);
        if(res.status === 200) {
          this.props.cb(true, res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('Error when store access token');
      })
  }

  changeLoginText = () => {
    let btn_login = document.getElementById('btn_login');
    btn_login.innerHTML = 'Logging in...';
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-wrapper">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" id="btn_login" onClick={this.changeLoginText}>
              Log in
            </Button>
            Or <a href="#">register now!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
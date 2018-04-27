import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class NewAppForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="App ID">
          {getFieldDecorator('appId', {
            rules: [{ required: true, message: 'Please input app id!' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="App Name">
          {getFieldDecorator('appName', {
            rules: [{ required: true, message: 'Please input app name!' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(NewAppForm);
import React from 'react';
import {
  Layout,
  Table,
  Icon,
  Modal,
  Tabs,
  Spin,
  Row,
  Col,
  Button,
  Form,
  Input,
  Divider,
  message,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import url from '../../../utils/url';
import Skeleton from 'react-loading-skeleton';
import NewAppForm from './NewAppForm';

const { Content } = Layout;
const TabPane = Tabs.TabPane;

export default class Apps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tableData: [],
      visible: false,
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  
  componentWillMount() {
    axios.get(url('apps/index.json'))
      .then((res) => {
        if (res.status == 200) {
          this.setState({tableData: res.data, loading: false});
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }

  handDelete = (e) => {
    let id = e.target.dataset.id;
    Modal.confirm({
      title: 'Do you want to delete this app?',
      content: 'This app and its requests will be delete and cannot rollback. Please carefully!',
      onOk: () => {
        axios.post(url(`apps/destroy`), {id: id})
          .then((res) => {
            const tableData = [...this.state.tableData];
            this.setState({ tableData: tableData.filter(item => item.key !== id) });
            message.success('Delete successfully!');
          })
          .catch((err) => {
            message.error('Delete error!');
          })
      },
      onCancel() {}
    })
  }

  columns = () => {
    return [{
      title: 'App ID',
      dataIndex: 'app_id',
      key: 'app_id',
    }, {
      title: 'App Name',
      dataIndex: 'app_name',
      key: 'app_name',
    }, {
      title: 'Number Requests',
      dataIndex: 'number_requests',
      key: 'number_requests',
    }, {
      title: 'Percent Success',
      dataIndex: 'percent_success',
      key: 'percent_success',
    }, {
      title: 'Average',
      dataIndex: 'average',
      key: 'average',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          {/* <a href="javascript:void(0)">Show</a> */}
          <Divider type="vertical" />
          <a href="javascript:void(0)" onClick={this.handDelete} data-id={record.key} >Delete</a>
        </span>
      ),
    }];
  }

  render() {
    let btn_new = <Button type="primary" icon="plus" onClick={this.showModal}>New App</Button>;
    let skeleton = <Skeleton count={5} />;

    return (
      <Content>
        <Tabs defaultActiveKey="1" tabBarExtraContent={btn_new} >
          <TabPane tab="All Apps" key="1" >
          {this.state.loading ? skeleton : <Table
            columns={ this.columns() }
            dataSource={ this.state.tableData }
            scroll={{ x: false, y: false }} />}
          </TabPane>
        </Tabs>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <NewAppForm />
        </Modal>
      </Content>
    )
  }
}
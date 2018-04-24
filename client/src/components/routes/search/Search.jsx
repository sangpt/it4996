import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Layout,
  Table,
  Icon,
  Divider,
  Tabs,
  DatePicker,
  Spin,
  Row,
  Col,
  Tooltip,
  Input,
  Modal,
} from 'antd';
import axios from 'axios';

const { Content } = Layout;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: this.params.get('q'),
      visible: false,
      content: 'Loading...',
    }
  }

  params = new URLSearchParams(this.props.location.search);

  columns = () => {
    return [{
      title: 'Device id',
      dataIndex: 'device_id',
      key: 'device_id',
    }, {
      title: 'Origin Text',
      dataIndex: 'origin_text',
      key: 'origin_text',
      render: (text, record) => {
        return (
          <Tooltip title="Show more..." onClick={this.showModal}>
            <div data-content={record.full_origin_text}>
              { text }
            </div>
          </Tooltip>
        )
      }
    }, {
      title: 'Service name',
      dataIndex: 'service_name',
      key: 'service_name',
    }, {
      title: 'Voice name',
      dataIndex: 'voice_name',
      key: 'voice_name',
    }, {
      title: 'Start time',
      dataIndex: 'start_time',
      key: 'start_time',
    }, {
      title: 'End time',
      dataIndex: 'end_time',
      key: 'end_time',
    }, {
      title: 'Input type',
      dataIndex: 'input_type',
      key: 'input_type',
    }, {
      title: 'Output type',
      dataIndex: 'output_type',
      key: 'output_type',
    }, {
      title: 'Number of words',
      dataIndex: 'number_of_words',
      key: 'number_of_words',
    }];
  }

  handleSearch = () => {
    axios.get(`http://localhost:3000/api/v1/search/search_request.json?q=${this.state.q}`)
      .then((res) => {
        if (res.status == 200) {
          this.setState({tableData: res.data});
        }
      })
  }

  componentWillMount() {
    this.handleSearch();
  }

  showModal = (e) => {
    this.setState({
      visible: true,
      content: e.target.dataset.content
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

  render() {
    return (
      <Content>
        <Row>
          <Col span={18}>
            <Input.Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              defaultValue={new URLSearchParams(this.props.location.search).get('q')                                                                                                         }
              enterButton
            />
          </Col>
        </Row>

        <br />

        <Row>
          <Col span={24}>
            <Table
              columns={ this.columns() }
              dataSource={ this.state.tableData }
              scroll={{ x: false, y: false }} />
          </Col>

          <Modal
            title="Detail Content"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{ top: '20px', width: '100%' }}
            width={'70%'}
          >
            {this.state.content}
          </Modal>
        </Row>  
      </Content>
    )
  }
}

export default withRouter(Search);
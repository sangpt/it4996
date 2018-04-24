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
} from 'antd';

const { Content } = Layout;

class Search extends React.Component {
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
          <Tooltip title={record.full_origin_text} >
            { text }
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
              scroll={{ x: false, y: false }} />
          </Col>
        </Row>
      </Content>
    )
  }
}

export default withRouter(Search);
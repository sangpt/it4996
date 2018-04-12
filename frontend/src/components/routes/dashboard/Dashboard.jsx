import React from 'react';
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
} from 'antd';
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;
import axios from 'axios';
import moment from 'moment';
const { Content } = Layout;
import './Dashboard.scss';
var Highcharts = require('highcharts');

function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
  console.log('onOk: ', value);
}

const rangePicker = <RangePicker
  showTime={{ format: 'HH:mm' }}
  format="YYYY-MM-DD HH:mm"
  placeholder={['Start Time', 'End Time']}
  onChange={onChange}
  onOk={onOk}
  defaultValue={[moment().startOf('month'), moment()]}
  format="YYYY-MM-DD"
/>

const spin = <Spin />;

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      loading: true,
      topTitleData: {
        total_requests: null,
        success: null,
        error: null,
        average: null
      },
      tableDetailData: [],
      activeKey: "1",
      backable: false,
      columns: this.columns(),
      topApp: []
    }
  }

  loadData = () => {
    axios.get('http://localhost:3000/api/v1/dashboards/table_request.json')
      .then((response) => {
        if(response.status == 200) {
          this.setState({tableData: response.data, loading: false});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    
    axios.get('http://localhost:3000/api/v1/dashboards/top_title.json')
      .then((res) => {
        if (res.status == 200) {
          this.setState({topTitleData: res.data});
        }
      })

    axios.get('http://localhost:3000/api/v1/dashboards/chart_number_requests.json')
      .then((res) => {
        if (res.status == 200) {
          this.setState({chartData: res.data});
        }
      })

    axios.get('http://localhost:3000/api/v1/dashboards/top_app.json')
      .then((res) => {
        if (res.status == 200) {
          this.setState({topApp: res.data});
        }
      })
  }

  componentWillMount() {
    this.loadData();
  }

  componentDidUpdate() {
    if (this.state.chartData) {
      Highcharts.chart('chart_requests', this.state.chartData);
    }
  }

  showDetail = (e) => {
    this.setState((prevState, props) => {
      return {loading: true, backupTableData: prevState.tableData};
    });
    axios.get(`http://localhost:3000/api/v1/dashboards/request_date.json?date=${e.target.dataset.date}`)
      .then((res) => {
        if (res.status == 200) {
          this.setState({columns: this.columnsDetail(), tableData: res.data, loading: false, backable: true});
        }
      })
  }

  columns = () => {
    return [{
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: 'Number Requests',
      dataIndex: 'number_requests',
      key: 'number_requests',
    }, {
      title: 'Success',
      dataIndex: 'success',
      key: 'success',
    }, {
      title: 'Fail',
      dataIndex: 'fail',
      key: 'fail',
    }, {
      title: 'Average',
      dataIndex: 'average',
      key: 'average',
    }, {
      title: 'Total Words',
      dataIndex: 'total_words',
      key: 'total_words',
    }, {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => <a href="javascript:void(0)" onClick={this.showDetail} data-date={record.date} >{text}</a>,
    }];
  }

  columnsDetail = () => {
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

  backButton = () => {
    return (
      <a href="javascript:void(0)" onClick={this.handleBackButton} >
        <Icon type="left" /> Back
      </a>
    )
  }

  handleBackButton = () => {
    this.setState((prevState, props) => {
      return {
        columns: this.columns(),
        tableData: prevState.backupTableData,
        backable: false,
      }
    })
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={6}>
            <Content>
            <Icon type="line-chart" /> Total Requests
              <h1>{ this.state.topTitleData.total_requests }</h1>
            </Content>
          </Col>
          <Col span={6}>
            <Content>
            <Icon type="check" /> Success
              <h1 style={{ color: 'green' }}>{ this.state.topTitleData.success }</h1>
            </Content>
          </Col>
          <Col span={6}>
            <Content>
            <Icon type="close" /> Error
              <h1 style={{ color: 'red' }}>{ this.state.topTitleData.error }</h1>
            </Content>
          </Col>
          <Col span={6}>
            <Content>
            <Icon type="calculator" /> Average
              <h1 style={{ color: 'yellow' }}>{ this.state.topTitleData.average }</h1>
            </Content>
          </Col>
        </Row>

        <Content>
          <Tabs defaultActiveKey="1" tabBarExtraContent={rangePicker} >
            <TabPane tab="Chart" key="1" >
              { !this.state.chartData ? spin :
                <Row>
                  <Col span={18}>
                    <div id="chart_requests"></div>
                  </Col>
                  <Col span={6}>
                    <div className="salesRank">
                      <h4 className="rankingTitle">Top usage app</h4>
                      <ul className="rankingList">
                        {
                          this.state.topApp.map((item, i) => {
                            return (
                              <li key={i}>
                                <span className={i < 3 ? 'active' : ''}>{i + 1}</span>
                                <span>{item.app_name}</span>
                                <span>{item.count}</span>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  </Col>
                </Row>
              }
            </TabPane>
          </Tabs>
        </Content>

        <Content>
          <Tabs defaultActiveKey="1" tabBarExtraContent={this.state.backable ? this.backButton() : null} >
            <TabPane tab="All Request" key="1" >
              {this.state.loading ? spin : <Table
                columns={ this.state.columns }
                dataSource={ this.state.tableData }
                scroll={{ x: false, y: false }} />}
            </TabPane>
          </Tabs>
        </Content>
      </div>
    )
  }
}

let highChart = (chartData) => {
  return (
    <div id="chart_requests">
      
    </div>
  )
}

var option = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Monthly Average Rainfall'
  },
  subtitle: {
    text: 'Source: WorldClimate.com'
  },
  xAxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Rainfall (mm)'
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: [
    {
      name: 'Tokyo',
      data: [
        49.9,
        71.5,
        106.4,
        129.2,
        144.0,
        176.0,
        135.6,
        148.5,
        216.4,
        194.1,
        95.6,
        54.4
      ]

    }, {
      name: 'New York',
      data: [
        83.6,
        78.8,
        98.5,
        93.4,
        106.0,
        84.5,
        105.0,
        104.3,
        91.2,
        83.5,
        106.6,
        92.3
      ]

    }, {
      name: 'London',
      data: [
        48.9,
        38.8,
        39.3,
        41.4,
        47.0,
        48.3,
        59.0,
        59.6,
        52.4,
        65.2,
        59.3,
        51.2
      ]

    }, {
      name: 'Berlin',
      data: [
        42.4,
        33.2,
        34.5,
        39.7,
        52.6,
        75.5,
        57.4,
        60.4,
        47.6,
        39.1,
        46.8,
        51.1
      ]

    }
  ]
}
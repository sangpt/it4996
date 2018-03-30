import React, { Component } from 'react'
import XPanel from '../../../components/XPanel'
import DateRangePicker from '../../../components/DateRangePicker'
import Highchart from '../../../components/widgets/Highchart'
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'

const option = {
  startDate: moment().startOf('month'),
  endDate: moment(),
  dateLimit: {
    days: 60
  },
  containerClass: 'pull-right',
  containerStyles: {background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc'},
  showDropdowns: true,
  showWeekNumbers: true,
  timePicker: false,
  timePickerIncrement: 1,
  timePicker12Hour: true,
  ranges: {
    'Today': [
      moment(), moment()
    ],
    'Yesterday': [
      moment().subtract(1, 'days'),
      moment().subtract(1, 'days')
    ],
    'Last 7 Days': [
      moment().subtract(6, 'days'),
      moment()
    ],
    'Last 30 Days': [
      moment().subtract(29, 'days'),
      moment()
    ],
    'This Month': [
      moment().startOf('month'), moment().endOf('month')
    ],
    'Last Month': [
      moment().subtract(1, 'month').startOf('month'),
      moment().subtract(1, 'month').endOf('month')
    ]
  },
  opens: 'left',
  buttonClasses: ['btn btn-default'],
  applyClass: 'btn-small btn-primary',
  cancelClass: 'btn-small',
  format: 'DD/MM/YYYY',
  separator: ' to ',
  locale: {
    applyLabel: 'Submit',
    cancelLabel: 'Clear',
    fromLabel: 'From',
    toLabel: 'To',
    customRangeLabel: 'Custom',
    daysOfWeek: [
      'Su',
      'Mo',
      'Tu',
      'We',
      'Th',
      'Fr',
      'Sa'
    ],
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    firstDay: 1
  }
}

class Chart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panelVisible: true,
      startDate: option.startDate,
      endDate: option.endDate,
      url: '/api/v1/dashboards/chart_number_requests.json'
    }
    // this.handleCallBack(option.startDate, option.endDate);
  }

  handleCallBack(start, end) {
    $('#date_range_picker').html(start.format('MMMM DD, YYYY') + ' - ' + end.format('MMMM DD, YYYY'));
  }

  handleApply(event, picker) {
    let startDate = picker.startDate.format('YYYY-MM-DD');
    let endDate = picker.endDate.format('YYYY-MM-DD');
    this.setState({url: `/api/v1/dashboards/chart_number_requests.json?start_date=${startDate}&end_date=${endDate}`})
    // console.log(this.state.url);
  }

  render () {
    const { panelVisible } = this.state
    const onHide = e => this.setState({panelVisible: !panelVisible})
    // console.log('render chart.js');
    return (
      <XPanel visible={panelVisible} onHide={onHide}>
      <div className="x_title">
        <Row>
          <Col md={6} xs={6}>
            <h2>Chart</h2>
          </Col>
          <Col md={6} xs={6}>
          <DateRangePicker {...option} callback={this.handleCallBack} onApply={this.handleApply.bind(this)}>
            <i className="glyphicon glyphicon-calendar fa fa-calendar"></i>
            <span id="date_range_picker">Choose date range...</span> <b className="caret"></b>
          </DateRangePicker>
          </Col>
        </Row>
        <div className="clearfix"></div>
      </div>
        <XPanel.Content>
          <div className="dashboard-widget-content">
            <Highchart url={this.state.url} />
          </div>
        </XPanel.Content>
      </XPanel>
    )
  }
}

export default Chart

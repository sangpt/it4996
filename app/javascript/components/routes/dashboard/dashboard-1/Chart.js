import React, { Component } from 'react'
import XPanel from '../../../components/XPanel'
import DateRangePicker from '../../../components/DateRangePicker'
import Highchart from '../../../components/widgets/Highchart'
import { Row, Col } from 'react-bootstrap'

class Chart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      panelVisible: true
    }
  }

  render () {
    const { panelVisible } = this.state
    const onHide = e => this.setState({panelVisible: !panelVisible})

    return (
      <XPanel visible={panelVisible} onHide={onHide}>
      <div className="x_title">
        <Row>
          <Col md={6} xs={6}>
            <h2>Chart</h2>
          </Col>
          <Col md={6} xs={6}>
            <DateRangePicker />
          </Col>
        </Row>
        <div className="clearfix"></div>
      </div>
        <XPanel.Content>
          <div className="dashboard-widget-content">
            <Highchart url={'/api/v1/dashboards/chart_number_requests.json'} start_date={}/>
          </div>
        </XPanel.Content>
      </XPanel>
    )
  }
}

export default Chart

import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import NetworkActivities from './NetworkActivities'
import AppVersions from './AppVersions'
import DeviceUsage from './DeviceUsage'
import QuickSettings from './QuickSettings'
import RecentActivities from './RecentActivities'
import VisitorsLocations from './VisitorsLocations'
import TodoList from './TodoList'
import Weather from './Weather'
import TopTile from './TopTile'
import Chart from './Chart'
import TableRequest from './TableRequest'

class Dashboard extends Component {
  render () {

    return (
      <div>
          {/*  top tiles  */}
          <TopTile />
          <Row>
            <Col md={12} sm={12} xs={12}>
              <Chart />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={12} sm={12} xs={12}>
              <TableRequest />
            </Col>
          </Row>
          <br />
        </div>
    )
  }
}

export default Dashboard

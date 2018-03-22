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

          <Row>
            <RecentActivities />
            <Col md={8} sm={8} xs={12}>
              <Row>
                <Col md={12} sm={12} xs={12}>
                  <VisitorsLocations />
                </Col>
              </Row>
              <Row>
                <Col md={6} sm={6} cs={12}>
                  <TodoList />
                </Col>
                <Col md={6} sm={6} xs={12}>
                    <Weather />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
    )
  }
}

export default Dashboard

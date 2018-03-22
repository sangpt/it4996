import React, { Component } from 'react'
import XPanel from '../../../components/XPanel'
import Highchart from '../../../components/widgets/Highchart'
import { Col } from 'react-bootstrap'

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
        <XPanel.Title title="Chart" smallTitle="geo-presentation" />
        <XPanel.Content>
          <div className="dashboard-widget-content">
            <Highchart url={'/api/v1/dashboards/chart_number_requests.json'}/>
          </div>
        </XPanel.Content>
      </XPanel>
    )
  }
}

export default Chart

import React from 'react';
import XPanel from '../../../components/XPanel';
import Datatable from './Datatable'

class TableRequest extends React.Component {
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
        <XPanel.Title title="Chart" />
        <XPanel.Content>
          <div className="dashboard-widget-content">
            <Datatable url={"/api/v1/dashboards/table_request.json"} />
          </div>
        </XPanel.Content>
      </XPanel>
    )
  }
}

function table() {
  return(
    <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>This is a modal</h1>
      </Modal.Body>
    </Modal>
  )
}

export default TableRequest;

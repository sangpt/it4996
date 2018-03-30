import React from 'react';
import { Modal } from 'react-bootstrap'

class Datatable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {url: this.props.url}
  }

  componentWillMount() {
    $.ajax({
      url: this.state.url,
      type: 'GET',
      dataType: 'json',
      success: (res) => {
        this.setState({rows: res});
      }
    });
  }

  initDatatable() {
    var t = $('#datatable').DataTable({
      columnDefs: [
        {searchable: false, orderable: false, targets: 0},
        {orderable: false, targets: 'stt', width: '25px'},
        {orderable: false, targets: 'action', width: '7%', className: 'action dt-center'}
      ],
      oLanguage: {
        sSearch: 'Search'
      },
      order: [],
      pageLength: 25,
      destroy: true,
      autoWidth: false,
      processing: true
    });

    t.on('order.dt search.dt', function () {
      t.column(0, {search: 'applied', order: 'applied'}).nodes().each(function(cell, i) {
        cell.innerHTML = i + 1;
      });
    }).draw();

    var tt = $('#datatable_popup').DataTable({
      columnDefs: [
        {searchable: false, orderable: false, targets: 0},
        {orderable: false, targets: 'stt', width: '25px'},
        {orderable: false, targets: 'action', width: '7%', className: 'action dt-center'}
      ],
      oLanguage: {
        sSearch: 'Search'
      },
      order: [],
      pageLength: 10,
      destroy: true,
      autoWidth: false,
      processing: true
    });

    tt.on('order.dt search.dt', function () {
      tt.column(0, {search: 'applied', order: 'applied'}).nodes().each(function(cell, i) {
        cell.innerHTML = i + 1;
      });
    }).draw();
  }
  componentDidMount() {
    this.initDatatable();
  }

  componentDidUpdate() {
    this.initDatatable();
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(date, event) {
    $.ajax({
      url: '/api/v1/dashboards/request_date',
      type: 'GET',
      dataType: 'json',
      data: {date: date},
      success: (res) => {
        this.setState({ show: true, html: res.html, date: date });
        $('#modal_body').html(res.html);
        this.initDatatable();
      }
    });
  }

  render() {
    if (this.state.rows) {
      return(
        <table id="datatable" className="table table-striped table-bordered dataTable no-footer">
          <thead>
            <tr>
              <td className="stt">#</td>
              <td>Date</td>
              <td>Number of requests</td>
              <td>Success</td>
              <td>Fail</td>
              <td>Average Duration</td>
              <td>Total word</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {
              this.state.rows.map(row.bind(this))
            }
          </tbody>
          <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Date: {this.state.date}</Modal.Title>
            </Modal.Header>
            <Modal.Body id="modal_body">

            </Modal.Body>
          </Modal>
        </table>
      )
    } else {
      return(
        <div>Loading...</div>
      )
    }
  }
}

function row(element, index) {
  return(
    <tr key={index.toString()}>
      <td></td>
      <td>{element.date}</td>
      <td>{element.number_requests}</td>
      <td>{element.success}</td>
      <td>{element.fail}</td>
      <td>{element.average}</td>
      <td>{element.total_word}</td>
      <td><a href="javascript:void(0)" onClick={this.handleShow.bind(this, element.date)} data-date={element.date}>View</a></td>
    </tr>
  )
}

function table() {
  return(
    <Modal show={this.state.show}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>This is a modal</h1>
      </Modal.Body>
    </Modal>
  )
}

export default Datatable;

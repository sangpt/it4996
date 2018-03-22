import React from 'react';

class Datatable extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {url: this.props.url}
  }

  componentWillMount() {
    $.ajax({
      url: this.state.url,
      type: 'GET',
      dataType: 'json',
      success: (res) => {
        console.log(res);
        this.setState({rows: res});
      }
    });
  }

  componentDidMount() {
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
              this.state.rows.map(row)
            }
          </tbody>
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
      <td>Action</td>
    </tr>
  )
}

export default Datatable;

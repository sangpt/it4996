$(function() {
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

});
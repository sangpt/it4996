$(document).ready(function() {
  var t = $('#datatable').DataTable({
    columnDefs: [
      {searchable: false, orderable: false, targets: 0},
      {orderable: false, targets: 'stt', width: '25px'},
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

  t.on('order.dt search.dt', function () {
    var order_column = $('.bulk_action').length == 0 ? 0 : 1;

    t.column(order_column, {search: 'applied', order: 'applied'}).nodes().each(function(cell, i) {
      cell.innerHTML = i + 1;
    });
  }).draw();
});

$(document).ready(function() {
  init_daterangepicker();
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

function init_daterangepicker() {

			if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }
			console.log('init_daterangepicker');

			var cb = function(start, end, label) {
			  console.log(start.toISOString(), end.toISOString(), label);
			  $('#reportrange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
			};

			var optionSet1 = {
			  startDate: moment().subtract(29, 'days'),
			  endDate: moment(),
			  minDate: '01/01/2012',
			  maxDate: '12/31/2015',
			  dateLimit: {
				days: 60
			  },
			  showDropdowns: true,
			  showWeekNumbers: true,
			  timePicker: false,
			  timePickerIncrement: 1,
			  timePicker12Hour: true,
			  ranges: {
				'Today': [moment(), moment()],
				'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'Last 7 Days': [moment().subtract(6, 'days'), moment()],
				'Last 30 Days': [moment().subtract(29, 'days'), moment()],
				'This Month': [moment().startOf('month'), moment().endOf('month')],
				'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			  },
			  opens: 'left',
			  buttonClasses: ['btn btn-default'],
			  applyClass: 'btn-small btn-primary',
			  cancelClass: 'btn-small',
			  format: 'MM/DD/YYYY',
			  separator: ' to ',
			  locale: {
				applyLabel: 'Submit',
				cancelLabel: 'Clear',
				fromLabel: 'From',
				toLabel: 'To',
				customRangeLabel: 'Custom',
				daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
				monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				firstDay: 1
			  }
			};

      var hihi = function () {
        var params = window.location.search.substr(1);
        var startDate = params.substr(11, 10);
        var endDate = params.substr(31, 10);
        var default_text = moment().startOf('month').format('YYYY-MM-DD') + ' ~ ' + moment().format('YYYY-MM-DD');
        var text = params.length == 0 ? default_text : startDate + ' ~ ' + endDate;
        return text;
      }

			$('#reportrange span').html(hihi());
			$('#reportrange').daterangepicker(optionSet1, cb);
			$('#reportrange').on('show.daterangepicker', function() {
			  console.log("show event fired");
			});
			$('#reportrange').on('hide.daterangepicker', function() {
			  console.log("hide event fired");
			});
			$('#reportrange').on('apply.daterangepicker', function(ev, picker) {
			  console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
        var startDate = picker.startDate.format('YYYY-MM-DD');
        var endDate = picker.endDate.format('YYYY-MM-DD');
        window.location += '?start_date=' + startDate + '&end_date=' + endDate;
			});
			$('#reportrange').on('cancel.daterangepicker', function(ev, picker) {
			  console.log("cancel event fired");
			});
			// $('#options1').click(function() {
			//   $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
			// });
			// $('#options2').click(function() {
			//   $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
			// });
			// $('#destroy').click(function() {
			//   $('#reportrange').data('daterangepicker').remove();
			// });

		}

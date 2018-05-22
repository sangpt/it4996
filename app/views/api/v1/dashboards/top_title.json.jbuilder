# stats = [
#   {
#     title: {icon: 'clock-o', label: 'Total Requests'},
#     value: {label: @form.total_requests},
#     bottom: {label: 'request'}
#   },
#   {
#     title: {icon: 'clock-o', label: 'Total Word'},
#     value: {label: @form.total_words},
#     bottom: {label: 'word'}
#   },
#   {
#     title: {icon: 'clock-o', label: 'Total Request Success'},
#     value: {label: @form.total_request_success},
#     bottom: {label: 'requests'}
#   },
#   {
#     title: {icon: 'clock-o', label: 'Total Request Error'},
#     value: {label: @form.total_requests_error},
#     bottom: {className: 'red', label: 'request'}
#   },
#   {
#     title: {icon: 'clock-o', label: 'Average Duration (s)'},
#     value: {label: @form.average_duration},
#     bottom: {label: 'second'}
#   },
#   {
#     title: {icon: 'clock-o', label: 'Average Per Word (s)'},
#     value: {label: @form.average_per_word},
#     bottom: {label: 'second'}
#   },
# ]

json.total_requests @form.total_requests
json.success @form.total_request_success
json.error @form.total_requests_error
json.average @form.average_duration

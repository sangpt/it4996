stats = [
  {
    title: {icon: 'clock-o', label: 'Total Requests'},
    value: {label: @form.total_requests},
    bottom: {label: 'request'}
  },
  {
    title: {icon: 'clock-o', label: 'Total Word'},
    value: {label: @form.total_words},
    bottom: {label: 'word'}
  },
  {
    title: {icon: 'clock-o', label: 'Total Request Success'},
    value: {label: @form.total_request_success},
    bottom: {label: 'requests'}
  },
  {
    title: {icon: 'clock-o', label: 'Total Request Error'},
    value: {label: @form.total_requests_error},
    bottom: {className: 'red', label: 'request'}
  },
  {
    title: {icon: 'clock-o', label: 'Average Duration (s)'},
    value: {label: @form.average_duration},
    bottom: {label: 'second'}
  },
  {
    title: {icon: 'clock-o', label: 'Average Per Word (s)'},
    value: {label: @form.average_per_word},
    bottom: {label: 'second'}
  },
]

json.array! stats do |stat|
  json.title stat[:title]
  json.value stat[:value]
  json.bottom 'bottom'
end

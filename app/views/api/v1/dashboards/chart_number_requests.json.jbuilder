json.chart do
  json.type 'column'
end
json.title do
  json.text 'Number of Requests chart'
end
# json.subtitle do
#   json.text 'By number of Requests'
# end
json.xAxis do
  json.categories @data.keys.map(&:to_s)
  json.crosshair true
end
json.yAxis do
  json.min 0
  json.title do
    json.text 'Requests'
  end
end
json.tooltip do
  json.headerFormat '<span style="font-size:10px">{point.key}</span><table>'
  json.pointFormat '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} requests</b></td></tr>'
  json.footerFormat '</table>'
  json.shared true
  json.useHTML true
end
json.plotOptions do
  json.column do
    json.pointPadding 0.2
    json.borderWidth 0
  end
end
json.series [{
  name: 'Number of requests',
  data: @data.values.map(&:count)
}]

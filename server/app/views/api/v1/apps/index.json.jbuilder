json.array! @apps do |app|
  json.key app.id.to_s
  json.app_id app.app_id
  json.app_name app.app_name
  json.number_requests app.requests.count
  if app.requests.present?
    json.percent_success number_to_percentage(app.requests.success.count.to_f / app.requests.count.to_f * 100, precision: 2)
    json.average (app.requests.avg(:duration)/1000).to_i
  end
end
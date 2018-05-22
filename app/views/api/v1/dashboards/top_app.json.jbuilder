json.array! @top_app do |app|
    json.app_name app.last.first
    json.count app.last.last
end
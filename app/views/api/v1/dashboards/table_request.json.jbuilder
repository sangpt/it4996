json.array! @data do |row|
  json.date row.first
  json.number_requests row.second.count
  json.success row.second.select{|r| r.success?}.count
  json.fail row.second.select{|r| r.error?}.count
  json.average row.second.map(&:duration).reduce(:+).to_i / row.second.count
  json.total_word row.second.map(&:number_of_words).reduce(:+)
  json.action link_to("View", requests_client_path(current_client, date: row.first), remote: true)
end

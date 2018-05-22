json.array! @data do |row|
  json.key row.first
  json.date row.first
  json.number_requests row.second.count
  json.success row.second.select(&:success?).count
  json.fail row.second.select(&:error?).count
  json.average row.second.map(&:duration).reduce(:+).to_i / row.second.count
  json.total_words row.second.map(&:number_of_words).reduce(:+)
  json.action "View"
end

json.array! @requests do |request|
    json.key request.id.to_s
    json.device_id request.device_id
    json.origin_text request.origin_text
    json.short_origin_text (request.origin_text.length < 150 ? request.origin_text : request.origin_text[0..147] << "...")
    json.service_name request.service_name
    json.voice_name request.voice_name
    json.start_time request.start_time
    json.end_time request.end_time
    json.input_type request.input_type
    json.output_type request.output_type
    json.number_of_words request.number_of_words
  end
  
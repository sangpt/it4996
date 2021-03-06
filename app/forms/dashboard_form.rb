class DashboardForm
  attr_accessor :requests

  def initialize requests
    @requests = requests
  end

  def total_requests
    requests.nil? ? 0 : requests.size
  end

  def total_characters
    requests.nil? ? 0 : requests.reduce(0) {|sum, req| sum += req.origin_text.length}
  end

  def total_words
    requests.nil? ? 0 : requests.sum(:number_of_words)
  end

  def total_request_success
    requests.nil? ? 0 : requests.success.size
  end

  def total_requests_error
    requests.nil? ? 0 : requests.size - total_request_success
  end

  def average_duration
    requests.nil? ? 0 : requests.success.avg(:duration).to_i
  end

  def average_per_word
    begin
      (requests.sum(:duration) / requests.sum(:token_number))
    rescue
      0
    end
  end
end

class DashboardForm
  attr_accessor :requests

  def initialize requests
    @requests = requests
  end

  def total_requests
    requests.nil? ? 0 :requests.size
  end

  def total_words
    requests.nil? ? 0 : requests.sum(:token_number)
  end

  def total_request_success
    requests.nil? ? 0 : requests.success.size
  end

  def total_requests_error
    requests.nil? ? 0 : requests.error.count
  end

  def average_duration
    requests.nil? ? 0 : requests.avg(:duration).to_i
  end

  def average_per_word
    begin
      (requests.sum(:duration) / requests.sum(:token_number))
    rescue
      0
    end
  end
end

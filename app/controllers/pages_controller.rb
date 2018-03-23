class PagesController < ApplicationController
  def index
    # @dates = client.requests.pluck(:start_time).map(&:to_date)
    # @dates = client.requests.collection.aggregate(
    #   [
    #     {'$sort': {start_time: -1}},
    #     {'$group': {
    #       _id: {
    #         day: {'$dayOfMonth': '$start_time'},
    #         month: {'$month': '$start_time'},
    #         year: {'$year': '$start_time'}
    #       },
    #       count: {'$sum': 1}
    #     }},
    #   ]
    # )
    # requests = client.requests
    @data = requests.group_by{|request| request.start_time.to_date}.sort.to_h
    @today_requests = client.requests.from_beginning_of_month
  end

  private

  def requests
    return client.requests.from_beginning_of_month unless params[:start_date] && params[:end_date]
    start_date = Date.new *params[:start_date].split("-").map(&:to_i)
    end_date = Date.new *params[:end_date].split("-").map(&:to_i)
    @requests ||= (client.requests.between_date(start_date, end_date) || client.requests.from_beginning_of_month)
  end

  def client
    current_client
  end
end

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
    @requests = client.requests
    @data = @requests.group_by do |request|
      request.start_time.to_date
    end
    @today_requests = @requests.today
  end

  private

  def client
    current_client
  end

  def today_statitics
    @today_requests = @requests.today
  end
end

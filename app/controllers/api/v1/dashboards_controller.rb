class Api::V1::DashboardsController < ApplicationController
  respond_to :json

  def top_title
    @requests = client.requests
    @this_months_requests = @requests.from_beginning_of_month
    @form = ::DashboardForm.new @this_months_requests
  end

  def chart_number_requests
    @requests = client.requests
    @data = @requests.group_by{|request| request.start_time.to_date}.sort.last(7).to_h
  end

  private

  attr_accessor :requests

  def client
    current_client
  end
end

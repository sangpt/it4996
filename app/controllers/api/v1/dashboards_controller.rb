class Api::V1::DashboardsController < ApplicationController
  respond_to :json

  def top_title
    @requests = client.requests
    @this_months_requests = @requests.from_beginning_of_month
    @form = ::DashboardForm.new @this_months_requests
  end

  def chart_number_requests
    @requests = client.requests
    @data = @requests.group_by{|request| Time.at(request.start_time/1000).to_date}.sort.last(7).to_h
  end

  def table_request
    @requests = client.requests
    @data = @requests.group_by{|request| Time.at(request.start_time/1000).to_date}.sort.to_h
  end

  private

  attr_accessor :requests

  def client
    current_client
  end
end

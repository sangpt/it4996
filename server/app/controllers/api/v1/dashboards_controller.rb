class Api::V1::DashboardsController < ApplicationController
  # respond_to :json

  def top_title
    # @requests = client.requests
    @this_months_requests = requests.from_beginning_of_month
    @form = ::DashboardForm.new @this_months_requests
  end

  def chart_number_requests
    # @requests = client.requests
    @data = requests.group_by{|request| Time.at(request.start_time/1000).to_date}.sort.last(7).to_h
  end

  def table_request
    # @requests = client.requests
    @data = requests.group_by{|request| Time.at(request.start_time/1000).to_date}.sort.to_h
  end

  def request_date
    @requests = requests.in_date date
    # render json: {
    #   html: render_to_string(partial: "pages/table_popup", locals: {requests: requests.in_date(date)}, layout: false)
    # }
    # j render "pages/table_popup", requests: @requests
  end

  def top_app
    @top_app = client.apps.inject({}){|hash, app| hash.merge(app.id.to_s => [app.app_name, app.requests.count])}
      .sort_by{|app| app.last.last}.reverse.first(5)
  end

  private

  attr_accessor :requests

  def requests
    return client.requests.from_beginning_of_month if params[:start_date].blank? && params[:end_date].blank?
    start_date = Date.new(*params[:start_date].split("-").map(&:to_i))
    end_date = Date.new(*params[:end_date].split("-").map(&:to_i))
    @requests = (client.requests.between_date(start_date, end_date) || client.requests.from_beginning_of_month)
  end

  def client
    session[:abc] = 123
    # current_client
    Client.test
  end

  def date
    Date.new(*params[:date].split("-").map(&:to_i))
  end
end

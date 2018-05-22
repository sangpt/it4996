class DashboardController < ApplicationController
  def index
    @data = client.requests.group_by{|request| request.start_time.to_date}.sort.to_h
    @form = ::DashboardForm.new requests.from_beginning_of_month
    @top_app = client.apps.inject({}){|hash, app| hash.merge(app.id.to_s => [app.name, app.requests.from_beginning_of_month.count])}
      .sort_by{|app| app.last.last}.reverse.first(5)
  rescue

  end

  private

  attr_accessor :requests

  def requests
    client.requests
    # return client.requests.from_beginning_of_month if params[:start_date].blank? && params[:end_date].blank?
    # start_date = Date.new(*params[:start_date].split("-").map(&:to_i))
    # end_date = Date.new(*params[:end_date].split("-").map(&:to_i))
    # @requests = (client.requests.between_date(start_date, end_date) || client.requests.from_beginning_of_month)
  end

  def client
    current_user.client
  end

  def date
    Date.new(*params[:date].split("-").map(&:to_i))
  end
end

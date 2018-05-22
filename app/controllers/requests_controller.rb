class RequestsController < ApplicationController
  def index
    @requests = Request.in_date date
  end

  private

  def date
    Date.new(*params[:date].split("-").map(&:to_i))
  end
end

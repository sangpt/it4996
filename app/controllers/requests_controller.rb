class RequestsController < ApplicationController
  def index
    @requests = Request.in_date date

    if params[:app]
      @requests = @requests.where app_id: params[:app]
    end
  end

  private

  def date
    Date.new(*params[:date].split("-").map(&:to_i))
  end
end

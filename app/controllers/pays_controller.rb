class PaysController < ApplicationController
  before_action :load_unit, only: :create

  def index

  end

  def create
    @requests = get_request_by_type

    render json: {
      content: render_to_string(
        partial: "requests/requests_table",
        locals: {requests: @requests}
      ),
      quantity: @requests.is_not_paid.try(:count) || 0,
      price: (@requests.is_not_paid.try(:count) || 0) * @unit.price
    }
  end

  private

  def load_unit
    @unit = Unit.find params[:unit]
  end

  def get_request_by_type
    start_date = params[:start_date].to_date
    end_date = params[:end_date].to_date
    request = params[:show_all] ? "Request" : "Request.is_not_paid"

    case @unit.type
    when "request"
      return eval(request).between_date start_date, end_date
    end
  end
end

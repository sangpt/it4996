class PaysController < ApplicationController
  before_action :load_unit, only: :create

  def index

  end

  def create
    @requests = get_request_by_type
    cash = params[:cash].to_f
    quantity = @requests.is_not_paid.try(:count) || 0
    total = quantity * @unit.price
    current_credit = client.credit
    message = ""

    after_credit = if cash >= total
      cash - total + current_credit
    else
      num = (cash / @unit.price).floor
      @requests = @requests.limit num
      message = "You didn't pay enough money. So we will pay for first #{num} request. Please check below!"
      (cash % @unit.price) + current_credit
    end

    render json: {
      content: render_to_string(
        partial: "requests/requests_table",
        locals: {requests: @requests}
      ),
      unit: @unit.type,
      price: @unit.price,
      cash: cash,
      quantity: quantity,
      total: total,
      after_credit: after_credit,
      message: message
    }
  end

  private

  def client
    if params[:client]
      Client.find params[:client]
    else
      current_user.client
    end
  end

  def load_unit
    @unit = Unit.find params[:unit]
  end

  def get_request_by_type
    start_date = params[:start_date].to_date
    end_date = params[:end_date].to_date
    request = params[:show_all] ? "Request" : "Request.is_not_paid"

    case @unit.type
    when "request"
      return eval(request).of_client(client).between_date start_date, end_date
    end
  end
end

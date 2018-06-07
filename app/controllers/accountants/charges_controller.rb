class Accountants::ChargesController < ApplicationController
  before_action :load_unit, only: :create

  def index
    #code
  end

  def create
    @requests = get_request_by_type
    cash = params[:cash].to_f
    quantity = @requests.is_not_paid.try(:count) || 0
    total = quantity * @unit.price
    current_credit = client.credit

    after_credit = if cash >= total
      cash - total + current_credit
    else
      num = (cash / @unit.price).floor
      @requests = @requests.limit num
      message = "You didn't pay enough money. So we will pay for first #{num} request. Please check below!"
      (cash % @unit.price) + current_credit
    end

    @requests.update_all is_paid: true
    PayHistory.create unit: @unit, start_date: params[:start_date], end_date: params[:end_date],
      total: total, client: client, cash: cash, credit: current_credit, after_credit: after_credit,
      quantity: quantity
    client.update_attributes credit: after_credit

    render json: {
      status: :success,
      client_name: client.name,
      num: quantity,
      total: total
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

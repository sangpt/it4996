class Accountants::PayHistoriesController < ApplicationController
  def index
    @pay_histories = PayHistory.all
  end
end

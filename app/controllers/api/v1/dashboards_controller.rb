class Api::V1::DashboardsController < ApplicationController
  respond_to :json

  def top_title
    @requests = client.requests
    @this_months_requests = @requests.from_beginning_of_month
    @form = ::DashboardForm.new @this_months_requests
  end

  private

  def client
    current_client
  end
end

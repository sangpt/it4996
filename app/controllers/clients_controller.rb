class ClientsController < ApplicationController
  before_action :load_client, :load_date

  def requests
    @requests = @client.requests.in_date @date
  end

  private

  def load_client
    @client = Client.find params[:id]
  end

  def load_date
    @date = Date.new(*params[:date].split("-").map(&:to_i))
  end
end

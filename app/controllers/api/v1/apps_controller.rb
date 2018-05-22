class Api::V1::AppsController < ApplicationController
  def index
    @apps = client.apps
  end

  def destroy
    app = App.find params[:id]
    render json: {
      status: app.destroy,
      message: app.errors.full_messages
    }
  rescue
    render json: {
      status: false,
      message: "Cannot find App with id = #{params[:id]}"
    }
  end

  private

  def client
    Client.test
  end
end
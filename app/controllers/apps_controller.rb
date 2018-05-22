class AppsController < ApplicationController
  before_action :load_app

  def show
    @data = @app.requests.group_by{|request| request.start_time.to_date}.sort.to_h
    @form = ::DashboardForm.new @app.requests.from_beginning_of_month
  end

  private

  def load_app
    @app = App.find params[:id]
  end
end

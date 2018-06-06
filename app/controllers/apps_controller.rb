class AppsController < ApplicationController
  before_action :load_app

  def show
    @data = requests.group_by{|request| request.start_time.to_date}.sort.to_h
    @form = ::DashboardForm.new requests
  end

  def edit
    #code
  end

  def update
    @app.update_attributes app_params
    redirect_to @app
  end

  def destroy
    @app.destroy
    redirect_to root_path
  end

  private

  def app_params
    params.require(:app).permit :name, :service_id
  end

  def load_app
    @app = App.find params[:id]
  end

  def requests
    # client.requests
    return @app.requests.from_beginning_of_month if params[:start_date].blank? && params[:end_date].blank?
    @start_date = Date.new(*params[:start_date].split("-").map(&:to_i))
    @end_date = Date.new(*params[:end_date].split("-").map(&:to_i))
    (@app.requests.between_date(@start_date, @end_date) || @app.requests.from_beginning_of_month)
  end
end

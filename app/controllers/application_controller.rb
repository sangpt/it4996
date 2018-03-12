class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  # before_action :authenticate_client!
  before_action :configure_permitted_parameters, if: :devise_controller?

  layout :layout_by_resource

  private

  def layout_by_resource
    return "application" if current_client
    "devise"
  end
  
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |user_params|
      user_params.permit :name, :provider, :uid
    end
  end
end

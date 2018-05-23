class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :verify_context_user!, unless: :devise_controller?

  layout :layout_by_resource

  private

  def layout_by_resource
    return "application" if current_user
    return "accountant" if current_accountant
    "devise"
  end

  def after_sign_out_path_for resource_or_scope
    if resource_or_scope == :user
      new_user_session_path
    elsif resource_or_scope == :accountant
      new_accountant_session_path
    else
      root_path
    end
  end

  def verify_context_user!
    redirect_to new_user_session_path unless context_user
  end

  def context_user
    current_user || current_accountant
  end
end

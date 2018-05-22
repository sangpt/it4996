class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  layout :layout_by_resource

  private

  def layout_by_resource
    return "application" if current_user
    "devise"
  end

  def after_sign_out_path_for resource_or_scope
    if resource_or_scope == :user
      new_user_session_path
    # elsif resource_or_scope == :admin
    #   new_admin_session_path
    else
      root_path
    end
  end
end

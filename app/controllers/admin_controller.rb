class AdminController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :authenticate_admin!

  layout :layout_by_resource

  private

  def layout_by_resource
    return "application" if current_admin
    "devise"
  end
end

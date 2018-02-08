module ApplicationHelper
  def flash_class level
    case level
    when "notice", "success" then "alert-success"
    when "error" then "alert-error"
    when "alert", "danger" then "alert-danger"
    when "alert", "warning" then "alert-warning"
    end
  end
end

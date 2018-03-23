module ApplicationHelper
  def flash_class level
    case level
    when "notice", "success" then "alert-success"
    when "error" then "alert-error"
    when "alert", "danger" then "alert-danger"
    when "alert", "warning" then "alert-warning"
    end
  end

  def validate_expression expression
    begin
      expression
    rescue
      0
    end
  end

  def current_user
    current_client || current_admin
  end

  def request_input_text request
    return unless request.input_text
    request.input_text[0][:sentences].map{|sentence| sentence[:content]}.join
  rescue
  
  end
end

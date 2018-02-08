<<<<<<< b953c1f04488544f75764d6e9405cd732880740c
class ApplicationController < ActionController::API
=======
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
>>>>>>> recreate project
end

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      namespace :dashboards do
        get :top_title, to: "top_title"
        get :chart_number_requests, to: "chart_number_requests"
        get :table_request, to: "table_request"
        get :request_date, to: "request_date"
        get :top_app, to: "top_app"
      end
    end
  end

  resources :sessions
end

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # namespace :api do
  #   namespace :v1 do
  #     namespace :dashboards do
  #       get :top_title, to: "top_title"
  #       get :chart_number_requests, to: "chart_number_requests"
  #       get :table_request, to: "table_request"
  #       get :request_date, to: "request_date"
  #       get :top_app, to: "top_app"
  #     end
  #
  #     namespace :search do
  #       get :search_request, to: "search_request"
  #     end
  #
  #     namespace :apps do
  #       get :index, to: "index"
  #       post :destroy, to: "destroy"
  #     end
  #   end
  # end

  root "dashboard#index"

  resources :dashboard

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }
end

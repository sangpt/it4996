Rails.application.routes.draw do
  devise_for :admins
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :pages
  devise_for :clients

  authenticated :client do
    root "pages#index"
  end

  resources :clients do
    collection do
      get :requests
    end
  end

  devise_scope :client do
    root "devise/sessions#new"
  end

  namespace :admin do
    root "pages#index"
    resources :clients, only: :show
  end

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
end

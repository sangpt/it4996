Rails.application.routes.draw do
  devise_for :admins
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :pages
  devise_for :clients

  authenticated :client do
    root "pages#index"
  end
  resources :clients do
    member do
      get :requests
    end
  end
  devise_scope :client do
    root "devise/sessions#new"
  end

  scope :auth do
    get "is_signed_in", to: "auth#is_signed_in"
  end
end

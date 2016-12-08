Rails.application.routes.draw do

  resources :slides
  resources :slide_types
  resources :kiosks
  devise_for :users
  resources :kiosk, only: [:index, :show]
  get '/admin', :to => 'admin#index', :as => 'admin_index'
  root to: 'kiosk#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

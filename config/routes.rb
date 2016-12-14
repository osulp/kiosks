Rails.application.routes.draw do

  resources :slides
  resources :slide_types
  resources :kiosks
  devise_for :users
  get '/kiosk', :to => 'kiosk#index', :as => 'kiosk_index'
  get '/kiosk/:id', :to => 'kiosk#show', :as => 'kiosk_show'
  get '/admin', :to => 'admin#index', :as => 'admin_index'
  root to: 'kiosk#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

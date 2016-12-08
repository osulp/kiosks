Rails.application.routes.draw do

  resources :touch_slides
  devise_for :users
  resources :kiosk, only: [:index, :show]

  root to: 'kiosk#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

Rails.application.routes.draw do

  # Api namespaced routes and modules
  # ie: /api/v1/hours => Api::V1::HoursController#show
  namespace :api, defaults: { format: :json }  do
    namespace :v1, constraints: Api::V1::Constraints.new(version: 1,
                                                   default: true) do
      post    'hours'       => 'hours#show'
    end
  end

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

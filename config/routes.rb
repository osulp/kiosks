Rails.application.routes.draw do

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  resources :kiosk_layouts
  resources :date_ranges
  resources :directories
  # Api namespaced routes and modules
  # ie: /api/v1/hours => Api::V1::HoursController#show
  namespace :api, defaults: { format: :json } do
    namespace :v1, constraints: Api::V1::Constraints.new(version: 1,
                                                         default: true) do
      post    'hours' => 'hours#show'
      get     'rooms/available/:start_time' => 'rooms#available'
    end
  end

  resources :collections
  resources :slides
  resources :slide_types
  resources :kiosks do
    collection do
      get :edit_multiple
      put :update_multiple
    end
  end

  devise_for :users, :controllers => { :registrations => "registrations" }
  get '/kiosk', :to => 'kiosk#index', :as => 'kiosk_index'
  get '/kiosk/:id', :to => 'kiosk#show', :as => 'kiosk_show'

  # Directory Paths
  get '/directory/iframe_page', :to => 'directories#iframe_page', :as => 'iframe_page'

  post '/uploads/:collection_id', to: 'slides#create'
  # This is a hack that is required because the rails form the uploader is on
  # sets the _method parameter to patch when the work already exists.
  # Eventually it would be good to update the javascript so that it doesn't
  # submit the form, just the file and always uses POST.
  patch '/uploads/:collection_id', to: 'slides#create'

  root to: 'kiosk#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

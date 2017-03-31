Rails.application.routes.draw do

  # Api namespaced routes and modules
  # ie: /api/v1/hours => Api::V1::HoursController#show
  namespace :api, defaults: { format: :json } do
    namespace :v1, constraints: Api::V1::Constraints.new(version: 1,
                                                         default: true) do
      post    'hours' => 'hours#show'
      get     'rooms/available/:start_time' => 'rooms#available'
      get     'classrooms/date/:date' => 'classrooms#date'
      get     'classrooms/rooms' => 'classrooms#rooms'
    end
  end

  resources :collections
  resources :slides
  resources :slide_types
  resources :kiosks
  devise_for :users, :controllers => { :registrations => "registrations" }
  get '/kiosk', :to => 'kiosk#index', :as => 'kiosk_index'
  get '/kiosk/:id', :to => 'kiosk#show', :as => 'kiosk_show'
  get '/admin', :to => 'admin#index', :as => 'admin_index'

  post '/uploads', to: 'slides#create'
  # This is a hack that is required because the rails form the uploader is on
  # sets the _method parameter to patch when the work already exists.
  # Eventually it would be good to update the javascript so that it doesn't
  # submit the form, just the file and always uses POST.
  patch '/uploads', to: 'slides#create'

  root to: 'kiosk#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

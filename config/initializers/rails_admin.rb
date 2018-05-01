RailsAdmin.config do |config|

  ### Popular gems integration

  ## == Devise ==
  config.authorize_with do
    unless warden.user.present? && warden.user.admin?
      redirect_to main_app.kiosks_path
    end
  end
  config.current_user_method(&:current_user)

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  ## == Gravatar integration ==
  ## To disable Gravatar integration in Navigation Bar set to false
  # config.show_gravatar = true

  #Configuration for Models controlled by rails_admin
  config.included_models = %w[User KioskLayout SlideType]

  #User Model Configuration. Allows editing of Email and Admin Status
  config.model 'User' do
    edit do
      field :admin
    end
  end

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end
end

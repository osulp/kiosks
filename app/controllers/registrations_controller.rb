class RegistrationsController < Devise::RegistrationsController
  def new
    flash[:alert] = 'Registrations are not open.'
    redirect_to root_path
  end

  def create
    flash[:alert] = 'Registrations are not open.'
    redirect_to root_path
  end
end

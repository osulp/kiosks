class AdminController < ApplicationController
  before_action :authorize
  def index

  end

  private

  def authorize
    unless current_user && current_user.admin?
      flash[:alert] = "You do not have sufficient permissions to view this page"
      redirect_to kiosks_path
    end
  end

end

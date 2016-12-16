class KioskController < ApplicationController
  layout "react_application", except: [:index]
  before_action :set_kiosk_params, only: [:index]

  def index
  end

  def show
    @kiosk = Kiosk.find_by(name: params[:id])
    @slides = @kiosk.slides
  end

  private

  def set_kiosk_params
    @kiosks = Kiosk.all
  end
end

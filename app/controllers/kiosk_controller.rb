class KioskController < ApplicationController
  layout "react_application"

  def index
  end

  def show
    @kiosk = Kiosk.find_by(name: params[:id])
    @slides = @kiosk.slides
  end
end

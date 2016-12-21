class KioskController < ApplicationController
  layout "react_application", except: [:index]
  before_action :set_kiosk_params, only: [:index]
  before_action :set_maps_params, only: [:show]

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

  def set_maps_params
    @maps = APPLICATION_CONFIG['maps'].map {|m| {title: m['title'], image_url: m['image_url']}}
  end
end

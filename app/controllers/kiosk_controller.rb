class KioskController < ApplicationController
  layout "react_application", except: [:index]
  before_action :set_kiosk_params, only: [:index]
  before_action :set_maps_params, only: [:show]

  def index
  end

  def show
    @kiosk = Kiosk.find_by(name: params[:id])
    @restart_kiosk = false.to_s
    if reload_kiosk?(@kiosk)
      @restart_kiosk = true.to_s
      puts "restarting #{@kiosk.name} kiosk"
    end

    # get only slides that have current date ranges, given a time (i.e now, Time.zone.parse("20160503050000"), etc)
    @slides = @kiosk.slides.joins(:date_ranges).where("date_ranges.start_date <= ? AND date_ranges.end_date >= ?",Time.zone.now,Time.zone.now)
    @api_uri = ENV['PRIMO_API_URI'] || ''
  end

  private

  def reload_kiosk?(kiosk)
    return false if kiosk.restart_at.nil? || kiosk.restart_at_active.nil?
    kiosk.should_restart?
  end

  def set_kiosk_params
    @kiosks = Kiosk.all
  end

  def set_maps_params
    @maps = APPLICATION_CONFIG['maps'].map {|m| {title: m['title'], image_url: m['image_url']}}
    @maps_base_url = ENV['MAPS_BASE_URL']
  end
end

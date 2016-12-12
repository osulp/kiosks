class KioskController < ApplicationController
  layout "react_application"
  before_action :set_params

  def index
  end

  def show
    new_slide = @slides.last.clone
    new_slide[:id] = DateTime.now.to_time.to_i
    new_slide[:caption] = new_slide[:id]
    #new_slide[:image_url] = "/uploads/random.png"
    @slides << new_slide
  end

  private

  def set_params
    @kiosk_type ||= params[:id]
    @slide_type = "bogus"
    # TODO: replace this with current slides for a specific kiosk type
    @slides = [{
      id: 1,
      image_url: "/images/default_slide_1.png",
      expires_at: "2020-12-31T23:59:59Z",
      created_at: "2000-12-31T11:59:59Z",
      updated_at: "2000-12-31T23:59:59Z",
      title: "Slide.title",
      caption: "Slide.caption",
      slide_type: "touch",
      kiosk: "Kiosk.name"
    },{
      id: 2,
      image_url: "/images/default_slide_2.png",
      expires_at: "2010-11-11T13:00:00Z",
      created_at: "2000-11-11T11:00:00Z",
      updated_at: "2000-11-11T13:00:00Z",
      title: "Slide.title:2",
      caption: "Slide.caption:2",
      slide_type: "touch",
      kiosk: "Kiosk.name:2"
    }]

  end

  private

  def set_params
    @kiosk_type ||= params[:id]
    # TODO: replace this with current slides for a specific kiosk type
    @slides = [{
                 id: 1,
                 image_url: "/uploads/default_slide_1.png",
                 expires_at: "2020-12-31T23:59:59Z",
                 created_at: "2000-12-31T11:59:59Z",
                 updated_at: "2000-12-31T23:59:59Z",
                 title: "Slide.title",
                 caption: "Slide.caption",
                 slide_type: "SlideType.name",
                 kiosk: "Kiosk.name"
               }, {
                 id: 2,
                 image_url: "/uploads/default_slide_2.png",
                 expires_at: "2010-11-11T13:00:00Z",
                 created_at: "2000-11-11T11:00:00Z",
                 updated_at: "2000-11-11T13:00:00Z",
                 title: "Slide.title:2",
                 caption: "Slide.caption:2",
                 slide_type: "SlideType.name:2",
                 kiosk: "Kiosk.name:2"
               }]
  end
end

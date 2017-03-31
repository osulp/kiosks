require 'rails_helper'

RSpec.describe "slides/new", type: :view do

  before(:each) do
    @slide = assign(:slide, Slide.create!(
      :title => "title test",
      :caption => "caption test",
      :slide_type => SlideType.create(name: "test slide type"),
      :kiosk => Kiosk.create(name: "test kiosk"),
      :collection => Collection.create(name: "generic"),
      :image => Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg'),
    ))
  end

  it "renders new slide form" do
    @slide_types = SlideType.all
    @kiosks = Kiosk.all
    @collections = Collection.all
    render
    expect(rendered).to match /New Slide/
  end
end

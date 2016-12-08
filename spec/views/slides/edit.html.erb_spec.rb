require 'rails_helper'

RSpec.describe "slides/edit", type: :view do
  before(:each) do
    @slide = assign(:slide, Slide.create!(
      :title => "title test",
      :caption => "caption test",
      :slide_type => SlideType.create(name: "test slide type"),
      :kiosk => Kiosk.create(name: "test kiosk"),
      :image => Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg'),
    ))
  end

  it "renders the edit slide form" do
    @slide_types = SlideType.all
    @kiosks = Kiosk.all

    render
    assert_select "form[action=?][method=?]", slide_path(@slide), "post" do

      assert_select "textarea#slide_caption[name=?]", "slide[caption]"

      assert_select "input#slide_title[name=?]", "slide[title]"

      assert_select "select#slide_slide_type_id[name=?]", "slide[slide_type_id]"
    end
  end
end

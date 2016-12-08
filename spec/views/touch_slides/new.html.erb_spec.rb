require 'rails_helper'

RSpec.describe "touch_slides/new", type: :view do
  before(:each) do
    assign(:touch_slide, TouchSlide.new(
      :caption => "MyText"
    ))
  end

  it "renders new touch_slide form" do
    render

    assert_select "form[action=?][method=?]", touch_slides_path, "post" do

      assert_select "textarea#touch_slide_caption[name=?]", "touch_slide[caption]"
    end
  end
end

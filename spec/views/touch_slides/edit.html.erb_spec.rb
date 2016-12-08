require 'rails_helper'

RSpec.describe "touch_slides/edit", type: :view do
  before(:each) do
    @touch_slide = assign(:touch_slide, TouchSlide.create!(
      :caption => "MyText"
    ))
  end

  it "renders the edit touch_slide form" do
    render

    assert_select "form[action=?][method=?]", touch_slide_path(@touch_slide), "post" do

      assert_select "textarea#touch_slide_caption[name=?]", "touch_slide[caption]"
    end
  end
end

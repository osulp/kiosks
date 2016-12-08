require 'rails_helper'

RSpec.describe "touch_slides/show", type: :view do
  before(:each) do
    @touch_slide = assign(:touch_slide, TouchSlide.create!(
      :caption => "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/MyText/)
  end
end

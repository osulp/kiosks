require 'rails_helper'

RSpec.describe "touch_slides/index", type: :view do
  before(:each) do
    assign(:touch_slides, [
      TouchSlide.create!(
        :caption => "MyText"
      ),
      TouchSlide.create!(
        :caption => "MyText"
      )
    ])
  end

  it "renders a list of touch_slides" do
    render
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end

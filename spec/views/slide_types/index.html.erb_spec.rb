require 'rails_helper'

RSpec.describe "slide_types/index", type: :view do
  before(:each) do
    assign(:slide_types, [
      SlideType.create!(
        :name => "Name"
      ),
      SlideType.create!(
        :name => "Name"
      )
    ])
  end

  it "renders a list of slide_types" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
  end
end

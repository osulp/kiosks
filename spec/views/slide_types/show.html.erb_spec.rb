require 'rails_helper'

RSpec.describe "slide_types/show", type: :view do
  before(:each) do
    @slide_type = assign(:slide_type, SlideType.create!(
      :name => "Name"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
  end
end

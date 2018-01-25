require 'rails_helper'

RSpec.describe "kiosk_layouts/show", type: :view do
  before(:each) do
    @kiosk_layout = assign(:kiosk_layout, KioskLayout.create!(
      :name => "Name"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
  end
end

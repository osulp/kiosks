require 'rails_helper'

RSpec.describe "kiosks/show", type: :view do
  let (:test_layout) { KioskLayout.create!(:name => "touch") }

  before(:each) do
    @kiosk = assign(:kiosk, Kiosk.create!(
      :name => "Name",
      :kiosk_layout_id => test_layout.id
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/touch/)
  end
end

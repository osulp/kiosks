require 'rails_helper'

RSpec.describe "kiosks/show", type: :view do
  before(:each) do
    @kiosk = assign(:kiosk, Kiosk.create!(
      :name => "Name"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
  end
end

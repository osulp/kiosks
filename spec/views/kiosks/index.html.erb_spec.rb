require 'rails_helper'

RSpec.describe "kiosks/index", type: :view do
  before(:each) do
    assign(:kiosks, [
      Kiosk.create!(
        :name => "Name"
      ),
      Kiosk.create!(
        :name => "Name"
      )
    ])
  end

  it "renders a list of kiosks" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
  end
end

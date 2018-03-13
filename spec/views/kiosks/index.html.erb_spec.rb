require 'rails_helper'

RSpec.describe "kiosks/index", type: :view do
  let (:test_layout) { KioskLayout.create!(:name => "touch") }
  before(:each) do
    assign(:kiosks, [
      Kiosk.create!(
        :name => "Name",
        :map_default_floor_number => 2,
        :kiosk_layout_id => test_layout.id
      ),
      Kiosk.create!(
        :name => "Name",
        :map_default_floor_number => 2,
        :kiosk_layout_id => test_layout.id
      )
    ])
  end

  it "renders a list of kiosks" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "2", :count => 2
  end
end

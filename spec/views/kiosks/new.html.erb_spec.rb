require 'rails_helper'

RSpec.describe "kiosks/new", type: :view do
  let (:test_layout) { KioskLayout.create!(:name => "touch") }

  before(:each) do
    assign(:kiosk, Kiosk.new(
      :name => "MyString",
      :map_default_floor_number => 2,
      :kiosk_layout_id => test_layout.id
    ))
  end

  it "renders new kiosk form" do
    @kiosk_layouts = KioskLayout.all
    render

    assert_select "form[action=?][method=?]", kiosks_path, "post" do

      assert_select "input#kiosk_name[name=?]", "kiosk[name]"
      assert_select "input#kiosk_map_default_floor_number[name=?]", "kiosk[map_default_floor_number]"
    end
  end
end

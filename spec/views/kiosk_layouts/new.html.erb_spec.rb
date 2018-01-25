require 'rails_helper'

RSpec.describe "kiosk_layouts/new", type: :view do
  before(:each) do
    assign(:kiosk_layout, KioskLayout.new(
      :name => "MyString"
    ))
  end

  it "renders new kiosk_layout form" do
    render

    assert_select "form[action=?][method=?]", kiosk_layouts_path, "post" do

      assert_select "input#kiosk_layout_name[name=?]", "kiosk_layout[name]"
    end
  end
end

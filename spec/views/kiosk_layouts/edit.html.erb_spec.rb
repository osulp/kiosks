require 'rails_helper'

RSpec.describe "kiosk_layouts/edit", type: :view do
  before(:each) do
    @kiosk_layout = assign(:kiosk_layout, KioskLayout.create!(
      :name => "MyString"
    ))
  end

  it "renders the edit kiosk_layout form" do
    render

    assert_select "form[action=?][method=?]", kiosk_layout_path(@kiosk_layout), "post" do

      assert_select "input#kiosk_layout_name[name=?]", "kiosk_layout[name]"
    end
  end
end

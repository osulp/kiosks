require 'rails_helper'

RSpec.describe "kiosks/new", type: :view do
  before(:each) do
    assign(:kiosk, Kiosk.new(
      :name => "MyString"
    ))
  end

  it "renders new kiosk form" do
    render

    assert_select "form[action=?][method=?]", kiosks_path, "post" do

      assert_select "input#kiosk_name[name=?]", "kiosk[name]"
    end
  end
end

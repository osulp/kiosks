require 'rails_helper'

RSpec.describe "kiosks/edit", type: :view do
  before(:each) do
    @kiosk = assign(:kiosk, Kiosk.create!(
      :name => "MyString"
    ))
  end

  it "renders the edit kiosk form" do
    render

    assert_select "form[action=?][method=?]", kiosk_path(@kiosk), "post" do

      assert_select "input#kiosk_name[name=?]", "kiosk[name]"
    end
  end
end

require 'rails_helper'

RSpec.describe "slide_types/new", type: :view do
  before(:each) do
    assign(:slide_type, SlideType.new(
      :name => "MyString"
    ))
  end

  it "renders new slide_type form" do
    render

    assert_select "form[action=?][method=?]", slide_types_path, "post" do

      assert_select "input#slide_type_name[name=?]", "slide_type[name]"
    end
  end
end

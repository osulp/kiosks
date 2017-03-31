require 'rails_helper'

RSpec.describe "date_ranges/edit", type: :view do
  before(:each) do
    @date_range = assign(:date_range, DateRange.create!())
  end

  it "renders the edit date_range form" do
    render

    assert_select "form[action=?][method=?]", date_range_path(@date_range), "post" do
    end
  end
end

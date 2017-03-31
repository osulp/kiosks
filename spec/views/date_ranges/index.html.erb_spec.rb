require 'rails_helper'

RSpec.describe "date_ranges/index", type: :view do
  before(:each) do
    assign(:date_ranges, [
      DateRange.create!(),
      DateRange.create!()
    ])
  end

  it "renders a list of date_ranges" do
    render
  end
end

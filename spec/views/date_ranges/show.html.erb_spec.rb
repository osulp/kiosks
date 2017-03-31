require 'rails_helper'

RSpec.describe "date_ranges/show", type: :view do
  before(:each) do
    @date_range = assign(:date_range, DateRange.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end

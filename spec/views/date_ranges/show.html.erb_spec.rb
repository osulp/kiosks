# frozen_string_literal: true

RSpec.describe 'date_ranges/show', type: :view do
  before do
    assign(:date_range, create(:date_range))
    render
  end

  it { expect(rendered).to match(/2015-01-01 04:00:00 -0800/) }
end

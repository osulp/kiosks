# frozen_string_literal: true

RSpec.describe 'date_ranges/index', type: :view do
  before do
    assign(:date_ranges, [create(:date_range), create(:date_range, start_date: Time.utc(2016, 1, 1, 12, 0, 0))])
    render
  end

  it { expect(rendered).to match(/2015-01-01 04:00:00 -0800/) }
  it { expect(rendered).to match(/2016-01-01 04:00:00 -0800/) }
end

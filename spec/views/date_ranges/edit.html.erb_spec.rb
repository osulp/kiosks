# frozen_string_literal: true

RSpec.describe 'date_ranges/edit', type: :view do
  let(:date_range) { create(:date_range) }

  before do
    assign(:date_range, date_range)
    render
  end

  it { assert_select 'form[action=?][method=?]', date_range_path(date_range), 'post' }
end

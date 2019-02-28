# frozen_string_literal: true

RSpec.describe 'date_ranges/new', type: :view do
  before do
    assign(:date_range, build(:date_range))
    render
  end

  it { assert_select 'form[action=?][method=?]', date_ranges_path, 'post' }
end

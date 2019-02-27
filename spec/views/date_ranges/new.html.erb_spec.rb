# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'date_ranges/new', type: :view do
  before do
    assign(:date_range, DateRange.new)
  end

  it 'renders new date_range form' do
    render

    assert_select 'form[action=?][method=?]', date_ranges_path, 'post' do
    end
  end
end

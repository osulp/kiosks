# frozen_string_literal: true

RSpec.describe 'kiosk_layouts/show', type: :view do
  before do
    assign(:kiosk_layout, create(:kiosk_layout))
    render
  end

  it { expect(rendered).to match(/touch/) }
end

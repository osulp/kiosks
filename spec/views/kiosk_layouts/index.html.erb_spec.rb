# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'kiosk_layouts/index', type: :view do
  before do
    assign(:kiosk_layouts, [create(:kiosk_layout), create(:kiosk_layout, name: 'Name2')])
    render
  end

  it { expect(rendered).to match(/Name2/) }
  it { expect(rendered).to match(/touch/) }
end

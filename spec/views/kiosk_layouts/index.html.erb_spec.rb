# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'kiosk_layouts/index', type: :view do
  before do
    assign(:kiosk_layouts, [
             KioskLayout.create!(
               name: 'Name'
             ),
             KioskLayout.create!(
               name: 'Name'
             )
           ])
  end

  it 'renders a list of kiosk_layouts' do
    render
    assert_select 'tr>td', text: 'Name'.to_s, count: 2
  end
end

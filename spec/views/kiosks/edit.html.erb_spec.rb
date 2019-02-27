# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'kiosks/edit', type: :view do
  let (:test_layout) { KioskLayout.create!(name: 'touch') }

  before do
    @kiosk = assign(:kiosk, Kiosk.create!(
                              name: 'MyString', kiosk_layout_id: test_layout.id
                            ))
  end

  it 'renders the edit kiosk form' do
    @kiosk_layouts = KioskLayout.all
    render

    assert_select 'form[action=?][method=?]', kiosk_path(@kiosk), 'post' do
      assert_select 'input#kiosk_name[name=?]', 'kiosk[name]'
      assert_select 'input#kiosk_map_default_floor_number[name=?]', 'kiosk[map_default_floor_number]'
    end
  end
end

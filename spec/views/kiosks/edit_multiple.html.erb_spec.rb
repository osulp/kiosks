# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'kiosks/edit_multiple', type: :view do
  let (:test_layout) { KioskLayout.create!(name: 'touch') }

  let(:kiosk1_valid_attributes) do
    { name: 'kiosk1', kiosk_layout_id: test_layout.id }
  end

  let(:kiosk2_valid_attributes) do
    { name: 'kiosk2', kiosk_layout_id: test_layout.id }
  end

  let(:kiosk1) do
    Kiosk.create! kiosk1_valid_attributes
  end

  let(:kiosk2) do
    Kiosk.create! kiosk2_valid_attributes
  end

  before do
    @kiosks = assign(:kiosks, [kiosk1, kiosk2])
  end

  it 'renders the edit kiosk form' do
    @kiosks = [kiosk1, kiosk2]
    render

    assert_select 'form[action=?][method=?]', update_multiple_kiosks_path, 'post' do
      assert_select 'select#kiosk_restart_at_1i[name=?]', 'kiosk[restart_at(1i)]'
      assert_select 'select#kiosk_restart_at_2i[name=?]', 'kiosk[restart_at(2i)]'
      assert_select 'select#kiosk_restart_at_3i[name=?]', 'kiosk[restart_at(3i)]'
      assert_select 'select#kiosk_restart_at_4i[name=?]', 'kiosk[restart_at(4i)]'
      assert_select 'select#kiosk_restart_at_5i[name=?]', 'kiosk[restart_at(5i)]'

      assert_select 'input#kiosk_restart_at_active[name=?]', 'kiosk[restart_at_active]'
    end
  end
end

# frozen_string_literal: true

RSpec.describe 'kiosks/edit_multiple', type: :view do
  before do
    assign(:kiosks, [create(:kiosk), create(:kiosk, name: 'Kiosk2')])
    render
  end

  it 'renders the edit kiosk form' do
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

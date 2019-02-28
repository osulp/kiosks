# frozen_string_literal: true

RSpec.describe 'kiosks/new', type: :view do
  before do
    assign(:kiosk, build(:kiosk))
    assign(:kiosk_layouts, KioskLayout.all)
    render
  end

  it 'renders new kiosk form' do
    assert_select 'form[action=?][method=?]', kiosks_path, 'post' do
      assert_select 'input#kiosk_name[name=?]', 'kiosk[name]'
      assert_select 'input#kiosk_map_default_floor_number[name=?]', 'kiosk[map_default_floor_number]'
    end
  end
end

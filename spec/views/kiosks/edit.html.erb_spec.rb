# frozen_string_literal: true

RSpec.describe 'kiosks/edit', type: :view do
  let(:kiosk) { create(:kiosk) }

  before do
    assign(:kiosk, kiosk)
    assign(:kiosk_layouts, KioskLayout.all)
    render
  end

  it 'renders the edit kiosk form' do
    assert_select 'form[action=?][method=?]', kiosk_path(kiosk), 'post' do
      assert_select 'input#kiosk_name[name=?]', 'kiosk[name]'
      assert_select 'input#kiosk_map_default_floor_number[name=?]', 'kiosk[map_default_floor_number]'
    end
  end
end

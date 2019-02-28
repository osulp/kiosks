# frozen_string_literal: true

RSpec.describe 'kiosk_layouts/edit', type: :view do
  let(:kiosk_layout) { create(:kiosk_layout) }

  before do
    assign(:kiosk_layout, kiosk_layout)
    render
  end

  it 'renders the edit kiosk form' do
    assert_select 'form[action=?][method=?]', kiosk_layout_path(kiosk_layout), 'post' do
      assert_select 'input#kiosk_layout_name[name=?]', 'kiosk_layout[name]'
    end
  end
end

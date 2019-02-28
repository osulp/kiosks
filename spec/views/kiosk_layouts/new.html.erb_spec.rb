# frozen_string_literal: true

RSpec.describe 'kiosk_layouts/new', type: :view do
  before do
    assign(:kiosk_layout, build(:kiosk_layout))
    render
  end

  it 'renders new kiosk_layout form' do
    assert_select 'form[action=?][method=?]', kiosk_layouts_path, 'post' do
      assert_select 'input#kiosk_layout_name[name=?]', 'kiosk_layout[name]'
    end
  end
end

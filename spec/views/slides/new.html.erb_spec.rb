# frozen_string_literal: true

RSpec.describe 'slides/new', type: :view do
  before do
    assign(:slide, build(:slide))
    assign(:slide_types, SlideType.all)
    assign(:kiosks, Kiosk.all)
    assign(:collections, Collection.all)
    render
  end

  it 'renders new slide form' do
    assert_select 'form[action=?][method=?]', slides_path, 'post' do
      assert_select 'input#slide_title[name=?]', 'slide[title]'
    end
  end
end

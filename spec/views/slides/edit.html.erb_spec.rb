# frozen_string_literal: true

RSpec.describe 'slides/edit', type: :view do
  let(:slide) { create(:slide) }

  before do
    assign(:slide, slide)
    assign(:slide_types, SlideType.all)
    assign(:kiosks, Kiosk.all)
    assign(:collections, Collection.all)
    render
  end

  it 'renders the edit slide form' do
    assert_select 'form[action=?][method=?]', slide_path(slide), 'post' do
      assert_select 'textarea#slide_caption[name=?]', 'slide[caption]'
      assert_select 'input#slide_title[name=?]', 'slide[title]'
      assert_select 'select#slide_slide_type_id[name=?]', 'slide[slide_type_id]'
    end
  end
end

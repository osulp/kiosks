# frozen_string_literal: true
require 'byebug'

RSpec.describe 'slides/new', type: :view do
  let(:slide_type) { build(:slide_type) }
  let(:collection) { build(:collection) }

  before do
    assign(:slide, build(:slide))
    assign(:slide_types, [slide_type])
    assign(:kiosks, Kiosk.all)
    assign(:collections, [collection])
    assign(:default_collection, collection)
    assign(:default_slide_type, slide_type)
    render
  end

  it 'renders new slide form' do
    assert_select 'form[action=?][method=?]', slides_path, 'post' do
      assert_select 'input#slide_title[name=?]', 'slide[title]'
    end
  end
end

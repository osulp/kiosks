# frozen_string_literal: true

RSpec.describe 'slides/new', type: :view do
  let(:slide) do
    create(:slide,
           title: 'title test',
           caption: 'caption test',
           slide_type: create(:slide_type, name: 'test slide type'),
           collection: create(:collection, name: 'generic'),
           image: Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg'))
  end

  before do
    assign(:slide, slide)
    assign(:slide_types, SlideType.all)
    assign(:kiosks, Kiosk.all)
    assign(:collections, Collection.all)
    render
  end

  it { expect(rendered).to match(/New Slide/) }
end

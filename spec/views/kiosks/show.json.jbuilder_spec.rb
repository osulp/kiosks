# frozen_string_literal: true

require 'spec_helper'

describe 'views/kiosk/show.json.jbuilder' do
  let(:slide_type) { create(:slide_type, name: 'test slide type') }
  let(:collection) { create(:collection, name: 'generic') }
  let(:slide1) { create(:slide) }
  let(:slide2) { create(:slide, slide2_attributes) }
  let(:slide2_attributes) do
    {
      title: "title slide 2 with ' apostrophe",
      caption: 'caption 2',
      slide_type: slide_type,
      collection: collection,
      image: Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg')
    }
  end

  before do
    assign(:slides, [slide1, slide2])
    assign(:kiosk, create(:kiosk))
    render template: 'kiosk/show.json.jbuilder', format: :json
  end

  it 'renders slide json with first slide title' do
    expect(JSON(rendered)['slides'].first['title']).to eq('title')
  end
  it 'renders slide json with second slide title with escaped apostrophe' do
    expect(JSON(rendered)['slides'].second['title']).to eq('title slide 2 with &#39; apostrophe')
  end
end

# frozen_string_literal: true

RSpec.describe 'slides/index', type: :view do
  let(:slide_type) { create(:slide_type, name: 'test slide type') }
  let(:collection) { create(:collection, name: 'generic') }
  let(:slide1) { create(:slide, slide1_attributes) }
  let(:slide2) { create(:slide, slide2_attributes) }
  let(:slide1_attributes) do
    {
      title: 'title test 1',
      caption: 'caption test 1',
      slide_type: slide_type,
      collection: collection,
      image: Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg')
    }
  end
  let(:slide2_attributes) do
    {
      title: 'title test 2',
      caption: 'caption test 2',
      slide_type: slide_type,
      collection: collection,
      image: Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg')
    }
  end

  before do
    assign(:slides, [slide1, slide2])
    render
  end

  it { expect(rendered).to match(/caption test 1/) }
  it { expect(rendered).to match(/caption test 2/) }
  it { expect(rendered).to match(/title test 1/) }
  it { expect(rendered).to match(/title test 2/) }
  it { expect(rendered).to match(/generic/) }
end

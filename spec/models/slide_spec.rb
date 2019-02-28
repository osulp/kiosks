# frozen_string_literal: true

RSpec.describe Slide, type: :model do
  let(:model) { described_class.new }

  context 'with valid attributes' do
    let(:slide_title) { 'title test' }
    let(:slide_caption) { 'caption test' }
    let(:slide_donor_section) { SlideType.create(name: 'test slide type') }
    let(:slide_collection) { Collection.create(name: 'generic') }
    let(:slide_image) { Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg') }
    let(:en_subtitles) { Rack::Test::UploadedFile.new('spec/fixtures/test-subtitles-en.vtt', 'text/vtt') }
    let(:slide_video) { Rack::Test::UploadedFile.new('spec/fixtures/sample_mpeg4.mp4', 'video/mp4') }

    before do
      model.title = slide_title
      model.caption = slide_caption
      model.slide_type = slide_donor_section
      model.collection = slide_collection
      model.image = slide_image
      model.video = slide_video
      model.subtitles = [en_subtitles]
    end

    it 'is valid with valid attributes' do
      expect(model).to be_valid
    end

    it 'returns filename for a stored file' do
      expect(model.subtitle_filename(0)).to eq('test-subtitles-en.vtt')
    end
  end

  it 'is not valid without a title' do
    slide = Slide.new(title: nil)
    expect(slide).not_to be_valid
  end
end

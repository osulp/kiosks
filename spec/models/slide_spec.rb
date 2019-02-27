# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Slide, type: :model do
  subject { described_class.new }

  context 'with valid attributes' do
    let(:slide_title) { 'title test' }
    let(:slide_caption) { 'caption test' }
    let(:slide_donor_section) { SlideType.create(name: 'test slide type') }
    let(:slide_collection) { Collection.create(name: 'generic') }
    let(:slide_image) { Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg') }
    let(:en_subtitles) { Rack::Test::UploadedFile.new('spec/fixtures/test-subtitles-en.vtt', 'text/vtt') }
    let(:slide_video) { Rack::Test::UploadedFile.new('spec/fixtures/sample_mpeg4.mp4', 'video/mp4') }

    before do
      subject.title = slide_title
      subject.caption = slide_caption
      subject.slide_type = slide_donor_section
      subject.collection = slide_collection
      subject.image = slide_image
      subject.video = slide_video
      subject.subtitles = [en_subtitles]
    end

    it 'is valid with valid attributes' do
      expect(subject).to be_valid
    end

    it 'returns filename for a stored file' do
      expect(subject.subtitle_filename(0)).to eq('test-subtitles-en.vtt')
    end
  end

  it 'is not valid without a title' do
    slide = Slide.new(title: nil)
    expect(slide).not_to be_valid
  end
end

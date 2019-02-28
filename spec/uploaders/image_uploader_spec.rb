# frozen_string_literal: true

require 'rails_helper'
require 'carrierwave/test/matchers'
require 'rack/test'

RSpec.describe ImageUploader do
  include CarrierWave::Test::Matchers

  let(:uploader) { described_class.new(user, :image) }
  let(:test_image_path) { 'spec/fixtures/Board_Game_Slide.jpg' }

  let(:user) do
    User.create(
      email: 'user@example.com',
      admin: true
    )
  end

  before do
    described_class.enable_processing = true
    File.open(test_image_path) { |f| uploader.store!(f) }
  end

  after do
    VideoUploader.enable_processing = false
    uploader.remove!
  end

  it 'makes the image readable only to the owner and not executable' do
    expect(uploader).to have_permissions(0o644)
  end

  it 'has the correct extension' do
    expect(uploader.file.extension).to eq('jpg')
  end
end

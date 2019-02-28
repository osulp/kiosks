# frozen_string_literal: true

FactoryBot.define do
  factory :slide do
    title { 'title' }
    caption { 'caption' }
    association :slide_type, factory: :slide_type
    association :collection, factory: :collection
    image { Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg') }
  end
end

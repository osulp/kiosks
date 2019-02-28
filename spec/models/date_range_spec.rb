# frozen_string_literal: true

RSpec.describe DateRange, type: :model do
  let(:model) { described_class.new }
  let(:slide_type_test) { SlideType.create(name: 'Basic') }
  let(:kiosk_test) { Kiosk.create(name: 'touch') }
  let(:collection_test) { Collection.create(name: 'generic') }
  let(:test_file) { Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg') }
  let(:valid_attributes) do
    {
      expires_at: Time.utc(2015, 1, 1, 12, 0, 0),
      caption: 'test caption', title: 'test title',
      slide_type_id: slide_type_test.id,
      collection_id: collection_test.id,
      image: test_file
    }
  end

  it 'is valid with valid attributes' do
    model.start_date = Time.utc(2015, 1, 1, 12, 0, 0)
    model.end_date = Time.utc(2015, 1, 1, 12, 0, 0)
    slide = Slide.create! valid_attributes
    model.slide_id = slide.id
    expect(model).to be_valid
  end

  it 'is not valid without a title' do
    date_range = DateRange.new(slide_id: nil)
    expect(date_range).not_to be_valid
  end
end

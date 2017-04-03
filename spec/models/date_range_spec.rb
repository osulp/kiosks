require 'rails_helper'

RSpec.describe DateRange, type: :model do
  subject { described_class.new }
  let(:slide_type_test) { SlideType.create(name: "Basic") }
  let(:kiosk_test) { Kiosk.create(name: "touch") }
  let(:collection_test) { Collection.create(name: "generic") }
  let(:test_file) { Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg') }

  let(:valid_attributes) {
    {
      expires_at: Time.utc(2015, 1, 1, 12, 0, 0),
      caption: "test caption", title: "test title", 
      slide_type_id: slide_type_test.id,
      kiosk_id: kiosk_test.id,
      collection_id: collection_test.id,
      image: test_file
    }
  }

  it "is valid with valid attributes" do
    subject.start_date = Time.utc(2015, 1, 1, 12, 0, 0)
    subject.end_date = Time.utc(2015, 1, 1, 12, 0, 0)
    slide = Slide.create! valid_attributes
    subject.slide_id = slide.id
    expect(subject).to be_valid
  end

  it "is not valid without a title" do
    date_range = DateRange.new(slide_id: nil)
    expect(date_range).to_not be_valid
  end
end

require 'rails_helper'

RSpec.describe KioskSlide, type: :model do
  let(:slide_type_test) { SlideType.create(name: "Basic") }
  let(:collection_test) { Collection.create(name: "generic") }
  let(:test_file) { Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg') }
  let(:valid_attributes) {
    {
      expires_at: Time.utc(2015, 1, 1, 12, 0, 0),
      caption: "test caption", title: "test title", 
      slide_type_id: slide_type_test.id,
      collection_id: collection_test.id,
      image: test_file
    }
  }
  let(:test_kiosk) {
    Kiosk.create(name: "circ")
  }
  let(:test_slide) {
    Slide.create! valid_attributes
  }

  it "is valid with valid attributes" do
    expect(KioskSlide.new(kiosk_id: test_kiosk.id, slide_id: test_slide.id)).to be_valid
  end
  it "is not valid without a title" do
    kiosk = KioskSlide.new(kiosk_id: nil, slide_id: nil)
    expect(kiosk).to_not be_valid
  end


end

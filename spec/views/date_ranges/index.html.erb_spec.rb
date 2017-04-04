require 'rails_helper'

RSpec.describe "date_ranges/index", type: :view do
  let(:slide_type_test) { SlideType.create(name: "Basic") }
  let(:kiosk_test) { Kiosk.create(name: "touch") }
  let(:collection_test) { Collection.create(name: "generic") }
  let(:test_file) { Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg') }

  let(:valid_slide_attributes) {
    {
      expires_at: Time.utc(2015, 1, 1, 12, 0, 0),
      caption: "test caption", title: "test title", 
      slide_type_id: slide_type_test.id,
      kiosk_id: kiosk_test.id,
      collection_id: collection_test.id,
      image: test_file
    }
  }

  let(:valid_slide) { Slide.create! valid_slide_attributes }

  # This should return the minimal set of attributes required to create a valid
  # DateRange. As you add validations to DateRange, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes_1) {
    {
      start_date: Time.utc(2015, 1, 1, 12, 0, 0),
      end_date: Time.utc(2015, 1, 1, 12, 0, 0),
      slide_id: valid_slide.id
    }
  }
  let(:valid_attributes_2) {
    {
      start_date: Time.utc(2016, 1, 1, 12, 0, 0),
      end_date: Time.utc(2016, 1, 1, 12, 0, 0),
      slide_id: valid_slide.id
    }
  }

  before(:each) do
    assign(:date_ranges, [
      DateRange.create!(valid_attributes_1),
      DateRange.create!(valid_attributes_2)
    ])
  end

  it "renders a list of date_ranges" do
    render
  end
end

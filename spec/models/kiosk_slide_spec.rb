# frozen_string_literal: true

RSpec.describe KioskSlide, type: :model do
  let(:slide_type_test) { SlideType.create(name: 'Basic') }
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
  let(:test_layout) { KioskLayout.create!(name: 'touch') }
  let(:test_kiosk) do
    Kiosk.create(name: 'circ', kiosk_layout_id: test_layout.id)
  end
  let(:test_slide) do
    Slide.create! valid_attributes
  end

  it 'is valid with valid attributes' do
    expect(KioskSlide.new(kiosk_id: test_kiosk.id, slide_id: test_slide.id)).to be_valid
  end
  it 'is not valid without a title' do
    kiosk = KioskSlide.new(kiosk_id: nil, slide_id: nil)
    expect(kiosk).not_to be_valid
  end
end

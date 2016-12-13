require 'rails_helper'

RSpec.describe Slide, type: :model do
  subject { described_class.new }
  it "is valid with valid attributes" do
    subject.title = "title test"
    subject.caption = "caption test"
    subject.slide_type = SlideType.create(name: "test slide type")
    subject.kiosk = Kiosk.create(name: "test kiosk")
    subject.image = Rack::Test::UploadedFile.new('spec/fixtures/Board_Game_Slide.jpg', 'image/jpg')
    expect(subject).to be_valid
  end
  it "is not valid without a title" do
    kiosk = Slide.new(title: nil)
    expect(kiosk).to_not be_valid
  end
end

# frozen_string_literal: true

RSpec.describe SlideType, type: :model do
  it 'is valid with valid attributes' do
    expect(SlideType.new(name: 'test')).to be_valid
  end
  it 'is not valid without a title' do
    kiosk = SlideType.new(name: nil)
    expect(kiosk).not_to be_valid
  end
end

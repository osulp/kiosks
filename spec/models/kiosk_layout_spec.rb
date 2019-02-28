# frozen_string_literal: true

RSpec.describe KioskLayout, type: :model do
  let(:test_layout) { KioskLayout.create!(name: 'touch') }

  it 'is valid with valid attributes' do
    expect(KioskLayout.new(name: 'test')).to be_valid
  end
  it 'is not valid without a title' do
    kiosk = KioskLayout.new(name: nil)
    expect(kiosk).not_to be_valid
  end
end

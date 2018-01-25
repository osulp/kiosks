require 'rails_helper'

RSpec.describe KioskLayout, type: :model do
  let (:test_layout) { KioskLayout.create!(:name => "touch") }
  it "is valid with valid attributes" do
    expect(KioskLayout.new(name: "test")).to be_valid
  end
  it "is not valid without a title" do
    kiosk = KioskLayout.new(name: nil)
    expect(kiosk).to_not be_valid
  end
end

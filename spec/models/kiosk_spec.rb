require 'rails_helper'

RSpec.describe Kiosk, type: :model do
  it "is valid with valid attributes" do
    expect(Kiosk.new(name: "test")).to be_valid
  end
  it "is not valid without a title" do
    kiosk = Kiosk.new(name: nil)
    expect(kiosk).to_not be_valid
  end
end

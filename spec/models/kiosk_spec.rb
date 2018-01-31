require 'rails_helper'

RSpec.describe Kiosk, type: :model do
  let (:test_layout) { KioskLayout.create!(:name => "touch") }
  it "is valid with valid attributes" do
    expect(Kiosk.new(name: "test", kiosk_layout_id: test_layout.id)).to be_valid
  end
  it "is not valid without a title" do
    kiosk = Kiosk.new(name: nil, kiosk_layout_id: nil)
    expect(kiosk).to_not be_valid
  end
  it "is not valid with a restart_at datetime in the past" do
    kiosk = Kiosk.new(name: "test", kiosk_layout_id: test_layout.id, restart_at: DateTime.yesterday)
    expect(kiosk).to_not be_valid
  end
end

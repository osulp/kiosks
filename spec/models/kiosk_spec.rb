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

  context "#should_restart?" do
    let(:restart_at) { Time.zone.parse("2018-01-17 07:30:00") }
    let(:kiosk) { Kiosk.new(name: "test", kiosk_layout_id: test_layout.id, restart_at: restart_at, restart_at_active: true) }

    it "should restart now" do
      now = Time.zone.parse("2018-01-17 07:30:10")
      allow(DateTime).to receive(:now) { now }
      allow(Time).to receive(:now) { now }
      expect(kiosk.should_restart?).to be_truthy
    end

    it "should not restart now" do
      now = Time.zone.parse("2018-01-17 07:29:10")
      allow(DateTime).to receive(:now) { now }
      allow(Time).to receive(:now) { now }
      expect(kiosk.should_restart?).to be_falsey
    end
  end

  context "#is_restart_pending?" do
    let(:restart_at) { Time.zone.parse("2018-01-17 07:30:00") }
    let(:kiosk) { Kiosk.new(name: "test", kiosk_layout_id: test_layout.id, restart_at: restart_at, restart_at_active: true) }

    it "restart is pending" do
      now = Time.zone.parse("2018-01-17 06:30:10")
      allow(DateTime).to receive(:now) { now }
      allow(Time).to receive(:now) { now }
      expect(kiosk.is_restart_pending?).to be_truthy
    end

    it "kiosk is restarted" do
      now = Time.zone.parse("2018-01-17 08:30:00")
      allow(DateTime).to receive(:now) { now }
      allow(Time).to receive(:now) { now }
      expect(kiosk.is_restart_pending?).to be_falsey
    end
  end
end

# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Kiosk, type: :model do
  let (:test_layout) { KioskLayout.create!(name: 'touch') }

  it 'is valid with valid attributes' do
    expect(Kiosk.new(name: 'test', kiosk_layout_id: test_layout.id)).to be_valid
  end
  it 'is not valid without a title' do
    kiosk = Kiosk.new(name: nil, kiosk_layout_id: nil)
    expect(kiosk).not_to be_valid
  end
  it 'is not valid with a restart_at datetime in the past' do
    kiosk = Kiosk.new(name: 'test', kiosk_layout_id: test_layout.id, restart_at: DateTime.yesterday)
    expect(kiosk).not_to be_valid
  end

  context '#should_restart?' do
    let(:restart_at) { Time.zone.parse('2018-01-17 07:30:00') }
    let(:kiosk) { Kiosk.new(name: 'test', kiosk_layout_id: test_layout.id, restart_at: restart_at, restart_at_active: true) }

    it 'restarts now' do
      now = Time.zone.parse('2018-01-17 07:30:10')
      allow(DateTime).to receive(:now) { now }
      allow(Time).to receive(:now) { now }
      expect(kiosk).to be_should_restart
    end

    it 'does not restart now' do
      now = Time.zone.parse('2018-01-17 07:29:10')
      allow(DateTime).to receive(:now) { now }
      allow(Time).to receive(:now) { now }
      expect(kiosk).not_to be_should_restart
    end
  end

  context '#is_restart_pending?' do
    let(:restart_at) { Time.zone.parse('2018-01-17 07:30:00') }
    let(:kiosk) { Kiosk.new(name: 'test', kiosk_layout_id: test_layout.id, restart_at: restart_at, restart_at_active: true) }

    it 'restart is pending' do
      now = Time.zone.parse('2018-01-17 06:30:10')
      allow(DateTime).to receive(:now) { now }
      allow(Time).to receive(:now) { now }
      expect(kiosk).to be_is_restart_pending
    end

    it 'kiosk is restarted' do
      now = Time.zone.parse('2018-01-17 08:30:00')
      allow(DateTime).to receive(:now) { now }
      allow(Time).to receive(:now) { now }
      expect(kiosk).not_to be_is_restart_pending
    end
  end
end

require 'rails_helper'
require 'spec_helper'
require "#{Rails.root}/lib/api/v1/custom_hours_format.rb"

RSpec.describe Api::V1::CustomHoursFormat do
  subject { Api::V1::CustomHoursFormat.new({open_time: open_time, close_time: close_time })}
  context "<open_time> - No Closing" do
    let(:open_time) { Time.zone.parse("2017-01-17 07:30:00") }
    let(:close_time) { Time.zone.parse("2017-01-17 00:15:00") }
    it "doesn't match when non-default and missing headers" do
      expect(subject.formatted_hours).to eq "7:30am - No Closing"
      expect(subject.open_all_day).to eq false
      expect(subject.closes_at_night).to eq false
    end
  end

  context "No Closing - <close_time>" do
    let(:open_time) { Time.zone.parse("2017-01-20 00:15:00") }
    let(:close_time) { Time.zone.parse("2017-01-20 22:00:00") }
    it "doesn't match when non-default and missing headers" do
      expect(subject.formatted_hours).to eq "No Closing - 10:00pm"
      expect(subject.open_all_day).to eq false
      expect(subject.closes_at_night).to eq true
    end
  end

  context "Open 24 Hours" do
    let(:open_time) { Time.zone.parse("2017-01-18 00:00:00") }
    let(:close_time) { Time.zone.parse("2017-01-18 00:00:00") }
    it "doesn't match when non-default and missing headers" do
      expect(subject.formatted_hours).to eq "Open 24 Hours"
      expect(subject.open_all_day).to eq true
      expect(subject.closes_at_night).to eq false
    end
  end
end

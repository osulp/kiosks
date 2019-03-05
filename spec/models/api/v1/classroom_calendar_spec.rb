# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ClassroomCalendar do
  let(:calendar) { described_class.new date }
  let(:date) { '20170101' }
  let(:url) { APPLICATION_CONFIG['api']['classrooms']['rss']['url'].gsub('{date}', date) }
  let(:xml) { File.read('spec/fixtures/api/v1/classroom_schedule.xml') }

  xit 'sets a hash variable' do
    stub_request(:get, url)
      .with(headers: { 'Accept' => '*/*', 'Accept-Encoding' => 'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent' => 'Ruby' })
      .to_return(status: 200, body: xml, headers: {})
    expect(calendar.hash).not_to be_nil
  end

  xit 'has details' do
    stub_request(:get, url)
      .with(headers: { 'Accept' => '*/*', 'Accept-Encoding' => 'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent' => 'Ruby' })
      .to_return(status: 200, body: xml, headers: {})
    expect(calendar.detail[:events].length).to eq(1)
    event = calendar.detail[:events].first
    expect(event.title).to eq('Jaspersoft Training')
    expect(event.link).to eq('http://calendar.oregonstate.edu/event/122043/')
    expect(event.start_time).to be_in(%w[20170104T1630 20170104T0830])
    expect(event.end_time).to be_in(%w[20170104T2000 20170104T1200])
    expect(event.room).to eq('Barnard Classroom')
  end
end

require 'rails_helper'

RSpec.describe Api::V1::ClassroomCalendar do
  let(:calendar) { described_class.new date }
  let(:date) { "20170101" }
  let(:url) { APPLICATION_CONFIG['api']['classrooms']['rss']['url'].gsub("{date}", date) }
  let(:xml) { File.read("spec/fixtures/api/v1/classroom_schedule.xml") }

  it 'sets a hash variable' do
    stub_request(:get, url)
      .with(:headers => {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent'=>'Ruby'})
      .to_return(:status => 200, :body => xml, :headers => {})
    expect(calendar.hash).to_not be_nil
  end

  it 'has details' do
    stub_request(:get, url)
      .with(:headers => {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent'=>'Ruby'})
      .to_return(:status => 200, :body => xml, :headers => {})
    expect(calendar.detail[:events].length).to eq(1)
    event = calendar.detail[:events].first
    expect(event.title).to eq('Jaspersoft Training')
    expect(event.link).to eq('http://calendar.oregonstate.edu/event/122043/')
    expect(event.start_time).to eq('Wed, 04 Jan 2017 08:30:00 PST')
    expect(event.end_time).to eq('Wed, 04 Jan 2017 12:00:00 PST')
    expect(event.room).to eq('Barnard Classroom')
  end
end
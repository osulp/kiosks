require 'rails_helper'

RSpec.describe Api::V1::ClassroomEvent do
  subject { Api::V1::ClassroomEvent }
  let(:hash) { {
    "title" => "title",
    "link" => "http://blah.blah.blah",
    "dtstart" => "Sun, 08 Jan 2017 18:00:00 PST",
    "dtend" => "Sun, 08 Jan 2017 20:00:00 PST",
    "subtitle" => "subtitle",
    "room" => "some room",
    "contact" => "person",
    "contact_email" => "email",
    "contact_phone" => "phone"
  } }
  let(:event) { subject.new hash }

  it 'has details' do
    expect(event.title).to eq(hash['title'])
    expect(event.link).to eq(hash['link'])
    expect(event.start_time).to eq(hash['dtstart'])
    expect(event.end_time).to eq(hash['dtend'])
    expect(event.room).to eq(hash['room'])
    expect(event.contact).to eq(hash['contact'])
    expect(event.contact_phone).to eq(hash['contact_phone'])
    expect(event.contact_email).to eq(hash['contact_email'])
  end
end
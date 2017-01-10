require 'rails_helper'
require 'nokogiri'

RSpec.describe Api::V1::ClassroomEvent do
  subject { Api::V1::ClassroomEvent }
  let(:xml_doc) { Nokogiri::XML(File.open("spec/fixtures/api/v1/classroom_schedule.xml"))}
  let(:xml_statement) { xml_doc.xpath("rss/channel/item").first }
  let(:event) { subject.new xml_statement }

  it 'has details' do
    expect(event.title).to eq("Jaspersoft Training")
    expect(event.link).to eq("http://calendar.oregonstate.edu/event/122043/")
    expect(event.start_time).to eq("20170104T0830")
    expect(event.end_time).to eq("20170104T1200")
    expect(event.room).to eq("Barnard Classroom")
    expect(event.room_shortname).to eq("lib-barnard")
    expect(event.contact).to eq("Person Name")
    expect(event.contact_phone).to eq("541-555-1212")
    expect(event.contact_email).to eq("noreply@oregonstate.edu")
  end
end
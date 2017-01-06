require 'rails_helper'
require 'ostruct'


RSpec.describe Api::V1::ClassroomsController, type: :controller do
  let(:xml) { File.read("spec/fixtures/api/v1/classroom_schedule.xml") }
  it "returns bad_request with missing attributes" do
    get :date, params: { date: '' }
    expect(response).to have_http_status(:bad_request)
  end

  it "returns bad_request with invalid attributes" do
    get :date, params: { date: 1 }
    expect(response).to have_http_status(:bad_request)
  end

  it "returns detail" do
    stub_request(:get, "http://calendar.oregonstate.edu/20170108/day/library/rss20.xml").
      with(:headers => { 'Accept' => '*/*', 'Accept-Encoding' => 'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent' => 'Ruby' }).
      to_return(:status => 200, :body => xml, :headers => {})
    get :date, params: { date: "20170108" }
    expect(response).to have_http_status(:ok)
  end
end

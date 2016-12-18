require 'rails_helper'
require 'net/http/request'

RSpec.describe Api::V1::Constraints do
  subject { Api::V1::Constraints.new({version: 1, default: false})}
  let(:req) { double(Net::HTTPRequest)}

  it "doesn't match when non-default and missing headers" do
    expect(subject.matches?(req)).to be_falsey
  end

  it "matches when the proper headers are included" do
    allow(req).to receive(:respond_to?).and_return(true)
    allow(req).to receive(:headers).and_return({"Accept" => "application/vnd.kiosks.v1"})
    expect(subject.matches?(req)).to be_truthy
  end
end

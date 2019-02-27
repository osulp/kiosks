# frozen_string_literal: true

require 'rails_helper'
require 'net/http/request'

RSpec.describe Api::V1::Constraints do
  subject { described_class.new(version: 1, default: false) }

  let(:req) { double(Net::HTTPRequest) }

  it "doesn't match when non-default and missing headers" do
    expect(subject).not_to be_matches(req)
  end

  it 'matches when the proper headers are included' do
    allow(req).to receive(:respond_to?).and_return(true)
    allow(req).to receive(:headers).and_return('Accept' => 'application/vnd.kiosks.v1')
    expect(subject).to be_matches(req)
  end
end

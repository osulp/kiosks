# frozen_string_literal: true

require 'rails_helper'

# Bogus class for testing the module, needs to inherit from Api::V1::ApiController
# for methods to work properly
class Api::V1::DummyClass < Api::V1::ApiController
end

RSpec.describe Api::V1::Concerns::VersionExpirationHandler do
  let(:dummy_class) { Api::V1::DummyClass.new }

  it 'has api_version 1' do
    expect(dummy_class.api_version).to eq(1)
  end
end

require 'rails_helper'
require 'ostruct'


RSpec.describe Api::V1::HoursController, type: :controller do
  Api::V1::DrupalHour.class_eval do
    # bypasses the MySQL call to drupal by reaching in and monkeypatching the query return with
    # some mock data and allowing for the dot-syntax on a hash. (ie. myhash.loc vs myhash[:loc]) which
    # is necessary to allow the rest of DrupalHour to behave as-is
    def self.query
      [OpenStruct.new({
         "loc": 'Test Location',
         "open_time_7": '12:00:00AM',
         "close_time_7": '12:00:00PM',
         "open_time_6": '12:00:00AM',
         "close_time_6": '12:00:00PM',
         "open_time_5": '12:00:00AM',
         "close_time_5": '12:00:00PM',
         "open_time_1": '12:00:00AM',
         "close_time_1": '12:00:00PM',
         "term_start_date": "2015-12-31",
         "term_end_date": "2016-01-02"
       })]
    end
  end

  let(:valid_attributes) {
    { dates: ['2016-01-01'] }
  }

  it "returns bad_request with missing attributes" do
    post :show, params: { dates: [] }
    expect(response).to have_http_status(:bad_request)
  end

  it "returns internal_server_error with invalid attributes" do
    post :show, params: { dates: [1, 2] }
    expect(response).to have_http_status(:internal_server_error)
  end

  it "returns hours" do
    post :show, params: valid_attributes
    expect(response).to have_http_status(:ok)
  end

  it "returns not_found with dates that have no hours" do
    post :show, params: { dates: ['2000-01-01'] }
    expect(response).to have_http_status(:not_found)
  end
end

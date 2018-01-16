require 'rails_helper'
require 'ostruct'

RSpec.describe Api::V1::HoursController, type: :controller do
  let(:drupal_hour_query) {
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
  }

  let(:drupal_special_hour_query) {
    [OpenStruct.new({
                        "open_time": '2000-01-01 12:00:00',
                        "close_time": '2000-01-01 24:00:00',
                        "start_date": DateTime.parse("2016-01-03"),
                        "end_date": DateTime.parse("2016-01-04")
                    })]
  }

  let(:drupal_int_hour_query) {
    [OpenStruct.new({
                        "open_time_wk": '2000-01-1 12:00:00',
                        "close_time_wk": '2000-01-1 24:00:00',
                        "open_time_sun": '2000-01-1 12:00:00',
                        "close_time_sun": '2000-01-1 24:00:00',
                        "open_time_sat": '2000-01-1 12:00:00',
                        "close_time_sat": '2000-01-1 24:00:00',
                        "start_date": "2016-01-05",
                        "end_date": "2016-01-10"
                    })]
  }

  before(:each) do
    allow(Api::V1::DrupalHour).to receive(:where).with({:loc=>"The Valley Library"}).and_return(drupal_hour_query)
    allow(Api::V1::DrupalSpecialHour).to receive(:all).and_return(drupal_special_hour_query)
    allow(Api::V1::DrupalIntersessionHour).to receive(:all).and_return(drupal_int_hour_query)
  end

  let(:valid_attributes) {
    # A Date that covers each of the three types of Drupal*Hour
    { dates: ['2016-01-02', '2016-01-03', '2016-01-05'] }
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

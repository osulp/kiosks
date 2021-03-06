# frozen_string_literal: true

require 'ostruct'

RSpec.describe Api::V1::HoursController, type: :controller do
  let(:valid_json) do
    { "2016-01-02 00:00:00 -0800": { open: '12:00am',
                                     close: '12:00pm',
                                     string_date: '2016-01-02',
                                     sortable_date: '2016-01-02',
                                     formatted_hours: '2016-01-02 00:00:00 -0800',
                                     open_all_day: true,
                                     closes_at_night: false },
      "2016-01-03 00:00:00 -0800": { open: '12:00am',
                                     close: '12:00pm',
                                     string_date: '2016-01-03',
                                     sortable_date: '2016-01-03',
                                     formatted_hours: '2016-01-03 00:00:00 -0800',
                                     open_all_day: true,
                                     closes_at_night: false },
      "2016-01-05 00:00:00 -0800": { open: '12:00am',
                                     close: '12:00pm',
                                     string_date: '2016-01-05',
                                     sortable_date: '2016-01-05',
                                     formatted_hours: '2016-01-05 00:00:00 -0800',
                                     open_all_day: true,
                                     closes_at_night: false } }
  end

  let(:valid_attributes) do
    # A Date that covers each of the three types of Drupal*Hour
    { dates: ['2016-01-02', '2016-01-03', '2016-01-05'] }
  end

  context 'with valid hours' do
    before do
      ENV['API_URI'] = 'http://server'
      ENV['API_ROUTE'] = '/action.json'
      stub_request(:post, 'http://server/action.json').to_return(status: 200, body: valid_json.to_json, headers: {})
      post :show, params: valid_attributes
    end

    it 'returns all hours' do
      expect(JSON.parse(response.body).keys).to include('2016-01-02 00:00:00 -0800', '2016-01-03 00:00:00 -0800', '2016-01-05 00:00:00 -0800')
    end

    it 'returns normal hours' do
      expect(response.body).to include('2016-01-02')
      expect(JSON.parse(response.body)['2016-01-02 00:00:00 -0800']['open']).to eq('12:00am')
      expect(JSON.parse(response.body)['2016-01-02 00:00:00 -0800']['close']).to eq('12:00pm')
    end
  end
end

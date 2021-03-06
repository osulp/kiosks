# frozen_string_literal: true

require 'ostruct'

RSpec.describe Api::V1::RoomsController, type: :controller do
  Api::V1::RoomResRoom.class_eval do
    # bypasses the MySQL call to db by reaching in and monkeypatching the query return with
    # some mock data and allowing for the dot-syntax on a hash. (ie. myhash.start_time vs myhash[:start_time])
    def self.except_rooms(_active_room_ids)
      [OpenStruct.new(
        "id": 2,
        "name": 'Room 2',
        "floor": 2,
        "created_at": Time.now,
        "updated_at": Time.now,
        "description": 'description',
        "image": 'some url',
        "floor_map": 'some url'
      )]
    end

    def self.active_room_ids(_start_time)
      [1]
    end
  end

  it 'returns internal_server_error with missing attributes' do
    get :available, params: { start_time: '' }
    expect(response).to have_http_status(:internal_server_error)
  end

  it 'returns internal_server_error with invalid attributes' do
    get :available, params: { start_time: -1 }
    expect(response).to have_http_status(:internal_server_error)
  end

  context 'when room 2 is available' do
    before do
      get :available, params: { start_time: (Time.now + 5.minutes).strftime('%Y%m%d%H%M%S') }
    end

    it { expect(response).to have_http_status(:ok) }
    it { expect(response.body).to include('Room 2') }
  end
end

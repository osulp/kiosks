# frozen_string_literal: true

module Api
  module V1
    class RoomResReservation < RoomResRecord
      self.table_name = APPLICATION_CONFIG['api']['database']['roomres']['reservations']['table_name']
      belongs_to :room, class_name: 'Api::V1::RoomResRoom', primary_key: 'id'
    end
  end
end

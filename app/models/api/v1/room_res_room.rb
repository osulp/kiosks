# frozen_string_literal: true

module Api
  module V1
    # Room Reservation database model
    class RoomResRoom < RoomResRecord
      self.table_name = APPLICATION_CONFIG['api']['database']['roomres']['rooms']['table_name']
      has_many :reservations, class_name: 'Api::V1::RoomResReservation', foreign_key: 'room_id'
      scope :except_rooms, ->(room_ids) { where('id NOT IN(?)', room_ids) }

      ##
      # Return all rooms which do not have an active reservation during the start_time provided
      # @param [DateTime] start_time - the start time to check, Ruby Time formatted (ie. YYYYmmddHHMMSS)
      # @return [ActiveRecord::Query] - the rooms
      def self.available_rooms(start_time)
        room_ids = active_room_ids(start_time)
        room_ids << 91 # also exclude the id 91 (room 2525), which has been disabled for reservations
        except_rooms(room_ids)
      end

      ##
      # Return all room ids which don't have an active reservation during the start_time provided
      # @param [DateTime] start_time - the start time to check, Ruby Time formatted (ie. YYYYmmddHHMMSS)
      # @return [ActiveRecord::Query] - the room ids which have an active reservation now or within 10 minutes
      def self.active_room_ids(start_time)
        joins(:reservations)
          .where('(reservations.start_time <= ? AND reservations.end_time > ? AND reservations.deleted_at IS NULL) OR (reservations.start_time <= ? AND reservations.end_time > ? AND reservations.deleted_at IS NULL)', start_time, start_time, start_time + 10.minutes, start_time + 10.minutes)
          .pluck(:id)
      end
    end
  end
end

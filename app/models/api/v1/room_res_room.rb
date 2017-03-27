module Api
  module V1
    class RoomResRoom < RoomResRecord
      self.table_name = APPLICATION_CONFIG['api']['database']['roomres']['rooms']['table_name']
      has_many :reservations, :class_name => 'Api::V1::RoomResReservation', :foreign_key => 'room_id'
      scope :except_rooms, ->(room_ids) { where("id NOT IN(?)", room_ids) }

      ##
      # Return all rooms which do not have an active reservation during the start_time provided
      # @param [DateTime] start_time - the start time to check, Ruby Time formatted (ie. YYYYmmddHHMMSS)
      # @return [ActiveRecord::Query] - the rooms
      def self.available_rooms(start_time)
        room_ids = active_room_ids(start_time)
        except_rooms(room_ids)
      end

      ##
      # Return all room ids which don't have an active reservation during the start_time provided
      # @param [DateTime] start_time - the start time to check, Ruby Time formatted (ie. YYYYmmddHHMMSS)
      # @return [ActiveRecord::Query] - the room ids which have an active reservation now or within 10 minutes
      def self.active_room_ids(start_time)
        st_in_ten_min = start_time + 10.minutes
        joins(:reservations)
          .where("(reservations.start_time <= ? AND reservations.end_time > ? AND reservations.deleted_at IS NULL) OR (reservations.start_time <= ? AND reservations.end_time > ? AND reservations.deleted_at IS NULL)", start_time, start_time, st_in_ten_min, st_in_ten_min)
          .pluck(:id)
      end
    end
  end
end

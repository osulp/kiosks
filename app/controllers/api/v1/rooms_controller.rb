module Api
  module V1
    class RoomsController < ApiController
      before_action :set_params
      def available
        render json: RoomResRoom.available_rooms(@start_time)
      end

      private

      def set_params
        # expecting a start date like "20160101120000"
        # the format should be YYYYMMDDHHmmss if it's set with moment.js
        @start_time = Time.parse(params[:start_time]).in_time_zone('UTC')
        raise StandardError.new("Invalid start_time.") if @start_time.nil?
      end
    end
  end
end

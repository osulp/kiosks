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
        rounded_to_next_20_min = Time.at((Time.parse(params[:start_time]).to_f / 20.minutes).ceil * 20.minutes)
        @start_time = rounded_to_next_20_min
        raise StandardError.new("Invalid start_time.") if @start_time.nil?
      end
    end
  end
end

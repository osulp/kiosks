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
        @start_time = Time.zone.parse(params[:start_time])
        raise StandardError.new("Invalid start_time.") if @start_time.nil?
      end
    end
  end
end
# frozen_string_literal: true

module Api
  module V1
    # API controller for querying the classroom schedules, DEPRECATED
    class ClassroomsController < ApiController
      before_action :set_params

      def rooms
        render json: APPLICATION_CONFIG['api']['classrooms']['rooms'].map { |r| { shortname: r['shortname'], title: r['title'] } }
      end

      def date
        calendar = ClassroomCalendar.new @date
        render json: calendar.detail
      end

      private

      def set_params
        # expecting a formatted date (YYYYMMDD), ex: 20160101
        @date = params[:date]
      end
    end
  end
end

module Api
  module V1
    class HoursController < ApiController
      before_action :set_params
      def show
        render json: DrupalHour.hours_for_dates(@dates)
      end

      private

      def set_params
        # expecting a JSON array of dates, see following example:
        # {"dates":["2016-01-01","2016-01-02","2016-01-03"]}
        @dates = params[:dates]
      end
    end
  end
end
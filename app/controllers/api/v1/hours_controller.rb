module Api
  module V1
    class HoursController < ApiController
      before_action :set_params
      def show
        render json: merged_hours
      end

      private

      def set_params
        # expecting a JSON array of dates, see following example:
        # {"dates":["2016-01-01","2016-01-02","2016-01-03"]}
        @dates = params[:dates]
      end

      def merged_hours
        h = DrupalHour.hours_for_dates(@dates)
        ih = DrupalIntersessionHour.hours_for_dates(@dates)
        sh = DrupalSpecialHour.hours_for_dates(@dates)
        merged = h.merge(ih).merge(sh)
        raise Api::V1::Exceptions::RecordNotFound.new(I18n.t('api.drupal.hours.record_not_found')) if merged.empty?
        merged
      end
    end
  end
end
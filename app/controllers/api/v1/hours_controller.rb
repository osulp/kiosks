# frozen_string_literal: true

require 'faraday'

module Api
  module V1
    # API controller for querying the Library hours api
    class HoursController < ApiController
      before_action :build_params

      def show
        render json: merged_hours
      end

      private

      def build_params
        # expecting a JSON array of dates, see following example:
        # {"dates":["2016-01-01","2016-01-02","2016-01-03"]}
        @dates = params[:dates]
      end

      def merged_hours
        res = api_request
        JSON.parse(res.body)
      end

      def api_request
        conn = Faraday.new(url: ENV['API_URI']) do |faraday|
          faraday.request  :url_encoded             # form-encode POST params
          faraday.adapter  Faraday.default_adapter  # make requests with Net::HTTP
        end
        conn.post ENV['API_ROUTE'], dates: @dates
      end
    end
  end
end

require 'faraday'
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
        res = api_request
        json = JSON.parse(res.body) 
      end

      def api_request
        conn = Faraday.new(:url => 'http://api.library.oregonstate.edu') do |faraday|
          faraday.request  :url_encoded             # form-encode POST params
          faraday.adapter  Faraday.default_adapter  # make requests with Net::HTTP
        end
        conn.post '/hours.json', { :dates => @dates } 
      end
    end
  end
end

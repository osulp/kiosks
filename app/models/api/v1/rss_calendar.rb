# frozen_string_literal: true

require 'open-uri'

module Api
  module V1
    class RssCalendar
      def self.fetch(date, url, cached_minutes)
        Date.strptime(date, '%Y%m%d')
        Rails.cache.fetch("#{date}#{url}/RssCalendar/fetch", expires_in: cached_minutes) { open(url).read }
      rescue ArgumentError
        raise Api::V1::Exceptions::BadRequest, 'Invalid date requested, must use format YYYYMMDD'
      rescue StandardError => e
        raise e
      end
    end
  end
end

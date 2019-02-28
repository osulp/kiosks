# frozen_string_literal: true

module Api
  module V1
    # Room calendar rss feed
    class RssCalendar
      def self.fetch(date, url, cached_minutes)
        Date.strptime(date, '%Y%m%d')
        Rails.cache.fetch("#{date}#{url}/RssCalendar/fetch", expires_in: cached_minutes) { Net::HTTP.get(URI.parse(url)) }
      rescue ArgumentError
        raise Api::V1::Exceptions::BadRequest, 'Invalid date requested, must use format YYYYMMDD'
      rescue StandardError => e
        raise e
      end
    end
  end
end

require 'api/v1/exceptions'
require 'api/v1/custom_hours_format'
module Api
  module V1
    class DrupalIntersessionHour < DrupalRecord
      self.table_name = APPLICATION_CONFIG['api']['database']['drupal']['intersession_hours']['table_name']

      # Query Drupal to find the intersession times the Library is open and closed for an array of Dates.
      # @param dates [Array<String>] Array of string dates you want the hours for.
      # @return [Hash<Hash>] Hash where each key is the date with the hours containing a hash with details.
      #   ie. { "2016-11-25 00:00:00 UTC": {
      #           "open": "12:15am",
      #           "close": "10:00pm",
      #           "string_date": "Fri, Nov 25, 2016",
      #           "sortable_date": 1480032000
      #         }
      #       }
      def self.hours_for_dates(dates)
        raise Api::V1::Exceptions::BadRequest.new("DrupalIntersessionHour.#{I18n.t('api.drupal.hours_for_dates.bad_request')}") if dates.nil? || dates.empty?

        result = {}
        all_hours = self.query
        dates.map! { |d| d.to_date }.sort.each do |date|
          next unless date.instance_of? Date
          hours = all_hours.select { |x| x.start_date.to_date <= date && x.end_date.to_date >= date }[0]
          next unless hours
          suffix = 'wk'
          suffix = 'sat' if date.wday == 6
          suffix = 'sun' if date.wday == 0
          open_time = DateTime.parse(hours["open_time_#{suffix}"].to_s)
          close_time = DateTime.parse(hours["close_time_#{suffix}"].to_s)
          open_time = Time.zone.parse("#{date} #{open_time.hour}:#{open_time.min}:#{open_time.sec}")
          close_time = Time.zone.parse("#{date} #{close_time.hour}:#{close_time.min}:#{close_time.sec}")
          parsed_time = Time.zone.parse(date.to_s)
          custom_format = Api::V1::CustomHoursFormat.new({open_time: open_time, close_time:close_time})
          result[parsed_time] = { open: open_time.strftime(APPLICATION_CONFIG['api']['hours']['hours_for_dates']['open_close_time_format']),
                                  close: close_time.strftime(APPLICATION_CONFIG['api']['hours']['hours_for_dates']['open_close_time_format']),
                                  string_date: parsed_time.strftime(APPLICATION_CONFIG['api']['hours']['hours_for_dates']['string_date_format']),
                                  sortable_date: parsed_time.strftime(APPLICATION_CONFIG['api']['hours']['hours_for_dates']['sortable_date_format']),
                                  formatted_hours: custom_format.formatted_hours,
                                  open_all_day: custom_format.open_all_day,
                                  closes_at_night: custom_format.closes_at_night
          }
        end
        return result
      end

      # Make the ActiveRecord call to get records from the Drupal database.
      def self.query
        self.all
      end
    end
  end
end


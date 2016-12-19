require 'api/v1/exceptions'

module Api
  module V1
    class DrupalHour < DrupalRecord
      self.table_name = APPLICATION_CONFIG['api']['database']['drupal']['hours']['table_name']

      # Query Drupal to find the times the Library is open and closed for an array of Dates.
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
        raise Api::V1::Exceptions::BadRequest.new(I18n.t('api.drupal.hours_for_dates.bad_request')) if dates.nil? || dates.empty?

        result = {}
        all_hours = self.query
        dates.map! { |d| d.to_date }.sort.each do |date|
          next unless date.instance_of? Date
          hours = all_hours.select { |x| x.term_start_date.to_date <= date && x.term_end_date.to_date >= date }[0]
          next unless hours
          week_day_index = date.wday < 5 ? 1 : date.wday
          week_day_index = 7 if date.wday == 0
          open_time = Time.zone.parse("#{date} #{hours["open_time_#{week_day_index}"]}").strftime("%l:%M%P")
          close_time = Time.zone.parse("#{date} #{hours["close_time_#{week_day_index}"]}").strftime("%l:%M%P")
          parsed_time = Time.zone.parse(date.to_s)
          result[parsed_time] = { open: open_time,
                                  close: close_time,
                                  string_date: parsed_time.strftime(APPLICATION_CONFIG['api']['drupal_hour']['hours_for_dates']['string_date_format']),
                                  sortable_date: parsed_time.strftime(APPLICATION_CONFIG['api']['drupal_hour']['hours_for_dates']['sortable_date_format'])}
        end
        raise Api::V1::Exceptions::RecordNotFound.new(I18n.t('api.drupal.hours_for_dates.record_not_found')) if result.empty?
        return result
      end

      # Make the ActiveRecord call to get records from the Drupal database.
      def self.query
        self.where(loc: APPLICATION_CONFIG['api']['database']['drupal']['hours']['loc'])
      end
    end
  end
end


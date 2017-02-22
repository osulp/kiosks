module Api
  module V1
    class CustomHoursFormat
      def initialize(options)
        @open_time = options[:open_time]
        @close_time = options[:close_time]
      end

      def formatted_hours
        string_open_time = @open_time.strftime(APPLICATION_CONFIG['api']['hours']['hours_for_dates']['open_close_time_format']).to_s.strip
        string_close_time = @close_time.strftime(APPLICATION_CONFIG['api']['hours']['hours_for_dates']['open_close_time_format']).to_s.strip
        if (string_close_time == "12:15am")
          "#{string_open_time} - No Closing"
        elsif (string_open_time == "12:15am")
          "No Closing - #{string_close_time}"
        elsif (string_close_time == "12:00am" && string_close_time == "12:00am")
          "Open 24 Hours"
        else
          "#{string_open_time} - #{string_close_time}"
        end
      end
    end
  end
end



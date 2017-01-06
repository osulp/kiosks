require 'nokogiri'

module Api
  module V1
    class ClassroomCalendar
      attr_reader :hash

      def initialize(date)
        xml_doc = fetch_date(date)
        @hash = Hash.from_xml(xml_doc.to_xml)
      end

      def detail
        {
          title: @hash['rss']['channel']['title'],
          link: @hash['rss']['channel']['link'],
          description: @hash['rss']['channel']['description'],
          published_at: @hash['rss']['channel']['pubDate'],
          events: events(@hash)
        }
      end

      private
      def fetch(*args)
        RssCalendar.fetch(*args)
      end

      ##
      # Build a list of events from the rss feed
      # @param [Hash] hash - the rss XML converted to a hash
      # @return [Array<ClassroomEvent>] an array of ClassroomEvent objects
      def events(hash)
        return [] if hash['rss']['channel']['item'].nil?
        return [ClassroomEvent.new(hash['rss']['channel']['item'])] if hash['rss']['channel']['item'].is_a?(Hash)
        hash['rss']['channel']['item'].map { |i| ClassroomEvent.new(i) }
      end

      ##
      # Fetch the RSS feed xml document for the date specified
      # @param [String] date - the date formatted in YYYYMMDD
      # @return [Nokogiri::XML::Document]
      def fetch_date(date)
        url = APPLICATION_CONFIG['api']['classrooms']['rss']['url'].gsub("{date}", date)
        cached_for = APPLICATION_CONFIG['api']['classrooms']['rss']['cached_minutes']
        Nokogiri::XML(fetch(date, url, cached_for))
      end

    end
  end
end
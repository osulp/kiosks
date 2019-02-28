# frozen_string_literal: true

require 'nokogiri'

module Api
  module V1
    # Model related to classroom api
    class ClassroomCalendar
      attr_reader :xml_doc

      def initialize(date)
        @xml_doc = fetch_date(date)
      end

      def detail
        {
          title: @xml_doc.at('rss/channel/title').text,
          link: @xml_doc.at('rss/channel/link').text,
          description: @xml_doc.at('rss/channel/description').text,
          published_at: @xml_doc.at('rss/channel/pubDate').text,
          events: events(@xml_doc)
        }
      end

      private

      def fetch(*args)
        RssCalendar.fetch(*args)
      end

      ##
      # Build a list of events from the rss feed
      # @param [Nokogiri::XML::Document] xml_doc - the xml doc
      # @return [Array<ClassroomEvent>] an array of ClassroomEvent objects
      def events(xml_doc)
        items = xml_doc.xpath('rss/channel/item')
        return [] if items.empty?

        items.map { |i| ClassroomEvent.new(i) }
      end

      ##
      # Fetch the RSS feed xml document for the date specified
      # @param [String] date - the date formatted in YYYYMMDD
      # @return [Nokogiri::XML::Document]
      def fetch_date(date)
        url = APPLICATION_CONFIG['api']['classrooms']['rss']['url'].gsub('{date}', date)
        cached_for = APPLICATION_CONFIG['api']['classrooms']['rss']['cached_minutes']
        Nokogiri::XML(fetch(date, url, cached_for))
      end
    end
  end
end

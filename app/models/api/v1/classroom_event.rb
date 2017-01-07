module Api
  module V1
    class ClassroomEvent
      attr_reader :title, :link, :start_time, :end_time, :subtitle, :room, :contact, :contact_phone, :contact_email, :room_shortname

      ##
      # Initialize a classroom event
      # @param [Nokogiri::XML::Node] node - the xml node with this events markup
      def initialize(node)
        #TODO : Extract the mapping of attribute name to xpath
        @title = node.at('title').text
        @link = node.at('link').text
        @start_time = Time.zone.parse(node.at_xpath('edu.oregonstate.calendar:dtstart').text).strftime("%Y%m%dT%H%M")
        @end_time = Time.zone.parse(node.at_xpath('edu.oregonstate.calendar:dtend').text).strftime("%Y%m%dT%H%M")
        @subtitle = node.at_xpath('edu.oregonstate.calendar:subtitle').text
        @room = node.at_xpath('edu.oregonstate.calendar:room').text
        @room_shortname = node.at_xpath('edu.oregonstate.calendar:calendar').attr('shortname')
        @contact = node.at_xpath('edu.oregonstate.calendar:contact').text
        @contact_email = node.at_xpath('edu.oregonstate.calendar:contact_email').text
        @contact_phone = node.at_xpath('edu.oregonstate.calendar:contact_phone').text
      end
    end
  end
end
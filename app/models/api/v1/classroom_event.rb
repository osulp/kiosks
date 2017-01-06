module Api
  module V1
    class ClassroomEvent
      attr_reader :title, :link, :start_time, :end_time, :subtitle, :room, :contact, :contact_phone, :contact_email

      def initialize(hash)
        @title = hash['title']
        @link = hash['link']
        @start_time = hash['dtstart']
        @end_time = hash['dtend']
        @subtitle = hash['subtitle']
        @room = hash['room']
        @contact = hash['contact']
        @contact_email = hash['contact_email']
        @contact_phone = hash['contact_phone']
      end
    end
  end
end
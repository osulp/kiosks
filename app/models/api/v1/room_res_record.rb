# frozen_string_literal: true

module Api
  module V1
    class RoomResRecord < ActiveRecord::Base
      self.abstract_class = true
      establish_connection DB_CONFIG["roomres_#{Rails.env}"]
    end
  end
end

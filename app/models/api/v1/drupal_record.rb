module Api
  module V1
    class DrupalRecord < ActiveRecord::Base
      self.abstract_class = true
      establish_connection DB_CONFIG["drupal_#{Rails.env}"]
    end
  end
end
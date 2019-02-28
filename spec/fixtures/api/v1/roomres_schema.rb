# frozen_string_literal: true

raise StandardError, 'Only development and test environments are allowed for this.' unless Rails.env.development? || Rails.env.test?

# Force the connection to use the drupal_test configuration from database.yml
ActiveRecord::Base.establish_connection DB_CONFIG["roomres_#{Rails.env.downcase}"]

# Manually created a schema to match the table(s) that are queried by the Api
ActiveRecord::Schema.define(version: 0) do
  create_table 'reservations', force: true do |t|
    t.string   'user_onid'
    t.integer  'room_id'
    t.string   'reserver_onid'
    t.datetime 'start_time'
    t.datetime 'end_time'
    t.string   'description'
    t.datetime 'created_at',    limit: 6
    t.datetime 'updated_at',    limit: 6
    t.datetime 'deleted_at'
    t.datetime 'truncated_at'
  end

  create_table 'rooms', force: true do |t|
    t.string   'name'
    t.integer  'floor'
    t.datetime 'created_at'
    t.datetime 'updated_at'
    t.text     'description'
    t.string   'image'
    t.string   'floor_map'
  end
end

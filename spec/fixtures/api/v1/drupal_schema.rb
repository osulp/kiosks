# Force the connection to use the drupal_test configuration from database.yml
ActiveRecord::Base.establish_connection DB_CONFIG["drupal_test"]

# Manually created a schema to match the table(s) that are queried by the Api
ActiveRecord::Schema.define(version: 0) do
  create_table "hours", force: :cascade do |t|
    t.string "loc"
    t.string "open_time_7", null: false
    t.string "close_time_7", null: false
    t.string "open_time_1", null: false
    t.string "close_time_1", null: false
    t.string "open_time_5", null: false
    t.string "close_time_5", null: false
    t.string "open_time_6", null: false
    t.string "close_time_6", null: false
    t.datetime "term_start_date", null: false
    t.datetime "term_end_date", null: false
  end
end

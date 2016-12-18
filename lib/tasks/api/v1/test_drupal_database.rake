desc "setup test drupal database"
namespace :test_drupal_database do
  task :setup do
    ENV['SCHEMA']="#{Rails.root}/spec/fixtures/api/v1/drupal_schema.rb"
    Rake::Task['db:schema:load'].invoke

    (1..30).each do |day|
      Api::V1::DrupalHour.create(
        id: day,
        loc: 'Test Location',
        term_start_date: Date.new(2016, 11, day),
        term_end_date: Date.new(2016, 11, 30),
        open_time_1: "12:00am",
        close_time_1: "12:00pm",
        open_time_5: "12:00am",
        close_time_5: "12:00pm",
        open_time_6: "12:00am",
        close_time_6: "12:00pm",
        open_time_7: "12:00am",
        close_time_7: "12:00pm")
       Api::V1::DrupalIntersessionHour.create(
        id: day,
        start_date: Date.new(2016, 12, day),
        end_date: Date.new(2016, 12, 30),
        open_time_wk: Time.new(2000, 01, 01, 12, 0, 0, "+00:00"),
        close_time_wk: Time.new(2000, 01, 01, 24, 0, 0, "+00:00"),
        open_time_sat: Time.new(2000, 01, 01, 12, 0, 0, "+00:00"),
        close_time_sat: Time.new(2000, 01, 01, 24, 0, 0, "+00:00"),
        open_time_sun: Time.new(2000, 01, 01, 12, 0, 0, "+00:00"),
        close_time_sun: Time.new(2000, 01, 01, 24, 0, 0, "+00:00"))
      end

    Api::V1::DrupalSpecialHour.create(
      id: 1,
      start_date: Date.new(2016, 11, 25),
      end_date: Date.new(2016, 11, 29),
      open_time: Time.new(2000, 01, 01, 6, 0, 0, "+00:00"),
      close_time: Time.new(2000, 01, 01, 18, 0, 0, "+00:00"))
    puts "Drupal #{Rails.env} Database contains: #{Api::V1::DrupalHour.all.count} hour rows."
    puts "Drupal #{Rails.env} Database contains: #{Api::V1::DrupalSpecialHour.all.count} special hour rows."
    puts "Drupal #{Rails.env} Database contains: #{Api::V1::DrupalIntersessionHour.all.count} intersession hour rows."
  end
end

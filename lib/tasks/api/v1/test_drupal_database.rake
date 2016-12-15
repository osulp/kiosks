desc "setup test drupal database"
namespace :test_drupal_database do
  task :setup do
    ENV['SCHEMA']="#{Rails.root}/spec/fixtures/api/v1/drupal_schema.rb"
    Rake::Task['db:schema:load'].invoke

    (1..30).each do |day|
      a = Api::V1::DrupalHour.create(
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
    end

    puts "Drupal Test Database contains: #{Api::V1::DrupalHour.all.count} hour rows."
    puts "#{Api::V1::DrupalHour.all.map { |h| "#{h.id}:#{h.loc} => #{h.term_start_date}" }}"
  end
end

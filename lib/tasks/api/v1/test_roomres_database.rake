# frozen_string_literal: true

desc 'setup test roomres database'
namespace :test_roomres_database do
  task :setup do
    ENV['SCHEMA'] = "#{Rails.root}/spec/fixtures/api/v1/roomres_schema.rb"
    Rake::Task['db:schema:load'].invoke

    room1 = Api::V1::RoomResRoom.create(
      name: 'one',
      floor: 2,
      created_at: Date.new(2016, 11, 1),
      updated_at: Date.new(2016, 11, 1),
      description: 'A room',
      image: '',
      floor_map: ''
    )

    room2 = Api::V1::RoomResRoom.create(
      name: 'jg',
      floor: 4,
      created_at: Date.new(2016, 11, 1),
      updated_at: Date.new(2016, 11, 1),
      description: 'A cubicle',
      image: '',
      floor_map: ''
    )

    (1..30).each do |day|
      Api::V1::RoomResReservation.create(
        user_onid: 'fakeonid',
        room_id: (day % 5).zero? ? room1.id : room2.id,
        reserver_onid: 'fakeonid',
        start_time: Time.new(2016, 11, day, 8, 0, 0).in_time_zone,
        end_time: Time.new(2016, 11, day, 10, 0, 0).in_time_zone,
        description: 'Some description',
        created_at: Date.new(2016, 11, day),
        updated_at: Date.new(2016, 11, day),
        deleted_at: nil,
        truncated_at: nil
      )
    end

    puts "RoomRes #{Rails.env} Database contains: #{Api::V1::RoomResRoom.all.count} room rows."
    puts "RoomRes #{Rails.env} Database contains: #{Api::V1::RoomResReservation.all.count} reservation rows."
  end
end

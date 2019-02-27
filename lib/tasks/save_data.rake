# frozen_string_literal: true

desc 'Save kiosks records in a file'

task save_data: :environment do |_t, _args|
  save_to_json(Collection)
  save_to_json(KioskLayout)
  save_to_json(Slide)
  save_to_json(SlideType)
  save_to_json(Kiosk)
  save_to_json(DateRange)
end

def save_to_json(obj)
  datetime_today = DateTime.now.strftime('%m-%d-%Y-%H-%M-%p') # "10-27-2017-12-59-PM"
  puts "saving all #{obj} records"
  File.open("tmp/#{obj}-#{datetime_today}.json", 'w') do |f|
    f.write(obj.all.to_json)
  end
end

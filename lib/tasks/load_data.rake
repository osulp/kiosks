desc 'Load basic data in the database'

task :load_data => :environment do |t, args|
  Kiosk.create(name: "touch").save
  Kiosk.create(name: "circulation").save
  Kiosk.create(name: "donor").save

  SlideType.create(name: "Ways To Give").save
  SlideType.create(name: "Our Supporters").save
  SlideType.create(name: "Donor Impact").save
  SlideType.create(name: "Basic").save
end

desc 'Load basic data in the database'

task :load_data => :environment do |t, args|
  touch_layout = KioskLayout.find_or_create_by(name: "touch")
  circ_layout = KioskLayout.find_or_create_by(name: "circulation")
  donor_layout = KioskLayout.find_or_create_by(name: "donor")

  Kiosk.find_or_create_by(name: "touch").update(kiosk_layout_id: touch_layout.id)
  Kiosk.find_or_create_by(name: "circulation").update(kiosk_layout_id: circ_layout.id)
  Kiosk.find_or_create_by(name: "donor").update(kiosk_layout_id: donor_layout.id)

  # SlideType is used for donor kiosks only
  SlideType.find_or_create_by(name: "Ways to Give")
  SlideType.find_or_create_by(name: "Our Supporters")
  SlideType.find_or_create_by(name: "Donor Impact")
  SlideType.find_or_create_by(name: "Basic")

  Collection.find_or_create_by(name: "generic")
end

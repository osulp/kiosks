# frozen_string_literal: true

desc 'Load basic data in the database'

task load_data: :environment do |_t, _args|
  touch_layout = KioskLayout.find_or_create_by(name: 'touch')
  circ_layout = KioskLayout.find_or_create_by(name: 'circulation')
  donor_layout = KioskLayout.find_or_create_by(name: 'donor')
  donor_coverflow_layout = KioskLayout.find_or_create_by(name: 'donorcoverflow')
  scarc_coverflow_layout = KioskLayout.find_or_create_by(name: 'scarc')
  media_layout = KioskLayout.find_or_create_by(name: 'media')
  interactive_layout = KioskLayout.find_or_create_by(name: 'interactive')
  tall_layout = KioskLayout.find_or_create_by(name: 'tall')
  admin_layout = KioskLayout.find_or_create_by(name: 'admin')

  Kiosk.find_or_create_by(name: 'touch').update(kiosk_layout_id: touch_layout.id)
  Kiosk.find_or_create_by(name: 'circulation').update(kiosk_layout_id: circ_layout.id)
  Kiosk.find_or_create_by(name: 'donor').update(kiosk_layout_id: donor_layout.id)
  Kiosk.find_or_create_by(name: 'donorcoverflow').update(kiosk_layout_id: donor_coverflow_layout.id)
  Kiosk.find_or_create_by(name: 'scarc').update(kiosk_layout_id: scarc_coverflow_layout.id)
  Kiosk.find_or_create_by(name: 'oral-history').update(kiosk_layout_id: media_layout.id)
  Kiosk.find_or_create_by(name: 'interactive-touch').update(kiosk_layout_id: interactive_layout.id)
  Kiosk.find_or_create_by(name: 'tall').update(kiosk_layout_id: tall_layout.id)
  Kiosk.find_or_create_by(name: 'admin').update(kiosk_layout_id: admin_layout.id)

  # SlideType is used for donor kiosks only
  SlideType.find_or_create_by(name: 'Ways to Give')
  SlideType.find_or_create_by(name: 'Our Supporters')
  SlideType.find_or_create_by(name: 'Donor Impact')
  SlideType.find_or_create_by(name: 'Basic')

  Collection.find_or_create_by(name: 'generic')
end

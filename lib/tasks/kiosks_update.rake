namespace :kiosks_update do
  desc 'Export associated values for kiosk_id in Slide prior to removing it from Slide'

  task :export_kiosk_ids => :environment do |t, args|
    @hash = {}
    Slide.all.each do |s|
      @hash[s.id] = {kiosk_id: s.kiosk_id, slide_id: s.id}
    end
    puts @hash.to_json
  end

  task :build_kiosk_slide => :environment do |t, args|
    tmp_json_file = Rails.root / 'tmp' / 'kiosk_ids.json'
    file = File.open(tmp_json_file)
    json = file.read
    data = JSON.parse(json)
    data.each do |record|
      slide = record.second
      puts "Creating KioskSlide records with slide.slide_id: #{slide['slide_id']}, slide.kiosk_id: #{slide['kiosk_id']}"
      KioskSlide.create(kiosk_id: slide.kiosk_id, slide_id: slide.id, source_type: "Slide")
    end
  end
end

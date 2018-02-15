namespace :load_slides do
  desc 'Load oral history slides'

  task :oral_history => :environment do |t, args|
    media_layout = KioskLayout.find_or_create_by(name: "media")
    kiosk = Kiosk.find_or_create_by(name: "oral-history")
    kiosk.update(kiosk_layout_id: media_layout.id)
    type = SlideType.find_or_create_by(name: "Basic")
    collection = Collection.find_or_create_by(name: "oral-history-slides")
    slides = YAML.load_file('lib/tasks/oral_history_slides.yml')["oral_history_slides"] || {}

    slides.each do |slide|
      video_name = slide["id"]
      en_sub_path = Rails.root / 'tmp' / 'oral_history_data' / 'subtitles' / "#{video_name}.vtt"
      es_sub_path = Rails.root / 'tmp' / 'oral_history_data' / 'subtitles' / "#{video_name}_es.vtt"
      video_path = Rails.root / 'tmp' / 'oral_history_data' / 'videos' / "#{video_name}.m4v"
      image_path = Rails.root / 'tmp' / 'oral_history_data' / 'thumbnails' / "#{video_name}.png"

      begin
        s = Slide.new

        s.title = slide["label"]
        s.caption = slide["descTitle"]
        s.kiosk_ids = [kiosk.id]
        s.slide_type = type
        s.collection = collection

        if File.exists?(image_path)
          File.open(image_path) do |f|
            s.image = f
          end
        end

        if File.exists?(video_path)
          File.open(video_path) do |f|
            s.video = f
          end
        end

        if File.exists?(en_sub_path)
          File.open(en_sub_path) do |f|
            s.subtitles = [f]
          end
        end

        if File.exists?(es_sub_path)
          File.open(es_sub_path) do |f|
            s.subtitles += [f]
          end
        end

        if s.save!
          DateRange.create(start_date:Time.zone.now, end_date:Time.zone.parse(1.year.from_now.to_s), slide_id: s.id)
          puts "Created slide #{slide["id"]}"
        end
      rescue => e
        puts "\tFailed to create slide #{slide["id"]}: #{e.message}"
      end
    end
  end

end

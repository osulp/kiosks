# frozen_string_literal: true

json.cache! ['v1', @kiosk], expires_in: Rails.env.development? ? 1.second : 24.hours do
  json.slides @slides do |slide|
    json.id slide.id
    json.original slide.image.url
    json.thumbnail slide.image.url(:thumb)
    json.xlarge slide.image.url(:xlarge)
    json.large slide.image.url(:large)
    json.xtall slide.image.url(:xtall)
    json.image_slide slide.image.url(:image_slide)
    json.tall_slide slide.image.url(:tall_slide)
    json.av_media slide.video_url
    json.subtitle_en slide.subtitles[0].present? ? slide.subtitles[0].url : ''
    json.subtitle_es slide.subtitles[1].present? ? slide.subtitles[1].url : ''
    json.title html_escape(slide.title)
    json.caption html_escape(slide.caption)
    json.description html_escape(slide.description)
    json.slide_type slide.slide_type.name
    json.current_kiosk @kiosk.name
    json.slide_length @kiosk.slide_length_ms
    json.kiosk do
      json.array!(slide.kiosks) do |kiosk|
        json.name kiosk.name
        json.id kiosk.id
      end
    end
    json.date_ranges do
      json.array!(slide.date_ranges) do |date_range|
        json.start_date date_range.start_date
        json.end_date date_range.end_date
      end
    end
    json.collection do
      json.detail html_escape(slide.collection.detail)
      json.name html_escape(slide.collection.name)
      json.primary_slide do
        json.id slide.collection.primary_slide&.id
        json.original slide.collection.primary_slide&.image&.url
        json.thumbnail slide.collection.primary_slide&.image&.url(:thumb)
        json.xlarge slide.collection.primary_slide&.image&.url(:xlarge)
        json.large slide.collection.primary_slide&.image&.url(:large)
      end
      json.slides do
        json.array!(slide.collection.slides) do |collection_slide|
          json.id collection_slide.id
          json.original collection_slide.image.url
          json.thumbnail collection_slide.image.url(:thumb)
          json.xlarge collection_slide.image.url(:xlarge)
          json.large collection_slide.image.url(:large)
        end
      end
    end
    json.osulp_directory @directory_osulp
    json.ecampus_directory @directory_ecampus
  end
  json.restart_kiosk @restart_kiosk
end

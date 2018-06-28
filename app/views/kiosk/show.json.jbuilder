json.slides @slides do |slide|
  json.id slide.id
  json.original slide.image.url
  json.thumbnail slide.image.url(:thumb)
  json.xlarge slide.image.url(:xlarge)
  json.av_media slide.video_url
  json.subtitle_en (slide.subtitles[0].present?) ? slide.subtitles[0].url : ""
  json.subtitle_es (slide.subtitles[1].present?) ? slide.subtitles[1].url : ""
  json.title slide.title
  json.caption slide.caption
  json.slide_type slide.slide_type.name
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
end
json.restart_kiosk @restart_kiosk
json.api_uri @api_uri
json.search_uri @search_uri
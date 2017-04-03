json.slides @slides do |slide|
  json.id slide.id
  json.original slide.image.url
  json.thumbnail slide.image.url(:thumb)
  json.xlarge slide.image.url(:xlarge)
  json.title slide.title
  json.caption slide.caption
  json.slide_type slide.slide_type.name
  json.kiosk slide.kiosk.name
  json.date_ranges do
    json.array!(slide.date_ranges) do |date_range|
      json.start_date date_range.start_date
      json.end_date date_range.end_date
    end
  end
end

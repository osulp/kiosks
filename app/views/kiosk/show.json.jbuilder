json.slides @slides do |slide|
  json.id slide.id
  json.original slide.image.url
  json.thumbnail slide.image.url(:thumb)
  json.expires_at slide.expires_at
  json.title slide.title
  json.caption slide.caption
  json.slide_type slide.slide_type.name
  json.kiosk slide.kiosk.name
end

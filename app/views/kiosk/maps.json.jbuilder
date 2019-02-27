# frozen_string_literal: true

json.maps @maps do |map|
  json.title map[:title]
  json.image_url map[:image_url]
end

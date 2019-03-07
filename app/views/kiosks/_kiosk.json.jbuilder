# frozen_string_literal: true

json.extract! kiosk, :id, :name, :map_default_floor_number, :slide_length, :created_at, :updated_at
json.url kiosk_url(kiosk, format: :json)

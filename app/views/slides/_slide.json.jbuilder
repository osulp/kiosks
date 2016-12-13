json.extract! slide, :id, :caption, :expires_at, :title, :slide_type_id, :kiosk_id, :created_at, :updated_at
json.url slide_url(slide, format: :json)

# frozen_string_literal: true

json.extract! date_range, :id, :start_date, :end_date, :created_at, :updated_at
json.url date_range_url(date_range, format: :json)

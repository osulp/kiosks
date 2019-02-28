# frozen_string_literal: true

json.array! @date_ranges, partial: 'date_ranges/date_range', as: :date_range

# frozen_string_literal: true

# Date ranges for when a slide should be visible
class DateRange < ApplicationRecord
  belongs_to :slide, inverse_of: :date_ranges
end

# frozen_string_literal: true

class DateRange < ApplicationRecord
  belongs_to :slide, inverse_of: :date_ranges
end

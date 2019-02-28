# frozen_string_literal: true

# Relationship between a slide and a kiosk
class KioskSlide < ApplicationRecord
  belongs_to :kiosk
  belongs_to :slide
end

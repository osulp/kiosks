# frozen_string_literal: true

# Relationship between a slide and a kiosk
class KioskSlide < ApplicationRecord
  belongs_to :kiosk, touch: true
  belongs_to :slide, touch: true
end

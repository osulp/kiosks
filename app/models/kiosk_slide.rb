# frozen_string_literal: true

class KioskSlide < ApplicationRecord
  belongs_to :kiosk
  belongs_to :slide
end

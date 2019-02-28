# frozen_string_literal: true

# Kiosk layout related to each kiosk, this drives the UI
class KioskLayout < ApplicationRecord
  has_many :kiosks
  validates :name, presence: true
end

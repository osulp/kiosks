# frozen_string_literal: true

# Slide types were used to drive the original donor kiosk
class SlideType < ApplicationRecord
  has_many :slides
  validates :name, presence: true
end

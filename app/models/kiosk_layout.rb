# frozen_string_literal: true

class KioskLayout < ApplicationRecord
  has_many :kiosks
  validates :name, presence: true
end

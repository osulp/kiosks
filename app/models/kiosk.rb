class Kiosk < ApplicationRecord
  has_many :slides
  validates :name, :presence => true
end

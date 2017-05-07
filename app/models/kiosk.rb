class Kiosk < ApplicationRecord
  has_many :kiosk_slides, :dependent => :destroy
  has_many :slides, through: :kiosk_slides
  validates :name, :presence => true
end

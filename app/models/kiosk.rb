class Kiosk < ApplicationRecord
  belongs_to :kiosk_layout
  has_many :kiosk_slides, :dependent => :destroy
  has_many :slides, through: :kiosk_slides
  validates :name, :presence => true
end

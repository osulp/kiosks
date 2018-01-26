class Kiosk < ApplicationRecord
  belongs_to :kiosk_layout
  has_many :kiosk_slides, :dependent => :destroy
  has_many :slides, through: :kiosk_slides
  validates :name, :presence => true
  validate :restart_at_cannot_be_in_the_past

  def restart_at_cannot_be_in_the_past
    if restart_at.present? && restart_at < DateTime.now
      errors.add(:restart_at, "(#{restart_at}) can't be in the past, please select a date in the future")
    end
  end
end

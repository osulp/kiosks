class Slide < ApplicationRecord
  belongs_to :slide_type
  belongs_to :kiosk
  has_attached_file :image, styles: { xlarge: "2500x1200#", large: "600x600>", medium: "300x300>", thumb: "100x100>" }, default_url: "/images/beaverlogo.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
  validates :image, :title, :caption, :presence => true
end

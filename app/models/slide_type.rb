class SlideType < ApplicationRecord
  has_many :slides
  validates :name, :presence => true
end

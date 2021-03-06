# frozen_string_literal: true

# Collection is a grouping of related slides
class Collection < ApplicationRecord
  # attr_accessor :slides_attributes
  has_many :slides, inverse_of: :collection, dependent: :destroy
  belongs_to :primary_slide, class_name: 'Slide', optional: true, touch: true
  validates :name, presence: true
  accepts_nested_attributes_for :slides, reject_if: proc { |attributes| attributes[:title].blank? }, allow_destroy: true
end

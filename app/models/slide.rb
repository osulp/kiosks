class Slide < ApplicationRecord
  include Rails.application.routes.url_helpers
  attr_accessor :image
  belongs_to :slide_type

  has_many :kiosk_slides, :dependent => :destroy
  has_many :kiosks, through: :kiosk_slides

  belongs_to :collection, inverse_of: :slides

  has_many :date_ranges, inverse_of: :slide, dependent: :destroy
  accepts_nested_attributes_for :date_ranges, allow_destroy: true

  validates :title, :caption, :presence => true

  mount_uploader :image, ImageUploader
  def to_jq_upload
    {
      "name" => read_attribute(:image),
      "size" => image.size,
      "url" => image.url,
      "thumbnailUrl" => image.thumb().url,
      "deleteUrl" => slide_path(:id => id),
      "deleteType" => "DELETE",
      "title" => read_attribute(:title),
      "caption" => read_attribute(:caption),
      "id" => id
    }
  end
end

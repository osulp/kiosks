class Slide < ApplicationRecord
  include Rails.application.routes.url_helpers
  attr_accessor :image
  belongs_to :slide_type
  belongs_to :kiosk
  belongs_to :collection, inverse_of: :slides
  # has_attached_file :image, styles: { xlarge: "2500x1200>", large: "600x600>", medium: "300x300>", thumb: "100x100>" }, default_url: "/images/beaverlogo.png"
  # validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
  validates :title, :caption, :presence => true
  # mount_uploader :image, ImageUploader, mount_on: :image_file_name
  mount_uploader :image, ImageUploader
  # #one convenient method to pass jq_upload the necessary information
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

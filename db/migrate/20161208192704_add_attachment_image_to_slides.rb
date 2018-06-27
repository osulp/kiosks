class AddAttachmentImageToSlides < ActiveRecord::Migration[5.1]
  def self.up
    change_table :slides do |t|
      # t.attachment :image
    end
  end

  def self.down
    remove_attachment :slides, :image
  end
end

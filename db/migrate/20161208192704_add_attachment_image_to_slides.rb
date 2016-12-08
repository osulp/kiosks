class AddAttachmentImageToSlides < ActiveRecord::Migration
  def self.up
    change_table :slides do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :slides, :image
  end
end

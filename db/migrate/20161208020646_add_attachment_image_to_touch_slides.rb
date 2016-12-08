class AddAttachmentImageToTouchSlides < ActiveRecord::Migration
  def self.up
    change_table :touch_slides do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :touch_slides, :image
  end
end

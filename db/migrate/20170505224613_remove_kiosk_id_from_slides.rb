class RemoveKioskIdFromSlides < ActiveRecord::Migration[5.0]
  def up
    remove_column :slides, :kiosk_id
  end

  def down
    add_column :slides, :kiosk_id, :integer
  end
end

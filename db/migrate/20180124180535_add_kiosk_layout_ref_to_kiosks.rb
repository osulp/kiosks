class AddKioskLayoutRefToKiosks < ActiveRecord::Migration[5.0]
  def change
    add_reference :kiosks, :kiosk_layout, foreign_key: true
  end
end

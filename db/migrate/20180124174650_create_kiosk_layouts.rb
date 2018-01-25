class CreateKioskLayouts < ActiveRecord::Migration[5.0]
  def change
    create_table :kiosk_layouts do |t|
      t.string :name

      t.timestamps
    end
  end
end

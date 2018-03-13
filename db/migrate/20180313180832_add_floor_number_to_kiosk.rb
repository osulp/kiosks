class AddFloorNumberToKiosk < ActiveRecord::Migration[5.0]
  def change
    add_column :kiosks, :map_default_floor_number, :integer, default: 2
  end
end

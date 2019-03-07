class AddSlideLengthToKiosk < ActiveRecord::Migration[5.2]
  def change
    add_column :kiosks, :slide_length, :integer
  end
end

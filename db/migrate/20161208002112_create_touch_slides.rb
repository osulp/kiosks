class CreateTouchSlides < ActiveRecord::Migration[5.0]
  def change
    create_table :touch_slides do |t|
      t.text :caption
      t.date :expiration_date

      t.timestamps
    end
  end
end

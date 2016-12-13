class AddKioskToSlides < ActiveRecord::Migration[5.0]
  def change
    add_reference :slides, :kiosk, foreign_key: true
  end
end

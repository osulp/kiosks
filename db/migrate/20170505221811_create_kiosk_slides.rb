class CreateKioskSlides < ActiveRecord::Migration[5.0]
  def up
    create_table :kiosk_slides do |t|
      t.integer :kiosk_id
      t.integer :slide_id
      t.string :source_type
    end
    # we pull Posts here as they have the foreign_key to tags...
    Slide.all.each do |s|
      KioskSlide.create(kiosk_id: s.kiosk_id, slide_id: s.id, source_type: "Slide")
    end
  end

  def down
    drop_table :kiosk_slides
  end

end

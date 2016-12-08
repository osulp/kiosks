class CreateSlides < ActiveRecord::Migration[5.0]
  def change
    create_table :slides do |t|
      t.text :caption
      t.datetime :expires_at
      t.string :title
      t.belongs_to :slide_type, foreign_key: true

      t.timestamps
    end
  end
end

class AddImageToSlides < ActiveRecord::Migration[5.0]
  def change
    add_column :slides, :image, :string
  end
end

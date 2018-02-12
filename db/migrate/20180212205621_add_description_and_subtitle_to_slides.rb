class AddDescriptionAndSubtitleToSlides < ActiveRecord::Migration[5.0]
  def change
    add_column :slides, :description, :text
    add_column :slides, :subtitle, :string
  end
end

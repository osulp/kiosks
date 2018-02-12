class AddVideoToSlides < ActiveRecord::Migration[5.0]
  def change
    add_column :slides, :video, :string
  end
end

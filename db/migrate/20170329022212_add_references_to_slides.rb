class AddReferencesToSlides < ActiveRecord::Migration[5.0]
  def change
    add_reference :slides, :collection, foreign_key: true
  end
end

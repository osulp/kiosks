class AddPrimarySlideIdToCollections < ActiveRecord::Migration[5.1]
  def change
    add_column :collections, :primary_slide_id, :integer
  end
end

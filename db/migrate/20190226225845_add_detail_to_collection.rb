class AddDetailToCollection < ActiveRecord::Migration[5.1]
  def change
    add_column :collections, :detail, :text
  end
end

class AddAttributesToDirectory < ActiveRecord::Migration[5.2]
  def change
    add_column :directories, :name, :string
    add_column :directories, :title, :string
    add_column :directories, :phone_number, :string
  end
end

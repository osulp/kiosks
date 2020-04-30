class CreateDirectories < ActiveRecord::Migration[5.2]
  def change
    create_table :directories do |t|
      t.text :content

      t.timestamps
    end
  end
end

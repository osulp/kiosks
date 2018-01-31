class AddRestartAtToKiosks < ActiveRecord::Migration[5.0]
  def change
    add_column :kiosks, :restart_at, :datetime
  end
end

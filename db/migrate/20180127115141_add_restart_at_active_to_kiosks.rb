class AddRestartAtActiveToKiosks < ActiveRecord::Migration[5.0]
  def change
    add_column :kiosks, :restart_at_active, :boolean
  end
end

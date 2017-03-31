class AddReferencesToDateRanges < ActiveRecord::Migration[5.0]
  def change
    add_reference :date_ranges, :slide, foreign_key: true
  end
end

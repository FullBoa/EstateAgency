class ChangeRevisionDateColumnType < ActiveRecord::Migration
  def change
    change_column :estate_revisions, :created_at, :datetime
  end
end

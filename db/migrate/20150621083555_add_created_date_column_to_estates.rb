class AddCreatedDateColumnToEstates < ActiveRecord::Migration
  def change
    add_column :estates, :created_at, :datetime, :null => false, :default => Time.now
  end
end

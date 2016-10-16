class TablesActualizing < ActiveRecord::Migration
  def change
    remove_column :estates, :title
    add_column :estates, :address, :string, limit: 2000
    add_column :estates, :cost, :decimal, :precision => 8

    add_column :users, :phone_number, :string
  end
end

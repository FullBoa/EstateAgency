class EstateTypesCostCategories < ActiveRecord::Migration
  def change
    add_column :estate_types, :client_cost, :decimal, :precision => 8
    add_column :accounts, :client_cost, :decimal, :precision => 8
  end
end

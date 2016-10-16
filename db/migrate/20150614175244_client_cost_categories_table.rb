class ClientCostCategoriesTable < ActiveRecord::Migration
  def change
    remove_column :estate_types, :client_cost

    create_table 'cost_categories', force: true do |t|
      t.decimal 'cost',  :precision => 8
    end

#default - for SQLite
    add_column :estate_types, :cost_category_id, :integer, null:false, default: 0
    add_foreign_key 'estate_types', 'cost_categories', column: :cost_category_id
  end
end

class EstateAreaAndFootage < ActiveRecord::Migration
  def change
    create_table 'city_areas', force: true do |t|
      t.string :title, null: false
    end

    add_column :estates, :footage, :float
    add_reference :estates, :city_area
  end
end

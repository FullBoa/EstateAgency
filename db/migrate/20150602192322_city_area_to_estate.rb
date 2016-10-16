class CityAreaToEstate < ActiveRecord::Migration
  def change
    add_foreign_key 'estates', 'city_areas',  column: :city_area_id
  end
end

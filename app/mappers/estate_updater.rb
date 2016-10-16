class EstateUpdater
  def get_updates view_params
    updated_keys_map = {
        :address => :address,
        :description => :description,
        :owner_name => :owner_name,
        :owner_phone => :owner_phone,
        :type_id => :estate_type_id,
        :cost => :cost,
        :footage => :footage,
        :city_area_id => :city_area_id,
    }
    updates = {}
    updated_keys_map.each do |key, value|
      if view_params.has_key? key
        updates[value] = view_params[key]
      end
    end
    if view_params.has_key? :status_enum
      updates[:status] = EnumHelper.get_enum_hash_by_value Estate.statuses, view_params[:status_enum]
    end
    updates
  end
end
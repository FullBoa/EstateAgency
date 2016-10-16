class EstateRevisionUpdater
  def get_updates view_params
    updated_keys_map = {
        :created_at => :created_at,
        :account_id => :account_id,
        :estate_id => :estate_id,
    }
    updates = {}
    updated_keys_map.each do |key, value|
      if view_params.has_key? key
        updates[value] = view_params[key]
      end
    end
    if view_params.has_key? :result_enum
      updates[:revision_result] = EnumHelper.get_enum_hash_by_value EstateRevision.results, view_params[:result_enum]
    end

    updates
  end
end
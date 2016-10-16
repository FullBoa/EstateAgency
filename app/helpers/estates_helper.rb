module EstatesHelper
  def build_estate_query query_params, current_user

    query = Estate.where(:is_deleted => false)

    if (query_params.has_key? :estate_type and query_params[:estate_type].count > 0)
      _query_types = query_params[:estate_type].collect { |type| type.to_i }
      if current_user != nil and current_user.account_type == 2 #client
        _account_types = current_user.accounts_estate_types.collect { |type| type.estate_type_id };
        _query_types = _query_types & _account_types
      end
      query = query.where(:estate_type_id => _query_types)
    else
      if current_user != nil and current_user.account_type == 2
        query = query.where(:estate_type_id => current_user.accounts_estate_types.collect { |type| type.estate_type_id })
      end
    end

    if query_params.has_key? :city_area and query_params[:city_area].count > 0
      query = query.where(:city_area_id => query_params[:city_area])
    end

    if current_user != nil and current_user.account_type == 2
      query = query.where(:status => EnumHelper.get_enum_hash_by_value(Estate.statuses, 'actual'))
    else
      if query_params.has_key? :status and query_params[:status].count > 0
        statuses = query_params[:status].collect { |status| EnumHelper.get_enum_hash_by_value(Estate.statuses, status)}
        query = query.where(:status => statuses)
      end
    end

    if query_params.has_key? :cost_min
      query = query.where('cost >= :cost_min', {:cost_min => query_params[:cost_min]})
    end
    if query_params.has_key? :cost_max
      query = query.where('cost <= :cost_max', {:cost_max => query_params[:cost_max]})
    end
    if query_params.has_key? :owner_phone
      query = query.where(:owner_phone => query_params[:owner_phone])
    end

    if query_params.has_key? :footage_min
      query = query.where('footage >= :footage_min or footage is null', {:footage_min => query_params[:footage_min]})
    end

    if query_params.has_key? :footage_max
      query = query.where('footage <= :footage_max or footage is null', {:footage_max => query_params[:footage_max]})
    end

    orders = {
        :actualized_at => Estate.default_order,
        :cost_asc => {:cost => 'asc'},
        :cost_desc => {:cost => 'desc'},
        :footage_asc => {:footage => 'asc'},
        :footage_desc => {:footage => 'desc'}
    }

    if query_params.has_key? :order_by and orders.has_key? query_params[:order_by].to_sym
      order_by = orders[query_params[:order_by].to_sym]
      Rails.logger.info('will order' + order_by.to_s)
      query.order(order_by)
    else
      query
    end
  end
end

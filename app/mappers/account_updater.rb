class AccountUpdater
	def get_updates view_params
		updates = {}

		#change account type and login are available?
    #da poh vasche!
		if(view_params.key? :login)
			updates[:login] = view_params[:login]
    end
    if(view_params.key? :password)
      updates[:password] = view_params[:password]
    end
		if(view_params.key? :account_type_enum)
		 	updates[:account_type] = EnumHelper.get_enum_hash_by_value Account.types, view_params[:account_type_enum]
		end
		if(view_params.key? :start_date)
			updates[:start_date] = view_params[:start_date]
		end
		if(view_params.key? :end_date)
			updates[:end_date] = view_params[:end_date]
    end
    if(view_params.key? :user_id)
      updates[:user_id] = view_params[:user_id]
    end
    if(view_params.key? :client_cost)
      updates[:client_cost] = view_params[:client_cost]
    end
		if(view_params.key? :creator_id)
			updates[:creator_id] = view_params[:creator_id]
		end
		updates
	end
end
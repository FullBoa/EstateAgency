class UserUpdater
	def get_updates view_params
		updates = {}
		if(view_params.key? :first_name)
			updates[:first_name] = view_params[:first_name]
		end
		if(view_params.key? :last_name)
			updates[:last_name] = view_params[:last_name]
		end
		if(view_params.key? :patronym)
			updates[:patronym] = view_params[:patronym]
    end
    if(view_params.key? :phone_number)
      updates[:phone_number] = view_params[:phone_number]
    end
		updates
	end
end
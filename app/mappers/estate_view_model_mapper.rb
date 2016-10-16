class EstateViewModelMapper < BaseMapper

	def map_demo from
		view_model = EstateViewModel.new
    view_model.id = from.id
		view_model.address = String.is_nil_or_empty?(from.address) ? 'не указан': from.address
		view_model.description = String.is_nil_or_empty?(from.description) ? '-' : from.description
		view_model.type = from.estate_type.title
    view_model.type_id = from.estate_type.id
    view_model.city_area = from.city_area.title unless from.city_area == nil
    view_model.city_area_id = from.city_area.id unless from.city_area == nil
    view_model.cost = from.cost
    view_model.footage = from.footage == nil ? 'не указан': from.footage
    view_model.address = from.address
    view_model.update_date = DateTimeFormatter.short_date from.actualized_at;
		view_model
	end
	def map from
		view_model = map_demo from
		view_model.owner_name = String.is_nil_or_empty?(from.owner_name) ? 'не указано': from.owner_name
		view_model.owner_phone = String.is_nil_or_empty?(from.owner_phone) ? 'не указан': from.owner_phone
    view_model.status_enum = EnumHelper.get_enum_value Estate.statuses,  from.status
    view_model.status = EnumHelper.get_enum_label Estate.statuses,  from.status

	view_model
	end

	def self.from_type
		Estate
	end

	def self.to_type
		EstateViewModel
	end
end
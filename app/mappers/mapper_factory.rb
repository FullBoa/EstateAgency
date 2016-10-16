class MapperFactory

	def get_mapper from_type, to_type
		mappers = BaseMapper.descendants.select { |mapper| mapper.from_type == from_type && mapper.to_type == to_type}
		if mappers.count > 1
			raise "Found too many mappers for from_type #{from_type} and to_type #{to_type}"
		elsif mappers.count == 0
			raise "Mapper not found for from_type #{from_type} and to_type #{to_type}"
		else
			mappers[0].new
		end
	end
end
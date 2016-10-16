class BaseMapper
	def map from
		from
	end

	def self.from_type
		String
	end

	def self.to_type
		String
	end

	#1. Как можно проверить, является ли класс потомком другого класса?
	#2. Получение нужного маппера-потомка?
	def self.descendants
     ObjectSpace.each_object(Class)
	end
end
module Api
	class HelpersController < ApplicationController
		def page_number
			id = params[:id]
			page_size = params[:page_size].to_i
			entity_name = params[:entity_name]
			entity = entity_name.constantize
      order = {:id => 'asc'}
      if entity.respond_to? 'default_order'
        order = entity.default_order
      end

			all = entity.where(:is_deleted => false).order(order).to_a
      count = all.rindex { |x| x.id == id.to_i }
      if count > 0
				page_number = (count - 1) / page_size + 1
			else
				page_number = 1
			end
			render_json page_number
		end
	end
end
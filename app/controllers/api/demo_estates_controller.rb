module Api
  class DemoEstatesController < ApplicationController
    @estate_view_mapper

    def initialize
    	@estate_view_mapper = EstateViewModelMapper.new
    end

    # GET /api/demo_estates
    def index
      query = Estate.build_estate_query params, current_account
      @estates = query.paginate(:page => params[:current_page], :per_page => params[:page_size])
      total = query.count
      view_models = @estates.collect do |estate|
      	@estate_view_mapper.map_demo estate
      end
      response = {:result => view_models, totalRecords: total}
      render_json response, Estate.includes
    end
 end
end
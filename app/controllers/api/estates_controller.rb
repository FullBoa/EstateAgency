module Api
  class EstatesController < ApplicationController
    before_action :set_estate, only: [:show, :destroy]
    before_action :authenticate_account!
    before_action :active_account!
    before_action :manager_account!, only: [:create, :update, :destroy]

    @estate_view_mapper
    @estate_updater

    def initialize
    	@estate_view_mapper = EstateViewModelMapper.new
      @estate_updater = EstateUpdater.new
    end

    # GET /api/estates
    def index
      query = Estate.build_estate_query params, current_account
      query = query.paginate(:page => params[:current_page], :per_page => params[:page_size])
      @estates = query;
      view_models = @estates.collect do |estate|
        @estate_view_mapper.map estate
      end

      total = query.count
      response = {:result => view_models, totalRecords: total}
      render_json response, Estate.includes
    end

    # GET /api/estates/1
    def show
      @estate = Estate.find(params[:id])
      view_model = @estate_view_mapper.map @estate
      render_json view_model, Estate.includes
    end

    # DELETE /api/estates/1
    def destroy
      @estate.is_deleted = 1
      @estate.save
      render_json @estate.id
    end

    # POST /estates
    def create
    	model_params = @estate_updater.get_updates params
    	result = Estate.create(model_params)
      view_model = @estate_view_mapper.map result
      render_json view_model, Estate.includes
    end

    # PATCH/PUT /estates/1
    def update
      model_params = @estate_updater.get_updates params
      result = Estate.update(params[:id], model_params)
      view_model = @estate_view_mapper.map result
      render_json view_model, Estate.includes
    end

    private
    def set_estate
      @estate = Estate.find(params[:id])
    end

    # def render_json (result)
    #   render json: result, include: Estate.includes
    # end

    def estate_params
      params[:estate]
    end
  end
end
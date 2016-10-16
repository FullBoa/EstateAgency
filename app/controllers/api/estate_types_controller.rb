module Api
  class EstateTypesController < ApplicationController

    def initialize
      @mapper = EstateTypeViewModelMapper.new
    end
    def index
      @estate_types = EstateType.all
      view_models = @estate_types.collect { |type| @mapper.map type }
      render json: view_models
    end
  end
end
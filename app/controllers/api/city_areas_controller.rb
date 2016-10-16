module Api
  class CityAreasController < ApplicationController

    def initialize
      @account_view_mapper = AccountViewModelMapper.new
      @account_updater = AccountUpdater.new
    end

    def index
      render json: CityArea.all.order(:title)
    end
  end
end

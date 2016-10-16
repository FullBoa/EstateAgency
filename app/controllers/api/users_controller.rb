module Api
  class UsersController < ApplicationController
    before_action :set_user, only: [:show, :destroy]
    before_action :authenticate_account!
    before_action :active_account!
    before_action :manager_account!
    @user_view_mapper
    @user_updater

    def initialize
      @user_view_mapper = UserViewModelMapper.new
      @user_updater = UserUpdater.new
    end

    def index
      query = User.build_estate_query params
      @users = query.paginate(:page => params[:current_page], :per_page => params[:page_size])
      total = query.count
      view_models = @users.collect do |user|
        @user_view_mapper.map user
      end
      response = {:result => view_models, totalRecords: total}
      render_json response
    end

    def show
      render_json @user_view_mapper.map @user
    end

    def destroy
      @user.is_deleted = 1
      @user.save
      render_json @user.id
    end

    def update
      model_params = @user_updater.get_updates params
      result = User.update(params[:id], model_params)
      render_json result
    end

    def create
      model_params = @user_updater.get_updates params
      result = User.create(model_params)
      render_json result
    end

    private
    def set_user
      @user = User.find(params[:id])
    end
  end
end
module Api
  class AccountsController < ApplicationController
    before_action :set_account, only: [:show, :destroy]
    before_action :authenticate_account!
    before_action :active_account!
    before_action :manager_account!, only: [:destroy, :update, :create]
    @account_view_mapper
    @account_updater

    def initialize
      @account_view_mapper = AccountViewModelMapper.new
      @account_updater = AccountUpdater.new
    end

    def index
      @accounts = Account.where(:user_id => params[:user_id], :is_deleted => false)
      view_models = @accounts.collect do |account|
        @account_view_mapper.map account
      end
      render_json view_models
    end

    def show
      render_json @account_view_mapper.map @account
    end

    def destroy
      @account.is_deleted = 1
      @account.save
      render_json @account.id
    end

    def update
      model_params = @account_updater.get_updates params
      result = Account.update(params[:id], model_params)
      render_json result
    end

    def create
      credentials = Account.generate_account_credentials params
      params[:login] = credentials[:login]
      params[:password] = credentials[:password]
      params[:creator_id] = current_account.id
      model_params = @account_updater.get_updates params
      result = Account.create(model_params)
      result[:login] = "#{result[:login]}#{result[:id]}"

      if params.has_key? :estate_types and params[:estate_types] != nil
        estate_types = params[:estate_types].collect do |estate_type|
          {:estate_type_id => estate_type}
        end
        result.accounts_estate_types.create(estate_types)
      end
      result.save!

      AgencyMailer.account_registered_email(result, current_account).deliver_now

      render_json result
    end

    private
    def set_account
      @account = Account.find(params[:id])
    end
  end
end
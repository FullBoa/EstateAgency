class AccountsController < ApplicationController
  before_action :authenticate_account!
  before_action :active_account!
  before_action :manager_account!, only: [:index]

  # GET /accounts
  def index
    @accounts = Account.all
  end

  def my
    mapper = AccountViewModelMapper.new

    @account = mapper.map current_account
    render :my
  end

end

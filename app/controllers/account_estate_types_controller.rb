class AccountEstateTypesController < ApplicationController
  before_action :set_account_estate_type, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_account!
  before_action :active_account!
  before_action :manager_account!, only: [:new, :edit, :create, :update, :destroy]

  # GET /account_estate_types
  # GET /account_estate_types.json
  def index
    @account_estate_types = AccountEstateType.all
  end

  # GET /account_estate_types/1
  # GET /account_estate_types/1.json
  def show
  end

  # GET /account_estate_types/new
  def new
    @account_estate_type = AccountEstateType.new
  end

  # GET /account_estate_types/1/edit
  def edit
  end

  # POST /account_estate_types
  # POST /account_estate_types.json
  def create
    @account_estate_type = AccountEstateType.new(account_estate_type_params)

    respond_to do |format|
      if @account_estate_type.save
        format.html { redirect_to @account_estate_type, notice: 'Account estate type was successfully created.' }
        format.json { render :show, status: :created, location: @account_estate_type }
      else
        format.html { render :new }
        format.json { render json: @account_estate_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /account_estate_types/1
  # PATCH/PUT /account_estate_types/1.json
  def update
    respond_to do |format|
      if @account_estate_type.update(account_estate_type_params)
        format.html { redirect_to @account_estate_type, notice: 'Account estate type was successfully updated.' }
        format.json { render :show, status: :ok, location: @account_estate_type }
      else
        format.html { render :edit }
        format.json { render json: @account_estate_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /account_estate_types/1
  # DELETE /account_estate_types/1.json
  def destroy
    @account_estate_type.destroy
    respond_to do |format|
      format.html { redirect_to account_estate_types_url, notice: 'Account estate type was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_account_estate_type
      @account_estate_type = AccountEstateType.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def account_estate_type_params
      params[:account_estate_type]
    end
end

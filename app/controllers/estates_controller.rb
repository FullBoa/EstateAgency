class EstatesController < ApplicationController
  before_action :set_estate, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_account!
  before_action :active_account!
  before_action :manager_account!, only: [:new, :create, :edit, :update, :destroy]

  # GET /estates
  def index
    @estates = Estate.all
  end

  # GET /estates/1
  def show
  end

  # GET /estates/new
  def new
    @estate = Estate.new
  end

  # GET /estates/1/edit
  def edit
  end

  # POST /estates
  def create
    @estate = Estate.new(estate_params)
    if @estate.save
      redirect_to @estate, notice: 'Estate was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /estates/1
  def update
    if @estate.update(estate_params)
      redirect_to @estate, notice: 'Estate was successfully updated.'
    else
      render :edit 
    end
  end

  # DELETE /estates/1
  def destroy
    @estate.is_deleted = 1
    redirect_to estates_url, notice: 'Estate was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_estate
      @estate = Estate.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def estate_params
      params[:estate]
    end
end

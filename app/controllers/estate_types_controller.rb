class EstateTypesController < ApplicationController
  before_action :set_estate_type, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_account!
  before_action :active_account!
  before_action :manager_account!, only: [:new, :edit, :create, :update, :destroy]

  # GET /estate_types
  # GET /estate_types.json
  def index
    @estate_types = EstateType.all
  end

  # GET /estate_types/1
  # GET /estate_types/1.json
  def show
  end

  # GET /estate_types/new
  def new
    @estate_type = EstateType.new
  end

  # GET /estate_types/1/edit
  def edit
  end

  # POST /estate_types
  # POST /estate_types.json
  def create
    @estate_type = EstateType.new(estate_type_params)

    respond_to do |format|
      if @estate_type.save
        format.html { redirect_to @estate_type, notice: 'Estate type was successfully created.' }
        format.json { render :show, status: :created, location: @estate_type }
      else
        format.html { render :new }
        format.json { render json: @estate_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /estate_types/1
  # PATCH/PUT /estate_types/1.json
  def update
    respond_to do |format|
      if @estate_type.update(estate_type_params)
        format.html { redirect_to @estate_type, notice: 'Estate type was successfully updated.' }
        format.json { render :show, status: :ok, location: @estate_type }
      else
        format.html { render :edit }
        format.json { render json: @estate_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /estate_types/1
  # DELETE /estate_types/1.json
  def destroy
    @estate_type.destroy
    respond_to do |format|
      format.html { redirect_to estate_types_url, notice: 'Estate type was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_estate_type
      @estate_type = EstateType.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def estate_type_params
      params[:estate_type]
    end
end

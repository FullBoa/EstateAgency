module Api
  class EstateRevisionsController < ApplicationController
    before_action :set_estate_revision, only: [:show, :edit, :update, :destroy]
    before_action :authenticate_account!
    before_action :active_account!
    before_action :manager_account!, only: [:create, :update, :destroy]

    def initialize
      @revision_view_mapper = EstateRevisionToViewModelMapper.new
      @revision_updater = EstateRevisionUpdater.new
    end

    def index
      @estate_revisions = EstateRevision.where(:estate_id => params[:estate_id]).order(created_at: :desc)
      view_models = @estate_revisions.collect do |revision|
        @revision_view_mapper.map revision
      end
      render_json view_models
    end

    def show
      render_json @revision_view_mapper.map @estate_revision
    end

    def destroy
      EstateRevision.destroy @estate_revision.id
      render_json @estate_revision.id
    end

    def update
      model_params = @revision_updater.get_updates params
      result = EstateRevision.update(params[:id], model_params)
      render_json @revision_view_mapper.map result
    end

    def create
      model_params = @revision_updater.get_updates params
      result = EstateRevision.create(model_params)
      render_json @revision_view_mapper.map result
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_estate_revision
      @estate_revision = EstateRevision.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def estate_revision_params
      params[:estate_revision]
    end
  end
end


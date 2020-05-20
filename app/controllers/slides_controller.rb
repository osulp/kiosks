# frozen_string_literal: true

# Controller to manage slides related to kiosks
class SlidesController < ApplicationController
  before_action :find_slide, only: %i[show edit update destroy]
  before_action :related_models, only: %i[create new show edit update destroy]
  before_action :default_kiosk, only: %i[create new edit update destroy]
  before_action :default_slide_type, only: %i[create new edit update destroy]
  before_action :default_collection, only: %i[create new edit update destroy]
  before_action :authenticate_user!
  before_action :authorize

  # GET /slides
  # GET /slides.json
  def index
    @slides = Slide.all
  end

  # GET /slides/1
  # GET /slides/1.json
  def show; end

  # GET /slides/new
  def new
    @slide = Slide.new
  end

  # GET /slides/1/edit
  def edit; end

  # POST /slides
  # POST /slides.json
  def create
    if params[:files]
      default_title = params[:files].first.original_filename.to_s
      default_params = { image: params[:files].first, caption: 'Enter Caption', title: default_title, expires_at: Date.today, slide_type_id: @default_slide_type.id, collection_id: @default_collection.id }
      @slide = Slide.new(default_params)
    else
      @slide = Slide.new(slide_params)
    end

    build_kiosks(params)
    respond_to do |format|
      if @slide.save
        format.html { redirect_to @slide, notice: 'Slide was successfully created.' }
        format.json do
          render json: { files: [@slide.to_jq_upload] }
        end.to_json
      else
        format.html { render :new }
        format.json { render json: @slide.errors, status: :unprocessable_entity }.to_json
      end
    end
  end

  # PATCH/PUT /slides/1
  # PATCH/PUT /slides/1.json
  def update
    build_kiosks(params)
    respond_to do |format|
      if @slide.update(slide_params)
        format.html { redirect_to @slide, notice: 'Slide was successfully updated.' }
        format.json { render :show, status: :ok, location: @slide }
      else
        format.html { render :edit }
        format.json { render json: @slide.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /slides/1
  # DELETE /slides/1.json
  def destroy
    @slide.destroy
    respond_to do |format|
      format.html { redirect_to slides_url, notice: 'Slide was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def find_slide
    @slide = Slide.find(params[:id])
  end

  def build_kiosks(params)
    kiosk_ids = params.dig('slide', 'kiosk_ids').try(:reject, &:empty?)
    @slide.kiosks = kiosk_ids ? Kiosk.find(kiosk_ids) : []
  end

  def related_models
    @kiosks = Kiosk.all
    @slide_types = SlideType.all
    @collections = Collection.all
  end

  def default_kiosk
    @default_kiosk = Kiosk.find_by_name('touch')
  end

  def default_slide_type
    @default_slide_type = SlideType.find_by_name('Basic')
  end

  def default_collection
    @default_collection = Collection.find_by_name('generic') unless params[:collection_id].present?
    @default_collection = Collection.find(params[:collection_id]) if params[:collection_id].present?
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def slide_params
    params.require(:slide).permit(:caption, :expires_at, :title, :description, :collection_id, :slide_type_id, :image, :video, :kiosk_ids, { subtitles: [] }, date_ranges_attributes: %i[id start_date end_date _destroy])
  end

  def authorize
    unless current_user&.admin?
      flash[:alert] = 'You do not have sufficient permissions to view this page'
      redirect_to root_path
    end
  end
end

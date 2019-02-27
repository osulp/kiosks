# frozen_string_literal: true

class CollectionsController < ApplicationController
  before_action :set_collection, only: %i[show edit update destroy]
  before_action :set_options, only: %i[new show edit update destroy]
  before_action :authenticate_user!
  before_action :authorize

  # GET /collections
  # GET /collections.json
  def index
    @collections = Collection.all
  end

  # GET /collections/1
  # GET /collections/1.json
  def show; end

  # GET /collections/new
  def new
    @collection = Collection.new
  end

  # GET /collections/1/edit
  def edit; end

  # POST /collections
  # POST /collections.json
  def create
    @collection = Collection.new(collection_params)
    set_kiosks(params)
    respond_to do |format|
      if @collection.save
        format.html { redirect_to @collection, notice: 'Collection was successfully created.' }
        format.json { render :show, status: :created, location: @collection }
      else
        format.html { render :new }
        format.json { render json: @collection.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /collections/1
  # PATCH/PUT /collections/1.json
  def update
    upload_slides(params)
    set_kiosks(params)
    respond_to do |format|
      if @collection.update(collection_params)
        format.html { redirect_to @collection, notice: 'Collection was successfully updated.' }
        format.json { render :show, status: :ok, location: @collection }
      else
        format.html { render :edit }
        format.json { render json: @collection.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /collections/1
  # DELETE /collections/1.json
  def destroy
    @collection.destroy
    respond_to do |format|
      format.html { redirect_to collections_url, notice: 'Collection was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_collection
    @collection = Collection.find(params[:id])
  end

  def upload_slides(params)
    return unless params['commit'] == 'Upload Slides'

    params['uploaded_files'].each do |fid|
      s = Slide.find(fid)
      s.collection_id = params['id']
      s.save!
    end
  end

  def set_kiosks(params)
    return unless params[:collection] && params[:collection][:slides_attributes]

    slides = {}
    params[:collection][:slides_attributes].each do |k, v|
      slide_id = v ? v['id'] : k['id']
      slide_kiosks = v ? v['kiosk_ids'] : k['kiosk_ids']
      slides[slide_id] = slide_kiosks if slide_id
    end

    @collection.slides.each do |slide|
      slide_id = slide.id.to_s
      kiosks = []
      if slides.key? slide_id
        slides[slide_id].each do |k|
          kiosks << Kiosk.find(k)
        end
      end

      if params['commit'] == 'Upload Slides'
        slide.kiosks = kiosks if slides.key? slide_id
      else
        slide.kiosks = kiosks
      end
    end
  end

  def set_options
    @kiosks = Kiosk.all
    @slide_types = SlideType.all
    @default_kiosk = Kiosk.find_or_create_by(name: 'touch')
    @default_slide_type = SlideType.find_or_create_by(name: 'Basic')
    @kiosk_options = Kiosk.all.collect { |obj| { obj.name => obj.id } }.inject(:merge)
    @slide_type_options = SlideType.all.collect { |obj| { obj.name => obj.id } }.inject(:merge)
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def collection_params
    params.require(:collection).permit(
      :detail,
      :name,
      slides_attributes: [
        :id,
        :caption,
        :expires_at,
        :title,
        :collection_id,
        :slide_type_id,
        :image,
        :_destroy,
        date_ranges_attributes: %i[id start_date end_date slide_id _destroy]
      ]
    )
  end

  def authorize
    unless current_user&.admin?
      flash[:alert] = 'You do not have sufficient permissions to view this page'
      redirect_to root_path
    end
  end
end

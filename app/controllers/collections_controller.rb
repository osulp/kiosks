class CollectionsController < ApplicationController
  before_action :set_collection, only: [:show, :edit, :update, :destroy]
  before_action :set_options, only: [:new, :show, :edit, :update, :destroy]
  before_action :authenticate_user!
  before_action :authorize

  # GET /collections
  # GET /collections.json
  def index
    @collections = Collection.all
  end

  # GET /collections/1
  # GET /collections/1.json
  def show
  end

  # GET /collections/new
  def new
    @collection = Collection.new
  end

  # GET /collections/1/edit
  def edit
  end

  # POST /collections
  # POST /collections.json
  def create
    @collection = Collection.new(collection_params)

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
    if (params["commit"] == "Upload Slides")
      params["uploaded_files"].each do |fid|
        s = Slide.find(fid)
        s.collection_id = params["id"]
        s.save!
      end
    end
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

    def set_options
      @kiosks = Kiosk.all
      @slide_types = SlideType.all
      @default_kiosk = Kiosk.find_by_name("touch")
      @default_slide_type = SlideType.find_by_name("Basic")
      @kiosk_options = Kiosk.all.collect { |obj| {obj.name => obj.id} }.inject(:merge)
      @slide_type_options = SlideType.all.collect { |obj| {obj.name => obj.id} }.inject(:merge)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def collection_params
      params.require(:collection).permit(
        :name, 
        slides_attributes: [:id, :caption, :expires_at, :title, :collection_id, :slide_type_id, :kiosk_id, :image, :_destroy, date_ranges_attributes: [:id, :start_date, :end_date, :slide_id, :_destroy]]
        )
    end

    def authorize
      unless current_user && current_user.admin?
        flash[:alert] = "You do not have sufficient permissions to view this page"
        redirect_to root_path
      end
    end
end

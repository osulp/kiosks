class SlidesController < ApplicationController
  before_action :set_slide, only: [:show, :edit, :update, :destroy]
  before_action :set_options, only: [:new, :show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:index]
  before_action :authorize, except: [:index]

  # GET /slides
  # GET /slides.json
  def index
    @slides = Slide.all
  end

  # GET /slides/1
  # GET /slides/1.json
  def show
  end

  # GET /slides/new
  def new
    @slide = Slide.new
  end

  # GET /slides/1/edit
  def edit
  end

  # POST /slides
  # POST /slides.json
  def create
    @slide = Slide.new(slide_params)

    respond_to do |format|
      if @slide.save
        format.html { redirect_to @slide, notice: 'Slide was successfully created.' }
        format.json { render :show, status: :created, location: @slide }
      else
        format.html { render :new }
        format.json { render json: @slide.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /slides/1
  # PATCH/PUT /slides/1.json
  def update
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
    def set_slide
      @slide = Slide.find(params[:id])
    end

    def set_options
      @kiosks = Kiosk.all
      @slide_types = SlideType.all
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def slide_params
      params.require(:slide).permit(:caption, :expires_at, :title, :slide_type_id, :kiosk_id, :image)
    end

    def authorize
      unless current_user && current_user.admin?
        flash[:alert] = "You do not have sufficient permissions to view this page"
        redirect_to kiosks_path
      end
    end

end

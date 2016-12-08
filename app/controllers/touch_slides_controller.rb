class TouchSlidesController < ApplicationController
  before_action :set_touch_slide, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!, except: [:index]
  # GET /touch_slides
  # GET /touch_slides.json
  def index
    @touch_slides = TouchSlide.all
  end

  # GET /touch_slides/1
  # GET /touch_slides/1.json
  def show
  end

  # GET /touch_slides/new
  def new
    @touch_slide = TouchSlide.new
  end

  # GET /touch_slides/1/edit
  def edit
  end

  # POST /touch_slides
  # POST /touch_slides.json
  def create
    @touch_slide = TouchSlide.new(touch_slide_params)

    respond_to do |format|
      if @touch_slide.save
        format.html { redirect_to @touch_slide, notice: 'Touch slide was successfully created.' }
        format.json { render :show, status: :created, location: @touch_slide }
      else
        format.html { render :new }
        format.json { render json: @touch_slide.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /touch_slides/1
  # PATCH/PUT /touch_slides/1.json
  def update
    respond_to do |format|
      if @touch_slide.update(touch_slide_params)
        format.html { redirect_to @touch_slide, notice: 'Touch slide was successfully updated.' }
        format.json { render :show, status: :ok, location: @touch_slide }
      else
        format.html { render :edit }
        format.json { render json: @touch_slide.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /touch_slides/1
  # DELETE /touch_slides/1.json
  def destroy
    @touch_slide.destroy
    respond_to do |format|
      format.html { redirect_to touch_slides_url, notice: 'Touch slide was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_touch_slide
      @touch_slide = TouchSlide.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def touch_slide_params
      params.require(:touch_slide).permit(:caption, :expiration_date, :image)
    end
end

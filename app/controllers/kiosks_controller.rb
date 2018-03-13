class KiosksController < ApplicationController
  before_action :set_kiosk, only: [:show, :edit, :update, :destroy]
  before_action :set_options, only: [:create, :new, :show, :edit, :update, :destroy]
  before_action :authenticate_user!
  before_action :authorize
  before_action :set_params

  # GET /kiosks
  # GET /kiosks.json
  def index
    @kiosks = Kiosk.all
  end

  # GET /kiosks/1
  # GET /kiosks/1.json
  def show
  end

  # GET /kiosks/new
  def new
    @kiosk = Kiosk.new
  end

  # GET /kiosks/1/edit
  def edit
  end

  # POST /kiosks
  # POST /kiosks.json
  def create
    @kiosk = Kiosk.new(kiosk_params)

    respond_to do |format|
      if @kiosk.save
        format.html { redirect_to @kiosk, notice: 'Kiosk was successfully created.' }
        format.json { render :show, status: :created, location: @kiosk }
      else
        format.html { render :new }
        format.json { render json: @kiosk.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /kiosks/1
  # PATCH/PUT /kiosks/1.json
  def update
    respond_to do |format|
      if @kiosk.update(kiosk_params)
        format.html { redirect_to @kiosk, notice: 'Kiosk was successfully updated.' }
        format.json { render :show, status: :ok, location: @kiosk }
      else
        format.html { render :edit }
        format.json { render json: @kiosk.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /slides/1
  # DELETE /slides/1.json
  def destroy
    @kiosk.destroy
    respond_to do |format|
      format.html { redirect_to kiosks_url, notice: 'Kiosk was successfully destroyed.' }
      format.json { head :no_content }
    end
  end


  # GET /kiosks/1/edit_multiple
  def edit_multiple
    @kiosks = Kiosk.find(params[:kiosk_ids])
  end

  # PATCH/PUT /kiosks/1/update_multiple
  def update_multiple
    @kiosks = Kiosk.find(params[:kiosk_ids])
    @kiosks.reject! do |kiosk|
      kiosk.update_attributes(kiosk_params_multiple)
    end

    if @kiosks.empty?
      redirect_to kiosks_url
    else
      @kiosk = Kiosk.new(kiosk_params_multiple)
      render "edit_multiple"
    end
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_kiosk
      @kiosk = Kiosk.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def kiosk_params
      params.require(:kiosk).permit(:name, :map_default_floor_number, :kiosk_layout_id, :restart_at, :restart_at_active)
    end

    # Only allow restart_at and restart_at_active (restart status) for mass update
    def kiosk_params_multiple
      params.require(:kiosk).permit(:restart_at, :restart_at_active)
    end

    def set_options
      @kiosk_layouts = KioskLayout.all
    end

    def set_params
      @kiosk_type ||= params[:id]
      # TODO: replace this with current slides for a specific kiosk type
      @slides = [{
        id: 1,
        image_url: "/uploads/default_slide_1.png",
        expires_at: "2020-12-31T23:59:59Z",
        created_at: "2000-12-31T11:59:59Z",
        updated_at: "2000-12-31T23:59:59Z",
        title: "Slide.title",
        caption: "Slide.caption",
        slide_type: "SlideType.name",
        kiosk: "Kiosk.name"
      }, {
        id: 2,
        image_url: "/uploads/default_slide_2.png",
        expires_at: "2010-11-11T13:00:00Z",
        created_at: "2000-11-11T11:00:00Z",
        updated_at: "2000-11-11T13:00:00Z",
        title: "Slide.title:2",
        caption: "Slide.caption:2",
        slide_type: "SlideType.name:2",
        kiosk: "Kiosk.name:2"
      }]
    end

    def authorize
      unless current_user && current_user.admin?
        flash[:alert] = "You do not have sufficient permissions to view this page"
        redirect_to root_path
      end
    end

end

class KioskLayoutsController < ApplicationController
  before_action :set_kiosk_layout, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
  before_action :authorize

  # GET /kiosk_layouts
  # GET /kiosk_layouts.json
  def index
    @kiosk_layouts = KioskLayout.all
  end

  # GET /kiosk_layouts/1
  # GET /kiosk_layouts/1.json
  def show
  end

  # GET /kiosk_layouts/new
  def new
    @kiosk_layout = KioskLayout.new
  end

  # GET /kiosk_layouts/1/edit
  def edit
  end

  # POST /kiosk_layouts
  # POST /kiosk_layouts.json
  def create
    @kiosk_layout = KioskLayout.new(kiosk_layout_params)

    respond_to do |format|
      if @kiosk_layout.save
        format.html { redirect_to @kiosk_layout, notice: 'Kiosk layout was successfully created.' }
        format.json { render :show, status: :created, location: @kiosk_layout }
      else
        format.html { render :new }
        format.json { render json: @kiosk_layout.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /kiosk_layouts/1
  # PATCH/PUT /kiosk_layouts/1.json
  def update
    respond_to do |format|
      if @kiosk_layout.update(kiosk_layout_params)
        format.html { redirect_to @kiosk_layout, notice: 'Kiosk layout was successfully updated.' }
        format.json { render :show, status: :ok, location: @kiosk_layout }
      else
        format.html { render :edit }
        format.json { render json: @kiosk_layout.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /kiosk_layouts/1
  # DELETE /kiosk_layouts/1.json
  def destroy
    @kiosk_layout.destroy
    respond_to do |format|
      format.html { redirect_to kiosk_layouts_url, notice: 'Kiosk layout was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_kiosk_layout
      @kiosk_layout = KioskLayout.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def kiosk_layout_params
      params.require(:kiosk_layout).permit(:name)
    end

    def authorize
      unless current_user && current_user.admin?
        flash[:alert] = "You do not have sufficient permissions to view this page"
        redirect_to root_path
      end
    end
end

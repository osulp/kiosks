# frozen_string_literal: true

# Controller for managing slide types
class SlideTypesController < ApplicationController
  before_action :set_slide_type, only: %i[show edit update destroy]
  before_action :authenticate_user!
  before_action :authorize

  # GET /slide_types
  # GET /slide_types.json
  def index
    @slide_types = SlideType.all
  end

  # GET /slide_types/1
  # GET /slide_types/1.json
  def show; end

  # GET /slide_types/new
  def new
    @slide_type = SlideType.new
  end

  # GET /slide_types/1/edit
  def edit; end

  # POST /slide_types
  # POST /slide_types.json
  def create
    @slide_type = SlideType.new(slide_type_params)

    respond_to do |format|
      if @slide_type.save
        format.html { redirect_to @slide_type, notice: 'Slide type was successfully created.' }
        format.json { render :show, status: :created, location: @slide_type }
      else
        format.html { render :new }
        format.json { render json: @slide_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /slide_types/1
  # PATCH/PUT /slide_types/1.json
  def update
    respond_to do |format|
      if @slide_type.update(slide_type_params)
        format.html { redirect_to @slide_type, notice: 'Slide type was successfully updated.' }
        format.json { render :show, status: :ok, location: @slide_type }
      else
        format.html { render :edit }
        format.json { render json: @slide_type.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_slide_type
    @slide_type = SlideType.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def slide_type_params
    params.require(:slide_type).permit(:name)
  end

  def authorize
    unless current_user&.admin?
      flash[:alert] = 'You do not have sufficient permissions to view this page'
      redirect_to root_path
    end
  end
end

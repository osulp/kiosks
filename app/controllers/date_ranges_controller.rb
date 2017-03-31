class DateRangesController < ApplicationController
  before_action :set_date_range, only: [:show, :edit, :update, :destroy]

  # GET /date_ranges
  # GET /date_ranges.json
  def index
    @date_ranges = DateRange.all
  end

  # GET /date_ranges/1
  # GET /date_ranges/1.json
  def show
  end

  # GET /date_ranges/new
  def new
    @date_range = DateRange.new
  end

  # GET /date_ranges/1/edit
  def edit
  end

  # POST /date_ranges
  # POST /date_ranges.json
  def create
    @date_range = DateRange.new(date_range_params)

    respond_to do |format|
      if @date_range.save
        format.html { redirect_to @date_range, notice: 'Date range was successfully created.' }
        format.json { render :show, status: :created, location: @date_range }
      else
        format.html { render :new }
        format.json { render json: @date_range.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /date_ranges/1
  # PATCH/PUT /date_ranges/1.json
  def update
    respond_to do |format|
      if @date_range.update(date_range_params)
        format.html { redirect_to @date_range, notice: 'Date range was successfully updated.' }
        format.json { render :show, status: :ok, location: @date_range }
      else
        format.html { render :edit }
        format.json { render json: @date_range.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /date_ranges/1
  # DELETE /date_ranges/1.json
  def destroy
    @date_range.destroy
    respond_to do |format|
      format.html { redirect_to date_ranges_url, notice: 'Date range was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_date_range
      @date_range = DateRange.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def date_range_params
      params.require(:date_range).permit(:start_date, :end_date)
    end
end

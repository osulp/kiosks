# frozen_string_literal: true

# Controller for routing the Directory Pages
class DirectoriesController < ApplicationController
  def csv_page; end

  def iframe_page; end

  def editor_page
    @directory = Directory.new
  end

  def show
    @directory = Directory.new
  end

  def new
    @directory = Directory.new
  end

  def index
    @directories = Directory.all
  end

  def create
    Directory.import(params[:directory][:file])
    flash[:notice] = 'Directory uploaded successfully'
    redirect_to directories_path #=> or where you want
  end
end

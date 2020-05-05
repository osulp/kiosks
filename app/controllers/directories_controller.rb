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

  def editor_page_submit
    @directory = Directory.find_or_create_by(name: 'ckeditor')
    @directory.name = 'ckeditor'
    @directory.content = params[:directory][:content]
    @directory.save
    redirect_to show_editor_info_path #=> or where you want
  end

  def editor_show_page
    @directory = Directory.where(name: 'ckeditor').first
  end
end

# frozen_string_literal: true

# Controller for routing the Directory Pages
class DirectoriesController < ApplicationController
  def iframe_page; end

  def new
    @directory = Directory.new
  end

  def index
    @osulp = Directory.where(content: 'OSULP Leadership')
    @ecampus = Directory.where(content: 'Ecampus Leadership')
  end

  def create
    Directory.import(params[:directory][:file], params[:directory][:name])
    flash[:notice] = 'Directory uploaded successfully'
    redirect_to directories_path #=> or where you want
  end
end

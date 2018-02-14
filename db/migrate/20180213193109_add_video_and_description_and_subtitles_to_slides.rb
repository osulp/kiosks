class AddVideoAndDescriptionAndSubtitlesToSlides < ActiveRecord::Migration[5.0]
  def change
    add_column :slides, :video, :string
    add_column :slides, :description, :text
    add_column :slides, :subtitles, :string
  end
end

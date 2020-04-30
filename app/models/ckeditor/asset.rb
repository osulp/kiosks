# frozen_string_literal: true

# A modle for CKEditor
class Ckeditor::Asset < ActiveRecord::Base
  include Ckeditor::Orm::ActiveRecord::AssetBase

  delegate :url, :current_path, :content_type, to: :data

  validates :data, presence: true
end

# frozen_string_literal: true

# used for attaching pictures
class Ckeditor::Picture < Ckeditor::Asset
  mount_uploader :data, CkeditorPictureUploader, mount_on: :data_file_name

  def url_content
    url(:content)
  end
end

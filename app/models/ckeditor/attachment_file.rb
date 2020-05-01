# frozen_string_literal: true

# Used for attaching files
class Ckeditor::AttachmentFile < Ckeditor::Asset
  mount_uploader :data, CkeditorAttachmentFileUploader, mount_on: :data_file_name

  def url_thumb
    @url_thumb ||= Ckeditor::Utils.filethumb(filename)
  end
end

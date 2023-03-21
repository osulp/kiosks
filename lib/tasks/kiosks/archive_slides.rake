# frozen_string_literal: true

namespace :kiosks do
  # DESC: Archiving slides from kiosks
  desc 'Save and archiving slides into a directory'

  # TASK: Do the functionality of archiving slides
  task archive_slides: :environment do
    # FETCH: Get all the slides from the kiosks
    kiosk_slides = Slide.all

    # CREATE: Make a main directory to store in slides
    Dir.mkdir './slides_archive/' unless File.exist? './slides_archive/'

    # ITERATE: Going through each slides and getting the infomation
    kiosk_slides.each do |i|
      # MAKE: Create underscore title to name the file
      title_slide = i.title.parameterize.underscore.to_s

      # CREATE: Create a directory
      create_directory(title_slide)

      # PATH: Setup a path for the txt file
      path = "./slides_archive/#{title_slide}/#{title_slide}.txt"

      # NEW FILE: Create a new file with the title in its name & put info in it
      # rubocop:disable Style/BlockDelimiters
      File.open(path, 'w+') { |f|
        f.write("SLIDE INFO\n")
        f.write("Title: #{i.title}\n")
        f.write("Caption: #{i.caption}\n")
        f.write("ID: #{i.id}\n")

        # CHECK: Check to see if file has image or video format
        if i.image.blank?
          f.write("Video File Name: #{i.video}")
        else
          f.write("Image File Name: #{i.image}")
        end
      }
      # rubocop:enable Style/BlockDelimiters
    end
  end

  # METHOD: Create a directory with the name of the slides
  def create_directory(name_slide)
    # NEW: Create a nested file with the name given
    Dir.mkdir "./slides_archive/#{name_slide}/" unless File.exist? "./slides_archive/#{name_slide}/"
  end
end

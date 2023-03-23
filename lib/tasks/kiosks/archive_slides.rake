# frozen_string_literal: true

require 'fileutils'

namespace :kiosks do
  # DESC: Archiving slides from kiosks
  desc 'Save and archiving slides into a directory'

  # TASK: Do the functionality of archiving slides
  task archive_slides: :environment do
    # FETCH: Get all the slides from the kiosks
    kiosk_slides = Slide.all

    # CREATE: Make a main directory
    create_parent_directory

    # CREATE: Make a counter
    counter = 1

    # MESSAGE: Tell user how many nested folder and info that it will be created
    puts "Now create & store slides into their destination, in total #{kiosk_slides.count} needed to be create\n"

    # ITERATE: Going through each slides and getting the infomation
    kiosk_slides.each do |i|
      # MAKE: Create underscore title to name the file
      title_slide = i.title.parameterize.underscore.to_s

      # CREATE: Create a directory
      create_directory(title_slide, counter)

      # PATH: Setup a path for the txt file & media file
      path = "./slides_archive/#{title_slide}/#{title_slide}.txt"
      file_path = "./slides_archive/#{title_slide}/"

      # MESSAGE: Make a message about putting info into folder
      puts "Putting info into the directory for slide no. #{counter}..."

      # NEW FILE: Create a new file with the title in its name & put info in it
      # rubocop:disable Style/BlockDelimiters
      File.open(path, 'w+') { |f|
        f.write("SLIDE INFO\n")
        f.write("Title: #{i.title}\n")
        f.write("Caption: #{i.caption}\n")
        f.write("ID: #{i.id}\n")
        f.write("Created Timestamp: #{i.created_at}\n")
        f.write("Updated Timestamp: #{i.updated_at}\n")

        # CHECK: Check to see if file has image or video format and make a copy of it
        if i.image.present?
          f.write("Image File Path: #{i.image}")
          FileUtils.cp("./public#{i.image}", file_path)
        elsif i.video.present?
          f.write("Video File Path: #{i.video}")
          FileUtils.cp("./public#{i.video}", file_path)
        else
          f.write('File Path: N/A')
        end
      }
      # rubocop:enable Style/BlockDelimiters

      # MESSAGE: Write a done message and increase counter
      puts "DONE ✓ (Putting info into slide no. #{counter})\n\n"
      counter += 1
    end

    # MESSAGE: Tell user all done with process
    puts 'ALL DONE ✓'
  end

  # METHOD: Create a directory to host nested directory for later
  def create_parent_directory
    puts 'Creating Main Directory...'
    # CREATE: Make a main directory to store in slides
    Dir.mkdir './slides_archive/' unless File.exist? './slides_archive/'
    puts 'DONE ✓\n'
  end

  # METHOD: Create a directory with the name of the slides
  def create_directory(name_slide, counter)
    puts 'Creating Nested Slide(s) Directory...'
    # NEW: Create a nested file with the name given
    Dir.mkdir "./slides_archive/#{name_slide}/" unless File.exist? "./slides_archive/#{name_slide}/"
    puts "DONE ✓ (Created No. #{counter} nested directory)"
  end
end

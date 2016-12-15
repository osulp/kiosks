# Require all of the api lib files.
Dir["#{Rails.root}/lib/api/**/*.rb"].each {|file| require file }

# frozen_string_literal: true

# Directory Model
class Directory < ApplicationRecord
  def self.import(file, directory_name)
    Directory.where(content: directory_name).each(&:destroy)
    CSV.foreach(file.path, headers: true) do |row|
      directory_hash = Directory.new
      directory_hash.content = directory_name
      directory_hash.name = row[0]
      directory_hash.title = row[1]
      directory_hash.phone_number = row[2] unless row[2].blank?
      directory_hash.save
    end
  end
end

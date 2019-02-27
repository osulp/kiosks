# frozen_string_literal: true

desc 'Create an admin user and roles for development environment'

task admin_user: :environment do |_t, _args|
  user = User.find_or_create_by(email: 'admin@example.org') do |u|
    u.password = 'admin123'
    u.password_confirmation = 'admin123'
  end

  user.admin = true
  user.save!
end

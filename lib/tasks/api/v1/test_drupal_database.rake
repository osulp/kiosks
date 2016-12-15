desc "setup test drupal database"
namespace :test_drupal_database do
  task :setup do
    ENV['RAILS_ENV']='test'
    ENV['SCHEMA']="#{Rails.root}/spec/fixtures/api/v1/drupal_schema.rb"
    Rake::Task['db:schema:load'].invoke
  end
end

require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Kiosks
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.time_zone = 'Pacific Time (US & Canada)'

    # load and inject local_env.yml key/values into ENV
    config.before_configuration do
      env_file = File.join(Rails.root, 'config', 'local_env.yml')
      YAML.load(File.open(env_file)).each do |key, value|
        ENV[key.to_s] = value
      end if File.exists?(env_file)
    end
    config.rubycas.cas_base_url = ENV['CAS_BASE_URL']

    # Any sqlite3 databases need to be modified for the booleans to work with Rails 5.2
    config.active_record.sqlite3.represent_boolean_as_integer = true
  end
end

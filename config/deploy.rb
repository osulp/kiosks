require 'yaml'
config = YAML.load_file('config/config.yml')["deployment"] || {}

# config valid only for current version of Capistrano
lock '3.6.1'

set :application, 'kiosks'
set :repo_url, config['repository']

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, config['deploy_to']

# Default value for :scm is :git
set :scm, :git

# The server must have rbenv installed and the version of ruby specified here.
set :rbenv_ruby, '2.3.3'

# The server must have nvm installed at the user level, and to have yarn installed globally as an npm package
# for the node version specified here.
set :nvm_type, :user
set :nvm_node, 'v6.9.1'
set :nvm_map_bins, %w{node npm yarn}

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: 'log/capistrano.log', color: :auto, truncate: :auto

# Default value for :pty is false
set :pty, true

# Default value for :linked_files is []
append :linked_files, 'config/application_config.yml.erb', 'config/secrets.yml', 'config/god.conf', 'config/config.yml'

# Default value for linked_dirs is []
append :linked_dirs, 'log', 'tmp', 'pids', 'sockets', 'public/assets', 'public/system', 'public/uploaded', 'node_modules', 'config/puma'

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 5

set :passenger_restart_with_touch, true

# frozen_string_literal: true

# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

# Action Cable uses EventMachine and requires eager loading of all classes
Rails.application.eager_load!

run Rails.application

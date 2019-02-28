# frozen_string_literal: true

module Api
  module V1
    # Base class for API related controllers
    class ApiController < ::ActionController::Base
      include Concerns::ErrorHandler
      include Concerns::VersionExpirationHandler

      respond_to :json
    end
  end
end

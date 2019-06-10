# frozen_string_literal: true

# Application controller base
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  if %w[production staging development].include? Rails.env
    def append_info_to_payload(payload)
      super(payload)
      Rack::Honeycomb.add_field(request.env, 'classname', self.class.name)
    end
  end
end

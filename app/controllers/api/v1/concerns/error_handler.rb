# frozen_string_literal: true

module Api
  module V1
    module Concerns
      # The general approach for handling errors raised by the API
      module ErrorHandler
        extend ActiveSupport::Concern

        included do
          rescue_from Api::V1::Exceptions::BadRequest, with: :bad_request
          rescue_from Api::V1::Exceptions::RecordNotFound, with: :not_found
          rescue_from ActiveRecord::RecordNotFound, with: :not_found
          rescue_from StandardError, with: :internal_server_error
        end

        def render_error(message, status)
          status_code = Rack::Utils::SYMBOL_TO_STATUS_CODE[status]
          render json: { error: { status: status_code, message: message } },
                 status: status
        end

        def internal_server_error(e)
          puts "Api::V1::Concerns::ErrorHandler caught internal_server_error: #{e.message}"
          render_error(I18n.t('api.errors.messages.internal_server_error'), :internal_server_error)
        end

        def not_found(e)
          puts "Api::V1::Concerns::ErrorHandler caught not_found error: #{e.message}"
          render_error(I18n.t('api.errors.messages.not_found'), :not_found)
        end

        def bad_request(e)
          puts "Api::V1::Concerns::ErrorHandler caught bad_request error: #{e.message}"
          render_error(I18n.t('api.errors.messages.bad_request'), :bad_request)
        end
      end
    end
  end
end

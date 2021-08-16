# frozen_string_literal: true

module Api
  module V1
    class Exceptions
      class BadRequest < RuntimeError
      end

      class RecordNotFound < RuntimeError
      end
    end
  end
end

module Api
  module V1
    class Exceptions
      class BadRequest < Exception
      end
      class RecordNotFound < Exception
      end
    end
  end
end

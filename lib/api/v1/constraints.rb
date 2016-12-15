module Api
  module V1
    # Constraints used in config/routes.rb, gives the ability to set version number and limit
    # routing based on elements of the request matching an HTTP Header : Accept:application/vnd.kiosks.v1 (for version 1)
    class Constraints
      def initialize(options)
        @version = options[:version]
        @default = options[:default]
      end

      def matches?(req)
        @default ||
          (req.respond_to?('headers') &&
            req.headers.key?('Accept') &&
            req.headers['Accept'].include?(
              "application/vnd.kiosks.v#{@version}"))
      end
    end
  end
end

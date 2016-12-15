require 'date'

module Api
  module V1
    module Concerns
      module VersionExpirationHandler
        extend ActiveSupport::Concern
        OK = 'OK'.freeze
        WARNED = 'WARNED'.freeze
        EXPIRED = 'EXPIRED'.freeze

        included do
          before_action :check_expiration!
        end

        ##
        # The controller handling this request is inheriting from an ApiController in a specific version module,
        # for instance Api::V1::ApiController. Determine this controllers api version by dissecting the version from the
        # module name.
        def api_version
          self.class.superclass.name.to_s.split('::').second.sub('V', '').to_i
        end

        ##
        # ENV['KIOSKS_API_LAST_EXPIRED_VERSION'] - the most recent API version that was expired
        # ENV['KIOSKS_API_LAST_WARNED_VERSION'] - the most recent API version that is being warned
        #
        # The controller handling this request has a specific version (ie. Api::V1::, API::V2::, etc) and it will
        # evaluate if it is a version that is still supported.
        #
        # The idea would be that as future versions of the API are developed, you can WARN and then EXPIRE them
        # as they are retired. For instance, when version 3 is released, version 2 could be WARNED and version 1 EXPIRED.
        def expiration_state
          @expired ||= APPLICATION_CONFIG['api']['last_expired_version']
          return EXPIRED if @expired > 0 && api_version <= @expired.to_i
          @warned ||= APPLICATION_CONFIG['api']['last_warned_version']
          return WARNED if @warned > 0 && api_version <= @warned.to_i
          OK
        end

        def check_expiration!
          render_error(I18n.t('api.version.expired'), :upgrade_required) unless supported_version?
        end

        def supported_version?
          expiration_state && expiration_state != EXPIRED
        end
      end
    end
  end
end

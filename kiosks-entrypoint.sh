#!/bin/sh

rm -f tmp/pids/server.pid

timestamp=`date +'%Y-%m-%d %H:%M:%S'`
echo "[$timestamp]: Starting kiosks initialization"
echo "  image: $IMAGE"
echo "  rails:"
echo "    env: $RAILS_ENV"
echo "    max threads: $RAILS_MAX_THREADS"
echo "    log to stdout: $RAILS_LOG_TO_STDOUT"
echo "    serve static files: $RAILS_SERVE_STATIC_FILES"
echo "  api uri: ${API_URI}${API_ROUTE}"
echo "  primo api uri: $PRIMO_API_URI"
echo "  redis uri: $KIOSKS_REDIS_URL"
echo "  honeycomb dataset: $HONEYCOMB_DATASET"
echo "  CAS:"
echo "    base url: $CAS_BASE_URL"
echo "    validate url: $CAS_VALIDATE_URL"
echo "  app database: "
echo "    $KIOSKS_DB_USERNAME@$KIOSKS_DB_HOST [$KIOSKS_DB_NAME]"
echo "  rooms database:"
echo "    $KIOSKS_ROOMRES_USERNAME@$KIOSKS_ROOMRES_HOST [$KIOSKS_ROOMRES_NAME]"

# Run database migrations
timestamp=`date +'%Y-%m-%d %H:%M:%S'`
echo "[$timestamp]: Running database migrations"
bundle exec rails db:migrate 

# Start rails
timestamp=`date +'%Y-%m-%d %H:%M:%S'`
echo "[$timestamp]: Starting Rails ($RAILS_ENV)"
bundle exec rails server -p 3000 -b 0.0.0.0 -e "${RAILS_ENV}"

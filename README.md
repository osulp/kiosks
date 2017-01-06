[![CircleCI](https://circleci.com/gh/osulp/kiosks.svg?style=svg)](https://circleci.com/gh/osulp/kiosks)
[![Coverage Status](https://coveralls.io/repos/github/osulp/kiosks/badge.svg?branch=master)](https://coveralls.io/github/osulp/kiosks?branch=master)

The application is built as a combination of traditional Ruby on Rails for the backend and frontend administration interfaces along with a React app for the kiosk displays.

# Dependencies
- Ruby 2.3.3
- NVM
- Yarn >= 0.17.10 (https://yarnpkg.com/en/docs/install)

# Server setup notes
- ** See example files located in `config/**/*` for the type of configurations needed on the server **
- `shared/config` : Contains server configuration files not appropriate for the repository, symlinked by the deploy process.
- `shared/config/application_config.yml.erb` : Application specific configuration, such as Google Analytics ID.
- `shared/config/local_env.yml` : Local ENV variables used in files such as database.yml.
- `shared/config/config.yml` : Application deployment configurations for server, path, and user detail.
- `shared/config/puma/*.rb` : Environment specific configurations for the Puma web server.
- `shared/config/secrets.yml` : Secrets.

# Application build notes
- Yarn is used in place of npm for its improved handling of node module dependencies. 
- Webpack is used for compiling the React app during development and deploying the app to production. 
- Webpack is configured to build the `dist-app.js` and place it in the assets directory for Rails Sprockets to include the app in the regular Rails asset pipeline. This decision was made to get a benefit from balancing the benefits of the Rails asset pipeline and using a better build tool (Webpack) for compiling a modern javascript app (React).

# Development workflow
Scripts found in `package.json` are designed to aid in typical development needs. All of the React app code is found in `app/assets/javascripts/react`. 
- **Install `node_modules`** : Run `yarn install` in the application root directory to install dependencies.
- `yarn run prod` : Used for active development of the React app in conjunction with an operational Rails backend (`rails s`). Webpack is watching for code changes and recompiling the `dist-app.js` found in `app/assets/javascripts`.
- `yarn run compile` : Production application deployment asset compilation. This should be run before Rails assets:compile in the deployment process.
### Load Drupal Development/Test database with seed data.
Run `bundle exec rake test_drupal_database:setup` to load the development database with some seed data for the "Hours" API.

# React app directory structure
App code is found in `app/assets/javascripts/react`.
Tests are run using [Jest](https://facebook.github.io/jest/) and are found in `spec/javascripts/react` with a directory
structure to match the app code.

- `main.js` : The primary entry point for the application.
- `actions/*` : Redux actions.
- `components/presentational/**/*` : Simple presentational components.
- `components/Root.js` : The React application root container that ties the Redux store to the component tree.
- `components/*` : Components which use Redux `connect` to connect the dispatch and state to props.
- `reducers/*` : Redux reducers.
- `store/configureStore.js` : Redux store creation with middleware.

# Rails API notes
- The API has versioning with the ability to `warn` and `expire` versions based on a configuration change in `app/config/application_config.yml.erb`.
- `app/controllers/api/v#` : Controllers and concerns.
- `app/models/api/v#` : Models.
- `config/initializers/api.rb` : Require all of the code in `lib/api/**/*`.
- `config/initializers/db_config.rb` : Load and parse the `config/database.yml`.
- `config/locales/en.yml` : Localized strings for api related messages.
- `config/routes.rb` : Contains namespaced routes and configuration for the api routes.
- `lib/api/v#` : API related code by version.
- `lib/tasks/api/v#` : Rake task(s), such as `test_drupal_database:setup`.
- Specs are located in similarly named paths related to the API and version directories.

## Making HTTP calls to the API
The API routes are protected by constraints described in `lib/api/v#/constraints.rb` which enforce the existence and setting
of the `ACCEPT` header on each request. An example of a valid HTTP ACCEPT header for version 1:
> `ACCEPT=application/vnd.kiosks.v1`

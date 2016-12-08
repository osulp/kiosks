[![CircleCI](https://circleci.com/gh/osulp/kiosks.svg?style=svg)](https://circleci.com/gh/osulp/kiosks)
[![Coverage Status](https://coveralls.io/repos/github/osulp/kiosks/badge.svg?branch=master)](https://coveralls.io/github/osulp/kiosks?branch=master)

The application is built as a combination of traditional Ruby on Rails for the backend and frontend administration interfaces along with a React app for the kiosk displays.

# Dependencies
- Ruby 2.3.3
- Yarn >= 0.17.10 (https://yarnpkg.com/en/docs/install)

# Server setup notes
- ** See example files located in `config/**/*` for the type of configurations needed on the server **
- `shared/config` : Contains server configuration files not appropriate for the repository, symlinked by the deploy process.
- `shared/config/application_config.yml.erb` : Application specific configuration, such as Google Analytics ID.
- `shared/config/config.yml` : Application deployment configurations for server, path, and user detail.
- `shared/config/god.conf` : Start, stop and restart behaviors for God process management.
- `shared/config/puma/*.rb` : Environment specific configurations for the Puma web server.
- `shared/config/secrets.yml` : Secrets.

# Application build notes
- Yarn is used in place of npm for its improved handling of node module dependencies. 
- Webpack is used for compiling the React app during development and deploying the app to production. 
- Webpack is configured to build the `dist-app.js` and place it in the assets directory for Rails Sprockets to include the app in the regular Rails asset pipeline. This decision was made to get a benefit from balancing the benefits of the Rails asset pipeline and using a better build tool (Webpack) for compiling a modern javascript app (React).

# Development workflow
Scripts found in `package.json` are designed to aid in typical development needs. All of the React app code is found in `app/assets/javascripts/components`. 
- **Install `node_modules`** : Run `yarn install` in the application root directory to install dependencies.
- `yarn run prod` : Used for active development of the React app in conjunction with an operational Rails backend (`rails s`). Webpack is watching for code changes and recompiling the `dist-app.js` found in `app/assets/javascripts`.
- `yarn run compile` : Production application deployment asset compilation. This should be run before Rails assets:compile in the deployment process.

# React app structure
App code is found in `app/assets/javascripts/components`.

- `main.js` : The primary entry point for the application.
- `actions/*` : Redux actions.
- `components/*` : React components. 
- `containers/Root.js` : The React application root container that ties the Redux store to the component tree.
- `containers/*` : Container components for different types of Kiosks.
- `reducers/*` : Redux reducers.
- `store/configureStore.js` : Redux store creation with middleware.

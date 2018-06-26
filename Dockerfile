FROM ruby:2.5.1
RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev mysql-client && \
    rm -rf /var/lib/apt/lists/*
# Necessary for bundler to properly install some gems
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
RUN mkdir /data
WORKDIR /data
ADD Gemfile /data/Gemfile
ADD Gemfile.lock /data/Gemfile.lock
#ADD /config/local_env.example.yml /data/config/local_env.yml
#ADD /config/application_config.example.yml /data/config/application_config.yml
#ADD /config/config.example.yml /data/config.yml
#RUN curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
#RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
RUN apt-get update && apt-get install -y yarn
RUN gem install bundler
RUN bundle install
RUN yarn
ADD . /data
#RUN bundle exec rake assets:precompile
EXPOSE 3000
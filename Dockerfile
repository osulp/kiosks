FROM ruby:2.7-alpine3.13

# add nodejs and yarn dependencies for the frontend
#RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
#  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
#  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# Necessary for bundler to properly install some gems
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
RUN gem install bundler:1.17.3

RUN apk --no-cache update && apk --no-cache upgrade && \
  apk add --no-cache alpine-sdk nodejs-current unzip vim yarn \
  git sqlite sqlite-dev mysql mysql-client mysql-dev \
  curl build-base tzdata zip shared-mime-info imagemagick6 graphicsmagick \
  imagemagick6-dev graphicsmagick-dev bash bash-completion autoconf libtool \
  automake python2 libpng-dev


# Set the timezone to America/Los_Angeles (Pacific) then get rid of tzdata
RUN cp -f /usr/share/zoneinfo/America/Los_Angeles /etc/localtime && \
  echo 'America/Los_Angeles' > /etc/timezone

COPY kiosks-entrypoint.sh /kiosks-entrypoint.sh

RUN mkdir /data /kiosks && chmod 755 /data /kiosks /kiosks-entrypoint.sh
WORKDIR /data

ADD Gemfile /data/Gemfile
ADD Gemfile.lock /data/Gemfile.lock
RUN bundle install -j $(nproc)

ADD package.json /data/package.json
ADD yarn.lock /data/yarn.lock
RUN yarn install --ignore-engines

ADD . /data
RUN rm -f /data/*.sh /data/docker-compose.* && \
  rm -rf /data/public/assets && \
  rm -rf /data/public/images && \
  rm -rf /data/public/packs && \
  rm -rf /data/public/system && \
  rm -rf /data/public/uploaded && \
  rm -rf /data/public/uploads && \
  ln -sf /kiosks/assets /data/public/assets && \
  ln -sf /kiosks/images /data/public/images && \
  ln -sf /kiosks/packs /data/public/packs && \
  ln -sf /kiosks/system /data/public/system && \
  ln -sf /kiosks/uploaded /data/public/uploaded && \
  ln -sf /kiosks/uploads /data/public/uploads
EXPOSE 3000
CMD ["/kiosks-entrypoint.sh"]

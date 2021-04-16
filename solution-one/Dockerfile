# base image
FROM node:14

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN yarn

# start app
RUN yarn build
EXPOSE 3001
CMD yarn start -p 3001
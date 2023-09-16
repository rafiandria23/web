FROM node:20-alpine AS build

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev && rm -rf /var/cache/apk/* > /dev/null 2>&1
WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./ ./
ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH
RUN yarn global add node-gyp
RUN yarn install --frozen-lockfile --ignore-engines
RUN yarn build

# Installing libvips-dev for sharp Compatibility
RUN apk add vips-dev
RUN rm -rf /var/cache/apk/*
ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 1337
CMD ["yarn", "start"]

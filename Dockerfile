FROM node:18-alpine AS build
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev && rm -rf /var/cache/apk/* > /dev/null 2>&1
ENV NODE_ENV production
WORKDIR /app
COPY ./package.json ./package-lock.json ./
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install
WORKDIR /app
COPY ./ .
RUN npm run build


FROM node:18-alpine
# Installing libvips-dev for sharp Compatibility
RUN apk add vips-dev
RUN rm -rf /var/cache/apk/*
ENV NODE_ENV production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
ENV PATH /app/node_modules/.bin:$PATH
COPY --from=build /app ./
EXPOSE 1337
CMD ["npm", "run", "start"]

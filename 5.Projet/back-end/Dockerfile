FROM node:14 as base

# Create app directory
WORKDIR /src
COPY package*.json /
EXPOSE 3000

# Bundle production app source
FROM base as production
ENV NODE_ENV=production
ENV DROP_DB=true
RUN npm ci
COPY . /
CMD ["node", "bin/www"]

# Bundle dev app source
FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /
CMD ["nodemon", "bin/www"]

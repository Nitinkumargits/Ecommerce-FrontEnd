# Fetching the latest node image on alpine linux
FROM node:alpine 

# Setting up the work directory
WORKDIR /react-app

# Installing dependencies
COPY ./package*.json /react-app

RUN npm install

# Copy environment file generated in CI (contains REACT_APP_* variables)
COPY .env ./.env

# Copying all the files in our project
COPY . .

# Starting our application
CMD ["npm","start"]
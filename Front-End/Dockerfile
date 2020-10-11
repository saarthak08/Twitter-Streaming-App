FROM node:alpine

WORKDIR /twitter-streaming-app-frontend-dev
 
COPY . ./

# add `/app/node_modules/.bin` to $PATH
ENV PATH /twitter-streaming-app-frontend-dev/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

EXPOSE 3000

# start app
CMD ["npm", "start"]
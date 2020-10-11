FROM node:alpine as build

WORKDIR /twitter-streaming-app-frontend
 
COPY . ./

RUN npm install

RUN npm run build

# production environment
FROM nginx:stable-alpine

COPY --from=build /twitter-streaming-app-frontend/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
FROM node:alpine as build

WORKDIR /twitter-streaming-app-frontend
 
COPY . ./

RUN npm install

RUN npm run build

# production environment
FROM nginx:stable-alpine

COPY --from=build /twitter-streaming-app-frontend/build /usr/share/nginx/html

COPY nginx-config/nginx.conf /nginx.conf.template

CMD gunicorn --bind 0.0.0.0:$PORT wsgi

CMD ["/bin/sh" , "-c" , "envsubst '$PORT' < /nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
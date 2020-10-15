# Twitter-Streaming-App
A web app for streaming realtime tweets from twitter & searching recent tweets filtered by different categories.


## Features
- Search recent tweets from last 7 days by keywords, hashtags, username & time.
- Stream realtime tweets & filter them by different categories with built in pagination (infinite scrolling) support.
- Save tweets in database for offline purposes.

## Tech Stack:
- Front-End: React.js, React-Bootstrap, Material-UI
- Back-End: Spring Boot, Spring Data JPA
- Database: MySQL
- Docker for Deployment purposes.
- JUnit & Mockito for testing purposes.

## Setup:
- Replace the string `"YOUR_OWN_BEARER_TOKEN"` with your own Twitter Bearer Token on `Line No: 4` in `Keys.java` file in `/Twitter-Streaming-App/Back-End/src/main/java/com/sg/twitterstreaming/config/` directory.

- In order to run the whole project via docker in `development` environment, run `docker-compose up` in the root directory `(i.e. /Twitter-Streaming-App/)` of the project.
- In order to run the whole project via docker in `production` environment, run `docker-compose -f docker-compose.production.yml up` in the root directory of the project.

- In order to run the `unit tests` of the Spring Boot backend, run `mvn test` in the Back-End directory.
- In order to run the `integration tests` of the Spring Boot backend, run `mvn failsafe:integration-test` in the Back-End directory.
- `mvn integration-test` command runs both units tests as well as integration tests.

- Without docker, in order to run the front-end, follow the given steps:
- - Navigate to Front-End directory.
- - Run `npm install` in the Front-End directory.
- - For development purposes, run `npm start`. 
- - For production purposes, run `npm build`.

## Note: 
- Default port for backend is `8080`.
- Default port for frontend is `3000`.

# build backend
FROM maven:3-jdk-8-alpine AS backend
WORKDIR /backend/
COPY backend/ ./
RUN mvn package

# build frontend
FROM node:lts-alpine AS frontend
RUN apk add --no-cache yarn
WORKDIR /frontend/
COPY frontend/ ./
RUN yarn && yarn build

# build runnable container and copy prebuilt assets
FROM openjdk:8-jre-alpine AS final
COPY --from=backend /backend/target/flapwithfriends*.jar ./backend/target/flapwithfriends.jar
COPY --from=frontend /frontend/public/ ./frontend/public/
EXPOSE 8080
CMD [ "java", "-jar", "./backend/target/flapwithfriends.jar" ]
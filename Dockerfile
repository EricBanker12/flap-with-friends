# build backend - cachable
FROM maven:3-jdk-8-alpine AS backend
WORKDIR /backend/
COPY backend/ ./
RUN mvn package

# build frontend - cachable
FROM node:lts-alpine AS frontend
WORKDIR /frontend/
COPY frontend/ ./
RUN npm install --no-package-lock && npm run build && npm cache clean --force && rm -rf node_modules

# build runnable container and copy prebuilt assets
FROM openjdk:8-jre-alpine AS release
ENV JAVA_OPTS="-Xmx300m -Xss512k"
EXPOSE 8080
COPY --from=backend /backend/target/flapwithfriends*.jar /backend/target/flapwithfriends.jar
COPY --from=frontend /frontend/public/ /frontend/public/
CMD java $JAVA_OPTS -jar /backend/target/flapwithfriends.jar
package com.flapwithfriends;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoReactiveAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoAutoConfiguration;

@SpringBootApplication(exclude = {
	MongoAutoConfiguration.class,
	MongoDataAutoConfiguration.class,
	EmbeddedMongoAutoConfiguration.class,
	MongoReactiveAutoConfiguration.class
})
public class FlapWithFriendsApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlapWithFriendsApplication.class, args);
	}

}

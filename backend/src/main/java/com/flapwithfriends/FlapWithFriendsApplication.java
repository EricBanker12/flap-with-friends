package com.flapwithfriends;

import java.net.URI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoReactiveAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RequestPredicate;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

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

	@Bean
	RouteLocator
	public RouterFunction<ServerResponse> routerFunction() {
		return RouterFunctions.route(
			RequestPredicates.GET("/"),
			req -> ServerResponse.temporaryRedirect(URI.create("/index.html")).build()
		);
	}

}

package com.flapwithfriends.routers;

import com.flapwithfriends.handlers.ApiHandler;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class ApiRouter {

    @Bean
    public RouterFunction<ServerResponse> route(ApiHandler apiHandler) {
        return RouterFunctions.route(RequestPredicates.GET("/api"), apiHandler::api)
            .andRoute(RequestPredicates.GET("/api/status"), apiHandler::status)
            .andRoute(RequestPredicates.GET("/api/obstacles"), apiHandler::obstacles);
    }
    
}
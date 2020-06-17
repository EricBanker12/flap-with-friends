package com.flapwithfriends.handlers;

import com.flapwithfriends.services.ApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import reactor.core.publisher.Mono;

@Component
public class ApiHandler {

    @Autowired
    ApiService apiService;
    
    public Mono<ServerResponse> api(ServerRequest request) {
        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).bodyValue("{\"api\": true}");
    }

    public Mono<ServerResponse> status(ServerRequest request) {
        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).bodyValue(apiService.status());
    }

}
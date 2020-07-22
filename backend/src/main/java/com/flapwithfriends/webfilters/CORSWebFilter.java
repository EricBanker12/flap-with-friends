package com.flapwithfriends.webfilters;

import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;

// uncomment line #11 for local testing
// @Component
public class CORSWebFilter implements WebFilter {
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {

        exchange.getResponse().getHeaders().add("Access-Control-Allow-Origin", "http://localhost:8000");

        return chain.filter(exchange);
    }

}
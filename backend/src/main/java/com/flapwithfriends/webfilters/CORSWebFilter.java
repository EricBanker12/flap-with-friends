package com.flapwithfriends.webfilters;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;

@Component
public class CORSWebFilter implements WebFilter {
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        HttpHeaders headers = exchange.getResponse().getHeaders();
        // headers.add("Access-Control-Allow-Origin", "http://localhost:8000"); // uncomment for local development
        headers.add("Access-Control-Allow-Headers", "content-type");

        return chain.filter(exchange);
    }

}
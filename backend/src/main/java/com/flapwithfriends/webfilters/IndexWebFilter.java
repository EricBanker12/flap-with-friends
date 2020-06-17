package com.flapwithfriends.webfilters;

import java.util.regex.Pattern;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;

@Component
public class IndexWebFilter implements WebFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String path = exchange.getRequest().getPath().toString();

        // ignore /api
        if (Pattern.matches("/api|/api/.*", path)) {
            return chain.filter(exchange);
        }

        // rewrite anything ending in slash ".../" to ".../index.html"
        if (Pattern.matches("/|/.+/", path)) {
            ServerHttpRequest mutatedRequest = exchange.getRequest().mutate().path(path + "index.html").build();
            ServerWebExchange mutatedExchange = exchange.mutate().request(mutatedRequest).build();
            return chain.filter(mutatedExchange);
        }

        // if path is ".../fileName", not ".../fileName.fileType", rewrite path to ".../fileName/index.html"
        if (!Pattern.matches("/.*\\.\\w+$", path)) {
            ServerHttpRequest mutatedRequest = exchange.getRequest().mutate().path(path + "/index.html").build();
            ServerWebExchange mutatedExchange = exchange.mutate().request(mutatedRequest).build();
            return chain.filter(mutatedExchange);
        }

        return chain.filter(exchange);
    }

}
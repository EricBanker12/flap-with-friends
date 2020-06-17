package com.flapwithfriends.webfilters;

import java.util.regex.Pattern;

import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import reactor.core.publisher.Mono;

@Component
public class SvgzWebFilter implements WebFilter {
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String path = exchange.getRequest().getPath().toString();
        
        if (Pattern.matches("/.*\\.svgz", path)) {
            exchange.getResponse().getHeaders().add("Content-Encoding", "gzip");
        }

        return chain.filter(exchange);
    }

}
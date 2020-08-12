package com.flapwithfriends.services;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Mono;

@Service
public class ApiService {

    final static Runtime runtime = Runtime.getRuntime();

    final static long mb = 1024L * 1024L;

    public Mono<String> status() {
        long freeMem = runtime.freeMemory();
        long totalMem = runtime.totalMemory();
        long maxMem = runtime.maxMemory();

        Map<String, String> memory = new LinkedHashMap<>();
        memory.put("allocatedMemory", String.format("%d MB", totalMem / mb));
        memory.put("freeMemory", String.format("%d MB", freeMem / mb));
        memory.put("unallocatedMemory", String.format("%d MB", (maxMem - totalMem) / mb));
        memory.put("totalMemory", String.format("%d MB", maxMem / mb));

        return Mono.just(new JSONObject(memory).toString());
    }

}
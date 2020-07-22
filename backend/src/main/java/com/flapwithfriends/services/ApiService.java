package com.flapwithfriends.services;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class ApiService {

    final static Runtime runtime = Runtime.getRuntime();

    final static long mb = 1024L * 1024L;

    public String status() {
        long freeMem = runtime.freeMemory();
        long totalMem = runtime.totalMemory();
        long maxMem = runtime.maxMemory();

        Map<String, String> memory = new LinkedHashMap<>();
        memory.put("allocatedMemory", String.format("%d MB", totalMem / mb));
        memory.put("freeMemory", String.format("%d MB", freeMem / mb));
        memory.put("unallocatedMemory", String.format("%d MB", (maxMem - totalMem) / mb));
        memory.put("totalMemory", String.format("%d MB", maxMem / mb));

        return new JSONObject(memory).toString();
    }

    public String obstacles() {
        Map<String, int[]> obstaclesMap = new LinkedHashMap<>();

        int[] obstaclesArr = new int[32];
        for (int i = 0; i < obstaclesArr.length; i++) {
            double randVal = Math.random() * 198.0;
            obstaclesArr[i] = 80 + (int) randVal;
        }
        obstaclesMap.put("obstacles", obstaclesArr);

        return new JSONObject(obstaclesMap).toString();
    }

}
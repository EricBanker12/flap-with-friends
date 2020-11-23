package com.flapwithfriends.models;

import java.security.SecureRandom;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

@Document(value = "games")
@Data
@AllArgsConstructor
public class Game {
    
    @Id
    private String id;

    @CreatedDate
    private Date created;

    private Set<String> players;
    private int[] obstacles;

    private static class Holder {
        static final SecureRandom numberGenerator = new SecureRandom();
    }

    public static String generateRandomId() {
        String id = "";
        // base29 - modified Crockford's Base32 (added U, removed B,G,S,Z due to similarity to 8,6,5,2)
        char[] base = "0123456789ACDEFHJKMNPQRTUVWXY".toCharArray();
        byte[] bytes = new byte[9];
        Holder.numberGenerator.nextBytes(bytes);
        for (int i = 1; i < bytes.length; i++) {
            int offset = bytes[i-1];
            int randByte = bytes[i];
            // add hyphen for readability
            if (i == (bytes.length + 1) / 2) {
                id += '-';
            }
            id += base[(randByte + offset + 256) % base.length];
        }
        return id;
    }

    public Game() {
        this.id = generateRandomId();
        this.players = new HashSet<String>();
        this.obstacles = new int[30];
        for (int i = 0; i < this.obstacles.length; i++) {
            double randVal = Math.random() * 206.0;
            this.obstacles[i] = 80 + (int) randVal;
        }
        this.created = new Date();
    }

    public void join(String peer) {
        if (this.players.size() >= 10) {
            throw new Error("This game's lobby is already full!");
        }
        this.players.add(peer);
    }

}

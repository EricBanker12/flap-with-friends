package com.flapwithfriends.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

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

    public Game() {
        this.id = UUID.randomUUID().toString();
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

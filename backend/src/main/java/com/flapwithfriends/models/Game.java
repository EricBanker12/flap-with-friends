package com.flapwithfriends.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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

    private List<String> players;
    private int[] obstacles;
    

    public Game() {
        this.id = UUID.randomUUID().toString();
        this.players = new ArrayList<>();
        this.obstacles = new int[32];
        for (int i = 0; i < this.obstacles.length; i++) {
            double randVal = Math.random() * 206.0;
            this.obstacles[i] = 80 + (int) randVal;
        }
        this.created = new Date();
    }

}

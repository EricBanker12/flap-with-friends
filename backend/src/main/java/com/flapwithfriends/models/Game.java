package com.flapwithfriends.models;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(value = "games")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Game {
    
    @Id
    private String id;
    
    private List<String> players;

    private List<Integer> obstacles;
    
    private Date created;
}

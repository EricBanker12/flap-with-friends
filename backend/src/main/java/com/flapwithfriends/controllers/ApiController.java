package com.flapwithfriends.controllers;

import com.flapwithfriends.models.Game;
import com.flapwithfriends.repositories.GameRepository;
import com.flapwithfriends.services.ApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import reactor.core.publisher.Mono;

@Controller
@RequestMapping(path = "/api")
public class ApiController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private ApiService apiService;

    @GetMapping
    public @ResponseBody Mono<String> status() {
        return apiService.status();
    }

    @GetMapping(path = "/new")
    public @ResponseBody Mono<Game> newGame() {
        // ToDo: delete games older than 8 hours

        Game game = new Game();
        return gameRepository.save(game);
    }

    @GetMapping(path = "/join/{id}")
    public @ResponseBody Mono<Game> joinGame(@PathVariable String id) {
        return gameRepository.findById(id);
    }

}
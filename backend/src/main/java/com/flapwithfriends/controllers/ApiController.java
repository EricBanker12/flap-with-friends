package com.flapwithfriends.controllers;

import java.util.Date;
import java.util.function.Predicate;

import com.flapwithfriends.dto.Peer;
import com.flapwithfriends.models.Game;
import com.flapwithfriends.repositories.GameRepository;
import com.flapwithfriends.services.ApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    /**
     * Create a new game instance
     * @param peer - JSON request body containing peer id
     * @return
     */
    @PostMapping(path = "/new")
    public @ResponseBody Mono<Game> newGame(@RequestBody Peer peer) {
        // delete old games
        Predicate<Game> isOld = new Predicate<Game>(){
            @Override
            public boolean test(Game game) {
                return game.getCreated().getTime() < new Date().getTime() - 4L*60L*60L*1000L; // more than 4 hours old
            }
        };
        gameRepository.deleteAll(gameRepository.findAll().filter(isOld));

        // create new game
        Game game = new Game();
        game.join(peer.getId());
        return gameRepository.save(game);
    }

    /**
     * Join a game with given game id and peer id
     * @param id - game id given as a path variable
     * @param peer - JSON request body containing peer id
     * @return
     */
    @PostMapping(path = "/join/{id}")
    public @ResponseBody Mono<Game> joinGame(@PathVariable String id, @RequestBody Peer peer) {
        Game game = gameRepository.findById(id).block();
        game.join(peer.getId());
        return gameRepository.save(game);
    }

}
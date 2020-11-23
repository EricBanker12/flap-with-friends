package com.flapwithfriends.controllers;

import java.util.Date;
import java.util.HashSet;
import java.util.function.Consumer;
import java.util.function.Predicate;

import com.flapwithfriends.dto.Peer;
import com.flapwithfriends.models.Game;
import com.flapwithfriends.repositories.GameRepository;
import com.flapwithfriends.services.ApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import reactor.core.publisher.Flux;
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

    // @GetMapping(path = "/database")
    // public @ResponseBody Flux<Game> database() {
    //     return gameRepository.findAll();
    // }

    // @DeleteMapping(path = "/delete")
    // public @ResponseBody Mono<Void> deleteAll() {
    //     return gameRepository.deleteAll();
    // }

    /**
     * Create a new game instance
     * @param peer - JSON request body containing peer id
     */
    @PostMapping(path = "/new", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Mono<Game> newGame(@RequestBody Mono<Peer> peerMono) {
        Game game = new Game();
        
        /** Function to filter for only old games */
        Predicate<Game> isOld = new Predicate<Game>(){
            @Override
            public boolean test(Game game) {
                return game.getCreated().getTime() < new Date().getTime() - 60L*60L*1000L; // more than 1 hour old
            }
        };
        
        /** Consumer to grab peer id from request body and join a game */
        Consumer<Peer> joinGame = new Consumer<Peer>(){
            @Override
            public void accept(Peer peer) {
                game.join(peer.getId());
            }
        };

        /** Consumer to generate new id on id collision */
        Consumer<Game> checkCollision = new Consumer<Game>(){
            @Override
            public void accept(Game g) {
                if (g != null && g.getId().equals(game.getId())) {
                    game.setId(Game.generateRandomId());
                    throw new Error("id collision");
                }
            }
        };

        return gameRepository.deleteAll(gameRepository.findAll().filter(isOld))
            .then(gameRepository.findById(game.getId()).doOnSuccess(checkCollision).retry())
            .then(peerMono.doOnSuccess(joinGame))
            .then(gameRepository.save(game));
    }

    /**
     * Join a game with given game id and peer id
     * @param id - game id given as a path variable
     * @param peer - JSON request body containing peer id
     */
    @PostMapping(path = "/join/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Mono<Game> joinGame(@PathVariable String id, @RequestBody Mono<Peer> peerMono) {
        Game game = new Game("", new Date(0L), new HashSet<String>(), new int[30]);

        Mono<Game> gameMono = gameRepository.findById(id);

        /**
         * Consumer to grab game by id
         */
        Consumer<Game> getGame = new Consumer<Game>(){
            @Override
            public void accept(Game g) {
                game.setId(g.getId());
                game.setCreated(g.getCreated());
                game.setPlayers(g.getPlayers());
                game.setObstacles(g.getObstacles());
            }
        };
        
        /**
         * Consumer to grab peer id from request body and join a game
         */
        Consumer<Peer> joinGame = new Consumer<Peer>(){
            @Override
            public void accept(Peer peer) {
                game.join(peer.getId());
            }
        };

        return gameMono.doOnSuccess(getGame).then(peerMono.doOnSuccess(joinGame).then(gameRepository.save(game)));
    }

}
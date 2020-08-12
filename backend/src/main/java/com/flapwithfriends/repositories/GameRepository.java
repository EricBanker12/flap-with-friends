package com.flapwithfriends.repositories;

import java.util.UUID;

import com.flapwithfriends.models.Game;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface GameRepository extends ReactiveMongoRepository<Game, String> {}

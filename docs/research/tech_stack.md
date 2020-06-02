# Tech Stack

# Front-End

### React
```diff
+ simplifies single page applications
+ javascript is already required for gameplay
```

### Gatsby
```diff
+ supports static generation for SEO and speed
+ plugins simplify SEO and PWA configurations
- poor scaling, but we only need 2 pages, so this is a non-issue
```

### PeerJS
```diff
+ simplifies p2p WebRTC
+ multiple data channels (game, text, voice)
+ p2p reduces backend calls
+ supports reliable (tcp) and unreliable (udp) connection
- cheating is easier (can still anti-cheat using peers)
- un/reliable applies to entire connection, not per channel
```

### PIXI.js
```diff
+ fastest WebGL
+ canvas backup if device incompatible
- not a game engine (no sound, physics, keyboard/controller input)
```

# Back-End

### Java
```diff
+ strongly typed
+ faster compute (vs node.js)
- more boiler plate
- slower server startup
```

### Spring Boot
```diff
+ simplifies web io
```

### JUnit
```diff
+ unit testing services
+ mockito for dependencies
```
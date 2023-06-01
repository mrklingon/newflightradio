function doMissle () {
    missle = game.createSprite(ship.get(LedSpriteProperty.X), ship.get(LedSpriteProperty.Y))
    music.play(music.tonePlayable(131, music.beat(BeatFraction.Eighth)), music.PlaybackMode.InBackground)
    missle.set(LedSpriteProperty.Brightness, 120)
    missle.set(LedSpriteProperty.Direction, ship.get(LedSpriteProperty.Direction))
    mrun = true
    for (let index = 0; index < 4; index++) {
        missle.move(1)
        if (missle.isTouchingEdge()) {
            missle.turn(Direction.Right, 45)
        }
        missle.ifOnEdgeBounce()
        basic.pause(25)
    }
    missle.delete()
    mrun = false
}
input.onButtonPressed(Button.A, function () {
    ship.turn(Direction.Left, 7)
})
input.onButtonPressed(Button.B, function () {
    doMissle()
})
let running = false
let asteroid: game.LedSprite = null
let ay = 0
let mrun = false
let missle: game.LedSprite = null
let ship: game.LedSprite = null
ship = game.createSprite(2, 2)
ship.turn(Direction.Right, randint(30, 70))
game.setLife(5)
radio.setGroup(23)
basic.forever(function () {
    ship.move(1)
    ship.ifOnEdgeBounce()
    basic.pause(100)
})
basic.forever(function () {
    ay = randint(0, 4)
    asteroid = game.createSprite(0, ay)
    asteroid.set(LedSpriteProperty.Brightness, 25)
    running = true
    while (running) {
        asteroid.move(1)
        asteroid.ifOnEdgeBounce()
        basic.pause(500)
        if (asteroid.get(LedSpriteProperty.X) == ship.get(LedSpriteProperty.X) && asteroid.get(LedSpriteProperty.Y) == ship.get(LedSpriteProperty.Y)) {
            game.removeLife(1)
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
            asteroid.delete()
            radio.sendString("boom")
            running = false
        }
        if (mrun) {
            if (asteroid.get(LedSpriteProperty.X) == missle.get(LedSpriteProperty.X) && asteroid.get(LedSpriteProperty.Y) == missle.get(LedSpriteProperty.Y)) {
                radio.sendString("hit")
                game.addScore(randint(1, 10))
                asteroid.delete()
                running = false
            }
        }
    }
})

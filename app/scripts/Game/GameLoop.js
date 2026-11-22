export default async function GameLoop(Game) {
    if (!Game.playerData) Game.playerData = JSON.parse(JSON.stringify(Game.defaultPlayerData))

    if (Game.gameStage == 'game') {
        if (!Game.neuralMode) Game.movePlayer()
        Game.moveObstacles()
        Game.spawnObstacles()
        if (!Game.neuralMode) Game.checkPlayerCollision()
        if (Game.neuralMode) Game.neuralSystem()
    }

    setTimeout(() => GameLoop(Game), 1000/30)
}
export class GameClass {
    constructor() {
        this.gameStage = 'menu'

        this.animations = require('./addAnimations.js').default(this)

        this.sounds = require('./addSounds.js').default(this)
        this.images = require('./addImages.js').default(this)

        this.gameStyle = 'nyan'

        this.score = 0
        this.highestScore = 0
        this.generation = 0
        this.oldGeneration = 0
        this.inReset = false

        this.obstaclesDefaultSpeed = 800
        this.obstaclesSpeed = 800
        this.obstaclesSpeedGrowth = 0.5
        this.timeToSpawnObstacle = 2000
        this.lastObstacleSpawnedTime = 0

        this.defaultPlayerData = {
            size: 50,
            widthPercent: 20,
            heightPercent: 50,
            velocityY: 0,
            gravity: 0.8,
            jumpForce: -5,
            lastTime: +new Date()
        }

        this.obstacles = []

        this.loading = {
            total: 0,
            loaded: 0,
            msg: '',
            loadComplete: false
        }

        this.neuralMode = false
        this.individuals = {}
        this.numberOfIndividuals = 500

        require('./Loading.js').default(this)

        this.PlaySong = (...event) => require('./PlaySong.js').default(this, ...event)
        this.movePlayer = (event) => require('./movePlayer.js').default(this, event)
        this.moveObstacles = (event) => require('./moveObstacles.js').default(this, event)
        this.spawnObstacles = (event) => require('./spawnObstacles.js').default(this, event)
        this.checkPlayerCollision = (event) => require('./checkPlayerCollision.js').default(this, event)
        this.neuralSystem = (event) => require('./neuralSystem.js').default(this, event)
        this.GameLoop = require('./GameLoop.js').default(this)
        this.AnimationSystem = require('./AnimationSystem.js').default(this)
        this.startGame = (...event) => require('./startGame.js').default(this, ...event)
    }
}
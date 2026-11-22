export default async (Game) => {
    for (let i = 0;i < Game.numberOfIndividuals;i++) {
        let individual = Game.individuals[i]
        if (!individual) {
            Game.individuals[i] = {
                id: i,
                oldObstacleID: null,
                score: 0,
                dead: false,
                size: 50,
                widthPercent: 10+Math.floor(Math.random()*10),
                heightPercent: 50,
                velocityY: 0,
                gravity: 0.8,
                lastTime: +new Date(),
                jumpForce: -5,
                jumpCount: 0,

                dataValue1: [
                    {
                        type: 'Distância',
                        value: null
                    },
                    {
                        type: 'Velocidade',
                        value: null
                    },
                    {
                        type: 'Altura',
                        value: null
                    },
                    {
                        type: 'Largura',
                        value: null
                    },
                    {
                        type: 'Altitude',
                        value: null
                    }
                ],
                dataValue2: {},
                dataValue3: {},
                data: [
                    [
                        Math.random()*2000-1000,
                        Math.random()*2000-1000,
                        Math.random()*2000-1000
                    ]
                ]
            }
        } else if (!individual.dead) {
            let dt = (+new Date() - individual.lastTime) / 100;
            individual.lastTime = +new Date();

            individual.velocityY += individual.gravity*dt;
            individual.heightPercent += -(individual.velocityY*dt);

            if (individual.heightPercent < 0) {
                individual.heightPercent = 0;
                individual.velocityY = 0;
            }

            let obstacle = Game.obstacles.filter(o => o.widthPercent+(o.size/Game.renderState.canvas.width*100) >= individual.widthPercent).sort((a, b) => a.X-b.X)[0]

            if (obstacle && individual.oldObstacleID != obstacle.id) {
                individual.oldObstacleID = obstacle.id
                individual.score += 1
            }

            if (obstacle) {
                let dataValue = 0

                for (let a in individual.data) {
                    if (!individual.dataValue3[a]) individual.dataValue3[a] = { type: null, value: 0 }

                    for (let b in individual.data[a]) {
                        individual.dataValue2[a+'-'+b] = individual.data[a][b]
                        if (b == 0) {
                            individual.dataValue1[b].value = individual.heightPercent
                            dataValue += individual.data[a][b]*individual.heightPercent
                        }
                        if (b == 1) {
                            individual.dataValue1[b].value = individual.widthPercent-obstacle.widthPercent
                            dataValue += individual.data[a][b]*(individual.widthPercent-obstacle.widthPercent)
                        }
                        if (b == 2) {
                            individual.dataValue1[b].value = obstacle.heightPercent
                            dataValue += individual.data[a][b]*obstacle.heightPercent
                        }
                        if (b == 3) {
                            individual.dataValue1[b].value = obstacle.gap
                            dataValue += individual.data[a][b]*obstacle.gap
                        }
                    }

                    individual.dataValue3[a].value = dataValue

                    if (a == 0 && dataValue > 0 && individual.velocityY > 0 && individual.heightPercent < 100) individual.velocityY = individual.jumpForce

                    if (
                        obstacle.widthPercent <= individual.widthPercent &&
                        obstacle.widthPercent+(obstacle.size/Game.renderState.canvas.width*100) >= individual.widthPercent-(individual.size/Game.renderState.canvas.width*100) &&
                        !(
                            individual.heightPercent <= obstacle.heightPercent+(obstacle.gap/Game.renderState.groundY*100) &&
                            individual.heightPercent >= obstacle.heightPercent-(obstacle.gap/Game.renderState.groundY*100)+(individual.size/Game.renderState.canvas.width*100)
                        )
                    ) {
                        individual.dead = true
                    }

                    if (individual.heightPercent <= 0) individual.dead = true
                }
            }
        } 
    }

    if ((Object.values(Game.individuals).filter(i => !i.dead)).length <= 0 && !Game.inReset) {
        Game.inReset = true
        Game.obstacles = []
        Game.highestScore = Game.score > Game.highestScore ? Game.score : Game.highestScore
        Game.score = 0
        Game.obstaclesSpeed = Game.obstaclesDefaultSpeed
        Game.generation += 1

        setTimeout(() => {
            //Game.generation += 1
            //Game.inReset = false
            let bestData = JSON.parse(JSON.stringify((Object.values(Game.individuals).sort((a, b) => b.score-a.score))[0].data))

            for (let i in Game.individuals) {
                let individual = Game.individuals[i]
                if (individual) {
                    individual.score = 0
                    individual.dead = false
                    individual.size = 50
                    individual.widthPercent = 10+Math.floor(Math.random()*10)
                    individual.heightPercent = 50
                    individual.velocityY = 0
                    individual.gravity = 0.8
                    individual.lastTime = +new Date()
                    individual.jumpForce = -5
                    individual.jumpCount = 0

                    for (let a in Game.individuals[i].data) {
                        for (let b in Game.individuals[i].data[a]) {
                            Game.individuals[i].data[a][b] = bestData[a][b]+(Number(i) >= 1 ? Math.random()*(2000*(Number(i)/Game.numberOfIndividuals))-(1000*(Number(i)/Game.numberOfIndividuals)) : 0)
                            Game.individuals[i].data[a][b] = Game.individuals[i].data[a][b] <= -1000 ? -1000 : Game.individuals[i].data[a][b] >= 1000 ? 1000 : Game.individuals[i].data[a][b]
                        }
                    }
                }
            }

            Game.individuals[0] = JSON.parse(JSON.stringify((Object.values(Game.individuals).sort((a, b) => b.score-a.score))[0]))
            Game.inReset = false
        }, 500)
    }
}
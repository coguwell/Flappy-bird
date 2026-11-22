export default async(Render, event) => {
    let individualImageData = Render.gameState.images[`imgs/birds/${Render.gameState.gameStyle}/bird.png`]

    let individuals = Object.values(Render.gameState.individuals).filter(i => !i.dead).sort((a, b) => b.score-a.score).slice(0, 501)

    for (let i in individuals) {
        let individual = individuals[i]

        if (individual && !individual.dead) {
            let individualX = Render.canvas.width*(individual.widthPercent/100)
            let individualY = (Render.groundY-(individual.size*1.5))*(1-individual.heightPercent/100)+individual.size

            let individualRotation = 0
            if (individual.velocityY < 0) 
                individualRotation = -(individual.velocityY/individual.jumpForce*45)
            if (individual.velocityY > (individual.jumpForce/2)*-1)
                individualRotation = (individual.velocityY-((individual.jumpForce/2)*-1))/individual.velocityY*90

            Render.ctx.save(); 
            Render.ctx.translate(individualX-individual.size/2, individualY);
            Render.ctx.rotate((individualRotation * Math.PI) / 180);
            
            Render.ctx.drawImage(
                individualImageData.image,
                individualImageData.animationConfig[individualImageData.animation.frame].x,
                individualImageData.animationConfig[individualImageData.animation.frame].y,
                individualImageData.animationConfig[individualImageData.animation.frame].width,
                individualImageData.animationConfig[individualImageData.animation.frame].height,
                -Math.floor(individual.size*(1.28))/2, -individual.size/2,
                Math.floor(individual.size*(1.28)),
                individual.size
            )
            
            Render.ctx.restore();
        }
    }
}
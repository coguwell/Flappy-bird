export default async(Render, event) => {
    Render.ctx.fillStyle = 'white'
    Render.ctx.font = `${Render.scale/50}px fbfont2, sans-serif`
    //Render.ctx.textAlign = 'right'

    Render.fillText({
        text: `Alive: §3${Object.values(Render.gameState.individuals).filter(i => !i.dead).length}/${Render.gameState.numberOfIndividuals}`,
        x: Render.canvas.width - Render.getTextWidth(`Alive: §c${Object.values(Render.gameState.individuals).filter(i => !i.dead).length}/${Render.gameState.numberOfIndividuals}`),
        y: 30,
        add: 2,
        style2: 'black',
        font: `${Render.scale/50}px fbfont2, sans-serif`
    })
    Render.fillText({
        text: `Highest Score: §${Render.gameState.highestScore <= Render.gameState.score ? '3' : 'c'}${Render.gameState.highestScore}`,
        x: Render.canvas.width - Render.getTextWidth(`Highest Score: §${Render.gameState.highestScore <= Render.gameState.score ? '3' : 'c'}${Render.gameState.highestScore}`),
        y: 60,
        add: 2,
        style2: 'black',
        font: `${Render.scale/50}px fbfont2, sans-serif`
    })
    Render.fillText({
        text: `Generation: §3${Render.gameState.generation}`,
        x: Render.canvas.width - Render.getTextWidth(`Generation: §3${Render.gameState.generation}`),
        y: 90,
        add: 2,
        style2: 'black',
        font: `${Render.scale/50}px fbfont2, sans-serif`
    })
    Render.fillText({
        text: `Speed: §3${Render.gameState.obstaclesSpeed.toFixed(2)}`,
        x: Render.canvas.width - Render.getTextWidth(`Speed: §3${Render.gameState.obstaclesSpeed.toFixed(2)}`),
        y: 120,
        add: 2,
        style2: 'black',
        font: `${Render.scale/50}px fbfont2, sans-serif`
    })


    Render.fillText({
        text: `neural Network`,
        x: Render.canvas.width - Render.getTextWidth(`neural Network`) - 10,
        y: 190,
        add: 2,
        style2: 'black',
        font: `${Render.scale/50}px fbfont2, sans-serif`
    })



    let bestIndividual = Object.values(Render.gameState.individuals).filter(i => !i.dead).sort((a, b) => b.score-a.score)[0]

    if (bestIndividual) {
        Render.ctx.lineWidth = 3

        let neuronSize = 10
        let neuralX = Render.canvas.width*0.88
        let neuralY = 170
        for (let i in bestIndividual.dataValue1) {
            neuralY += 250/(Object.values(bestIndividual.dataValue1).length+1)

            let nextNeuralY = 170
            for (let a in bestIndividual.dataValue2) {
                nextNeuralY += 250/(Object.keys(bestIndividual.dataValue2).length+1)

                Render.ctx.strokeStyle = bestIndividual.dataValue2[a] < 0 ? 'hsl(220, 0%, 10%)' : 'hsl(100, 100%, 50%)'
                Render.ctx.beginPath();
                Render.ctx.moveTo(neuralX+(neuronSize/2), neuralY+(neuronSize/2));
                Render.ctx.lineTo(Render.canvas.width*0.93+(neuronSize/2), nextNeuralY+(neuronSize/2));
                Render.ctx.stroke();
            }

            Render.ctx.fillStyle = '#ff0000'

            Render.ctx.beginPath();
            Render.ctx.arc(neuralX+(neuronSize/2), neuralY+(neuronSize/2), neuronSize, 0, 2 * Math.PI)
            Render.ctx.fill();
        }


        neuralY = 170
        neuralX = Render.canvas.width*0.93
        for (let i in bestIndividual.dataValue2) {
            neuralY += 250/(Object.values(bestIndividual.dataValue2).length+1)

            let nextNeuralY = 170
            for (let a in bestIndividual.dataValue3) {
                nextNeuralY += 250/(Object.keys(bestIndividual.dataValue3).length+1)
                
                Render.ctx.strokeStyle = bestIndividual.dataValue2[i] < 0 ? 'hsl(220, 0%, 10%)' : 'hsl(100, 100%, 50%)'
                Render.ctx.beginPath();
                Render.ctx.moveTo(neuralX+(neuronSize/2), neuralY+(neuronSize/2));
                Render.ctx.lineTo(Render.canvas.width*0.98+(neuronSize/2), nextNeuralY+(neuronSize/2));
                Render.ctx.stroke();
            }
            
            Render.ctx.fillStyle = bestIndividual.dataValue2[i] < 0 ? '#ff0000' :  'hsl(100, 100%, 50%)'

            Render.ctx.beginPath();
            Render.ctx.arc(neuralX+(neuronSize/2), neuralY+(neuronSize/2), neuronSize, 0, 2 * Math.PI)
            Render.ctx.fill();
            
        }

        neuralY = 170
        neuralX = Render.canvas.width*0.98
        for (let i in bestIndividual.dataValue3) {
            neuralY += 250/(Object.values(bestIndividual.dataValue3).length+1)
            
            Render.ctx.fillStyle = bestIndividual.dataValue3[i].value < 0 ? '#ff0000' :  'hsl(100, 100%, 50%)'
             
            Render.ctx.beginPath();
            Render.ctx.arc(neuralX+(neuronSize/2), neuralY+(neuronSize/2), neuronSize, 0, 2 * Math.PI)
            Render.ctx.fill();
            
        }
    }
    
    
/* 
    let neuronSize = 8
    let neuralX = canvas.width*0.75
    let neuralY = 0
    ctx.lineWidth = 1
    
    for (let i in bestIndividual.dataValue1) {
        neuralY += 250/(Object.values(bestIndividual.dataValue1).length+1)
        let nextNeuralY = 0

        for (let i in bestIndividual.dataValue2) {
            nextNeuralY += 250/(Object.keys(bestIndividual.dataValue2).length+1)

            ctx.strokeStyle = 'hsl(220, 0%, 10%)'
            ctx.beginPath();
            ctx.moveTo(neuralX+(neuronSize/2), neuralY+(neuronSize/2));
            ctx.lineTo(canvas.width*0.88+(neuronSize/2), nextNeuralY+(neuronSize/2));
            ctx.stroke();
        }

        ctx.fillStyle = 'hsl(220, 0%, 0%)'
        ctx.beginPath();
        ctx.arc(neuralX+(neuronSize/2), neuralY+(neuronSize/2), neuronSize, 0, 2 * Math.PI)
        ctx.fill();

        ctx.font = `bold 13px Arial`
        functions.fillText({
            text: `[${bestIndividual.dataValue1[i].type}] ${(bestIndividual.dataValue1[i].value || 0)?.toFixed(2)}`,
            x: neuralX-ctx.measureText(`[${bestIndividual.dataValue1[i].type}] ${(bestIndividual.dataValue1[i].value || 0)?.toFixed(2)}`).width-8,
            y: neuralY+8,
            add: 1
        })
    }

    neuralX = canvas.width*0.88
    neuralY = 0
    let neuronCount = 0
    for (let i in bestIndividual.dataValue2) {
        neuralY += 250/(Object.keys(bestIndividual.dataValue2).length+1)
        let neuronValue = bestIndividual.dataValue2[i]//?.toFixed(2)
        let nextNeuralY = 0
        neuronCount += 1

        ctx.strokeStyle = neuronValue <= 0 ? 'hsl(220, 0%, 10%)' : `hsl(${(Number(neuronCount)/Object.keys(bestIndividual.dataValue2).length)*360}, 100%, 50%)`
        ctx.fillStyle = neuronValue <= 0 ? 'hsl(220, 0%, 10%)' : `hsl(${(Number(neuronCount)/Object.keys(bestIndividual.dataValue2).length)*360}, 100%, 50%)`

        for (let a in bestIndividual.dataValue3) {
            nextNeuralY += 250/(Object.keys(bestIndividual.dataValue3).length+1)
            
            if (Number(a) == Number(i.split(`-`)[0])) {
                ctx.beginPath();
                ctx.moveTo(neuralX+(neuronSize/2), neuralY+(neuronSize/2));
                ctx.lineTo(canvas.width*0.93+(neuronSize/2), nextNeuralY+(neuronSize/2));
                ctx.stroke();
            }
        }
    } */
}
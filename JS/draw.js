function mainloop(layer){
    clear()
    background(150)
    switch(stage.scene){
        case 'main':
            graphics.main[0].background(0)
			for(let c=0,lc=1;c<lc;c++){
                for(let a=0,la=run.fore.length;a<la;a++){
                    for(let b=0,lb=run.fore[a].length;b<lb;b++){
                        run.fore[a][b].layer=graphics.main[c]
                        run.fore[a][b].display()
                    }
                }
                for(let a=0,la=run.info.length;a<la;a++){
                    for(let b=0,lb=run.info[a].length;b<lb;b++){
                        run.info[a][b].displayInfo()
                    }
                }
            }
            for(let a=0,la=game.players;a<la;a++){
                graphics.main[0].fill(255,display.anim)
                graphics.main[0].textSize(60)
                graphics.main[0].text('Wave '+display.cycle,entities.players[a].position.x,entities.players[a].position.y-100+100*display.anim)
            }
            graphics.main[0].fill(255)
            graphics.main[0].textSize(20)
            switch(game.level){
                case 0: case 1:
                    graphics.main[0].text('Weapons\nHere',graphics.main[0].width/2,graphics.main[0].height/3-40)
                break
                case 4:
                    graphics.main[0].text('Weapons\nHere',graphics.main[0].width/2,graphics.main[0].height/3)
                break
                case 5:
                    graphics.main[0].text('Weapons\nHere',150,graphics.main[0].height-320)
                break
            }
            if(display.anim>0){
                display.anim-=0.01
            }
            displayMain(graphics.main)
            for(let a=0,la=run.fore.length;a<la;a++){
                for(let b=0,lb=run.fore[a].length;b<lb;b++){
                    run.fore[a][b].update()
                    if(run.fore[a][b].remove){
                        run.fore[a].splice(b,1)
                        b--
                        lb--
                    }
                }
            }
        break
    }
    checkEnd()
    game.time++
}
function draw(){
    mainloop(graphics.main)
}
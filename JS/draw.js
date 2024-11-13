function mainloop(layer){
    clear()
    background(150)
    switch(stage.scene){
        case 'menu':
            for(let a=0,la=4;a<la;a++){
                for(let b=0,lb=8;b<lb;b++){
                    if(b==0&&menu.players==a+1||b==1&&menu.gaming==a+1){
                        fill(100,200,100)
                    }else{
                        fill(100)
                    }
                    rect(((a+0.5)/la*0.6+0.2)*width,80+b*80+(b>=2?80:0)+40,200,60,10)
                }
            }
            fill(0)
            for(let a=0,la=4;a<la;a++){
                for(let b=0,lb=8;b<lb;b++){
                    textSize(20)
                    text(b==0?`${a+1} Players`:b==1?`${a+1} Gaming`:`${types.mission[a+b*4-8].name}`,((a+0.5)/la*0.6+0.2)*width,80+b*80+(b>=2?80:0)+40)
                    if(b>=2){
                        textSize(15)
                        text(`${['Easy','Medium','Hard','Expert'][types.mission[a+b*4-8].difficulty]}`,((a+0.5)/la*0.6+0.2)*width-40,100+b*80+(b>=2?80:0)+40)
                        text(`${types.mission[a+b*4-8].wave.length} Waves`,((a+0.5)/la*0.6+0.2)*width+40,100+b*80+(b>=2?80:0)+40)
                    }
                }
            }
        break
        case 'main':
            graphics.main[0].background(0)
            graphics.main[0].image(graphics.pane[0],graphics.main[0].width/2,graphics.main[0].height/2)
            for(let a=0,la=run.fore.length;a<la;a++){
                for(let b=0,lb=run.fore[a].length;b<lb;b++){
                    let visible=false
                    let key=[]
                    for(let c=0,lc=game.players;c<lc;c++){
                        key.push(entities.players[c].weaponType==6||entities.players[c].weaponType==12?2:1)
                    }
                    let scaleKey=game.level==6?8:game.level==8?8:4
                    for(let c=0,lc=game.players;c<lc;c++){
                        if(
                            run.fore[a][b].position.x+run.fore[a][b].width>entities.players[c].position.x-graphics.main[0].width/scaleKey*key[c]*1.2&&
                            run.fore[a][b].position.x-run.fore[a][b].width<entities.players[c].position.x+graphics.main[0].width/scaleKey*key[c]*1.2&&
                            run.fore[a][b].position.y+run.fore[a][b].height>entities.players[c].position.y-graphics.main[0].height/scaleKey*key[c]*1.2&&
                            run.fore[a][b].position.y-run.fore[a][b].height<entities.players[c].position.y+graphics.main[0].height/scaleKey*key[c]*1.2
                        ){
                            visible=true
                        }
                    }
                    if(!run.fore[a][b].exploded&&visible){
                        run.fore[a][b].display()
                    }
                }
            }
            for(let a=0,la=run.info.length;a<la;a++){
                for(let b=0,lb=run.info[a].length;b<lb;b++){
                    run.info[a][b].displayInfo()
                }
            }
            for(let a=0,la=run.fore.length;a<la;a++){
                for(let b=0,lb=run.fore[a].length;b<lb;b++){
                    if(run.fore[a][b].exploded){
                        run.fore[a][b].display()
                    }
                }
            }
            graphics.main[0].noStroke()
            if(display.anim>0){
                for(let a=0,la=game.players;a<la;a++){
                    graphics.main[0].fill(255,display.anim)
                    graphics.main[0].textSize(60)
                    graphics.main[0].text('Wave '+display.cycle,entities.players[a].position.x,entities.players[a].position.y-100+100*display.anim)
                }
            }
            if(display.win>0){
                for(let a=0,la=game.players;a<la;a++){
                    graphics.main[0].fill(255,display.win)
                    graphics.main[0].textSize(60)
                    graphics.main[0].text('Battle Royale',entities.players[a].position.x,entities.players[a].position.y-100+100*display.win)
                }
            }
            graphics.main[0].fill(255)
            graphics.main[0].textSize(20)
            switch(game.level){
                case 0: case 1: case 2:
                    graphics.main[0].text('Weapons\nHere',graphics.main[0].width/2,graphics.main[0].height/3-40)
                break
                case 3:
                    graphics.main[0].text('Weapons\nHere',graphics.main[0].width/2-100,graphics.main[0].height/3-120)
                break
                case 4:
                    graphics.main[0].text('Weapons\nHere',graphics.main[0].width/2,graphics.main[0].height/3)
                break
                case 5:
                    graphics.main[0].text('Weapons\nHere',150,graphics.main[0].height-320)
                break
                case 6:
                    graphics.main[0].text('Weapons\nHere',graphics.main[0].width/2-150,450)
                break
                case 7:
                    graphics.main[0].text('Weapons\nHere',graphics.main[0].width/2,graphics.main[0].height/2+360)
                break
                case 8:
                    graphics.main[0].text('Weapons\nHere',graphics.main[0].width-150,graphics.main[0].height-420)
                break
            }
            if(display.anim>0){
                display.anim-=0.01
            }
            if(display.win>0){
                display.win-=0.01
            }
            graphics.main[0].image(graphics.pane[1],graphics.main[0].width/2,graphics.main[0].height/2)
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
            for(let a=0,la=run.update.length;a<la;a++){
                for(let b=0,lb=run.update[a].length;b<lb;b++){
                    run.update[a][b].update()
                    if(run.update[a][b].remove){
                        run.update[a].splice(b,1)
                        b--
                        lb--
                    }
                }
            }
            checkEnd(levels[game.level],graphics.main[0])
            if(game.past){
                runTransition(graphics.main[0])
            }
            inputs.tap=[[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]]
        break
    }
    game.time++
}
function draw(){
    mainloop(graphics.main)
}
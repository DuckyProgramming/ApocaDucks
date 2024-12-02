function mainloop(layer){
    clear()
    background(150)
    switch(stage.scene){
        case 'menu':
            for(let a=0,la=10;a<la;a++){
                for(let b=0,lb=a>=2?5:4;b<lb;b++){
                    if(a==0&&menu.players==b+1||a==1&&menu.gaming==b+1||a==2&&menu.level==[6,7,8,12,13][b]||a==3&&game[['classicRespawn','invis','pvp','randomizer','classicWeapon'][b]]){
                        fill(100,200,100)
                    }else{
                        fill(100)
                    }
                    rect(width/2+b*210-lb*105+105,80+a*70+(a>=2?20:0)+(a>=3?20:0)+(a>=4?20:0)+40,200,60,10)
                }
            }
            fill(0)
            for(let a=0,la=10;a<la;a++){
                for(let b=0,lb=a>=2?5:4;b<lb;b++){
                    textSize(20)
                    text(a==0?`${b+1} Players`:a==1?`${b+1} Gaming`:a==2?['Vietnam','Pacman','Normandy','UNIMPLEMENTED','UNIMPLEMENTED'][b]:a==3?['Auto-Respawn','Invisible','PvP','Random Players','Random Weapons'][b]:`${types.mission[a*5+b-20].name}`,width/2+b*210-lb*105+105,80+a*70+(a>=2?20:0)+(a>=3?20:0)+(a>=4?20:0)+40)
                    if(a>=4){
                        textSize(15)
                        text(`${['Easy','Medium','Hard','Expert','Unfair'][types.mission[a*5+b-20].difficulty]}`,width/2+b*210-lb*105+105-40,80+a*70+(a>=2?20:0)+(a>=3?20:0)+(a>=4?20:0)+60)
                        text(`${types.mission[a*5+b-20].wave.length} Wave${types.mission[a*5+b-20].wave.length!=1?`s`:``}`,width/2+b*210-lb*105+105+40,80+a*70+(a>=2?20:0)+(a>=3?20:0)+(a>=4?20:0)+60)
                    }
                }
            }
        break
        case 'main':
            let effective=[]
            let key=[]
            let bs=[]
            for(let c=0,lc=game.gaming;c<lc;c++){
                graphics.main[c].background(0)
                key.push(dev.sight?10:entities.players[c].parachute?4:entities.players[c].weaponType==6||entities.players[c].weaponType==12||entities.players[c].weaponType==92||entities.players[c].weaponType==93?2:1)
                key[c]*=0.8
                if(game.level==6){
                    key[c]*=0.625
                }
                bs.push([])
                effective.push([constrain(entities.players[c].position.x,graphics.main[c].width/2*key[c],game.edge[0]-graphics.main[c].width/2*key[c]),constrain(entities.players[c].position.y,graphics.main[c].height/2*key[c],game.edge[1]-graphics.main[c].height/2*key[c])])
            }
            for(let a=0,la=graphics.main.length;a<la;a++){
                if(game.level==6){
                    graphics.main[a].image(
                        graphics.pane[0],width/2,height/2,width,height,
                        effective[a][0]-graphics.main[a].width/2*key[a],effective[a][1]-graphics.main[a].height/2*key[a],graphics.main[a].width*key[a],graphics.main[a].height*key[a]
                    )
                }
                graphics.main[a].push()
                graphics.main[a].translate(graphics.main[a].width/2,graphics.main[a].height/2)
                graphics.main[a].scale(1/key[a])
                graphics.main[a].translate(-effective[a][0],-effective[a][1])
                if(display.anim>0){
                    graphics.main[a].fill(255,display.anim)
                    graphics.main[a].textSize(60)
                    graphics.main[a].text('Wave '+display.cycle,entities.players[a].position.x,entities.players[a].position.y-100+100*display.anim)
                }
                if(display.win>0){
                    graphics.main[a].fill(255,display.win)
                    graphics.main[a].textSize(60)
                    graphics.main[a].text('Battle Royale',entities.players[a].position.x,entities.players[a].position.y-100+100*display.win)
                }
                graphics.main[a].fill(255)
                graphics.main[a].textSize(20)
                switch(game.level){
                    case 0: case 1: case 2:
                        graphics.main[a].text('Weapons\nHere',game.edge[0]/2,game.edge[1]/3-40)
                    break
                    case 3:
                        graphics.main[a].text('Weapons\nHere',game.edge[0]/2-100,game.edge[1]/3-120)
                    break
                    case 4:
                        graphics.main[a].text('Weapons\nHere',game.edge[0]/2,game.edge[1]/3)
                    break
                    case 5:
                        graphics.main[a].text('Weapons\nHere',150,game.edge[1]-320)
                    break
                    case 6:
                        graphics.main[a].text('Weapons\nHere',game.edge[0]/2+1300,game.edge[1]-120)
                    break
                    case 7:
                        graphics.main[a].text('Weapons\nHere',game.edge[0]/2,game.edge[1]/2+360)
                    break
                    case 8:
                        graphics.main[a].text('Weapons\nHere',game.edge[0]-150,game.edge[1]-520)
                    break
                }
                if(display.anim>0){
                    display.anim-=0.01
                }
                if(display.win>0){
                    display.win-=0.01
                }
            }
            for(let c=0,lc=game.gaming;c<lc;c++){
                for(let a=0,la=run.fore.length;a<la;a++){
                    for(let b=0,lb=run.fore[a].length;b<lb;b++){
                        if(
                            run.fore[a][b].position.x+run.fore[a][b].width>effective[c][0]-graphics.main[c].width*key[c]*0.6&&
                            run.fore[a][b].position.x-run.fore[a][b].width<effective[c][0]+graphics.main[c].width*key[c]*0.6&&
                            run.fore[a][b].position.y+run.fore[a][b].height>effective[c][1]-graphics.main[c].height*key[c]*0.6&&
                            run.fore[a][b].position.y-run.fore[a][b].height<effective[c][1]+graphics.main[c].height*key[c]*0.6
                        ){
                            run.fore[a][b].display(graphics.main[c])
                            if(a==2){
                                bs[c].push(b)
                            }
                        }
                    }
                }
            }
            for(let a=0,la=bs.length;a<la;a++){
                for(let b=0,lb=bs[a].length;b<lb;b++){
                    run.fore[2][bs[a][b]].displayOver(graphics.main[a])
                }
            }
            for(let c=0,lc=game.gaming;c<lc;c++){
                for(let a=0,la=run.info.length;a<la;a++){
                    for(let b=0,lb=run.info[a].length;b<lb;b++){
                        if(
                            run.info[a][b].position.x+run.info[a][b].width>effective[c][0]-graphics.main[c].width*key[c]*0.6&&
                            run.info[a][b].position.x-run.info[a][b].width<effective[c][0]+graphics.main[c].width*key[c]*0.6&&
                            run.info[a][b].position.y+run.info[a][b].height>effective[c][1]-graphics.main[c].height*key[c]*0.6&&
                            run.info[a][b].position.y-run.info[a][b].height<effective[c][1]+graphics.main[c].height*key[c]*0.6
                        ){
                            run.info[a][b].displayInfo(graphics.main[c])
                        }
                    }
                }
            }
            for(let a=0,la=graphics.main.length;a<la;a++){
                graphics.main[a].pop()
            }
            if(display.anim>0){
                display.anim-=0.01
            }
            if(display.win>0){
                display.win-=0.01
            }
            displayMain(graphics.main)
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
            inputs.tap=[[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]]
        break
    }
    game.time++
}
function draw(){
    mainloop(graphics.main)
}
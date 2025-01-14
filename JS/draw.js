function mainloop(layer){
    clear()
    background(150)
    switch(stage.scene){
        case 'menu':
            for(let a=0,la=7;a<la;a++){
                for(let b=0,lb=[4,4,4,4,4,4,1][a];b<lb;b++){
                    let pos=[width/2+b*170-lb*85+85,60+a*55+40+(a>=2?15:0)+(a>=4?15:0)+(a>=6?15:0)]
                    if(a==2&&b>=2&&b<=3){
                        fill(100)
                        if(a==2&&menu.level==[6,7,8,15,16,][b]){
                            rect(pos[0]+37,pos[1],76,45,10)
                            fill(100,200,100)
                            rect(pos[0]-37,pos[1],76,45,10)
                        }else if(a==2&&menu.level==[6,7,17,18,16,][b]){
                            rect(pos[0]-37,pos[1],76,45,10)
                            fill(100,200,100)
                            rect(pos[0]+37,pos[1],76,45,10)
                        }else{
                            rect(pos[0]+37,pos[1],76,45,10)
                            rect(pos[0]-37,pos[1],76,45,10)
                        }
                    }else{
                        if(a==0&&menu.players==b+1||a==1&&menu.gaming==b+1||a==2&&menu.level==[6,7,8,15][b]||a==3&&menu.level==[16,19,20,21][b]||a==4&&menu.weapon==b||a==4&&b>=1&&b<=2&&menu.weapon==4||a==5&&game[['classicRespawn','invis','pvp','attacker'][b]]){
                            fill(100,200,100)
                        }else{
                            fill(100)
                        }
                        rect(pos[0],pos[1],150,45,10)
                    }
                    fill(0)
                    textSize(15)
                    text(
                        [
                            `${b+1} Players`,
                            `${b+1} Gaming`,
                            ['Vietnam','Pacman','Normandy','Isonzo'][b],
                            ['Stalingrad','DoubleMountain','Prison','Steep'][b],
                            ['Normal Weapons','Special Weapons','Random Weapons','Full Randomizer'][b],
                            ['Auto-Respawn','Invisible','PvP','Fortress'][b],
                            `Proceed`
                        ][a],pos[0],pos[1]
                    )
                    if(a==2&&b>=2&&b<=3){
                        textSize(11.25)
                        text(`Standard`,pos[0]-37,pos[1]+15)
                        text(`Reverse`,pos[0]+37,pos[1]+15)
                    }
                }
            }
        break
        case 'mission':
            let tick=0
            for(let a=0,la=10;a<la;a++){
                for(let b=0,lb=[5,5,5,5,5,5,5,5,5,5][a];b<lb;b++){
                    let pos=[width/2+b*170-lb*85+85,60+a*55+40]
                    fill(100)
                    rect(pos[0],pos[1],150,45,10)
                    fill(0)
                    textSize(15)
                    text(types.mission[menu.list[tick]].name,pos[0],pos[1])
                    textSize(11.25)
                    text(`${['Easy','Medium','Hard','Expert','Unfair','Special'][types.mission[menu.list[tick]].difficulty]}`,pos[0]-37,pos[1]+15)
                    text(`${types.mission[menu.list[tick]].wave.length} Wave${types.mission[menu.list[tick]].wave.length!=1?`s`:``}`,pos[0]+37,pos[1]+15)
                    tick++
                }
            }
        break
        case 'wave':
            for(let a=0,la=types.mission[game.mission].wave.length;a<la;a++){
                let ticker=0
                let lb=types.mission[game.mission].wave[a].length
                fill(100)
                if(lb>44){
                    let ticker2=0
                    rect(width/2+(a%4)*210-210,height/2+floor(a/4)*310,410,610,10)
                    fill(0)
                    textSize(25)
                    text(`Wave ${a+1}`,width/2+(a%4)*210-210,height/2-285+floor(a/4)*310)
                    textSize(11.5)
                    for(let b=0;b<lb;b++){
                        if(types.mission[game.mission].wave[a][b][0]!='Wait'){
                            let num=types.mission[game.mission].wave[a][b][1]
                            text(`${num==1?num:ceil(num*(game.players*0.25+0.25)*(game.classicRespawn?2:1)*(menu.level==7?0.6:1)*(menu.level==8?(game.attacker?0.75:1.5):1)*(menu.level==16?0.4:1)*(menu.weapon==1?1.25:1)*game.diff)} x ${types.mission[game.mission].wave[a][b][0]}`,width/2+(a%4)*210-315+ticker2*210,height/2-265+ticker*14.375+floor(a/4)*310)
                            ticker++
                            if(ticker>=40){
                                ticker-=40
                                ticker2++
                            }
                        }
                    }
                }else if(lb>22){
                    rect(width/2+(a%4)*210-315,height/2+floor(a/4)*310,200,610,10)
                    fill(0)
                    textSize(25)
                    text(`Wave ${a+1}`,width/2+(a%4)*210-315,height/2-285+floor(a/4)*310)
                    textSize(11.5)
                    for(let b=0;b<lb;b++){
                        if(types.mission[game.mission].wave[a][b][0]!='Wait'){
                            let num=types.mission[game.mission].wave[a][b][1]
                            text(`${num==1?num:ceil(num*(game.players*0.25+0.25)*(game.classicRespawn?2:1)*(game.level==7?0.6:1)*(menu.level==8?(game.attacker?0.75:1.5):1)*(menu.level==16?0.4:1)*(menu.weapon==1?1.25:1)*game.diff)} x ${types.mission[game.mission].wave[a][b][0]}`,width/2+(a%4)*210-315,height/2-265+ticker*14.375+floor(a/4)*310)
                            ticker++
                        }
                    }
                }else{
                    rect(width/2+(a%4)*210-315,height/2-155+floor(a/4)*310,200,300,10)
                    fill(0)
                    textSize(25)
                    text(`Wave ${a+1}`,width/2+(a%4)*210-315,height/2-285+floor(a/4)*310)
                    textSize(11.5)
                    for(let b=0;b<lb;b++){
                        if(types.mission[game.mission].wave[a][b][0]!='Wait'){
                            let num=types.mission[game.mission].wave[a][b][1]
                            text(`${num==1?num:ceil(num*(game.players*0.25+0.25)*(game.classicRespawn?2:1)*(menu.level==8?(game.attacker?0.75:1.5):1)*(menu.level==16?0.5:1)*(menu.weapon==1?2:1)*game.diff)} x ${types.mission[game.mission].wave[a][b][0]}`,width/2+(a%4)*210-315,height/2-265+ticker*14.375+floor(a/4)*310)
                            ticker++
                        }
                    }
                }
            }
        break
        case 'main':
            let effective=[]
            let key=[]
            let bs=[]
            for(let c=0,lc=game.gaming;c<lc;c++){
                if(game.level==15||game.level==18){
                    graphics.main[c].fill(0)
                    graphics.main[c].backgroundPattern(graphics.gradient[0].gradient)
                }else{
                    graphics.main[c].background(0)
                }
                key.push(dev.sight?10:entities.players[c].parachute?4:
                    entities.players[c].weaponType==6||entities.players[c].weaponType==12||entities.players[c].weaponType==92||entities.players[c].weaponType==93||entities.players[c].weaponType==107||
                    entities.players[c].weaponType==132||entities.players[c].weaponType==145||entities.players[c].weaponType==151||entities.players[c].weaponType==154||entities.players[c].weaponType==166||
                    entities.players[c].weaponType==181||entities.players[c].weaponType==236||entities.players[c].weaponType==237||entities.players[c].weaponType==249||entities.players[c].weaponType==271||
                    entities.players[c].weaponType==279||entities.players[c].weaponType==282||entities.players[c].weaponType==288||entities.players[c].weaponType==289||entities.players[c].weaponType==293||
                    entities.players[c].weaponType==298||entities.players[c].weaponType==352||entities.players[c].weaponType==368||entities.players[c].weaponType==369||entities.players[c].weaponType==388||
                    entities.players[c].weaponType==402||entities.players[c].weaponType==416||entities.players[c].weaponType==421||entities.players[c].weaponType==454||entities.players[c].weaponType==460||
                    entities.players[c].weaponType==465||entities.players[c].weaponType==466||entities.players[c].weaponType==486||
                    entities.players[c].weaponType==387&&entities.players[c].subWeaponAType==6
                    ?(game.level==7?1.5:2):1)
                key[c]*=0.75
                if(game.level==6){
                    key[c]*=0.75
                }
                bs.push([])
                let side=entities.players[c].weaponType==340||entities.players[c].weaponType==368||entities.players[c].weaponType==369?lsin(entities.players[c].direction.back)*graphics.main[c].width*0.3*key[c]:0
                let down=entities.players[c].weaponType==107||entities.players[c].weaponType==166||entities.players[c].weaponType==271||entities.players[c].weaponType==279||entities.players[c].weaponType==282||entities.players[c].weaponType==289||entities.players[c].weaponType==388||entities.players[c].weaponType==416||entities.players[c].weaponType==421||entities.players[c].weaponType==466||entities.players[c].weaponType==486
                let center=entities.players[c]
                if(entities.players[c].weaponType==275){
                    for(let a=0,la=entities.projectiles.length;a<la;a++){
                        if(entities.projectiles[a].type==163&&entities.projectiles[a].id==c+1){
                            center=entities.projectiles[a]
                            a=la
                        }
                    }
                }
                if(game.level==7){
                    effective.push([center.position.x+side,center.position.y])
                }else if(game.level==16){
                    effective.push([center.position.x+side,constrain(center.position.y+(down?graphics.main[c].height*0.2*key[c]:0),graphics.main[c].height/2*key[c],game.edge[1]-graphics.main[c].height/2*key[c])])
                }else{
                    effective.push([constrain(center.position.x+side,graphics.main[c].width/2*key[c],game.edge[0]-graphics.main[c].width/2*key[c]),constrain(center.position.y+(down?graphics.main[c].height*0.2*key[c]:0),graphics.main[c].height/2*key[c],game.edge[1]-graphics.main[c].height/2*key[c])])
                }
            }
            for(let a=0,la=graphics.main.length;a<la;a++){
                if(game.level==6){
                    graphics.main[a].image(
                        graphics.pane[1],graphics.main[a].width/2,graphics.main[a].height/2,graphics.main[a].width,graphics.main[a].height,
                        effective[a][0]-graphics.main[a].width/2*key[a],effective[a][1]-graphics.main[a].height/2*key[a],graphics.main[a].width*key[a],graphics.main[a].height*key[a]
                    )
                }
                graphics.main[a].push()
                graphics.main[a].translate(graphics.main[a].width/2,graphics.main[a].height/2)
                graphics.main[a].scale(1/key[a])
                graphics.main[a].translate(-effective[a][0],-effective[a][1])
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
                            run.fore[a][b].position.x+run.fore[a][b].width>effective[c][0]-(graphics.main[c].width*key[c]*0.5+50)&&
                            run.fore[a][b].position.x-run.fore[a][b].width<effective[c][0]+(graphics.main[c].width*key[c]*0.5+50)&&
                            run.fore[a][b].position.y+run.fore[a][b].height>effective[c][1]-(graphics.main[c].height*key[c]*0.5+50)&&
                            run.fore[a][b].position.y-run.fore[a][b].height<effective[c][1]+(graphics.main[c].height*key[c]*0.5+50)||
                            game.level==7&&a==2&&
                            run.fore[a][b].internalBounder.position.x+run.fore[a][b].internalBounder.width>effective[c][0]-(graphics.main[c].width*key[c]*0.5+50)&&
                            run.fore[a][b].internalBounder.position.x-run.fore[a][b].internalBounder.width<effective[c][0]+(graphics.main[c].width*key[c]*0.5+50)&&
                            run.fore[a][b].internalBounder.position.y+run.fore[a][b].internalBounder.height>effective[c][1]-(graphics.main[c].height*key[c]*0.5+50)&&
                            run.fore[a][b].internalBounder.position.y-run.fore[a][b].internalBounder.height<effective[c][1]+(graphics.main[c].height*key[c]*0.5+50)
                        ){
                            run.fore[a][b].display(graphics.main[c])
                            if(a==2){
                                bs[c].push(b)
                            }
                        }else if(game.level==16){
                            let bounce=[
                                [-game.edge[0],0],
                                [game.edge[0],0],
                            ]
                            for(let d=0,ld=bounce.length;d<ld;d++){
                                if(
                                    run.fore[a][b].position.x+bounce[d][0]+run.fore[a][b].width>effective[c][0]-(graphics.main[c].width*key[c]*0.5+50)&&
                                    run.fore[a][b].position.x+bounce[d][0]-run.fore[a][b].width<effective[c][0]+(graphics.main[c].width*key[c]*0.5+50)&&
                                    run.fore[a][b].position.y+bounce[d][1]+run.fore[a][b].height>effective[c][1]-(graphics.main[c].height*key[c]*0.5+50)&&
                                    run.fore[a][b].position.y+bounce[d][1]-run.fore[a][b].height<effective[c][1]+(graphics.main[c].height*key[c]*0.5+50)
                                ){
                                    run.fore[a][b].display(graphics.main[c],bounce[d][0],bounce[d][1])
                                    if(a==2){
                                        bs[c].push(b)
                                    }
                                    d=ld
                                }
                            }
                        }
                        if(game.level==7){
                            let bounce=[
                                [-game.edge[0],-game.edge[1]],
                                [-game.edge[0],0],
                                [-game.edge[0],game.edge[1]],
                                [0,-game.edge[1]],
                                [0,game.edge[1]],
                                [game.edge[0],-game.edge[1]],
                                [game.edge[0],0],
                                [game.edge[0],game.edge[1]],
                            ]
                            for(let d=0,ld=bounce.length;d<ld;d++){
                                if(
                                    run.fore[a][b].position.x+bounce[d][0]+run.fore[a][b].width>effective[c][0]-(graphics.main[c].width*key[c]*0.5+50)&&
                                    run.fore[a][b].position.x+bounce[d][0]-run.fore[a][b].width<effective[c][0]+(graphics.main[c].width*key[c]*0.5+50)&&
                                    run.fore[a][b].position.y+bounce[d][1]+run.fore[a][b].height>effective[c][1]-(graphics.main[c].height*key[c]*0.5+50)&&
                                    run.fore[a][b].position.y+bounce[d][1]-run.fore[a][b].height<effective[c][1]+(graphics.main[c].height*key[c]*0.5+50)||
                                    game.level==7&&a==2&&
                                    run.fore[a][b].internalBounder.position.x+bounce[d][0]+run.fore[a][b].internalBounder.width>effective[c][0]-(graphics.main[c].width*key[c]*0.5+50)&&
                                    run.fore[a][b].internalBounder.position.x+bounce[d][0]-run.fore[a][b].internalBounder.width<effective[c][0]+(graphics.main[c].width*key[c]*0.5+50)&&
                                    run.fore[a][b].internalBounder.position.y+bounce[d][1]+run.fore[a][b].internalBounder.height>effective[c][1]-(graphics.main[c].height*key[c]*0.5+50)&&
                                    run.fore[a][b].internalBounder.position.y+bounce[d][1]-run.fore[a][b].internalBounder.height<effective[c][1]+(graphics.main[c].height*key[c]*0.5+50)
                                ){
                                    run.fore[a][b].display(graphics.main[c],bounce[d][0],bounce[d][1])
                                    if(a==2){
                                        bs[c].push(b)
                                    }
                                    d=ld
                                }
                            }
                        }
                    }
                }
            }
            for(let a=0,la=game.gaming;a<la;a++){
                graphics.main[a].image(
                    graphics.pane[0],effective[a][0],effective[a][1],graphics.main[a].width*key[a],graphics.main[a].height*key[a],
                    effective[a][0]-graphics.main[a].width/2*key[a],effective[a][1]-graphics.main[a].height/2*key[a],graphics.main[a].width*key[a],graphics.main[a].height*key[a]
                )
                if(game.level==7){
                    if(effective[a][0]>game.edge[0]-graphics.main[a].width*key[a]*0.5){
                        graphics.main[a].image(
                            graphics.pane[0],effective[a][0],effective[a][1],graphics.main[a].width*key[a],graphics.main[a].height*key[a],
                            effective[a][0]-game.edge[0]-graphics.main[a].width/2*key[a],effective[a][1]-graphics.main[a].height/2*key[a],graphics.main[a].width*key[a],graphics.main[a].height*key[a]
                        )
                        if(effective[a][1]>game.edge[1]-graphics.main[a].height*key[a]*0.5){
                            graphics.main[a].image(
                                graphics.pane[0],effective[a][0],effective[a][1],graphics.main[a].width*key[a],graphics.main[a].height*key[a],
                                effective[a][0]-game.edge[0]-graphics.main[a].width/2*key[a],effective[a][1]-game.edge[1]-graphics.main[a].height/2*key[a],graphics.main[a].width*key[a],graphics.main[a].height*key[a]
                            )
                        }else if(effective[a][1]<graphics.main[a].height*key[a]*0.5){
                            graphics.main[a].image(
                                graphics.pane[0],effective[a][0],effective[a][1],graphics.main[a].width*key[a],graphics.main[a].height*key[a],
                                effective[a][0]-game.edge[0]-graphics.main[a].width/2*key[a],effective[a][1]+game.edge[1]-graphics.main[a].height/2*key[a],graphics.main[a].width*key[a],graphics.main[a].height*key[a]
                            )
                        }
                    }else if(effective[a][0]<graphics.main[a].width*key[a]*0.5){
                        graphics.main[a].image(
                            graphics.pane[0],effective[a][0],effective[a][1],graphics.main[a].width*key[a],graphics.main[a].height*key[a],
                            effective[a][0]+game.edge[0]-graphics.main[a].width/2*key[a],effective[a][1]-graphics.main[a].height/2*key[a],graphics.main[a].width*key[a],graphics.main[a].height*key[a]
                        )
                        if(effective[a][1]>game.edge[1]-graphics.main[a].height*key[a]*0.5){
                            graphics.main[a].image(
                                graphics.pane[0],effective[a][0],effective[a][1],graphics.main[a].width*key[a],graphics.main[a].height*key[a],
                                effective[a][0]+game.edge[0]-graphics.main[a].width/2*key[a],effective[a][1]-game.edge[1]-graphics.main[a].height/2*key[a],graphics.main[a].width*key[a],graphics.main[a].height*key[a]
                            )
                        }else if(effective[a][1]<graphics.main[a].height*key[a]*0.5){
                            graphics.main[a].image(
                                graphics.pane[0],effective[a][0],effective[a][1],graphics.main[a].width*key[a],graphics.main[a].height*key[a],
                                effective[a][0]+game.edge[0]-graphics.main[a].width/2*key[a],effective[a][1]+game.edge[1]-graphics.main[a].height/2*key[a],graphics.main[a].width*key[a],graphics.main[a].height*key[a]
                            )
                        }
                    }
                    if(effective[a][1]>game.edge[1]-graphics.main[a].height*key[a]*0.5){
                        graphics.main[a].image(
                            graphics.pane[0],effective[a][0],effective[a][1],graphics.main[a].width*key[a],graphics.main[a].height*key[a],
                            effective[a][0]-graphics.main[a].width/2*key[a],effective[a][1]-game.edge[1]-graphics.main[a].height/2*key[a],graphics.main[a].width*key[a],graphics.main[a].height*key[a]
                        )
                    }else if(effective[a][1]<graphics.main[a].height*key[a]*0.5){
                        graphics.main[a].image(
                            graphics.pane[0],effective[a][0],effective[a][1],graphics.main[a].width*key[a],graphics.main[a].height*key[a],
                            effective[a][0]-graphics.main[a].width/2*key[a],effective[a][1]+game.edge[1]-graphics.main[a].height/2*key[a],graphics.main[a].width*key[a],graphics.main[a].height*key[a]
                        )
                    }
                }else if(game.level==16){
                    if(effective[a][0]>game.edge[0]-graphics.main[a].width*key[a]*0.5){
                        graphics.main[a].image(
                            graphics.pane[0],effective[a][0],effective[a][1],graphics.main[a].width*key[a],graphics.main[a].height*key[a],
                            effective[a][0]-(game.edge[0]-1)-graphics.main[a].width/2*key[a],effective[a][1]-graphics.main[a].height/2*key[a],graphics.main[a].width*key[a],graphics.main[a].height*key[a]
                        )
                    }else if(effective[a][0]<graphics.main[a].width*key[a]*0.5){
                        graphics.main[a].image(
                            graphics.pane[0],effective[a][0],effective[a][1],graphics.main[a].width*key[a],graphics.main[a].height*key[a],
                            effective[a][0]+(game.edge[0]-1)-graphics.main[a].width/2*key[a],effective[a][1]-graphics.main[a].height/2*key[a],graphics.main[a].width*key[a],graphics.main[a].height*key[a]
                        )
                    }
                }
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
                if(!game.attacker){
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
                        case 15:
                            graphics.main[a].text('Weapons\nHere',game.edge[0]-100,800)
                        break
                        case 17:
                            graphics.main[a].text('Weapons\nHere',150,game.edge[1]-120)
                        break
                        case 18:
                            graphics.main[a].text('Weapons\nHere',100,game.edge[1]-220)
                        break
                        case 19:
                            graphics.main[a].text('Weapons\nHere',3600,1050)
                            graphics.main[a].text('Weapons\nHere',6900,1050)
                        break
                        case 20:
                            graphics.main[a].text('Weapons\nHere',2250,965)
                        break
                        case 21:
                            graphics.main[a].text('Weapons\nHere',3500,1200)
                        break
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
                            run.info[a][b].position.x+run.info[a][b].width>effective[c][0]-(graphics.main[c].width*key[c]*0.5+50)&&
                            run.info[a][b].position.x-run.info[a][b].width<effective[c][0]+(graphics.main[c].width*key[c]*0.5+50)&&
                            run.info[a][b].position.y+run.info[a][b].height>effective[c][1]-(graphics.main[c].height*key[c]*0.5+50)&&
                            run.info[a][b].position.y-run.info[a][b].height<effective[c][1]+(graphics.main[c].height*key[c]*0.5+50)
                        ){
                            run.info[a][b].displayInfo(graphics.main[c])
                        }else if(game.level==16){
                            let bounce=[
                                [-game.edge[0],0],
                                [game.edge[0],0],
                            ]
                            for(let d=0,ld=bounce.length;d<ld;d++){
                                if(
                                    run.info[a][b].position.x+bounce[d][0]+run.info[a][b].width>effective[c][0]-(graphics.main[c].width*key[c]*0.5+50)&&
                                    run.info[a][b].position.x+bounce[d][0]-run.info[a][b].width<effective[c][0]+(graphics.main[c].width*key[c]*0.5+50)&&
                                    run.info[a][b].position.y+bounce[d][1]+run.info[a][b].height>effective[c][1]-(graphics.main[c].height*key[c]*0.5+50)&&
                                    run.info[a][b].position.y+bounce[d][1]-run.info[a][b].height<effective[c][1]+(graphics.main[c].height*key[c]*0.5+50)
                                ){
                                    run.info[a][b].displayInfo(graphics.main[c],bounce[d][0],bounce[d][1])
                                }
                            }
                        }
                        if(game.level==7){
                            let bounce=[
                                [-game.edge[0],-game.edge[1]],
                                [-game.edge[0],0],
                                [-game.edge[0],game.edge[1]],
                                [0,-game.edge[1]],
                                [0,game.edge[1]],
                                [game.edge[0],-game.edge[1]],
                                [game.edge[0],0],
                                [game.edge[0],game.edge[1]],
                            ]
                            for(let d=0,ld=bounce.length;d<ld;d++){
                                if(
                                    run.info[a][b].position.x+bounce[d][0]+run.info[a][b].width>effective[c][0]-(graphics.main[c].width*key[c]*0.5+50)&&
                                    run.info[a][b].position.x+bounce[d][0]-run.info[a][b].width<effective[c][0]+(graphics.main[c].width*key[c]*0.5+50)&&
                                    run.info[a][b].position.y+bounce[d][1]+run.info[a][b].height>effective[c][1]-(graphics.main[c].height*key[c]*0.5+50)&&
                                    run.info[a][b].position.y+bounce[d][1]-run.info[a][b].height<effective[c][1]+(graphics.main[c].height*key[c]*0.5+50)
                                ){
                                    run.info[a][b].displayInfo(graphics.main[c],bounce[d][0],bounce[d][1])
                                }
                            }
                        }
                    }
                }
            }
            for(let c=0,lc=game.gaming;c<lc;c++){
                for(let a=0,la=entities.projectiles.length;a<la;a++){
                    if(entities.projectiles[a].type==48){
                        entities.projectiles[a].displayOver(graphics.main[c])
                    }
                }
            }
            for(let a=0,la=graphics.main.length;a<la;a++){
                entities.players[a].displayOver(graphics.main[a])
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
            checkEnd(levels[game.level],graphics.main[0],key)
            inputs.tap=[[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]]
            inputs.release=[[false],[false],[false],[false]]
        break
    }
    game.time++
}
function draw(){
    mainloop(graphics.main)
}
function setup(){
    listing[0]=[...range(0,44),...range(0,12)]
    listing[1]=range(44,findName('PlayerTripleAuto',types.player)/*229,239*/)
    listing[2]=range(0,12)
    //listing[1]=listing[1].filter(item=>types.player[item].weapon>=536)
    if(game.nuke){
        listing[1]=[findName('PlayerGuidedMissile',types.player)]
    }
    createCanvas(windowWidth-40,windowHeight-40)
    setupGraphics()
    for(let a=0,la=6;a<la;a++){
        for(let b=0,lb=types.mission.length;b<lb;b++){
            if(types.mission[b].difficulty==a){
                menu.list.push(b)
            }
        }
    }

    if(false){
        game.players=4
        game.gaming=1
        game.level=24
        game.mission=findName('Duck Termination',types.mission)
        entities.players=[]
        initialGraphics()
        game.classicWeapon=true
        game.classicRespawn=true
        game.pvp=true
        newLoop()
        stage.scene='main'
        display.cycle=0
    }
}
function windowResized(){
    resizeCanvas(windowWidth-40,windowHeight-40)
}
function mouseClicked(){
    updateMouse(graphics.main[0])
    switch(stage.scene){
        case 'menu':
            for(let a=0,la=7;a<la;a++){
                for(let b=0,lb=[4,4,5,5,5,4,1][a];b<lb;b++){
                    let pos=[width/2+b*170-lb*85+85,60+a*55+40+(a>=2?15:0)+(a>=4?15:0)+(a>=6?15:0)]
                    if(inPointBox({position:inputs.mouse},{position:{x:pos[0],y:pos[1]},width:150,height:45})){
                        if(a==0){
                            menu.players=b+1
                        }else if(a==1){
                            menu.gaming=b+1
                        }else if(a==2){
                            if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                menu.level=[6,7,8,15,16][b]
                            }else if(inPointBox({position:inputs.mouse},{position:{x:pos[0]+37.5,y:pos[1]},width:75,height:45})){
                                menu.level=[6,7,17,18,16][b]
                            }
                        }else if(a==3){
                            menu.level=[19,20,21,22,23][b]
                        }else if(a==4){
                            if(menu.weapon==1&&b==4||menu.weapon==4&&b==1){
                                menu.weapon=7
                            }else if(menu.weapon==1&&b==3||menu.weapon==3&&b==1){
                                menu.weapon=6
                            }else if(menu.weapon==1&&b==2||menu.weapon==2&&b==1){
                                menu.weapon=5
                            }else{
                                menu.weapon=b
                            }
                        }else if(a==5){
                            if(b==2){
                                if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                    if(game.pvp&&!game.usurp){
                                        game.pvp=false
                                    }else{
                                        game.pvp=true
                                        game.usurp=false
                                    }
                                }else if(inPointBox({position:inputs.mouse},{position:{x:pos[0]+37.5,y:pos[1]},width:75,height:45})){
                                    if(game.pvp&&game.usurp){
                                        game.pvp=false
                                        game.usurp=false
                                    }else{
                                        game.pvp=true
                                        game.usurp=true
                                    }
                                }
                            }else{
                                game[['classicRespawn','invis','pvp','attacker'][b]]=!game[['classicRespawn','invis','pvp','attacker'][b]]
                            }
                        }else{
                            stage.scene='mission'
                        }
                    }
                }
            }
        break
        case 'mission':
            let tick=0
            for(let a=0,la=10;a<la;a++){
                for(let b=0,lb=[5,5,5,5,5,5,5,5,5,5][a];b<lb;b++){
                    let pos=[width/2+b*170-lb*85+85,60+a*55+40]
                    if(inPointBox({position:inputs.mouse},{position:{x:pos[0],y:pos[1]},width:150,height:45})){
                        switch(menu.weapon){
                            case 1:
                                game.peakWeapon=true
                            break
                            case 2:
                                game.classicWeapon=true
                            break
                            case 3:
                                game.selector=true
                            break
                            case 4:
                                game.mainline=true
                            break
                            case 5:
                                game.peakWeapon=true
                                game.classicWeapon=true
                            break
                            case 6:
                                game.peakWeapon=true
                                game.selector=true
                            break
                            case 7:
                                game.peakWeapon=true
                                game.mainline=true
                            break
                        }
                        game.players=menu.players
                        game.gaming=menu.gaming
                        if(game.classicWeapon||game.randomizer||game.selector){
                            game.level=game.pvp&&menu.level==22?23:menu.level
                        }else{
                            game.level=13
                        }
                        game.mission=menu.list[tick]
                        entities.players=[]
                        initialGraphics()
                        newLoop()
                        stage.scene='wave'
                        if(types.mission[game.mission].wave[0].length==0){
                            generateMission(types.mission[game.mission].wave)
                        }
                        if(game.usurp){
                            game.usurpIndex=entities.players[floor(random(0,game.gaming))].index
                        }
                    }
                    tick++
                }
            }
        break
        case 'wave':
            for(let a=0,la=types.mission[game.mission].wave.length;a<la;a++){
                let lb=types.mission[game.mission].wave[a].length
                if(lb>44){
                    if(inPointBox({position:inputs.mouse},{position:{x:width/2+(a%4)*210-210,y:height/2+floor(a/4)*310},width:410,height:610})){
                        stage.scene='main'
                        display.cycle=a
                    }
                }else if(lb>22){
                    if(inPointBox({position:inputs.mouse},{position:{x:width/2+(a%4)*210-315,y:height/2+floor(a/4)*310},width:200,height:610})){
                        stage.scene='main'
                        display.cycle=a
                    }
                }else{
                    if(inPointBox({position:inputs.mouse},{position:{x:width/2+(a%4)*210-315,y:height/2-155+floor(a/4)*310},width:200,height:300})){
                        stage.scene='main'
                        display.cycle=a
                    }
                }
            }
        break
    }
}
function keyPressed(){
    switch(key){
        case 'ArrowLeft': inputs.keys[0][0]=true;inputs.tap[0][0]=true; break
        case 'ArrowRight': inputs.keys[0][1]=true;inputs.tap[0][1]=true; break
        case 'ArrowUp': inputs.keys[0][2]=true;inputs.tap[0][2]=true; break
        case 'ArrowDown': case 'Shift': inputs.keys[0][3]=true;inputs.tap[0][3]=true; break
        case '/': case '?': inputs.release[0][0]=true; break
        case 'a': case 'A': inputs.keys[1][0]=true;inputs.tap[1][0]=true; break
        case 'd': case 'D': inputs.keys[1][1]=true;inputs.tap[1][1]=true; break
        case 'w': case 'W': inputs.keys[1][2]=true;inputs.tap[1][2]=true; break
        case 's': case 'S': inputs.keys[1][3]=true;inputs.tap[1][3]=true; break
        case 'q': case 'Q': inputs.release[1][0]=true; break
        case 'j': case 'J': inputs.keys[2][0]=true;inputs.tap[2][0]=true; break
        case 'l': case 'L': inputs.keys[2][1]=true;inputs.tap[2][1]=true; break
        case 'i': case 'I': inputs.keys[2][2]=true;inputs.tap[2][2]=true; break
        case 'k': case 'K': inputs.keys[2][3]=true;inputs.tap[2][3]=true; break
        case 'u': case 'U': inputs.release[2][0]=true; break
        case 'f': case 'F': inputs.keys[3][0]=true;inputs.tap[3][0]=true; break
        case 'h': case 'H': inputs.keys[3][1]=true;inputs.tap[3][1]=true; break
        case 't': case 'T': inputs.keys[3][2]=true;inputs.tap[3][2]=true; break
        case 'g': case 'G': inputs.keys[3][3]=true;inputs.tap[3][3]=true; break
        case 'r': case 'R': inputs.release[3][0]=true; break
    }
    if(game.emergencyKey){
        switch(key){
            case '[': case '{': inputs.keys[0][0]=true;inputs.tap[0][0]=true; break
            case '|': case '\\': inputs.keys[0][1]=true;inputs.tap[0][1]=true; break
            case '=': case '+': inputs.keys[0][2]=true;inputs.tap[0][2]=true; break
            case ']': case '}': inputs.keys[0][3]=true;inputs.tap[0][3]=true; break
            case '-': case '_': inputs.release[0][0]=true; break
            case 'b': case 'B': inputs.keys[2][0]=true;inputs.tap[2][0]=true; break
            case 'm': case 'M': inputs.keys[2][1]=true;inputs.tap[2][1]=true; break
            case 'h': case 'H': inputs.keys[2][2]=true;inputs.tap[2][2]=true; break
            case 'n': case 'N': inputs.keys[2][3]=true;inputs.tap[2][3]=true; break
            case 'g': case 'G': inputs.release[2][0]=true; break
        }
    }
}
function keyReleased(){
    switch(key){
        case 'ArrowLeft': inputs.keys[0][0]=false; break
        case 'ArrowRight': inputs.keys[0][1]=false; break
        case 'ArrowUp': inputs.keys[0][2]=false; break
        case 'ArrowDown': case 'Shift': inputs.keys[0][3]=false; break
        case 'a': case 'A': inputs.keys[1][0]=false; break
        case 'd': case 'D': inputs.keys[1][1]=false; break
        case 'w': case 'W': inputs.keys[1][2]=false; break
        case 's': case 'S': inputs.keys[1][3]=false; break
        case 'j': case 'J': inputs.keys[2][0]=false; break
        case 'l': case 'L': inputs.keys[2][1]=false; break
        case 'i': case 'I': inputs.keys[2][2]=false; break
        case 'k': case 'K': inputs.keys[2][3]=false; break
        case 'f': case 'F': inputs.keys[3][0]=false; break
        case 'h': case 'H': inputs.keys[3][1]=false; break
        case 't': case 'T': inputs.keys[3][2]=false; break
        case 'g': case 'G': inputs.keys[3][3]=false; break
    }
    if(game.emergencyKey){
        switch(key){
            case '[': case '{': inputs.keys[0][0]=false; break
            case '|': case '\\': inputs.keys[0][1]=false; break
            case '=': case '+': inputs.keys[0][2]=false; break
            case ']': case '}': inputs.keys[0][3]=false; break
            case 'b': case 'B': inputs.keys[2][0]=false; break
            case 'm': case 'M': inputs.keys[2][1]=false; break
            case 'h': case 'H': inputs.keys[2][2]=false; break
            case 'n': case 'N': inputs.keys[2][3]=false; break
        }
    }
}
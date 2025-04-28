function setup(){
    listing[0]=[...safeRange(0,findName('PlayerPanicShotgun',types.player)),...safeRange(0,10)]
    listing[1]=safeRange(findName('PlayerPanicShotgun',types.player),findName('PlayerTripleAuto',types.player)/*485,500*/)
    listing[2]=safeRange(0,10)
    listing[3]=[...safeRange(findName('PlayerScout',types.player),findName('PlayerGun',types.player)),...safeRange(findName('PlayerScout',types.player),findName('PlayerScout2',types.player)),...safeRange(findName('PlayerScout',types.player),findName('PlayerScout2',types.player))]
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
        game.classWeapon=true

        game.players=5  
        game.gaming=1
        game.level=58
        menu.level=58
        game.mission=findName('Duckocracy',types.mission)
        //game.mission=findName('Survival',types.mission)
        generateMission(types.mission[game.mission].wave)
        entities.players=[]
        initialGraphics()
        game.classicWeapon=true
        game.classicRespawn=true
        //game.pvp=true
        display.cycle=0
        //newWave()
        //game.weapon=[[findName('PlayerClassWars',types.player)]]
        newLoop()
        stage.scene='main'
        dev.sight=true
        game.margin=true
        //game.noPlayer=true

        //entities.players[0].newWeaponSet(findName('PlayerEngineerC4',types.player))
    }
}
function windowResized(){
    resizeCanvas(windowWidth-40,windowHeight-40)
}
function mouseClicked(){
    updateMouse(graphics.main[0])
    switch(stage.scene){
        case 'menu':
            for(let a=0,la=game.deprecate?11:10;a<la;a++){
                for(let b=0,lb=[5,5,3,5,5,5,5,5,5,1,2][a];b<lb;b++){
                    let pos=[width/2+b*170-lb*85+85,90+a*55+(a>=2?15:0)+(a>=3?15:0)]
                    if(inPointBox({position:inputs.mouse},{position:{x:pos[0],y:pos[1]},width:150,height:45})){
                        switch(a){
                            case 0:
                                menu.players=b+1
                            break
                            case 1:
                                menu.gaming=b+1
                            break
                            case 2:
                                menu.weapon=b
                                game.peakWeapon=menu.weapon==1
                                game.classWeapon=menu.weapon==2
                            break
                            case 3:
                                stage.scene='mission'
                                game.classicRespawn=true
                                switch(b){
                                    case 0:
                                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                            menu.level=6
                                        }else{
                                            menu.level=45
                                            game.classicWeapon=true
                                            game.pvp=true
                                            game.classicRespawn=false
                                            instant()
                                        }
                                    break
                                    case 1:
                                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                            menu.level=8
                                        }else{
                                            menu.level=17
                                        }
                                        game.classicRespawn=false
                                    break
                                    case 2:
                                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                            menu.level=15
                                        }else{
                                            menu.level=18
                                        }
                                        game.classicRespawn=false
                                    break
                                    case 3:
                                        menu.level=16
                                        game.classicRespawn=false
                                    break
                                    case 4:
                                        menu.level=19
                                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0]+37.5,y:pos[1]},width:75,height:45})){
                                            game.classicWeapon=true
                                            game.pvp=true
                                        }
                                    break
                                }
                            break
                            case 4:
                                stage.scene='mission'
                                game.classicRespawn=true
                                switch(b){
                                    case 0:
                                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0]+37.5,y:pos[1]},width:75,height:45})){
                                            menu.level=20
                                            game.classicWeapon=true
                                            game.pvp=true
                                        }else{
                                            menu.level=46
                                            game.classicRespawn=false
                                        }
                                    break
                                    case 1:
                                        menu.level=21
                                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0]+37.5,y:pos[1]},width:75,height:45})){
                                            game.classicWeapon=true
                                            game.pvp=true
                                        }else{
                                            game.classicRespawn=false
                                        }
                                    break
                                    case 2:
                                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-50,y:pos[1]},width:50,height:45})){
                                            menu.level=22
                                            game.classicWeapon=true
                                        }else if(inPointBox({position:inputs.mouse},{position:{x:pos[0],y:pos[1]},width:50,height:45})){
                                            menu.level=23
                                            game.classicWeapon=true
                                            game.pvp=true
                                        }else{
                                            menu.level=35
                                            game.classicWeapon=true
                                        }
                                    break
                                    case 3:
                                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                            menu.level=25
                                            game.classicWeapon=true
                                        }else{
                                            menu.level=26
                                            game.classicWeapon=true
                                            game.pvp=true
                                        }
                                    break
                                    case 4:
                                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                            menu.level=27
                                        }else{
                                            menu.level=27
                                            game.classicWeapon=true
                                            game.pvp=true
                                            instant()
                                        }
                                    break
                                }
                            break
                            case 5:
                                stage.scene='mission'
                                game.classicRespawn=true
                                switch(b){
                                    case 0:
                                        game.classicRespawn=false
                                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                            menu.level=29
                                        }else{
                                            menu.level=53
                                            game.pvp=true
                                            game.classicWeapon=true
                                            instant()
                                        }
                                    break
                                    case 1:
                                        game.classicWeapon=true
                                        game.pvp=true
                                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                            menu.level=30
                                        }else{
                                            menu.level=56
                                            game.classicRespawn=false
                                            instant()
                                        }
                                    break
                                    case 2:
                                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                            menu.level=32
                                            game.classicWeapon=true
                                        }else{
                                            menu.level=33
                                            game.classicWeapon=true
                                            game.pvp=true
                                        }
                                    break
                                    case 3:
                                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                            menu.level=34
                                        }else{
                                            menu.level=50
                                            game.classicWeapon=true
                                            game.pvp=true
                                            game.classicRespawn=false
                                            instant()
                                        }
                                    break
                                    case 4:
                                        menu.level=36
                                        game.classicWeapon=true
                                        game.pvp=true
                                        game.classicRespawn=false
                                        instant()
                                    break
                                }
                            break
                            case 6:
                                stage.scene='mission'
                                game.classicRespawn=true
                                switch(b){
                                    case 0:
                                        menu.level=37
                                        game.classicWeapon=true
                                        game.pvp=true
                                        game.classicRespawn=false
                                    break
                                    case 1:
                                        menu.level=38
                                        game.classicWeapon=true
                                        game.pvp=true
                                        instant()
                                    break
                                    case 2:
                                        menu.level=39
                                        game.classicWeapon=true
                                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0]+37.5,y:pos[1]},width:75,height:45})){
                                            game.pvp=true
                                        }
                                    break
                                    case 3:
                                        game.classicWeapon=true
                                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                            menu.level=40
                                        }else{
                                            menu.level=52
                                            game.pvp=true
                                            game.classicRespawn=false
                                            instant()
                                        }
                                    break
                                    case 4:
                                        menu.level=41
                                        game.classicWeapon=true
                                        game.pvp=true
                                        game.classicRespawn=false
                                        instant()
                                    break
                                }
                            break
                            case 7:
                                stage.scene='mission'
                                game.classicRespawn=true
                                switch(b){
                                    case 0:
                                        menu.level=42
                                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0]+37.5,y:pos[1]},width:75,height:45})){
                                            game.classicWeapon=true
                                            game.pvp=true
                                        }
                                    break
                                    case 1:
                                        menu.level=43
                                        game.classicWeapon=true
                                        game.pvp=true
                                        instant()
                                    break
                                    case 2:
                                        menu.level=44
                                        game.pvp=true
                                        menu.players*=4
                                        if(!game.classWeapon){
                                            game.classicWeapon=true
                                        }
                                        instant()
                                    break
                                    case 3:
                                        menu.level=47
                                    break
                                    case 4:
                                        menu.level=49
                                        game.classicWeapon=true
                                    break
                                }
                            break
                            case 8:
                                stage.scene='mission'
                                game.classicRespawn=true
                                switch(b){
                                    case 0:
                                        menu.level=51
                                        game.classicWeapon=true
                                        game.pvp=true
                                        game.classicRespawn=false
                                        instant()
                                    break
                                    case 1:
                                        menu.level=54
                                        game.classicWeapon=true
                                        game.pvp=true
                                    break
                                    case 2:
                                        menu.level=55
                                        game.classicWeapon=true
                                    break
                                    case 3:
                                        menu.level=58
                                    break
                                    case 4:
                                        menu.level=59
                                        game.classicWeapon=true
                                    break
                                }
                            break
                            case 9:
                                stage.scene='mission'
                                game.classicRespawn=true
                                switch(b){
                                    case 0:
                                        menu.level=28
                                        game.classicWeapon=true
                                        game.pvp=true
                                        instant()
                                    break
                                }
                            break
                            case 10:
                                stage.scene='mission'
                                game.classicRespawn=true
                                switch(b){
                                    case 0:
                                        menu.level=7
                                        game.classicWeapon=true
                                        game.pvp=true
                                    break
                                    case 1:
                                        menu.level=24
                                        game.classicWeapon=true
                                        game.pvp=true
                                    break
                                }
                            break
                        }
                    }
                }
            }
        break
        case 'menuLegacy':
            for(let a=0,la=7;a<la;a++){
                for(let b=0,lb=[5,5,6,6,4,4,1][a];b<lb;b++){
                    let pos=[width/2+b*170-lb*85+85,60+a*55+40+(a>=2?15:0)+(a>=4?15:0)+(a>=6?15:0)]
                    if(inPointBox({position:inputs.mouse},{position:{x:pos[0],y:pos[1]},width:150,height:45})){
                        if(a==0){
                            menu.players=b+1
                        }else if(a==1){
                            menu.gaming=b+1
                        }else if(a==2){
                            if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                menu.level=[6,7,8,15,16,19][b]
                            }else if(inPointBox({position:inputs.mouse},{position:{x:pos[0]+37.5,y:pos[1]},width:75,height:45})){
                                menu.level=[6,7,17,18,16,19][b]
                            }
                        }else if(a==3){
                            menu.level=[20,21,22,24,25,27][b]
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
                        /*switch(menu.weapon){
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
                        }*/
                        game.players=menu.players
                        game.gaming=menu.gaming
                        if(game.classicWeapon||game.randomizer||game.selector){
                            game.level=game.pvp&&menu.level==22?23:game.pvp&&menu.level==25?26:menu.level
                        }else{
                            game.level=game.classWeapon?(menu.level==44?57:48):13
                        }
                        game.mission=menu.list[tick]
                        entities.players=[]
                        game.pane=menu.level!=7&&menu.level!=16
                        initialGraphics()
                        if(game.level==29){
                            newWave()
                        }else if(game.level!=37){
                            newLoop()
                        }
                        stage.scene='wave'
                        if(types.mission[game.mission].wave[0].length==0){
                            generateMission(types.mission[game.mission].wave)
                        }
                        if(game.usurp){
                            game.usurpIndex=floor(random(0,game.players))
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
                        if(game.level==37){
                            newWave()
                        }
                    }
                }else if(lb>22){
                    if(inPointBox({position:inputs.mouse},{position:{x:width/2+(a%4)*210-315,y:height/2+floor(a/4)*310},width:200,height:610})){
                        stage.scene='main'
                        display.cycle=a
                        if(game.level==37){
                            newWave()
                        }
                    }
                }else{
                    if(inPointBox({position:inputs.mouse},{position:{x:width/2+(a%4)*210-315,y:height/2-155+floor(a/4)*310},width:200,height:300})){
                        stage.scene='main'
                        display.cycle=a
                        if(game.level==37){
                            newWave()
                        }
                    }
                }
            }
        break
    }
}
function instant(){
    game.players=menu.players
    game.gaming=menu.gaming
    if(game.classicWeapon||game.randomizer||game.selector){
        game.level=game.pvp&&menu.level==22?23:game.pvp&&menu.level==25?26:menu.level
    }else{
        game.level=game.classWeapon?(menu.level==44?57:48):13
    }
    game.mission=0
    entities.players=[]
    game.pane=menu.level!=7&&menu.level!=16
    initialGraphics()
    newLoop()
    stage.scene='wave'
    if(types.mission[game.mission].wave[0].length==0){
        generateMission(types.mission[game.mission].wave)
    }
    stage.scene='main'
    display.cycle=0
}
function keyPressed(){
    switch(key){
        case 'ArrowLeft': inputs.keys[0][0]=true;inputs.tap[0][0]=true; break
        case 'ArrowRight': inputs.keys[0][1]=true;inputs.tap[0][1]=true; break
        case 'ArrowUp': inputs.keys[0][2]=true;inputs.tap[0][2]=true; break
        case 'ArrowDown': inputs.keys[0][3]=true;inputs.tap[0][3]=true; break
        case 'Shift': inputs.release[0][0]=true; break
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
        case '4': inputs.keys[4][0]=true;inputs.tap[4][0]=true; break
        case '6': inputs.keys[4][1]=true;inputs.tap[4][1]=true; break
        case '8': inputs.keys[4][2]=true;inputs.tap[4][2]=true; break
        case '5': inputs.keys[4][3]=true;inputs.tap[4][3]=true; break
        case '7': inputs.release[4][0]=true; break
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
        case 'ArrowDown': inputs.keys[0][3]=false; break
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
        case '4': inputs.keys[4][0]=false; break
        case '6': inputs.keys[4][1]=false; break
        case '8': inputs.keys[4][2]=false; break
        case '5': inputs.keys[4][3]=false; break
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
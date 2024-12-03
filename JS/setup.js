function setup(){
    createCanvas(windowWidth-40,windowHeight-40)
    setupGraphics()
    for(let a=0,la=5;a<la;a++){
        for(let b=0,lb=types.mission.length;b<lb;b++){
            if(types.mission[b].difficulty==a){
                menu.list.push(b)
            }
        }
    }
}
function windowResized(){
    resizeCanvas(windowWidth-40,windowHeight-40)
}
function mouseClicked(){
    updateMouse(graphics.main[0])
    switch(stage.scene){
        case 'menu':
            for(let a=0,la=10;a<la;a++){
                for(let b=0,lb=a>=4?6:a>=2?5:4;b<lb;b++){
                    if(inPointBox({position:inputs.mouse},{position:{x:width/2+b*210-lb*105+105,y:60+a*65+(a>=2?20:0)+(a>=3?20:0)+(a>=4?20:0)+40},width:200,height:60})){
                        if(a==0){
                            menu.players=b+1
                        }else if(a==1){
                            menu.gaming=b+1
                        }else if(a==2){
                            menu.level=[6,7,8,12,13][b]
                        }else if(a==3){
                            game[['classicRespawn','invis','pvp','randomizer','classicWeapon'][b]]=!game[['classicRespawn','invis','pvp','randomizer','classicWeapon'][b]]
                        }else{
                            game.players=menu.players
                            game.gaming=menu.gaming
                            if(game.classicWeapon||game.randomizer){
                                game.level=menu.level
                            }else{
                                game.level=13
                            }
                            game.mission=menu.list[a*6+b-24]
                            entities.players=[]
                            initialGraphics()
                            newLoop()
                            stage.scene='wave'
                        }
                    }
                }
            }
        break
        case 'wave':
            for(let a=0,la=types.mission[game.mission].wave.length;a<la;a++){
                let lb=types.mission[game.mission].wave[a].length
                if(lb>40){
                    if(inPointBox({position:inputs.mouse},{position:{x:width/2+(a%4)*210-210,y:height/2+floor(a/4)*310},width:410,height:610})){
                        stage.scene='main'
                        display.cycle=a
                    }
                }else if(lb>30){
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
        case 'ArrowDown': inputs.keys[0][3]=true;inputs.tap[0][3]=true; break
        case 'a': case 'A': inputs.keys[1][0]=true;inputs.tap[1][0]=true; break
        case 'd': case 'D': inputs.keys[1][1]=true;inputs.tap[1][1]=true; break
        case 'w': case 'W': inputs.keys[1][2]=true;inputs.tap[1][2]=true; break
        case 's': case 'S': inputs.keys[1][3]=true;inputs.tap[1][3]=true; break
        case 'j': case 'J': inputs.keys[2][0]=true;inputs.tap[2][0]=true; break
        case 'l': case 'L': inputs.keys[2][1]=true;inputs.tap[2][1]=true; break
        case 'i': case 'I': inputs.keys[2][2]=true;inputs.tap[2][2]=true; break
        case 'k': case 'K': inputs.keys[2][3]=true;inputs.tap[2][3]=true; break
        case 'f': case 'F': inputs.keys[3][0]=true;inputs.tap[3][0]=true; break
        case 'h': case 'H': inputs.keys[3][1]=true;inputs.tap[3][1]=true; break
        case 't': case 'T': inputs.keys[3][2]=true;inputs.tap[3][2]=true; break
        case 'g': case 'G': inputs.keys[3][3]=true;inputs.tap[3][3]=true; break
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
    }
}
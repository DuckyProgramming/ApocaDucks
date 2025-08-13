function mainloop(){
    clear()
    background(150)
    let set=[]
    switch(stage.scene){
        case 'menu':
            set=[
                [],[
                    ['Vietnam','Normandy','Isonzo','Stalingrad'],
                    ['Prison','Steep','Basalt','Abandoned'],
                ],[
                    ['DoubleMountain','Steel','Sulfate','Process'],
                    ['Downward','Arizona','Fragile','Alloy'],
                    ['NuclearMountain','Big Data','Rusted','Tailwater'],
                    ['Abandoned','Identify','Divider','Rocksalt'],
                    ['Bluefort','Bluefort Mini','Bluefort Micro','Railing'],
                    ['Burnt','Confines','Ferrum'],
                ],[
                    ['DoubleMountain','Steel','Sulfate','Process'],
                    ['Downward','Sierra Leone','Fragile','NuclearMountain'],
                    ['Entropy','Rusted','Tailwater','Abandoned'],
                    ['Cooked','Divider','Rocksalt','Bluefort'],
                    ['Bluefort Mini','Bluefort Micro','Railing','Sulfite'],
                    ['Confines','Blueprint'],
                ],[
                    ['Vietnam','Gray Gravel','Shogatsu','Arizona'],
                    ['Aerial','Alloy','Speleo','Chasm'],
                    ['Tailwater','Identify','Hard Hat','Granary'],
                    ['Rocksalt','Globus','Cranberry','Mill'],
                    ['Rocketyard','Sulfite','Confines','Zone 54'],
                ],[
                    ['Pacman','Stalingrad','Prison','Steep'],
                ],[
                    ['Bluefort','Bluefort Mini','Bluefort Micro','Gray Gravel'],
                    ['Shogatsu','Basalt','Razorpoint','Valuation'],
                    ['Aerial','Cranberry'],
                ],
            ]
            for(let a=0,la=4+set[menu.mode].length;a<la;a++){
                for(let b=0,lb=a>=4?set[menu.mode][a-4].length:[5,5,3,6][a];b<lb;b++){
                    let pos=[a==3?width/2+b*140-lb*70+70:width/2+b*170-lb*85+85,90+a*55+(a>=2?15:0)+(a>=3?15:0)+(a>=4?15:0)]
                    if(
                        a==0&&menu.players==b+1||
                        a==1&&menu.gaming==b+1||
                        a==2&&menu.weapon==b||
                        a==3&&menu.mode==b+1
                    ){
                        fill(100,200,100)
                    }else{
                        fill(100)
                    }
                    if(a==3&&b==3){
                        if(menu.mode==b+1){
                            if(game.past){
                                fill(100)
                                rect(pos[0]-29.5,pos[1],61,45,10)
                                fill(100,200,100)
                                rect(pos[0]+29.5,pos[1],61,45,10)
                            }else{
                                fill(100)
                                rect(pos[0]+29.5,pos[1],61,45,10)
                                fill(100,200,100)
                                rect(pos[0]-29.5,pos[1],61,45,10)
                            }
                        }else{
                            rect(pos[0]+29.5,pos[1],61,45,10)
                            rect(pos[0]-29.5,pos[1],61,45,10)
                        }
                    }else if(
                        menu.mode==1&&a==4&&b==1||
                        menu.mode==1&&a==4&&b==2||
                        menu.mode==2&&a==4&&b==1||
                        menu.mode==2&&a==7&&b==1||
                        menu.mode==2&&a==8&&b==3||
                        menu.mode==2&&a==9&&b==1||
                        menu.mode==3&&a==9&&b==0
                    ){
                        rect(pos[0]+37,pos[1],76,45,10)
                        rect(pos[0]-37,pos[1],76,45,10)
                    }else{
                        if(a==3){
                            rect(pos[0],pos[1],120,45,10)
                        }else{
                            rect(pos[0],pos[1],150,45,10)
                        }
                    }
                    fill(0)
                    textSize(15)
                    text(
                        a>=4?set[menu.mode][a-4][b]:[
                            `${b+1} Players`,
                            `${b+1} Gaming`,
                            ['Normal Weapons','Special Weapons','Class Weapons'][b],
                            ['Survival','Invasion','Conquest','Arena','Aimless','Specialty'][b]
                        ][a],pos[0],pos[1]
                    )
                    textSize(11.25)
                    if(a==3){
                        switch(b){
                            case 0: case 1:
                                text(`PvE`,pos[0],pos[1]+15)
                            break
                            case 2: case 4:
                                text(`PvP`,pos[0],pos[1]+15)
                            break
                            case 3:
                                text(`PvP`,pos[0]-30,pos[1]+15)
                                text(`Past`,pos[0]+30,pos[1]+15)
                            break
                            case 5:
                                text(`PvP/PvE`,pos[0],pos[1]+15)
                            break
                        }
                    }
                    switch(menu.mode){
                        case 1:
                            switch(a){
                                case 4:
                                    switch(b){
                                        case 1: case 2:
                                            text(`Standard`,pos[0]-37,pos[1]+15)
                                            text(`Reverse`,pos[0]+37,pos[1]+15)
                                        break
                                    }
                                break
                                case 5:
                                    switch(b){
                                        case 3:
                                            text(`Mobster`,pos[0],pos[1]+15)
                                        break
                                    }
                                break
                            }
                        break
                        case 2:
                            switch(a){
                                case 4:
                                    switch(b){
                                        case 1:
                                            text(`Standard`,pos[0]-37,pos[1]+15)
                                            text(`Chaos`,pos[0]+37,pos[1]+15)
                                        break
                                    }
                                break
                                case 7:
                                    switch(b){
                                        case 1:
                                            text(`Standard`,pos[0]-37,pos[1]+15)
                                            text(`Nightwatch`,pos[0]+37,pos[1]+15)
                                        break
                                    }
                                break
                                case 8:
                                    switch(b){
                                        case 3:
                                            text(`Standard`,pos[0]-37,pos[1]+15)
                                            text(`Nightwatch`,pos[0]+37,pos[1]+15)
                                        break
                                    }
                                break
                                case 9:
                                    switch(b){
                                        case 1:
                                            text(`Loop`,pos[0]-37,pos[1]+15)
                                            text(`Hexagon`,pos[0]+37,pos[1]+15)
                                        break
                                    }
                                break
                            }
                        break
                        case 3:
                            switch(a){
                                case 9:
                                    switch(b){
                                        case 0:
                                            text(`Loop`,pos[0]-37,pos[1]+15)
                                            text(`Hexagon`,pos[0]+37,pos[1]+15)
                                        break
                                    }
                                break
                            }
                        break
                        case 6:
                            switch(a){
                                case 4:
                                    switch(b){
                                        case 0: case 1: case 2:
                                            text(`CTF`,pos[0],pos[1]+15)
                                        break
                                        case 3:
                                            text(`Search and Destroy`,pos[0],pos[1]+15)
                                        break
                                    }
                                break
                                case 5:
                                    switch(b){
                                        case 0: case 1:
                                            text(`Duck Destruction`,pos[0],pos[1]+15)
                                        break
                                        case 2:
                                            text(`Quadrants`,pos[0],pos[1]+15)
                                        break
                                        case 3:
                                            text(`Heist`,pos[0],pos[1]+15)
                                        break
                                    }
                                break
                                case 6:
                                    switch(b){
                                        case 2:
                                            text(`Rise of the Duck`,pos[0],pos[1]+15)
                                        break
                                        case 3:
                                            text(`Team Arena`,pos[0],pos[1]+15)
                                        break
                                    }
                                break
                            }
                        break
                    }
                }
            }
        break
        case 'menu2':
            set=[
                [],[
                    'Vietnam','Normandy','Isonzo','Stalingrad','Prison',
                    'Steep','Gray Gravel','Basalt','Nowhere (WIP)','',
                ],[
                    'DoubleMountain','Steel','Sulfate','Process','Downward',
                    'Arizona','Fragile','Alloy','NuclearMountain','Big Data',
                    'Rusted','Tailwater','Abandoned','Identify','',
                ],[
                    'DoubleMountain','Steel','Sulfate','Process','Downward',
                    'Fragile','NuclearMountain','Razorpoint','Entropy','',
                ],[
                    'Vietnam','Gray Gravel','Shogatsu','Arizona','Aerial',
                    'Alloy','Speleo','Chasm','Identify','Hard Hat',
                ],[
                    'Pacman','Stalingrad','Prison','Steep','Blueprint',
                ],[
                    'Shogatsu','Valuation','Sierra Leone','Basalt','Granary (WIP)',
                ],
            ]
            for(let a=0,la=4+ceil(set[menu.mode].length/5);a<la;a++){
                for(let b=0,lb=[5,5,3,6,constrain(set[menu.mode].length,0,5),constrain(set[menu.mode].length-5,0,5),constrain(set[menu.mode].length-10,0,5)][a];b<lb;b++){
                    let pos=[a==3?width/2+b*140-lb*70+70:width/2+b*170-lb*85+85,90+a*55+(a>=2?15:0)+(a>=3?15:0)+(a>=4?15:0)]
                    if(
                        a==0&&menu.players==b+1||
                        a==1&&menu.gaming==b+1||
                        a==2&&menu.weapon==b||
                        a==3&&menu.mode==b+1
                    ){
                        fill(100,200,100)
                    }else{
                        fill(100)
                    }
                    if(
                        menu.mode==1&&a==4&&b==1||
                        menu.mode==1&&a==4&&b==2||
                        menu.mode==2&&a==4&&b==1
                    ){
                        rect(pos[0]+37,pos[1],76,45,10)
                        rect(pos[0]-37,pos[1],76,45,10)
                    }else{
                        if(a==3){
                            rect(pos[0],pos[1],120,45,10)
                        }else{
                            rect(pos[0],pos[1],150,45,10)
                        }
                    }
                    fill(0)
                    textSize(15)
                    text(
                        [
                            `${b+1} Players`,
                            `${b+1} Gaming`,
                            ['Normal Weapons','Special Weapons','Class Weapons'][b],
                            ['Survival','Invasion','Conquest','Arena','Aimless','Specialty'][b],
                            set[menu.mode][b],
                            set[menu.mode][5+b],
                            set[menu.mode][10+b],
                        ][a],pos[0],pos[1]
                    )
                    textSize(11.25)
                    if(a==3){
                        switch(b){
                            case 0: case 1:
                                text(`PvE`,pos[0],pos[1]+15)
                            break
                            case 2: case 3: case 4:
                                text(`PvP`,pos[0],pos[1]+15)
                            break
                            case 5:
                                text(`PvP/PvE`,pos[0],pos[1]+15)
                            break
                        }
                    }
                    switch(menu.mode){
                        case 1:
                            switch(a){
                                case 4:
                                    switch(b){
                                        case 1: case 2:
                                            text(`Standard`,pos[0]-37,pos[1]+15)
                                            text(`Reverse`,pos[0]+37,pos[1]+15)
                                        break
                                    }
                                break
                            }
                        break
                        case 2:
                            switch(a){
                                case 4:
                                    switch(b){
                                        case 1:
                                            text(`Standard`,pos[0]-37,pos[1]+15)
                                            text(`Chaos`,pos[0]+37,pos[1]+15)
                                        break
                                    }
                                break
                            }
                        break
                    }
                }
            }
        break
        case 'mission':
            for(let a=0,la=1+(menu.mode==0?0:ceil(menu.list[menu.mode-1].length/5));a<la;a++){
                for(let b=0,lb=a==0?6:constrain(menu.list[menu.mode-1].length+5-a*5,0,5);b<lb;b++){
                    if(a==0){
                        let pos=[width/2+b*140-lb*70+70,60+a*55+40]
                        if(menu.mode==b+1){
                            fill(100,200,100)
                        }else{
                            fill(100)
                        }
                        rect(pos[0],pos[1],120,45,10)
                        fill(0)
                        textSize(15)
                        text(['Easy','Medium','Hard','Expert','Unfair','Special'][b],pos[0],pos[1])
                    }else{
                        let pos=[width/2+b*170-lb*85+85,60+a*55+40]
                        let unit=menu.list[menu.mode-1][a*5+b-5]
                        fill(100)
                        rect(pos[0],pos[1],150,45,10)
                        fill(0)
                        textSize(15)
                        text(types.mission[unit].name,pos[0],pos[1])
                        textSize(11.25)
                        text(`${['Easy','Medium','Hard','Expert','Unfair','Special'][types.mission[unit].difficulty]}`,pos[0]-37,pos[1]+15)
                        text(`${types.mission[unit].wave.length} Wave${types.mission[unit].wave.length!=1?`s`:``}`,pos[0]+37,pos[1]+15)
                    }
                }
            }
        break
        case 'menuFull':
            for(let a=0,la=game.deprecate?11:10;a<la;a++){
                for(let b=0,lb=[5,5,3,5,5,5,5,5,5,1,2][a];b<lb;b++){
                    let pos=[width/2+b*170-lb*85+85,90+a*55+(a>=2?15:0)+(a>=3?15:0)]
                    if(a==4&&b==2){
                        fill(100)
                        rect(pos[0]+49.5,pos[1],51,45,10)
                        rect(pos[0],pos[1],51,45,10)
                        rect(pos[0]-49.5,pos[1],51,45,10)
                    }else if(
                        a==3&&b==0||a==3&&b==1||a==3&&b==2||a==3&&b==4||
                        a==4&&b==0||a==4&&b==1||a==4&&b==3||a==4&&b==4||
                        a==5&&b==0||a==5&&b==1||a==5&&b==2||a==5&&b==3||
                        a==6&&b==2||a==6&&b==3||
                        a==7&&b==0
                    ){
                        fill(100)
                        rect(pos[0]+37,pos[1],76,45,10)
                        rect(pos[0]-37,pos[1],76,45,10)
                    }else{
                        if(
                            a==0&&menu.players==b+1||
                            a==1&&menu.gaming==b+1||
                            a==2&&menu.weapon==b
                        ){
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
                            ['Normal Weapons','Special Weapons','Class Weapons'][b],
                            ['Vietnam','Normandy','Isonzo','Stalingrad','DoubleMountain'][b],
                            ['Prison','Steep','Steel','Sulfate','Process'][b],
                            ['Gray Gravel','Shogatsu','Downward','Arizona','Aerial'][b],
                            ['Valuation','Sierra Leone','Fragile','Alloy','Speleo'][b],
                            ['NuclearMountain','Razorpoint','Entropy','Big Data','Rusted'][b],
                            ['Chasm','Basalt','Tailwater','Abandoned','Identify'][b],
                            ['Blueprint'][b],
                            ['Pacman','Constructor'][b],
                        ][a],pos[0],pos[1]
                    )
                    textSize(11.25)
                    switch(a){
                        case 3:
                            switch(b){
                                case 0:
                                    text(`PvE`,pos[0]-37,pos[1]+15)
                                    text(`DM`,pos[0]+37,pos[1]+15)
                                break
                                case 1: case 2:
                                    text(`Standard`,pos[0]-37,pos[1]+15)
                                    text(`Reverse`,pos[0]+37,pos[1]+15)
                                break
                                case 3:
                                    text(`PvE`,pos[0],pos[1]+15)
                                break
                                case 4:
                                    text(`PvE`,pos[0]-37,pos[1]+15)
                                    text(`PvP`,pos[0]+37,pos[1]+15)
                                break
                            }
                        break
                        case 4:
                            switch(b){
                                case 0: case 1: case 3: case 4:
                                    text(`PvE`,pos[0]-37,pos[1]+15)
                                    text(`PvP`,pos[0]+37,pos[1]+15)
                                break
                                case 2:
                                    text(`PvE`,pos[0]-50,pos[1]+15)
                                    text(`PvP`,pos[0],pos[1]+15)
                                    text(`Chaos`,pos[0]+50,pos[1]+15)
                                break
                            }
                        break
                        case 5:
                            switch(b){
                                case 0: case 3:
                                    text(`PvE`,pos[0]-37,pos[1]+15)
                                    text(`DM`,pos[0]+37,pos[1]+15)
                                break
                                case 1:
                                    text(`PvP`,pos[0]-37,pos[1]+15)
                                    text(`DM`,pos[0]+37,pos[1]+15)
                                break
                                case 2:
                                    text(`PvE`,pos[0]-37,pos[1]+15)
                                    text(`PvP`,pos[0]+37,pos[1]+15)
                                break
                                case 4:
                                    text(`DM`,pos[0],pos[1]+15)
                                break
                            }
                        break
                        case 6:
                            switch(b){
                                case 0:
                                    text(`PvP/PvE`,pos[0],pos[1]+15)
                                break
                                case 1:
                                    text(`PvP`,pos[0],pos[1]+15)
                                break
                                case 2:
                                    text(`PvE`,pos[0]-37,pos[1]+15)
                                    text(`PvP`,pos[0]+37,pos[1]+15)
                                break
                                case 3:
                                    text(`PvE`,pos[0]-37,pos[1]+15)
                                    text(`DM`,pos[0]+37,pos[1]+15)
                                break
                                case 4:
                                    text(`DM`,pos[0],pos[1]+15)
                                break
                            }
                        break
                        case 7:
                            switch(b){
                                case 0:
                                    text(`PvE`,pos[0]-37,pos[1]+15)
                                    text(`PvP`,pos[0]+37,pos[1]+15)
                                break
                                case 1: case 2:
                                    text(`PvP`,pos[0],pos[1]+15)
                                break
                                case 3: case 4:
                                    text(`PvE`,pos[0],pos[1]+15)
                                break
                            }
                        break
                        case 8:
                            switch(b){
                                case 0:
                                    text(`DM`,pos[0],pos[1]+15)
                                break
                                case 1:
                                    text(`PvP`,pos[0],pos[1]+15)
                                break
                                case 2: case 3: case 4:
                                    text(`PvE`,pos[0],pos[1]+15)
                                break
                            }
                        break
                        case 9:
                            switch(b){
                                case 0:
                                    text(`PvP`,pos[0],pos[1]+15)
                                break
                            }
                        break
                        case 10:
                            switch(b){
                                case 0: case 1:
                                    text(`PvP`,pos[0],pos[1]+15)
                                break
                            }
                        break
                    }
                }
            }
        break
        case 'menuLegacy':
            for(let a=0,la=7;a<la;a++){
                for(let b=0,lb=[5,5,6,6,4,4,1][a];b<lb;b++){
                    let pos=[width/2+b*170-lb*85+85,60+a*55+40+(a>=2?15:0)+(a>=4?15:0)+(a>=6?15:0)]
                    if(a==2&&b>=2&&b<=3||a==5&&b==2){
                        fill(100)
                        if(a==2&&menu.level==[6,7,8,15,16][b]||a==5&&game.pvp&&!game.usurp){
                            rect(pos[0]+37,pos[1],76,45,10)
                            fill(100,200,100)
                            rect(pos[0]-37,pos[1],76,45,10)
                        }else if(a==2&&menu.level==[6,7,17,18,16][b]||a==5&&game.pvp&&game.usurp){
                            rect(pos[0]-37,pos[1],76,45,10)
                            fill(100,200,100)
                            rect(pos[0]+37,pos[1],76,45,10)
                        }else{
                            rect(pos[0]+37,pos[1],76,45,10)
                            rect(pos[0]-37,pos[1],76,45,10)
                        }
                    }else{
                        if(
                            a==0&&menu.players==b+1||
                            a==1&&menu.gaming==b+1||
                            a==2&&menu.level==[6,7,8,15,16,19][b]||
                            a==3&&menu.level==[20,21,22,24,25,27][b]||
                            a==4&&menu.weapon==b||
                            a==4&&b>=1&&b<=2&&menu.weapon==5||
                            a==4&&(b==1||b==3)&&menu.weapon==6||
                            a==4&&(b==1||b==4)&&menu.weapon==7||
                            a==5&&game[['classicRespawn','invis','','attacker'][b]]
                        ){
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
                            ['Vietnam','Pacman','Normandy','Isonzo','Stalingrad','DoubleMountain'][b],
                            ['Prison','Steep','Steel','Constructor','Sulfate','Process'][b],
                            ['Normal Weapons','Special Weapons','Random Weapons','Option Weapons','Pool Weapons'][b],
                            ['Auto-Respawn','Invisible','PvP','Fortress'][b],
                            `Proceed`
                        ][a],pos[0],pos[1]
                    )
                    if(a==2&&b>=2&&b<=3){
                        textSize(11.25)
                        text(`Standard`,pos[0]-37,pos[1]+15)
                        text(`Reverse`,pos[0]+37,pos[1]+15)
                    }
                    if(a==5&&b==2){
                        textSize(11.25)
                        text(`Standard`,pos[0]-37,pos[1]+15)
                        text(`Leader`,pos[0]+37,pos[1]+15)
                    }
                }
            }
        break
        case 'missionFull':
            let tick=0
            for(let a=0,la=11;a<la;a++){
                for(let b=0,lb=[5,5,5,5,5,5,5,5,5,5,3][a];b<lb;b++){
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
                            text(`${types.mission[game.mission].wave[a][b][0].includes('Boss')?num:ceil(num*(menu.level==37?game.players*0.1+0.25:menu.level==29?game.players*0.1+0.4:game.players*0.25+0.25)*(game.classicRespawn?2:1)*(menu.level==7?0.6:1)*(menu.level==8?(game.attacker?0.75:1.5):1)*(menu.level==16?0.4:1)*(menu.level==17?(game.attacker?0.4:1):1)*(menu.level==19||menu.level==31||menu.level==42&&!game.pvp?2.5:1)*(menu.level==29||menu.level==37?(types.mission[game.mission].wave.length==1?0.3:1.8):1)*(menu.level==32||menu.level==33?1.2:1)*(menu.level==42?0.5:1)*(menu.weapon==1?2:1)*(menu.weapon==2?1.2:1)*game.diff)} x ${types.mission[game.mission].wave[a][b][0]}`,width/2+(a%4)*210-315+ticker2*210,height/2-265+ticker*14.375+floor(a/4)*310)
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
                            text(`${types.mission[game.mission].wave[a][b][0].includes('Boss')?num:ceil(num*(menu.level==37?game.players*0.1+0.25:menu.level==29?game.players*0.1+0.4:game.players*0.25+0.25)*(game.classicRespawn?2:1)*(menu.level==7?0.6:1)*(menu.level==8?(game.attacker?0.75:1.5):1)*(menu.level==16?0.4:1)*(menu.level==17?(game.attacker?0.4:1):1)*(menu.level==19||menu.level==31||menu.level==42&&!game.pvp?2.5:1)*(menu.level==29||menu.level==37?(types.mission[game.mission].wave.length==1?0.3:1.8):1)*(menu.level==32||menu.level==33?1.2:1)*(menu.level==42?0.5:1)*(menu.weapon==1?2:1)*(menu.weapon==2?1.2:1)*game.diff)} x ${types.mission[game.mission].wave[a][b][0]}`,width/2+(a%4)*210-315,height/2-265+ticker*14.375+floor(a/4)*310)
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
                            text(`${types.mission[game.mission].wave[a][b][0].includes('Boss')?num:ceil(num*(menu.level==37?game.players*0.1+0.25:menu.level==29?game.players*0.1+0.4:game.players*0.25+0.25)*(game.classicRespawn?2:1)*(menu.level==7?0.6:1)*(menu.level==8?(game.attacker?0.75:1.5):1)*(menu.level==16?0.5:1)*(menu.level==17?(game.attacker?0.4:1):1)*(menu.level==19||menu.level==31||menu.level==42&&!game.pvp?2.5:1)*(menu.level==29||menu.level==37?(types.mission[game.mission].wave.length==1?0.3:1.8):1)*(menu.level==32||menu.level==33?1.2*(menu.level==42?0.5:1):1)*(menu.weapon==1?2:1)*(menu.weapon==2?1.2:1)*game.diff)} x ${types.mission[game.mission].wave[a][b][0]}`,width/2+(a%4)*210-315,height/2-265+ticker*14.375+floor(a/4)*310)
                            ticker++
                        }
                    }
                }
            }
        break
        case 'main':
            //let startTime=performance.now()
            
            let effective=[]
            let key=[]
            let bs=[]
            for(let c=0,lc=game.gaming;c<lc;c++){
                if(
                    game.level==15||game.level==18||game.level==30||game.level==36||game.level==37||game.level==38||game.level==40||game.level==41||game.level==43||game.level==44||
                    game.level==49||game.level==51||game.level==52||game.level==55||game.level==56||game.level==59||game.level==60||game.level==61||game.level==62||game.level==65||
                    game.level==67||game.level==68||game.level==69||game.level==71||game.level==72||game.level==73||game.level==74||game.level==75||game.level==77||game.level==78||
                    game.level==79||game.level==81||game.level==82||game.level==83||game.level==85||game.level==92||game.level==93||game.level==95||game.level==96||game.level==97||
                    game.level==98||game.level==99
                ){
                    graphics.main[c].fill(0)
                    graphics.main[c].backgroundPattern(graphics.gradient[0].gradient)
                }else if(
                    game.level==34||game.level==50||game.level==54||game.level==58||game.level==63||game.level==64||game.level==66||game.level==70||game.level==76||game.level==84||
                    game.level==86||game.level==87||game.level==88||game.level==89||game.level==90||game.level==91||game.level==94
                ){
                    graphics.main[c].fill(0)
                    graphics.main[c].backgroundPattern(graphics.gradient[1].gradient)
                }else{
                    graphics.main[c].background(0)
                }
                key.push(1)
                if(game.level==6||game.level==45){
                    key[c]*=0.8
                }
                //key[c]*=10
                bs.push([])
                let side=entities.players[c].weaponType==340||entities.players[c].weaponType==368||entities.players[c].weaponType==369||entities.players[c].weaponType==743&&entities.players[c].subWeaponAType==728?lsin(entities.players[c].direction.back)*graphics.main[c].width*0.425*key[c]:0
                let down=entities.players[c].weaponType==107||entities.players[c].weaponType==166||entities.players[c].weaponType==271||entities.players[c].weaponType==279||entities.players[c].weaponType==282||entities.players[c].weaponType==289||entities.players[c].weaponType==388||entities.players[c].weaponType==416||entities.players[c].weaponType==421||entities.players[c].weaponType==466||entities.players[c].weaponType==486||entities.players[c].weaponType==510||entities.players[c].weaponType==636
                let center=entities.players[c]
                let special=false
                //special=true
                if(entities.players[c].weaponType==275){
                    for(let a=0,la=entities.projectiles.length;a<la;a++){
                        if(entities.projectiles[a].type==163&&entities.projectiles[a].id==entities.players[c].id){
                            center=entities.projectiles[a]
                            a=la
                            special=true
                        }
                    }
                }else if(entities.players[c].playerData.name=='PlayerGuidedMissile'||entities.players[c].assort.missile){
                    for(let a=0,la=entities.projectiles.length;a<la;a++){
                        if((entities.projectiles[a].type==280||entities.projectiles[a].type==316)&&entities.projectiles[a].id==entities.players[c].id){
                            center=entities.projectiles[a]
                            a=la
                            special=true
                            key[c]*=(game.level==7?1.5:game.players>=3?3:2)
                        }
                    }
                }else if(entities.players[c].playerData.name=='PlayerRemoteControl'||entities.players[c].assort.remote){
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(entities.players[a].playerData.name=='ConstructRemote'&&entities.players[a].builder==entities.players[c].index&&entities.players[a].remote){
                            center=entities.players[a]
                            a=la
                            special=true
                        }
                    }
                }else if(entities.players[c].playerData.name=='PlayerDelta'){
                    for(let a=0,la=entities.projectiles.length;a<la;a++){
                        if(entities.projectiles[a].type==316&&entities.projectiles[a].id==entities.players[c].id){
                            center=entities.projectiles[a]
                            a=la
                            special=true
                            key[c]*=(game.level==7?1.5:game.players>=3?3:2)
                        }
                    }
                }else if(entities.players[c].playerData.name=='PlayerHypnosis'){
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(entities.players[a].builder==entities.players[c].index&&entities.players[a].remote){
                            center=entities.players[a]
                            a=la
                            special=true
                        }
                    }
                }
                if(!special){
                    key[c]*=dev.sight?game.edge[0]/graphics.main[0].width*(game.level==44?0.25:1):min(
                        game.edge[0]/graphics.main[0].width,entities.players[c].blindTime>0?0.5:entities.players[c].parachute?(game.level==39||game.level==41||game.level==43||game.level==52?2:3):
                        entities.players[c].weaponType==6||entities.players[c].weaponType==12||entities.players[c].weaponType==92||entities.players[c].weaponType==93||entities.players[c].weaponType==107||
                        entities.players[c].weaponType==132||entities.players[c].weaponType==145||entities.players[c].weaponType==151||entities.players[c].weaponType==154||entities.players[c].weaponType==166||
                        entities.players[c].weaponType==181||entities.players[c].weaponType==236||entities.players[c].weaponType==237||entities.players[c].weaponType==249||entities.players[c].weaponType==271||
                        entities.players[c].weaponType==279||entities.players[c].weaponType==282||entities.players[c].weaponType==288||entities.players[c].weaponType==289||entities.players[c].weaponType==293||
                        entities.players[c].weaponType==298||entities.players[c].weaponType==352||entities.players[c].weaponType==368||entities.players[c].weaponType==369||entities.players[c].weaponType==388||
                        entities.players[c].weaponType==402||entities.players[c].weaponType==416||entities.players[c].weaponType==421||entities.players[c].weaponType==454||entities.players[c].weaponType==460||
                        entities.players[c].weaponType==465||entities.players[c].weaponType==466||entities.players[c].weaponType==486||entities.players[c].weaponType==510||entities.players[c].weaponType==519||
                        entities.players[c].weaponType==530||entities.players[c].weaponType==543||entities.players[c].weaponType==561||entities.players[c].weaponType==574||entities.players[c].weaponType==592||
                        entities.players[c].weaponType==623||entities.players[c].weaponType==626||entities.players[c].weaponType==636||entities.players[c].weaponType==639||entities.players[c].weaponType==642||
                        entities.players[c].weaponType==673||entities.players[c].weaponType==682||entities.players[c].weaponType==697||entities.players[c].weaponType==718||entities.players[c].weaponType==743&&entities.players[c].subWeaponAType==6||
                        entities.players[c].weaponType==769||entities.players[c].weaponType==790||entities.players[c].weaponType==810||entities.players[c].weaponType==835||entities.players[c].weaponType==876||
                        (entities.players[c].weaponType==387||entities.players[c].weaponType==601)&&entities.players[c].subWeaponAType==6
                        ?(game.level==7?1.5:1.75):
                        entities.players[c].weaponType==845?1.3:
                        entities.players[c].weaponType==846?1.2:
                        entities.players[c].weaponType==613?0.75:
                        1
                    )
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
                switch(game.level){
                    case 6: case 45:
                        graphics.main[a].image(
                            graphics.pane[graphics.pane.length-1],graphics.main[a].width/2,graphics.main[a].height/2,graphics.main[a].width,graphics.main[a].height,
                            effective[a][0]-graphics.main[a].width/2*key[a],effective[a][1]-graphics.main[a].height/2*key[a],graphics.main[a].width*key[a],graphics.main[a].height*key[a]
                        )
                    break
                }
                graphics.main[a].push()
                graphics.main[a].translate(graphics.main[a].width/2,graphics.main[a].height/2)
                graphics.main[a].scale(1/key[a])
                if(backed()){
                    graphics.main[a].translate(-round(effective[a][0]),-round(effective[a][1]))
                    for(let b=0,lb=entities.walls[2].length;b<lb;b++){
                        entities.walls[2][b].display(graphics.main[a])
                    }
                    graphics.main[a].translate(-effective[a][0]+round(effective[a][0]),-effective[a][1]+round(effective[a][1]))
                }else{
                    graphics.main[a].translate(-effective[a][0],-effective[a][1])
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
                        if(run.fore[a][b].width>0&&run.fore[a][b].height>0){
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
                                if(a==(backed()?3:2)){
                                    bs[c].push([a,b])
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
                                        if(a==(backed()?3:2)){
                                            bs[c].push([a,b])
                                        }
                                        d=ld
                                    }
                                }
                            }
                            if(a==(backed()?3:2)&&(run.fore[a][b].type==31||run.fore[a][b].type==33||run.fore[a][b].type==36||run.fore[a][b].type==42)&&c==0){
                                run.fore[a][b].displayOver(graphics.main[c])
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
                                            bs[c].push([a,b])
                                        }
                                        d=ld
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for(let a=0,la=game.gaming;a<la;a++){
                if(game.pane){
                    if(!inFullBoxBox({position:{x:effective[a][0],y:effective[a][1]},width:graphics.main[0].width*key[a],height:graphics.main[0].height*key[a]},graphics.panePoint[a])||key[a]!=graphics.key[a]){
                        graphics.pane[a].clear()
                        graphics.pane[a].push()
                        graphics.pane[a].translate(graphics.pane[a].width/2,graphics.pane[a].height/2)
                        graphics.pane[a].scale(1/key[a])
                        graphics.pane[a].translate(-effective[a][0],-effective[a][1])
                        let b2s=[]
                        for(let b=0,lb=entities.walls[0].length;b<lb;b++){
                            if(
                                !(game.level==100&&entities.walls[0][b].type==37)&&
                                entities.walls[0][b].position.x+entities.walls[0][b].width>effective[a][0]-(graphics.main[a].width*key[a]+100)&&
                                entities.walls[0][b].position.x-entities.walls[0][b].width<effective[a][0]+(graphics.main[a].width*key[a]+100)&&
                                entities.walls[0][b].position.y+entities.walls[0][b].height>effective[a][1]-(graphics.main[a].height*key[a]+100)&&
                                entities.walls[0][b].position.y-entities.walls[0][b].height<effective[a][1]+(graphics.main[a].height*key[a]+100)||
                                game.level==7&&a==2&&
                                entities.walls[0][b].internalBounder.position.x+entities.walls[0][b].internalBounder.width>effective[a][0]-(graphics.main[a].width*key[a]+100)&&
                                entities.walls[0][b].internalBounder.position.x-entities.walls[0][b].internalBounder.width<effective[a][0]+(graphics.main[a].width*key[a]+100)&&
                                entities.walls[0][b].internalBounder.position.y+entities.walls[0][b].internalBounder.height>effective[a][1]-(graphics.main[a].height*key[a]+100)&&
                                entities.walls[0][b].internalBounder.position.y-entities.walls[0][b].internalBounder.height<effective[a][1]+(graphics.main[a].height*key[a]+100)
                            ){
                                entities.walls[0][b].display(graphics.pane[a])
                                b2s.push(b)
                            }
                        }
                        if(game.level==30||game.level==56){
                            for(let b=0,lb=entities.walls[0].length;b<lb;b++){
                                if(
                                    entities.walls[0][b].position.x+entities.walls[0][b].width>effective[a][0]-(graphics.main[a].width*key[a]+100)&&
                                    entities.walls[0][b].position.x-entities.walls[0][b].width<effective[a][0]+(graphics.main[a].width*key[a]+100)&&
                                    entities.walls[0][b].position.y+entities.walls[0][b].height>effective[a][1]-(graphics.main[a].height*key[a]+100)&&
                                    entities.walls[0][b].position.y-entities.walls[0][b].height<effective[a][1]+(graphics.main[a].height*key[a]+100)&&
                                    (entities.walls[0][b].type==37)
                                ){
                                    entities.walls[0][b].display(graphics.pane[a])
                                    b2s.push(b)
                                }
                            }
                        }
                        for(let b=0,lb=b2s.length;b<lb;b++){
                            entities.walls[0][b2s[b]].displayOver(graphics.pane[a])
                        }
                        if(game.level==64||game.level==70||game.level==84||game.level==87||game.level==89||game.level==90||game.level==94){
                            for(let b=0,lb=b2s.length;b<lb;b++){
                                entities.walls[0][b2s[b]].displayOver2(graphics.pane[a])
                            }
                        }
                        graphics.pane[a].pop()
                        graphics.panePoint[a].position.x=effective[a][0]
                        graphics.panePoint[a].position.y=effective[a][1]
                        graphics.panePoint[a].width=graphics.main[0].width*key[a]*2
                        graphics.panePoint[a].height=graphics.main[0].height*key[a]*2
                        graphics.key[a]=key[a]
                    }
                    graphics.main[a].image(
                        graphics.pane[a],
                        graphics.panePoint[a].position.x,
                        graphics.panePoint[a].position.y,
                        graphics.panePoint[a].width,
                        graphics.panePoint[a].height
                    )
                }else if(game.level!=15&&game.level!=18&&game.level!=19&&game.level!=22&&game.level!=23&&game.level!=24){
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
                }
                graphics.main[a].noStroke()
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
                        case 20: case 46:
                            graphics.main[a].text('Weapons\nHere',2250,965)
                        break
                        case 21:
                            graphics.main[a].text('Weapons\nHere',3500,1200)
                        break
                        case 22: case 23:
                            if(game.margin){
                                graphics.main[a].noFill()
                                graphics.main[a].stroke(255)
                                graphics.main[a].strokeWeight(10)
                                for(let b=0,lb=game.sectors.length;b<lb;b++){
                                    graphics.main[a].rect(game.sectors[b][0],game.sectors[b][1]*9/8,game.sectors[b][2]-20,game.sectors[b][3]*9/8-20)
                                }
                                graphics.main[a].fill(255)
                                graphics.main[a].noStroke()
                                graphics.main[a].textSize(100)
                                for(let b=0,lb=game.sectors.length;b<lb;b++){
                                    graphics.main[a].text(b,game.sectors[b][0],game.sectors[b][1]*9/8)
                                }
                            }
                        break
                        case 25: case 26: case 27: case 32: case 33: case 34: case 38: case 40: case 42: case 44:
                        case 47: case 49: case 54: case 55: case 58: case 59: case 63: case 65: case 66: case 67:
                        case 68: case 69: case 70: case 76: case 77: case 78: case 79: case 82: case 83: case 84:
                        case 85: case 86: case 88: case 89: case 94: case 95: case 96: case 97: case 98: case 99:
                        case 100:
                            if(game.margin){
                                graphics.main[a].noFill()
                                graphics.main[a].stroke(255)
                                graphics.main[a].strokeWeight(10)
                                for(let b=0,lb=game.sectors.length;b<lb;b++){
                                    graphics.main[a].rect(game.sectors[b][0],game.sectors[b][1],game.sectors[b][2]-20,game.sectors[b][3]-20)
                                }
                                graphics.main[a].fill(255)
                                graphics.main[a].noStroke()
                                graphics.main[a].textSize(100)
                                for(let b=0,lb=game.sectors.length;b<lb;b++){
                                    graphics.main[a].text(b,game.sectors[b][0],game.sectors[b][1])
                                }
                            }
                        break
                        case 30:
                            if(game.margin){
                                graphics.main[a].noFill()
                                graphics.main[a].stroke(255)
                                graphics.main[a].strokeWeight(10)
                                for(let b=0,lb=game.sectors.length;b<lb;b++){
                                    graphics.main[a].rect(game.sectors[b][0],game.sectors[b][1],game.sectors[b][2]-20,game.sectors[b][3]-20)
                                }
                                graphics.main[a].fill(255)
                                graphics.main[a].noStroke()
                                graphics.main[a].textSize(100)
                                for(let b=0,lb=game.sectors.length;b<lb;b++){
                                    graphics.main[a].text(b,game.sectors[b][0],game.sectors[b][1])
                                }
                                graphics.main[a].fill(0,255,0)
                                for(let b=0,lb=levels[game.level].length;b<lb;b++){
                                    for(let c=0,lc=levels[game.level][b].length;c<lc;c++){
                                        if(int(levels[game.level][b][c])>=0){
                                            graphics.main[a].text(int(levels[game.level][b][c]),(c+0.5)*game.tileset[0],(b+0.5)*game.tileset[1])
                                        }
                                    }
                                }
                            }
                        break
                    }
                }
            }
            for(let a=0,la=bs.length;a<la;a++){
                for(let b=0,lb=bs[a].length;b<lb;b++){
                    if(!(bs[a][b][0]==(backed()?3:2)&&(run.fore[bs[a][b][0]][bs[a][b][1]].type==31||run.fore[bs[a][b][0]][bs[a][b][1]].type==33||run.fore[bs[a][b][0]][bs[a][b][1]].type==36||run.fore[bs[a][b][0]][bs[a][b][1]].type==42))){
                        run.fore[bs[a][b][0]][bs[a][b][1]].displayOver(graphics.main[a])
                    }
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
                    if(b<run.update[a].length){
                        run.update[a][b].update()
                        if(run.update[a][b].remove){
                            run.update[a].splice(b,1)
                            b--
                            lb--
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
            displayMain(graphics.main,effective,key)
            switch(game.level){
                case 83:
                    checkEnd(levels[82],graphics.main[0],key)
                break
                default:
                    checkEnd(levels[game.level],graphics.main[0],key)
                break
            }
            inputs.tap=[[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]]
            inputs.release=[[false],[false],[false],[false],[false]]
                    
            /*let endTime=performance.now()
            print(`Main: ${endTime - startTime} milliseconds`)*/

            game.time++
        break
    }
}
function draw(){
    mainloop(graphics.main)
}
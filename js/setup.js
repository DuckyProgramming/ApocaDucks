function setup(){
    setupLists()

    createCanvas(windowWidth-40,windowHeight-40)
    setupGraphics()

    if(false){
        game.classWeapon=true

        game.players=12
        game.gaming=1
        game.level=67
        menu.level=67
        if(true){
            //game.mission=findName('Duckocracy',types.mission)
        }else{
            game.mission=findName('Survival',types.mission)
            generateMission(types.mission[game.mission].wave)
        }
        entities.players=[]
        initialGraphics()
        game.classicWeapon=true
        game.classicRespawn=true
        game.pvp=true
        display.cycle=0
        //newWave()
        game.weapon=[[findName('PlayerSniperC7',types.player)]]
        newLoop()
        stage.scene='main'
        dev.sight=true
        //game.margin=true
        //game.noPlayer=true

        //entities.players[0].newWeaponSet(findName('PlayerScout6',types.player))
    }
}
function windowResized(){
    resizeCanvas(windowWidth-40,windowHeight-40)
}
function mouseClicked(){
    updateMouse(graphics.main[0])
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
                    ['Abandoned','Identify','Rocksalt','Bluefort'],
                ],[
                    ['DoubleMountain','Steel','Sulfate','Process'],
                    ['Downward','Sierra Leone','Fragile','NuclearMountain'],
                    ['Razorpoint','Entropy','Rusted','Tailwater'],
                    ['Abandoned','Cooked','Divider','Blueprint'],
                ],[
                    ['Vietnam','Gray Gravel','Shogatsu','Arizona'],
                    ['Aerial','Alloy','Speleo','Chasm'],
                    ['Identify','Hard Hat','Granary','Rocksalt'],
                    ['Globus','Cranberry','Mill','Rocketyard'],
                ],[
                    ['Pacman','Stalingrad','Prison','Steep'],
                ],[
                    ['Gray Gravel','Shogatsu','Valuation','Basalt'],
                    ['Bluefort','Aerial'],
                ],
            ]
            for(let a=0,la=4+set[menu.mode].length;a<la;a++){
                for(let b=0,lb=a>=4?set[menu.mode][a-4].length:[5,5,3,6][a];b<lb;b++){
                    let pos=[a==3?width/2+b*140-lb*70+70:width/2+b*170-lb*85+85,90+a*55+(a>=2?15:0)+(a>=3?15:0)+(a>=4?15:0)]
                    if(inPointBox({position:inputs.mouse},{position:{x:pos[0],y:pos[1]},width:a==3?120:150,height:45})){
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
                                game.past=b==3&&inPointBox({position:inputs.mouse},{position:{x:pos[0]+30,y:pos[1]},width:60,height:45})
                                menu.mode=b+1
                            break
                            case 4:
                                stage.scene='mission'
                                switch(menu.mode){
                                    case 1:
                                        game.classicRespawn=false
                                        switch(b){
                                            case 0:
                                                menu.level=6
                                                //vietnam
                                            break
                                            case 1:
                                                if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                                    menu.level=8
                                                }else{
                                                    menu.level=17
                                                }
                                                //normandy
                                            break
                                            case 2:
                                                if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                                    menu.level=15
                                                }else{
                                                    menu.level=18
                                                }
                                                //isonzo
                                            break
                                            case 3:
                                                menu.level=16
                                                //stalingrad
                                            break
                                        }
                                    break
                                    case 2:
                                        switch(b){
                                            case 0:
                                                menu.level=19
                                                //doublemountain
                                            break
                                            case 1:
                                                if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                                    menu.level=22
                                                }else{
                                                    menu.level=35
                                                }
                                                game.classicWeapon=true
                                                //steel
                                            break
                                            case 2:
                                                menu.level=25
                                                game.classicWeapon=true
                                                //sulfate
                                            break
                                            case 3:
                                                menu.level=27
                                                //process
                                            break
                                        }
                                    break
                                    case 3:
                                        switch(b){
                                            case 0:
                                                menu.level=19
                                                game.classicWeapon=true
                                                game.pvp=true
                                                //doublemountain
                                            break
                                            case 1:
                                                menu.level=23
                                                game.classicWeapon=true
                                                game.pvp=true
                                                //steel
                                            break
                                            case 2:
                                                menu.level=26
                                                game.classicWeapon=true
                                                game.pvp=true
                                                //sulfate
                                            break
                                            case 3:
                                                menu.level=27
                                                game.classicWeapon=true
                                                game.pvp=true
                                                instant()
                                                //process
                                            break
                                        }
                                    break
                                    case 4:
                                        switch(b){
                                            case 0:
                                                menu.level=45
                                                //vietnam
                                            break
                                            case 1:
                                                menu.level=53
                                                //gray gravel
                                            break
                                            case 2:
                                                menu.level=56
                                                //shogatsu
                                            break
                                            case 3:
                                                menu.level=50
                                                //arizona
                                            break
                                        }
                                        game.pvp=true
                                        game.classicWeapon=true
                                        game.classicRespawn=false
                                        instant()
                                    break
                                    case 5:
                                        switch(b){
                                            case 0:
                                                menu.level=7
                                                game.classicWeapon=true
                                                game.pvp=true
                                                //pacman
                                            break
                                            case 1:
                                                menu.level=16
                                                game.classicWeapon=true
                                                game.pvp=true
                                                //stalingrad
                                            break
                                            case 2:
                                                menu.level=20
                                                game.classicWeapon=true
                                                game.pvp=true
                                                //prison
                                            break
                                            case 3:
                                                menu.level=21
                                                game.classicWeapon=true
                                                game.pvp=true
                                                //steep
                                            break
                                        }
                                    break
                                    case 6:
                                        switch(b){
                                            case 0:
                                                menu.level=29
                                                game.classicRespawn=false
                                                //gray gravel
                                            break
                                            case 1:
                                                menu.level=30
                                                game.classicWeapon=true
                                                game.pvp=true
                                                //shogatsu
                                            break
                                            case 2:
                                                menu.level=37
                                                game.classicWeapon=true
                                                game.pvp=true
                                                game.classicRespawn=false
                                                //prison
                                            break
                                            case 3:
                                                menu.level=54
                                                game.classicWeapon=true
                                                game.pvp=true
                                                //steep
                                            break
                                        }
                                    break
                                }
                                menu.mode=0
                            break
                            case 5:
                                stage.scene='mission'
                                switch(menu.mode){
                                    case 1:
                                        game.classicRespawn=false
                                        switch(b){
                                            case 0:
                                                menu.level=46
                                                //prison
                                            break
                                            case 1:
                                                menu.level=21
                                                //steep
                                            break
                                            case 2:
                                                menu.level=54
                                                game.classicWeapon=true
                                                //basalt
                                            break
                                            case 3:
                                                menu.level=66
                                                game.classicWeapon=true
                                                //abandoned
                                            break
                                        }
                                    break
                                    case 2:
                                        switch(b){
                                            case 0:
                                                menu.level=32
                                                game.classicWeapon=true
                                                //downward
                                            break
                                            case 1:
                                                menu.level=34
                                                //arizona
                                            break
                                            case 2:
                                                menu.level=39
                                                game.classicWeapon=true
                                                game.pvp=true
                                                //fragile
                                            break
                                            case 3:
                                                menu.level=40
                                                game.classicWeapon=true
                                                //alloy
                                            break
                                        }
                                    break
                                    case 3:
                                        switch(b){
                                            case 0:
                                                menu.level=33
                                                game.classicWeapon=true
                                                game.pvp=true
                                                //downward
                                            break
                                            case 1:
                                                menu.level=38
                                                game.classicWeapon=true
                                                game.pvp=true
                                                instant()
                                                //sierra leone
                                            break
                                            case 2:
                                                menu.level=39
                                                game.classicWeapon=true
                                                game.pvp=true
                                                //fragile
                                            break
                                            case 3:
                                                menu.level=42
                                                game.classicWeapon=true
                                                game.pvp=true
                                                //nuclearmountain
                                            break
                                        }
                                    break
                                    case 4:
                                        switch(b){
                                            case 0:
                                                menu.level=36
                                                //aerial
                                            break
                                            case 1:
                                                menu.level=52
                                                //alloy
                                            break
                                            case 2:
                                                menu.level=41
                                                //speleo
                                            break
                                            case 3:
                                                menu.level=51
                                                //chasm
                                            break
                                        }
                                        game.pvp=true
                                        game.classicWeapon=true
                                        game.classicRespawn=false
                                        instant()
                                    break
                                    case 6:
                                        switch(b){
                                            case 0:
                                                menu.level=67
                                                game.pvp=true
                                                menu.players*=4
                                                if(!game.classWeapon){
                                                    game.classicWeapon=true
                                                }
                                                instant()
                                                //bluefort
                                            break
                                            case 1:
                                                menu.level=73
                                                game.pvp=true
                                                game.classicWeapon=true
                                                game.classicRespawn=false
                                                instant()
                                            break
                                        }
                                    break
                                }
                                menu.mode=0
                            break
                            case 6:
                                stage.scene='mission'
                                switch(menu.mode){
                                    case 2:
                                        switch(b){
                                            case 0:
                                                menu.level=42
                                                //nuclearmountain
                                            break
                                            case 1:
                                                menu.level=47
                                                //big ata
                                            break
                                            case 2:
                                                menu.level=49
                                                game.classicWeapon=true
                                                //rusted
                                            break
                                            case 3:
                                                menu.level=55
                                                game.classicWeapon=true
                                                //tailwater
                                            break
                                        }
                                    break
                                    case 3:
                                        switch(b){
                                            case 0:
                                                menu.level=43
                                                game.classicWeapon=true
                                                game.pvp=true
                                                instant()
                                                //razorpoint
                                            break
                                            case 1:
                                                menu.level=44
                                                game.pvp=true
                                                menu.players*=4
                                                if(!game.classWeapon){
                                                    game.classicWeapon=true
                                                }
                                                instant()
                                                //entropy
                                            break
                                            case 2:
                                                menu.level=49
                                                game.classicWeapon=true
                                                game.pvp=true
                                                //rusted
                                            break
                                            case 3:
                                                menu.level=65
                                                game.pvp=true
                                                menu.players*=4
                                                if(!game.classWeapon){
                                                    game.classicWeapon=true
                                                }
                                                instant()
                                                //tailwater
                                            break
                                        }
                                    break
                                    case 4:
                                        switch(b){
                                            case 0:
                                                menu.level=60
                                                //identify
                                            break
                                            case 1:
                                                menu.level=61
                                                //hard hat
                                            break
                                            case 2:
                                                menu.level=62
                                                //granary
                                            break
                                            case 3:
                                                menu.level=64
                                                //rocksalt
                                            break
                                        }
                                        game.pvp=true
                                        game.classicWeapon=true
                                        game.classicRespawn=false
                                        instant()
                                    break
                                }
                                menu.mode=0
                            break
                            case 7:
                                stage.scene='mission'
                                switch(menu.mode){
                                    case 2:
                                        switch(b){
                                            case 0:
                                                menu.level=58
                                                //abandoned
                                            break
                                            case 1:
                                                menu.level=59
                                                game.classicWeapon=true
                                                //identify
                                            break
                                            case 2:
                                                menu.level=70
                                                game.classicWeapon=true
                                                //rocksalt
                                            break
                                            case 3:
                                                menu.level=68
                                                game.classicWeapon=true
                                                //bluefort
                                            break
                                        }
                                    break
                                    case 3:
                                        switch(b){
                                            case 0:
                                                menu.level=63
                                                game.classicWeapon=true
                                                game.pvp=true
                                                //abandoned
                                            break
                                            case 1:
                                                menu.level=69
                                                game.classicWeapon=true
                                                game.pvp=true
                                                //cooked
                                            break
                                            case 2:
                                                menu.level=76
                                                game.pvp=true
                                                menu.players*=4
                                                if(!game.classWeapon){
                                                    game.classicWeapon=true
                                                }
                                                instant()
                                                //divider
                                            break
                                            case 3:
                                                menu.level=28
                                                game.classicWeapon=true
                                                game.pvp=true
                                                instant()
                                                //blueprint
                                            break
                                        }
                                    break
                                    case 4:
                                        switch(b){
                                            case 0:
                                                menu.level=71
                                                //globus
                                            break
                                            case 1:
                                                menu.level=72
                                                //cranberry
                                            break
                                            case 2:
                                                menu.level=74
                                                //mill
                                            break
                                            case 3:
                                                menu.level=75
                                                //rocketyard
                                            break
                                        }
                                        game.pvp=true
                                        game.classicWeapon=true
                                        game.classicRespawn=false
                                        instant()
                                    break
                                }
                                menu.mode=0
                            break
                        }
                        a=la
                        b=lb
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
                    'Shogatsu','Valuation','Sierra Leone','Basalt','',
                ],
            ]
            for(let a=0,la=4+ceil(set[menu.mode].length/5);a<la;a++){
                for(let b=0,lb=[5,5,3,6,constrain(set[menu.mode].length,0,5),constrain(set[menu.mode].length-5,0,5),constrain(set[menu.mode].length-10,0,5)][a];b<lb;b++){
                    let pos=[a==3?width/2+b*140-lb*70+70:width/2+b*170-lb*85+85,90+a*55+(a>=2?15:0)+(a>=3?15:0)+(a>=4?15:0)]
                    if(inPointBox({position:inputs.mouse},{position:{x:pos[0],y:pos[1]},width:a==3?120:150,height:45})){
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
                                menu.mode=b+1
                            break
                            case 4:
                                stage.scene='mission'
                                switch(menu.mode){
                                    case 1:
                                        game.classicRespawn=false
                                        switch(b){
                                            case 0:
                                                menu.level=6
                                            break
                                            case 1:
                                                if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                                    menu.level=8
                                                }else{
                                                    menu.level=17
                                                }
                                            break
                                            case 2:
                                                if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                                    menu.level=15
                                                }else{
                                                    menu.level=18
                                                }
                                            break
                                            case 3:
                                                menu.level=16
                                            break
                                            case 4:
                                                menu.level=46
                                            break
                                        }
                                    break
                                    case 2:
                                        switch(b){
                                            case 0:
                                                menu.level=19
                                            break
                                            case 1:
                                                if(inPointBox({position:inputs.mouse},{position:{x:pos[0]-37.5,y:pos[1]},width:75,height:45})){
                                                    menu.level=22
                                                }else{
                                                    menu.level=35
                                                }
                                                game.classicWeapon=true
                                            break
                                            case 2:
                                                menu.level=25
                                                game.classicWeapon=true
                                            break
                                            case 3:
                                                menu.level=27
                                            break
                                            case 4:
                                                menu.level=32
                                                game.classicWeapon=true
                                            break
                                        }
                                    break
                                    case 3:
                                        switch(b){
                                            case 0:
                                                menu.level=19
                                                game.classicWeapon=true
                                                game.pvp=true
                                            break
                                            case 1:
                                                menu.level=23
                                                game.classicWeapon=true
                                                game.pvp=true
                                            break
                                            case 2:
                                                menu.level=26
                                                game.classicWeapon=true
                                                game.pvp=true
                                            break
                                            case 3:
                                                menu.level=27
                                                game.classicWeapon=true
                                                game.pvp=true
                                                instant()
                                            break
                                            case 4:
                                                menu.level=33
                                                game.classicWeapon=true
                                                game.pvp=true
                                            break
                                        }
                                    break
                                    case 4:
                                        switch(b){
                                            case 0:
                                                menu.level=45
                                            break
                                            case 1:
                                                menu.level=53
                                            break
                                            case 2:
                                                menu.level=56
                                            break
                                            case 3:
                                                menu.level=50
                                            break
                                            case 4:
                                                menu.level=36
                                            break
                                        }
                                        game.pvp=true
                                        game.classicWeapon=true
                                        game.classicRespawn=false
                                        instant()
                                    break
                                    case 5:
                                        switch(b){
                                            case 0:
                                                menu.level=7
                                                game.classicWeapon=true
                                                game.pvp=true
                                            break
                                            case 1:
                                                menu.level=16
                                                game.classicWeapon=true
                                                game.pvp=true
                                            break
                                            case 2:
                                                menu.level=20
                                                game.classicWeapon=true
                                                game.pvp=true
                                            break
                                            case 3:
                                                menu.level=21
                                                game.classicWeapon=true
                                                game.pvp=true
                                            break
                                            case 4:
                                                menu.level=28
                                                game.classicWeapon=true
                                                game.pvp=true
                                                instant()
                                            break
                                        }
                                    break
                                    case 6:
                                        switch(b){
                                            case 0:
                                                menu.level=30
                                                game.classicWeapon=true
                                                game.pvp=true
                                            break
                                            case 1:
                                                menu.level=37
                                                game.classicWeapon=true
                                                game.pvp=true
                                                game.classicRespawn=false
                                            break
                                            case 2:
                                                menu.level=38
                                                game.classicWeapon=true
                                                game.pvp=true
                                                instant()
                                            break
                                            case 3:
                                                menu.level=54
                                                game.classicWeapon=true
                                                game.pvp=true
                                            break
                                        }
                                    break
                                }
                                menu.mode=0
                            break
                            case 5:
                                stage.scene='mission'
                                switch(menu.mode){
                                    case 1:
                                        game.classicRespawn=false
                                        switch(b){
                                            case 0:
                                                menu.level=21
                                            break
                                            case 1:
                                                menu.level=29
                                            break
                                            case 2:
                                                menu.level=54
                                                game.classicWeapon=true
                                            break
                                        }
                                    break
                                    case 2:
                                        switch(b){
                                            case 0:
                                                menu.level=34
                                            break
                                            case 1:
                                                menu.level=39
                                                game.classicWeapon=true
                                                game.pvp=true
                                            break
                                            case 2:
                                                menu.level=40
                                                game.classicWeapon=true
                                            break
                                            case 3:
                                                menu.level=42
                                            break
                                            case 4:
                                                menu.level=47
                                            break
                                        }
                                    break
                                    case 3:
                                        switch(b){
                                            case 0:
                                                menu.level=39
                                                game.classicWeapon=true
                                                game.pvp=true
                                            break
                                            case 1:
                                                menu.level=42
                                                game.classicWeapon=true
                                                game.pvp=true
                                            break
                                            case 2:
                                                menu.level=43
                                                game.classicWeapon=true
                                                game.pvp=true
                                                instant()
                                            break
                                            case 3:
                                                menu.level=44
                                                game.pvp=true
                                                menu.players*=4
                                                if(!game.classWeapon){
                                                    game.classicWeapon=true
                                                }
                                                instant()
                                            break
                                        }
                                    break
                                    case 4:
                                        switch(b){
                                            case 0:
                                                menu.level=52
                                            break
                                            case 1:
                                                menu.level=40
                                            break
                                            case 2:
                                                menu.level=51
                                            break
                                            case 3:
                                                menu.level=60
                                            break
                                            case 4:
                                                menu.level=61
                                            break
                                        }
                                        game.pvp=true
                                        game.classicWeapon=true
                                        game.classicRespawn=false
                                        instant()
                                    break
                                }
                                menu.mode=0
                            break
                            case 6:
                                stage.scene='mission'
                                switch(menu.mode){
                                    case 2:
                                        switch(b){
                                            case 0:
                                                menu.level=49
                                                game.classicWeapon=true
                                            break
                                            case 1:
                                                menu.level=55
                                                game.classicWeapon=true
                                            break
                                            case 2:
                                                menu.level=58
                                            break
                                            case 3:
                                                menu.level=59
                                                game.classicWeapon=true
                                            break
                                        }
                                    break
                                }
                                menu.mode=0
                            break
                        }
                    }
                }
            }
        break
        case 'mission':
            for(let a=0,la=1+(menu.mode==0?0:ceil(menu.list[menu.mode-1].length/5));a<la;a++){
                for(let b=0,lb=a==0?6:constrain(menu.list[menu.mode-1].length+5-a*5,0,5);b<lb;b++){
                    game.smile=floor(random(0,25))==0
                    if(a==0){
                        let pos=[width/2+b*140-lb*70+70,60+a*55+40]
                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0],y:pos[1]},width:120,height:45})){
                            menu.mode=b+1
                        }
                    }else{
                        let pos=[width/2+b*170-lb*85+85,60+a*55+40]
                        if(inPointBox({position:inputs.mouse},{position:{x:pos[0],y:pos[1]},width:150,height:45})){
                            let unit=menu.list[menu.mode-1][a*5+b-5]
                            game.players=menu.players
                            game.gaming=menu.gaming
                            if(game.classicWeapon||game.randomizer||game.selector){
                                game.level=game.pvp&&menu.level==22?23:game.pvp&&menu.level==25?26:menu.level
                            }else{
                                game.level=game.classWeapon?(teamMode()?57:48):13
                            }
                            game.mission=unit
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
                                if(types.mission[game.mission].name=='Patchwork'){
                                    compileMission(types.mission[game.mission].wave)
                                }else{
                                    generateMission(types.mission[game.mission].wave,types.mission[game.mission].name=='Survival Lite')
                                }
                            }
                            if(game.usurp){
                                game.usurpIndex=floor(random(0,game.players))
                        }
                        }
                    }
                }
            }
        break
        case 'menuFull':
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
        case 'missionFull':
            let tick=0
            for(let a=0,la=11;a<la;a++){
                for(let b=0,lb=[5,5,5,5,5,5,5,5,5,5,3][a];b<lb;b++){
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
                            game.level=game.classWeapon?(teamMode()?57:48):13
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
        game.level=game.classWeapon?(teamMode()?57:48):13
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
        case 'ArrowDown': case '/': inputs.keys[0][3]=true;inputs.tap[0][3]=true; break
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
        case 'ArrowDown': case '/': inputs.keys[0][3]=false; break
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
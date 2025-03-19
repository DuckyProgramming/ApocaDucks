class wall{
    constructor(layer,x,y,width,height,type){
        this.layer=layer
        this.position={x:x,y:y}
        this.width=width
        this.height=height
        this.type=type
        this.collide=[entities.projectiles,entities.players]
        this.redundant=[false,false,false,false,false,false,false,false,false],
        this.standard=this.type!=5&&this.type!=7&&this.type!=8&&this.type!=9&&this.type!=10&&this.type!=11&&this.type!=12&&this.type!=14&&this.type!=16&&this.type!=27&&this.type!=31&&this.type!=33&&this.type!=36&&this.type!=39&&this.type!=42
        this.velocity={x:0,y:0}
        this.boundary=[
            [[{x:this.position.x-this.width/2,y:this.position.y+this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
            [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y-this.height/2}]],
            [[{x:this.position.x+this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
            [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x-this.width/2,y:this.position.y+this.height/2}]],
        ]
        this.exploded=false
        this.mutate=false
        this.time=0
        this.align=-1
        this.gapper=[]
    }
    set(){
        this.reload=-1
        switch(this.type){
            case 1: case 2:
                if(game.level==6){
                    this.balls=[]
                    for(let a=0,la=this.width*this.height/450;a<la;a++){
                        this.balls.push([-this.width/2+(a*0.19%1)*this.width,random(-this.height/2,this.height/2),random(30,40),random(0,1),random(0,360),floor(random(4,9))])
                    }
                }else if(game.level==8||game.level==17){
                    this.balls=[]
                    for(let a=0,la=(this.width-10)*(this.height-10)/800;a<la;a++){
                        this.balls.push([-this.width/2+(a*0.205%1)*(this.width-10)+5,random(-this.height/2+5,this.height/2-5),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                    }
                }
                if(this.type==2&&game.level==19){
                    this.reload=0
                }
            break
            case 4: case 13: case 15: case 23: case 32: case 35: case 40:
                this.reload=0
                if(this.type==35){
                    this.target=1
                }
            break
            case 6:
                this.carry=[]
                this.disable=false
            break
            case 7:
                if(game.level==25||game.level==26){
                    this.pos=[]
                    for(let a=0,la=this.height/game.tileset[1]*3;a<la;a++){
                        this.pos.push(-this.width*0.8+(this.position.x+this.position.y*0.3+a*51)%(this.width*1.6))
                    }
                }
            break
            case 8: case 9: case 12: case 16: case 27: case 41: case 50:
                this.recharge=0
                this.falling=0
                this.infoFade=0
                this.findFall()
                if(game.level==23||game.level==25||game.level==26||game.level==28){
                    this.visible=0
                    if(this.type==27){
                        let chunk=game.peakWeapon?1:0
                        this.weapon=listing[chunk][floor(random(listing[chunk].length))]
                        this.ammo=types.weapon[types.player[this.weapon].weapon].ammo
                        this.uses=types.weapon[types.player[this.weapon].weapon].uses==1?types.weapon[types.player[this.weapon].weapon].uses:types.weapon[types.player[this.weapon].weapon].uses*game.ammoMult
                    }else if(this.type==50){
                        this.weapon=listing[1][floor(random(listing[1].length))]
                    }
                }
            break
            case 11:
                this.keyPoint=-1
                if(game.level==23){
                    for(let a=0,la=9;a<la;a++){
                        if(abs(entities.players[game.players+a].position.x-this.position.x)<this.width+80&&abs(entities.players[game.players+a].position.y-this.position.y)<60){
                            this.keyPoint=a
                        }
                    }
                }
            break
            case 17: case 44:
                if(game.level==8||game.level==17){
                    this.balls=[]
                    for(let a=0,la=(this.width-10)*(this.height-10)/1600;a<la;a++){
                        let pos=(a*0.205%1)
                        this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5+(this.height-10)*pos,this.height/2-5),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                    }
                }
            break
            case 18: case 45:
                if(game.level==8||game.level==17){
                    this.balls=[]
                    for(let a=0,la=(this.width-10)*(this.height-10)/1600;a<la;a++){
                        let pos=(a*0.205%1)
                        this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5+(this.height-10)*(1-pos),this.height/2-5),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                    }
                }
            break
            case 20: case 46:
                if(game.level==8||game.level==17){
                    this.balls=[]
                    for(let a=0,la=(this.width-10)*(this.height-10)/1600;a<la;a++){
                        let pos=(a*0.205%1)
                        this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5,-this.height/2+5+(this.height-10)*(1-pos)),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                    }
                }
            break
            case 21: case 47:
                if(game.level==8||game.level==17){
                    this.balls=[]
                    for(let a=0,la=(this.width-10)*(this.height-10)/1600;a<la;a++){
                        let pos=(a*0.205%1)
                        this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5,-this.height/2+5+(this.height-10)*pos),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                    }
                }
            break
            case 31:
                this.owner=game.level==27&&game.pvp?[1,1,2,2][this.pos]:(game.level==22||game.level==23)&&!game.pvp&&!game.attacker?floor(random(1,game.players+1)):-1
                entities.players.push(new player(graphics.main[1],this.position.x,this.position.y-50,this.owner,0,[],false,findName('Fort',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].fortify()
                entities.players[entities.players.length-1].fortHealth()
                this.index=entities.players.length-1
                if(game.level==22){
                    entities.players[entities.players.length-1].multLife(9)
                }else if(game.level==24){
                    this.timers=[]
                    for(let a=0,la=game.players;a<la;a++){
                        this.timers.push(0)
                    }
                }
            break
            case 33:
                this.owner=game.level==27&&game.pvp?[1,1,2,2][this.pos]:(game.level==22||game.level==23||game.level==25||game.level==26)&&!game.pvp&&!game.attacker?floor(random(1,game.players+1)):-1
                entities.players.push(new player(graphics.main[1],this.position.x,this.position.y-50,this.owner,0,[],false,findName('Turret',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].fortify()
                entities.players[entities.players.length-1].fortHealth()
                this.index=entities.players.length-1
                if(game.level==22){
                    entities.players[entities.players.length-1].multLife(3)
                }else if(game.level==23||game.level==26||game.level==28){
                    this.timers=[]
                    for(let a=0,la=game.players;a<la;a++){
                        this.timers.push(0)
                    }
                    this.raided=0
                    this.loc=[[],[]]
                    this.raidTick=0
                }
            break
            case 36:
                this.owner=(game.level==22||game.level==23||game.level==25||game.level==26)&&!game.pvp&&!game.attacker?floor(random(1,game.players+1)):-1
                entities.players.push(new player(graphics.main[1],this.position.x,this.position.y-50,this.owner,0,[],false,findName('Outpost',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].fortify()
                entities.players[entities.players.length-1].fortHealth()
                this.index=entities.players.length-1
                if(game.level==22){
                    entities.players[entities.players.length-1].multLife(3)
                }
            break
            case 42:
                this.owner=(game.level==22||game.level==23||game.level==25||game.level==26)&&!game.pvp&&!game.attacker?floor(random(1,game.players+1)):-1
                entities.players.push(new player(graphics.main[1],this.position.x,this.position.y-50,this.owner,0,[],false,findName('Rogue',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].auto=true
                entities.players[entities.players.length-1].fortify()
                entities.players[entities.players.length-1].fortHealth()
                this.index=entities.players.length-1
                if(game.level==22){
                    entities.players[entities.players.length-1].multLife(3)
                }
            break
            case 49:
                this.balls=[]
                for(let a=0,la=this.width*this.height/225;a<la;a++){
                    this.balls.push([-this.width/2+(a*0.19%1)*this.width,random(-this.height/2,this.height/2),random(30,40),random(0,1),random(0,360),floor(random(4,7))])
                }
            break
            case 51:
                this.balls=[]
                for(let a=0,la=(this.width-10)*(this.height-10)/450;a<la;a++){
                    let pos=(a*0.205%1)
                    this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5+(this.height-10)*pos,this.height/2-5),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                }
            break
            case 52:
                this.balls=[]
                for(let a=0,la=(this.width-10)*(this.height-10)/450;a<la;a++){
                    let pos=(a*0.205%1)
                    this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5+(this.height-10)*(1-pos),this.height/2-5),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                }
            break
            case 53:
                this.balls=[]
                for(let a=0,la=(this.width-10)*(this.height-10)/450;a<la;a++){
                    let pos=(a*0.205%1)
                    this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5,-this.height/2+5+(this.height-10)*(1-pos)),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                }
            break
            case 54:
                this.balls=[]
                for(let a=0,la=(this.width-10)*(this.height-10)/450;a<la;a++){
                    let pos=(a*0.205%1)
                    this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5,-this.height/2+5+(this.height-10)*pos),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                }
            break
        }
    }
    checkHorizontal(){
        if(!this.remove){
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    let c=entities.walls[a][b]
                    if(c.type==this.type&&(c.position.x!=this.position.x||c.position.y!=this.position.y)&&!c.remove){
                        if(abs(this.height-c.height)<1&&abs(c.position.x-(this.position.x+this.width/2+c.width/2))<1&&abs(c.position.y-this.position.y)<1&&!c.remove){
                            this.width+=c.width
                            this.position.x+=c.width/2
                            Array.prototype.push.apply(this.gapper,c.gapper)
                            c.remove=true
                        }
                    }
                }
            }
        }
    }
    checkVertical(){
        if(!this.remove){
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    let c=entities.walls[a][b]
                    if(c.type==this.type&&(c.position.x!=this.position.x||c.position.y!=this.position.y)&&!c.remove){
                        if(abs(this.width-c.width)<1&&abs(c.position.y-(this.position.y+this.height/2+c.height/2))<1&&abs(c.position.x-this.position.x)<1&&!c.remove){
                            this.height+=c.height
                            this.position.y+=c.height/2
                            Array.prototype.push.apply(this.gapper,c.gapper)
                            c.remove=true
                        }
                    }
                }
            }
        }
    }
    formBoundary(){
        switch(this.type){
            case 17: case 44: case 51:
                this.boundary=[
                    [[{x:this.position.x-this.width/2,y:this.position.y+this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
                    [],
                    [],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x-this.width/2,y:this.position.y+this.height/2}]],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
                    [],
                    [],
                    [],
                ]
                this.triangle=[
                    {x:this.position.x-this.width/2,y:this.position.y-this.height/2},
                    {x:this.position.x-this.width/2,y:this.position.y+this.height/2},
                    {x:this.position.x+this.width/2,y:this.position.y+this.height/2}
                ]
            break
            case 18: case 45: case 52:
                this.boundary=[
                    [[{x:this.position.x-this.width/2,y:this.position.y+this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
                    [],
                    [[{x:this.position.x+this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
                    [],
                    [],
                    [[{x:this.position.x+this.width/2,y:this.position.y-this.height/2},{x:this.position.x-this.width/2,y:this.position.y+this.height/2}]],
                    [],
                    [],
                ]
                this.triangle=[
                    {x:this.position.x+this.width/2,y:this.position.y-this.height/2},
                    {x:this.position.x-this.width/2,y:this.position.y+this.height/2},
                    {x:this.position.x+this.width/2,y:this.position.y+this.height/2}
                ]
            break
            case 20: case 46: case 53:
                this.boundary=[
                    [],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y-this.height/2}]],
                    [],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x-this.width/2,y:this.position.y+this.height/2}]],
                    [],
                    [],
                    [[{x:this.position.x-this.width/2,y:this.position.y+this.height/2},{x:this.position.x+this.width/2,y:this.position.y-this.height/2}]],
                    [],
                ]
                this.triangle=[
                    {x:this.position.x-this.width/2,y:this.position.y-this.height/2},
                    {x:this.position.x-this.width/2,y:this.position.y+this.height/2},
                    {x:this.position.x+this.width/2,y:this.position.y-this.height/2}
                ]
            break
            case 21: case 47: case 54:
                this.boundary=[
                    [],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y-this.height/2}]],
                    [[{x:this.position.x+this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
                    [],
                    [],
                    [],
                    [],
                    [[{x:this.position.x+this.width/2,y:this.position.y+this.height/2},{x:this.position.x-this.width/2,y:this.position.y-this.height/2}]],
                ]
                this.triangle=[
                    {x:this.position.x+this.width/2,y:this.position.y-this.height/2},
                    {x:this.position.x-this.width/2,y:this.position.y-this.height/2},
                    {x:this.position.x+this.width/2,y:this.position.y+this.height/2}
                ]
            break
            default:
                this.boundary=[
                    [[{x:this.position.x-this.width/2,y:this.position.y+this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y-this.height/2}]],
                    [[{x:this.position.x+this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x-this.width/2,y:this.position.y+this.height/2}]],
                    [],
                    [],
                    [],
                    [],
                ]
            break
        }
        for(let a=0,la=this.gapper.length;a<la;a++){
            for(let b=0,lb=this.boundary[1].length;b<lb;b++){
                if(this.boundary[1][b][1].x==this.gapper[a][1]){
                    this.boundary[1][b][1].x=this.gapper[a][0]
                }else if(this.boundary[1][b][0].x==this.gapper[a][0]){
                    this.boundary[1][b][0].x=this.gapper[a][1]
                }else if(this.boundary[1][b][0].x<this.gapper[a][0]&&this.boundary[1][b][1].x>this.gapper[a][1]){
                    this.boundary[1].push([{x:this.gapper[a][1],y:this.boundary[1][b][1].y},{x:this.boundary[1][b][1].x,y:this.boundary[1][b][1].y}])
                    this.boundary[1][b][1].x=this.gapper[a][0]
                }
            }
        }
    }
    checkPrimary(){
        if(this.position.y+this.height/2>=game.edge[1]-1){
            this.redundant[0]=true
            this.boundary[0]=[]
        }
        if(this.position.y-this.height/2<=1){
            this.redundant[1]=true
            this.boundary[1]=[]
        }
        if(this.position.x+this.width/2>=game.edge[0]-1){
            this.redundant[2]=true
            this.boundary[2]=[]
        }
        if(this.position.x-this.width/2<=1){
            this.redundant[3]=true
            this.boundary[3]=[]
        }
    }
    checkRedundancy(){
        for(let a=0,la=entities.walls.length;a<la;a++){
            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                let c=entities.walls[a][b]
                if(c.standard&&this.type!=38&&c.type!=38&&(c.position.x!=this.position.x||c.position.y!=this.position.y)){
                    if(c.type==17||c.type==18||c.type==20||c.type==21){
                        if(
                            inPointTriangle({x:this.position.x-this.width/2,x:this.position.y+this.height/2},c.triangle)&&
                            inPointTriangle({x:this.position.x+this.width/2,x:this.position.y+this.height/2},c.triangle)
                        ){
                            this.redundant[0]=true
                            this.boundary[0]=[]
                        }
                        if(
                            inPointTriangle({x:this.position.x-this.width/2,x:this.position.y-this.height/2},c.triangle)&&
                            inPointTriangle({x:this.position.x+this.width/2,x:this.position.y-this.height/2},c.triangle)&&
                            c.gapper.length==0
                        ){
                            this.redundant[1]=true
                            this.boundary[1]=[]
                        }
                        if(
                            inPointTriangle({x:this.position.x+this.width/2,y:this.position.y-this.height/2},c.triangle)&&
                            inPointTriangle({x:this.position.x+this.width/2,y:this.position.y+this.height/2},c.triangle)
                        ){
                            this.redundant[2]=true
                            this.boundary[2]=[]
                        }
                        if(
                            inPointTriangle({x:this.position.x-this.width/2,y:this.position.y-this.height/2},c.triangle)&&
                            inPointTriangle({x:this.position.x-this.width/2,y:this.position.y+this.height/2},c.triangle)
                        ){
                            this.redundant[3]=true
                            this.boundary[3]=[]
                        }
                    }else{
                        if(
                            this.position.y+this.height/2>c.position.y-c.height/2-1&&this.position.y+this.height/2<c.position.y+c.height/2+1&&
                            c.position.x-c.width/2<=this.position.x-this.width/2+1&&c.position.x+c.width/2>=this.position.x+this.width/2-1
                        ){
                            this.redundant[0]=true
                            this.boundary[0]=[]
                        }
                        if(
                            this.position.y-this.height/2>c.position.y-c.height/2-1&&this.position.y-this.height/2<c.position.y+c.height/2+1&&
                            c.position.x-c.width/2<=this.position.x-this.width/2+1&&c.position.x+c.width/2>=this.position.x+this.width/2-1&&
                            c.gapper.length==0
                        ){
                            this.redundant[1]=true
                            this.boundary[1]=[]
                        }
                        if(
                            this.position.x+this.width/2>c.position.x-c.width/2-1&&this.position.x+this.width/2<c.position.x+c.width/2+1&&
                            c.position.y-c.height/2<=this.position.y-this.height/2+1&&c.position.y+c.height/2>=this.position.y+this.height/2-1
                        ){
                            this.redundant[2]=true
                            this.boundary[2]=[]
                        }
                        if(
                            this.position.x-this.width/2>c.position.x-c.width/2-1&&this.position.x-this.width/2<c.position.x+c.width/2+1&&
                            c.position.y-c.height/2<=this.position.y-this.height/2+1&&c.position.y+c.height/2>=this.position.y+this.height/2-1
                        ){
                            this.redundant[3]=true
                            this.boundary[3]=[]
                        }
                    }
                    if(abs(c.position.y-(this.position.y-this.height/2-c.height/2-15))<50&&c.position.y!=this.position.y&&c.position.x-c.width/2<=this.position.x-this.width/2+1&&c.position.x+c.width/2>=this.position.x+this.width/2-1){
                        this.redundant[8]=true
                    }
                }
            }
        }
    }
    checkOverlay(){
        for(let a=0,la=entities.walls.length;a<la;a++){
            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                let c=entities.walls[a][b]
                if(c.standard&&this.type!=38&&c.type!=38){
                    for(let d=0,ld=this.boundary[0].length;d<ld;d++){
                        if(abs(c.position.y-(this.position.y+this.height/2+c.height/2))<1&&c.position.x-c.width/2<this.boundary[0][d][0].x+1&&c.position.x+c.width/2>this.boundary[0][d][1].x-1){
                            this.boundary[0].splice(d,1)
                            d--
                            ld--
                        }
                    }
                    for(let d=0,ld=this.boundary[1].length;d<ld;d++){
                        if(abs(c.position.y-(this.position.y-this.height/2-c.height/2))<1&&c.position.x-c.width/2<this.boundary[1][d][0].x+1&&c.position.x+c.width/2>this.boundary[1][d][1].x-1){
                            this.boundary[1].splice(d,1)
                            d--
                            ld--
                        }
                    }
                    for(let d=0,ld=this.boundary[2].length;d<ld;d++){
                        if(abs(c.position.x-(this.position.x+this.width/2+c.width/2))<1&&c.position.y-c.height/2<this.boundary[2][d][0].y+1&&c.position.y+c.height/2>this.boundary[2][d][1].y-1){
                            this.boundary[2].splice(d,1)
                            d--
                            ld--
                        }
                    }
                    for(let d=0,ld=this.boundary[3].length;d<ld;d++){
                        if(abs(c.position.x-(this.position.x-this.width/2-c.width/2))<1&&c.position.y-c.height/2<this.boundary[3][d][0].y+1&&c.position.y+c.height/2>this.boundary[3][d][1].y-1){
                            this.boundary[3].splice(d,1)
                            d--
                            ld--
                        }
                    }
                    for(let d=0,ld=this.boundary[0].length;d<ld;d++){
                        if(abs(c.position.y-(this.position.y+this.height/2+c.height/2))<1&&c.position.x-c.width/2>this.boundary[0][d][0].x+1&&c.position.x+c.width/2<this.boundary[0][d][1].x-1){
                            this.boundary[0].push([{x:c.position.x+c.width/2,y:this.boundary[0][d][0].y},{x:this.boundary[0][d][1].x,y:this.boundary[0][d][1].y}])
                            this.boundary[0][d][1].x=c.position.x-c.width/2
                        }
                    }
                    for(let d=0,ld=this.boundary[1].length;d<ld;d++){
                        if(abs(c.position.y-(this.position.y-this.height/2-c.height/2))<1&&c.position.x-c.width/2>this.boundary[1][d][0].x+1&&c.position.x+c.width/2<this.boundary[1][d][1].x-1){
                            this.boundary[1].push([{x:c.position.x+c.width/2,y:this.boundary[1][d][0].y},{x:this.boundary[1][d][1].x,y:this.boundary[1][d][1].y}])
                            this.boundary[1][d][1].x=c.position.x-c.width/2
                        }
                    }
                    for(let d=0,ld=this.boundary[2].length;d<ld;d++){
                        if(abs(c.position.x-(this.position.x+this.width/2+c.width/2))<1&&c.position.y-c.height/2>this.boundary[2][d][0].y+1&&c.position.y+c.height/2<this.boundary[2][d][1].y-1){
                            this.boundary[2].push([{x:this.boundary[2][d][0].x,y:c.position.y+c.height/2},{x:this.boundary[2][d][1].x,y:this.boundary[2][d][1].y}])
                            this.boundary[2][d][1].y=c.position.y-c.height/2
                        }
                    }
                    for(let d=0,ld=this.boundary[3].length;d<ld;d++){
                        if(abs(c.position.x-(this.position.x-this.width/2-c.width/2))<1&&c.position.y-c.height/2>this.boundary[3][d][0].y+1&&c.position.y+c.height/2<this.boundary[3][d][1].y-1){
                            this.boundary[3].push([{x:this.boundary[3][d][0].x,y:c.position.y+c.height/2},{x:this.boundary[3][d][1].x,y:this.boundary[3][d][1].y}])
                            this.boundary[3][d][1].y=c.position.y-c.height/2
                        }
                    }
                    for(let d=0,ld=2;d<ld;d++){
                        for(let e=0,le=this.boundary[0].length;e<le;e++){
                            if(abs(c.position.y-(this.position.y+this.height/2+c.height/2))<1&&c.position.x-c.width/2<=this.boundary[0][e][d].x+1&&c.position.x+c.width/2>=this.boundary[0][e][d].x-1){
                                this.boundary[0][e][d].x=c.position.x+c.width/2*(1-d*2)
                            }
                        }
                        for(let e=0,le=this.boundary[1].length;e<le;e++){
                            if(abs(c.position.y-(this.position.y-this.height/2-c.height/2))<1&&c.position.x-c.width/2<=this.boundary[1][e][d].x+1&&c.position.x+c.width/2>=this.boundary[1][e][d].x-1){
                                this.boundary[1][e][d].x=c.position.x+c.width/2*(1-d*2)
                            }
                        }
                        for(let e=0,le=this.boundary[2].length;e<le;e++){
                            if(abs(c.position.x-(this.position.x+this.width/2+c.width/2))<1&&c.position.y-c.height/2<=this.boundary[2][e][d].y+1&&c.position.y+c.height/2>=this.boundary[2][e][d].y-1){
                                this.boundary[2][e][d].y=c.position.y+c.height/2*(1-d*2)
                            }
                        }
                        for(let e=0,le=this.boundary[3].length;e<le;e++){
                            if(abs(c.position.x-(this.position.x-this.width/2-c.width/2))<1&&c.position.y-c.height/2<=this.boundary[3][e][d].y+1&&c.position.y+c.height/2>=this.boundary[3][e][d].y-1){
                                this.boundary[3][e][d].y=c.position.y+c.height/2*(1-d*2)
                            }
                        }
                    }
                }
            }
        }
    }
    checkGap(){
        for(let a=0,la=4;a<la;a++){
            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                if(dist(this.boundary[a][b][0].x,this.boundary[a][b][0].y,this.boundary[a][b][1].x,this.boundary[a][b][1].y)<5){
                    this.boundary[a].splice(b,1)
                    b--
                    lb--
                }
            }
        }
    }
    checkBar(){
        for(let a=0,la=entities.walls.length;a<la;a++){
            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                let c=entities.walls[a][b]
                if((c.position.x!=this.position.x||c.position.y!=this.position.y)&&(c.type==this.type||([1,17,18,20,21].includes(this.type)&&[1,17,18,20,21].includes(c.type)))){
                    for(let d=0,ld=2;d<ld;d++){
                        if(abs((this.position.y+this.height/2)-(c.position.y+c.height/2))<1&&!this.redundant[0]&&!c.redundant[0]){
                            for(let e=0,le=this.boundary[0].length;e<le;e++){
                                for(let f=0,lf=c.boundary[0].length;f<lf;f++){
                                    if(abs(this.boundary[0][e][d].x-c.boundary[0][f][1-d].x)<1){
                                        this.boundary[0][e][d].x=c.boundary[0][f][d].x
                                        c.boundary[0].splice(f,1)
                                        f--
                                        lf--
                                    }
                                }
                            }
                        }
                        if(abs((this.position.y-this.height/2)-(c.position.y-c.height/2))<1&&!this.redundant[1]&&!c.redundant[1]){
                            for(let e=0,le=this.boundary[1].length;e<le;e++){
                                for(let f=0,lf=c.boundary[1].length;f<lf;f++){
                                    if(abs(this.boundary[1][e][d].x-c.boundary[1][f][1-d].x)<1){
                                        this.boundary[1][e][d].x=c.boundary[1][f][d].x
                                        c.boundary[1].splice(f,1)
                                        f--
                                        lf--
                                    }
                                }
                            }
                        }
                        if(abs((this.position.x+this.width/2)-(c.position.x+c.width/2))<1&&!this.redundant[2]&&!c.redundant[2]){
                            for(let e=0,le=this.boundary[2].length;e<le;e++){
                                for(let f=0,lf=c.boundary[2].length;f<lf;f++){
                                    if(abs(this.boundary[2][e][d].y-c.boundary[2][f][1-d].y)<1){
                                        this.boundary[2][e][d].y=c.boundary[2][f][d].y
                                        c.boundary[2].splice(f,1)
                                        f--
                                        lf--
                                    }
                                }
                            }
                        }
                        if(abs((this.position.x-this.width/2)-(c.position.x-c.width/2))<1&&!this.redundant[3]&&!c.redundant[3]){
                            for(let e=0,le=this.boundary[3].length;e<le;e++){
                                for(let f=0,lf=c.boundary[3].length;f<lf;f++){
                                    if(abs(this.boundary[3][e][d].y-c.boundary[3][f][1-d].y)<1){
                                        this.boundary[3][e][d].y=c.boundary[3][f][d].y
                                        c.boundary[3].splice(f,1)
                                        f--
                                        lf--
                                    }
                                }
                            }
                        }
                        if(c.type==this.type){
                            for(let g=4,lg=8;g<lg;g++){
                                if(this.boundary[g].length>0&&c.boundary[g].length>0&&abs(this.width/this.height-c.width/c.height)<0.01){
                                    for(let e=0,le=this.boundary[g].length;e<le;e++){
                                        for(let f=0,lf=c.boundary[g].length;f<lf;f++){
                                            if(abs(this.boundary[g][e][d].x-c.boundary[g][f][1-d].x)<1&&abs(this.boundary[g][e][d].y-c.boundary[g][f][1-d].y)<1&&(c.boundary[g][f][d].y>this.boundary[g][e][d].y&&g<6||c.boundary[g][f][d].y<this.boundary[g][e][d].y&&g>=6)){
                                                this.boundary[g][e][d].x=c.boundary[g][f][d].x
                                                this.boundary[g][e][d].y=c.boundary[g][f][d].y
                                                c.boundary[g].splice(f,1)
                                                f--
                                                lf--
                                                this.checkBar()
                                            }else if(abs(this.boundary[g][e][d].x-c.boundary[g][f][d].x)<1&&abs(this.boundary[g][e][d].y-c.boundary[g][f][d].y)<1&&(c.boundary[g][f][1-d].y>this.boundary[g][e][d].y&&g<6||c.boundary[g][f][1-d].y<this.boundary[g][e][d].y&&g>=6)){
                                                this.boundary[g][e][d].x=c.boundary[g][f][1-d].x
                                                this.boundary[g][e][d].y=c.boundary[g][f][1-d].y
                                                c.boundary[g].splice(f,1)
                                                f--
                                                lf--
                                                this.checkBar()
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    formBounder(){
        let bounds=[this.position.x-this.width/2,this.position.x+this.width/2,this.position.y-this.height/2,this.position.y+this.height/2]
        for(let a=0,la=this.boundary.length;a<la;a++){
            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                for(let c=0,lc=2;c<lc;c++){
                    if(this.boundary[a][b][c].x<bounds[0]){
                        bounds[0]=this.boundary[a][b][c].x
                    }else if(this.boundary[a][b][c].x>bounds[1]){
                        bounds[1]=this.boundary[a][b][c].x
                    }
                    if(this.boundary[a][b][c].y<bounds[2]){
                        bounds[2]=this.boundary[a][b][c].y
                    }else if(this.boundary[a][b][c].y>bounds[3]){
                        bounds[3]=this.boundary[a][b][c].y
                    }
                }
            }
        }
        this.internalBounder={position:{x:bounds[0]/2+bounds[1]/2,y:bounds[2]/2+bounds[3]/2},width:bounds[1]-bounds[0],height:bounds[3]-bounds[2]}
        this.bounder={position:{x:bounds[0]/2+bounds[1]/2,y:bounds[2]/2+bounds[3]/2},width:bounds[1]-bounds[0]+20,height:bounds[3]-bounds[2]+20}
        if(this.standard&&this.boundary[1].length>0&&this.type!=3&&!this.redundant[1]&&!this.redundant[8]&&this.type!=24){
            for(let a=0,la=this.boundary[1].length;a<la;a++){
                let scale=floor(dist(this.boundary[1][a][0].x,this.boundary[1][a][0].y,this.boundary[1][a][1].x,this.boundary[1][a][1].y)/10)
                if(scale){
                    for(let b=1,lb=scale-1;b<lb;b++){
                        game.spawner.push([
                            map((b+0.5)/lb,0,1,this.boundary[1][a][0].x,this.boundary[1][a][1].x),
                            map((b+0.5)/lb,0,1,this.boundary[1][a][0].y,this.boundary[1][a][1].y)
                        ])
                    }
                }
            }
        }
        this.base={position:{x:this.position.x,y:this.position.y},width:this.width,height:this.height}
        this.redundant[8]=false
    }
    findFall(){
        this.falling=game.edge[1]-this.position.y
        for(let a=0,la=entities.walls.length;a<la;a++){
            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                let c=entities.walls[a][b]
                if((
                    c.position.x+c.width/2>this.position.x-this.width/2&&c.position.x-c.width/2<this.position.x+this.width/2||
                    c.position.x+c.width/2+game.edge[0]>this.position.x-this.width/2&&c.position.x-c.width/2+game.edge[0]<this.position.x+this.width/2||
                    c.position.x+c.width/2-game.edge[0]>this.position.x-this.width/2&&c.position.x-c.width/2-game.edge[0]<this.position.x+this.width/2
                )&&c.position.y>this.position.y&&c.standard){
                    this.falling=min(this.falling,c.position.y-this.height/2-c.height/2-10-this.position.y)
                }
            }
        }
    }
    display(layer,offsetX=0,offsetY=0){
        layer.push()
        layer.translate(this.position.x+offsetX,this.position.y+offsetY)
        layer.noStroke()
        let gradient
        switch(this.type){
            case 1:
                switch(game.level){
                    case 7:
                        layer.noFill()
                        layer.stroke(50,150,200)
                        layer.strokeWeight(4)
                        for(let a=0,la=4;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                layer.line(
                                    this.boundary[a][b][0].x+(this.boundary[a][b][0].x<2||this.boundary[a][b][0].x>game.edge[0]-2?0:a==2?-2:a==3?2:2)-this.position.x,
                                    this.boundary[a][b][0].y+(this.boundary[a][b][0].y<2||this.boundary[a][b][0].y>game.edge[1]-2?0:a==0?-2:a==1?2:2)-this.position.y,
                                    this.boundary[a][b][1].x+(this.boundary[a][b][1].x<2||this.boundary[a][b][1].x>game.edge[0]-2?0:a==2?-2:a==3?2:-2)-this.position.x,
                                    this.boundary[a][b][1].y+(this.boundary[a][b][1].y<2||this.boundary[a][b][1].y>game.edge[1]-2?0:a==0?-2:a==1?2:-2)-this.position.y
                                )
                            }
                        }
                    break
                    case 6:
                        gradient=[new p5.LinearGradient(90,this.height)]
                        gradient[0].colors(
                            0.0,color(30+((this.position.y-this.height/2)/game.edge[1])*30,60-((this.position.y-this.height/2)/game.edge[1])*15,30),
                            1.0,color(30+((this.position.y+this.height/2)/game.edge[1])*30,60-((this.position.y+this.height/2)/game.edge[1])*15,30)
                        )
                        layer.translate(-this.width/2,-this.height/2)
                        layer.fillGradient(gradient[0])
                        layer.rect(this.width/2,this.height/2,this.width+1,this.height+1)
                    break
                    case 8: case 17:
                        layer.fill(100)
                        layer.rect(0,0,this.width+1,this.height+1,2)
                    break
                    case 15: case 18:
                        gradient=[new p5.LinearGradient(90,this.height)]
                        gradient[0].colors(
                            0.0,color(180-((this.position.y-this.height/2)/game.edge[1]*1.5-0.5)*60,150-((this.position.y-this.height/2)/game.edge[1]*1.5-0.5)*60,240-((this.position.y-this.height/2)/game.edge[1]*1.5-0.5)*120),
                            1.0,color(180-((this.position.y+this.height/2)/game.edge[1]*1.5-0.5)*60,150-((this.position.y+this.height/2)/game.edge[1]*1.5-0.5)*60,240-((this.position.y+this.height/2)/game.edge[1]*1.5-0.5)*120)
                        )
                        layer.translate(-this.width/2,-this.height/2)
                        layer.fillGradient(gradient[0])
                        layer.rect(this.width/2,this.height/2,this.width+1,this.height+1)
                    break
                    case 16:
                        layer.fill(90,85,80)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 19:
                        layer.fill(90,85,105)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 20:
                        layer.fill(100)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(75)
                        for(let a=0,la=round(this.width/game.tileset[0]);a<la;a++){
                            layer.rect(-this.width*0.5+(a+0.5)/la*this.width,0,game.tileset[0]*0.6,this.height+3)
                        }
                        for(let a=0,la=round(this.height/game.tileset[1]);a<la;a++){
                            layer.rect(0,-this.height*0.5+(a+0.5)/la*this.height,this.width+3,game.tileset[1]*0.6)
                        }
                    break
                    case 21:
                        layer.fill(60,65,70)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 22: case 23:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 25: case 26:
                        if(this.position.y<game.tileset[1]*30){
                            layer.fill(140,135,135)
                            layer.rect(0,0,this.width+1,this.height+1)
                        }else{
                            layer.fill(120,105,95)
                            layer.rect(0,0,this.width+1,this.height+1)
                        }
                    break
                    case 27:
                        layer.fill(180)
                        layer.rect(0,0,this.width+1,this.height+1)
                        if(this.position.y-this.height/2<game.tileset[1]*52.5&&this.position.y+this.height/2>game.tileset[1]*52.5){
                            layer.fill(40,120,160)
                            layer.rect(0,game.tileset[1]*52.5-this.position.y,this.width+1,game.tileset[1]*0.5)
                        }
                    break
                    case 28:
                        layer.fill(0,32,130)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(206,216,247)
                        for(let a=0,la=this.width/game.tileset[0];a<la;a++){
                            layer.rect(-this.width/2+(a+0.5)/la*this.width,0,2,this.height+1)
                        }
                        for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                            layer.rect(0,-this.height/2+(a+0.5)/la*this.height,this.width+1,2)
                        }
                    break
                    default:
                        layer.fill(120)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                }
            break
            case 2: case 34:
                switch(game.level){
                    case 6:
                        layer.fill(60+this.position.y/game.edge[1]*60,120-this.position.y/game.edge[1]*30,60)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 15: case 18:
                        layer.fill(180-((this.position.y)/game.edge[1]*1.5-0.5)*60,150-((this.position.y)/game.edge[1]*1.5-0.5)*60,240-((this.position.y)/game.edge[1]*1.5-0.5)*120)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+10,-this.height/2+15,
                            this.width/2-10,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 16:
                        layer.fill(90,85,80)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+15,-this.height/2+20,
                            this.width/2-15,-this.height/2+20,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 19:
                        if(this.type==34){
                            layer.fill(90,85,105)
                            layer.rect(0,0,this.width+1,this.height+1)
                            layer.fill(120,200,120)
                            layer.quad(
                                -this.width/2,-this.height/2-0.5,
                                -this.width/2+10,-this.height/2+15,
                                this.width/2-10,-this.height/2+15,
                                this.width/2,-this.height/2-0.5
                            )
                        }else{
                            layer.fill(90,85,105)
                            layer.rect(0,0,this.width+1,this.height+1)
                            layer.fill(120,240-min(480,this.reload)/6,120)
                            layer.quad(
                                -this.width/2,-this.height/2-0.5,
                                -this.width/2+10,-this.height/2+15,
                                this.width/2-10,-this.height/2+15,
                                this.width/2,-this.height/2-0.5
                            )
                        }
                    break
                    case 20:
                        layer.fill(100)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(75)
                        for(let a=0,la=round(this.width/game.tileset[0]);a<la;a++){
                            layer.rect(-this.width*0.5+(a+0.5)/la*this.width,0,game.tileset[0]*0.6,this.height+3)
                        }
                        for(let a=0,la=round(this.height/game.tileset[1]);a<la;a++){
                            layer.rect(0,-this.height*0.5+(a+0.5)/la*this.height,this.width+3,game.tileset[1]*0.6)
                        }
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+15,-this.height/2+20,
                            this.width/2-15,-this.height/2+20,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 21:
                        layer.fill(60,65,70)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+15,-this.height/2+20,
                            this.width/2-15,-this.height/2+20,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 22: case 23:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                        if(
                            abs(this.position.x-game.tileset[0]*64.5)<1||
                            abs(this.position.x-game.tileset[0]*70.5)<1
                        ){
                            layer.fill(120,200-game.pointAnim[0]*80,120)
                        }else if(abs(this.position.x-game.tileset[0]*131.5)<1){
                            layer.fill(120,200-game.pointAnim[1]*80,120)
                        }else if(abs(this.position.x-game.tileset[0]*135.5)<1){
                            layer.fill(120,200-game.pointAnim[2]*80,120)
                        }else{
                            layer.fill(120,200,120)
                        }
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+20,-this.height/2+16,
                            this.width/2-20,-this.height/2+16,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 25: case 26:
                        layer.fill(120,105,95)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2+8,-this.height/2-0.5,
                            -this.width/2+24,-this.height/2+12,
                            this.width/2-24,-this.height/2+12,
                            this.width/2-8,-this.height/2-0.5
                        )
                    break
                    case 27:
                        layer.fill(180)
                        layer.rect(0,0,this.width+1,this.height+1)
                        if(this.position.y-this.height/2<game.tileset[1]*52.5&&this.position.y+this.height/2>game.tileset[1]*52.5){
                            layer.fill(40,120,160)
                            layer.rect(0,gamwe.tileset[1]*52.5-this.position.y,this.width+1,game.tileset[1]*0.5)
                        }
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+15,-this.height/2+12,
                            this.width/2-15,-this.height/2+12,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 28:
                        layer.fill(0,32,130)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(206,216,247)
                        for(let a=0,la=this.width/game.tileset[0];a<la;a++){
                            layer.rect(-this.width/2+(a+0.5)/la*this.width,0,2,this.height+1)
                        }
                        for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                            layer.rect(0,-this.height/2+(a+0.5)/la*this.height,this.width+1,2)
                        }
                    break
                    default:
                        layer.fill(120,200,120)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                }
            break
            case 3:
                switch(game.level){
                    case 25: case 26:
                        layer.fill(120,200,200,0.5)
                        if(game.water<this.position.y){
                            layer.rect(this.width/2,this.height/2,this.width,this.height)
                        }else if(game.water<this.position.y+this.height){
                            layer.rect(this.width/2,this.height/2-this.position.y/2+game.water/2,this.width,this.position.y+this.height-game.water)
                        }
                    break
                    default:
                        layer.fill(120,200,200)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                }
            break
            case 4:
                switch(game.level){
                    case 7:
                        layer.noFill()
                        layer.stroke(250-min(480,this.reload)/5,120,120)
                        layer.strokeWeight(4)
                        for(let a=0,la=4;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                layer.line(
                                    this.boundary[a][b][0].x+(a==2?-2:a==3?2:2)-this.position.x,
                                    this.boundary[a][b][0].y+(a==0?-2:a==1?2:2)-this.position.y,
                                    this.boundary[a][b][1].x+(a==2?-2:a==3?2:-2)-this.position.x,
                                    this.boundary[a][b][1].y+(a==0?-2:a==1?2:-2)-this.position.y
                                )
                            }
                        }
                    break
                    case 15: case 18:
                        layer.fill(180-((this.position.y)/game.edge[1]*1.5-0.5)*60,150-((this.position.y)/game.edge[1]*1.5-0.5)*60,240-((this.position.y)/game.edge[1]*1.5-0.5)*120)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,120,120)
                        layer.quad(
                            -this.width/2,-this.height/2,
                            -this.width/2+10,-this.height/2+15,
                            this.width/2-10,-this.height/2+15,
                            this.width/2,-this.height/2
                        )
                    break
                    case 19:
                        layer.fill(90,85,105)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,120,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+10,-this.height/2+15,
                            this.width/2-10,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 22: case 23:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(max(120,200-game.pointAnim[0]*80-min(480,this.reload)/5),120,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+20,-this.height/2+16,
                            this.width/2-20,-this.height/2+16,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 24:
                        layer.fill(120)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,120,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+10,-this.height/2+15,
                            this.width/2-10,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 25: case 26:
                        layer.fill(60,60,65)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,120,120)
                        layer.quad(
                            -this.width/2+8,-this.height/2-0.5,
                            -this.width/2+24,-this.height/2+12,
                            this.width/2-24,-this.height/2+12,
                            this.width/2-8,-this.height/2-0.5
                        )
                    break
                    case 28:
                        layer.fill(0,32,130)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(206,216,247)
                        for(let a=0,la=this.width/game.tileset[0];a<la;a++){
                            layer.rect(-this.width/2+(a+0.5)/la*this.width,0,2,this.height+1)
                        }
                        for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                            layer.rect(0,-this.height/2+(a+0.5)/la*this.height,this.width+1,2)
                        }
                    break
                    default:
                        layer.fill(220-min(480,this.reload)/5,120,120)
                        if(game.level==6){
                            layer.beginShape()
                            for(let a=0,la=round(this.width/game.tileset[0])*9;a<la;a++){
                                layer.vertex(-this.width/2+a*game.tileset[0]/9,-this.height/2-(a%3>=1?2:0))
                            }
                            for(let a=0,la=round(this.height/game.tileset[0])*9;a<la;a++){
                                layer.vertex(this.width/2+(a%3>=1?2:0),-this.height/2+a*game.tileset[1]/9)
                            }
                            for(let a=0,la=round(this.width/game.tileset[0])*9;a<la;a++){
                                layer.vertex(this.width/2-a*game.tileset[0]/9,this.height/2+(a%3>=1?2:0))
                            }
                            for(let a=0,la=round(this.height/game.tileset[0])*9;a<la;a++){
                                layer.vertex(-this.width/2-(a%3>=1?2:0),this.height/2-a*game.tileset[1]/9)
                            }
                            layer.endShape()
                        }else{
                            layer.rect(0,0,this.width+1,this.height+1)
                        }
                    break
                }
            break
            case 5:
                if(!this.exploded){
                    layer.fill(120,40,40)
                    layer.rect(0,-this.height/6,this.width*0.6,this.height/3+1)
                    layer.fill(80)
                    layer.rect(0,this.height/6,this.width+1,this.height*2/3+1)
                }
            break
            case 6:
                layer.fill(40,120,40)
                layer.rect(0,0,this.width+1,this.height+1)
            break
            case 7:
                switch(game.level){
                    case 15: case 18: case 19:
                        layer.fill(140,80,20)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(120,60,0)
                        for(let a=0,la=this.height/game.tileset[1]*2;a<la;a++){
                            layer.rect(0,-this.height/2+(a+0.5)/2*game.tileset[1],this.width+1,3)
                        }
                    break
                    case 21:
                        layer.fill(110,80,50)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(90,60,30)
                        for(let a=0,la=this.height/game.tileset[1]*2;a<la;a++){
                            layer.rect(0,-this.height/2+(a+0.5)/2*game.tileset[1],this.width+1,3)
                        }
                    break
                    case 22: case 23:
                        layer.fill(80)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(100)
                        for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                            layer.rect(0,-this.height/2+(a+0.5)*game.tileset[1]-8,this.width+1,4)
                            layer.rect(0,-this.height/2+(a+0.5)*game.tileset[1],this.width+1,4)
                            layer.rect(0,-this.height/2+(a+0.5)*game.tileset[1]+8,this.width+1,4)
                        }
                    break
                    case 25: case 26:
                        if(this.position.x>game.tileset[0]*183&&this.position.x<game.tileset[0]*184){
                            layer.fill(160,90,20)
                            layer.rect(0,0,this.width*3,this.height+1)
                            layer.fill(180,110,40)
                            for(let a=0,la=this.pos.length;a<la;a++){
                                layer.rect(this.pos[a],-this.height/2+(a+0.5)/la*this.height,this.width,game.tileset[1]/10)
                            }
                        }else if(this.position.y<game.tileset[1]*31||this.position.x<game.tileset[0]*132&&this.position.y<game.tileset[1]*36){
                            layer.fill(75,55,45)
                            layer.rect(0,0,this.width+1,this.height)
                            layer.fill(65,30,25)
                            for(let a=0,la=floor(this.height/game.tileset[1]*2.25);a<la;a++){
                                layer.rect(0,(a-la*0.5+0.5)*4/9*game.tileset[1],this.width,game.tileset[1]/15)
                            }
                        }else{
                            layer.fill(60,60,70)
                            layer.rect(0,0,this.width+1,this.height+1)
                            layer.fill(80,80,90)
                            for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                                layer.quad(
                                    -this.width*0.5-0.5,-this.height/2+(a+0.5)*game.tileset[1]-10,
                                    -this.width*0.5-0.5,-this.height/2+(a+0.5)*game.tileset[1]+10,
                                    -this.width*0.25,-this.height/2+(a+0.5)*game.tileset[1]+5,
                                    -this.width*0.25,-this.height/2+(a+0.5)*game.tileset[1]-5
                                )
                                layer.quad(
                                    this.width*0.5+0.5,-this.height/2+(a+0.5)*game.tileset[1]-10,
                                    this.width*0.5+0.5,-this.height/2+(a+0.5)*game.tileset[1]+10,
                                    this.width*0.25,-this.height/2+(a+0.5)*game.tileset[1]+5,
                                    this.width*0.25,-this.height/2+(a+0.5)*game.tileset[1]-5
                                )
                            }
                        }
                    break
                    case 27:
                        layer.fill(108)
                        layer.rect(-this.width/2,0,this.width/2,this.height+1)
                        layer.rect(this.width/2,0,this.width/2,this.height+1)
                        if(this.position.y-this.height/2<game.tileset[1]*52.5&&this.position.y+this.height/2>game.tileset[1]*52.5){
                            layer.fill(24,72,96)
                            layer.rect(-this.width/2,game.tileset[1]*52.5-this.position.y,this.width/2,game.tileset[1]*0.5)
                            layer.rect(this.width/2,game.tileset[1]*52.5-this.position.y,this.width/2,game.tileset[1]*0.5)
                        }
                    break
                    default:
                        layer.fill(50)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(70)
                        for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                            layer.rect(0,-this.height/2+(a+0.5)*game.tileset[1],this.width+1,game.tileset[1]/5)
                        }
                    break
                }
            break
            case 8:
                if(game.level==16){
                    layer.noFill()
                    layer.stroke(200)
                    layer.strokeWeight(1)
                    layer.line(-25,-90,0,-5)
                    layer.line(25,-90,0,-5)
                    layer.stroke(160)
                    layer.strokeWeight(5)
                    layer.arc(0,-80,80,20,-165,-15)
                    layer.noStroke()
                }else if(game.level==22){
                    layer.scale(1-game.pointAnim[4])
                }
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        layer.fill(60+lcos(a*90+this.time)*40,55+lcos(a*90+this.time)*40,50+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                        layer.fill(240+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,60+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                        layer.fill(60+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.1,this.height*0.4)
                        layer.rect(this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.12,0,this.width*lcos(a*90+this.time)*0.08,this.height*0.4)
                        layer.rect(this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.12,0,this.width*lcos(a*90+this.time)*0.08,this.height*0.4)
                    }
                }
            break
            case 9: case 41:
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        layer.fill(60+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,180+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                        layer.fill(160+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                        layer.fill(240+lcos(a*90+this.time)*40,40+lcos(a*90+this.time)*40,40+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.45,this.height*0.15)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.15,this.height*0.45)
                    }
                }
            break
            case 11:
                switch(game.level){
                    case 15: case 18:
                        layer.fill(160,100,40)
                        layer.rect(0,this.height/4,this.width-2,this.height/2-2)
                        layer.rect(0,-this.height/4+1,this.width-game.tileset[0]/2-2,this.height/2-2)
                        layer.fill(140,80,20)
                        for(let a=0,la=round(this.width/game.tileset[0]*2-1);a<la;a++){
                            layer.rect(-this.width/2+(0.5+a)/la*this.width,this.height/4,2,this.height/2-2)
                        }
                        for(let a=0,la=round(this.width/game.tileset[0]*2-2);a<la;a++){
                            layer.rect(-this.width/2+(1+a)/(la+1)*this.width,-this.height/4+1,2,this.height/2-2)
                        }
                    break
                    case 19:
                        layer.fill(55,50,65)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.rect(-this.width/2+(0.5+a)/la*this.width,this.height/4+1,this.width/la-2,this.height/2-2,2)
                        }
                        for(let a=0,la=this.width/game.tileset[0]*2-1;a<la;a++){
                            layer.rect(-this.width/2+(1+a)/(la+1)*this.width,-this.height/4+1,this.width/(la+1)-2,this.height/2-2,2)
                        }
                    break
                    case 25: case 26:
                        if(this.position.y<game.tileset[1]*34){
                            layer.fill(120,75,65)
                            layer.rect(0,this.height/4,this.width-2,this.height/2-2)
                            layer.rect(0,-this.height/4+1,this.width-game.tileset[0]/2-2,this.height/2-2)
                            layer.fill(90,55,45)
                            for(let a=0,la=round(this.width/game.tileset[0]*3-1);a<la;a++){
                                layer.rect(-this.width/2+(0.5+a)/la*this.width,this.height/4,2,this.height/2-2)
                            }
                            for(let a=0,la=round(this.width/game.tileset[0]*3-2);a<la;a++){
                                layer.rect(-this.width/2+(1+a)/(la+1)*this.width,-this.height/4+1,2,this.height/2-2)
                            }
                        }else{
                            layer.fill(70,75,75)
                            for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                                layer.rect(-this.width/2+(0.5+a)/la*this.width,this.height/4+1,this.width/la-2,this.height/2-2)
                            }
                            for(let a=0,la=this.width/game.tileset[0]*2-1;a<la;a++){
                                layer.rect(-this.width/2+(1+a)/(la+1)*this.width,-this.height/4+1,this.width/(la+1)-2,this.height/2-2)
                            }
                        }
                    break
                    default:
                        switch(game.level){
                            case 6:
                                layer.fill(60+this.position.y/game.edge[1]*20,80-this.position.y/game.edge[1]*10,60)
                            break
                            case 27:
                                layer.fill(135)
                            break
                            default:
                                layer.fill(60)
                            break
                        }
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.rect(-this.width/2+(0.5+a)/la*this.width,this.height/4+1,this.width/la-2,this.height/2-2)
                        }
                        for(let a=0,la=this.width/game.tileset[0]*2-1;a<la;a++){
                            layer.rect(-this.width/2+(1+a)/(la+1)*this.width,-this.height/4+1,this.width/(la+1)-2,this.height/2-2)
                        }
                    break
                }
            break
            case 12:
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        layer.fill(120+lcos(a*90+this.time)*40,160+lcos(a*90+this.time)*40,200+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                        layer.fill(120+lcos(a*90+this.time)*40,240+lcos(a*90+this.time)*40,240+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                        layer.fill(40+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),-this.height*0.08,this.width*lcos(a*90+this.time)*0.1,this.height*0.3)
                        layer.rect(this.width/2*lsin(a*90+this.time),this.height*0.18,this.width*lcos(a*90+this.time)*0.1,this.height*0.1)
                    }
                }
            break
            case 13:
                switch(game.level){
                    case 15: case 18:
                        layer.fill(180-((this.position.y)/game.edge[1]*1.5-0.5)*60,150-((this.position.y)/game.edge[1]*1.5-0.5)*60,240-((this.position.y)/game.edge[1]*1.5-0.5)*120)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,220-min(480,this.reload)/5,120)
                        layer.quad(
                            -this.width/2,-this.height/2,
                            -this.width/2+10,-this.height/2+15,
                            this.width/2-10,-this.height/2+15,
                            this.width/2,-this.height/2
                        )
                    break
                    case 19:
                        layer.fill(90,85,105)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,220-min(480,this.reload)/5,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+10,-this.height/2+15,
                            this.width/2-10,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 22:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,220-min(480,this.reload)/5,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+20,-this.height/2+16,
                            this.width/2-20,-this.height/2+16,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 23:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 24:
                        layer.fill(120)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,220-min(480,this.reload)/5,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+10,-this.height/2+15,
                            this.width/2-10,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 26:
                        if(this.position.y<game.tileset[1]*30){
                            layer.fill(140,135,135)
                            layer.rect(0,0,this.width+1,this.height+1)
                        }else{
                            layer.fill(60,60,65)
                            layer.rect(0,0,this.width+1,this.height+1)
                        }
                    break
                    default:
                        layer.fill(220-min(480,this.reload)/5,220-min(480,this.reload)/5,120)
                        if(game.level==6){
                            layer.beginShape()
                            for(let a=0,la=round(this.width/game.tileset[0])*9;a<la;a++){
                                layer.vertex(-this.width/2+a*game.tileset[0]/9,-this.height/2-(a%3>=1?2:0))
                            }
                            for(let a=0,la=round(this.height/game.tileset[0])*9;a<la;a++){
                                layer.vertex(this.width/2+(a%3>=1?2:0),-this.height/2+a*game.tileset[1]/9)
                            }
                            for(let a=0,la=round(this.width/game.tileset[0])*9;a<la;a++){
                                layer.vertex(this.width/2-a*game.tileset[0]/9,this.height/2+(a%3>=1?2:0))
                            }
                            for(let a=0,la=round(this.height/game.tileset[0])*9;a<la;a++){
                                layer.vertex(-this.width/2-(a%3>=1?2:0),this.height/2-a*game.tileset[1]/9)
                            }
                            layer.endShape()
                        }else{
                            layer.rect(0,0,this.width+1,this.height+1)
                        }
                    break
                }
            break
            case 15:
                switch(game.level){
                    case 19:
                        layer.fill(90,85,105)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,170-min(480,this.reload)/10,120)
                        layer.quad(
                            -this.width/2,-this.height/2,
                            -this.width/2+10,-this.height/2+15,
                            this.width/2-10,-this.height/2+15,
                            this.width/2,-this.height/2
                        )
                    break
                    case 22: case 23:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,170-min(480,this.reload)/10,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+20,-this.height/2+16,
                            this.width/2-20,-this.height/2+16,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 23:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 24:
                        layer.fill(120)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,170-min(480,this.reload)/10,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+10,-this.height/2+15,
                            this.width/2-10,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    default:
                        layer.fill(220-min(480,this.reload)/5,170-min(480,this.reload)/10,120)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                }
            break
            case 16:
                if(game.level==16){
                    layer.noFill()
                    layer.stroke(200)
                    layer.strokeWeight(1)
                    layer.line(-25,-90,0,-5)
                    layer.line(25,-90,0,-5)
                    layer.stroke(160)
                    layer.strokeWeight(5)
                    layer.arc(0,-80,80,20,-165,-15)
                    layer.noStroke()
                }else if(game.level==22){
                    layer.scale(1-game.pointAnim[2])
                }else if(game.level==25){
                    layer.scale(1-game.pointAnim[1])
                }
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        if(game.level==23||game.level==26){
                            layer.fill((160+lcos(a*90+this.time)*40)*this.visible+50*(1-this.visible),1-this.recharge/60)
                            layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                            layer.fill((80+lcos(a*90+this.time)*40)*this.visible+50*(1-this.visible),1-this.recharge/60)
                            layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                            layer.fill((220+lcos(a*90+this.time)*40)*this.visible+50*(1-this.visible),1-this.recharge/60)
                        }else{
                            layer.fill(160+lcos(a*90+this.time)*40,1-this.recharge/60)
                            layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                            layer.fill(80+lcos(a*90+this.time)*40,1-this.recharge/60)
                            layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                            layer.fill(220+lcos(a*90+this.time)*40,1-this.recharge/60)
                        }
                        layer.rect(this.width/2*lsin(a*90+this.time),-this.height*0.12,this.width*lcos(a*90+this.time)*0.1,this.height*0.1)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.1,this.height*0.1)
                        layer.rect(this.width/2*lsin(a*90+this.time),this.height*0.12,this.width*lcos(a*90+this.time)*0.1,this.height*0.1)
                    }
                }
                layer.fill(180,1-this.recharge/60)
                layer.textSize(9)
                layer.text(types.weapon[types.player[this.weapon].weapon].name,0,-this.height)
            break
            case 17:
                switch(game.level){
                    case 8: case 17:
                        layer.fill(100)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 15: case 18:
                        layer.fill(180-((this.position.y)/game.edge[1]*1.5-0.5)*60,150-((this.position.y)/game.edge[1]*1.5-0.5)*60,240-((this.position.y)/game.edge[1]*1.5-0.5)*120)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 16:
                        layer.fill(90,85,80)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 19:
                        layer.fill(90,85,105)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 21:
                        layer.fill(60,65,70)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 22: case 23:
                        layer.fill(110,105,100)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 25: case 26:
                        if(this.position.y<game.tileset[1]*30){
                            layer.fill(140,135,135)
                            layer.triangle(
                                -this.width/2-0.5,-this.height/2-0.5,
                                -this.width/2-0.5,this.height/2+0.5,
                                this.width/2+0.5,this.height/2+0.5
                            )
                        }else{
                            layer.fill(120,105,95)
                            layer.triangle(
                                -this.width/2-0.5,-this.height/2-0.5,
                                -this.width/2-0.5,this.height/2+0.5,
                                this.width/2+0.5,this.height/2+0.5
                            )
                        }
                    break
                    case 27:
                        layer.fill(180)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                        if(this.position.y-this.height/2<game.tileset[1]*52.5&&this.position.y+this.height/2>game.tileset[1]*52.5){
                            layer.fill(40,120,160)
                            layer.quad(
                                -this.width/2-0.5,game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.25,
                                -this.width/2-0.5,game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.25,
                                map(game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.25,-this.height/2-0.5,this.height/2+0.5,-this.width/2-0.5,this.width/2+0.5),game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.25,
                                map(game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.25,-this.height/2-0.5,this.height/2+0.5,-this.width/2-0.5,this.width/2+0.5),game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.25
                            )
                        }
                    break
                    case 28:
                        layer.fill(0,32,130)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                        layer.fill(206,216,247)
                        for(let a=0,la=this.width/game.tileset[0];a<la;a++){
                            layer.quad(
                                -this.width/2+(a+0.5)/la*this.width-1,this.height/2+0.5,
                                -this.width/2+(a+0.5)/la*this.width+1,this.height/2+0.5,
                                -this.width/2+(a+0.5)/la*this.width+1,map(-this.width/2+(a+0.5)/la*this.width-1,-this.width/2-0.5,this.width/2+0.5,this.height/2+0.5,-this.height/2-0.5),
                                -this.width/2+(a+0.5)/la*this.width-1,map(-this.width/2+(a+0.5)/la*this.width+1,-this.width/2-0.5,this.width/2+0.5,this.height/2+0.5,-this.height/2-0.5)
                            )
                        }
                        for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                            layer.quad(
                                -this.width/2+0.5,-this.height/2+(a+0.5)/la*this.height-1,
                                -this.width/2+0.5,-this.height/2+(a+0.5)/la*this.height+1,
                                map(-this.height/2+(a+0.5)/la*this.height+1,-this.height/2-0.5,this.height/2+0.5,-this.width/2-0.5,this.width/2+0.5),-this.height/2+(a+0.5)/la*this.height+1,
                                map(-this.height/2+(a+0.5)/la*this.height-1,-this.height/2-0.5,this.height/2+0.5,-this.width/2-0.5,this.width/2+0.5),-this.height/2+(a+0.5)/la*this.height-1
                            )
                        }
                    break
                    default:
                        layer.fill(120)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                }
            break
            case 18:
                switch(game.level){
                    case 8: case 17:
                        layer.fill(100)
                        layer.triangle(
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 15: case 18:
                        layer.fill(180-((this.position.y)/game.edge[1]*1.5-0.5)*60,150-((this.position.y)/game.edge[1]*1.5-0.5)*60,240-((this.position.y)/game.edge[1]*1.5-0.5)*120)
                        layer.triangle(
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 16:
                        layer.fill(90,85,80)
                        layer.triangle(
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 19:
                        layer.fill(90,85,105)
                        layer.triangle(
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 21:
                        layer.fill(60,65,70)
                        layer.triangle(
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 22: case 23:
                        layer.fill(110,105,100)
                        layer.triangle(
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 25: case 26:
                        if(this.position.y<game.tileset[1]*30){
                            layer.fill(140,135,135)
                            layer.triangle(
                                this.width/2+0.5,-this.height/2-0.5,
                                -this.width/2-0.5,this.height/2+0.5,
                                this.width/2+0.5,this.height/2+0.5
                            )
                        }else{
                            layer.fill(120,105,95)
                            layer.triangle(
                                this.width/2+0.5,-this.height/2-0.5,
                                -this.width/2-0.5,this.height/2+0.5,
                                this.width/2+0.5,this.height/2+0.5
                            )
                        }
                    break
                    case 27:
                        layer.fill(180)
                        layer.triangle(
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                        if(this.position.y-this.height/2<game.tileset[1]*52.5&&this.position.y+this.height/2>game.tileset[1]*52.5){
                            layer.fill(40,120,160)
                            layer.quad(
                                this.width/2+0.5,game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.25,
                                this.width/2+0.5,game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.25,
                                map(game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.25,-this.height/2-0.5,this.height/2+0.5,this.width/2+0.5,-this.width/2-0.5),game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.25,
                                map(game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.25,-this.height/2-0.5,this.height/2+0.5,this.width/2+0.5,-this.width/2-0.5),game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.25
                            )
                        }
                    break
                    case 28:
                        layer.fill(0,32,130)
                        layer.triangle(
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                        layer.fill(206,216,247)
                        for(let a=0,la=this.width/game.tileset[0];a<la;a++){
                            layer.quad(
                                -this.width/2+(a+0.5)/la*this.width+1,this.height/2+0.5,
                                -this.width/2+(a+0.5)/la*this.width-1,this.height/2+0.5,
                                -this.width/2+(a+0.5)/la*this.width-1,map(-this.width/2+(a+0.5)/la*this.width-1,-this.width/2-0.5,this.width/2+0.5,this.height/2+0.5,-this.height/2-0.5),
                                -this.width/2+(a+0.5)/la*this.width+1,map(-this.width/2+(a+0.5)/la*this.width+1,-this.width/2-0.5,this.width/2+0.5,this.height/2+0.5,-this.height/2-0.5)
                            )
                        }
                        for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                            layer.quad(
                                this.width/2-0.5,-this.height/2+(a+0.5)/la*this.height-1,
                                this.width/2-0.5,-this.height/2+(a+0.5)/la*this.height+1,
                                -map(-this.height/2+(a+0.5)/la*this.height+1,-this.height/2-0.5,this.height/2+0.5,-this.width/2-0.5,this.width/2+0.5),-this.height/2+(a+0.5)/la*this.height+1,
                                -map(-this.height/2+(a+0.5)/la*this.height-1,-this.height/2-0.5,this.height/2+0.5,-this.width/2-0.5,this.width/2+0.5),-this.height/2+(a+0.5)/la*this.height-1
                            )
                        }
                    break
                    default:
                        layer.fill(120)
                        layer.triangle(
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                }
            break
            case 20:
                switch(game.level){
                    case 8: case 17:
                        layer.fill(100)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,-this.height/2-0.5
                        )
                    break
                    case 15: case 18:
                        layer.fill(180-((this.position.y)/game.edge[1]*1.5-0.5)*60,150-((this.position.y)/game.edge[1]*1.5-0.5)*60,240-((this.position.y)/game.edge[1]*1.5-0.5)*120)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,-this.height/2-0.5
                        )
                    break
                    case 16:
                        layer.fill(90,85,80)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,-this.height/2-0.5
                        )
                    break
                    case 19:
                        layer.fill(90,85,105)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,-this.height/2-0.5
                        )
                    break
                    case 21:
                        layer.fill(60,65,70)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,-this.height/2-0.5
                        )
                    break
                    case 22: case 23:
                        layer.fill(110,105,100)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,-this.height/2-0.5
                        )
                    break
                    case 25: case 26:
                        if(this.position.y<game.tileset[1]*30){
                            layer.fill(140,135,135)
                            layer.triangle(
                                -this.width/2-0.5,-this.height/2-0.5,
                                -this.width/2-0.5,this.height/2+0.5,
                                this.width/2+0.5,-this.height/2-0.5
                            )
                        }else{
                            layer.fill(120,105,95)
                            layer.triangle(
                                -this.width/2-0.5,-this.height/2-0.5,
                                -this.width/2-0.5,this.height/2+0.5,
                                this.width/2+0.5,-this.height/2-0.5
                            )
                        }
                    break
                    case 27:
                        layer.fill(180)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,-this.height/2-0.5
                        )
                        if(this.position.y-this.height/2<game.tileset[1]*52.5&&this.position.y+this.height/2>game.tileset[1]*52.5){
                            layer.fill(40,120,160)
                            layer.quad(
                                -this.width/2-0.5,game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.25,
                                -this.width/2-0.5,game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.25,
                                map(game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.25,this.height/2+0.5,-this.height/2-0.5,-this.width/2-0.5,this.width/2+0.5),game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.25,
                                map(game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.25,this.height/2+0.5,-this.height/2-0.5,-this.width/2-0.5,this.width/2+0.5),game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.25
                            )
                        }
                    break
                    default:
                        layer.fill(120)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,-this.height/2-0.5
                        )
                    break
                }
            break
            case 21:
                switch(game.level){
                    case 8: case 17:
                        layer.fill(100)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 15: case 18:
                        layer.fill(180-((this.position.y)/game.edge[1]*1.5-0.5)*60,150-((this.position.y)/game.edge[1]*1.5-0.5)*60,240-((this.position.y)/game.edge[1]*1.5-0.5)*120)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 16:
                        layer.fill(90,85,80)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 19:
                        layer.fill(90,85,105)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 21:
                        layer.fill(60,65,70)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 22: case 23:
                        layer.fill(110,105,100)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 25: case 26:
                        if(this.position.y<game.tileset[1]*30){
                            layer.fill(140,135,135)
                            layer.triangle(
                                -this.width/2-0.5,-this.height/2-0.5,
                                this.width/2+0.5,-this.height/2-0.5,
                                this.width/2+0.5,this.height/2+0.5
                            )
                        }else{
                            layer.fill(120,105,95)
                            layer.triangle(
                                -this.width/2-0.5,-this.height/2-0.5,
                                this.width/2+0.5,-this.height/2-0.5,
                                this.width/2+0.5,this.height/2+0.5
                            )
                        }
                    break
                    case 27:
                        layer.fill(180)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                        if(this.position.y-this.height/2<game.tileset[1]*52.5&&this.position.y+this.height/2>game.tileset[1]*52.5){
                            layer.fill(40,120,160)
                            layer.quad(
                                this.width/2+0.5,game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.25,
                                this.width/2+0.5,game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.25,
                                map(game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.25,this.height/2+0.5,-this.height/2-0.5,this.width/2+0.5,-this.width/2-0.5),game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.25,
                                map(game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.25,this.height/2+0.5,-this.height/2-0.5,this.width/2+0.5,-this.width/2-0.5),game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.25
                            )
                        }
                    break
                    default:
                        layer.fill(120)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                }
            break
            case 23:
                switch(game.level){
                    case 19:
                        layer.fill(90,85,105)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,120,220-min(480,this.reload)/5)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+10,-this.height/2+15,
                            this.width/2-10,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 22:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(max(120,200-min(480,this.reload)/5),120,max(120,200-min(480,this.reload)/5))
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+20,-this.height/2+16,
                            this.width/2-20,-this.height/2+16,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 23:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 24:
                        layer.fill(120)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(max(120,200-min(480,this.reload)/5),120,max(120,200-min(480,this.reload)/5))
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+10,-this.height/2+15,
                            this.width/2-10,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    default:
                        layer.fill(220-min(480,this.reload)/5,120,220-min(480,this.reload)/5)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                }
            break
            case 24:
                switch(game.level){
                    case 15: case 18: case 19:
                        layer.fill(160,100,40)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(140,80,20)
                        for(let a=0,la=round(this.width/game.tileset[0]*2);a<la;a++){
                            layer.rect(-this.width/2+(a+0.5)/2*game.tileset[0],0,game.tileset[1]/10,this.height)
                        }
                    break
                    case 16: case 28:
                        layer.fill(80)
                        layer.rect(0,5,this.width,this.height+10,5)
                    break
                    case 21:
                        layer.fill(130,100,70)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(110,80,50)
                        for(let a=0,la=round(this.width/game.tileset[0]*2);a<la;a++){
                            layer.rect(-this.width/2+(a+0.5)/2*game.tileset[0],0,game.tileset[1]/10,this.height)
                        }
                    break
                    case 23:
                        layer.fill(60,55,60)
                        layer.rect(0,-this.height*0.2,this.width,this.height*0.6+1)
                        for(let a=0,la=this.width/game.tileset[0];a<la;a++){
                            layer.quad(
                                -this.width*0.5+(a+0.5)/la*this.width-game.tileset[0]*0.4,this.height*0.1,
                                -this.width*0.5+(a+0.5)/la*this.width+game.tileset[0]*0.4,this.height*0.1,
                                -this.width*0.5+(a+0.5)/la*this.width+game.tileset[0]*0.2,this.height*0.5,
                                -this.width*0.5+(a+0.5)/la*this.width-game.tileset[0]*0.2,this.height*0.5
                            )
                        }
                    break
                    case 25: case 26:
                        layer.fill(155,95,80)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(130,55,50)
                        for(let a=0,la=floor(this.width/game.tileset[0]*2.5);a<la;a++){
                            layer.rect((a-la*0.5+0.5)*0.4*game.tileset[0],0,game.tileset[1]/15,this.height)
                        }
                    break
                    default:
                        layer.fill(60,55,60)
                        layer.rect(0,-this.height*0.25,this.width,this.height*0.5+1)
                        layer.quad(-this.width*0.5,0,this.width*0.5,0,this.width*0.25,this.height*0.5,-this.width*0.25,this.height*0.5)
                    break
                }
            break
            case 25:
                switch(game.level){
                    case 21:
                        layer.fill(130,100,70)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(110,80,50)
                        for(let a=0,la=round(this.width/game.tileset[0]*2);a<la;a++){
                            layer.rect(-this.width/2+(a+0.5)/2*game.tileset[0],0,game.tileset[1]/10,this.height)
                        }
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2,-this.height/2,
                            -this.width/2+10,-this.height/2+10,
                            this.width/2-10,-this.height/2+10,
                            this.width/2,-this.height/2
                        )
                    break
                    default:
                        layer.fill(160,100,40)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(140,80,20)
                        for(let a=0,la=round(this.width/game.tileset[0]*2);a<la;a++){
                            layer.rect(-this.width/2+(a+0.5)/2*game.tileset[0],0,game.tileset[1]/10,this.height)
                        }
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2,-this.height/2,
                            -this.width/2+10,-this.height/2+10,
                            this.width/2-10,-this.height/2+10,
                            this.width/2,-this.height/2
                        )
                    break
                }
            break
            case 26: case 30:
                layer.fill(160,100,40)
                layer.rect(0,0,this.width+1,this.height)
                layer.fill(140,80,20)
                for(let a=0,la=round(this.width/game.tileset[0]*2);a<la;a++){
                    layer.rect(-this.width/2+(a+0.5)/2*game.tileset[0],0,game.tileset[1]/10,this.height)
                }
                layer.fill(100,225,225)
                layer.quad(
                    -this.width/2,-this.height/2,
                    -this.width/2+10,-this.height/2+10,
                    this.width/2-10,-this.height/2+10,
                    this.width/2,-this.height/2
                )
            break
            case 27:
                if(game.level==16){
                    layer.noFill()
                    layer.stroke(200)
                    layer.strokeWeight(1)
                    layer.line(-25,-90,0,-5)
                    layer.line(25,-90,0,-5)
                    layer.stroke(160)
                    layer.strokeWeight(5)
                    layer.arc(0,-80,80,20,-165,-15)
                    layer.noStroke()
                }
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        if(game.level==23||game.level==25||game.level==26){
                            layer.fill(100+lcos(a*90+this.time)*40,80+lcos(a*90+this.time)*40,60+lcos(a*90+this.time)*40,1-this.recharge/60)
                            layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                            layer.fill(140+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,100+lcos(a*90+this.time)*40,1-this.recharge/60)
                        }else{
                            layer.fill(200+lcos(a*90+this.time)*40,200+lcos(a*90+this.time)*40,80+lcos(a*90+this.time)*40,1-this.recharge/60)
                            layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                            layer.fill(160+lcos(a*90+this.time)*40,160+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,1-this.recharge/60)
                        }
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                        layer.fill(40+lcos(a*90+this.time)*40,1-this.recharge/60)
                        regTriangle(layer,this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.15,this.height*0.15,-30)
                    }
                }
                if(game.level==23||game.level==25||game.level==26){
                    layer.fill(180,1-this.recharge/60)
                    layer.textSize(9)
                    layer.text(types.weapon[types.player[this.weapon].weapon].name,0,-this.height)
                }
            break
            case 28:
                switch(game.level){
                    case 21:
                        layer.fill(100,90,80)
                        layer.rect(0,0,this.width+1,this.height+1,2)
                    break
                    case 23:
                        layer.fill(140,100,80,this.fade)
                        layer.rect(0,0,this.width+game.tileset[0]*0.12,this.height)
                        layer.fill(120,80,60,this.fade)
                        for(let a=0,la=round(this.width/game.tileset[0]);a<la;a++){
                            layer.quad(
                                -this.width/2+(a+0.5)/la*this.width-game.tileset[0]*0.44,
                                -this.height*0.4,
                                -this.width/2+(a+0.5)/la*this.width+game.tileset[0]*0.44,
                                -this.height*0.4,
                                -this.width/2+(a+0.5)/la*this.width+game.tileset[0]*0.44,
                                -this.height*0.2,
                                -this.width/2+(a+0.5)/la*this.width-game.tileset[0]*0.44,
                                this.height*0.08
                            )
                            layer.quad(
                                -this.width/2+(a+0.5)/la*this.width+game.tileset[0]*0.44,
                                this.height*0.4,
                                -this.width/2+(a+0.5)/la*this.width-game.tileset[0]*0.44,
                                this.height*0.4,
                                -this.width/2+(a+0.5)/la*this.width-game.tileset[0]*0.44,
                                this.height*0.2,
                                -this.width/2+(a+0.5)/la*this.width+game.tileset[0]*0.44,
                                -this.height*0.08
                            )
                        }
                    break
                    default:
                        layer.fill(60)
                        layer.rect(0,0,this.width+1,this.height+1,2)
                    break
                }
            break
            case 29:
                switch(game.level){
                    case 21:
                        layer.fill(100,90,80)
                        layer.rect(0,0,this.width+1,this.height+1,2)
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+15,-this.height/2+20,
                            this.width/2-15,-this.height/2+20,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    default:
                        layer.fill(60)
                        layer.rect(0,0,this.width+1,this.height+1,2)
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+15,-this.height/2+20,
                            this.width/2-15,-this.height/2+20,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                }
            break
            case 31: case 33: case 36:
                layer.fill(255)
                layer.textSize(20)
                let texts=''
                if(game.level==19||game.level==24||game.level==27){
                    switch(this.type){
                        case 31:
                            texts='Fort'
                        break
                        case 33:
                            texts='Turret'
                        break
                        case 36:
                            texts='Outpost'
                        break
                    }
                }else{
                    texts=this.pos>=3&&(game.level==25||game.level==26)||this.pos>=5?'Node':'Point '+'ABCDE'[this.pos]
                }
                layer.text(texts,0,-120)
                switch(this.owner){
                    case -1:
                        layer.fill(200)
                    break
                    case 0:
                        layer.fill(255,255,0)
                    break
                    case 1:
                        layer.fill(15,75,255)
                    break
                    case 2:
                        layer.fill(225,15,255)
                    break
                    case 3:
                        layer.fill(55,225,15)
                    break
                    case 4:
                        layer.fill(225,105,15)
                    break
                    case 5:
                        layer.fill(15,235,255)
                    break
                    case 6:
                        layer.fill(125,15,255)
                    break
                }
                layer.rect(0,-100,60,6,2)
            break
            case 32:
                switch(game.level){
                    case 19:
                        layer.fill(90,85,105)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(120,220-min(480,this.reload)/5,170-min(480,this.reload)/10)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+10,-this.height/2+15,
                            this.width/2-10,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 22:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(120,220-min(480,this.reload)/5,170-min(480,this.reload)/10)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+20,-this.height/2+16,
                            this.width/2-20,-this.height/2+16,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 23:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 24:
                        layer.fill(120)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(170-min(480,this.reload)/10,220-min(480,this.reload)/5,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+10,-this.height/2+15,
                            this.width/2-10,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                }
            break
            case 35:
                switch(game.level){
                    case 22:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-this.reload/3)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+20,-this.height/2+16,
                            this.width/2-20,-this.height/2+16,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 23:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 25: case 26:
                        layer.fill(60,60,65)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    default:
                        layer.fill(160,100,40)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(140,80,20)
                        for(let a=0,la=round(this.width/game.tileset[0]*2);a<la;a++){
                            layer.rect(-this.width/2+(a+0.5)/2*game.tileset[0],0,game.tileset[1]/10,this.height)
                        }
                        layer.fill(220-this.reload/4)
                        layer.quad(
                            -this.width/2,-this.height/2,
                            -this.width/2+10,-this.height/2+10,
                            this.width/2-10,-this.height/2+10,
                            this.width/2,-this.height/2
                        )
                    break
                }
            break
            case 37:
                switch(game.level){
                    case 25: case 26:
                        if(this.position.y<game.tileset[1]*35){
                            layer.fill(145,90,75)
                            layer.rect(0,-this.height*0.3,this.width+1,this.height*0.4)
                            layer.rect(0,this.height*0.2,this.width+1,this.height*0.4)
                            layer.fill(120,50,45)
                            for(let a=0,la=floor(this.width/game.tileset[0]*2.5);a<la;a++){
                                layer.rect((a-la*0.5+0.5)*0.4*game.tileset[0],-this.height*0.3,game.tileset[1]/15,this.height*0.4)
                                layer.rect((a-la*0.5+0.5)*0.4*game.tileset[0],this.height*0.2,game.tileset[1]/15,this.height*0.4)
                            }
                        }else{
                            layer.fill(90,85,80)
                            layer.rect(0,-this.height*3/8,this.width,this.height/4)
                            layer.rect(0,this.height*3/8,this.width,this.height/4)
                            for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                                layer.quad(
                                    this.width*0.5-this.width*(a+1.25)/la-4,-this.height/2,
                                    this.width*0.5-this.width*(a+1.25)/la+4,-this.height/2,
                                    this.width*0.5-this.width*(a-0.25)/la+4,this.height/2,
                                    this.width*0.5-this.width*(a-0.25)/la-4,this.height/2
                                )
                            }
                        }
                    break
                    default:
                        switch(game.level){
                            case 27:
                                layer.fill(144)
                            break
                            default:
                                layer.fill(90,85,80)
                            break
                        }
                        layer.rect(0,-this.height/3,this.width,this.height/3)
                        layer.rect(0,this.height/3,this.width,this.height/3)
                        for(let a=0,la=this.width/game.tileset[0];a<la;a++){
                            layer.quad(
                                this.width*0.5-this.width*(a+0.75)/la-5,-this.height/2,
                                this.width*0.5-this.width*(a+0.75)/la+5,-this.height/2,
                                this.width*0.5-this.width*(a+0.25)/la+5,this.height/2,
                                this.width*0.5-this.width*(a+0.25)/la-5,this.height/2
                            )
                        }
                    break
                }
            break
            case 38:
                switch(game.level){
                    case 22: case 23:
                        layer.fill(90,85,80)
                        for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                            layer.rect(0,this.height/2-(a+0.5)/la*this.height,this.width,game.tileset[1]*0.1)
                        }
                        layer.beginShape()
                        layer.vertex(-this.width/2,this.height/2-ceil(this.height/game.tileset[1])*game.tileset[1])
                        layer.vertex(-this.width/2,this.height/2)
                        layer.vertex(-this.width*0.3,this.height/2)
                        for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                            layer.vertex(-this.width*0.15,this.height/2-(a+0.5)/la*this.height)
                            layer.vertex(-this.width*0.3,this.height/2-(a+1)/la*this.height)
                        }
                        layer.endShape()
                        layer.beginShape()
                        layer.vertex(this.width/2,this.height/2-ceil(this.height/game.tileset[1])*game.tileset[1])
                        layer.vertex(this.width/2,this.height/2)
                        layer.vertex(this.width*0.3,this.height/2)
                        for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                            layer.vertex(this.width*0.15,this.height/2-(a+0.5)/la*this.height)
                            layer.vertex(this.width*0.3,this.height/2-(a+1)/la*this.height)
                        }
                        layer.endShape()
                    break
                    case 25: case 26:
                        layer.fill(140,90,75)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(115,50,45)
                        for(let a=0,la=floor(this.height/game.tileset[1]*2.25);a<la;a++){
                            layer.rect(0,(a-la*0.5+0.5)*4/9*game.tileset[1],this.width,game.tileset[1]/15)
                        }
                    break
                }
            break
            case 39:
                for(let a=0,la=this.point.length;a<la;a++){
                    layer.fill(50)
                    layer.ellipse(a*40-la*20+20,0,this.width,this.width)
                    layer.fill(200)
                    if((
                        entities.players[game.players+[1,4,0,2,3][this.point[a]]].life<entities.players[game.players+[1,4,0,2,3][this.point[a]]].base.life*0.8||
                        entities.players[game.players+[1,4,0,2,3][this.point[a]]].id==0
                    )&&!game.pvp){
                        layer.fill(255,50,50)
                    }
                    if(game.pvp){
                        switch(entities.players[game.players+[1,4,0,2,3][this.point[a]]].id){
                            case 1:
                                layer.fill(15,75,255)
                            break
                            case 2:
                                layer.fill(225,15,255)
                            break
                            case 3:
                                layer.fill(55,225,15)
                            break
                            case 4:
                                layer.fill(225,105,15)
                            break
                            case 5:
                                layer.fill(15,235,255)
                            break
                            case 6:
                                layer.fill(125,15,255)
                            break
                        }
                    }
                    layer.push()
                    layer.translate(a*40-la*20+20,0)
                    layer.rotate(this.dir[a])
                    layer.triangle(-this.width*0.4,0,0,-this.width*0.4,this.width*0.4,0)
                    layer.rect(0,this.width*0.1,this.width*0.45,this.width*0.45)
                    layer.pop()
                    layer.fill(0)
                    layer.textSize(12)
                    layer.text('ABCDE'[this.point[a]],a*40-la*20+20,1)
                }
            break
            case 40:
                switch(game.level){
                    case 23:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                }
            break
            case 43:
                switch(game.level){
                    case 25: case 26:
                        if(this.position.y<game.tileset[1]*31){
                            layer.fill(210,195,150)
                            layer.rect(0,0,this.width+1,this.height+1)
                            layer.fill(180,165,135)
                            for(let a=0,la=round(this.width/game.tileset[0])*3;a<la;a++){
                                layer.rect(-this.width*0.5+(a+0.5)/la*this.width,0,game.tileset[0]*0.12,this.height+1)
                            }
                        }else{
                            layer.fill(60,60,65)
                            layer.rect(0,0,this.width+1,this.height+1)
                        }
                    break
                }
            break
            case 44:
                switch(game.level){
                    case 25: case 26:
                        if(this.position.y<game.tileset[1]*31){
                            layer.fill(210,195,150)
                            layer.triangle(
                                -this.width/2-0.5,-this.height/2-0.5,
                                -this.width/2-0.5,this.height/2+0.5,
                                this.width/2+0.5,this.height/2+0.5
                            )
                            layer.fill(180,165,135)
                            layer.quad(
                                -this.width/3-game.tileset[0]*0.06,this.height/2+0.5,
                                -this.width/3+game.tileset[0]*0.06,this.height/2+0.5,
                                -this.width/3+game.tileset[0]*0.06,this.height*(-1/3+0.06)-0.4,
                                -this.width/3-game.tileset[0]*0.06,this.height*(-1/3-0.06)-0.4
                            )
                            layer.quad(
                                -game.tileset[0]*0.06,this.height/2+0.5,
                                game.tileset[0]*0.06,this.height/2+0.5,
                                game.tileset[0]*0.06,this.height*0.06-0.4,
                                -game.tileset[0]*0.06,this.height*-0.06-0.4
                            )
                            layer.quad(
                                this.width/3-game.tileset[0]*0.06,this.height/2+0.5,
                                this.width/3+game.tileset[0]*0.06,this.height/2+0.5,
                                this.width/3+game.tileset[0]*0.06,this.height*(1/3+0.06)-0.4,
                                this.width/3-game.tileset[0]*0.06,this.height*(1/3-0.06)-0.4
                            )
                        }else{
                            layer.fill(60,60,65)
                            layer.triangle(
                                -this.width/2-0.5,-this.height/2-0.5,
                                -this.width/2-0.5,this.height/2+0.5,
                                this.width/2+0.5,this.height/2+0.5
                            )
                        }
                    break
                }
            break
            case 45:
                switch(game.level){
                    case 25: case 26:
                        if(this.position.y<game.tileset[1]*31){
                            layer.fill(210,195,150)
                            layer.triangle(
                                this.width/2+0.5,-this.height/2-0.5,
                                -this.width/2-0.5,this.height/2+0.5,
                                this.width/2+0.5,this.height/2+0.5
                            )
                            layer.fill(180,165,135)
                            layer.quad(
                                this.width/3+game.tileset[0]*0.06,this.height/2+0.5,
                                this.width/3-game.tileset[0]*0.06,this.height/2+0.5,
                                this.width/3-game.tileset[0]*0.06,this.height*(-1/3+0.06)-0.4,
                                this.width/3+game.tileset[0]*0.06,this.height*(-1/3-0.06)-0.4
                            )
                            layer.quad(
                                game.tileset[0]*0.06,this.height/2+0.5,
                                -game.tileset[0]*0.06,this.height/2+0.5,
                                -game.tileset[0]*0.06,this.height*0.06-0.4,
                                game.tileset[0]*0.06,this.height*-0.06-0.4
                            )
                            layer.quad(
                                -this.width/3+game.tileset[0]*0.06,this.height/2+0.5,
                                -this.width/3-game.tileset[0]*0.06,this.height/2+0.5,
                                -this.width/3-game.tileset[0]*0.06,this.height*(1/3+0.06)-0.4,
                                -this.width/3+game.tileset[0]*0.06,this.height*(1/3-0.06)-0.4
                            )
                        }else{
                            layer.fill(60,60,65)
                            layer.triangle(
                                this.width/2+0.5,-this.height/2-0.5,
                                -this.width/2-0.5,this.height/2+0.5,
                                this.width/2+0.5,this.height/2+0.5
                            )
                        }
                    break
                }
            break
            case 46:
                switch(game.level){
                    case 25: case 26:
                        layer.fill(60,60,65)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,-this.height/2-0.5
                        )
                    break
                }
            break
            case 47:
                switch(game.level){
                    case 25: case 26:
                        layer.fill(60,60,65)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                }
            break
            case 48:
                layer.fill(60,60,65)
                layer.rect(0,0,this.width+1,this.height+1)
                layer.fill(120,200,120)
                layer.quad(
                    -this.width/2+8,-this.height/2-0.5,
                    -this.width/2+24,-this.height/2+12,
                    this.width/2-24,-this.height/2+12,
                    this.width/2-8,-this.height/2-0.5
                )
            break
            case 49:
                layer.fill(220,100,120)
                layer.rect(0,0,this.width+1,this.height+1)
            break
            case 50:
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        layer.fill(200+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                        layer.fill(160+lcos(a*90+this.time)*40,80+lcos(a*90+this.time)*40,80+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                        layer.fill(240+lcos(a*90+this.time)*40,160+lcos(a*90+this.time)*40,160+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),-this.height*0.1,this.width*lcos(a*90+this.time)*0.08,this.height*0.2)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),this.height*0.1,this.width*lcos(a*90+this.time)*0.08,this.height*0.2)
                        layer.ellipse(this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.1,0,this.width*lcos(a*90+this.time)*0.2,this.height*0.08)
                        layer.ellipse(this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.1,0,this.width*lcos(a*90+this.time)*0.2,this.height*0.08)
                    }
                }
                layer.fill(180,1-this.recharge/60)
                layer.textSize(9)
                layer.text(types.weapon[types.player[this.weapon].weapon].name,0,-this.height)
            break
            case 51:
                layer.fill(220,100,120)
                layer.triangle(
                    -this.width/2-0.5,-this.height/2-0.5,
                    -this.width/2-0.5,this.height/2+0.5,
                    this.width/2+0.5,this.height/2+0.5
                )
            break
            case 52:
                layer.fill(220,100,120)
                layer.triangle(
                    this.width/2+0.5,-this.height/2-0.5,
                    -this.width/2-0.5,this.height/2+0.5,
                    this.width/2+0.5,this.height/2+0.5
                )
            break
            case 53:
                layer.fill(220,100,120)
                layer.triangle(
                    -this.width/2-0.5,-this.height/2-0.5,
                    -this.width/2-0.5,this.height/2+0.5,
                    this.width/2+0.5,-this.height/2-0.5
                )
            break
            case 54:
                layer.fill(220,100,120)
                layer.triangle(
                    -this.width/2-0.5,-this.height/2-0.5,
                    this.width/2+0.5,-this.height/2-0.5,
                    this.width/2+0.5,this.height/2+0.5
                )
            break
            
        }
        //layer.stroke(255,150,50)
        //layer.noFill()
        //layer.rect(0,0,this.width,this.height)
        layer.pop()
        if(false){
            layer.stroke(255,150,50)
            layer.noFill()
            layer.rect(this.bounder.position.x,this.bounder.position.y,this.bounder.width-10,this.bounder.height-10)
        }
    }
    displayOver(layer){
        layer.push()
        layer.translate(this.position.x,this.position.y)
        layer.noStroke()
        let list
        switch(this.type){
            case 1: case 17: case 18: case 20: case 21:
                switch(game.level){
                    case 6:
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                30+(this.position.y+this.balls[a][1])/game.edge[1]*30+this.balls[a][3]*30,
                                60-(this.position.y+this.balls[a][1])/game.edge[1]*15+this.balls[a][3]*30,
                                30+this.balls[a][3]*30
                            )
                            regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]/2,this.balls[a][2]/2,this.balls[a][4])
                        }
                    break
                    case 8: case 17:
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                85+this.balls[a][3]*30,
                                85+this.balls[a][3]*30,
                                85+this.balls[a][3]*30
                            )
                            regStar(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]*0.5,this.balls[a][2]*0.5,this.balls[a][2]*0.3,this.balls[a][2]*0.3,this.balls[a][4])
                        }
                    break
                    case 15: case 18:
                        layer.stroke(240,220,240)
                        layer.strokeWeight(6)
                        list=[1,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                layer.line(
                                    this.boundary[list[a]][b][0].x-this.position.x,
                                    this.boundary[list[a]][b][0].y-this.position.y,
                                    this.boundary[list[a]][b][1].x-this.position.x,
                                    this.boundary[list[a]][b][1].y-this.position.y
                                )
                            }
                        }
                    break
                    case 19:
                        layer.stroke(200,220,240)
                        layer.strokeWeight(6)
                        list=[1,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                layer.line(
                                    this.boundary[list[a]][b][0].x-this.position.x,
                                    this.boundary[list[a]][b][0].y-this.position.y,
                                    this.boundary[list[a]][b][1].x-this.position.x,
                                    this.boundary[list[a]][b][1].y-this.position.y
                                )
                            }
                        }
                    break
                }
            break
            case 2: case 34:
                switch(game.level){
                    case 6:
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                60+(this.position.y+this.balls[a][1])/game.edge[1]*60+this.balls[a][3]*30,
                                120-(this.position.y+this.balls[a][1])/game.edge[1]*30+this.balls[a][3]*30,
                                60+this.balls[a][3]*30
                            )
                            regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]/2,this.balls[a][2]/2,this.balls[a][4])
                        }
                    break
                    case 15: case 18:
                        layer.stroke(240,220,240)
                        layer.strokeWeight(6)
                        list=[1,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                layer.line(
                                    this.boundary[list[a]][b][0].x-this.position.x,
                                    this.boundary[list[a]][b][0].y-this.position.y,
                                    this.boundary[list[a]][b][1].x-this.position.x,
                                    this.boundary[list[a]][b][1].y-this.position.y
                                )
                            }
                        }
                    break
                    case 19:
                        layer.stroke(200,220,240)
                        layer.strokeWeight(6)
                        list=[1,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                layer.line(
                                    this.boundary[list[a]][b][0].x-this.position.x,
                                    this.boundary[list[a]][b][0].y-this.position.y,
                                    this.boundary[list[a]][b][1].x-this.position.x,
                                    this.boundary[list[a]][b][1].y-this.position.y
                                )
                            }
                        }
                    break
                    case 28:
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2-5,-this.height/2-0.5,
                            -this.width/2+10,-this.height/2+12,
                            this.width/2-10,-this.height/2+12,
                            this.width/2+5,-this.height/2-0.5
                        )
                    break
                }
            break
            case 4: case 13: case 32:
                switch(game.level){
                    case 15: case 18:
                        layer.stroke(240,220,240)
                        layer.strokeWeight(6)
                        list=[1,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                layer.line(
                                    this.boundary[list[a]][b][0].x-this.position.x,
                                    this.boundary[list[a]][b][0].y-this.position.y,
                                    this.boundary[list[a]][b][1].x-this.position.x,
                                    this.boundary[list[a]][b][1].y-this.position.y
                                )
                            }
                        }
                    break
                    case 19:
                        layer.stroke(200,220,240)
                        layer.strokeWeight(6)
                        list=[1,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                layer.line(
                                    this.boundary[list[a]][b][0].x-this.position.x,
                                    this.boundary[list[a]][b][0].y-this.position.y,
                                    this.boundary[list[a]][b][1].x-this.position.x,
                                    this.boundary[list[a]][b][1].y-this.position.y
                                )
                            }
                        }
                    break
                    case 23: case 26:
                        switch(this.type){
                            case 13:
                                layer.fill(120,220-min(480,this.reload)/5,170-min(480,this.reload)/10)
                                layer.quad(
                                    -this.width/2-20,-this.height/2-0.5,
                                    -this.width/2,-this.height/2+16,
                                    this.width/2,-this.height/2+16,
                                    this.width/2+20,-this.height/2-0.5
                                )
                            break
                            case 32:
                                layer.fill(170-min(480,this.reload)/6,220-min(480,this.reload)/6,120)
                                layer.quad(
                                    -this.width/2,-this.height/2-0.5,
                                    -this.width/2+20,-this.height/2+16,
                                    this.width/2-20,-this.height/2+16,
                                    this.width/2,-this.height/2-0.5
                                )
                            break
                        }
                    break
                    case 28:
                        switch(this.type){
                            case 4:
                                layer.fill(220-min(480,this.reload)/5,120,120)
                                layer.quad(
                                    -this.width/2-5,-this.height/2-0.5,
                                    -this.width/2+10,-this.height/2+12,
                                    this.width/2-10,-this.height/2+12,
                                    this.width/2+5,-this.height/2-0.5
                                )
                            break
                        }
                    break
                }
            break
            case 15:
                switch(game.level){
                    case 19:
                        layer.stroke(200,220,240)
                        layer.strokeWeight(6)
                        list=[1,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                layer.line(
                                    this.boundary[list[a]][b][0].x-this.position.x,
                                    this.boundary[list[a]][b][0].y-this.position.y,
                                    this.boundary[list[a]][b][1].x-this.position.x,
                                    this.boundary[list[a]][b][1].y-this.position.y
                                )
                            }
                        }
                    break
                    case 23:
                        layer.fill(220-min(480,this.reload)/5,170-min(480,this.reload)/10,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+20,-this.height/2+16,
                            this.width/2-20,-this.height/2+16,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                }
            break
            case 16: case 50:
                if(this.infoFade>0){
                    if(this.type==16){
                        if(game.level==22){
                            layer.scale(1-game.pointAnim[2])
                        }else if(game.level==25){
                            layer.scale(1-game.pointAnim[1])
                        }
                    }
                    layer.fill(200,(1-this.recharge/60)*this.infoFade)
                    layer.rect(0,this.height/2+26,180,42,5)
                    layer.fill(0,(1-this.recharge/60)*this.infoFade)
                    layer.textSize(9)
                    if(types.player[this.weapon].dpsBuff==0){
                        layer.text(types.player[this.weapon].desc,0,this.height/2+26,180,42)
                    }else{
                        layer.text(types.player[this.weapon].desc,0,this.height/2+26-7,180,28)
                        layer.text(round(60*types.weapon[types.player[this.weapon].weapon].ammo*types.weapon[types.player[this.weapon].weapon].damage/(types.weapon[types.player[this.weapon].weapon].stop+(types.weapon[types.player[this.weapon].weapon].reload+types.weapon[types.player[this.weapon].weapon].cooldown)*(types.weapon[types.player[this.weapon].weapon].ammo-1))*types.player[this.weapon].damageBuff*types.player[this.weapon].reloadBuff*types.player[this.weapon].dpsBuff)+' DPS',0,this.height/2+26+14,180,14)
                    }
                }
            break
            case 23:
                switch(game.level){
                    case 19:
                        layer.stroke(200,220,240)
                        layer.strokeWeight(6)
                        list=[1,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                layer.line(
                                    this.boundary[list[a]][b][0].x-this.position.x,
                                    this.boundary[list[a]][b][0].y-this.position.y,
                                    this.boundary[list[a]][b][1].x-this.position.x,
                                    this.boundary[list[a]][b][1].y-this.position.y
                                )
                            }
                        }
                    break
                    case 23:
                        layer.fill(max(120,200-min(480,this.reload)/5),120,max(120,200-min(480,this.reload)/5))
                        layer.quad(
                            -this.width/2-20,-this.height/2-0.5,
                            -this.width/2,-this.height/2+16,
                            this.width/2,-this.height/2+16,
                            this.width/2+20,-this.height/2-0.5
                        )
                    break
                }
            break
            case 27:
                if(this.infoFade>0&&(game.level==23||game.level==25||game.level==26)){
                    if(game.level==22){
                        layer.scale(1-game.pointAnim[2])
                    }
                    layer.fill(200,(1-this.recharge/60)*this.infoFade)
                    layer.rect(0,this.height/2+26,180,42,5)
                    layer.fill(0,(1-this.recharge/60)*this.infoFade)
                    layer.textSize(9)
                    if(types.player[this.weapon].dpsBuff==0){
                        layer.text(types.player[this.weapon].desc,0,this.height/2+26,180,42)
                    }else{
                        layer.text(types.player[this.weapon].desc,0,this.height/2+26-7,180,28)
                        layer.text(round(60*types.weapon[types.player[this.weapon].weapon].ammo*types.weapon[types.player[this.weapon].weapon].damage/(types.weapon[types.player[this.weapon].weapon].stop+(types.weapon[types.player[this.weapon].weapon].reload+types.weapon[types.player[this.weapon].weapon].cooldown)*(types.weapon[types.player[this.weapon].weapon].ammo-1))*types.player[this.weapon].damageBuff*types.player[this.weapon].reloadBuff*types.player[this.weapon].dpsBuff)+' DPS',0,this.height/2+26+14,180,14)
                    }
                }
            break
            case 31: case 33: case 36: case 42:
                if(game.level==23){
                    let place=this.type==42?[1,3]:[[0,1],[1,2],[1,0],[2,1],[1,1],[0,0],[2,0],[0,2],[2,2]][this.pos]
                    let texts=''
                    if(game.level==19||game.level==24||game.level==27){
                        switch(this.type){
                            case 31:
                                texts='Fort'
                            break
                            case 33:
                                texts='Turret'
                            break
                            case 36:
                                texts='Outpost'
                            break
                            case 42:
                                texts='Rogue'
                            break
                        }
                    }else{
                        texts=this.type==42?'Rogue':this.pos>=3&&(game.level==25||game.level==26)||this.pos>=5?'Node':'Point '+'ABCDE'[this.pos]
                    }
                    graphics.overlay[0].fill(255)
                    graphics.overlay[0].textSize(10)
                    graphics.overlay[0].text(texts,25+place[0]*40,15+place[1]*25)
                    switch(this.owner){
                        case -1:
                            graphics.overlay[0].fill(200)
                        break
                        case 0:
                            graphics.overlay[0].fill(255,255,0)
                        break
                        case 1:
                            graphics.overlay[0].fill(15,75,255)
                        break
                        case 2:
                            graphics.overlay[0].fill(225,15,255)
                        break
                        case 3:
                            graphics.overlay[0].fill(55,225,15)
                        break
                        case 4:
                            graphics.overlay[0].fill(225,105,15)
                        break
                        case 5:
                            graphics.overlay[0].fill(15,235,255)
                        break
                        case 6:
                            graphics.overlay[0].fill(125,15,255)
                        break
                    }
                    graphics.overlay[0].rect(25+place[0]*40,25+place[1]*25,30,3,1)
                    if(this.type==33&&this.pos==4){
                        for(let a=0,la=this.timers.length;a<la;a++){
                            graphics.overlay[0].fill(255)
                            graphics.overlay[0].textSize(10)
                            graphics.overlay[0].text(formatTime(this.timers[a]),25+(place[0]+2)*40,15+a*25)
                            switch(a+1){
                                case 1:
                                    graphics.overlay[0].fill(15,75,255)
                                break
                                case 2:
                                    graphics.overlay[0].fill(225,15,255)
                                break
                                case 3:
                                    graphics.overlay[0].fill(55,225,15)
                                break
                                case 4:
                                    graphics.overlay[0].fill(225,105,15)
                                break
                                case 5:
                                    graphics.overlay[0].fill(15,235,255)
                                break
                                case 6:
                                    graphics.overlay[0].fill(125,15,255)
                                break
                            }
                            graphics.overlay[0].rect(25+(place[0]+2)*40,25+a*25,30,3,1)
                        }
                    }
                }else if(game.level==25||game.level==26){
                    let place=[[1,1],[2,0],[0,0],[1,0],[0,1],[2,1]][this.pos]
                    let texts=''
                    if(game.level==19||game.level==24||game.level==27){
                        switch(this.type){
                            case 31:
                                texts='Fort'
                            break
                            case 33:
                                texts='Turret'
                            break
                            case 36:
                                texts='Outpost'
                            break
                            case 42:
                                texts='Rogue'
                            break
                        }
                    }else{
                        texts=this.type==42?'Rogue':this.pos>=3&&(game.level==25||game.level==26)||this.pos>=5?'Node':'Point '+'ABCDE'[this.pos]
                    }
                    graphics.overlay[0].fill(255)
                    graphics.overlay[0].textSize(10)
                    graphics.overlay[0].text(texts,25+place[0]*40,15+place[1]*25)
                    switch(this.owner){
                        case -1:
                            graphics.overlay[0].fill(200)
                        break
                        case 0:
                            graphics.overlay[0].fill(255,255,0)
                        break
                        case 1:
                            graphics.overlay[0].fill(15,75,255)
                        break
                        case 2:
                            graphics.overlay[0].fill(225,15,255)
                        break
                        case 3:
                            graphics.overlay[0].fill(55,225,15)
                        break
                        case 4:
                            graphics.overlay[0].fill(225,105,15)
                        break
                        case 5:
                            graphics.overlay[0].fill(15,235,255)
                        break
                        case 6:
                            graphics.overlay[0].fill(125,15,255)
                        break
                    }
                    graphics.overlay[0].rect(25+place[0]*40,25+place[1]*25,30,3,1)
                    if(this.type==33&&this.pos==2&&game.pvp&&game.level==26){
                        for(let a=0,la=this.timers.length;a<la;a++){
                            graphics.overlay[0].fill(255)
                            graphics.overlay[0].textSize(10)
                            graphics.overlay[0].text(formatTime(this.timers[a]),25+(place[0]+3)*40,15+a*25)
                            switch(a+1){
                                case 1:
                                    graphics.overlay[0].fill(15,75,255)
                                break
                                case 2:
                                    graphics.overlay[0].fill(225,15,255)
                                break
                                case 3:
                                    graphics.overlay[0].fill(55,225,15)
                                break
                                case 4:
                                    graphics.overlay[0].fill(225,105,15)
                                break
                                case 5:
                                    graphics.overlay[0].fill(15,235,255)
                                break
                                case 6:
                                    graphics.overlay[0].fill(125,15,255)
                                break
                            }
                            graphics.overlay[0].rect(25+(place[0]+3)*40,25+a*25,30,3,1)
                        }
                    }
                }else{
                    let texts=''
                    if(game.level==19||game.level==24||game.level==27){
                        switch(this.type){
                            case 31:
                                texts='Fort'
                            break
                            case 33:
                                texts='Turret'
                            break
                            case 36:
                                texts='Outpost'
                            break
                            case 42:
                                texts='Rogue'
                            break
                        }
                    }else{
                        texts=this.type==42?'Rogue':this.pos>=3&&(game.level==25||game.level==26)||this.pos>=5?'Node':'Point '+'ABCDE'[this.pos]
                    }
                    graphics.overlay[0].fill(255)
                    graphics.overlay[0].textSize(10)
                    graphics.overlay[0].text(texts,25+this.pos*40,15)
                    switch(this.owner){
                        case -1:
                            graphics.overlay[0].fill(200)
                        break
                        case 0:
                            graphics.overlay[0].fill(255,255,0)
                        break
                        case 1:
                            graphics.overlay[0].fill(15,75,255)
                        break
                        case 2:
                            graphics.overlay[0].fill(225,15,255)
                        break
                        case 3:
                            graphics.overlay[0].fill(55,225,15)
                        break
                        case 4:
                            graphics.overlay[0].fill(225,105,15)
                        break
                        case 5:
                            graphics.overlay[0].fill(15,235,255)
                        break
                        case 6:
                            graphics.overlay[0].fill(125,15,255)
                        break
                    }
                    graphics.overlay[0].rect(25+this.pos*40,25,30,3,1)
                    if(this.type==31&&game.level==24||this.type==33&&game.level==23&&this.pos==4||game.level==28){
                        for(let a=0,la=this.timers.length;a<la;a++){
                            graphics.overlay[0].fill(255)
                            graphics.overlay[0].textSize(10)
                            graphics.overlay[0].text(formatTime(this.timers[a]),25+this.pos*40,15+(a+1)*25)
                            switch(a+1){
                                case 1:
                                    graphics.overlay[0].fill(15,75,255)
                                break
                                case 2:
                                    graphics.overlay[0].fill(225,15,255)
                                break
                                case 3:
                                    graphics.overlay[0].fill(55,225,15)
                                break
                                case 4:
                                    graphics.overlay[0].fill(225,105,15)
                                break
                                case 5:
                                    graphics.overlay[0].fill(15,235,255)
                                break
                                case 6:
                                    graphics.overlay[0].fill(125,15,255)
                                break
                            }
                            graphics.overlay[0].rect(25+this.pos*40,25+(a+1)*25,30,3,1)
                        }
                    }else if(this.pos==0&&game.level==27&&game.pvp){
                        graphics.overlay[0].fill(255)
                        graphics.overlay[0].textSize(10)
                        graphics.overlay[0].text(formatTime(min(game.time,10800)),25+(this.pos+1.5)*40,15+25)
                    }
                }
            break
            case 35:
                switch(game.level){
                    case 23:
                        switch(this.pos){
                            case 0:
                                layer.fill(220-this.reload/3)
                            break
                            case 1:
                                layer.fill(160-this.reload/15,180-this.reload/15,200-this.reload/15)
                            break
                            case 2:
                                switch(this.target){
                                    case 1:
                                        layer.fill(15,75,255)
                                    break
                                    case 2:
                                        layer.fill(225,15,255)
                                    break
                                    case 3:
                                        layer.fill(55,225,15)
                                    break
                                    case 4:
                                        layer.fill(225,105,15)
                                    break
                                    case 5:
                                        layer.fill(15,235,255)
                                    break
                                    case 6:
                                        layer.fill(125,15,255)
                                    break
                                }
                            break
                        }
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+20,-this.height/2+16,
                            this.width/2-20,-this.height/2+16,
                            this.width/2,-this.height/2-0.5
                        )
                        switch(this.pos){
                            case 1:
                                layer.fill(255)
                                layer.textSize(10)
                                layer.text('Deploy',0,-this.height/2+8)
                            break
                            case 2:
                                layer.fill(255)
                                layer.textSize(10)
                                layer.text('Target',0,-this.height/2+8)
                            break
                        }
                    break
                    case 26:
                        layer.fill(220-this.reload*8)
                        layer.quad(
                            -this.width/2-20,-this.height/2-0.5,
                            -this.width/2,-this.height/2+16,
                            this.width/2,-this.height/2+16,
                            this.width/2+20,-this.height/2-0.5
                        )
                        layer.fill(120)
                        regTriangle(layer,0,-this.height/2+7+this.pos*2,6,6,this.pos*60)
                    break
                }
            break
            case 40:
                switch(game.level){
                    case 23:
                        layer.fill(220-min(480,this.reload)/5,70+min(480,this.reload)/10,170-min(480,this.reload)/10)
                        layer.quad(
                            -this.width/2-20,-this.height/2-0.5,
                            -this.width/2,-this.height/2+16,
                            this.width/2,-this.height/2+16,
                            this.width/2+20,-this.height/2-0.5
                        )
                    break
                }
            break
            case 49: case 51: case 52: case 53: case 54:
                for(let a=0,la=this.balls.length;a<la;a++){
                    layer.fill(
                        220+this.balls[a][3]*40,
                        100+this.balls[a][3]*40,
                        120+this.balls[a][3]*40
                    )
                    regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]/2,this.balls[a][2]/2,this.balls[a][4])
                }
            break
        }
        layer.pop()
        if(game.bound){
            this.displayBound(layer)
        }
    }
    displayBound(layer){
        layer.stroke(50+(this.mutate?100:0),50+this.type*100,200)
        layer.strokeWeight(4)
        for(let a=0,la=8;a<la;a++){
            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                layer.line(
                    this.position.x+this.boundary[a][b][0].x+(a==2?-2:a==3?2:2)-this.position.x,
                    this.position.y+this.boundary[a][b][0].y+(a==0?-2:a==1?2:2)-this.position.y,
                    this.position.x+this.boundary[a][b][1].x+(a==2?-2:a==3?2:-2)-this.position.x,
                    this.position.y+this.boundary[a][b][1].y+(a==0?-2:a==1?2:-2)-this.position.y
                )
            }
        }
    }
    update(){
        this.time++
        switch(this.type){
            case 2:
                if(game.level==19&&this.reload>0){
                    this.reload-=(game.level==19?1/3:1)
                }
            break
            case 3:
                if(game.level==25||game.level==26){
                    if(game.water<this.position.y){
                        this.bounder.position.x=this.position.x+this.width/2
                        this.bounder.position.y=this.position.y+this.height/2
                        this.bounder.width=this.width
                        this.bounder.height=this.height
                    }else if(game.water<this.position.y+this.height){
                        this.bounder.position.x=this.position.x+this.width/2
                        this.bounder.position.y=this.height/2+this.position.y/2+game.water/2
                        this.bounder.width=this.width
                        this.bounder.height=this.position.y+this.height-game.water
                    }else{
                        this.bounder.position.x=0
                        this.bounder.position.y=0
                        this.bounder.width=0
                        this.bounder.height=0
                    }
                }
            break
            case 4: case 23: case 32: case 35: case 40:
                if(this.reload>0){
                    this.reload-=(game.level==25||game.level==26?0.25:game.level==24?0.25:game.level==22||game.level==23?0.5:game.level==19&&this.type!=35&&!(this.type==32&&game.pvp)?1/3:1)
                }
            break
            case 6:
                let speed=game.level==17?3:2
                this.position.x+=speed
                this.bounder.position.x+=speed
                this.velocity.x=speed
                for(let a=0,la=this.boundary.length;a<la;a++){
                    for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                        for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                            this.boundary[a][b][c].x+=speed
                        }
                    }
                }
                if(this.time>game.edge[0]*0.1){
                    this.position.y+=speed
                    this.velocity.y=speed
                    for(let a=0,la=this.boundary.length;a<la;a++){
                        for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                            for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                this.boundary[a][b][c].y+=speed
                            }
                        }
                    }
                    if(!this.disable){
                        this.bounder.position.y+=600
                        for(let a=0,la=this.carry.length;a<la;a++){
                            this.carry[a].disable=false
                        }
                        this.disable=true
                    }
                }else{
                    for(let a=0,la=this.carry.length;a<la;a++){
                        this.carry[a].position.x+=speed
                    }
                }
                if(this.position.y>game.edge[1]+50){
                    this.remove=true
                }
            break
            case 8: case 9: case 12: case 27: case 41: case 50:
                if(this.recharge>0){
                    this.recharge--
                }
                if((this.type==8||this.type==27)&&this.falling>0&&game.level!=19){
                    let speed=1
                    this.falling-=speed
                    this.position.y+=speed
                    this.bounder.position.y+=speed
                    for(let a=0,la=this.boundary.length;a<la;a++){
                        for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                            for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                this.boundary[a][b][c].y+=speed
                            }
                        }
                    }
                }
                if((this.type==27||this.type==50)&&(game.level==23||game.level==25||game.level==26||game.level==28)){
                    let visible=false
                    for(let a=0,la=game.gaming;a<la;a++){
                        if(dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)<150){
                            visible=true
                        }
                    }
                    this.infoFade=smoothAnim(this.infoFade,visible,0,1,5)
                }
            break
            case 11:
                if(game.level==22&&(abs(this.base.position.y-game.tileset[1]*54.75)<1||abs(this.base.position.y-game.tileset[1]*53.75)<1)&&!game.point[1]&&this.height>0){
                    this.height-=0.1
                    this.bounder.height-=0.1
                    this.position.y+=0.05
                    this.bounder.position.y+=0.05
                    this.velocity.y=0.05
                    for(let a=0,la=this.boundary.length;a<la;a++){
                        for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                            for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                if(this.boundary[a][b][c].y<this.position.y){
                                    this.boundary[a][b][c].y+=0.1
                                }
                            }
                        }
                    }
                }else if(game.level==23){
                    this.height=smoothAnim(this.height,game.point[1]>0&&game.point[1]<=game.players&&(
                            this.keyPoint==-1&&abs(entities.players[game.point[1]-1].position.x-this.position.x)<this.width+80&&abs(entities.players[game.point[1]-1].position.y-this.position.y)<60||
                            this.keyPoint>=0&&entities.players[game.players+this.keyPoint].id==game.point[1]
                        ),0,this.base.height,1)
                    this.position.y=this.base.position.y+this.base.height/2-this.height/2
                }
            break
            case 13:
                if(this.reload>0){
                    if(this.reload==479&&game.level==23){
                        this.reduction=false
                        for(let e=0,le=entities.walls[1].length;e<le;e++){
                            if(entities.walls[1][e].type==33&&dist(this.position.x,this.position.y,entities.walls[1][e].position.x,entities.walls[1][e].position.y)<300){
                                if(entities.walls[1][e].pos==4){
                                    this.reduction=true
                                }
                            }
                        }
                    }
                    this.reload-=(game.level==23?(this.reduction?0.5:0.25):game.level==19||game.level==26?0.5:1)
                    if((this.reload==479||this.reload==459||this.reload==439||this.reload==419||this.reload==399)&&game.level!=23&&game.level!=26){
                        let mult=0
                        switch(game.level){
                            case 6:
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,65,random(-100,-80),this.align,200,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,65,random(-160,-140),this.align,200,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,65,random(140,160),this.align,200,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,65,random(80,100),this.align,200,180,false,-1))
                            break
                            case 15: case 18:
                                if(this.reload==479||this.reload==459){
                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,97,-120+random(-15,15),this.align,400,300,false,-1))
                                    let mult=random(1,1.5)
                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                }
                            break
                            case 19:
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,65,random(-100,-90),this.align,200,180,false,-1))
                                mult=random(1,1.5)
                                entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,65,random(90,100),this.align,200,180,false,-1))
                                mult=random(1,1.5)
                                entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                            break
                            case 22: case 24:
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,65,random(-100,-90),this.align,200,180,false,-1))
                                mult=random(1.2,1.8)
                                entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,65,random(90,100),this.align,200,180,false,-1))
                                mult=random(1.2,1.8)
                                entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                            break
                            default:
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-10,this.position.y,65,random(-92,-88),this.align,200,180,false,-1))
                            break
                        }
                    }
                }
            break
            case 15:
                if(this.reload>0){
                    this.reload-=(game.level==19?0.5:1)
                    switch(game.level){
                        case 19: case 22: case 23: case 24:
                            if(this.reload>=399&&this.reload<=479&&this.reload%16==15){
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,5,-120+random(-15,15),this.align,120,300,false,-1))
                                let mult=random(1,1.5)
                                entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,5,120+random(-15,15),this.align,120,300,false,-1))
                                mult=random(1,1.5)
                                entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                            }
                        break
                        default:
                            if(this.reload==479||this.reload==439){
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-15,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-21,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-27,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-33,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-39,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-45,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-51,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-57,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-63,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-69,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-75,this.align,150,180,false,-1))
                            }else if(this.reload==459){
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-18,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-24,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-30,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-36,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-42,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-48,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-54,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-60,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-66,this.align,150,180,false,-1))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-72,this.align,150,180,false,-1))
                            }
                        break
                    }
                }
            break
            case 16:
                let visible=false
                for(let a=0,la=game.gaming;a<la;a++){
                    if(dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)<150){
                        visible=true
                    }
                }
                this.infoFade=smoothAnim(this.infoFade,visible,0,1,5)
                if(this.recharge>0&&(game.level==15||game.level==18||game.level==19||game.level==22||game.level==23||game.level==24||game.level==25||game.level==26||game.level==27)){
                    this.recharge--
                }
                if(this.falling>0){
                    let speed=1
                    this.falling-=speed
                    this.position.y+=speed
                    this.bounder.position.y+=speed
                    for(let a=0,la=this.boundary.length;a<la;a++){
                        for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                            for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                this.boundary[a][b][c].y+=speed
                            }
                        }
                    }
                }
                if(game.level==23){
                    this.visible=smoothAnim(this.visible,game.point[2]>0&&game.point[2]<=game.players&&(abs(entities.players[game.point[2]-1].position.x-this.position.x)<300&&abs(entities.players[game.point[2]-1].position.y-this.position.y)<120),0,1,10)
                }else if(game.level==26){
                    this.visible=smoothAnim(this.visible,game.point[1]>0&&game.point[1]<=game.players&&(abs(entities.players[game.point[1]-1].position.x-this.position.x)<300&&abs(entities.players[game.point[1]-1].position.y-this.position.y)<120),0,1,10)
                }
            break
            case 31:
                if(game.level==24&&this.owner>0&&this.owner<=game.players){
                    this.timers[this.owner-1]++
                }
            break
            case 33:
                if(game.level==23&&this.pos==4&&this.owner>0&&this.owner<=game.players){
                    this.timers[this.owner-1]++
                    if((this.timers[this.owner-1]>10800&&this.raided==0||this.timers[this.owner-1]>14400&&this.raided==1)&&this.raidTick==0){
                        this.raided++
                        game.raid++
                        let spawn='yZ'
                        for(let a=0,la=levels[game.level].length;a<la;a++){
                            for(let b=0,lb=levels[game.level][a].length;b<lb;b++){
                                for(let c=0,lc=spawn.length;c<lc;c++){
                                    if(levels[game.level][a][b]==spawn[c]){
                                        this.loc[c][0]=game.tileset[0]/2+b*game.tileset[0]
                                        this.loc[c][1]=game.tileset[1]/2+a*game.tileset[1]
                                    }
                                }
                            }
                        }
                        this.raidTick=15
                    }
                    if(this.raidTick>0&&this.time%15==0){
                        this.raidTick--
                        for(let c=0,lc=this.loc.length;c<lc;c++){
                            entities.players.push(new player(this.layer,this.loc[c][0]+random(-20,20),this.loc[c][1],0,0,[],true,findName(this.raidTick>=12?(this.raided==1?'RaiderPelleter':'RaiderInterceptor'):this.raidTick>=7?(this.raided==1?'RaiderSwarmer':'RaiderBaller'):'RaiderTrapper',types.player),game.index))
                        }
                    }
                }else if(game.level==26&&this.pos==2&&this.owner>0&&this.owner<=game.players){
                    this.timers[this.owner-1]++
                }else if(game.level==28&&this.owner>0&&this.owner<=game.players){
                    this.timers[this.owner-1]++
                }
            break
            case 37:
                if(game.level==22){
                    if(abs(this.base.position.x-game.tileset[0]*129.5)<1&&!game.point[1]&&this.width<game.tileset[0]*6){
                        this.width+=0.1
                        this.bounder.width+=0.1
                        this.position.x+=0.05
                        this.bounder.position.x+=0.05
                        this.velocity.x=0.05
                        for(let a=0,la=this.boundary.length;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                    if(this.boundary[a][b][c].x>this.position.x){
                                        this.boundary[a][b][c].x+=0.1
                                    }
                                }
                            }
                        }
                    }else if(abs(this.base.position.x-game.tileset[0]*20.5)<1&&!game.point[1]&&this.width<game.tileset[0]*7){
                        this.width+=0.1
                        this.bounder.width+=0.1
                        this.position.x+=0.05
                        this.bounder.position.x+=0.05
                        this.velocity.x=0.05
                        for(let a=0,la=this.boundary.length;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                    if(this.boundary[a][b][c].x>this.position.x){
                                        this.boundary[a][b][c].x+=0.1
                                    }
                                }
                            }
                        }
                    }else if(abs(this.base.position.x-game.tileset[0]*20.5)<1&&!game.point[0]&&this.width>game.tileset[0]){
                        this.width-=0.1
                        this.bounder.width-=0.1
                        this.position.x-=0.05
                        this.bounder.position.x-=0.05
                        this.velocity.x=-0.05
                        for(let a=0,la=this.boundary.length;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                    if(this.boundary[a][b][c].x>this.position.x){
                                        this.boundary[a][b][c].x-=0.1
                                    }
                                }
                            }
                        }
                    }
                }
            break
            case 38:
                if(game.level==22){
                    if((
                        abs(this.position.x-game.tileset[0]*67.5)<1&&!game.point[3]||
                        abs(this.position.x-game.tileset[0]*139.5)<1&&!game.point[2]
                    )&&this.height>0){
                        this.height-=0.1
                        this.bounder.height-=0.1
                        this.internalBounder.height-=0.1
                        this.position.y-=0.05
                        this.bounder.position.y-=0.05
                        this.internalBounder.position.y-=0.05
                        this.velocity.y=-0.05
                        for(let a=0,la=this.boundary.length;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                    if(this.boundary[a][b][c].y>this.position.y){
                                        this.boundary[a][b][c].y-=0.1
                                    }
                                }
                            }
                        }
                    }else if(this.base.height==10){
                        if(!game.point[2]&&this.height<game.tileset[1]){
                            this.height+=0.1
                            this.bounder.height+=0.1
                            this.internalBounder.height+=0.1
                            this.position.y+=0.05
                            this.bounder.position.y+=0.05
                            this.internalBounder.position.y+=0.05
                            this.velocity.y=0.05
                            for(let a=0,la=this.boundary.length;a<la;a++){
                                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                        if(a==0||a==2&&c==1||a==3&&c==1){
                                            this.boundary[a][b][c].y+=0.1
                                        }
                                    }
                                }
                            }
                        }else if(game.point[2]&&this.height>0){
                            this.height-=1
                            this.bounder.height-=1
                            this.internalBounder.height-=1
                            this.position.y-=0.5
                            this.bounder.position.y-=0.5
                            this.internalBounder.position.y-=0.5
                            this.velocity.y=-0.5
                            for(let a=0,la=this.boundary.length;a<la;a++){
                                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                        if(a==0||a==2&&c==1||a==3&&c==1){
                                            this.boundary[a][b][c].y-=1
                                        }
                                    }
                                }
                            }
                        }
                    }
                }else if(game.level==23&&(this.position.x<300||this.position.x>game.edge[0]-300)){
                    if(abs(this.position.x-game.tileset[0]*5.5)<1){
                        game.gate[0]=this.height>10
                    }
                    if(abs(this.position.x-(game.edge[0]-game.tileset[0]*5.5))<1){
                        game.gate[1]=this.height>10
                    }
                    if(game.point[3]>0&&game.point[3]<=game.players&&abs(this.base.position.x-entities.players[game.point[3]-1].position.x)<200&&abs(this.base.position.y+this.base.height/2-entities.players[game.point[3]-1].position.y-75)<150){
                        if(this.height>0){
                            this.height-=0.1
                            this.bounder.height-=0.1
                            this.internalBounder.height-=0.1
                            this.position.y-=0.05
                            this.bounder.position.y-=0.05
                            this.internalBounder.position.y-=0.05
                            this.velocity.y=-0.05
                            for(let a=0,la=this.boundary.length;a<la;a++){
                                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                        if(this.boundary[a][b][c].y>this.position.y){
                                            this.boundary[a][b][c].y-=0.1
                                        }
                                    }
                                }
                            }
                        }
                    }else{
                        if(this.height<this.base.height){
                            this.height+=0.1
                            this.bounder.height+=0.1
                            this.internalBounder.height+=0.1
                            this.position.y+=0.05
                            this.bounder.position.y+=0.05
                            this.internalBounder.position.y+=0.05
                            this.velocity.y=0.05
                            for(let a=0,la=this.boundary.length;a<la;a++){
                                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                        if(a==0||a==2&&c==1||a==3&&c==1){
                                            this.boundary[a][b][c].y+=0.1
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            break
        }
        if(this.reload<=0&&this.reload!=-1){
            this.reload=0
        }
        if(this.type!=7&&this.height>1){
            for(let a=0,la=this.collide.length;a<la;a++){
                for(let b=0,lb=this.collide[a].length;b<lb;b++){
                    let c=this.collide[a][b]
                    if(
                        a==0&&
                        this.type!=3&&this.type!=5&&this.type!=8&&this.type!=9&&this.type!=10&&this.type!=11&&this.type!=12&&this.type!=14&&this.type!=16&&this.type!=27&&
                        this.type!=31&&this.type!=33&&this.type!=36&&this.type!=39&&this.type!=41&&this.type!=42&&this.type!=50&&
                        !(this.type==37&&c.previous.position.y>c.position.y)&&
                        (
                            c.type==5||c.type==8||c.type==17||c.type==28||c.type==29||
                            c.type==30||c.type==34||c.type==35||c.type==42||c.type==51||
                            c.type==52||c.type==60||c.type==61||c.type==62||c.type==65||
                            c.type==68||c.type==69||c.type==70||c.type==73||c.type==83||
                            c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||
                            c.type==95||c.type==97||c.type==98||c.type==102||c.type==104||
                            c.type==106||c.type==107||c.type==108||c.type==110||c.type==111||
                            c.type==113||c.type==114||c.type==115||c.type==116||c.type==117||
                            c.type==117||c.type==118||c.type==119||c.type==120||c.type==121||
                            c.type==122||c.type==123||c.type==124||c.type==128||c.type==129||
                            c.type==131||c.type==132||c.type==134||c.type==135||c.type==136||
                            c.type==137||c.type==138||c.type==139||c.type==140||c.type==141||
                            c.type==142||c.type==143||c.type==144||c.type==145||c.type==146||
                            c.type==156||c.type==157||c.type==158||c.type==159||c.type==160||
                            c.type==161||c.type==162||c.type==163||c.type==164||c.type==165||
                            c.type==166||c.type==168||c.type==169||c.type==170||c.type==171||
                            c.type==172||c.type==176||c.type==177||c.type==178||c.type==179||
                            c.type==180||c.type==181||c.type==182||c.type==183||c.type==184||
                            c.type==200||c.type==201||c.type==204||c.type==208||c.type==205||
                            c.type==206||c.type==208||c.type==209||c.type==210||c.type==211||
                            c.type==216||c.type==220||c.type==221||c.type==224||c.type==226||
                            c.type==227||c.type==228||c.type==233||c.type==235||c.type==237||
                            c.type==238||c.type==239||c.type==240||c.type==243||c.type==245||
                            c.type==246||c.type==247||c.type==248||c.type==250||c.type==252||
                            c.type==259||c.type==260||c.type==261||c.type==263||c.type==264||
                            c.type==267||c.type==268||c.type==271||c.type==272||c.type==275||
                            c.type==277||c.type==282||c.type==283||c.type==284||c.type==286||
                            c.type==292||c.type==293||c.type==295||c.type==301||c.type==392||
                            c.type==303||c.type==304||c.type==305||c.type==311||c.type==312||
                            c.type==314||c.type==315||c.type==318||c.type==323||c.type==326||
                            c.type==328||c.type==329
                        )
                    ){
                        if(!c.stop){
                            let d=collideBoxBox(this,c)
                            let incident
                            let vecBall
                            if((c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239||c.type==275||c.type==302)&&d<0){
                                let e={position:c.position,previous:c.previous,width:0,height:0}
                                d=collideBoxBox(this,e)
                            }
                            if(d>=0&&!this.redundant[d]){
                                switch(d){
                                    case 0:
                                        if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239||c.type==275||c.type==302){
                                            if(c.velocity.y<0){
                                                c.position.y=this.position.y+this.height/2+c.height/2
                                                c.velocity.y*=-1
                                                c.direction+=180
                                                c.hit=[]
                                                c.bounces++
                                                if(c.bounces>=3){
                                                    c.active=false
                                                }
                                            }
                                        }else if(c.velocity.y<0||(c.type==135||c.type==136||c.type==169||c.type==170)&&c.position.y<c.previous.position.y){
                                            c.position.y=this.position.y+this.height/2+c.height/2
                                            c.velocity.y*=-1
                                        }
                                    break
                                    case 1:
                                        if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239||c.type==275||c.type==302){
                                            if(c.velocity.y>0){
                                                c.position.y=this.position.y-this.height/2-c.height/2
                                                c.velocity.y*=-1
                                                c.direction+=180
                                                c.hit=[]
                                                c.bounces++
                                                if(c.bounces>=3){
                                                    c.active=false
                                                }
                                            }
                                        }else if(c.velocity.y>0||(c.type==135||c.type==136||c.type==169||c.type==170)&&c.position.y>c.previous.position.y){
                                            c.position.y=this.position.y-this.height/2-c.height/2
                                            c.velocity.y*=-1
                                        }
                                    break
                                    case 2:
                                        if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239||c.type==275||c.type==302){
                                            if(c.velocity.x<0){
                                                c.position.x=this.position.x+this.width/2+c.width/2
                                                c.velocity.x*=-1
                                                c.direction+=180
                                                c.hit=[]
                                                c.bounces++
                                                if(c.bounces>=3){
                                                    c.active=false
                                                }
                                            }
                                        }else if(c.velocity.x<0||(c.type==135||c.type==136||c.type==169||c.type==170)&&c.position.x<c.previous.position.x){
                                            c.position.x=this.position.x+this.width/2+c.width/2
                                            c.velocity.x*=-1
                                        }
                                    break
                                    case 3:
                                        if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239||c.type==275||c.type==302){
                                            if(c.velocity.x>0){
                                                c.position.x=this.position.x-this.width/2-c.width/2
                                                c.velocity.x*=-1
                                                c.direction+=180
                                                c.hit=[]
                                                c.bounces++
                                                if(c.bounces>=3){
                                                    c.active=false
                                                }
                                            }
                                        }else if(c.velocity.x>0||(c.type==135||c.type==136||c.type==169||c.type==170)&&c.position.x>c.previous.position.x){
                                            c.position.x=this.position.x-this.width/2-c.width/2
                                            c.velocity.x*=-1
                                        }
                                    break
                                    case 4:
                                        if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239||c.type==275||c.type==302){
                                            if(c.velocity.x<0){
                                                c.position.y=this.position.y-this.height/2-c.height/2+this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                                c.velocity.x*=-1
                                                c.direction+=180
                                                c.hit=[]
                                                c.bounces++
                                                if(c.bounces>=3){
                                                    c.active=false
                                                }
                                            }
                                        }else if(c.type==135||c.type==136||c.type==169||c.type==170){
                                            c.position.y=this.position.y-this.height/2-c.height/2+this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                            incident=atan2(game.tileset[0]*this.height/this.width,-game.tileset[0])
                                            vecBall=[c.effectiveDirection+180,sqrt(c.velocity.x**2+c.velocity.y**2)]
                                            if(abs(incident-vecBall[0])<90||abs(incident-vecBall[0]-360)<90||abs(incident-vecBall[0]+360)<90){
                                                c.velocity.x=lsin(incident*2-vecBall[0])*vecBall[1]
                                                c.velocity.y=lcos(incident*2-vecBall[0])*vecBall[1]
                                                c.position.x+=c.velocity.x*0.1
                                                c.position.y+=c.velocity.y*0.1
                                            }
                                        }else{
                                            c.position.y=this.position.y-this.height/2-c.height/2+this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                            incident=atan2(game.tileset[0]*this.height/this.width,-game.tileset[0])
                                            vecBall=[atan2(-c.velocity.x,-c.velocity.y),sqrt(c.velocity.x**2+c.velocity.y**2)]
                                            if(abs(incident-vecBall[0])<90||abs(incident-vecBall[0]-360)<90||abs(incident-vecBall[0]+360)<90){
                                                c.velocity.x=lsin(incident*2-vecBall[0])*vecBall[1]
                                                c.velocity.y=lcos(incident*2-vecBall[0])*vecBall[1]
                                                c.position.x+=c.velocity.x*0.1
                                                c.position.y+=c.velocity.y*0.1
                                            }
                                        }
                                    break
                                    case 5:
                                        if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239||c.type==275||c.type==302){
                                            if(c.velocity.x>0){
                                                c.position.y=this.position.y-this.height/2-c.height/2+this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                                c.velocity.x*=-1
                                                c.direction+=180
                                                c.hit=[]
                                                c.bounces++
                                                if(c.bounces>=3){
                                                    c.active=false
                                                }
                                            }
                                        }else if(c.type==135||c.type==136||c.type==169||c.type==170){
                                            c.position.y=this.position.y-this.height/2-c.height/2+this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                            incident=atan2(-game.tileset[0]*this.height/this.width,-game.tileset[0])
                                            vecBall=[c.effectiveDirection+180,sqrt(c.velocity.x**2+c.velocity.y**2)]
                                            if(abs(incident-vecBall[0])<90||abs(incident-vecBall[0]-360)<90||abs(incident-vecBall[0]+360)<90){
                                                c.velocity.x=lsin(incident*2-vecBall[0])*vecBall[1]
                                                c.velocity.y=lcos(incident*2-vecBall[0])*vecBall[1]
                                                c.position.x+=c.velocity.x*0.1
                                                c.position.y+=c.velocity.y*0.1
                                            }
                                        }else{
                                            c.position.y=this.position.y-this.height/2-c.height/2+this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                            incident=atan2(-game.tileset[0]*this.height/this.width,-game.tileset[0])
                                            vecBall=[atan2(-c.velocity.x,-c.velocity.y),sqrt(c.velocity.x**2+c.velocity.y**2)]
                                            if(abs(incident-vecBall[0])<90||abs(incident-vecBall[0]-360)<90||abs(incident-vecBall[0]+360)<90){
                                                c.velocity.x=lsin(incident*2-vecBall[0])*vecBall[1]
                                                c.velocity.y=lcos(incident*2-vecBall[0])*vecBall[1]
                                                c.position.x+=c.velocity.x*0.1
                                                c.position.y+=c.velocity.y*0.1
                                            }
                                        }
                                    break
                                    case 6:
                                        if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239||c.type==275||c.type==302){
                                            if(c.velocity.x<0){
                                                c.position.y=this.position.y+this.height/2+c.height/2+0.01-this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                                c.velocity.x*=-1
                                                c.direction+=180
                                                c.hit=[]
                                                c.bounces++
                                                if(c.bounces>=3){
                                                    c.active=false
                                                }
                                            }
                                        }else if(c.type==135||c.type==136||c.type==169||c.type==170){
                                            c.position.y=this.position.y+this.height/2+c.height/2+0.01-this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                            c.previous.position.y=this.position.y+this.height/2+c.height/2+0.01-this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                            incident=atan2(game.tileset[0]*this.height/this.width,game.tileset[0])
                                            vecBall=[c.effectiveDirection+180,sqrt(c.velocity.x**2+c.velocity.y**2)]
                                            if(abs(incident-vecBall[0])<90||abs(incident-vecBall[0]-360)<90||abs(incident-vecBall[0]+360)<90){
                                                c.velocity.x=lsin(incident*2-vecBall[0])*vecBall[1]
                                                c.velocity.y=lcos(incident*2-vecBall[0])*vecBall[1]
                                                c.position.x+=c.velocity.x*0.1
                                                c.position.y+=c.velocity.y*0.1
                                            }
                                        }else{
                                            c.position.y=this.position.y+this.height/2+c.height/2+0.01-this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                            c.previous.position.y=this.position.y+this.height/2+c.height/2+0.01-this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                            incident=atan2(game.tileset[0]*this.height/this.width,game.tileset[0])
                                            vecBall=[atan2(-c.velocity.x,-c.velocity.y),sqrt(c.velocity.x**2+c.velocity.y**2)]
                                            if(abs(incident-vecBall[0])<90||abs(incident-vecBall[0]-360)<90||abs(incident-vecBall[0]+360)<90){
                                                c.velocity.x=lsin(incident*2-vecBall[0])*vecBall[1]
                                                c.velocity.y=lcos(incident*2-vecBall[0])*vecBall[1]
                                                c.position.x+=c.velocity.x*0.1
                                                c.position.y+=c.velocity.y*0.1
                                            }
                                        }
                                    break
                                    case 7:
                                        if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239||c.type==275||c.type==302){
                                            if(c.velocity.x>0){
                                                c.position.y=this.position.y+this.height/2+c.height/2+0.01-this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                                c.velocity.x*=-1
                                                c.direction+=180
                                                c.hit=[]
                                                c.bounces++
                                                if(c.bounces>=3){
                                                    c.active=false
                                                }
                                            }
                                        }else if(c.type==135||c.type==136||c.type==169||c.type==170){
                                            c.position.y=this.position.y+this.height/2+c.height/2+0.01-this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                            c.previous.position.y=this.position.y+this.height/2+c.height/2+0.01-this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                            incident=atan2(-game.tileset[0]*this.height/this.width,game.tileset[0])
                                            vecBall=[c.effectiveDirection+180,sqrt(c.velocity.x**2+c.velocity.y**2)]
                                            if(abs(incident-vecBall[0])<90||abs(incident-vecBall[0]-360)<90||abs(incident-vecBall[0]+360)<90){
                                                c.velocity.x=lsin(incident*2-vecBall[0])*vecBall[1]
                                                c.velocity.y=lcos(incident*2-vecBall[0])*vecBall[1]
                                                c.position.x+=c.velocity.x*0.1
                                                c.position.y+=c.velocity.y*0.1
                                            }
                                        }else{
                                            c.position.y=this.position.y+this.height/2+c.height/2+0.01-this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                            c.previous.position.y=this.position.y+this.height/2+c.height/2+0.01-this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                            incident=atan2(-game.tileset[0]*this.height/this.width,game.tileset[0])
                                            vecBall=[atan2(-c.velocity.x,-c.velocity.y),sqrt(c.velocity.x**2+c.velocity.y**2)]
                                            if(abs(incident-vecBall[0])<90||abs(incident-vecBall[0]-360)<90||abs(incident-vecBall[0]+360)<90){
                                                c.velocity.x=lsin(incident*2-vecBall[0])*vecBall[1]
                                                c.velocity.y=lcos(incident*2-vecBall[0])*vecBall[1]
                                                c.position.x+=c.velocity.x*0.1
                                                c.position.y+=c.velocity.y*0.1
                                            }
                                        }
                                    break
                                    case 8:
                                        if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239||c.type==275||c.type==302){
                                            if(c.velocity.x<0){
                                                c.direction+=180
                                                c.hit=[]
                                                c.bounces++
                                                if(c.bounces>=3){
                                                    c.active=false
                                                }
                                            }
                                        }else if(c.velocity.x<0){
                                            c.position.x=this.internalBounder.position.x+this.internalBounder.width/2+c.width/2+0.01
                                            c.velocity.x*=-1
                                        }
                                    break
                                    case 9:
                                        if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239||c.type==275||c.type==302){
                                            if(c.velocity.x>0){
                                                c.direction+=180
                                                c.hit=[]
                                                c.bounces++
                                                if(c.bounces>=3){
                                                    c.active=false
                                                }
                                            }
                                        }else if(c.velocity.x>0){
                                            c.position.x=this.internalBounder.position.x-this.internalBounder.width/2-c.width/2+0.01
                                            c.velocity.x*=-1
                                        }
                                    break
                                }
                                if(
                                    c.type==113||c.type==114||c.type==115||c.type==116||c.type==117||
                                    c.type==146||c.type==156||c.type==181||c.type==201||c.type==205||
                                    c.type==209||c.type==216||c.type==220||c.type==221||c.type==243||
                                    c.type==245||c.type==246||c.type==247||c.type==250||c.type==284||
                                    c.type==286||c.type==304||c.type==314||c.type==323||c.type==329
                                ){
                                    if(c.type==201&&!c.stop){
                                        entities.projectiles.push(new projectile(c.layer,c.position.x,c.position.y,89,c.direction,c.id,1,450,c.crit,c.index))
                                    }else if(c.type==314&&!c.stop){
                                        entities.projectiles.push(new projectile(c.layer,c.position.x,c.position.y,315,c.direction,c.id,c.damage,1800,c.crit,c.index,[c.projectileIndex]))
                                    }else if((c.type==221||c.type==304)&&!c.stop){
                                        c.explode()
                                    }
                                    c.stop=true
                                }else if((c.type==135||c.type==136||c.type==166||c.type==169||c.type==170)&&c.bounceTimer==0){
                                    //c.bounces++
                                    c.bounceTimer=5
                                }else if(c.type==228&&c.bounceTimer==0){
                                    c.bounces++
                                    c.bounceTimer=5
                                    c.explode()
                                    if(c.bounces>=3){
                                        c.active=false
                                    }
                                    c.explosion=1
                                }else if(c.type==263&&c.bounceTimer==0){
                                    c.bounces++
                                    c.bounceTimer=5
                                    c.explode()
                                    if(c.bounces>=2){
                                        c.stop=true
                                    }
                                }else if((c.type==30||c.type==60||c.type==65||c.type==73||c.type==83||c.type==98||c.type==104||c.type==110||c.type==235||c.type==264||c.type==293||c.type==324||c.type==326)&&c.bounceTimer==0){
                                    c.bounces++
                                    c.bounceTimer=5
                                    if(c.type==235){
                                        let mult=random(0.625,1.6)
                                        c.velocity.x*=mult
                                        c.velocity.y*=mult
                                    }else if(c.type==264){
                                        entities.projectiles.push(new projectile(c.layer,c.position.x,c.position.y,30,atan2(c.velocity.x,-c.velocity.y)+random(-15,15),c.id,c.damage,c.base.time,c.crit,c.index))
                                    }
                                    if(c.bounces>=3){
                                        c.explode()
                                        c.active=false
                                    }
                                }
                            }
                        }
                    }else if(a==0&&inBoxBox(this.bounder,c)&&c.active&&
                        !(this.type==37&&c.previous.position.y>c.position.y)&&
                        this.type!=3&&this.type!=5&&this.type!=8&&this.type!=9&&this.type!=10&&this.type!=11&&this.type!=12&&this.type!=14&&this.type!=16&&this.type!=27&&
                        this.type!=31&&this.type!=33&&this.type!=36&&this.type!=39&&this.type!=41&&this.type!=42&&this.type!=50
                    ){
                        let d=collideBoxBox(this,c)
                        if(d>=0&&!this.redundant[d]&&c.timer>=2||c.timer==1&&inBoxBox(this,c)&&this.type!=17&&this.type!=18&&this.type!=20&&this.type!=21||c.timer==0&&(this.type==17||this.type==18||this.type==19||this.type==21)&&inTriangleBoxBasic(this.triangle,c)){
                            if(
                                c.type!=7&&c.type!=23&&c.type!=25&&c.type!=32&&c.type!=37&&
                                c.type!=40&&c.type!=46&&c.type!=79&&c.type!=84&&c.type!=89&&
                                c.type!=100&&c.type!=103&&c.type!=112&&c.type!=193&&c.type!=194&&
                                c.type!=195&&c.type!=270&&c.type!=297&&c.type!=310&&c.type!=330
                            ){
                                c.active=false
                                c.speed=0
                                if(
                                    c.type==2||c.type==3||c.type==16||c.type==21||c.type==22||
                                    c.type==26||c.type==27||c.type==41||c.type==45||c.type==47||
                                    c.type==48||c.type==53||c.type==54||c.type==55||c.type==56||
                                    c.type==58||c.type==64||c.type==66||c.type==78||c.type==80||
                                    c.type==86||c.type==101||c.type==187||c.type==213||c.type==229||
                                    c.type==262||c.type==266||c.type==279||c.type==280||c.type==290||
                                    c.type==307||c.type==308||c.type==313
                                ){
                                    c.explode()
                                }
                            }
                        }
                    }else if(a==1&&inBoxBox(this.bounder,c)&&this.type!=36&&this.type!=39&&this.type!=42
                        &&!(this.type==37&&(c.velocity.y<0||c.previous.position.y+c.height/2>this.position.y-this.height/2))
                        &&!(this.type==5&&(c.id>0&&!game.attacker&&game.level!=17&&game.level!=18||c.id==0&&(game.attacker||game.level==17||game.level==18)||this.exploded))
                        &&!(this.type==8&&(c.id<=0||this.recharge>0||c.weaponType==-1||c.weapon.uses>=(c.weaponData.uses==1?c.weaponData.uses:c.weaponData.uses*c.ammoMult)||c.weapon.uses<=0||c.construct||c.sidekick))
                        &&!((this.type==9||this.type==41)&&(this.time<60||c.id<=0||this.recharge>0||c.life>=c.base.life||c.construct||c.sidekick||c.auto))
                        &&!((this.type==10||this.type==14)&&(c.id>0&&c.id<=game.gaming))
                        &&!(this.type==12&&(c.id<=0||this.recharge>0))
                        &&!((this.type==16||this.type==50)&&(c.id<=0||c.id>game.gaming&&game.level!=27||this.recharge>0||c.construct||c.auto))
                        &&!(this.type==27&&(c.id<=0||this.recharge>0||c.construct||c.sidekick||c.fort||c.auto))
                    ){
                        switch(this.type){
                            case 3:
                                if(game.level==25||game.level==26){
                                    c.velocity.x*=0.925
                                    c.velocity.y*=0.6
                                    c.jump.time=1
                                    c.jump.active=1
                                    c.wet=1
                                }else{
                                    c.velocity.y=-10
                                    c.takeDamage(50)
                                    c.collect.time=max(c.collect.time,150)
                                }
                            break
                            case 5:
                                this.exploded=true
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,16,0,this.align,200,2,false,-1))
                                entities.projectiles[entities.projectiles.length-1].explode()
                                entities.projectiles[entities.projectiles.length-1].active=false
                            break
                            case 8:
                                if(!(game.level==22&&game.pointAnim[4]>=1)){
                                    if(game.level==16){
                                        let speed=[random(100,game.edge[0]-100)-this.position.x,-this.position.y-random(2000,6000)]
                                        this.position.x+=speed[0]
                                        this.position.y+=speed[1]
                                        this.bounder.position.x+=speed[0]
                                        this.bounder.position.y+=speed[1]
                                        for(let a=0,la=this.boundary.length;a<la;a++){
                                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                                    this.boundary[a][b][c].x+=speed[0]
                                                    this.boundary[a][b][c].y+=speed[1]
                                                }
                                            }
                                        }
                                        this.findFall()
                                    }else{
                                        this.recharge=1800-(game.gaming-1)*300
                                    }
                                    c.weapon.uses=min(c.weaponData.uses==1?c.weaponData.uses:c.weaponData.uses*c.ammoMult,c.weapon.uses+ceil(c.weaponData.uses*c.ammoMult/2*(listing[1].includes(c.playerType)?1/3:1)))
                                    c.weapon.cooldown=min(c.weapon.cooldown,30)
                                    if(game.level==6){
                                        this.type=[9,12][floor(random(0,2))]
                                    }
                                }
                            break
                            case 9:
                                this.recharge=1800-(game.gaming-1)*300
                                c.life=min(c.base.life,c.life+c.base.life/2)
                                if(game.level==6){
                                    this.type=[8,12][floor(random(0,2))]
                                }
                            break
                            case 10:
                                c.manage[2]=true
                                c.target.position.x=this.position.x+game.tileset[0]
                            break
                            case 11:
                                if(!(game.level==22&&(abs(this.base.position.y-game.tileset[1]*49.75)<1||abs(this.base.position.y-game.tileset[1]*48.75)<1)&&!game.point[1])){
                                    if(game.level==23){
                                        if(this.height>=this.base.height){
                                            c.defendBuff=15
                                        }
                                    }else if((c.id>0&&!game.attacker||c.id==0&&game.attacker)&&!c.fort){
                                        c.defendBuff=15
                                    }else{
                                        c.velocity.x*=0.75
                                        if(c.velocity.y<0){
                                            c.velocity.y*=0.75
                                        }
                                        if(c.jump.active>0){
                                            c.jump.active=0
                                        }
                                    }
                                }
                            break
                            case 12:
                                this.recharge=1800-(game.gaming-1)*300
                                c.critBuff=240
                                if(game.level==6){
                                    this.type=[8,9][floor(random(0,2))]
                                }
                            break
                            case 14:
                                c.manage[2]=true
                                c.target.position.x=this.position.x-game.tileset[0]
                            break
                            case 16:
                                if(game.level==16){
                                    let speed=[random(100,game.edge[0]-100)-this.position.x,-this.position.y-random(2000,6000)]
                                    this.position.x+=speed[0]
                                    this.position.y+=speed[1]
                                    this.bounder.position.x+=speed[0]
                                    this.bounder.position.y+=speed[1]
                                    for(let a=0,la=this.boundary.length;a<la;a++){
                                        for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                            for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                                this.boundary[a][b][c].x+=speed[0]
                                                this.boundary[a][b][c].y+=speed[1]
                                            }
                                        }
                                    }
                                    this.findFall()
                                    c.newWeaponSet(this.weapon)
                                    let chunk=game.peakWeapon?1:game.level==27&&game.pvp?0:floor(random(0,1.5))
                                    this.weapon=listing[chunk][floor(random(listing[chunk].length))]
                                }else if(game.level>=15){
                                    if(!(game.level==22&&game.pointAnim[2]>=1)&&!((game.level==23||game.level==26)&&this.visible<1)&&!(game.level==25&&!game.point[1])){
                                        c.newWeaponSet(this.weapon)
                                        let chunk=game.peakWeapon?1:game.level==27&&game.pvp?1:floor(random(0,1.5))
                                        this.weapon=listing[chunk][floor(random(listing[chunk].length))]
                                        this.recharge=game.level==27?14400:game.level==23?1200:3600-(game.gaming-1)*600
                                    }
                                }else if(!game.weapon[c.id-1].includes(this.weapon)&&(game.level==13&&game.weapon[c.id-1].length<3||game.level==14&&game.weapon[c.id-1].length<(game.peakWeapon?(game.mainline?1:2):4))){
                                    game.weapon[c.id-1].push(this.weapon)
                                    if(game.mainline){
                                        game.weapon[game.players].push(this.weapon)
                                    }
                                    this.recharge=1800
                                }else if(game.delete){
                                    c.position.x=c.base.position.x
                                    c.position.y=c.base.position.y
                                    this.recharge=1800
                                }
                            break
                            case 27:
                                if(game.level==23||game.level==25||game.level==26){
                                    let reserve=[c.type,c.weapon.ammo,c.weapon.uses]
                                    c.newWeaponSet(this.weapon)
                                    if(c.weaponType>=0&&c.id>0&&!c.sidekick){
                                        c.weapon.ammo=this.ammo
                                        c.weapon.uses=this.uses
                                        this.weapon=reserve[0]
                                        this.ammo=reserve[1]
                                        this.uses=reserve[2]
                                    }else{
                                        let chunk=listing[game.peakWeapon?1:0]
                                        this.weapon=chunk[floor(random(0,chunk.length))]
                                        this.ammo=types.weapon[types.player[this.weapon].weapon].ammo
                                        this.uses=types.weapon[types.player[this.weapon].weapon].uses==1?types.weapon[types.player[this.weapon].weapon].uses:types.weapon[types.player[this.weapon].weapon].uses*game.ammoMult
                                    }
                                    this.recharge=600
                                }else{
                                    c.newWeapon()
                                    if(game.level==16){
                                        let speed=[random(100,game.edge[0]-100)-this.position.x,-this.position.y-random(2000,6000)]
                                        this.position.x+=speed[0]
                                        this.position.y+=speed[1]
                                        this.bounder.position.x+=speed[0]
                                        this.bounder.position.y+=speed[1]
                                        for(let a=0,la=this.boundary.length;a<la;a++){
                                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                                    this.boundary[a][b][c].x+=speed[0]
                                                    this.boundary[a][b][c].y+=speed[1]
                                                }
                                            }
                                        }
                                        this.findFall()
                                    }else{
                                        this.recharge=3600-(game.gaming-1)*600
                                    }
                                }
                            break
                            case 31:
                                if(!c.construct&&!c.sidekick&&!c.fort&&c.id>0&&!game.attacker&&c.weapon.uses<=0&&!((game.level==22||game.level==23||game.level==25||game.level==26||game.level==27)&&!(c.id==this.owner||game.level==27&&game.pvp&&(c.id==1&&this.pos==0||c.id==2&&this.pos==3||c.id==3)||this.owner>=0&&c.id>=0&&!game.pvp))){
                                    if(c.auto){
                                        c.newWeaponSet(c.type)
                                    }else{
                                        c.newWeapon()
                                    }
                                }
                            break
                            case 33:
                                if(game.level!=19&&!c.construct&&!c.sidekick&&!c.fort&&c.id>0&&!game.attacker&&c.weapon.uses<=0&&!((game.level==22||game.level==23||game.level==25||game.level==26||game.level==27)&&!(c.id==this.owner||game.level==27&&game.pvp&&(c.id==1&&this.pos==0||c.id==2&&this.pos==3||c.id==3)||this.owner>0&&c.id>0&&!game.pvp))){
                                    if(c.auto){
                                        c.newWeaponSet(c.type)
                                    }else{
                                        c.newWeapon()
                                    }
                                }
                            break
                            case 41:
                                this.recharge=1800-(game.gaming-1)*300
                                this.remove=true
                                c.life=0
                            break
                            case 50:
                                c.newWeaponSet(this.weapon)
                                this.weapon=listing[1][floor(random(listing[1].length))]
                                this.recharge=game.level==23?1200:3600-(game.gaming-1)*600
                                c.stunTime=300
                            break
                            default:
                                let d=collideBoxBox(this,c)
                                if(!this.redundant[d]){
                                    if(d>=8&&d<=11&&!this.mutate){
                                        d-=4
                                    }
                                    switch(d){
                                        case 0:
                                            if(!(this.type==38&&this.height<this.base.height&&this.height>this.base.height-game.tileset[1]*1.5)){
                                                c.position.y=this.position.y+this.height/2+c.height/2+0.01
                                                c.previous.position.y=this.position.y+this.height/2+c.height/2+0.01
                                                c.velocity.y=0
                                                switch(this.type){
                                                    case 15:
                                                        if(this.reload<=0&&!c.auto&&(c.id>0||game.attacker||game.level==17||game.level==18)&&c.life>0&&c.attacking){
                                                            if(game.attacker||game.level==17||game.level==18){
                                                                this.align=c.id
                                                            }
                                                            this.reload=480
                                                        }
                                                    break
                                                }
                                            }
                                        break
                                        case 1:
                                            c.position.y=this.position.y-this.height/2-c.height/2-0.01
                                            c.previous.position.y=this.position.y-this.height/2-c.height/2-0.01
                                            c.velocity.y=0
                                            c.jump.time=5
                                            if(c.doubleJump()&&c.weapon.uses>0){
                                                c.jump.double=1
                                            }
                                            if(c.playerData.name=='PlayerPistolQuadrupleJump'){
                                                c.jump.double=1
                                                c.jump.triple=1
                                                c.jump.quadruple=1
                                            }
                                            switch(this.type){
                                                case 2: case 25: case 29: case 34: case 48:
                                                    if(game.level==19&&this.type!=25&&this.type!=34){
                                                        if(this.reload<=0&&!c.auto&&(c.id>0||game.attacker||game.level==17||game.level==18||game.level==19)&&c.life>0&&c.attacking){
                                                            if(game.attacker||game.level==17||game.level==18){
                                                                this.align=c.id
                                                            }
                                                            this.reload=480
                                                            switch(game.level){
                                                                default:
                                                                    let hit=false
                                                                    for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                        if(entities.walls[1][e].type==31&&abs(this.position.x-entities.walls[1][e].position.x)<600&&(entities.walls[1][e].owner==c.id||entities.walls[1][e].owner>0&&c.id>0&&!game.pvp)){
                                                                            hit=true
                                                                        }
                                                                    }
                                                                    if(!hit){
                                                                        this.reload=0
                                                                    }else{
                                                                        for(let e=0,le=10;e<le;e++){
                                                                            entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,114,random(-120,-240),c.id,150,1200,false,-1))
                                                                            let mult=random(1.25,2.5)
                                                                            entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                            entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                            entities.projectiles[entities.projectiles.length-1].position.x+=entities.projectiles[entities.projectiles.length-1].velocity.x
                                                                            entities.projectiles[entities.projectiles.length-1].position.y+=entities.projectiles[entities.projectiles.length-1].velocity.y
                                                                        }
                                                                    }
                                                                break
                                                            }
                                                        }
                                                    }else{
                                                        if(!(
                                                            (
                                                                abs(this.position.x-game.tileset[0]*64.5)<1||
                                                                abs(this.position.x-game.tileset[0]*70.5)<1
                                                            )&&game.pointAnim[0]>=1||
                                                            abs(this.position.x-game.tileset[0]*131.5)<1&&game.pointAnim[1]>=1||
                                                            abs(this.position.x-game.tileset[0]*135.5)<1&&game.pointAnim[2]>=1
                                                        )){
                                                            c.bounceTime=15
                                                        }
                                                    }
                                                break
                                                case 4:
                                                    if(game.level==25||game.level==26){
                                                        c.bounceTime=15
                                                    }
                                                    if(this.reload<=0&&!c.auto&&(c.id>0||game.attacker||game.level==17||game.level==18||game.level==19)&&c.life>0&&c.attacking&&!(c.construct&&game.level==19)){
                                                        if(game.attacker||game.level==17||game.level==18){
                                                            this.align=c.id
                                                        }
                                                        this.reload=480
                                                        let hit=false
                                                        switch(game.level){
                                                            case 6:
                                                                for(let e=0,le=15;e<le;e++){
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,random(-155,-175),this.align,100,240,false,-1))
                                                                    let mult=random(2,5)
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                }
                                                            break
                                                            case 7:
                                                                for(let f=0,lf=3;f<lf;f++){
                                                                    for(let e=0,le=4-f%2;e<le;e++){
                                                                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,-180-4+le*4-e*10,this.align,100,240,false,-1))
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.x*=(4-f)
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.y*=(4-f)
                                                                    }
                                                                }
                                                            break
                                                            case 15: case 18:
                                                                for(let e=0,le=4;e<le;e++){
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,-135+(8+(e%2)*2)*(e>=2?1:-1),this.align,e==2?40:100,240,false,-1))
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=2-((e%2)*0.4)
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=2-((e%2)*0.4)
                                                                }
                                                            break
                                                            case 19: case 24:
                                                                for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                    if(entities.walls[1][e].type==31&&abs(this.position.x-entities.walls[1][e].position.x)<600&&(entities.walls[1][e].owner==c.id||entities.walls[1][e].owner>0&&c.id>0&&!game.pvp)){
                                                                        hit=true
                                                                        if(entities.walls[1][e].position.x<this.position.x){
                                                                            for(let e=0,le=6;e<le;e++){
                                                                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,random(120,150),this.align,100,240,false,-1))
                                                                                let mult=random(1.25,2.5)
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                            }
                                                                        }else{
                                                                            for(let e=0,le=6;e<le;e++){
                                                                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,random(-150,-120),this.align,100,240,false,-1))
                                                                                let mult=random(1.25,2.5)
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                if(!hit){
                                                                    this.reload=0
                                                                }
                                                            break
                                                            case 22:
                                                                if(game.pointAnim[0]<1){
                                                                    for(let e=0,le=20;e<le;e++){
                                                                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,random(97.5,142.5),this.align,100,240,false,-1))
                                                                        let mult=random(1.5,3)
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                    }
                                                                }else{
                                                                    this.reload=0
                                                                }
                                                            break
                                                            case 23:
                                                                if(game.point[0]==c.id){
                                                                    hit=true
                                                                    for(let e=0,le=20;e<le;e++){
                                                                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,this.position.x<game.edge[0]*0.5?random(97.5,142.5):random(-142.5,-97.5),this.align,100,240,false,-1))
                                                                        let mult=random(1.5,3)
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.y*=mult*0.6
                                                                    }
                                                                }else{
                                                                    this.reload=0
                                                                }
                                                            break
                                                            case 25: case 26:
                                                                entities.projectiles.push(new projectile(c.layer,this.position.x,this.position.y-this.height/2-5,280,0,c.id,800,1800,0,c.index))
                                                                if(c.id>0&&c.id<=game.gaming){
                                                                    for(let e=0,le=entities.players.length;e<le;e++){
                                                                        if(entities.players[e].id==c.id){
                                                                            entities.players[e].disable=true
                                                                            entities.players[e].assort.missile=true
                                                                        }
                                                                    }
                                                                }
                                                            break
                                                            case 28:
                                                                for(let e=0,le=20;e<le;e++){
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,random(112.5,157.5),this.align,100,240,false,-1))
                                                                    let mult=random(1,2)
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                }
                                                            break
                                                            default:
                                                                for(let e=0,le=15;e<le;e++){
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,random(-157.5,-112.5),this.align,100,240,false,-1))
                                                                    let mult=random(1.25,2.5)
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                }
                                                            break
                                                        }
                                                    }
                                                break
                                                case 13: case 15:
                                                    if(this.reload<=0&&!c.auto&&(c.id>0||game.attacker||game.level==17||game.level==18)&&c.life>0&&c.attacking){
                                                        this.reload=480
                                                        if(game.level==19){
                                                            this.align=c.id
                                                        }
                                                        let hit=false
                                                        switch(game.level){
                                                            case 19: case 24:
                                                                for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                    if(entities.walls[1][e].type==31&&abs(this.position.x-entities.walls[1][e].position.x)<600&&(entities.walls[1][e].owner==c.id||entities.walls[1][e].owner>0&&c.id>0&&!game.pvp)){
                                                                        hit=true
                                                                    }
                                                                }
                                                                if(!hit){
                                                                    this.reload=0
                                                                }
                                                            break
                                                            case 23: case 26:
                                                                if(this.type==13){
                                                                    for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                        if(entities.walls[1][e].type==33&&dist(this.position.x,this.position.y,entities.walls[1][e].position.x,entities.walls[1][e].position.y)<300&&(entities.walls[1][e].owner==c.id&&c.id>=0||entities.walls[1][e].owner>0&&c.id>0&&!game.pvp)){
                                                                            if(entities.walls[1][e].pos==4){
                                                                                hit=true
                                                                                entities.players.push(new player(graphics.main[1],this.position.x,this.position.y-50,entities.walls[1][e].owner,0,[],false,floor(random(findName('ConstructMachineGun',types.player),findName('ConstructRemote',types.player))),game.index))
                                                                                game.index++
                                                                                entities.players[entities.players.length-1].constructify()
                                                                                entities.players[entities.players.length-1].thrown=true
                                                                                entities.players[entities.players.length-1].velocity.x=random(10,25)*(floor(random(0,2))*2-1)
                                                                                entities.players[entities.players.length-1].velocity.y=-20
                                                                            }else{
                                                                                hit=true
                                                                                entities.players.push(new player(graphics.main[1],this.position.x,this.position.y-50,entities.walls[1][e].owner,0,[],false,findName('FieldArmy',types.player),game.index))
                                                                                entities.players[entities.players.length-1].auto=true
                                                                                game.index++
                                                                            }
                                                                        }
                                                                    }
                                                                    if(!hit){
                                                                        this.reload=0
                                                                    }
                                                                }else if(game.point[0]!=c.id){
                                                                    this.reload=0
                                                                }
                                                            break
                                                        }
                                                    }
                                                break
                                                case 23:
                                                    if(this.reload<=0&&!c.auto&&(c.id>0||game.attacker||game.level==17||game.level==18)&&c.life>0&&c.attacking&&!(c.construct&&game.level==19)&&!c.fort){
                                                        if(game.attacker||game.level==17||game.level==18){
                                                            this.align=c.id
                                                        }
                                                        this.reload=480
                                                        let hit=false
                                                        switch(game.level){
                                                            case 19:
                                                                for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                    if(entities.walls[1][e].type==31&&abs(this.position.x-entities.walls[1][e].position.x)<600&&(entities.walls[1][e].owner==c.id||entities.walls[1][e].owner>0&&c.id>0&&!game.pvp)){
                                                                        hit=true
                                                                        if(entities.walls[1][e].position.x<this.position.x){
                                                                            for(let e=0,le=6;e<le;e++){
                                                                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,73,random(120,150),this.align,40,240,false,-1))
                                                                                let mult=random(1.25,2.5)
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                            }
                                                                        }else{
                                                                            for(let e=0,le=6;e<le;e++){
                                                                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,73,random(-150,-120),this.align,40,240,false,-1))
                                                                                let mult=random(1.25,2.5)
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                if(!hit){
                                                                    this.reload=0
                                                                }
                                                            break
                                                            case 22:
                                                                for(let e=0,le=20;e<le;e++){
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,73,random(-142.5,-97.5),this.align,40,240,false,-1))
                                                                    let mult=random(1.5,3)
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                }
                                                            break
                                                            case 23:
                                                                for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                    if(entities.walls[1][e].type==33&&dist(this.position.x,this.position.y,entities.walls[1][e].position.x,entities.walls[1][e].position.y)<600&&(entities.walls[1][e].owner==c.id||entities.walls[1][e].owner>0&&c.id>0&&!game.pvp)){
                                                                        hit=true
                                                                        if(entities.walls[1][e].position.x<this.position.x){
                                                                            for(let e=0,le=6;e<le;e++){
                                                                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,73,random(120,150),this.align,40,240,false,-1))
                                                                                let mult=random(1.25,2.5)
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                            }
                                                                        }else{
                                                                            for(let e=0,le=6;e<le;e++){
                                                                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,73,random(-150,-120),this.align,40,240,false,-1))
                                                                                let mult=random(1.25,2.5)
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                if(!hit){
                                                                    this.reload=0
                                                                }
                                                            break
                                                            default:
                                                                for(let e=0,le=15;e<le;e++){
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,73,random(-157.5,-112.5),this.align,40,240,false,-1))
                                                                    let mult=random(1.25,2.5)
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                }
                                                            break
                                                        }
                                                    }
                                                break
                                                case 26:
                                                    if(c.id>0){
                                                        c.velocity.x=-175
                                                        c.velocity.y=-40
                                                        c.thrown=true
                                                    }
                                                break
                                                case 30:
                                                    c.velocity.x=175
                                                    c.velocity.y=-80
                                                    c.position.y-=100
                                                    c.thrown2=true
                                                break
                                                case 32:
                                                    if(this.reload<=0&&!c.auto&&(!c.fort||c.id==0)&&(c.id>0||game.attacker||game.level==17||game.level==18||game.level==19)&&c.life>0&&c.attacking){
                                                        if(game.attacker||game.level==17||game.level==18){
                                                            this.align=c.id
                                                        }
                                                        this.reload=480
                                                        let hit=false
                                                        switch(game.level){
                                                            case 19:
                                                                for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                    if(entities.walls[1][e].type==31&&abs(this.position.x-entities.walls[1][e].position.x)<600&&(entities.walls[1][e].owner==c.id&&c.id>=0||entities.walls[1][e].owner>0&&c.id>0&&!game.pvp)){
                                                                        hit=true
                                                                        entities.players.push(new player(graphics.main[1],this.position.x,this.position.y-50,entities.walls[1][e].owner,0,[],false,floor(random(findName('ConstructMachineGun',types.player),findName('ConstructRemote',types.player))),game.index))
                                                                        game.index++
                                                                        entities.players[entities.players.length-1].constructify()
                                                                        entities.players[entities.players.length-1].thrown=true
                                                                        entities.players[entities.players.length-1].velocity.x=random(10,25)*(floor(random(0,2))*2-1)
                                                                        entities.players[entities.players.length-1].velocity.y=-20
                                                                    }else if(entities.walls[1][e].type==31&&abs(this.position.x-entities.walls[1][e].position.x)<600&&game.pvp&&entities.walls[1][e].owner!=c.id&&c.id>0){
                                                                        hit=true
                                                                        c.newWeaponSet(floor(random(findName('PlayerDeployerM',types.player),findName('PlayerTripleAuto',types.player))))
                                                                        c.storeWeapon=true
                                                                        this.reload=600
                                                                        for(let f=0,lf=entities.walls.length;f<lf;f++){
                                                                            for(let g=0,lg=entities.walls[f].length;g<lg;g++){
                                                                                if(entities.walls[f][g].reload!=-1&&abs(this.position.x-entities.walls[f][g].position.x)<600){
                                                                                    entities.walls[f][g].reload=1200.25 
                                                                                }
                                                                            }
                                                                        }
                                                                        for(let f=0,lf=entities.players.length;f<lf;f++){
                                                                            if(abs(this.position.x-entities.players[f].position.x)<600&&(entities.players[f].construct||entities.players[f].fort)){
                                                                                entities.players[f].weapon.cooldown=1200
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                if(!hit){
                                                                    this.reload=0
                                                                }
                                                            break
                                                            case 22:
                                                                for(let e=0,le=10;e<le;e++){
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,114,random(-120,-240),c.id,150,1200,false,-1))
                                                                    let mult=random(1.25,2.5)
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                    entities.projectiles[entities.projectiles.length-1].position.x+=entities.projectiles[entities.projectiles.length-1].velocity.x
                                                                    entities.projectiles[entities.projectiles.length-1].position.y+=entities.projectiles[entities.projectiles.length-1].velocity.y
                                                                }
                                                            break
                                                            case 23:
                                                                if(game.point[0]==c.id){
                                                                    for(let e=0,le=10;e<le;e++){
                                                                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,114,random(-120,-240),c.id,150,1200,false,-1))
                                                                        let mult=random(1.25,2.5)
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                        entities.projectiles[entities.projectiles.length-1].position.x+=entities.projectiles[entities.projectiles.length-1].velocity.x
                                                                        entities.projectiles[entities.projectiles.length-1].position.y+=entities.projectiles[entities.projectiles.length-1].velocity.y
                                                                    }
                                                                }else{
                                                                    this.reload=0
                                                                }
                                                            break
                                                            case 24:
                                                                for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                    if(entities.walls[1][e].type==31&&abs(this.position.x-entities.walls[1][e].position.x)<600&&(entities.walls[1][e].owner==c.id||entities.walls[1][e].owner>0&&c.id>0&&!game.pvp)){
                                                                        hit=true
                                                                    }
                                                                }
                                                                if(!hit){
                                                                    this.reload=0
                                                                }else{
                                                                    for(let e=0,le=10;e<le;e++){
                                                                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,114,random(-120,-240),c.id,150,1200,false,-1))
                                                                        let mult=random(1.25,2.5)
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                        entities.projectiles[entities.projectiles.length-1].position.x+=entities.projectiles[entities.projectiles.length-1].velocity.x
                                                                        entities.projectiles[entities.projectiles.length-1].position.y+=entities.projectiles[entities.projectiles.length-1].velocity.y
                                                                    }
                                                                }
                                                            break
                                                        }
                                                    }
                                                break
                                                case 35:
                                                    if(this.reload<=0&&!c.auto&&(c.id>0||game.attacker||game.level==17||game.level==18||game.level==19)&&c.life>0&&c.attacking){
                                                        if(game.attacker||game.level==17||game.level==18){
                                                            this.align=c.id
                                                        }
                                                        this.reload=360
                                                        switch(game.level){
                                                            case 19:
                                                                let hit=false
                                                                for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                    if(entities.walls[1][e].type==36&&abs(this.position.x-entities.walls[1][e].position.x)<600&&(entities.walls[1][e].owner==c.id||entities.walls[1][e].owner>0&&c.id>0&&!game.pvp)){
                                                                        hit=true
                                                                        if(entities.walls[1][e].position.x<this.position.x){
                                                                            for(let e=0,le=7;e<le;e++){
                                                                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,135+(e>=4?-14+(e-4)*14:(6+(e%2)*2)*(e>=2?1:-1))+random(-2,2),this.align,250,240,false,-1))
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.x*=4.5-(e>=4?0.3:(e%2)*0.6)*random(0.975,1.025)
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.y*=4.5-(e>=4?0.3:(e%2)*0.6)*random(0.975,1.025)
                                                                            }
                                                                        }else{
                                                                            for(let e=0,le=7;e<le;e++){
                                                                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,-135+(e>=4?-14+(e-4)*14:(6+(e%2)*2)*(e>=2?1:-1))+random(-2,2),this.align,250,240,false,-1))
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.x*=4.5-(e>=4?0.3:(e%2)*0.6)*random(0.975,1.025)
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.y*=4.5-(e>=4?0.3:(e%2)*0.6)*random(0.975,1.025)
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                if(!hit){
                                                                    this.reload=0
                                                                }
                                                            break
                                                            case 22:
                                                                for(let e=0,le=15;e<le;e++){
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,258,-255+(e+0.5)/le*150,c.id,50,120,false,-1))
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=1.2
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=1.2
                                                                    entities.projectiles[entities.projectiles.length-1].position.x+=entities.projectiles[entities.projectiles.length-1].velocity.x
                                                                    entities.projectiles[entities.projectiles.length-1].position.y+=entities.projectiles[entities.projectiles.length-1].velocity.y
                                                                }
                                                            break
                                                            case 23:
                                                                switch(this.pos){
                                                                    case 0:
                                                                        if(game.point[0]==c.id){
                                                                            for(let e=0,le=15;e<le;e++){
                                                                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,258,-255+(e+0.5)/le*150,c.id,50,120,false,-1))
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.x*=1.1
                                                                                entities.projectiles[entities.projectiles.length-1].velocity.y*=1.1
                                                                                entities.projectiles[entities.projectiles.length-1].position.x+=entities.projectiles[entities.projectiles.length-1].velocity.x
                                                                                entities.projectiles[entities.projectiles.length-1].position.y+=entities.projectiles[entities.projectiles.length-1].velocity.y
                                                                            }
                                                                        }else{
                                                                            this.reload=0
                                                                        }
                                                                    break
                                                                    case 1:
                                                                        if(game.point[1]==c.id){
                                                                            let amount=1
                                                                            for(let g=0,lg=amount;g<lg;g++){
                                                                                entities.players.push(new player(this.layer,this.position.x,this.position.y-50,c.id,0,[],true,findName('Buster',types.player),game.index))
                                                                                entities.players[entities.players.length-1].dizzyTime=g*5
                                                                                entities.players[entities.players.length-1].auto=true
                                                                            }
                                                                            for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                                if(entities.walls[1][e].type==35&&entities.walls[1][e].pos==2){
                                                                                    for(let f=0,lf=entities.players.length;f<lf;f++){
                                                                                        if(entities.players[f].id==entities.walls[1][e].target&&!entities.players[f].fort&&!entities.players[f].auto&&!entities.players[f].construct&&!entities.players[f].sidekick){
                                                                                            for(let g=0,lg=amount;g<lg;g++){
                                                                                                entities.players[entities.players.length-lg+g].target.index=entities.players[f].index
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                            game.index++
                                                                            this.reload=900
                                                                        }else{
                                                                            this.reload=0
                                                                        }
                                                                    break
                                                                    case 2:
                                                                        if(game.point[1]==c.id){
                                                                            this.target=this.target%game.players+1
                                                                            this.reload=15
                                                                        }else{
                                                                            this.reload=0
                                                                        }
                                                                    break
                                                                }
                                                            break
                                                            case 26:
                                                                switch(this.pos){
                                                                    case 0: case 1:
                                                                        if(game.point[0]==c.id&&!c.auto){
                                                                            this.reload=15
                                                                            game.waterTick=this.pos==1
                                                                        }else{
                                                                            this.reload=0
                                                                        }
                                                                    break
                                                                }
                                                            break
                                                        }
                                                    }
                                                break
                                                case 40:
                                                    if(this.reload<=0&&!c.auto&&(c.id>0||game.attacker||game.level==17||game.level==18||game.level==19)&&c.life>0&&c.attacking&&!c.fort){
                                                        if(game.attacker||game.level==17||game.level==18){
                                                            this.align=c.id
                                                        }
                                                        this.reload=480
                                                        let hit=false
                                                        switch(game.level){
                                                            case 23:
                                                                for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                    if(entities.walls[1][e].type==33&&dist(this.position.x,this.position.y,entities.walls[1][e].position.x,entities.walls[1][e].position.y)<600&&(entities.walls[1][e].owner==c.id||entities.walls[1][e].owner>0&&c.id>0&&!game.pvp)){
                                                                        hit=true
                                                                        for(let e=0,le=5;e<le;e++){
                                                                            entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,176+e*2,this.align,400,240,false,-1))
                                                                            entities.projectiles[entities.projectiles.length-1].velocity.x*=4
                                                                            entities.projectiles[entities.projectiles.length-1].velocity.y*=4
                                                                        }
                                                                    }
                                                                }
                                                                if(!hit){
                                                                    this.reload=0
                                                                }
                                                            break
                                                        }
                                                    }
                                                break
                                                
                                            }
                                            if(c.thrown&&this.type!=26){
                                                c.thrown=false
                                            }
                                            if(c.thrown2&&this.type!=30){
                                                c.thrown2=false
                                            }
                                            if(c.parachute){
                                                c.parachute=false
                                                if(!game.pvp&&game.level!=19){
                                                    c.weapon.cooldown+=120
                                                    c.stuckTime=c.playerData.sizeBuff>=1.5?120:60
                                                }
                                            }
                                        break
                                        case 2:
                                            c.position.x=this.position.x+this.width/2+c.width/2+0.01
                                            c.previous.position.x=this.position.x+this.width/2+c.width/2+0.01
                                            c.velocity.x=this.velocity.x
                                        break
                                        case 3:
                                            c.position.x=this.position.x-this.width/2-c.width/2-0.01
                                            c.previous.position.x=this.position.x-this.width/2-c.width/2-0.01
                                            c.velocity.x=this.velocity.x
                                            switch(this.type){
                                                case 13: case 15: case 18:
                                                    if(this.reload<=0&&!c.auto&&c.id>0&&c.life>0&&c.attacking){
                                                        this.reload=480
                                                    }
                                                break
                                            }
                                        break
                                        case 4:
                                            c.position.y=this.position.y-this.height/2-c.height/2-0.01+this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                            c.velocity.y=c.velocity.x*this.height/this.width
                                            c.jump.time=5
                                            if(c.doubleJump()&&c.weapon.uses>0){
                                                c.jump.double=1
                                            }
                                            if(c.thrown&&this.type!=26){
                                                c.thrown=false
                                            }
                                            if(c.parachute){
                                                c.parachute=false
                                                if(!game.pvp&&game.level!=19){
                                                    c.weapon.cooldown+=120
                                                    c.stuckTime=60
                                                }
                                            }
                                            c.velocity.x*=1-this.height/this.width*0.1*(c.playerData.name=='PlayerAuger'?0.2:1)
                                        break
                                        case 5:
                                            c.position.y=this.position.y-this.height/2-c.height/2-0.01+this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                            c.velocity.y=-c.velocity.x*this.height/this.width
                                            c.jump.time=5
                                            if(c.doubleJump()&&c.weapon.uses>0){
                                                c.jump.double=1
                                            }
                                            if(c.thrown&&this.type!=26){
                                                c.thrown=false
                                            }
                                            if(c.parachute){
                                                c.parachute=false
                                                if(!game.pvp&&game.level!=19){
                                                    c.weapon.cooldown+=120
                                                    c.stuckTime=60
                                                }
                                            }
                                            c.velocity.x*=1-this.height/this.width*0.1*(c.playerData.name=='PlayerAuger'?0.2:1)
                                        break
                                        case 6:
                                            c.position.y=this.position.y+this.height/2+c.height/2+0.01-this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                            c.velocity.y=-c.velocity.x*this.height/this.width
                                            c.velocity.x*=1-this.height/this.width*0.1*(c.playerData.name=='PlayerAuger'?0.2:1)
                                        break
                                        case 7:
                                            c.position.y=this.position.y+this.height/2+c.height/2+0.01-this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                            c.velocity.y=c.velocity.x*this.height/this.width
                                            c.velocity.x*=1-this.height/this.width*0.1*(c.playerData.name=='PlayerAuger'?0.2:1)
                                        break
                                        case 8: case 10:
                                            c.position.x=this.internalBounder.position.x+this.internalBounder.width/2+c.width/2+0.01
                                            c.velocity.x=0
                                        break
                                        case 9: case 11:
                                            c.position.x=this.internalBounder.position.x-this.internalBounder.width/2-c.width/2-0.01
                                            c.velocity.x=0
                                        break
                                    }
                                }
                            break
                        }
                    }
                }
            }
        }
    }
}
class wall{
    constructor(layer,x,y,width,height,type){
        this.layer=layer
        this.position={x:x,y:y}
        this.width=width
        this.height=height
        this.type=type
        this.collide=[entities.projectiles,entities.players]
        this.redundant=[false,false,false,false,false,false,false,false,false],
        this.standard=this.type!=3&&this.type!=5&&this.type!=7&&this.type!=8&&this.type!=9&&this.type!=10&&this.type!=11&&this.type!=12&&this.type!=14&&this.type!=16&&this.type!=27&&this.type!=31&&this.type!=33&&this.type!=36&&this.type!=39&&this.type!=41&&this.type!=42&&this.type!=50&&this.type!=55&&this.type!=57&&this.type!=59&&this.type!=60&&this.type!=61&&this.type!=62&&this.type!=63&&this.type!=65&&this.type!=66&&this.type!=67&&this.type!=68&&this.type!=69&&this.type!=70&&this.type!=71&&this.type!=72&&this.type!=75&&this.type!=76
        this.velocity={x:0,y:0}
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
        this.exploded=false
        this.mutate=false
        this.exempt=false
        this.time=0
        this.align=-1
        this.gapper=[]
    }
    set(){
        this.reload=-1
        let list
        switch(this.type){
            case 1: case 2:
                switch(game.level){
                    case 6: case 45:
                        this.balls=[]
                        for(let a=0,la=this.width*this.height/450;a<la;a++){
                            this.balls.push([-this.width/2+(a*0.19%1)*this.width,random(-this.height/2,this.height/2),random(30,40),random(0,1),random(0,360),floor(random(4,9))])
                        }
                    break
                    case 8: case 17:
                        this.balls=[]
                        for(let a=0,la=(this.width-10)*(this.height-10)/800;a<la;a++){
                            this.balls.push([-this.width/2+(a*0.205%1)*(this.width-10)+5,random(-this.height/2+5,this.height/2-5),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                        }
                    break
                    case 29: case 53:
                        this.balls=[]
                        for(let a=0,la=(this.width-10)*(this.height-10)/600;a<la;a++){
                            this.balls.push([-this.width/2+(a*0.205%1)*(this.width-10)+5,random(-this.height/2+5,this.height/2-5),random(15,45),random(0,1),random(0,360),floor(random(5,9))])
                        }
                    break
                    case 38:
                        this.balls=[[],[]]
                        for(let a=0,la=(this.width-10)*(this.height-10)/900;a<la;a++){
                            this.balls[0].push([-this.width/2+(a*0.205%1)*(this.width-10)+5,random(-this.height/2+5,this.height/2-5),random(15,45),random(0,1),random(0,360),floor(random(5,9))])
                        }
                    break
                }
                if(this.type==2&&(game.level==19||game.level==31)){
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
                switch(game.level){
                    case 25: case 26:
                        this.pos=[]
                        for(let a=0,la=this.height/game.tileset[1]*3;a<la;a++){
                            this.pos.push(-this.width*0.8+(this.position.x+this.position.y*0.3+a*51)%(this.width*1.6))
                        }
                    break
                }
            break
            case 8: case 9: case 12: case 16: case 27: case 41: case 50: case 57: case 61: case 63:
            case 65: case 66: case 68: case 69: case 70: case 71: case 72: case 73: case 75: case 76:
                this.recharge=0
                this.falling=0
                this.infoFade=0
                this.hide=0
                this.findFall()
                this.visible=0
                this.rainbow=false
                if(this.type==57){
                    let chunk=game.classWeapon?3:game.peakWeapon?1:0
                    this.weapon=listing[chunk][floor(random(listing[chunk].length))]
                    this.ammo=types.weapon[types.player[this.weapon].weapon].ammo
                    this.uses=types.weapon[types.player[this.weapon].weapon].uses==1?types.weapon[types.player[this.weapon].weapon].uses:types.weapon[types.player[this.weapon].weapon].uses*game.ammoMult
                }else if(this.type==50||this.type==61||this.type==69||this.type==72){
                    let chunk=game.classWeapon?3:1
                    this.weapon=listing[chunk][floor(random(listing[chunk].length))]
                }else if(this.type==70){
                    let chunk=game.classWeapon?3:1
                    this.weapon=listing[chunk][floor(random(listing[chunk].length))]
                    if(game.level==55){
                        this.rainbow=floor(random(0,2))==0
                    }
                }else if(this.type==71){
                    let chunk=game.classWeapon?3:game.peakWeapon?1:floor(random(1.5))
                    this.weapon=listing[chunk][floor(random(listing[chunk].length))]
                    chunk=game.classWeapon?3:game.peakWeapon?1:floor(random(1.5))
                    this.weapon2=listing[chunk][floor(random(listing[chunk].length))]
                }
                if(game.level==55){
                    this.pos=-1
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
                switch(game.level){
                    case 6: case 45:
                        this.balls=[]
                        for(let a=0,la=(this.width-10)*(this.height-10)/900;a<la;a++){
                            let pos=(a*0.205%1)
                            this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5+(this.height-10)*pos,this.height/2-5),random(30,40),random(0,1),random(0,360),floor(random(4,9))])
                        }
                    break
                    case 8: case 17:
                        this.balls=[]
                        for(let a=0,la=(this.width-10)*(this.height-10)/1600;a<la;a++){
                            let pos=(a*0.205%1)
                            this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5+(this.height-10)*pos,this.height/2-5),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                        }
                    break
                    case 29: case 53:
                        this.balls=[]
                        for(let a=0,la=(this.width-10)*(this.height-10)/1200;a<la;a++){
                            let pos=(a*0.205%1)
                            this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5+(this.height-10)*pos,this.height/2-5),random(15,45),random(0,1),random(0,360),floor(random(5,9))])
                        }
                    break
                    case 38:
                        this.balls=[[],[]]
                        for(let a=0,la=(this.width-10)*(this.height-10)/1800;a<la;a++){
                            let pos=(a*0.205%1)
                            this.balls[0].push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5+(this.height-10)*pos,this.height/2-5),random(15,45),random(0,1),random(0,360),floor(random(5,9))])
                        }
                    break
                }
            break
            case 18: case 45:
                switch(game.level){
                    case 6: case 45:
                        this.balls=[]
                        for(let a=0,la=(this.width-10)*(this.height-10)/900;a<la;a++){
                            let pos=(a*0.205%1)
                            this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5+(this.height-10)*(1-pos),this.height/2-5),random(30,40),random(0,1),random(0,360),floor(random(4,9))])
                        }
                    break
                    case 8: case 17:
                        this.balls=[]
                        for(let a=0,la=(this.width-10)*(this.height-10)/1600;a<la;a++){
                            let pos=(a*0.205%1)
                            this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5+(this.height-10)*(1-pos),this.height/2-5),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                        }
                    break
                    case 29: case 53:
                        this.balls=[]
                        for(let a=0,la=(this.width-10)*(this.height-10)/1200;a<la;a++){
                            let pos=(a*0.205%1)
                            this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5+(this.height-10)*(1-pos),this.height/2-5),random(15,45),random(0,1),random(0,360),floor(random(5,9))])
                        }
                    break
                    case 38:
                        this.balls=[[],[]]
                        for(let a=0,la=(this.width-10)*(this.height-10)/1800;a<la;a++){
                            let pos=(a*0.205%1)
                            this.balls[0].push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5+(this.height-10)*(1-pos),this.height/2-5),random(15,45),random(0,1),random(0,360),floor(random(5,9))])
                        }
                    break
                }
            break
            case 20: case 46:
                switch(game.level){
                    case 6: case 45:
                        this.balls=[]
                        for(let a=0,la=(this.width-10)*(this.height-10)/900;a<la;a++){
                            let pos=(a*0.205%1)
                            this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5,-this.height/2+5+(this.height-10)*(1-pos)),random(30,40),random(0,1),random(0,360),floor(random(4,9))])
                        }
                    break
                    case 8: case 17:
                        this.balls=[]
                        for(let a=0,la=(this.width-10)*(this.height-10)/1600;a<la;a++){
                            let pos=(a*0.205%1)
                            this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5,-this.height/2+5+(this.height-10)*(1-pos)),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                        }
                    break
                    case 29: case 53:
                        this.balls=[]
                        for(let a=0,la=(this.width-10)*(this.height-10)/1200;a<la;a++){
                            let pos=(a*0.205%1)
                            this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5,-this.height/2+5+(this.height-10)*(1-pos)),random(15,45),random(0,1),random(0,360),floor(random(5,9))])
                        }
                    break
                    case 38:
                        this.balls=[[],[]]
                        for(let a=0,la=(this.width-10)*(this.height-10)/1800;a<la;a++){
                            let pos=(a*0.205%1)
                            this.balls[0].push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5,-this.height/2+5+(this.height-10)*(1-pos)),random(15,45),random(0,1),random(0,360),floor(random(5,9))])
                        }
                    break
                }
            break
            case 21: case 47:
                switch(game.level){
                    case 6: case 45:
                        this.balls=[]
                        for(let a=0,la=(this.width-10)*(this.height-10)/900;a<la;a++){
                            let pos=(a*0.205%1)
                            this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5,-this.height/2+5+(this.height-10)*pos),random(30,40),random(0,1),random(0,360),floor(random(4,9))])
                        }
                    break
                    case 8: case 17:
                        this.balls=[]
                        for(let a=0,la=(this.width-10)*(this.height-10)/1600;a<la;a++){
                            let pos=(a*0.205%1)
                            this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5,-this.height/2+5+(this.height-10)*pos),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                        }
                    break
                    case 29: case 53:
                        this.balls=[]
                        for(let a=0,la=(this.width-10)*(this.height-10)/1200;a<la;a++){
                            let pos=(a*0.205%1)
                            this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5,-this.height/2+5+(this.height-10)*pos),random(15,45),random(0,1),random(0,360),floor(random(5,9))])
                        }
                    break
                    case 38:
                        this.balls=[[],[]]
                        for(let a=0,la=(this.width-10)*(this.height-10)/1800;a<la;a++){
                            let pos=(a*0.205%1)
                            this.balls[0].push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5,-this.height/2+5+(this.height-10)*pos),random(15,45),random(0,1),random(0,360),floor(random(5,9))])
                        }
                    break
                }
            break
            case 24:
                switch(game.level){
                    case 58: case 63: case 66:
                        this.pos=[]
                        for(let a=0,la=round(this.width/game.tileset[0]*3);a<la;a++){
                            let size=random(this.height*0.4,this.height*0.8)
                            this.pos.push([random(-this.height*0.5+size/2,this.height*0.5-size/2),size,random(0.3,0.7),random(1,2)])
                        }
                    break
                    case 64: case 70:
                        this.balls=[[],[]]
                        list=[1,2,3,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                let len=dist(this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].x,this.boundary[list[a]][b][1].y)/game.tileset[1]*1.2+random(-0.5,0.5)
                                for(let c=0,lc=round(len);c<lc;c++){
                                    if(floor(random(0,3))!=0){
                                        let pos=(random(0,1)+c)/lc
                                        this.balls[0].push([
                                            map(pos,0,1,this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][1].x)-this.position.x+(list[a]==2?random(-6,0):list[a]==3?random(0,6):0),
                                            map(pos,0,1,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].y)-this.position.y+(list[a]!=2&&list[a]!=3?random(0,2):0),
                                            random(4,12),random(0,1),random(0,360),floor(random(5,9))])
                                    }
                                }
                            }
                        }
                    break
                }
            break
            case 28:
                switch(game.level){
                    case 64: case 70:
                        this.balls=[]
                        for(let a=0,la=round(this.width/game.tileset[0]);a<la;a++){
                            for(let b=0,lb=round(this.height/game.tileset[1]);b<lb;b++){
                                if(floor(random(0,3))==0){
                                    this.balls.push([this.width*(-0.5+(a+random(0.1,0.9))/la),this.height*(-0.5+(b+random(0.1,0.9))/lb),random(15,30),random(0,1),random(0,360),floor(random(4,8))])
                                }
                            }
                        }
                    break
                }
            break
            case 31:
                this.owner=game.level==38&&game.pvp?[1,-1,-1,2][this.pos]:game.level==27&&game.pvp?[1,1,2,2][this.pos]:(game.level==22||game.level==23||game.level==35)&&!game.pvp&&!game.attacker?floor(random(1,game.players+1)):-1
                entities.players.push(new player(graphics.main[1],this.position.x,this.position.y-50,this.owner,0,[],false,findName('Fort',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].fortify()
                entities.players[entities.players.length-1].fortHealth()
                this.index=entities.players.length-1
                switch(game.level){
                    case 22:
                        entities.players[entities.players.length-1].multLife(9)
                    break
                    case 19: case 24: case 31: case 38: case 39: case 42:
                        this.timers=[]
                        for(let a=0,la=game.players;a<la;a++){
                            this.timers.push(0)
                        }
                    break
                }
            break
            case 33:
                this.owner=game.level==44||game.level==65&&game.pvp?[1,1,-1,2,2][this.pos]:
                    game.level==43?game.point[this.pos]:
                    game.level==38&&game.pvp?[1,-1,-1,2][this.pos]:
                    game.level==29||game.level==37?0:
                    game.level==27&&game.pvp?[1,1,2,2][this.pos]:
                    (game.level==22||game.level==23||game.level==25||game.level==26||game.level==32||game.level==35||game.level==40||game.level==47||game.level==49||game.level==55||game.level==58||game.level==59||game.level==68||game.level==70)&&!game.pvp&&!game.attacker?floor(random(1,game.players+1)):
                    -1
                entities.players.push(new player(graphics.main[1],this.position.x,this.position.y-50,this.owner,0,[],false,findName('Turret',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].fortify()
                if(game.level==44||game.level==65){
                    entities.players[entities.players.length-1].pos=this.pos
                }
                entities.players[entities.players.length-1].fortHealth()
                this.index=entities.players.length-1
                switch(game.level){
                    case 22: case 35:
                        entities.players[entities.players.length-1].multLife(3)
                    break
                    case 23:
                        this.timers=[]
                        for(let a=0,la=game.players;a<la;a++){
                            this.timers.push(0)
                        }
                        this.raided=0
                        this.loc=[[],[]]
                        this.raidTick=0
                    break
                    case 26: case 28: case 33: case 49: case 63: case 69:
                        this.timers=[]
                        for(let a=0,la=game.players;a<la;a++){
                            this.timers.push(0)
                        }
                    break
                    case 37:
                        this.timers=[]
                        for(let a=0,la=game.players;a<la;a++){
                            this.timers.push(0)
                        }
                        this.endTime=0
                    break
                    case 36: case 41: case 45: case 50: case 51: case 52: case 53: case 56: case 60: case 61:
                    case 62: case 64: case 71: case 72:
                        this.timers=[]
                        for(let a=0,la=game.players;a<la;a++){
                            this.timers.push([0,0])
                        }
                        this.endTime=0
                    break
                }
            break
            case 36:
                this.owner=(game.level==22||game.level==23||game.level==25||game.level==26||game.level==35)&&!game.pvp&&!game.attacker?floor(random(1,game.players+1)):-1
                entities.players.push(new player(graphics.main[1],this.position.x,this.position.y-50,this.owner,0,[],false,findName(game.level==28?'Guster':'Outpost',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].fortify()
                entities.players[entities.players.length-1].fortHealth()
                this.index=entities.players.length-1
                if(game.level==22){
                    entities.players[entities.players.length-1].multLife(3)
                }
            break
            case 37:
                switch(game.level){
                    case 58: case 63: case 66:
                        this.pos=[]
                        for(let a=0,la=round(this.width/game.tileset[0]*3);a<la;a++){
                            let size=random(this.height*0.1,this.height*0.3)
                            this.pos.push([
                                [random(-this.height*0.5+size/2,-this.height*0.1-size/2),size,random(0.3,0.7),random(1,2)],
                                [random(this.height*0.1+size/2,this.height*0.5-size/2),size,random(0.3,0.7),random(1,2)]
                            ])
                        }
                    break
                }
            break
            case 42:
                switch(game.level){
                    case 30: case 54:
                        this.timers=[]
                        for(let a=0,la=game.players;a<la;a++){
                            this.timers.push(0)
                        }
                    break
                    case 67:
                        this.timers=[0,0]
                    break
                    default:
                        this.owner=game.level==38&&game.pvp?[1,-1,-1,2][this.pos]:game.level==32||game.level==58||game.level==70?0:(game.level==22||game.level==23||game.level==25||game.level==26||game.level==35)&&!game.pvp&&!game.attacker?floor(random(1,game.players+1)):-1
                        entities.players.push(new player(graphics.main[1],this.position.x,this.position.y-50,this.owner,0,[],false,findName(game.level==32||game.level==38||game.level==58||game.level==70?'Payload':'Rogue',types.player),game.index))
                        game.index++
                        entities.players[entities.players.length-1].auto=true
                        entities.players[entities.players.length-1].fortify()
                        entities.players[entities.players.length-1].fortHealth()
                        this.index=entities.players.length-1
                        if(game.level==22){
                            entities.players[entities.players.length-1].multLife(3)
                        }else if(game.level==38){
                            entities.players[entities.players.length-1].direction.goal=[0,-54,54,0][this.pos]
                        }
                    break
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
            case 55:
                this.pos=[]
                for(let a=0,la=this.height/game.tileset[1]*3;a<la;a++){
                    this.pos.push(-this.width*0.6+(this.position.x+this.position.y*0.3+a*51)%(this.width*1.2))
                }
            break
            case 59: case 60:
                switch(game.level){
                    case 58: case 63: case 66:
                        let tempHeight=game.tileset[1]*0.4
                        this.pos=[]
                        for(let a=0,la=round(this.width/game.tileset[0]*3);a<la;a++){
                            let size=random(tempHeight*0.1,tempHeight*0.3)
                            this.pos.push([
                                [random(-tempHeight*0.5+size/2,-tempHeight*0.1-size/2),size,random(0.3,0.7),random(1,2)],
                                [random(tempHeight*0.1+size/2,tempHeight*0.5-size/2),size,random(0.3,0.7),random(1,2)]
                            ])
                        }
                    break
                }
            break
        }
        switch(this.type){
            case 1: case 17: case 18: case 20: case 21:
                switch(game.level){
                    case 38:
                        list=[1,2,3,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                let len=dist(this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].x,this.boundary[list[a]][b][1].y)/game.tileset[1]/3+random(-0.5,0.5)
                                for(let c=0,lc=round(len);c<lc;c++){
                                    let pos=(random(0,1)+c)/lc
                                    this.balls[1].push([
                                        map(pos,0,1,this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][1].x)-this.position.x+(list[a]==2?random(-10,0):list[a]==3?random(0,10):0),
                                        map(pos,0,1,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].y)-this.position.y+(list[a]!=2&&list[a]!=3?random(0,10):0),
                                        random(12,20),random(0,1),random(0,360),floor(random(3,6))*2])
                                }
                            }
                        }
                    break
                    case 39:
                        this.balls=[]
                        list=[1,2,3,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                let len=dist(this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].x,this.boundary[list[a]][b][1].y)/game.tileset[1]*0.8+random(-0.5,0.5)
                                for(let c=0,lc=round(len);c<lc;c++){
                                    let pos=(random(0,1)+c)/lc
                                    this.balls.push([
                                        map(pos,0,1,this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][1].x)-this.position.x+(list[a]==2?random(-6,0):list[a]==3?random(0,6):0),
                                        map(pos,0,1,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].y)-this.position.y+(list[a]!=2&&list[a]!=3?random(0,6):0),
                                        random(12,20),random(0,1),random(0,360),floor(random(3,7))])
                                }
                            }
                        }
                    break
                    case 44:
                        this.balls=[]
                        list=[1,2,3,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                let len=dist(this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].x,this.boundary[list[a]][b][1].y)/game.tileset[1]*0.8+random(-0.5,0.5)
                                for(let c=0,lc=round(len);c<lc;c++){
                                    let pos=(random(0,1)+c)/lc
                                    for(let d=0,ld=floor(random(2,7));d<ld;d++){
                                        this.balls.push([
                                            map(pos,0,1,this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][1].x)-this.position.x+(list[a]==2?random(-6,0):list[a]==3?random(0,6):0)+(d>0?random(-5,5):0),
                                            map(pos,0,1,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].y)-this.position.y+(list[a]!=2&&list[a]!=3?random(0,4):0)+d*11-d**2*0.5,
                                            random(12,20)-d*1.5,random(0,1),random(0,360),floor(random(4,7))])
                                    }
                                }
                            }
                        }
                    break
                    case 54:
                        this.balls=[]
                        list=[1,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                let len=dist(this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].x,this.boundary[list[a]][b][1].y)/game.tileset[1]*2.4+random(-0.5,0.5)
                                for(let c=0,lc=round(len);c<lc;c++){
                                    let pos=(random(0.225,0.75)+c)/lc
                                    this.balls.push([
                                        map(pos,0,1,this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][1].x)-this.position.x+(list[a]==2?random(-4,0):list[a]==3?random(0,4):0),
                                        map(pos,0,1,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].y)-this.position.y-(list[a]!=2&&list[a]!=3?random(0,4):0),
                                        random(20,30),random(0,1),random(0,360),floor(random(5,11))])
                                }
                            }
                        }
                    break
                    case 58: case 63: case 66:
                        this.balls=[[],[],[]]
                        list=[1,2,3,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                let len=dist(this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].x,this.boundary[list[a]][b][1].y)/game.tileset[1]*2.4+random(-0.5,0.5)
                                for(let c=0,lc=round(len);c<lc;c++){
                                    let pos=(random(0.225,0.75)+c)/lc
                                    this.balls[0].push([
                                        map(pos,0,1,this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][1].x)-this.position.x+random(1,-1),
                                        map(pos,0,1,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].y)-this.position.y-(list[a]!=2&&list[a]!=3?random(0,4):0),
                                        random(12,36),random(0,1),random(0,360),floor(random(5,13))])
                                }
                            }
                        }
                        list=[1,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                let len=dist(this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].x,this.boundary[list[a]][b][1].y)/game.tileset[1]*0.6+random(-0.5,0.5)
                                for(let c=0,lc=round(len);c<lc;c++){
                                    let pos=(random(0,1)+c)/lc
                                    for(let d=0,ld=floor(random(1,5));d<ld;d++){
                                        this.balls[1].push([
                                            map(pos,0,1,this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][1].x)-this.position.x+(list[a]==2?random(-6,0):list[a]==3?random(0,6):0)+(d>0?random(-10,10):0),
                                            map(pos,0,1,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].y)-this.position.y+(list[a]!=2&&list[a]!=3?random(0,4):0)+d*11-d**2*0.5,
                                            random(6,8)-d*0.5,random(0,1),random(0,360),floor(random(4,7))])
                                    }
                                }
                                len=dist(this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].x,this.boundary[list[a]][b][1].y)/game.tileset[1]*4+random(-0.5,0.5)
                                for(let c=0,lc=round(len);c<lc;c++){
                                    let pos=(random(0.1,0.9)+c)/lc
                                    this.balls[2].push([
                                        map(pos,0,1,this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][1].x)-this.position.x+(list[a]==2?random(-4,0):list[a]==3?random(0,4):0),
                                        map(pos,0,1,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].y)-this.position.y+(list[a]!=2&&list[a]!=3?random(0,4):0),
                                        random(30,60),random(0,1),random(-1,1)])
                                }
                            }
                        }
                    break
                    case 64: case 70:
                        this.balls=[[],[]]
                        list=[1,2,3,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                let len=dist(this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].x,this.boundary[list[a]][b][1].y)/game.tileset[1]*1.2+random(-0.5,0.5)
                                for(let c=0,lc=round(len);c<lc;c++){
                                    let pos=(random(0,1)+c)/lc
                                    this.balls[0].push([
                                        map(pos,0,1,this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][1].x)-this.position.x+(list[a]==2?random(-6,0):list[a]==3?random(0,6):0),
                                        map(pos,0,1,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].y)-this.position.y+(list[a]!=2&&list[a]!=3?random(0,4):0),
                                        random(4,12),random(0,1),random(0,360),floor(random(5,9))])
                                }
                            }
                        }
                        list=[1,4,5]
                        for(let a=0,la=list.length;a<la;a++){
                            for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                let len=dist(this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].x,this.boundary[list[a]][b][1].y)/game.tileset[1]*0.9+random(-0.5,0.5)
                                for(let c=0,lc=round(len);c<lc;c++){
                                    let pos=(random(0,1)+c)/lc
                                    for(let d=0,ld=[1,1,1,2,2,2,3,3,4,4,5,6][floor(random(0,12))];d<ld;d++){
                                        this.balls[1].push([
                                            map(pos,0,1,this.boundary[list[a]][b][0].x,this.boundary[list[a]][b][1].x)-this.position.x+(list[a]==2?random(-6,0):list[a]==3?random(0,6):0)+(d>0?random(-12,12):0),
                                            map(pos,0,1,this.boundary[list[a]][b][0].y,this.boundary[list[a]][b][1].y)-this.position.y+(list[a]!=2&&list[a]!=3?random(0,4):0)+d*11-d**2*0.225,
                                            random(6,8)-d*0.225,random(0,1),random(0,360),floor(random(4,7))])
                                    }
                                }
                            }
                        }
                    break
                }
            break
        }
    }
    checkHorizontal(){
        if(!this.remove){
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    let c=entities.walls[a][b]
                    if(c.type==this.type&&!c.exempt&&(c.position.x!=this.position.x||c.position.y!=this.position.y)&&!c.remove&&!(game.level==54&&abs(this.position.x+this.width/2-game.tileset[0]*149)<1&&this.position.y>game.edge[1]*0.9)){
                        if(abs(this.height-c.height)<1&&abs(c.position.x-(this.position.x+this.width/2+c.width/2))<1&&abs(c.position.y-this.position.y)<1&&!c.remove){
                            this.width+=c.width
                            this.position.x+=c.width/2
                            Array.prototype.push.apply(this.gapper,c.gapper)
                            c.remove=true
                            this.mutate=this.mutate||c.mutate
                            if(this.type==24&&(game.level==30||game.level==56)){
                                this.corner[0]=this.corner[0]||c.corner[0]
                                this.corner[1]=this.corner[1]||c.corner[1]
                            }
                        }
                    }
                }
            }
        }
    }
    checkVertical(){
        if(!this.remove&&!(this.type==28&&game.level==62)){
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    let c=entities.walls[a][b]
                    if(c.type==this.type&&!c.exempt&&(c.position.x!=this.position.x||c.position.y!=this.position.y)&&!c.remove){
                        if(abs(this.width-c.width)<1&&abs(c.position.y-(this.position.y+this.height/2+c.height/2))<1&&abs(c.position.x-this.position.x)<1&&!c.remove){
                            this.height+=c.height
                            this.position.y+=c.height/2
                            Array.prototype.push.apply(this.gapper,c.gapper)
                            c.remove=true
                            this.mutate=this.mutate||c.mutate
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
            case 24:
                if(game.level==59||game.level==60){
                    this.boundary=[
                        [],
                        [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y-this.height/2}]],
                        [],
                        [],
                        [],
                        [],
                        [],
                        [],
                    ]
                }else{
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
                }
            break
            case 56:
                this.boundary=[
                    [[{x:this.position.x-this.width/2,y:this.position.y+this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y-this.height/2}]],
                    [],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x-this.width/2,y:this.position.y+this.height/2}]],
                    [],
                    [],
                    [],
                    [],
                ]
            break
            case 37:
                this.boundary=[
                    [],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y-this.height/2}]],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                ]
            break
            case 59:
                this.boundary=[
                    [],
                    [],
                    [],
                    [],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
                    [],
                    [],
                    [],
                ]
            break
            case 60:
                this.boundary=[
                    [],
                    [],
                    [],
                    [],
                    [],
                    [[{x:this.position.x+this.width/2,y:this.position.y-this.height/2},{x:this.position.x-this.width/2,y:this.position.y+this.height/2}]],
                    [],
                    [],
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
        if(this.exploded){
            this.boundary=[
                [],[],[],[],[],[],[],[],
            ]
            this.exploded=false
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
                if((c.standard||(c.type==59||c.type==60)&&(game.level==58||game.level==63||game.level==66))&&(this.type!=37||game.level==41)&&(c.type!=37||game.level==69)&&!(c.type==24&&(game.level==59||game.level==60))&&(this.type!=38&&c.type!=38||game.level!=22&&game.level!=23&&game.level!=33&&game.level!=37&&game.level!=43&&game.level!=47&&game.level!=49)&&this.type!=56&&c.type!=56&&!((c.type==20||c.type==21)&&this.type==24&&(game.level==30||game.level==56))&&this.type!=74&&c.type!=74){
                    if(this.type==17&&c.type==47){
                        if(
                            inFullBoxBoxOpen(this,entities.walls[a][b])||
                            inFullBoxBoxOpen(entities.walls[a][b],this)
                        ){
                            this.redundant[4]=true
                            this.boundary[4]=[]
                            entities.walls[a][b].redundant[7]=true
                            entities.walls[a][b].boundary[7]=[]
                        }
                    }else if(this.type==18&&c.type==46){
                        if(
                            inFullBoxBoxOpen(this,entities.walls[a][b])||
                            inFullBoxBoxOpen(entities.walls[a][b],this)
                        ){
                            this.redundant[5]=true
                            this.boundary[5]=[]
                            entities.walls[a][b].redundant[6]=true
                            entities.walls[a][b].boundary[6]=[]
                        }
                    }else if(this.type==20&&c.type==45){
                        if(
                            inFullBoxBoxOpen(this,entities.walls[a][b])||
                            inFullBoxBoxOpen(entities.walls[a][b],this)
                        ){
                            this.redundant[6]=true
                            this.boundary[6]=[]
                            entities.walls[a][b].redundant[5]=true
                            entities.walls[a][b].boundary[5]=[]
                        }
                    }else if(this.type==21&&c.type==44){
                        if(
                            inFullBoxBoxOpen(this,entities.walls[a][b])||
                            inFullBoxBoxOpen(entities.walls[a][b],this)
                        ){
                            this.redundant[7]=true
                            this.boundary[7]=[]
                            entities.walls[a][b].redundant[4]=true
                            entities.walls[a][b].boundary[4]=[]
                        }
                    }
                    if(c.position.x!=this.position.x||c.position.y!=this.position.y){
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
    }
    checkOverlay(){
        for(let a=0,la=entities.walls.length;a<la;a++){
            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                let c=entities.walls[a][b]
                if(c.standard&&this.type!=37&&(c.type!=37||game.level==67||game.level==68||game.level==70)&&!(c.type==24&&(game.level==59||game.level==60))&&(this.type!=38&&c.type!=38||game.level!=22&&game.level!=23&&game.level!=33&&game.level!=37&&game.level!=43&&game.level!=47&&game.level!=49)&&this.type!=56&&c.type!=56&&!((c.type==20||c.type==21)&&this.type==24&&(game.level==30||game.level==56))&&!(this.type==35||c.type==35&&game.level==29)&&this.type!=74&&c.type!=74){
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
                            if(abs(c.position.y-(this.position.y+this.height/2+c.height/2))<1&&c.position.x-c.width/2<=this.boundary[0][e][d].x+1&&c.position.x+c.width/2>=this.boundary[0][e][d].x-1&&c.type!=17&&c.type!=18&&c.type!=44&&c.type!=45){
                                this.boundary[0][e][d].x=c.position.x+c.width/2*(1-d*2)
                            }
                        }
                        for(let e=0,le=this.boundary[1].length;e<le;e++){
                            if(abs(c.position.y-(this.position.y-this.height/2-c.height/2))<1&&c.position.x-c.width/2<=this.boundary[1][e][d].x+1&&c.position.x+c.width/2>=this.boundary[1][e][d].x-1&&c.type!=20&&c.type!=21&&c.type!=46&&c.type!=47){
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
        this.bounder={position:{x:bounds[0]/2+bounds[1]/2,y:bounds[2]/2+bounds[3]/2},width:bounds[1]-bounds[0]+(this.standard||this.type==59||this.type==60?100:20),height:bounds[3]-bounds[2]+(this.standard||this.type==59||this.type==60?100:20)}
        if((this.standard||(this.type==17||this.type==18||this.type==20||this.type==21)&&game.level==37)&&this.boundary[1].length>0&&this.type!=3&&(this.type!=24||game.level==37)){
            let set=[1,4,5]
            for(let g=0,lg=set.length;g<lg;g++){
                for(let a=0,la=this.boundary[set[g]].length;a<la;a++){
                    let scale=floor(dist(this.boundary[set[g]][a][0].x,this.boundary[set[g]][a][0].y,this.boundary[set[g]][a][1].x,this.boundary[set[g]][a][1].y)/(game.level==37?50:25))
                    if(scale>0){
                        for(let b=0,lb=scale;b<lb;b++){
                            if(!(game.level==55&&map((b+0.5)/lb,0,1,this.boundary[set[g]][a][0].x,this.boundary[set[g]][a][1].x)>game.tileset[0]*110)){
                                game.spawner.push([
                                    map((b+0.5)/lb,0,1,this.boundary[set[g]][a][0].x,this.boundary[set[g]][a][1].x),
                                    map((b+0.5)/lb,0,1,this.boundary[set[g]][a][0].y,this.boundary[set[g]][a][1].y)
                                ])
                            }
                        }
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
                    case 20: case 46:
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
                    case 34:
                        layer.translate(-this.position.x,-this.position.y)
                        layer.fillGradient(graphics.gradient[0])
                        layer.rect(this.position.x,this.position.y,this.width+1,this.height+1)
                    break
                    case 36:
                        if(this.position.y<game.tileset[1]*10){
                            if(this.time<480||this.time<600&&this.time%30<15){
                                layer.fill(80)
                                layer.rect(0,0,this.width+1,this.height+1)
                            }
                        }else{
                            layer.fill(160,150,130)
                            layer.rect(0,0,this.width+1,this.height+1)
                        }
                    break
                    case 38:
                        for(let a=0,la=this.balls[1].length;a<la;a++){
                            layer.fill(
                                185+this.balls[1][a][3]*20,
                                210+this.balls[1][a][3]*20,
                                220+this.balls[1][a][3]*20
                            )
                            regPoly(layer,this.balls[1][a][0],this.balls[1][a][1],this.balls[1][a][5],this.balls[1][a][2]*0.5,this.balls[1][a][2]*0.5,this.balls[1][a][4])
                            layer.fill(
                                155+this.balls[1][a][3]*20,
                                180+this.balls[1][a][3]*20,
                                190+this.balls[1][a][3]*20
                            )
                            regGem(layer,this.balls[1][a][0],this.balls[1][a][1],this.balls[1][a][5],this.balls[1][a][2]*0.5,this.balls[1][a][2]*0.5,this.balls[1][a][4])
                        }
                        layer.fill(75,55,50)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 39:
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                72+this.balls[a][3]*30,
                                79+this.balls[a][3]*30,
                                89+this.balls[a][3]*30
                            )
                            regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]*0.5,this.balls[a][2]*0.5,this.balls[a][4])
                        }
                        layer.fill(56,55,50)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 41:
                        if(this.position.y<game.tileset[1]*10){
                            if(this.time<480||this.time<600&&this.time%30<15){
                                layer.fill(80)
                                layer.rect(0,0,this.width+1,this.height+1)
                            }
                        }else{
                            layer.fill(77,63,76)
                            layer.beginShape()
                            layer.vertex(this.width/2+0.5,this.height/2)
                            layer.vertex(-this.width/2-0.5,this.height/2)
                            for(let a=0,la=round(this.width/game.tileset[0]);a<la;a++){
                                layer.vertex(this.width*(-0.5+a/la)-(a==0?0.5:0),-this.height/2)
                                layer.vertex(this.width*(-0.5+(a+0.2)/la),-this.height/2-5)
                                layer.vertex(this.width*(-0.5+(a+0.8)/la),-this.height/2-5)
                            }
                            layer.vertex(this.width/2+0.5,-this.height/2)
                            layer.endShape()
                        }
                    break
                    case 44:
                        layer.fill(67,72,78)
                        layer.rect(0,0,this.width+1,this.height+1)
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                35+this.balls[a][3]*30,
                                45+this.balls[a][3]*30,
                                37+this.balls[a][3]*30
                            )
                            regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]*0.5,this.balls[a][2]*0.5,this.balls[a][4])
                        }
                    break
                    case 45:
                        if(this.position.y<game.tileset[1]*10){
                            if(this.time<480||this.time<600&&this.time%30<15){
                                layer.fill(80)
                                layer.rect(0,0,this.width+1,this.height+1)
                            }
                        }else{
                            gradient=[new p5.LinearGradient(90,this.height)]
                            gradient[0].colors(
                                0.0,color(30+((this.position.y-this.height/2)/game.edge[1])*30,60-((this.position.y-this.height/2)/game.edge[1])*15,30),
                                1.0,color(30+((this.position.y+this.height/2)/game.edge[1])*30,60-((this.position.y+this.height/2)/game.edge[1])*15,30)
                            )
                            layer.translate(-this.width/2,-this.height/2)
                            layer.fillGradient(gradient[0])
                            layer.rect(this.width/2,this.height/2,this.width+1,this.height+1)
                        } 
                    break
                    case 50:
                        if(this.position.y<game.tileset[1]*10){
                            if(this.time<480||this.time<600&&this.time%30<15){
                                layer.fill(80)
                                layer.rect(0,0,this.width+1,this.height+1)
                            }
                        }else{
                            layer.translate(-this.position.x,-this.position.y)
                            layer.fillGradient(graphics.gradient[0])
                            layer.rect(this.position.x,this.position.y,this.width+1,this.height+1)
                        }
                    break
                    case 51:
                        if(this.position.y<game.tileset[1]*10){
                            if(this.time<480||this.time<600&&this.time%30<15){
                                layer.fill(80)
                                layer.rect(0,0,this.width+1,this.height+1)
                            }
                        }else{
                            layer.fill(117,109,86)
                            layer.rect(0,0,this.width+1,this.height+1)
                        }
                    break
                    case 52:
                        if(this.position.y<game.tileset[1]*10){
                            if(this.time<480||this.time<600&&this.time%30<15){
                                layer.fill(80)
                                layer.rect(0,0,this.width+1,this.height+1)
                            }
                        }else{
                            layer.fill(186,152,90)
                            layer.rect(0,0,this.width+1,this.height+1)
                        }
                    break
                    case 53:
                        if(this.position.y<game.tileset[1]*10){
                            if(this.time<480||this.time<600&&this.time%30<15){
                                layer.fill(80)
                                layer.rect(0,0,this.width+1,this.height+1)
                            }
                        }else{
                            layer.fill(125,130,125)
                            layer.rect(0,0,this.width+1,this.height+1)
                        }
                    break
                    case 54:
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                255-this.balls[a][3]*30,
                                226-this.balls[a][3]*30,
                                254-this.balls[a][3]*30
                            )
                            regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]*0.5,this.balls[a][2]*0.5,this.balls[a][4])
                        }
                    break
                    case 56: case 60: case 61:
                        if(this.position.y<game.tileset[1]*10){
                            if(this.time<480||this.time<600&&this.time%30<15){
                                layer.fill(80)
                                layer.rect(0,0,this.width+1,this.height+1)
                            }
                        }else{
                            layer.fill(...game.tilecolor[0])
                            layer.rect(0,0,this.width+1,this.height+1)
                        }
                    break
                    case 58: case 63: case 66:
                        for(let a=0,la=this.balls[2].length;a<la;a++){
                            layer.fill(
                                82+this.balls[2][a][3]*30,
                                97+this.balls[2][a][3]*30,
                                42+this.balls[2][a][3]*30
                            )
                            layer.triangle(
                                this.balls[2][a][0]+this.balls[2][a][2]*this.balls[2][a][4]*0.125,this.balls[2][a][1]-this.balls[2][a][2],
                                this.balls[2][a][0]-this.balls[2][a][2]*0.1,this.balls[2][a][1],
                                this.balls[2][a][0]+this.balls[2][a][2]*0.1,this.balls[2][a][1]
                            )
                        }
                        for(let a=0,la=this.balls[0].length;a<la;a++){
                            layer.fill(
                                67+this.balls[0][a][3]*30,
                                76+this.balls[0][a][3]*30,
                                29+this.balls[0][a][3]*30
                            )
                            regPoly(layer,this.balls[0][a][0],this.balls[0][a][1],this.balls[0][a][5],this.balls[0][a][2]*0.5,this.balls[0][a][2]*0.5,this.balls[0][a][4])
                        }
                    break
                    case 62:
                        if(this.position.y<game.tileset[1]*10){
                            if(this.time<480||this.time<600&&this.time%30<15){
                                layer.fill(80)
                                layer.rect(0,0,this.width+1,this.height+1)
                            }
                        }else{
                            layer.pattern(graphics.pattern[round((this.position.y-this.height/2)/game.tileset[1])%2])
                            layer.rectPattern(0,0,this.width+1,this.height+1)
                        }
                    break
                    case 64: case 70:
                        for(let a=0,la=this.balls[0].length;a<la;a++){
                            layer.fill(
                                162+this.balls[0][a][3]*30,
                                125+this.balls[0][a][3]*30,
                                107+this.balls[0][a][3]*30
                            )
                            regPoly(layer,this.balls[0][a][0],this.balls[0][a][1],this.balls[0][a][5],this.balls[0][a][2]*0.5,this.balls[0][a][2]*0.5,this.balls[0][a][4])
                        }
                    break
                    default:
                        layer.fill(...game.tilecolor[0])
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                }
            break
            case 2: case 34:
                //mark 2
                switch(game.level){
                    case 6: case 45:
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
                            -this.width/2+15,-this.height/2+15,
                            this.width/2-15,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 19: case 31:
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
                    case 20: case 46:
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
                            -this.width/2+15,-this.height/2+15,
                            this.width/2-15,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 21:
                        layer.fill(60,65,70)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+15,-this.height/2+15,
                            this.width/2-15,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 22:
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
                    case 23: case 35:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(120,200,120)
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
                    case 32: case 33:
                        layer.fill(152,134,112)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 40: case 52:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2+5,-this.height/2-0.5,
                            -this.width/2+25,-this.height/2+16,
                            this.width/2-25,-this.height/2+16,
                            this.width/2-5,-this.height/2-0.5
                        )
                    break
                    case 42:
                        layer.fill(90,85,105)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+10,-this.height/2+15,
                            this.width/2-10,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 44:
                        layer.fill(67,72,78)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+15,-this.height/2+15,
                            this.width/2-15,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 59: case 60: case 69:
                        layer.fill(...game.tilecolor[1])
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2+5,-this.height/2-0.5,
                            -this.width/2+20,-this.height/2+15,
                            this.width/2-20,-this.height/2+15,
                            this.width/2-5,-this.height/2-0.5
                        )
                    break
                    case 67: case 68:
                        layer.fill(...game.tilecolor[1])
                        layer.rect(0,0,this.width+1,this.height+1)
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
                    case 28:
                        layer.fill(120,200,200,this.position.y>game.edge[1]-650?0.5:1)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 30: case 32: case 33: case 56:
                        layer.fill(150,240,240,0.5)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 41:
                        layer.fill(200,250,250,0.8)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 55: case 65:
                        layer.fill(89,90,108,0.75)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 59: case 60:
                        layer.fill(51,58,66,0.5)
                        layer.rect(this.width/2,this.height/2,this.width,this.height)
                    break
                    case 67: case 68:
                        layer.fill(65,72,38,0.5)
                        layer.rect(this.width/2,this.height/2,this.width,this.height)
                    break
                    case 69:
                        layer.fill(184,104,43,0.5)
                        layer.rect(this.width/2,this.height/2,this.width,this.height)
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
                    case 19: case 31:
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
                    case 22:
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
                    case 23: case 35:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,120,120)
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
                    case 32: case 33:
                        layer.fill(152,134,112)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 34: case 50:
                        layer.translate(-this.position.x,-this.position.y)
                        layer.fillGradient(graphics.gradient[0])
                        layer.rect(this.position.x,this.position.y,this.width+1,this.height+1)
                    break
                    case 40: case 52:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(max(120,200-game.pointAnim[0]*80-min(480,this.reload)/5),120,120)
                        layer.quad(
                            -this.width/2+5,-this.height/2-0.5,
                            -this.width/2+25,-this.height/2+16,
                            this.width/2-25,-this.height/2+16,
                            this.width/2-5,-this.height/2-0.5
                        )
                    break
                    case 42:
                        layer.fill(90,85,105)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 49:
                        layer.fill(48,45,40)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(max(120,200-game.pointAnim[0]*80-min(480,this.reload)/5),120,120)
                        layer.quad(
                            -this.width/2+5,-this.height/2-0.5,
                            -this.width/2+25,-this.height/2+16,
                            this.width/2-25,-this.height/2+16,
                            this.width/2-5,-this.height/2-0.5
                        )
                    break
                    case 55: case 59: case 60: case 65:
                        layer.fill(...game.tilecolor[1])
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(max(120,200-min(480,this.reload)/5),120,120)
                        layer.quad(
                            -this.width/2+5,-this.height/2-0.5,
                            -this.width/2+20,-this.height/2+15,
                            this.width/2-20,-this.height/2+15,
                            this.width/2-5,-this.height/2-0.5
                        )
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
                //mark 7
                switch(game.level){
                    case 15: case 18: case 19: case 31:
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
                    case 22: case 23: case 35:
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
                                    -this.width*0.225,-this.height/2+(a+0.5)*game.tileset[1]+5,
                                    -this.width*0.225,-this.height/2+(a+0.5)*game.tileset[1]-5
                                )
                                layer.quad(
                                    this.width*0.5+0.5,-this.height/2+(a+0.5)*game.tileset[1]-10,
                                    this.width*0.5+0.5,-this.height/2+(a+0.5)*game.tileset[1]+10,
                                    this.width*0.225,-this.height/2+(a+0.5)*game.tileset[1]+5,
                                    this.width*0.225,-this.height/2+(a+0.5)*game.tileset[1]-5
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
                    case 29: case 53:
                        layer.fill(85,90,85)
                        layer.rect(0,0,this.width*2,this.height+1)
                        layer.triangle(-this.width*2,-this.height/2,this.width*2,-this.height/2,0,-this.height/2+this.width*3)
                        layer.triangle(-this.width*2,this.height/2,this.width*2,this.height/2,0,this.height/2-this.width*3)
                        layer.fill(95,100,95)
                        layer.rect(0,0,this.width,this.height+1)
                        layer.triangle(-this.width*1.5,-this.height/2,this.width*1.5,-this.height/2,0,-this.height/2+this.width*2.25)
                        layer.triangle(-this.width*1.5,this.height/2,this.width*1.5,this.height/2,0,this.height/2-this.width*2.25)
                    break
                    case 30: case 56:
                        layer.fill(75,55,45)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(65,30,25)
                        for(let a=0,la=floor(this.height/game.tileset[1]*2.25);a<la;a++){
                            layer.rect(0,(a-la*0.5+0.5)*4/9*game.tileset[1],this.width,game.tileset[1]/15)
                        }
                        if(abs(this.height-game.tileset[1]*3.6)<1){
                            layer.fill(150,55,40)
                            regPoly(layer,0,0,6,this.width*1.2,this.width*1.5,0)
                            layer.fill(240,240,200)
                            regPoly(layer,0,0,6,this.width*0.8,this.width,0)
                        }
                    break
                    case 32: case 33:
                        layer.fill(50,40,35)
                        layer.rect(0,0,this.width,this.height)
                        layer.fill(78,56,55)
                        for(let a=0,la=floor(this.height/game.tileset[1]*2);a<la;a++){
                            layer.rect(0,(a-la*0.5+0.225)*game.tileset[1]*0.5,this.width,2)
                            layer.rect(0,(a-la*0.5+0.75)*game.tileset[1]*0.5,this.width,2)
                            layer.rect(0,(a-la*0.5+0.5)*game.tileset[1]*0.5,2,game.tileset[0]*0.225)
                        }
                    break
                    case 34: case 50:
                        layer.fill(103,81,67)
                        layer.quad(-this.width*0.9,-this.height*0.5,-this.width*0.3,-this.height*0.5,this.width*0.9,this.height*0.5,this.width*0.3,this.height*0.5)
                        layer.quad(-this.width*0.9,this.height*0.5,-this.width*0.3,this.height*0.5,this.width*0.9,-this.height*0.5,this.width*0.3,-this.height*0.5)
                    break
                    case 36:
                        layer.fill(85,75,55)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(75,50,35)
                        for(let a=0,la=floor(this.height/game.tileset[1]*2.25);a<la;a++){
                            layer.rect(0,(a-la*0.5+0.5)*4/9*game.tileset[1],this.width,game.tileset[1]/15)
                        }
                    break
                    case 37:
                        layer.fill(84,77,93)
                        layer.rect(-this.width,0,this.width*0.8+1,this.height)
                        layer.rect(this.width,0,this.width*0.8+1,this.height)
                        layer.fill(53,47,52)
                        for(let a=0,la=floor(this.height/game.tileset[1]*2.25);a<la;a++){
                            layer.rect(-this.width,(a-la*0.5+0.5)*4/9*game.tileset[1],this.width*0.8,game.tileset[1]/15)
                            layer.rect(this.width,(a-la*0.5+0.5)*4/9*game.tileset[1],this.width*0.8,game.tileset[1]/15)
                        }
                    break
                    case 38:
                        layer.fill(94,80,58)
                        layer.rect(-this.width,0,this.width*0.8+1,this.height)
                        layer.rect(this.width,0,this.width*0.8+1,this.height)
                        layer.fill(82,80,43)
                        for(let a=0,la=this.height/game.tileset[1]*3;a<la;a++){
                            layer.rect(-this.width-this.width*0.1*(a%2*2-1),(a-la*0.5+0.5)/3*game.tileset[1],this.width*0.5,game.tileset[1]/20)
                            layer.rect(this.width-this.width*0.1*(a%2*2-1),(a-la*0.5+0.5)/3*game.tileset[1],this.width*0.5,game.tileset[1]/20)
                        }
                    break
                    case 39:
                        layer.fill(28,28,30)
                        layer.rect(0,0,this.width,this.height+1)
                        layer.fill(20,18,19)
                        layer.rect(this.width*0.05,0,this.width*0.15,this.height+1)
                        layer.rect(this.width*0.35,0,this.width*0.15,this.height+1)
                    break
                    case 40: case 52:
                        if(this.position.y>game.edge[1]-game.tileset[1]*13){
                            layer.fill(114,107,93)
                            layer.rect(-this.width,0,this.width*0.6+1,this.height)
                            layer.rect(this.width,0,this.width*0.6+1,this.height)
                            layer.fill(83,77,52)
                            for(let a=0,la=floor(this.height/game.tileset[1]*2.25);a<la;a++){
                                layer.rect(-this.width,(a-la*0.5+0.5)*4/9*game.tileset[1],this.width*0.6,game.tileset[1]/15)
                                layer.rect(this.width,(a-la*0.5+0.5)*4/9*game.tileset[1],this.width*0.6,game.tileset[1]/15)
                            }
                        }else{
                            layer.fill(80)
                            layer.rect(0,0,this.width*0.8+1,this.height+1)
                            layer.fill(100)
                            for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                                layer.rect(0,-this.height/2+(a+0.5)*game.tileset[1]-8,this.width*0.8+1,4)
                                layer.rect(0,-this.height/2+(a+0.5)*game.tileset[1],this.width*0.8+1,4)
                                layer.rect(0,-this.height/2+(a+0.5)*game.tileset[1]+8,this.width*0.8+1,4)
                            }
                        }
                    break
                    case 41:
                        layer.fill(69,53,66)
                        layer.rect(-this.width*0.8,0,this.width*0.4,this.height)
                        layer.rect(this.width*0.8,0,this.width*0.4,this.height)
                    break
                    case 42:
                        if(this.position.x>game.edge[0]/3&&this.position.x<game.edge[0]*2/3&&this.position.y>game.edge[1]-game.tileset[1]*18){
                            layer.fill(60,60,70)
                            layer.rect(0,0,this.width+1,this.height+1)
                            layer.fill(80,80,90)
                            for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                                layer.quad(
                                    -this.width*0.5-0.5,-this.height/2+(a+0.5)*game.tileset[1]-10,
                                    -this.width*0.5-0.5,-this.height/2+(a+0.5)*game.tileset[1]+10,
                                    -this.width*0.225,-this.height/2+(a+0.5)*game.tileset[1]+5,
                                    -this.width*0.225,-this.height/2+(a+0.5)*game.tileset[1]-5
                                )
                                layer.quad(
                                    this.width*0.5+0.5,-this.height/2+(a+0.5)*game.tileset[1]-10,
                                    this.width*0.5+0.5,-this.height/2+(a+0.5)*game.tileset[1]+10,
                                    this.width*0.225,-this.height/2+(a+0.5)*game.tileset[1]+5,
                                    this.width*0.225,-this.height/2+(a+0.5)*game.tileset[1]-5
                                )
                            }
                        }else{
                            layer.fill(140,80,20)
                            layer.rect(0,0,this.width+1,this.height)
                            layer.fill(120,60,0)
                            for(let a=0,la=this.height/game.tileset[1]*2;a<la;a++){
                                layer.rect(0,-this.height/2+(a+0.5)/2*game.tileset[1],this.width+1,3)
                            }
                        }
                    break
                    case 43:
                        layer.fill(108,93,96)
                        layer.rect(0,0,this.width,this.height)
                        layer.rect(0,-this.height*0.5+4,this.width*2,8)
                        layer.rect(0,this.height*0.5-4,this.width*2,8)
                    break
                    case 44:
                        layer.fill(70,87,97)
                        layer.rect(0,0,this.width,this.height)
                        layer.rect(0,0,this.width*1.6,this.width*1.6,3)
                    break
                    case 47:
                        layer.fill(120)
                        layer.rect(0,0,this.width+1,this.height+1)
                        if(this.height>game.tileset[1]*4){
                            layer.fill(95,95,90)
                            layer.rect(0,0,this.width*2,this.width*3,3)
                            layer.fill(240,30,0)
                            layer.ellipse(0,-this.width*0.5,this.width*0.6)
                            layer.ellipse(0,this.width*0.5,this.width*0.6)
                        }
                    break
                    case 49:
                        layer.fill(62,58,51)
                        layer.rect(-this.width*0.6,0,this.width*0.6,this.height+1)
                        layer.rect(this.width*0.6,0,this.width*0.6,this.height+1)
                        for(let a=0,la=this.height/game.tileset[1]/3;a<la;a++){
                            layer.rect(0,this.height*(-0.5+(a+0.5)/la),this.width,this.width*0.6)
                            layer.rect(-this.width*0.6,this.height*(-0.5+(a+0.5)/la),this.width*0.8,this.width*0.8)
                            layer.rect(this.width*0.6,this.height*(-0.5+(a+0.5)/la),this.width*0.8,this.width*0.8)
                        }
                    break
                    case 51:
                        layer.fill(58,51,41)
                        layer.rect(-this.width*0.8,0,this.width*0.5,this.height+1)
                        layer.rect(this.width*0.8,0,this.width*0.5,this.height+1)
                        layer.fill(69,64,58)
                        for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                            layer.quad(
                                this.width*1.05,this.height*(-0.5+(a+0.05)/la),
                                this.width*1.05,this.height*(-0.5+(a+0.2)/la),
                                -this.width*1.05,this.height*(-0.5+(a+0.45)/la),
                                -this.width*1.05,this.height*(-0.5+(a+0.3)/la)
                            )
                            layer.quad(
                                this.width*1.05,this.height*(-0.5+(a+0.95)/la),
                                this.width*1.05,this.height*(-0.5+(a+0.8)/la),
                                -this.width*1.05,this.height*(-0.5+(a+0.55)/la),
                                -this.width*1.05,this.height*(-0.5+(a+0.7)/la)
                            )
                        }
                    break
                    case 54:
                        if(this.position.x<game.tileset[0]*150){
                            layer.fill(54,53,51)
                            layer.rect(0,0,this.width*0.5,this.height+1)
                            layer.fill(75,73,74)
                            for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                                layer.rect(0,-this.height/2+(a+0.5)*game.tileset[1],this.width*0.5,game.tileset[1]*0.06)
                                layer.rect(0,-this.height/2+(a+0.5)*game.tileset[1]-game.tileset[1]*0.08,this.width*0.5,game.tileset[1]*0.04)
                                layer.rect(0,-this.height/2+(a+0.5)*game.tileset[1]+game.tileset[1]*0.08,this.width*0.5,game.tileset[1]*0.04)
                            }
                        }else{
                            layer.fill(50,28,49)
                            layer.rect(0,0,this.width+1,this.height)
                            layer.fill(35,18,34)
                            for(let a=0,la=floor(this.height/game.tileset[1]*2);a<la;a++){
                                layer.rect(0,-this.height/2+(a+0.5)/2*game.tileset[1],this.width-4,3)
                            }
                        }
                    break
                    case 55: case 65:
                        let shift=(this.position.x<game.tileset[0]*60&&this.position.x>game.tileset[0]*12&&game.level==55||(this.position.x<game.tileset[0]*66+game.edge[0]*0.5&&this.position.x>game.tileset[0]*12+game.edge[0]*0.5||this.position.x>game.tileset[0]*-66+game.edge[0]*0.5&&this.position.x<game.tileset[0]*-12+game.edge[0]*0.5)&&game.level==65)?60:0
                        layer.fill(51+shift,45+shift,45+shift)
                        layer.rect(-this.width*0.3,0,this.width*0.4,this.height)
                        layer.rect(this.width*0.3,0,this.width*0.4,this.height)
                        for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                            layer.rect(0,-this.height/2+(a+0.5)*game.tileset[1],this.width*1.4,3)
                            layer.rect(0,-this.height/2+(a+0.5)*game.tileset[1],this.width*1.4,3)
                        }
                    break
                    case 58: case 63: case 66:
                        layer.fill(113,102,72)
                        layer.rect(-this.width*1.5,0,this.width,this.height+1)
                        layer.rect(this.width*1.5,0,this.width,this.height+1)
                        layer.fill(89,81,60)
                        for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                            layer.quad(
                                -this.width*1.9,this.height*(-0.5+(a+0.5)/la)-this.width*1.4,
                                -this.width*1.4,this.height*(-0.5+(a+0.5)/la)-this.width*1.9,
                                this.width*1.9,this.height*(-0.5+(a+0.5)/la)+this.width*1.4,
                                this.width*1.4,this.height*(-0.5+(a+0.5)/la)+this.width*1.9
                            )
                        }
                    break
                    case 59: case 60:
                        layer.fill(57,56,51)
                        layer.rect(0,0,this.width*1.5,this.height+1)
                        layer.quad(-this.width*1.75,-this.height/2,this.width*1.75,-this.height/2,this.width*1.25,-this.height/2+this.width,-this.width*1.25,-this.height/2+this.width)
                        layer.quad(-this.width*1.75,this.height/2,this.width*1.75,this.height/2,this.width*1.25,this.height/2-this.width,-this.width*1.25,this.height/2-this.width)
                    break
                    case 61:
                        layer.fill(94,75,63)
                        layer.rect(-this.width*0.8,0,this.width*0.6,this.height)
                        layer.rect(this.width*0.8,0,this.width*0.6,this.height)
                        layer.stroke(94,75,63)
                        layer.strokeWeight(this.width*0.3)
                        for(let a=0,la=round(this.height/game.tileset[1]);a<la;a++){
                            layer.line(-this.width*0.8,this.height*(-0.5+(a+0.6)/la),this.width*0.8,this.height*(-0.5+(a+0.1)/la))
                            layer.line(-this.width*0.8,this.height*(-0.5+(a+0.9)/la),this.width*0.8,this.height*(-0.5+(a+0.4)/la))
                        }
                    break
                    case 62:
                        layer.fill(74,74,74)
                        layer.beginShape()
                        layer.vertex(-this.width*0.5,-this.height*0.5)
                        layer.vertex(this.width*0.5,-this.height*0.5)
                        layer.vertex(this.width*0.3,0)
                        layer.vertex(this.width*0.5,this.height*0.5)
                        layer.vertex(-this.width*0.5,this.height*0.5)
                        layer.vertex(-this.width*0.3,0)
                        layer.endShape()
                    break
                    case 64: case 70:
                        layer.fill(127,88,71)
                        layer.rect(0,0,this.width+1,this.height)
                        if(this.height>game.tileset[1]*3){
                            layer.fill(126,104,91)
                            layer.rect(0,0,this.width*1.6,this.height-game.tileset[1]*2.4,2)
                            layer.fill(105,86,79)
                            layer.ellipse(0,-this.height*0.5+game.tileset[1]*1.2+this.width*0.8,this.width*0.6,this.width*0.6)
                            layer.ellipse(0,this.height*0.5-game.tileset[1]*1.2-this.width*0.8,this.width*0.6,this.width*0.6)
                        }
                    break
                    case 67: case 68:
                        layer.fill(131,145,136)
                        layer.rect(0,0,this.width,this.height)
                        layer.quad(-this.width*1.25,-this.height*0.5,this.width*1.25,-this.height*0.5,this.width*0.75,-this.height*0.5+this.width,-this.width*0.75,-this.height*0.5+this.width)
                        layer.quad(-this.width*1.25,this.height*0.5,this.width*1.25,this.height*0.5,this.width*0.75,this.height*0.5-this.width,-this.width*0.75,this.height*0.5-this.width)
                        layer.rect(0,0,this.width*1.25,this.width*1.5)
                    break
                    case 69:
                        layer.fill(68,58,57)
                        layer.rect(-this.width*0.8,0,this.width*0.8,this.height+1)
                        layer.rect(this.width*0.8,0,this.width*0.8,this.height+1)
                        layer.fill(83,60,52)
                        for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                            layer.rect(-this.width*0.8,-this.height/2+(a+0.5)*game.tileset[1]-8,this.width*0.8,4)
                            layer.rect(this.width*0.8,-this.height/2+(a+0.5)*game.tileset[1]-8,this.width*0.8,4)
                            layer.rect(-this.width*0.8,-this.height/2+(a+0.5)*game.tileset[1],this.width*0.8,4)
                            layer.rect(this.width*0.8,-this.height/2+(a+0.5)*game.tileset[1],this.width*0.8,4)
                            layer.rect(-this.width*0.8,-this.height/2+(a+0.5)*game.tileset[1]+8,this.width*0.8,4)
                            layer.rect(this.width*0.8,-this.height/2+(a+0.5)*game.tileset[1]+8,this.width*0.8,4)
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
                //mark 8
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
            case 9: case 41: case 63:
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
                //mark 11
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
                    case 19: case 31: case 42:
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
                    case 30: case 56:
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
                    break
                    case 32: case 33:
                        layer.fill(61,59,60)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.rect(-this.width/2+(0.5+a)/la*this.width,this.height/4+1,this.width/la-2,this.height/2-2)
                        }
                        for(let a=0,la=this.width/game.tileset[0]*2-1;a<la;a++){
                            layer.rect(-this.width/2+(1+a)/(la+1)*this.width,-this.height/4+1,this.width/(la+1)-2,this.height/2-2)
                        }
                        layer.fill(41,39,40)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.rect(-this.width/2+(0.5+a)/la*this.width,this.height/4+1,this.width/la-6,this.height/2-6)
                        }
                        for(let a=0,la=this.width/game.tileset[0]*2-1;a<la;a++){
                            layer.rect(-this.width/2+(1+a)/(la+1)*this.width,-this.height/4+2,this.width/(la+1)-6,this.height/2-4)
                        }
                    break
                    case 34: case 50:
                        layer.fill(120,75,65)
                        layer.rect(0,this.height/3,this.width-2,this.height/3-2)
                        layer.rect(0,-this.height/12+1,this.width-game.tileset[0]*0.2-2,this.height/2-2)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.rect(this.width*(-0.5+(a+0.5)/la),this.height/6,4,6)
                        }
                    break
                    case 36:
                        layer.fill(125,110,90)
                        for(let a=0,la=this.width/game.tileset[0]*3;a<la;a++){
                            layer.rect(-this.width/2+(0.5+a)/la*this.width,this.height/3+1,this.width/la-1.5,this.height/3-1.5)
                        }
                        for(let a=0,la=this.width/game.tileset[0]*3-1;a<la;a++){
                            layer.rect(-this.width/2+(1+a)/(la+1)*this.width,1,this.width/(la+1)-1.5,this.height/3-1.5)
                        }
                        for(let a=0,la=this.width/game.tileset[0]*3-2;a<la;a++){
                            layer.rect(-this.width/2+(1.5+a)/(la+2)*this.width,-this.height/3+1,this.width/(la+2)-1.5,this.height/3-1.5)
                        }
                    break
                    case 37:
                        layer.fill(190,176,135)
                        layer.rect(0,this.height/4,this.width-game.tileset[0]*0.2-2,this.height/2-3)
                        layer.rect(0,-this.height/4+1,this.width-game.tileset[0]*0.6-2,this.height/2-3)
                        layer.fill(139,114,79)
                        layer.rect(0,this.height/4,this.width-game.tileset[0]*0.2-8,this.height/2-3)
                        layer.rect(0,-this.height/4+1,this.width-game.tileset[0]*0.6-8,this.height/2-3)
                    break
                    case 38:
                        layer.fill(80,75,60)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            regPoly(layer,-this.width/2+(0.5+a)/la*this.width,this.height/4+1,8,this.width/la*0.5,this.height/2*0.5,22.5)
                        }
                        for(let a=0,la=this.width/game.tileset[0]*2-1;a<la;a++){
                            regPoly(layer,-this.width/2+(1+a)/(la+1)*this.width,-this.height/4+1,8,this.width/(la+1)*0.5,this.height/2*0.5,22.5)
                        }
                    break
                    case 39:
                        layer.fill(102,100,103)
                        for(let a=0,la=this.width/game.tileset[0]*3;a<la;a++){
                            layer.quad(
                                this.width*(-0.5+(a-0.1)/la),this.height/2,
                                this.width*(-0.5+(a+1.1)/la),this.height/2,
                                this.width*(-0.5+(a+0.8)/la),-this.height/4,
                                this.width*(-0.5+(a+0.2)/la),-this.height/4
                            )
                        }
                    break
                    case 40: case 52:
                        if(this.position.y>game.tileset[1]*45){
                            layer.fill(170,146,95)
                            layer.rect(0,this.height/4,this.width-game.tileset[0]*0.2-2,this.height/2-3)
                            layer.rect(0,-this.height/4+1,this.width-game.tileset[0]*0.6-2,this.height/2-3)
                            layer.fill(119,84,49)
                            layer.rect(0,this.height/4,this.width-game.tileset[0]*0.2-8,this.height/2-3)
                            layer.rect(0,-this.height/4+1,this.width-game.tileset[0]*0.6-8,this.height/2-3)
                        }else{
                            layer.fill(60)
                            for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                                layer.rect(-this.width/2+(0.5+a)/la*this.width,this.height/4+1,this.width/la-2,this.height/2-2)
                            }
                            for(let a=0,la=this.width/game.tileset[0]*2-1;a<la;a++){
                                layer.rect(-this.width/2+(1+a)/(la+1)*this.width,-this.height/4+1,this.width/(la+1)-2,this.height/2-2)
                            }
                        }
                    break
                    case 43:
                        layer.fill(102,78,68)
                        layer.rect(0,this.height/3,this.width,this.height/3-1)
                        layer.rect(0,0,this.width-12,this.height/3-1)
                        layer.rect(0,-this.height/3,this.width,this.height/3-1)
                    break
                    case 44:
                        layer.fill(45,45,45)
                        layer.rect(0,this.height/3,this.width,this.height/3-1)
                        layer.rect(0,0,this.width-8,this.height/3-1)
                        layer.rect(0,-this.height/3,this.width-16,this.height/3-1)
                    break
                    case 47:
                        layer.fill(85,85,75)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.rect(-this.width/2+(0.5+a)/la*this.width,this.height/4+1,this.width/la-2,this.height/2-2,2)
                            layer.rect(-this.width/2+(0.5+a)/la*this.width,this.height/4+3,this.width/la-2,this.height/2-6)
                        }
                        for(let a=0,la=this.width/game.tileset[0]*2-1;a<la;a++){
                            layer.rect(-this.width/2+(1+a)/(la+1)*this.width,-this.height/4+1,this.width/(la+1)-2,this.height/2-2,2)
                            layer.rect(-this.width/2+(1+a)/(la+1)*this.width,-this.height/4+3,this.width/(la+1)-2,this.height/2-6)
                        }
                    break
                    case 49:
                        layer.fill(39,39,39)
                        layer.rect(-this.width/2,0,4,this.height)
                        layer.rect(this.width/2,0,4,this.height)
                        layer.rect(0,-2,this.width,3)
                        layer.rect(0,4,this.width,3)
                    break
                    case 54:
                        layer.fill(58,48,55)
                        layer.quad(-this.width*0.4,-this.height*0.5+3,-this.width*0.4,-1,this.width*0.4,this.height*0.5-2,this.width*0.4,2)
                        layer.fill(68,53,65)
                        layer.rect(0,this.height/4,this.width,this.height/2-3)
                        layer.rect(0,-this.height/4+1,this.width-game.tileset[0]*0.4,this.height/2-3)
                    break
                    case 55: case 65:
                        let shift=(this.position.x<game.tileset[0]*60&&this.position.x>game.tileset[0]*12&&game.level==55||(this.position.x<game.tileset[0]*66+game.edge[0]*0.5&&this.position.x>game.tileset[0]*-66+game.edge[0]*0.5)&&game.level==65)?60:0
                        layer.fill(64+shift,57+shift,47+shift)
                        layer.rect(0,this.height*0.05,this.width,this.height*0.9,4)
                        layer.fill(47+shift,42+shift,38+shift)
                        for(let a=0,la=15;a<la;a++){
                            layer.quad(
                                this.width*(-0.5+(a+1)/(la+1))+3,-this.height*0.125-3,
                                this.width*(-0.5+(a+1)/(la+1))+0.6,-this.height*0.125+0.6,
                                this.width*(-0.5+(a+1)/(la+1))-3,-this.height*0.125+3,
                                this.width*(-0.5+(a+1)/(la+1))-0.6,-this.height*0.125-0.6
                            )
                            layer.quad(
                                this.width*(-0.5+(a+1)/(la+1))+3,this.height*0.275+3,
                                this.width*(-0.5+(a+1)/(la+1))+0.6,this.height*0.275-0.6,
                                this.width*(-0.5+(a+1)/(la+1))-3,this.height*0.275-3,
                                this.width*(-0.5+(a+1)/(la+1))-0.6,this.height*0.275+0.6
                            )
                        }
                    break
                    case 58: case 63: case 66:
                        layer.fill(85,107,84)
                        for(let a=0,la=4;a<la;a++){
                            layer.quad(
                                -this.width*0.5+a*(this.width*0.225-2),this.height*0.5,
                                -this.width*0.5+8+a*(this.width*0.225-2),-this.height*0.4375,
                                -this.width*0.225-2+a*(this.width*0.225-2),-this.height*0.4375,
                                -this.width*0.225+6+a*(this.width*0.225-2),this.height*0.5
                            )
                        }
                    break
                    case 59: case 60:
                        layer.fill(162,124,65)
                        layer.rect(-this.width*0.5,0,2,this.height)
                        layer.rect(this.width*0.5,0,2,this.height)
                        layer.rect(0,-this.height*0.5+1,this.width,2)
                        layer.rect(0,-this.height*0.225+1,this.width,2)
                        layer.rect(0,0+1,this.width,2)
                        layer.rect(0,this.height*0.225+1,this.width,2)
                    break
                    case 61:
                        layer.fill(170,126,94)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.rect(-this.width/2+(0.5+a)/la*this.width,this.height*0.1+1,this.width/la-3,this.height*0.8-2,3)
                        }
                        layer.fill(148,115,85)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.rect(-this.width/2+(0.5+a)/la*this.width,this.height*0.1+1,this.width/la-7,this.height*0.8-6,2)
                        }
                    break
                    case 62:
                        layer.fill(97,100,101)
                        layer.rect(0,this.height*0.05,this.width,this.height*0.9,4)
                        layer.fill(61,62,66)
                        for(let a=0,la=15;a<la;a++){
                            layer.quad(
                                this.width*(-0.5+(a+1)/(la+1))+3,-this.height*0.125-3,
                                this.width*(-0.5+(a+1)/(la+1))+0.6,-this.height*0.125+0.6,
                                this.width*(-0.5+(a+1)/(la+1))-3,-this.height*0.125+3,
                                this.width*(-0.5+(a+1)/(la+1))-0.6,-this.height*0.125-0.6
                            )
                            layer.quad(
                                this.width*(-0.5+(a+1)/(la+1))+3,this.height*0.275+3,
                                this.width*(-0.5+(a+1)/(la+1))+0.6,this.height*0.275-0.6,
                                this.width*(-0.5+(a+1)/(la+1))-3,this.height*0.275-3,
                                this.width*(-0.5+(a+1)/(la+1))-0.6,this.height*0.275+0.6
                            )
                        }
                    break
                    case 67: case 68:
                        layer.fill(144,150,141)
                        layer.rect(0,this.height*0.1,this.width,this.height*0.8)
                        layer.fill(97,103,103)
                        for(let a=0,la=this.width/game.tileset[0]*4-1;a<la;a++){
                            layer.rect(this.width*(-0.5+(a+1)/(la+1)),this.height*0.05,3,this.height*0.9)
                        }
                    break
                    case 69:
                        layer.fill(125,86,57)
                        layer.rect(-this.width*0.5,0,2,this.height)
                        layer.rect(this.width*0.5,0,2,this.height)
                        layer.rect(0,-this.height*0.5+1,this.width,2)
                        layer.rect(0,-this.height*0.225+1,this.width,2)
                        layer.rect(0,0+1,this.width,2)
                        layer.rect(0,this.height*0.225+1,this.width,2)
                    break
                    default:
                        switch(game.level){
                            case 6:
                                layer.fill(60+this.position.y/game.edge[1]*20,80-this.position.y/game.edge[1]*10,60)
                            break
                            case 21:
                                layer.fill(80,70,60)
                            break
                            case 27: case 41:
                                layer.fill(135)
                            break
                            case 29: case 53:
                                layer.fill(90,100,90)
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
                    case 19: case 31:
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
                    case 32: case 33:
                        layer.fill(152,134,112)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 49:
                        layer.fill(48,45,40)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,220-min(480,this.reload)/5,120)
                        layer.quad(
                            -this.width/2+5,-this.height/2-0.5,
                            -this.width/2+25,-this.height/2+16,
                            this.width/2-25,-this.height/2+16,
                            this.width/2-5,-this.height/2-0.5
                        )
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
                    case 19: case 31:
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
                    case 22: case 23: case 35:
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
                    case 32: case 33:
                        layer.fill(152,134,112)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 49:
                        layer.fill(48,45,40)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(max(120,220-min(480,this.reload)/5-game.pointAnim[0]*100),max(120,170-min(480,this.reload)/10-game.pointAnim[0]*50),120)
                        layer.quad(
                            -this.width/2+5,-this.height/2-0.5,
                            -this.width/2+25,-this.height/2+16,
                            this.width/2-25,-this.height/2+16,
                            this.width/2-5,-this.height/2-0.5
                        )
                    break
                    case 55: case 65:
                        layer.fill(...game.tilecolor[1])
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,170-min(480,this.reload)/10,120)
                        layer.quad(
                            -this.width/2+5,-this.height/2-0.5,
                            -this.width/2+20,-this.height/2+15,
                            this.width/2-20,-this.height/2+15,
                            this.width/2-5,-this.height/2-0.5
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
            break
            case 17:
                //mark 17
                switch(game.level){
                    case 6: case 45:
                        gradient=[new p5.LinearGradient(90,this.height)]
                        gradient[0].colors(
                            0.0,color(30+((this.position.y-this.height/2)/game.edge[1])*30,60-((this.position.y-this.height/2)/game.edge[1])*15,30),
                            1.0,color(30+((this.position.y+this.height/2)/game.edge[1])*30,60-((this.position.y+this.height/2)/game.edge[1])*15,30)
                        )
                        layer.translate(-this.width/2,-this.height/2)
                        layer.fillGradient(gradient[0])
                        layer.triangle(
                            -0.5,-0.5,
                            -0.5,this.height+0.5,
                            this.width+0.5,this.height+0.5
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
                                -this.width/2-0.5,game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.225,
                                -this.width/2-0.5,game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.225,
                                map(game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.225,-this.height/2-0.5,this.height/2+0.5,-this.width/2-0.5,this.width/2+0.5),game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.225,
                                map(game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.225,-this.height/2-0.5,this.height/2+0.5,-this.width/2-0.5,this.width/2+0.5),game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.225
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
                                this.width/2-(a+0.5)/la*this.width-1,this.height/2+0.5,
                                this.width/2-(a+0.5)/la*this.width+1,this.height/2+0.5,
                                this.width/2-(a+0.5)/la*this.width+1,map(-this.width/2+(a+0.5)/la*this.width-1,-this.width/2-0.5,this.width/2+0.5,this.height/2+0.5,-this.height/2-0.5),
                                this.width/2-(a+0.5)/la*this.width-1,map(-this.width/2+(a+0.5)/la*this.width+1,-this.width/2-0.5,this.width/2+0.5,this.height/2+0.5,-this.height/2-0.5)
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
                    case 34: case 50:
                        layer.translate(-this.position.x,-this.position.y)
                        layer.fillGradient(graphics.gradient[0])
                        layer.triangle(
                            -this.width/2-0.5+this.position.x,-this.height/2-0.5+this.position.y,
                            -this.width/2-0.5+this.position.x,this.height/2+0.5+this.position.y,
                            this.width/2+0.5+this.position.x,this.height/2+0.5+this.position.y
                        )
                    break
                    case 38:
                        for(let a=0,la=this.balls[1].length;a<la;a++){
                            layer.fill(
                                185+this.balls[1][a][3]*20,
                                210+this.balls[1][a][3]*20,
                                220+this.balls[1][a][3]*20
                            )
                            regPoly(layer,this.balls[1][a][0],this.balls[1][a][1],this.balls[1][a][5],this.balls[1][a][2]*0.5,this.balls[1][a][2]*0.5,this.balls[1][a][4])
                            layer.fill(
                                155+this.balls[1][a][3]*20,
                                180+this.balls[1][a][3]*20,
                                190+this.balls[1][a][3]*20
                            )
                            regGem(layer,this.balls[1][a][0],this.balls[1][a][1],this.balls[1][a][5],this.balls[1][a][2]*0.5,this.balls[1][a][2]*0.5,this.balls[1][a][4])
                        }
                        layer.fill(75,55,50)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 39:
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                72+this.balls[a][3]*30,
                                79+this.balls[a][3]*30,
                                89+this.balls[a][3]*30
                            )
                            regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]*0.5,this.balls[a][2]*0.5,this.balls[a][4])
                        }
                        layer.fill(56,55,50)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 46:
                        layer.fill(100)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                        layer.fill(75)
                        layer.quad(
                            -this.width*0.3,-this.height*0.3-0.5,
                            -this.width*0.3,this.height*0.5+0.5,
                            this.width*0.3,this.height*0.5+0.5,
                            this.width*0.3,this.height*0.3-0.5
                        )
                        layer.quad(
                            -this.width*0.5-0.5,-this.height*0.3,
                            -this.width*0.5-0.5,this.height*0.3,
                            this.width*0.3+0.5,this.height*0.3,
                            -this.width*0.3+0.5,-this.height*0.3
                        )
                    break
                    case 54:
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                255-this.balls[a][3]*30,
                                226-this.balls[a][3]*30,
                                254-this.balls[a][3]*30
                            )
                            regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]*0.5,this.balls[a][2]*0.5,this.balls[a][4])
                        }
                    break
                    case 58: case 63: case 66:
                        for(let a=0,la=this.balls[2].length;a<la;a++){
                            layer.fill(
                                82+this.balls[2][a][3]*30,
                                97+this.balls[2][a][3]*30,
                                42+this.balls[2][a][3]*30
                            )
                            layer.triangle(
                                this.balls[2][a][0]+this.balls[2][a][2]*this.balls[2][a][4]*0.125,this.balls[2][a][1]-this.balls[2][a][2],
                                this.balls[2][a][0]-this.balls[2][a][2]*0.1,this.balls[2][a][1],
                                this.balls[2][a][0]+this.balls[2][a][2]*0.1,this.balls[2][a][1]
                            )
                        }
                        for(let a=0,la=this.balls[0].length;a<la;a++){
                            layer.fill(
                                67+this.balls[0][a][3]*30,
                                76+this.balls[0][a][3]*30,
                                29+this.balls[0][a][3]*30
                            )
                            regPoly(layer,this.balls[0][a][0],this.balls[0][a][1],this.balls[0][a][5],this.balls[0][a][2]*0.5,this.balls[0][a][2]*0.5,this.balls[0][a][4])
                        }
                    break
                    case 62:
                        layer.pattern(graphics.pattern[round((this.position.y-this.height/2)/game.tileset[1])%2])
                        layer.trianglePattern(
                            -this.width/2,this.height/2+0.5,
                            this.width/2,this.height/2+0.5,
                            -this.width/2,-this.height/2-0.5
                        )
                    break
                    case 64: case 70:
                        for(let a=0,la=this.balls[0].length;a<la;a++){
                            layer.fill(
                                162+this.balls[0][a][3]*30,
                                125+this.balls[0][a][3]*30,
                                107+this.balls[0][a][3]*30
                            )
                            regPoly(layer,this.balls[0][a][0],this.balls[0][a][1],this.balls[0][a][5],this.balls[0][a][2]*0.5,this.balls[0][a][2]*0.5,this.balls[0][a][4])
                        }
                    break
                    default:
                        layer.fill(...game.tilecolor[0])
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
                    case 6: case 45:
                        gradient=[new p5.LinearGradient(90,this.height)]
                        gradient[0].colors(
                            0.0,color(30+((this.position.y-this.height/2)/game.edge[1])*30,60-((this.position.y-this.height/2)/game.edge[1])*15,30),
                            1.0,color(30+((this.position.y+this.height/2)/game.edge[1])*30,60-((this.position.y+this.height/2)/game.edge[1])*15,30)
                        )
                        layer.translate(-this.width/2,-this.height/2)
                        layer.fillGradient(gradient[0])
                        layer.triangle(
                            this.width+0.5,-0.5,
                            -0.5,this.height+0.5,
                            this.width+0.5,this.height+0.5
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
                                this.width/2+0.5,game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.225,
                                this.width/2+0.5,game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.225,
                                map(game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.225,-this.height/2-0.5,this.height/2+0.5,this.width/2+0.5,-this.width/2-0.5),game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.225,
                                map(game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.225,-this.height/2-0.5,this.height/2+0.5,this.width/2+0.5,-this.width/2-0.5),game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.225
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
                    case 34: case 50:
                        layer.translate(-this.position.x,-this.position.y)
                        layer.fillGradient(graphics.gradient[0])
                        layer.triangle(
                            this.width/2+0.5+this.position.x,-this.height/2-0.5+this.position.y,
                            -this.width/2-0.5+this.position.x,this.height/2+0.5+this.position.y,
                            this.width/2+0.5+this.position.x,this.height/2+0.5+this.position.y
                        )
                    break
                    case 38:
                        for(let a=0,la=this.balls[1].length;a<la;a++){
                            layer.fill(
                                185+this.balls[1][a][3]*20,
                                210+this.balls[1][a][3]*20,
                                220+this.balls[1][a][3]*20
                            )
                            regPoly(layer,this.balls[1][a][0],this.balls[1][a][1],this.balls[1][a][5],this.balls[1][a][2]*0.5,this.balls[1][a][2]*0.5,this.balls[1][a][4])
                            layer.fill(
                                155+this.balls[1][a][3]*20,
                                180+this.balls[1][a][3]*20,
                                190+this.balls[1][a][3]*20
                            )
                            regGem(layer,this.balls[1][a][0],this.balls[1][a][1],this.balls[1][a][5],this.balls[1][a][2]*0.5,this.balls[1][a][2]*0.5,this.balls[1][a][4])
                        }
                        layer.fill(75,55,50)
                        layer.triangle(
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 39:
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                72+this.balls[a][3]*30,
                                79+this.balls[a][3]*30,
                                89+this.balls[a][3]*30
                            )
                            regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]*0.5,this.balls[a][2]*0.5,this.balls[a][4])
                        }
                        layer.fill(56,55,50)
                        layer.triangle(
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 46:
                        layer.fill(100)
                        layer.triangle(
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5,
                            -this.width/2-0.5,this.height/2+0.5
                        )
                        layer.fill(75)
                        layer.quad(
                            this.width*0.3,-this.height*0.3-0.5,
                            this.width*0.3,this.height*0.5+0.5,
                            -this.width*0.3,this.height*0.5+0.5,
                            -this.width*0.3,this.height*0.3-0.5
                        )
                        layer.quad(
                            this.width*0.5+0.5,-this.height*0.3,
                            this.width*0.5+0.5,this.height*0.3,
                            -this.width*0.3-0.5,this.height*0.3,
                            this.width*0.3-0.5,-this.height*0.3
                        )
                    break
                    case 54:
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                255-this.balls[a][3]*30,
                                226-this.balls[a][3]*30,
                                254-this.balls[a][3]*30
                            )
                            regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]*0.5,this.balls[a][2]*0.5,this.balls[a][4])
                        }
                    break
                    case 58: case 63: case 66:
                        for(let a=0,la=this.balls[2].length;a<la;a++){
                            layer.fill(
                                82+this.balls[2][a][3]*30,
                                97+this.balls[2][a][3]*30,
                                42+this.balls[2][a][3]*30
                            )
                            layer.triangle(
                                this.balls[2][a][0]+this.balls[2][a][2]*this.balls[2][a][4]*0.125,this.balls[2][a][1]-this.balls[2][a][2],
                                this.balls[2][a][0]-this.balls[2][a][2]*0.1,this.balls[2][a][1],
                                this.balls[2][a][0]+this.balls[2][a][2]*0.1,this.balls[2][a][1]
                            )
                        }
                        for(let a=0,la=this.balls[0].length;a<la;a++){
                            layer.fill(
                                67+this.balls[0][a][3]*30,
                                76+this.balls[0][a][3]*30,
                                29+this.balls[0][a][3]*30
                            )
                            regPoly(layer,this.balls[0][a][0],this.balls[0][a][1],this.balls[0][a][5],this.balls[0][a][2]*0.5,this.balls[0][a][2]*0.5,this.balls[0][a][4])
                        }
                    break
                    case 62:
                        layer.pattern(graphics.pattern[round((this.position.y-this.height/2)/game.tileset[1])%2])
                        layer.trianglePattern(
                            this.width/2,-this.height/2-0.5,
                            -this.width/2,this.height/2+0.5,
                            this.width/2,this.height/2+0.5
                        )
                    break
                    case 64: case 70:
                        for(let a=0,la=this.balls[0].length;a<la;a++){
                            layer.fill(
                                162+this.balls[0][a][3]*30,
                                125+this.balls[0][a][3]*30,
                                107+this.balls[0][a][3]*30
                            )
                            regPoly(layer,this.balls[0][a][0],this.balls[0][a][1],this.balls[0][a][5],this.balls[0][a][2]*0.5,this.balls[0][a][2]*0.5,this.balls[0][a][4])
                        }
                    break
                    default:
                        layer.fill(...game.tilecolor[0])
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
                    case 6: case 45:
                        gradient=[new p5.LinearGradient(90,this.height)]
                        gradient[0].colors(
                            0.0,color(30+((this.position.y-this.height/2)/game.edge[1])*30,60-((this.position.y-this.height/2)/game.edge[1])*15,30),
                            1.0,color(30+((this.position.y+this.height/2)/game.edge[1])*30,60-((this.position.y+this.height/2)/game.edge[1])*15,30)
                        )
                        layer.translate(-this.width/2,-this.height/2)
                        layer.fillGradient(gradient[0])
                        layer.triangle(
                            -0.5,-0.5,
                            -0.5,this.height+0.5,
                            this.width+0.5,-0.5
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
                                -this.width/2-0.5,game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.225,
                                -this.width/2-0.5,game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.225,
                                map(game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.225,this.height/2+0.5,-this.height/2-0.5,-this.width/2-0.5,this.width/2+0.5),game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.225,
                                map(game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.225,this.height/2+0.5,-this.height/2-0.5,-this.width/2-0.5,this.width/2+0.5),game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.225
                            )
                        }
                    break
                    case 28:
                        layer.fill(0,32,130)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,-this.height/2-0.5
                        )
                    break
                    case 34: case 50: case 54:
                        layer.translate(-this.position.x,-this.position.y)
                        layer.fillGradient(graphics.gradient[0])
                        layer.triangle(
                            -this.width/2-0.5+this.position.x,-this.height/2-0.5+this.position.y,
                            -this.width/2-0.5+this.position.x,this.height/2+0.5+this.position.y,
                            this.width/2+0.5+this.position.x,-this.height/2-0.5+this.position.y
                        )
                    break
                    case 38:
                        for(let a=0,la=this.balls[1].length;a<la;a++){
                            layer.fill(
                                185+this.balls[1][a][3]*20,
                                210+this.balls[1][a][3]*20,
                                220+this.balls[1][a][3]*20
                            )
                            regPoly(layer,this.balls[1][a][0],this.balls[1][a][1],this.balls[1][a][5],this.balls[1][a][2]*0.5,this.balls[1][a][2]*0.5,this.balls[1][a][4])
                            layer.fill(
                                155+this.balls[1][a][3]*20,
                                180+this.balls[1][a][3]*20,
                                190+this.balls[1][a][3]*20
                            )
                            regGem(layer,this.balls[1][a][0],this.balls[1][a][1],this.balls[1][a][5],this.balls[1][a][2]*0.5,this.balls[1][a][2]*0.5,this.balls[1][a][4])
                        }
                        layer.fill(75,55,50)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,-this.height/2-0.5
                        )
                    break
                    case 39:
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                72+this.balls[a][3]*30,
                                79+this.balls[a][3]*30,
                                89+this.balls[a][3]*30
                            )
                            regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]*0.5,this.balls[a][2]*0.5,this.balls[a][4])
                        }
                        layer.fill(56,55,50)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,-this.height/2-0.5
                        )
                    break
                    case 58: case 63: case 66:
                        for(let a=0,la=this.balls[2].length;a<la;a++){
                            layer.fill(
                                82+this.balls[2][a][3]*30,
                                97+this.balls[2][a][3]*30,
                                42+this.balls[2][a][3]*30
                            )
                            layer.triangle(
                                this.balls[2][a][0]+this.balls[2][a][2]*this.balls[2][a][4]*0.125,this.balls[2][a][1]-this.balls[2][a][2],
                                this.balls[2][a][0]-this.balls[2][a][2]*0.1,this.balls[2][a][1],
                                this.balls[2][a][0]+this.balls[2][a][2]*0.1,this.balls[2][a][1]
                            )
                        }
                        for(let a=0,la=this.balls[0].length;a<la;a++){
                            layer.fill(
                                67+this.balls[0][a][3]*30,
                                76+this.balls[0][a][3]*30,
                                29+this.balls[0][a][3]*30
                            )
                            regPoly(layer,this.balls[0][a][0],this.balls[0][a][1],this.balls[0][a][5],this.balls[0][a][2]*0.5,this.balls[0][a][2]*0.5,this.balls[0][a][4])
                        }
                    break
                    case 62:
                        layer.pattern(graphics.pattern[round((this.position.y-this.height/2)/game.tileset[1])%2])
                        layer.trianglePattern(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5
                        )
                    break
                    case 64: case 70:
                        for(let a=0,la=this.balls[0].length;a<la;a++){
                            layer.fill(
                                162+this.balls[0][a][3]*30,
                                125+this.balls[0][a][3]*30,
                                107+this.balls[0][a][3]*30
                            )
                            regPoly(layer,this.balls[0][a][0],this.balls[0][a][1],this.balls[0][a][5],this.balls[0][a][2]*0.5,this.balls[0][a][2]*0.5,this.balls[0][a][4])
                        }
                    break
                    default:
                        layer.fill(...game.tilecolor[0])
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5
                        )
                    break
                }
            break
            case 21:
                switch(game.level){
                    case 6: case 45:
                        gradient=[new p5.LinearGradient(90,this.height)]
                        gradient[0].colors(
                            0.0,color(30+((this.position.y-this.height/2)/game.edge[1])*30,60-((this.position.y-this.height/2)/game.edge[1])*15,30),
                            1.0,color(30+((this.position.y+this.height/2)/game.edge[1])*30,60-((this.position.y+this.height/2)/game.edge[1])*15,30)
                        )
                        layer.translate(-this.width/2,-this.height/2)
                        layer.fillGradient(gradient[0])
                        layer.triangle(
                            -0.5,-0.5,
                            this.width+0.5,-0.5,
                            this.width+0.5,this.height+0.5
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
                                this.width/2+0.5,game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.225,
                                this.width/2+0.5,game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.225,
                                map(game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.225,this.height/2+0.5,-this.height/2-0.5,this.width/2+0.5,-this.width/2-0.5),game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.225,
                                map(game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.225,this.height/2+0.5,-this.height/2-0.5,this.width/2+0.5,-this.width/2-0.5),game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.225
                            )
                        }
                    break
                    case 28:
                        layer.fill(0,32,130)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 34: case 50: case 54:
                        layer.translate(-this.position.x,-this.position.y)
                        layer.fillGradient(graphics.gradient[0])
                        layer.triangle(
                            -this.width/2-0.5+this.position.x,-this.height/2-0.5+this.position.y,
                            this.width/2+0.5+this.position.x,-this.height/2-0.5+this.position.y,
                            this.width/2+0.5+this.position.x,this.height/2+0.5+this.position.y
                        )
                    break
                    case 38:
                        for(let a=0,la=this.balls[1].length;a<la;a++){
                            layer.fill(
                                185+this.balls[1][a][3]*20,
                                210+this.balls[1][a][3]*20,
                                220+this.balls[1][a][3]*20
                            )
                            regPoly(layer,this.balls[1][a][0],this.balls[1][a][1],this.balls[1][a][5],this.balls[1][a][2]*0.5,this.balls[1][a][2]*0.5,this.balls[1][a][4])
                            layer.fill(
                                155+this.balls[1][a][3]*20,
                                180+this.balls[1][a][3]*20,
                                190+this.balls[1][a][3]*20
                            )
                            regGem(layer,this.balls[1][a][0],this.balls[1][a][1],this.balls[1][a][5],this.balls[1][a][2]*0.5,this.balls[1][a][2]*0.5,this.balls[1][a][4])
                        }
                        layer.fill(75,55,50)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 39:
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                72+this.balls[a][3]*30,
                                79+this.balls[a][3]*30,
                                89+this.balls[a][3]*30
                            )
                            regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]*0.5,this.balls[a][2]*0.5,this.balls[a][4])
                        }
                        layer.fill(56,55,50)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 58: case 63: case 66:
                        for(let a=0,la=this.balls[2].length;a<la;a++){
                            layer.fill(
                                82+this.balls[2][a][3]*30,
                                97+this.balls[2][a][3]*30,
                                42+this.balls[2][a][3]*30
                            )
                            layer.triangle(
                                this.balls[2][a][0]+this.balls[2][a][2]*this.balls[2][a][4]*0.125,this.balls[2][a][1]-this.balls[2][a][2],
                                this.balls[2][a][0]-this.balls[2][a][2]*0.1,this.balls[2][a][1],
                                this.balls[2][a][0]+this.balls[2][a][2]*0.1,this.balls[2][a][1]
                            )
                        }
                        for(let a=0,la=this.balls[0].length;a<la;a++){
                            layer.fill(
                                67+this.balls[0][a][3]*30,
                                76+this.balls[0][a][3]*30,
                                29+this.balls[0][a][3]*30
                            )
                            regPoly(layer,this.balls[0][a][0],this.balls[0][a][1],this.balls[0][a][5],this.balls[0][a][2]*0.5,this.balls[0][a][2]*0.5,this.balls[0][a][4])
                        }
                    break
                    case 62:
                        layer.pattern(graphics.pattern[round((this.position.y-this.height/2)/game.tileset[1])%2])
                        layer.trianglePattern(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 64: case 70:
                        for(let a=0,la=this.balls[0].length;a<la;a++){
                            layer.fill(
                                162+this.balls[0][a][3]*30,
                                125+this.balls[0][a][3]*30,
                                107+this.balls[0][a][3]*30
                            )
                            regPoly(layer,this.balls[0][a][0],this.balls[0][a][1],this.balls[0][a][5],this.balls[0][a][2]*0.5,this.balls[0][a][2]*0.5,this.balls[0][a][4])
                        }
                    break
                    default:
                        layer.fill(...game.tilecolor[0])
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
                    case 19: case 31:
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
                    case 22: case 23: case 35:
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
                    case 27:
                        layer.fill(180)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,120,220-min(480,this.reload)/5)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+15,-this.height/2+12,
                            this.width/2-15,-this.height/2+12,
                            this.width/2,-this.height/2-0.5
                        )
                        if(this.position.y-this.height/2<game.tileset[1]*52.5&&this.position.y+this.height/2>game.tileset[1]*52.5){
                            layer.fill(40,120,160)
                            layer.quad(
                                this.width/2+0.5,game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.225,
                                this.width/2+0.5,game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.225,
                                map(game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.225,this.height/2+0.5,-this.height/2-0.5,this.width/2+0.5,-this.width/2-0.5),game.tileset[1]*52.5-this.position.y+game.tileset[1]*0.225,
                                map(game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.225,this.height/2+0.5,-this.height/2-0.5,this.width/2+0.5,-this.width/2-0.5),game.tileset[1]*52.5-this.position.y-game.tileset[1]*0.225
                            )
                        }
                    break
                    case 32: case 33:
                        layer.fill(152,134,112)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 55: case 65:
                        layer.fill(...game.tilecolor[1])
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-min(480,this.reload)/5,120,220-min(480,this.reload)/5)
                        layer.quad(
                            -this.width/2+5,-this.height/2-0.5,
                            -this.width/2+20,-this.height/2+15,
                            this.width/2-20,-this.height/2+15,
                            this.width/2-5,-this.height/2-0.5
                        )
                    break
                    default:
                        layer.fill(220-min(480,this.reload)/5,120,220-min(480,this.reload)/5)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                }
            break
            case 24:
                //mark 24
                switch(game.level){
                    case 15: case 18: case 19: case 31: case 42:
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
                    case 22:
                        layer.fill(60,55,60)
                        layer.rect(0,-this.height*0.225,this.width,this.height*0.5+1)
                        layer.quad(-this.width*0.5,0,this.width*0.5,0,this.width*0.225,this.height*0.5,-this.width*0.225,this.height*0.5)
                    break
                    case 23: case 35:
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
                    case 29: case 53:
                        layer.fill(125,130,125)
                        layer.rect(0,-this.height*0.3,this.width,this.height*0.4)
                        layer.rect(0,this.height*0.3,this.width,this.height*0.4)
                        for(let a=0,la=this.width/game.tileset[0];a<la;a++){
                            layer.rect((a-la*0.5+0.5)*game.tileset[0],0,game.tileset[0]/2,this.height)
                        }
                    break
                    case 30: case 56:
                        layer.fill(155,95,80)
                        if(this.corner[0]&&this.corner[1]){
                            layer.quad(
                                -this.width/2,-this.height/2,
                                -this.width/2+game.tileset[0],this.height/2,
                                this.width/2-game.tileset[0],this.height/2,
                                this.width/2,-this.height/2
                            )
                        }else if(this.corner[0]){
                            layer.quad(
                                -this.width/2,-this.height/2,
                                -this.width/2+game.tileset[0],this.height/2,
                                this.width/2,this.height/2,
                                this.width/2,-this.height/2
                            )
                        }else if(this.corner[1]){
                            layer.quad(
                                -this.width/2,-this.height/2,
                                -this.width/2,this.height/2,
                                this.width/2-game.tileset[0],this.height/2,
                                this.width/2,-this.height/2
                            )
                        }else{
                            layer.rect(0,0,this.width,this.height)
                        }
                        layer.fill(130,55,50)
                        for(let a=0,la=floor(this.width/game.tileset[0]*2.5);a<la;a++){
                            if((a-la*0.5+0.5)*0.4*game.tileset[0]<-this.width*0.5+game.tileset[0]&&this.corner[0]){
                                let diff=(a-la*0.5+0.5)*0.4+this.width*0.5/game.tileset[0]
                                layer.rect((a-la*0.5+0.5)*0.4*game.tileset[0],-this.height*0.5+this.height*diff*0.5,game.tileset[1]/15,this.height*diff)
                            }else if((a-la*0.5+0.5)*0.4*game.tileset[0]>this.width*0.5-game.tileset[0]&&this.corner[1]){
                                let diff=this.width*0.5/game.tileset[0]-(a-la*0.5+0.5)*0.4
                                layer.rect((a-la*0.5+0.5)*0.4*game.tileset[0],-this.height*0.5+this.height*diff*0.5,game.tileset[1]/15,this.height*diff)
                            }else{
                                layer.rect((a-la*0.5+0.5)*0.4*game.tileset[0],0,game.tileset[1]/15,this.height)
                            }
                        }
                    break
                    case 32: case 33:
                        layer.fill(75,60,55)
                        layer.rect(0,0,this.width,this.height)
                        layer.fill(108,81,70)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.rect((a-la*0.5+0.225)*game.tileset[0]*0.5,0,2,this.height)
                            layer.rect((a-la*0.5+0.75)*game.tileset[0]*0.5,0,2,this.height)
                            layer.rect((a-la*0.5+0.5)*game.tileset[0]*0.5,this.height*0.3,game.tileset[0]*0.225,2)
                            layer.rect((a-la*0.5+0.125)*game.tileset[0]*0.5,-this.height*0.3,game.tileset[0]*0.125,2)
                            layer.rect((a-la*0.5+0.875)*game.tileset[0]*0.5,-this.height*0.3,game.tileset[0]*0.125,2)
                        }
                    break
                    case 34: case 50:
                        layer.fill(138,113,91)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(77,59,55)
                        for(let a=0,la=floor(this.width/game.tileset[0]*5);a<la;a++){
                            layer.rect((a-la*0.5+0.5)*0.2*game.tileset[0],0,1,this.height)
                        }
                    break
                    case 36:
                        layer.fill(155,115,80)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(130,85,50)
                        for(let a=0,la=floor(this.width/game.tileset[0]*2);a<la;a++){
                            layer.rect((a-la*0.5+0.5)*0.5*game.tileset[0],0,game.tileset[1]/15,this.height)
                        }
                    break
                    case 37:
                        layer.fill(76,68,79)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(40,39,53)
                        for(let a=0,la=floor(this.width/game.tileset[0]*3);a<la;a++){
                            layer.rect((a-la*0.5+0.5)/3*game.tileset[0],-this.height*0.1*(a%2*2-1),game.tileset[1]/20,this.height*0.8)
                        }
                    break
                    case 38:
                        layer.fill(114,105,68)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(102,85,53)
                        for(let a=0,la=floor(this.width/game.tileset[0]*4);a<la;a++){
                            layer.rect((a-la*0.5+0.5)/4*game.tileset[0],-this.height*0.1*(a%2*2-1),game.tileset[1]/20,this.height*0.6)
                        }
                    break
                    case 39:
                        layer.fill(48,48,50)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(40,38,39)
                        layer.rect(0,this.height*0.05,this.width+1,this.height*0.15)
                        layer.rect(0,this.height*0.35,this.width+1,this.height*0.15)
                    break
                    case 40: case 52:
                        if(this.position.y>game.edge[1]-game.tileset[1]*15){
                            layer.fill(106,98,79)
                            layer.rect(0,0,this.width+1,this.height)
                            layer.fill(70,69,53)
                            for(let a=0,la=floor(this.width/game.tileset[0]*3);a<la;a++){
                                layer.rect((a-la*0.5+0.5)/3*game.tileset[0],-this.height*0.1*(a%2*2-1),game.tileset[1]/20,this.height*0.8)
                            }
                        }else{
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
                        }
                    break
                    case 43:
                        layer.fill(112,95,88)
                        layer.rect(0,0,this.width,this.height)
                        layer.rect(-this.width*0.5+6,0,12,this.height*1.2)
                        layer.rect(this.width*0.5-6,0,12,this.height*1.2)
                    break
                    case 49:
                        layer.fill(38,39,43)
                        layer.rect(0,-this.height*0.15,this.width,this.height*0.7+1)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.quad(
                                -this.width*0.5+(a+0.5)/la*this.width-game.tileset[0]*0.2,this.height*0.2,
                                -this.width*0.5+(a+0.5)/la*this.width+game.tileset[0]*0.2,this.height*0.2,
                                -this.width*0.5+(a+0.5)/la*this.width+game.tileset[0]*0.12,this.height*0.4,
                                -this.width*0.5+(a+0.5)/la*this.width-game.tileset[0]*0.12,this.height*0.4
                            )
                        }
                    break
                    case 51:
                        layer.fill(61,56,53)
                        layer.rect(0,0,this.width,this.height*0.6,3)
                        layer.rect(0,0,this.width-10,this.height,3)
                        for(let a=0,la=this.width/game.tileset[0];a<la-1;a++){
                            layer.rect(this.width*(-0.5+(a+1)/la),this.height*0.05,game.tileset[0]*0.5,this.height*1.1,3)
                        }
                    break
                    case 54:
                        layer.fill(63,43,71)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(45,26,45)
                        for(let a=0,la=round(this.width/game.tileset[0]*2);a<la;a++){
                            layer.rect(-this.width/2+(a+0.5)/2*game.tileset[0],0,game.tileset[1]/10,this.height-4)
                        }
                    break
                    case 55: case 65:
                        layer.fill(97,91,105)
                        layer.rect(0,-this.height*0.3,this.width,this.height*0.4)
                        layer.rect(0,this.height*0.3,this.width,this.height*0.4)
                        layer.rect(-this.width*0.45,0,this.width*0.1,this.height*0.2)
                        layer.rect(this.width*0.45,0,this.width*0.1,this.height*0.2)
                    break
                    case 58: case 63: case 66:
                        layer.fill(154,146,109)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(125,119,83)
                        for(let a=0,la=round(this.width/game.tileset[0]*3);a<la;a++){
                            layer.rect(this.width*(-0.5+(a+this.pos[a][2])/la),this.pos[a][0],this.pos[a][3],this.pos[a][1])
                        }
                    break
                    case 59: case 60:
                        layer.fill(61,67,65)
                        layer.rect(0,0,this.width,this.height)
                        layer.fill(56,62,60)
                        layer.rect(0,0,this.width,this.height*0.5)
                    break
                    case 61:
                        layer.fill(127,96,70)
                        layer.rect(0,0,this.width,this.height)
                        layer.fill(102,76,52)
                        for(let a=0,la=this.width/game.tileset[0]*3;a<la;a++){
                            layer.quad(
                                this.width*(-0.5+(a+0.1)/la),-this.height*0.5,
                                this.width*(-0.5+(a+0.3)/la),-this.height*0.5,
                                this.width*(-0.5+(a+0.9)/la),this.height*0.5,
                                this.width*(-0.5+(a+0.7)/la),this.height*0.5
                            )
                        }
                    break
                    case 62:
                        layer.fill(64,65,67)
                        layer.beginShape()
                        layer.vertex(-this.width*0.5,this.height)
                        layer.vertex(-this.width*0.5,-this.height*0.5)
                        layer.vertex(this.width*0.5,-this.height*0.5)
                        layer.vertex(this.width*0.5,this.height)
                        layer.vertex(0,this.height*0.5)
                        layer.endShape()
                    break
                    case 64: case 70:
                        for(let a=0,la=this.balls[0].length;a<la;a++){
                            layer.fill(
                                162+this.balls[0][a][3]*30,
                                125+this.balls[0][a][3]*30,
                                107+this.balls[0][a][3]*30
                            )
                            regPoly(layer,this.balls[0][a][0],this.balls[0][a][1],this.balls[0][a][5],this.balls[0][a][2]*0.5,this.balls[0][a][2]*0.5,this.balls[0][a][4])
                        }
                        layer.fill(115,82,63)
                        layer.rect(0,0,this.width,this.height)
                    break
                    case 69:
                        layer.fill(...game.tilecolor[1])
                        layer.triangle(-this.width*0.5,-this.height*0.5,this.width*0.5,-this.height*0.5,-this.width*0.5,this.height)
                        layer.triangle(-this.width*0.5,-this.height*0.5,this.width*0.5,-this.height*0.5,this.width*0.5,this.height)
                        layer.triangle(-this.width*0.5,-this.height*0.5,this.width*0.5,-this.height*0.5,0,this.height*0.75)
                    break
                    default:
                        layer.fill(60,55,60)
                        layer.rect(0,0,this.width,this.height)
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
                        layer.fill(200+lcos(a*90+this.time)*40,200+lcos(a*90+this.time)*40,80+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                        layer.fill(160+lcos(a*90+this.time)*40,160+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                        layer.fill(40+lcos(a*90+this.time)*40,1-this.recharge/60)
                        regTriangle(layer,this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.15,this.height*0.15,-30)
                    }
                }
            break
            case 28:
                //mark 28
                switch(game.level){
                    case 21:
                        layer.fill(100,90,80)
                        layer.rect(0,0,this.width+1,this.height+1,2)
                    break
                    case 22: case 23: case 29: case 30: case 32: case 33: case 34: case 35: case 39: case 40:
                    case 41: case 43: case 44: case 49: case 50: case 52: case 53: case 56: case 61:
                        switch(game.level){
                            case 34: case 50:
                                layer.fill(171,137,102)
                                layer.rect(0,0,this.width+game.tileset[0]*0.12,this.height)
                                layer.fill(141,116,86)
                            break
                            case 39:
                                layer.fill(87,73,60)
                                layer.rect(0,0,this.width+game.tileset[0]*0.12,this.height)
                                layer.fill(67,57,47)
                            break
                            case 41:
                                layer.fill(131,164,218)
                                layer.rect(0,0,this.width+game.tileset[0]*0.12,this.height)
                                layer.fill(90,109,168)
                            break
                            case 43:
                                layer.fill(58,53,60)
                                layer.rect(0,0,this.width+game.tileset[0]*0.12,this.height)
                                layer.fill(44,41,48)
                            break
                            case 44:
                                layer.fill(70,65,59)
                                layer.rect(0,0,this.width+game.tileset[0]*0.12,this.height)
                                layer.fill(59,55,52)
                            break
                            case 49:
                                layer.fill(58,44,33)
                                layer.rect(0,0,this.width+game.tileset[0]*0.12,this.height)
                                layer.fill(48,37,31)
                            break
                            case 61:
                                layer.fill(153,104,74)
                                layer.rect(0,0,this.width+game.tileset[0]*0.12,this.height)
                                layer.fill(130,82,68)
                            break
                            default:
                                layer.fill(140,100,80)
                                layer.rect(0,0,this.width+game.tileset[0]*0.12,this.height)
                                layer.fill(120,80,60)
                            break
                        }
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
                    case 47:
                        layer.fill(120,80,60)
                        layer.rect(0,0,this.width,this.height)
                        layer.stroke(140,100,80)
                        layer.strokeWeight(4)
                        for(let a=0,la=round(this.width/game.tileset[0]);a<la;a++){
                            layer.rect(this.width*(-0.5+(a+0.5)/la),0,game.tileset[0],this.height)
                            layer.line(this.width*(-0.5+(a)/la),-this.height*0.5,this.width*(-0.5+(a+1)/la),this.height*0.5)
                            layer.line(this.width*(-0.5+(a)/la),this.height*0.5,this.width*(-0.5+(a+1)/la),-this.height*0.5)
                        }
                    break
                    case 51:
                        layer.fill(226,180,147)
                        layer.rect(0,0,this.width+game.tileset[0]*0.1,this.height)
                        layer.fill(178,144,109)
                        for(let a=0,la=round(this.width/game.tileset[0]);a<la;a++){
                            layer.quad(
                                -this.width/2+(a+0.5)/la*this.width-game.tileset[0]*0.45,
                                -this.height*0.41,
                                -this.width/2+(a+0.5)/la*this.width+game.tileset[0]*0.45,
                                -this.height*0.41,
                                -this.width/2+(a+0.5)/la*this.width+game.tileset[0]*0.45,
                                -this.height*0.3,
                                -this.width/2+(a+0.5)/la*this.width-game.tileset[0]*0.45,
                                this.height*0.18
                            )
                            layer.quad(
                                -this.width/2+(a+0.5)/la*this.width+game.tileset[0]*0.45,
                                this.height*0.41,
                                -this.width/2+(a+0.5)/la*this.width-game.tileset[0]*0.45,
                                this.height*0.41,
                                -this.width/2+(a+0.5)/la*this.width-game.tileset[0]*0.45,
                                this.height*0.3,
                                -this.width/2+(a+0.5)/la*this.width+game.tileset[0]*0.45,
                                -this.height*0.18
                            )
                        }
                        layer.fill(147,123,91)
                        for(let a=0,la=round(this.width/game.tileset[0]);a<la;a++){
                            layer.rect(-this.width/2+(a+0.5)/la*this.width,0,game.tileset[0]*0.9,game.tileset[0]*0.1)
                        }
                    break
                    case 54:
                        layer.fill(41,39,40)
                        layer.rect(0,0,this.width+game.tileset[0]*0.12,this.height)
                        layer.fill(20,16,15)
                        for(let a=0,la=round(this.width/game.tileset[0]);a<la;a++){
                            layer.rect(-this.width/2+(a+0.5)/la*this.width,-this.height*0.36,game.tileset[0]*0.88,this.height*0.08)
                            layer.rect(-this.width/2+(a+0.5)/la*this.width,this.height*0.36,game.tileset[0]*0.88,this.height*0.08)
                            layer.rect(-this.width/2+(a+0.5)/la*this.width,-this.height*0.18,game.tileset[0]*0.88,this.height*0.08)
                            layer.rect(-this.width/2+(a+0.5)/la*this.width,this.height*0.18,game.tileset[0]*0.88,this.height*0.08)
                            layer.rect(-this.width/2+(a+0.5)/la*this.width,0,game.tileset[0]*0.88,this.height*0.08)
                        }
                    break
                    case 55: case 65:
                        layer.fill(185,129,104)
                        layer.rect(0,0,this.width+game.tileset[0]*0.12,this.height)
                        layer.fill(144,101,94)
                        for(let a=0,la=round(this.width/game.tileset[0]);a<la;a++){
                            layer.rect(-this.width/2+(a+0.5)/la*this.width,-this.height*0.225,game.tileset[0]*0.88,this.height*0.3)
                            layer.rect(-this.width/2+(a+0.5)/la*this.width,this.height*0.225,game.tileset[0]*0.88,this.height*0.3)
                            layer.rect(-this.width/2+(a+0.5)/la*this.width-game.tileset[0]*0.225,-this.height*0.05,game.tileset[0]*0.38,this.height*0.1)
                            layer.rect(-this.width/2+(a+0.5)/la*this.width+game.tileset[0]*0.225,this.height*0.05,game.tileset[0]*0.38,this.height*0.1)
                        }
                    break
                    case 59: case 60:
                        layer.fill(62,72,82)
                        layer.rect(0,0,this.width+game.tileset[0]*0.12,this.height)
                        layer.fill(50,57,65)
                        for(let a=0,la=round(this.width/game.tileset[0]);a<la;a++){
                            layer.rect(-this.width/2+(a+0.5)/la*this.width,-this.height*0.275,game.tileset[0]*0.88,this.height*0.225)
                            layer.rect(-this.width/2+(a+0.5)/la*this.width,this.height*0.275,game.tileset[0]*0.88,this.height*0.225)
                            layer.rect(-this.width/2+(a+0.5)/la*this.width-game.tileset[0]*0.275,-this.height*0.1,game.tileset[0]*0.33,this.height*0.1+1)
                            layer.rect(-this.width/2+(a+0.5)/la*this.width+game.tileset[0]*0.275,this.height*0.1,game.tileset[0]*0.33,this.height*0.1+1)
                        }
                    break
                    case 62:
                        layer.fill(62,72,82)
                        layer.rect(0,0,this.width+game.tileset[0]*0.12,this.height)
                        layer.fill(50,57,65)
                        for(let a=0,la=round(this.width/game.tileset[0]);a<la;a++){
                            layer.rect(-this.width/2+(a+0.5)/la*this.width,-this.height*0.2625,game.tileset[0]*0.88,this.height*0.275)
                            layer.rect(-this.width/2+(a+0.5)/la*this.width,this.height*0.2625,game.tileset[0]*0.88,this.height*0.275)
                            layer.rect(-this.width/2+(a+0.5)/la*this.width-game.tileset[0]*0.2625,-this.height*0.1,game.tileset[0]*0.355,this.height*0.1+1)
                            layer.rect(-this.width/2+(a+0.5)/la*this.width+game.tileset[0]*0.2625,this.height*0.1,game.tileset[0]*0.355,this.height*0.1+1)
                        }
                    break
                    case 64: case 70:
                        layer.fill(139,105,93)
                        for(let a=0,la=round(this.height/game.tileset[1]);a<la;a++){
                            for(let b=0,lb=round(this.width/game.tileset[0]);b<lb;b++){
                                layer.beginShape()
                                layer.vertex(this.width*(-0.5+b/lb)-0.5,this.height*(-0.5+a/la)+5)
                                layer.vertex(this.width*(-0.5+b/lb)+5,this.height*(-0.5+a/la)-0.5)
                                layer.vertex(this.width*(-0.5+(b+1)/lb)-5,this.height*(-0.5+a/la)-0.5)
                                layer.vertex(this.width*(-0.5+(b+1)/lb)+0.5,this.height*(-0.5+a/la)+5)
                                layer.vertex(this.width*(-0.5+(b+1)/lb)+0.5,this.height*(-0.5+(a+1)/la)-5)
                                layer.vertex(this.width*(-0.5+(b+1)/lb)-5,this.height*(-0.5+(a+1)/la)+0.5)
                                layer.vertex(this.width*(-0.5+b/lb)+5,this.height*(-0.5+(a+1)/la)+0.5)
                                layer.vertex(this.width*(-0.5+b/lb)-0.5,this.height*(-0.5+(a+1)/la)-5)
                                layer.endShape()
                            }
                        }
                        layer.fill(116,88,80)
                        for(let a=0,la=round(this.height/game.tileset[1]);a<la;a++){
                            for(let b=0,lb=round(this.width/game.tileset[0]);b<lb;b++){
                                layer.beginShape()
                                layer.vertex(this.width*(-0.5+b/lb)+3.5,this.height*(-0.5+a/la)+7.5)
                                layer.vertex(this.width*(-0.5+b/lb)+7.5,this.height*(-0.5+a/la)+3.5)
                                layer.vertex(this.width*(-0.5+(b+1)/lb)-7.5,this.height*(-0.5+a/la)+3.5)
                                layer.vertex(this.width*(-0.5+(b+1)/lb)-3.5,this.height*(-0.5+a/la)+7.5)
                                layer.vertex(this.width*(-0.5+(b+1)/lb)-3.5,this.height*(-0.5+(a+1)/la)-7.5)
                                layer.vertex(this.width*(-0.5+(b+1)/lb)-7.5,this.height*(-0.5+(a+1)/la)-3.5)
                                layer.vertex(this.width*(-0.5+b/lb)+7.5,this.height*(-0.5+(a+1)/la)-3.5)
                                layer.vertex(this.width*(-0.5+b/lb)+3.5,this.height*(-0.5+(a+1)/la)-7.5)
                                layer.endShape()
                            }
                        }
                        layer.fill(93,72,67)
                        for(let a=0,la=round(this.height/game.tileset[1]);a<la;a++){
                            for(let b=0,lb=round(this.width/game.tileset[0]);b<lb;b++){
                                layer.beginShape()
                                layer.vertex(this.width*(-0.5+b/lb)+8,this.height*(-0.5+a/la)+11)
                                layer.vertex(this.width*(-0.5+b/lb)+11,this.height*(-0.5+a/la)+8)
                                layer.vertex(this.width*(-0.5+(b+1)/lb)-11,this.height*(-0.5+a/la)+8)
                                layer.vertex(this.width*(-0.5+(b+1)/lb)-8,this.height*(-0.5+a/la)+11)
                                layer.vertex(this.width*(-0.5+(b+1)/lb)-8,this.height*(-0.5+(a+1)/la)-11)
                                layer.vertex(this.width*(-0.5+(b+1)/lb)-11,this.height*(-0.5+(a+1)/la)-8)
                                layer.vertex(this.width*(-0.5+b/lb)+11,this.height*(-0.5+(a+1)/la)-8)
                                layer.vertex(this.width*(-0.5+b/lb)+8,this.height*(-0.5+(a+1)/la)-11)
                                layer.endShape()
                            }
                        }
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                181+this.balls[a][3]*40,
                                135+this.balls[a][3]*40,
                                58+this.balls[a][3]*40
                            )
                            regStar(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]/2,this.balls[a][2]/2,this.balls[a][2]*0.1,this.balls[a][2]*0.1,this.balls[a][4])
                        }
                        layer.fill(211,155,78)
                    break
                    case 67: case 68:
                        layer.fill(189,165,141)
                        layer.rect(0,0,this.width+game.tileset[0]*0.12,this.height)
                        layer.fill(187,144,101)
                        for(let a=0,la=round(this.width/game.tileset[0]);a<la;a++){
                            layer.quad(
                                -this.width/2+(a+0.5)/la*this.width-game.tileset[0]*0.44,
                                -this.height*0.4,
                                -this.width/2+(a+0.5)/la*this.width+game.tileset[0]*0.44,
                                -this.height*0.4,
                                -this.width/2+(a+0.5)/la*this.width+game.tileset[0]*0.44,
                                -this.height*0.2,
                                -this.width/2+(a+0.5)/la*this.width-game.tileset[0]*0.44,
                                this.height*0.04
                            )
                            layer.quad(
                                -this.width/2+(a+0.5)/la*this.width+game.tileset[0]*0.44,
                                this.height*0.4,
                                -this.width/2+(a+0.5)/la*this.width-game.tileset[0]*0.44,
                                this.height*0.4,
                                -this.width/2+(a+0.5)/la*this.width-game.tileset[0]*0.44,
                                this.height*0.2,
                                -this.width/2+(a+0.5)/la*this.width+game.tileset[0]*0.44,
                                -this.height*0.04
                            )
                        }
                    break
                    case 69:
                        layer.fill(134,119,122)
                        for(let a=0,la=round(this.width/game.tileset[0]);a<la;a++){
                            layer.rect(this.width*(-0.5+(a+0.1)/la),0,game.tileset[0]*0.2,this.height)
                            layer.rect(this.width*(-0.5+(a+0.9)/la),0,game.tileset[0]*0.2,this.height)
                            layer.rect(this.width*(-0.5+(a+0.5)/la),0,game.tileset[0]*0.6,this.height*0.8)
                        }
                        layer.fill(26,19,13)
                        for(let a=0,la=round(this.width/game.tileset[0]);a<la;a++){
                            layer.rect(this.width*(-0.5+(a+0.3)/la),0,game.tileset[0]*0.2,this.height*0.2)
                            layer.rect(this.width*(-0.5+(a+0.7)/la),0,game.tileset[0]*0.2,this.height*0.2)
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
                            -this.width/2+15,-this.height/2+15,
                            this.width/2-15,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    default:
                        layer.fill(60)
                        layer.rect(0,0,this.width+1,this.height+1,2)
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+15,-this.height/2+15,
                            this.width/2-15,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                }
            break
            case 31: case 33: case 36:
                if(game.level==29){
                    layer.translate(0,30)
                }else if(game.level==38||game.level==59){
                    layer.translate(0,10)
                }
                layer.fill(250)
                layer.textSize(20)
                let texts=''
                if(game.level==19||game.level==24||game.level==27||game.level==34||game.level==38||game.level==39&&!game.pvp||game.level==42){
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
                    texts=game.level==37?'Gate':game.level==39||dm()?'Point':game.level==29?'Target':game.level==28?['Turret','Point ','Turret','Turret','Guster','Guster','Guster','Guster'][this.pos]:this.pos>=3&&(game.level==25||game.level==26)||this.pos>=5?'Node':'Point '+'ABCDE'[game.level==28?0:this.pos]
                }
                layer.text(texts,0,-120)
                if(game.level!=29){
                    layer.fill(...playerColor(this.owner))
                    layer.rect(0,-100,60,6,2)
                }
            break
            case 32:
                //mark 32
                switch(game.level){
                    case 19: case 31:
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
                    case 32: case 33:
                        layer.fill(152,134,112)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 39:
                        layer.fill(56,55,50)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 42:
                        layer.fill(90,85,105)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 49:
                        layer.fill(48,45,40)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(max(120,170-min(480,this.reload)/10-game.pointAnim[0]*50),max(120,220-min(480,this.reload)/5-game.pointAnim[0]*100),120)
                        layer.quad(
                            -this.width/2+5,-this.height/2-0.5,
                            -this.width/2+25,-this.height/2+16,
                            this.width/2-25,-this.height/2+16,
                            this.width/2-5,-this.height/2-0.5
                        )
                    break
                    case 69:
                        layer.fill(...game.tilecolor[1])
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(120,220-min(480,this.reload)/5,170-min(480,this.reload)/10)
                        layer.quad(
                            -this.width/2+5,-this.height/2-0.5,
                            -this.width/2+25,-this.height/2+16,
                            this.width/2-25,-this.height/2+16,
                            this.width/2-5,-this.height/2-0.5
                        )
                    break
                }
            break
            case 35:
                //mark 35
                switch(game.level){
                    case 22: case 35:
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
                    case 29: case 53:
                        layer.fill(60,65,60)
                        layer.rect(0,0,this.width+1,this.height)
                    break
                    case 30: case 61:
                        //intentionally left blank
                    break
                    case 32: case 33:
                        layer.fill(152,134,112)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 40: case 52:
                        layer.fill(110,105,100)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-this.reload/4)
                        layer.quad(
                            -this.width/2+5,-this.height/2-0.5,
                            -this.width/2+25,-this.height/2+16,
                            this.width/2-25,-this.height/2+16,
                            this.width/2-5,-this.height/2-0.5
                        )
                    break
                    case 42:
                        layer.fill(60,60,65)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(220-this.reload/4)
                        layer.quad(
                            -this.width/2+10,-this.height/2-0.5,
                            -this.width/2+25,-this.height/2+15,
                            this.width/2-25,-this.height/2+15,
                            this.width/2-10,-this.height/2-0.5
                        )
                    break
                    case 49:
                        layer.fill(48,45,40)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(max(120,220-game.pointAnim[0]*100-this.reload/4))
                        layer.quad(
                            -this.width/2+5,-this.height/2-0.5,
                            -this.width/2+25,-this.height/2+16,
                            this.width/2-25,-this.height/2+16,
                            this.width/2-5,-this.height/2-0.5
                        )
                    break
                    case 54: case 55: case 65: case 67:
                        layer.fill(...game.tilecolor[1])
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
                //mark 37
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
                                    this.width*0.5-this.width*(a-0.225)/la+4,this.height/2,
                                    this.width*0.5-this.width*(a-0.225)/la-4,this.height/2
                                )
                            }
                        }
                    break
                    case 30: case 56:
                        layer.fill(145,90,75)
                        layer.rect(0,-this.height*0.3,this.width+1,this.height*0.4)
                        layer.rect(0,this.height*0.2,this.width+1,this.height*0.4)
                        layer.fill(120,50,45)
                        for(let a=0,la=floor(this.width/game.tileset[0]*2.5);a<la;a++){
                            layer.rect((a-la*0.5+0.5)*0.4*game.tileset[0],-this.height*0.3,game.tileset[1]/15,this.height*0.4)
                            layer.rect((a-la*0.5+0.5)*0.4*game.tileset[0],this.height*0.2,game.tileset[1]/15,this.height*0.4)
                        }
                    break
                    case 32: case 33:
                        layer.fill(75,60,55)
                        layer.rect(0,-this.height*0.3,this.width,this.height*0.4)
                        layer.rect(0,this.height*0.3,this.width,this.height*0.4)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.rect((a-la*0.5+0.5)*game.tileset[0]*0.5,0,6,this.height)
                        }
                        layer.fill(108,81,70)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.rect((a-la*0.5+0.225)*game.tileset[0]*0.5,-this.height*0.3,2,this.height*0.4)
                            layer.rect((a-la*0.5+0.75)*game.tileset[0]*0.5,-this.height*0.3,2,this.height*0.4)
                            layer.rect((a-la*0.5+0.225)*game.tileset[0]*0.5,this.height*0.3,2,this.height*0.4)
                            layer.rect((a-la*0.5+0.75)*game.tileset[0]*0.5,this.height*0.3,2,this.height*0.4)
                            layer.rect((a-la*0.5+0.5)*game.tileset[0]*0.5,this.height*0.3,game.tileset[0]*0.225,2)
                            layer.rect((a-la*0.5+0.125)*game.tileset[0]*0.5,-this.height*0.3,game.tileset[0]*0.125,2)
                            layer.rect((a-la*0.5+0.875)*game.tileset[0]*0.5,-this.height*0.3,game.tileset[0]*0.125,2)
                        }
                    break
                    case 34: case 50:
                        layer.fill(175,141,116)
                        layer.rect(0,-this.height/4,this.width,this.height/2)
                        for(let a=0,la=this.width/game.tileset[0];a<la;a++){
                            layer.triangle(
                                this.width*0.5-this.width*(a+0.5)/la-5,-this.height/2,
                                this.width*0.5-this.width*(a+0.5)/la+5,-this.height/2,
                                this.width*0.5-this.width*(a+0.5)/la,this.height,
                            )
                        }
                    break
                    case 37:
                        layer.fill(130,120,112)
                        layer.rect(0,-this.height*0.3,this.width,this.height*0.4)
                        layer.rect(0,this.height*0.3,this.width,this.height*0.4)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.quad(
                                this.width*0.5-this.width*(a+0.75)/la-3,-this.height*0.45,
                                this.width*0.5-this.width*(a+0.75)/la+3,-this.height*0.45,
                                this.width*0.5-this.width*(a+0.225)/la+3,this.height*0.45,
                                this.width*0.5-this.width*(a+0.225)/la-3,this.height*0.45
                            )
                        }
                    break
                    case 38:
                        layer.fill(85,89,104)
                        layer.rect(0,-this.height/3,this.width,this.height/3)
                        layer.rect(0,this.height/3,this.width,this.height/3)
                        for(let a=0,la=this.width/game.tileset[0];a<la;a++){
                            layer.quad(
                                this.width*(-0.5+(a+0.5)/la),-this.height/2,
                                this.width*(-0.5+(a+0.5)/la)-this.height/2,0,
                                this.width*(-0.5+(a+0.5)/la),this.height/2,
                                this.width*(-0.5+(a+0.5)/la)+this.height/2,0
                            )
                        }
                    break
                    case 41:
                        layer.stroke(140,100,118)
                        layer.strokeWeight(1.5)
                        for(let a=0,la=this.width/game.tileset[0]*3;a<la;a++){
                            layer.line((this.width-4)*(-0.5+a/la),-this.height/2+2,(this.width-4)*(-0.5+(a+1)/la),this.height/2-2)
                            layer.line((this.width-4)*(-0.5+a/la),this.height/2-2,(this.width-4)*(-0.5+(a+1)/la),-this.height/2+2)
                        }
                        layer.noStroke()
                        layer.fill(247,210,139)
                        layer.rect(0,-this.height*0.4,this.width,this.height*0.2)
                        layer.rect(0,this.height*0.4,this.width,this.height*0.2)
                        if(!this.redundant[2]){
                            layer.rect(this.width/2-this.height*0.1,0,this.height*0.2,this.height)
                        }
                        if(!this.redundant[3]){
                            layer.rect(-this.width/2+this.height*0.1,0,this.height*0.2,this.height)
                        }
                    break
                    case 43:
                        layer.fill(255,0.2)
                        layer.rect(0,0,this.width,this.height-6)
                        layer.fill(122,109,116)
                        layer.rect(0,-this.height*0.5+1.5,this.width,3)
                        layer.rect(0,this.height*0.5-1.5,this.width,3)
                        for(let a=0,la=this.width/game.tileset[0];a<la;a++){
                            layer.rect(this.width*(-0.5+(a+0.5)/la),0,3,this.height-6)
                        }
                    break
                    case 44:
                        layer.fill(38,46,48)
                        layer.rect(0,-this.height/3,this.width,this.height/3)
                        layer.rect(0,this.height/3,this.width,this.height/3)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.quad(
                                this.width*0.5-this.width*(a+1)/la-3,-this.height/3,
                                this.width*0.5-this.width*(a+1)/la+3,-this.height/3,
                                this.width*0.5-this.width*a/la+3,this.height/3,
                                this.width*0.5-this.width*a/la-3,this.height/3
                            )
                            layer.rect(this.width*0.5-this.width*a/la,0,3,this.height)
                        }
                    break
                    case 47:
                        layer.fill(120)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.rect(this.width*(-0.5+(a+0.5)/la),0,game.tileset[0]*0.15+1,this.height)
                        }
                        layer.fill(140)
                        layer.rect(0,-this.height/3,this.width,this.height/3)
                        layer.rect(0,this.height/3,this.width,this.height/3)
                    break
                    case 49:
                        layer.fill(36,37,31)
                        if(this.width<=game.tileset[0]*2){
                            layer.rect(4,-this.height/3,this.width-8,this.height/3)
                            layer.rect(4,this.height/3,this.width-8,this.height/3)
                            layer.quad(
                                -this.width*0.5+8,-this.height/2,
                                -this.width*0.5+8,-this.height/6,
                                -this.width*0.5+3,0,
                                -this.width*0.5-6,0
                            )
                            layer.quad(
                                -this.width*0.5+8,this.height/2,
                                -this.width*0.5+8,this.height/6,
                                -this.width*0.5+3,0,
                                -this.width*0.5-6,0
                            )
                            layer.quad(
                                -game.tileset[0]*0.225-9,-this.height/3,
                                -game.tileset[0]*0.225-2,-this.height/3,
                                game.tileset[0]*0.225-2,this.height/3,
                                game.tileset[0]*0.225-9,this.height/3
                            )
                            layer.quad(
                                -game.tileset[0]*0.225+9,-this.height/3,
                                -game.tileset[0]*0.225+2,-this.height/3,
                                game.tileset[0]*0.225+2,this.height/3,
                                game.tileset[0]*0.225+9,this.height/3
                            )
                        }else{
                            layer.rect(0,-this.height/3,this.width,this.height/3)
                            layer.rect(0,this.height/3,this.width,this.height/3)
                            for(let a=0,la=this.width/game.tileset[0];a<la;a++){
                                layer.quad(
                                    this.width*0.5-this.width*(a+0.75)/la-9,-this.height/3,
                                    this.width*0.5-this.width*(a+0.75)/la-2,-this.height/3,
                                    this.width*0.5-this.width*(a+0.225)/la-2,this.height/3,
                                    this.width*0.5-this.width*(a+0.225)/la-9,this.height/3
                                )
                                layer.quad(
                                    this.width*0.5-this.width*(a+0.75)/la+9,-this.height/3,
                                    this.width*0.5-this.width*(a+0.75)/la+2,-this.height/3,
                                    this.width*0.5-this.width*(a+0.225)/la+2,this.height/3,
                                    this.width*0.5-this.width*(a+0.225)/la+9,this.height/3
                                )
                            }
                        }
                    break
                    case 51:
                        layer.fill(92,78,67)
                        layer.rect(0,-this.height*0.4,this.width,this.height*0.2)
                        layer.rect(0,this.height*0.4,this.width,this.height*0.2)
                        for(let a=0,la=this.width/game.tileset[0]*3;a<la;a++){
                            layer.rect(this.width*0.5-this.width*(a+0.5)/la,0,2.5,this.height)
                            layer.triangle(
                                this.width*0.5-this.width*(a+0.5)/la-1,-2,
                                this.width*0.5-this.width*(a+0.5)/la-1,2,
                                this.width*0.5-this.width*(a+0.5)/la-4,-0
                            )
                            layer.triangle(
                                this.width*0.5-this.width*(a+0.5)/la+1,-2,
                                this.width*0.5-this.width*(a+0.5)/la+1,2,
                                this.width*0.5-this.width*(a+0.5)/la+4,-0
                            )
                        }
                    break
                    case 54:
                        if(this.position.x<game.tileset[0]*150){
                            layer.fill(52,48,47)
                            layer.rect(0,-this.height*0.35,this.width,this.height*0.3)
                            layer.rect(0,this.height*0.35,this.width,this.height*0.3)
                            layer.rect(-this.width*0.5+this.height*0.15,0,this.height*0.3,this.height*0.4)
                            layer.rect(this.width*0.5-this.height*0.15,0,this.height*0.3,this.height*0.4)
                            for(let a=0,la=this.width/game.tileset[0]*5;a<la;a++){
                                layer.rect((this.width-this.height*0.3)*(-0.5+(a+1)/(la+1)),0,this.height*0.1,this.height*0.4)
                            }
                        }else{
                            layer.fill(63,43,71)
                            layer.rect(0,-this.height*0.375,this.width+1,this.height*0.225)
                            layer.rect(0,0,this.width+1,this.height*0.225)
                            layer.rect(0,this.height*0.375,this.width+1,this.height*0.225)
                            layer.fill(45,26,45)
                            for(let a=0,la=round(this.width/game.tileset[0]*2);a<la;a++){
                                layer.rect(-this.width/2+(a+0.5)/2*game.tileset[0],-this.height*0.375,game.tileset[1]/10,this.height*0.225-2)
                                layer.rect(-this.width/2+(a+0.5)/2*game.tileset[0],0,game.tileset[1]/10,this.height*0.225-2)
                                layer.rect(-this.width/2+(a+0.5)/2*game.tileset[0],this.height*0.375,game.tileset[1]/10,this.height*0.225-2)
                            }
                        }
                    break
                    case 55: case 65:
                        let shift=(this.position.x<game.tileset[0]*60&&this.position.x>game.tileset[0]*12&&game.level==55||(this.position.x<game.tileset[0]*66+game.edge[0]*0.5&&this.position.x>game.tileset[0]*12+game.edge[0]*0.5||this.position.x>game.tileset[0]*-66+game.edge[0]*0.5&&this.position.x<game.tileset[0]*-12+game.edge[0]*0.5)&&game.level==65)?60:0
                        layer.fill(66+shift,58+shift,55+shift)
                        layer.rect(0,-this.height*0.4,this.width,this.height*0.2)
                        layer.rect(0,this.height*0.4,this.width,this.height*0.2)
                        layer.stroke(66+shift,58+shift,55+shift)
                        layer.strokeWeight(2)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.line(this.width*(-0.5+(a+0.225)/la)-1.5,-this.height*0.4,this.width*(-0.5+(a+0.225)/la)-1.5,this.height*0.4)
                            layer.line(this.width*(-0.5+(a+0.75)/la)+1.5,-this.height*0.4,this.width*(-0.5+(a+0.75)/la)+1.5,this.height*0.4)
                            layer.line(this.width*(-0.5+(a+0.225)/la)-1.5,-this.height*0.4,this.width*(-0.5+(a+0.75)/la)+1.5,this.height*0.4)
                            layer.line(this.width*(-0.5+(a+0.75)/la)+1.5,-this.height*0.4,this.width*(-0.5+(a+0.225)/la)-1.5,this.height*0.4)
                            if(a<la-1){
                                layer.line(this.width*(-0.5+(a+0.75)/la)+1.5,0,this.width*(-0.5+(a+1.25)/la)-1.5,0)
                            }
                        }
                    break
                    case 58: case 63: case 66:
                        layer.fill(154,146,109)
                        layer.rect(0,-this.height*0.3,this.width+1,this.height*0.4)
                        layer.rect(0,this.height*0.3,this.width+1,this.height*0.4)
                        layer.fill(125,119,83)
                        for(let a=0,la=round(this.width/game.tileset[0]*3);a<la;a++){
                            layer.rect(this.width*(-0.5+(a+this.pos[a][0][2])/la),this.pos[a][0][0],this.pos[a][0][3],this.pos[a][0][1])
                            layer.rect(this.width*(-0.5+(a+this.pos[a][1][2])/la),this.pos[a][1][0],this.pos[a][1][3],this.pos[a][1][1])
                        }
                    break
                    case 59: case 60:
                        layer.stroke(88,85,83)
                        layer.strokeWeight(1.5)
                        for(let a=0,la=this.width/game.tileset[0]*5+1;a<la;a++){
                            layer.line(
                                this.width*(-0.5+(a-0.5)/la),-this.height*0.5+1,
                                this.width*(-0.5+(a+0.5)/la),this.height*0.5-1
                            )
                            layer.line(
                                this.width*(-0.5+(a-0.5)/la),this.height*0.5-1,
                                this.width*(-0.5+(a+0.5)/la),-this.height*0.5+1
                            )
                        }
                        layer.line(-this.width*0.5,-this.height*0.5+0.75,this.width*0.5,-this.height*0.5+0.75)
                        layer.line(-this.width*0.5,this.height*0.5-0.75,this.width*0.5,this.height*0.5-0.75)
                    break
                    case 61:
                        layer.fill(99,88,78)
                        layer.rect(0,-this.height*0.4,this.width,this.height*0.2)
                        layer.rect(0,this.height*0.4,this.width,this.height*0.2)
                        layer.fill(89,78,68)
                        if(this.position.x<game.edge[0]/2){
                            for(let a=0,la=this.width/game.tileset[0]*3;a<la;a++){
                                layer.rect(this.width*0.5-game.tileset[0]/3*(a+0.5),0,1.5,this.height*0.6)
                            }
                        }else{
                            for(let a=0,la=this.width/game.tileset[0]*3;a<la;a++){
                                layer.rect(-this.width*0.5+game.tileset[0]/3*(a+0.5),0,1.5,this.height*0.6)
                            }
                        }
                        layer.rect(0,0,this.width-game.tileset,1.5)
                    break
                    case 62:
                        layer.fill(93,97,96)
                        layer.rect(0,-this.height*0.4,this.width,this.height*0.2)
                        layer.rect(0,this.height*0.4,this.width,this.height*0.2)
                        layer.stroke(93,97,96)
                        layer.strokeWeight(2)
                        for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                            layer.line(this.width*(-0.5+(a+0.225)/la)-1.5,-this.height*0.4,this.width*(-0.5+(a+0.225)/la)-1.5,this.height*0.4)
                            layer.line(this.width*(-0.5+(a+0.75)/la)+1.5,-this.height*0.4,this.width*(-0.5+(a+0.75)/la)+1.5,this.height*0.4)
                            layer.line(this.width*(-0.5+(a+0.225)/la)-1.5,-this.height*0.4,this.width*(-0.5+(a+0.75)/la)+1.5,this.height*0.4)
                            layer.line(this.width*(-0.5+(a+0.75)/la)+1.5,-this.height*0.4,this.width*(-0.5+(a+0.225)/la)-1.5,this.height*0.4)
                            if(a<la-1){
                                layer.line(this.width*(-0.5+(a+0.75)/la)+1.5,0,this.width*(-0.5+(a+1.25)/la)-1.5,0)
                            }
                        }
                    break
                    case 64: case 70:
                        layer.stroke(95,89,91)
                        layer.strokeWeight(1)
                        for(let a=0,la=this.width/game.tileset[0]*7;a<la;a++){
                            layer.line(this.width*(-0.5+a/la),-this.height*0.5+0.5,this.width*(-0.5+(a+0.5)/la),-this.height*0.225+0.225)
                            layer.line(this.width*(-0.5+a/la),this.height*0.5-0.5,this.width*(-0.5+(a+0.5)/la),this.height*0.225-0.225)
                            layer.line(this.width*(-0.5+(a+1)/la),-this.height*0.5+0.5,this.width*(-0.5+(a+0.5)/la),-this.height*0.225+0.225)
                            layer.line(this.width*(-0.5+(a+1)/la),this.height*0.5-0.5,this.width*(-0.5+(a+0.5)/la),this.height*0.225-0.225)
                            layer.line(this.width*(-0.5+(a+0.5)/la),-this.height*0.225+0.225,this.width*(-0.5+(a+0.5)/la),this.height*0.225-0.225)
                        }
                    break
                    case 67: case 68:
                        layer.fill(133,128,128)
                        layer.rect(0,-this.height*0.35,this.width,this.height*0.3)
                        layer.rect(0,this.height*0.35,this.width,this.height*0.3)
                        for(let a=0,la=this.width/game.tileset[0]*3;a<la;a++){
                            layer.quad(
                                this.width*(-0.5+(a+0.1)/la),this.height*0.3,
                                this.width*(-0.5+(a+0.6)/la),1,
                                this.width*(-0.5+(a+0.9)/la),-this.height*0.3,
                                this.width*(-0.5+(a+0.4)/la),-1
                            )
                        }
                    break
                    case 69:
                        layer.fill(103,93,94)
                        layer.rect(0,-this.height*0.4,this.width,this.height*0.2)
                        layer.rect(0,this.height*0.1,this.width,this.height*0.2)
                        layer.rect(0,this.height*0.6,this.width,this.height*0.2)
                        layer.fill(105,80,73)
                        for(let a=0,la=this.width/game.tileset[0];a<la;a++){
                            layer.rect(this.width*(-0.5+(a+0.5)/la),this.height*0.1,12,5,2)
                        }
                    break
                    default:
                        switch(game.level){
                            case 27:
                                layer.fill(144)
                            break
                            case 29: case 53:
                                layer.fill(130,125,120)
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
                                this.width*0.5-this.width*(a+0.225)/la+5,this.height/2,
                                this.width*0.5-this.width*(a+0.225)/la-5,this.height/2
                            )
                        }
                    break
                }
            break
            case 38: case 56:
                //mark 38
                switch(game.level){
                    case 25: case 26: case 30: case 56:
                        layer.fill(140,90,75)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(115,50,45)
                        for(let a=0,la=floor(this.height/game.tileset[1]*2.25);a<la;a++){
                            layer.rect(0,(a-la*0.5+0.5)*4/9*game.tileset[1],this.width,game.tileset[1]/15)
                        }
                    break
                    case 28: case 29: case 53:
                        switch(game.level){
                            case 28:
                                layer.fill(60,105,150)
                            break
                            default:
                                layer.fill(180)
                            break
                        }
                        layer.rect(-this.width*3/8,0,this.width/4,this.height)
                        layer.rect(this.width*3/8,0,this.width/4,this.height)
                        for(let a=0,la=this.height/game.tileset[1]*2;a<la;a++){
                            layer.quad(
                                this.width/4+1,-this.height/2+this.height*(a+1)/la,
                                this.width/4+1,-this.height/2+this.height*(a+1)/la-5,
                                -this.width/4-1,-this.height/2+this.height*a/la,
                                -this.width/4-1,-this.height/2+this.height*a/la+5
                            )
                            layer.quad(
                                -this.width/4-1,-this.height/2+this.height*(a+1)/la,
                                -this.width/4-1,-this.height/2+this.height*(a+1)/la-5,
                                this.width/4+1,-this.height/2+this.height*a/la,
                                this.width/4+1,-this.height/2+this.height*a/la+5
                            )
                        }
                    break
                    case 32: case 33: case 63:
                        switch(game.level){
                            case 63:
                                layer.fill(105,115,105)
                            break
                            default:
                                layer.fill(135)
                            break
                        }
                        layer.rect(-this.width*3/8,0,this.width/4,this.height)
                        layer.rect(this.width*3/8,0,this.width/4,this.height)
                        for(let a=0,la=floor(this.height/game.tileset[1]*2);a<la;a++){
                            if(a!=0){
                                layer.rect(0,-this.height/2+this.height*a/la,this.width-1,2.5)
                            }
                            layer.quad(
                                this.width/4+1,-this.height/2+this.height*(a+1)/la,
                                this.width/4+1,-this.height/2+this.height*(a+1)/la-5,
                                -this.width/4-1,-this.height/2+this.height*a/la,
                                -this.width/4-1,-this.height/2+this.height*a/la+5
                            )
                            layer.quad(
                                -this.width/4-1,-this.height/2+this.height*(a+1)/la,
                                -this.width/4-1,-this.height/2+this.height*(a+1)/la-5,
                                this.width/4+1,-this.height/2+this.height*a/la,
                                this.width/4+1,-this.height/2+this.height*a/la+5
                            )
                        }
                    break
                    case 34: case 50:
                        layer.fill(78,69,70)
                        for(let a=0,la=floor(this.height/game.tileset[1]*2);a<la;a++){
                            layer.quad(
                                this.width/3+1,-this.height/2+this.height*(a+1)/la-4,
                                this.width/3+1,-this.height/2+this.height*(a+1)/la-5,
                                -this.width/3-1,-this.height/2+this.height*a/la+4,
                                -this.width/3-1,-this.height/2+this.height*a/la+5
                            )
                            layer.quad(
                                -this.width/3-1,-this.height/2+this.height*(a+1)/la-4,
                                -this.width/3-1,-this.height/2+this.height*(a+1)/la-5,
                                this.width/3+1,-this.height/2+this.height*a/la+4,
                                this.width/3+1,-this.height/2+this.height*a/la+5
                            )
                        }
                        layer.fill(160,146,120)
                        layer.rect(-this.width*5/12,0,this.width/6,this.height)
                        layer.rect(this.width*5/12,0,this.width/6,this.height)
                    break
                    case 37:
                        layer.fill(67,67,75)
                        for(let a=0,la=floor(this.height/game.tileset[1]*2);a<la;a++){
                            layer.quad(
                                this.width/3+1,-this.height/2+this.height*(a+1)/la-4,
                                this.width/3+1,-this.height/2+this.height*(a+1)/la-6,
                                -this.width/3-1,-this.height/2+this.height*a/la+4,
                                -this.width/3-1,-this.height/2+this.height*a/la+6
                            )
                            layer.quad(
                                -this.width/3-1,-this.height/2+this.height*(a+1)/la-4,
                                -this.width/3-1,-this.height/2+this.height*(a+1)/la-6,
                                this.width/3+1,-this.height/2+this.height*a/la+4,
                                this.width/3+1,-this.height/2+this.height*a/la+6
                            )
                        }
                        layer.rect(-this.width*3/8,0,this.width/4,this.height)
                        layer.rect(this.width*3/8,0,this.width/4,this.height)
                    break
                    case 38:
                        layer.fill(57,65,70)
                        for(let a=0,la=floor(this.height/game.tileset[1]*2);a<la;a++){
                            layer.quad(
                                this.width/6+1,-this.height/2+this.height*(a+1)/la-4,
                                this.width/6+1,-this.height/2+this.height*(a+1)/la-6,
                                -this.width/6-1,-this.height/2+this.height*a/la+4,
                                -this.width/6-1,-this.height/2+this.height*a/la+6
                            )
                            layer.quad(
                                -this.width/6-1,-this.height/2+this.height*(a+1)/la-4,
                                -this.width/6-1,-this.height/2+this.height*(a+1)/la-6,
                                this.width/6+1,-this.height/2+this.height*a/la+4,
                                this.width/6+1,-this.height/2+this.height*a/la+6
                            )
                        }
                        layer.rect(-this.width/3,0,this.width/3,this.height)
                        layer.rect(this.width/3,0,this.width/3,this.height)
                    break
                    case 43:
                        layer.fill(163,106,37)
                        layer.rect(-this.width/4,0,this.width/4,this.height)
                        layer.rect(this.width/4,0,this.width/4,this.height)
                        for(let a=0,la=ceil(this.height/game.tileset[1]);a<la;a++){
                            layer.rect(0,this.height*-0.5+(a+0.4)*game.tileset[1],this.width,this.width/3)
                            layer.rect(0,this.height*-0.5+(a+0.6)*game.tileset[1],this.width,this.width/3)
                        }
                    break
                    case 47:
                        layer.fill(150,160,160)
                        layer.rect(-this.width/4,0,this.width/4,this.height)
                        layer.rect(this.width/4,0,this.width/4,this.height)
                        for(let a=0,la=ceil(this.height/game.tileset[1])*2;a<la;a++){
                            layer.quad(
                                this.width/8+1,-this.height/2+this.height*(a+1)/la-8,
                                this.width/8+1,-this.height/2+this.height*(a+1)/la,
                                -this.width/8-1,-this.height/2+this.height*a/la+8,
                                -this.width/8-1,-this.height/2+this.height*a/la
                            )
                        }
                    break
                    case 55: case 65:
                        layer.fill(161,148,140)
                        layer.rect(-this.width*0.4,0,this.width*0.2,this.height)
                        layer.rect(this.width*0.4,0,this.width*0.2,this.height)
                        for(let a=0,la=ceil(this.height/game.tileset[1])*2;a<la;a++){
                            layer.quad(
                                this.width*0.3+1,-this.height/2+this.height*(a+1)/la-4,
                                this.width*0.3+1,-this.height/2+this.height*(a+1)/la,
                                -this.width*0.3-1,-this.height/2+this.height*a/la+4,
                                -this.width*0.3-1,-this.height/2+this.height*a/la
                            )
                            layer.quad(
                                -this.width*0.3-1,-this.height/2+this.height*(a+1)/la-4,
                                -this.width*0.3-1,-this.height/2+this.height*(a+1)/la,
                                this.width*0.3+1,-this.height/2+this.height*a/la+4,
                                this.width*0.3+1,-this.height/2+this.height*a/la
                            )
                        }
                    break
                    case 59: case 60:
                        layer.fill(167,123,62)
                        layer.rect(0,0,this.width,this.height)
                        layer.fill(62,57,51)
                        layer.rect(0,-this.height*0.18,this.width+0.5,this.height*0.12)
                        layer.rect(0,-this.height*0.36,this.width+0.5,this.height*0.12)
                    break
                    case 67: case 68:
                        layer.fill(135,80,46)
                        for(let a=0,la=this.height/game.tileset[1]*3;a<la;a++){
                            layer.quad(
                                -this.width*0.3,this.height*(-0.5+(a+0.1)/la),
                                -this.width*0.3,this.height*(-0.5+(a+0.225)/la),
                                this.width*0.3,this.height*(-0.5+(a+0.9)/la),
                                this.width*0.3,this.height*(-0.5+(a+0.75)/la)
                            )
                        }
                        layer.fill(153,147,138)
                        layer.rect(-this.width*0.4,0,this.width*0.2,this.height)
                        layer.rect(this.width*0.4,0,this.width*0.2,this.height)
                        for(let a=0,la=this.height/game.tileset[1]*3;a<la;a++){
                            layer.quad(
                                this.width*0.3,this.height*(-0.5+(a+0.1)/la),
                                this.width*0.3,this.height*(-0.5+(a+0.225)/la),
                                -this.width*0.3,this.height*(-0.5+(a+0.9)/la),
                                -this.width*0.3,this.height*(-0.5+(a+0.75)/la)
                            )
                        }
                    break
                    case 69:
                        layer.fill(52,50,55)
                        layer.rect(-this.width*0.375,0,this.width*0.225,this.height)
                        layer.rect(this.width*0.375,0,this.width*0.225,this.height)
                        layer.noFill()
                        layer.stroke(52,50,55)
                        layer.strokeWeight(2)
                        for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                            layer.arc(-this.width*0.3,this.height*(-0.5+a/la),this.width*1.4,game.tileset[1]*2,0,90)
                            layer.arc(this.width*0.3,this.height*(-0.5+a/la),this.width*1.4,game.tileset[1]*2,90,180)
                        }
                    break
                    default:
                        switch(game.level){
                            case 49:
                                layer.fill(47,46,42)
                            break
                            default:
                                layer.fill(90,85,80)
                            break
                        }
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
                }
            break
            case 39:
                for(let a=0,la=this.point.length;a<la;a++){
                    switch(game.level){
                        case 22: case 23: case 35:
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
                        break
                        case 49:
                            layer.fill(80)
                            layer.ellipse(a*40-la*20+20,0,this.width,this.width)
                            layer.fill(200)
                            if((
                                entities.players[game.players+[0,3,1,2][this.point[a]]].life<entities.players[game.players+[0,3,1,2][this.point[a]]].base.life*0.8||
                                entities.players[game.players+[0,3,1,2][this.point[a]]].id==0
                            )&&!game.pvp){
                                layer.fill(255,50,50)
                            }
                        break
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
                }
            break
            case 43:
                //mark 43
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
                    case 41:
                        layer.fill(212,185,200)
                        layer.rect(0,0,this.width+1,this.height+1)
                        if(this.position.y-this.height/2<game.tileset[1]*29.5&&this.position.y+this.height/2>game.tileset[1]*29.5&&this.position.x>game.edge[0]*0.5){
                            layer.fill(119,106,150)
                            layer.rect(0,game.tileset[1]*29.5-this.position.y,this.width+1,game.tileset[1]*0.5)
                        }
                        if(this.position.y-this.height/2<game.tileset[1]*35.5&&this.position.y+this.height/2>game.tileset[1]*35.5&&this.position.x<game.edge[0]*0.5){
                            layer.fill(119,106,150)
                            layer.rect(0,game.tileset[1]*35.5-this.position.y,this.width+1,game.tileset[1]*0.5)
                        }
                    break
                    case 39:
                        layer.fill(89,89,91)
                        layer.rect(0,5,this.width,this.height,4)
                        layer.rect(0,0,this.width-6,this.height,4)
                    break
                    default:
                        layer.fill(...game.tilecolor[1])
                        layer.rect(0,0,this.width+1,this.height+1)
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
                    default:
                        layer.fill(...game.tilecolor[1])
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
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
                    default:
                        layer.fill(...game.tilecolor[1])
                        layer.triangle(
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                }
            break
            case 46:
                switch(game.level){
                    default:
                        layer.fill(...game.tilecolor[1])
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
                    default:
                        layer.fill(...game.tilecolor[1])
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                }
            break
            case 48:
                switch(game.level){
                    case 42:
                        layer.fill(60,60,65)
                        layer.rect(0,0,this.width+1,this.height+1)
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+15,-this.height/2+15,
                            this.width/2-15,-this.height/2+15,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    default:
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
                }
            break
            case 49:
                switch(game.level){
                    case 30: case 56:
                        layer.fill(225,125,150)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 36:
                        layer.fill(220,140,60)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                    case 39:
                        layer.fill(122,106,92)
                        layer.rect(-this.width*0.5+7,-this.height*0.225,10,this.height*0.5+1)
                        layer.rect(this.width*0.5-7,-this.height*0.225,10,this.height*0.5+1)
                        layer.rect(-this.width*0.5+5,this.height*0.225,10,this.height*0.5+1)
                        layer.rect(this.width*0.5-5,this.height*0.225,10,this.height*0.5+1)
                        layer.rect(0,-this.height*0.225,this.width-4,this.height*0.4)
                        layer.rect(0,this.height*0.225,this.width,this.height*0.4)
                        layer.fill(56,46,37)
                        layer.rect(-this.width*0.5+7,-this.height*0.225,3,this.height*0.5+1)
                        layer.rect(this.width*0.5-7,-this.height*0.225,3,this.height*0.5+1)
                        layer.rect(-this.width*0.5+5,this.height*0.225,3,this.height*0.5+1)
                        layer.rect(this.width*0.5-5,this.height*0.225,3,this.height*0.5+1)
                    break
                    case 61:
                        //intentionally left blank
                    break
                    default:
                        layer.fill(220,100,120)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                }
            break
            case 50:
                if(game.level==29){
                    for(let a=0,la=4;a<la;a++){
                        if(lcos(a*90+this.time)>0){
                            layer.fill(200+lcos(a*90+this.time)*40,200+lcos(a*90+this.time)*40,80+lcos(a*90+this.time)*40,1-this.recharge/60)
                            layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                            layer.fill(160+lcos(a*90+this.time)*40,160+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,1-this.recharge/60)
                            layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                            layer.fill(40+lcos(a*90+this.time)*40,1-this.recharge/60)
                            regTriangle(layer,this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.15,this.height*0.15,-30)
                        }
                    }
                }else{
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
                }
            break
            case 51:
                switch(game.level){
                    case 30: case 56:
                        layer.fill(225,125,150)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 36:
                        layer.fill(220,140,60)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    default:
                        layer.fill(220,100,120)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                }
            break
            case 52:
                switch(game.level){
                    case 30: case 56:
                        layer.fill(225,125,150)
                        layer.triangle(
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 36:
                        layer.fill(220,140,60)
                        layer.triangle(
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    default:
                        layer.fill(220,100,120)
                        layer.triangle(
                            this.width/2+0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                }
            break
            case 53:
                switch(game.level){
                    case 30: case 56:
                        layer.fill(225,125,150)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,-this.height/2-0.5
                        )
                    break
                    case 36:
                        layer.fill(220,140,60)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,-this.height/2-0.5
                        )
                    break
                    case 61:
                        //intentionally left blank
                    break
                    default:
                        layer.fill(220,100,120)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            -this.width/2-0.5,this.height/2+0.5,
                            this.width/2+0.5,-this.height/2-0.5
                        )
                    break
                }
            break
            case 54:
                switch(game.level){
                    case 30: case 56:
                        layer.fill(225,125,150)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 36:
                        layer.fill(220,140,60)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                    case 61:
                        //intentionally left blank
                    break
                    default:
                        layer.fill(220,100,120)
                        layer.triangle(
                            -this.width/2-0.5,-this.height/2-0.5,
                            this.width/2+0.5,-this.height/2-0.5,
                            this.width/2+0.5,this.height/2+0.5
                        )
                    break
                }
            break
            case 55:
                switch(game.level){
                    case 36:
                        layer.fill(200,130,60)
                        layer.rect(0,0,this.width*2,this.height+1)
                        layer.fill(220,150,80)
                        for(let a=0,la=this.pos.length;a<la;a++){
                            layer.rect(this.pos[a],-this.height/2+(a+0.5)/la*this.height,this.width*0.6,game.tileset[1]/10)
                        }
                    break
                    default:
                        layer.fill(200,150,60)
                        layer.rect(0,0,this.width*2,this.height+1)
                        layer.fill(220,170,80)
                        for(let a=0,la=this.pos.length;a<la;a++){
                            layer.rect(this.pos[a],-this.height/2+(a+0.5)/la*this.height,this.width*0.6,game.tileset[1]/10)
                        }
                    break
                }
            break
            case 57:
                if(game.level==49&&!game.pvp){
                    layer.scale(1-game.pointAnim[1])
                }
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        if(game.level==49&&game.pvp){
                            layer.fill(
                                (100+lcos(a*90+this.time)*40)*this.visible+50*(1-this.visible),
                                (80+lcos(a*90+this.time)*40)*this.visible+50*(1-this.visible),
                                (60+lcos(a*90+this.time)*40)*this.visible+50*(1-this.visible),
                                1-this.recharge/60)
                            layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                            layer.fill(
                                (140+lcos(a*90+this.time)*40)*this.visible+50*(1-this.visible),
                                (120+lcos(a*90+this.time)*40)*this.visible+50*(1-this.visible),
                                (100+lcos(a*90+this.time)*40)*this.visible+50*(1-this.visible),
                                1-this.recharge/60)
                            layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                            layer.fill(
                                (40+lcos(a*90+this.time)*40)*this.visible+50*(1-this.visible),
                                1-this.recharge/60)
                        }else{
                            layer.fill(100+lcos(a*90+this.time)*40,80+lcos(a*90+this.time)*40,60+lcos(a*90+this.time)*40,1-this.recharge/60)
                            layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                            layer.fill(140+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,100+lcos(a*90+this.time)*40,1-this.recharge/60)
                            layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                            layer.fill(40+lcos(a*90+this.time)*40,1-this.recharge/60)
                        }
                        regTriangle(layer,this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.15,this.height*0.15,-30)
                    }
                }
            break
            case 58:
                for(let a=0,la=4;a<la;a++){
                    if(cos(a*90+this.time)>0){
                        layer.fill(120+cos(a*90+this.time)*40)
                        layer.rect(this.width/2*sin(a*90+this.time),0,(this.width+1)*cos(a*90+this.time),this.height+1)
                        layer.fill(40+cos(a*90+this.time)*40,200+cos(a*90+this.time)*40,40+cos(a*90+this.time)*40)
                        layer.ellipse(this.width/2*sin(a*90+this.time),0,this.width*cos(a*90+this.time)*0.6,this.height*0.6)
                        layer.fill(200+cos(a*90+this.time)*40)
                        layer.rect(this.width/2*sin(a*90+this.time),0,this.width*cos(a*90+this.time)*0.1,this.height*0.5)
                        layer.rect(this.width/2*sin(a*90+this.time)-this.width*cos(a*90+this.time)*0.15,0,this.width*cos(a*90+this.time)*0.1,this.height*0.3)
                        layer.rect(this.width/2*sin(a*90+this.time)+this.width*cos(a*90+this.time)*0.15,0,this.width*cos(a*90+this.time)*0.1,this.height*0.3)
                    }
                }
            break
            case 59:
                switch(game.level){
                    case 58: case 63: case 66:
                        layer.fill(154,146,109)
                        layer.quad(
                            -this.width*0.5,-this.height*0.5,
                            -this.width*0.5,-this.height*0.5+game.tileset[1]*0.16,
                            this.width*0.5,this.height*0.5+game.tileset[1]*0.16,
                            this.width*0.5,this.height*0.5
                        )
                        layer.quad(
                            -this.width*0.5,-this.height*0.5+game.tileset[1]*0.24,
                            -this.width*0.5,-this.height*0.5+game.tileset[1]*0.4,
                            this.width*0.5,this.height*0.5+game.tileset[1]*0.4,
                            this.width*0.5,this.height*0.5+game.tileset[1]*0.24
                        )
                        layer.fill(125,119,83)
                        for(let a=0,la=round(this.width/game.tileset[0]*3);a<la;a++){
                            layer.rect(this.width*(-0.5+(a+this.pos[a][0][2])/la),this.pos[a][0][0]+game.tileset[1]*0.2+this.height*(-0.5+(a+this.pos[a][0][2])/la),this.pos[a][0][3],this.pos[a][0][1])
                            layer.rect(this.width*(-0.5+(a+this.pos[a][1][2])/la),this.pos[a][1][0]+game.tileset[1]*0.2+this.height*(-0.5+(a+this.pos[a][1][2])/la),this.pos[a][1][3],this.pos[a][1][1])
                        }
                    break
                    default:
                        layer.stroke(140,100,118)
                        layer.strokeWeight(1.5)
                        for(let a=0,la=this.width/game.tileset[0]*3;a<la;a++){
                            layer.line((this.width-4)*(-0.5+a/la),(this.height-4)*(-0.5+a/la)+game.tileset[1]*(0.06*a/la),(this.width-4)*(-0.5+(a+1)/la),(this.height-4)*(-0.5+(a+1)/la)+game.tileset[1]*(0.24+0.06*(a+1)/la))
                            layer.line((this.width-4)*(-0.5+a/la),(this.height-4)*(-0.5+a/la)+game.tileset[1]*(0.24+0.06*a/la),(this.width-4)*(-0.5+(a+1)/la),(this.height-4)*(-0.5+(a+1)/la)+game.tileset[1]*(0.06*(a+1)/la))
                        }
                        layer.noStroke()
                        layer.fill(247,210,139)
                        layer.quad(
                            -this.width*0.5,-this.height*0.5,
                            this.width*0.5,this.height*0.5,
                            this.width*0.5,this.height*0.5+game.tileset[1]*0.06,
                            -this.width*0.5,-this.height*0.5+game.tileset[1]*0.06,
                        )
                        layer.quad(
                            -this.width*0.5,-this.height*0.5+game.tileset[1]*0.24,
                            this.width*0.5,this.height*0.5+game.tileset[1]*0.24,
                            this.width*0.5,this.height*0.5+game.tileset[1]*0.3,
                            -this.width*0.5,-this.height*0.5+game.tileset[1]*0.3,
                        )
                    break
                }
            break
            case 60:
                switch(game.level){
                    case 58: case 63: case 66:
                        layer.fill(154,146,109)
                        layer.quad(
                            this.width*0.5,-this.height*0.5,
                            this.width*0.5,-this.height*0.5+game.tileset[1]*0.16,
                            -this.width*0.5,this.height*0.5+game.tileset[1]*0.16,
                            -this.width*0.5,this.height*0.5
                        )
                        layer.quad(
                            this.width*0.5,-this.height*0.5+game.tileset[1]*0.24,
                            this.width*0.5,-this.height*0.5+game.tileset[1]*0.4,
                            -this.width*0.5,this.height*0.5+game.tileset[1]*0.4,
                            -this.width*0.5,this.height*0.5+game.tileset[1]*0.24
                        )
                        layer.fill(125,119,83)
                        for(let a=0,la=round(this.width/game.tileset[0]*3);a<la;a++){
                            layer.rect(-this.width*(-0.5+(a+this.pos[a][0][2])/la),this.pos[a][0][0]+game.tileset[1]*0.2+this.height*(-0.5+(a+this.pos[a][0][2])/la),this.pos[a][0][3],this.pos[a][0][1])
                            layer.rect(-this.width*(-0.5+(a+this.pos[a][1][2])/la),this.pos[a][1][0]+game.tileset[1]*0.2+this.height*(-0.5+(a+this.pos[a][1][2])/la),this.pos[a][1][3],this.pos[a][1][1])
                        }
                    break
                    default:
                        layer.stroke(140,100,118)
                        layer.strokeWeight(1.5)
                        for(let a=0,la=this.width/game.tileset[0]*3;a<la;a++){
                            layer.line(-(this.width-4)*(-0.5+a/la),(this.height-4)*(-0.5+a/la)+game.tileset[1]*(0.06*a/la),-(this.width-4)*(-0.5+(a+1)/la),(this.height-4)*(-0.5+(a+1)/la)+game.tileset[1]*(0.24+0.06*(a+1)/la))
                            layer.line(-(this.width-4)*(-0.5+a/la),(this.height-4)*(-0.5+a/la)+game.tileset[1]*(0.24+0.06*a/la),-(this.width-4)*(-0.5+(a+1)/la),(this.height-4)*(-0.5+(a+1)/la)+game.tileset[1]*(0.06*(a+1)/la))
                        }
                        layer.noStroke()
                        layer.fill(247,210,139)
                        layer.quad(
                            this.width*0.5,-this.height*0.5,
                            -this.width*0.5,this.height*0.5,
                            -this.width*0.5,this.height*0.5+game.tileset[1]*0.06,
                            this.width*0.5,-this.height*0.5+game.tileset[1]*0.06,
                        )
                        layer.quad(
                            this.width*0.5,-this.height*0.5+game.tileset[1]*0.24,
                            -this.width*0.5,this.height*0.5+game.tileset[1]*0.24,
                            -this.width*0.5,this.height*0.5+game.tileset[1]*0.3,
                            this.width*0.5,-this.height*0.5+game.tileset[1]*0.3,
                        )
                    break
                }
            break
            case 61:
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        layer.fill(200+lcos(a*90+this.time)*40,40+lcos(a*90+this.time)*40,40+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                        layer.fill(160+lcos(a*90+this.time)*40,20+lcos(a*90+this.time)*40,20+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                        layer.fill(80+lcos(a*90+this.time)*40,lcos(a*90+this.time)*40,lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.4,this.height*0.4)
                        layer.fill(160+lcos(a*90+this.time)*40,20+lcos(a*90+this.time)*40,20+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.32,this.height*0.32)
                        layer.fill(80+lcos(a*90+this.time)*40,lcos(a*90+this.time)*40,lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.24,this.height*0.24)
                        layer.fill(160+lcos(a*90+this.time)*40,20+lcos(a*90+this.time)*40,20+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.16,this.height*0.16)
                        layer.fill(80+lcos(a*90+this.time)*40,lcos(a*90+this.time)*40,lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.04,this.height*0.48)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.48,this.height*0.04)
                    }
                }
            break
            case 62:
                //mark 62
                switch(game.level){
                    case 49:
                        layer.fill(20,21,23)
                        layer.rect(-this.width/3,0,this.width/3,this.height)
                        layer.rect(this.width/3,0,this.width/3,this.height)
                        layer.fill(225,207,183,0.1)
                        layer.rect(0,this.height/2,this.width*2.5+8,this.height*0.4+8,8)
                        layer.rect(0,this.height/2,this.width*2.5+4,this.height*0.4+4,6)
                        layer.fill(225,207,183)
                        layer.rect(0,this.height/2,this.width*2.5,this.height*0.4,4)
                    break
                    case 54:
                        layer.fill(37,33,28)
                        layer.rect(0,0,this.width,this.height)
                    break
                    case 61:
                        layer.fill(128,99,83)
                        layer.rect(0,0,this.width,this.height)
                    break
                    case 67: case 68:
                        layer.fill(119,110,115)
                        layer.rect(0,0,this.width-20,this.height-20)
                    break
                    case 69:
                        layer.fill(92,53,47)
                        layer.ellipse(0,0,this.width,this.height*1.8)
                    break
                    default:
                        layer.fill(88,81,65)
                        layer.rect(0,0,this.width,this.height)
                    break
                }
            break
            case 65:
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        layer.fill(80+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                        layer.fill(120+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                        layer.fill(40+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.quad(
                            this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.1,-this.height*0.15,
                            this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.15,-this.height*0.1,
                            this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.1,this.height*0.15,
                            this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.15,this.height*0.1
                        )
                        layer.quad(
                            this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.1,this.height*0.15,
                            this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.15,this.height*0.1,
                            this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.1,-this.height*0.15,
                            this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.15,-this.height*0.1
                        )
                    }
                }
            break
            case 66:
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        layer.fill(80+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,80+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                        layer.fill(120+lcos(a*90+this.time)*40,180+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                        layer.fill(40+lcos(a*90+this.time)*40,80+lcos(a*90+this.time)*40,40+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.125,-this.height*0.1,this.width*lcos(a*90+this.time)*0.1,this.height*0.1)
                        layer.ellipse(this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.125,-this.height*0.1,this.width*lcos(a*90+this.time)*0.1,this.height*0.1)
                        layer.arc(this.width/2*lsin(a*90+this.time),this.height*0.15,this.width*lcos(a*90+this.time)*0.3,this.height*0.2,-180,0)
                    }
                }
            break
            case 67:
                switch(game.level){
                    default:
                        layer.rotate(this.time)
                        layer.fill(25,21,18)
                        layer.ellipse(0,0,this.width*2.5)
                        for(let a=0,la=11;a<la;a++){
                            layer.rotate(360/la)
                            layer.rect(0,-this.width*1.25,this.width*0.4,this.width*0.6)
                        }
                        layer.fill(91,74,67)
                        layer.ellipse(0,0,this.width*1.5)
                        layer.fill(25,21,18)
                        layer.ellipse(0,0,this.width*1.35)
                        layer.fill(91,74,67)
                        layer.ellipse(0,0,this.width*0.4)
                    break
                }
            break
            case 68: case 73:
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        layer.fill(180+lcos(a*90+this.time)*40,200+lcos(a*90+this.time)*40,220+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                        layer.fill(120+lcos(a*90+this.time)*40,200+lcos(a*90+this.time)*40,180+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                        layer.fill(40+lcos(a*90+this.time)*40,200+lcos(a*90+this.time)*40,40+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.45,this.height*0.15)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.15,this.height*0.45)
                    }
                }
            break
            case 69:
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        layer.fill(80+lcos(a*90+this.time)*40,40+lcos(a*90+this.time)*40,80+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                        layer.fill(200+lcos(a*90+this.time)*40,200+lcos(a*90+this.time)*40,200+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                        layer.fill(120+lcos(a*90+this.time)*40,80+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.15,this.height*0.15)
                        layer.triangle(
                            this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.05,
                            -this.height*0.2,
                            this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.05,
                            this.height*0.2,
                            this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.225,
                            0
                        )
                        layer.triangle(
                            this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.05,
                            -this.height*0.2,
                            this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.05,
                            this.height*0.2,
                            this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.225,
                            0
                        )
                    }
                }
            break
            case 70:
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        layer.fill(200+lcos(a*90+this.time)*40,140+lcos(a*90+this.time)*40,80+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                        layer.fill(160+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,80+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                        layer.fill(120+lcos(a*90+this.time)*40,90+lcos(a*90+this.time)*40,60+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.triangle(
                            this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.15,-0.5,
                            this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.15,-0.5,
                            this.width/2*lsin(a*90+this.time),-this.height*0.15
                        )
                        layer.triangle(
                            this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.15,0.5,
                            this.width/2*lsin(a*90+this.time)-0.5,0.5,
                            this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.075-0.225,this.height*0.15
                        )
                        layer.triangle(
                            this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.15,0.5,
                            this.width/2*lsin(a*90+this.time)+0.5,0.5,
                            this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.075+0.225,this.height*0.15
                        )
                    }
                }
            break
            case 71:
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        layer.fill(160+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),-this.height*0.225-1,(this.width+1)*lcos(a*90+this.time),this.height*0.5-1)
                        layer.rect(this.width/2*lsin(a*90+this.time),this.height*0.225+1,(this.width+1)*lcos(a*90+this.time),this.height*0.5-1)
                        layer.fill(80+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.arc(this.width/2*lsin(a*90+this.time),-1.5,this.width*lcos(a*90+this.time)*0.6,this.height*0.6,-180,0)
                        layer.arc(this.width/2*lsin(a*90+this.time),1.5,this.width*lcos(a*90+this.time)*0.6,this.height*0.6,0,180)
                        layer.fill(220+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),-this.height*0.12-1.5,this.width*lcos(a*90+this.time)*0.1,this.height*0.1)
                        layer.rect(this.width/2*lsin(a*90+this.time),-this.height*0.025-1.5,this.width*lcos(a*90+this.time)*0.1,this.height*0.05)
                        layer.rect(this.width/2*lsin(a*90+this.time),this.height*0.025+1.5,this.width*lcos(a*90+this.time)*0.1,this.height*0.05)
                        layer.rect(this.width/2*lsin(a*90+this.time),this.height*0.12+1.5,this.width*lcos(a*90+this.time)*0.1,this.height*0.1)
                    }
                }
            break
            case 72:
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        layer.fill(80+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,80+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                        layer.fill(120+lcos(a*90+this.time)*40,180+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                        layer.fill(40+lcos(a*90+this.time)*40,80+lcos(a*90+this.time)*40,40+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.125,-this.height*0.1,this.width*lcos(a*90+this.time)*0.1,this.height*0.1)
                        layer.ellipse(this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.125,-this.height*0.1,this.width*lcos(a*90+this.time)*0.1,this.height*0.1)
                        layer.arc(this.width/2*lsin(a*90+this.time),this.height*0.15,this.width*lcos(a*90+this.time)*0.3,this.height*0.2,-180,0)
                    }
                }
            break
            case 74:
                layer.fill(132,138,141)
                for(let a=0,la=this.height/game.tileset[1]*2;a<la;a++){
                    layer.rect(0,this.height/2-(a+0.5)/la*this.height,this.width,game.tileset[1]*0.1)
                }
                layer.beginShape()
                layer.vertex(-this.width/2,this.height/2-ceil(this.height/game.tileset[1])*game.tileset[1])
                layer.vertex(-this.width/2,this.height/2)
                layer.vertex(-this.width*0.35,this.height/2)
                for(let a=0,la=this.height/game.tileset[1]*2;a<la;a++){
                    layer.vertex(-this.width*0.2,this.height/2-(a+0.5)/la*this.height)
                    layer.vertex(-this.width*0.35,this.height/2-(a+1)/la*this.height)
                }
                layer.endShape()
                layer.beginShape()
                layer.vertex(this.width/2,this.height/2-ceil(this.height/game.tileset[1])*game.tileset[1])
                layer.vertex(this.width/2,this.height/2)
                layer.vertex(this.width*0.35,this.height/2)
                for(let a=0,la=this.height/game.tileset[1]*2;a<la;a++){
                    layer.vertex(this.width*0.2,this.height/2-(a+0.5)/la*this.height)
                    layer.vertex(this.width*0.35,this.height/2-(a+1)/la*this.height)
                }
                layer.endShape()
            break
            case 75:
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        let flip=a%2*2-1
                        layer.fill(60+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,180+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time)-(this.width*0.25+0.1)*lcos(a*90+this.time)*flip,-this.height*0.25-0.1,(this.width*0.5+0.2)*lcos(a*90+this.time),this.height*0.5+0.2)
                        layer.rect(this.width/2*lsin(a*90+this.time)+(this.width*0.25+0.1)*lcos(a*90+this.time)*flip,this.height*0.25+0.1,(this.width*0.5+0.2)*lcos(a*90+this.time),this.height*0.5+0.2)
                        layer.fill(60+lcos(a*90+this.time)*40,55+lcos(a*90+this.time)*40,50+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time)-(this.width*0.25+0.1)*lcos(a*90+this.time)*flip,this.height*0.25+0.1,(this.width*0.5+0.2)*lcos(a*90+this.time),this.height*0.5+0.2)
                        layer.rect(this.width/2*lsin(a*90+this.time)+(this.width*0.25+0.1)*lcos(a*90+this.time)*flip,-this.height*0.25-0.1,(this.width*0.5+0.2)*lcos(a*90+this.time),this.height*0.5+0.2)
                        layer.fill(160+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.25*flip,-this.height*0.25,this.width*lcos(a*90+this.time)*0.32,this.height*0.32)
                        layer.ellipse(this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.25*flip,this.height*0.25,this.width*lcos(a*90+this.time)*0.32,this.height*0.32)
                        layer.fill(240+lcos(a*90+this.time)*40,120+lcos(a*90+this.time)*40,60+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.25*flip,-this.height*0.25,this.width*lcos(a*90+this.time)*0.32,this.height*0.32)
                        layer.ellipse(this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.25*flip,this.height*0.25,this.width*lcos(a*90+this.time)*0.32,this.height*0.32)
                        layer.fill(240+lcos(a*90+this.time)*40,40+lcos(a*90+this.time)*40,40+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.25*flip,-this.height*0.25,this.width*lcos(a*90+this.time)*0.24,this.height*0.08)
                        layer.rect(this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.25*flip,-this.height*0.25,this.width*lcos(a*90+this.time)*0.08,this.height*0.24)
                        layer.rect(this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.25*flip,this.height*0.25,this.width*lcos(a*90+this.time)*0.24,this.height*0.08)
                        layer.rect(this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.25*flip,this.height*0.25,this.width*lcos(a*90+this.time)*0.08,this.height*0.24)
                        layer.fill(60+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.25*flip,-this.height*0.25,this.width*lcos(a*90+this.time)*0.05,this.height*0.2)
                        layer.rect(this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.25*flip-this.width*lcos(a*90+this.time)*0.06,-this.height*0.25,this.width*lcos(a*90+this.time)*0.04,this.height*0.2)
                        layer.rect(this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.25*flip+this.width*lcos(a*90+this.time)*0.06,-this.height*0.25,this.width*lcos(a*90+this.time)*0.04,this.height*0.2)
                        layer.rect(this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.25*flip,this.height*0.25,this.width*lcos(a*90+this.time)*0.05,this.height*0.2)
                        layer.rect(this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.25*flip-this.width*lcos(a*90+this.time)*0.06,this.height*0.25,this.width*lcos(a*90+this.time)*0.04,this.height*0.2)
                        layer.rect(this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.25*flip+this.width*lcos(a*90+this.time)*0.06,this.height*0.25,this.width*lcos(a*90+this.time)*0.04,this.height*0.2)
                    }
                }
            break
            case 76:
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        layer.fill(160+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                        layer.fill(60+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                        layer.fill(120+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.1,this.height*0.1)
                        layer.quad(
                            this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.15,-this.height*0.15,
                            this.width/2*lsin(a*90+this.time)-this.width*lcos(a*90+this.time)*0.03,this.height*0.03,
                            this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.15,this.height*0.15,
                            this.width/2*lsin(a*90+this.time)+this.width*lcos(a*90+this.time)*0.03,-this.height*0.03
                        )
                    }
                }
            break
            //mark
            
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
                    case 19: case 31:
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
                        switch(this.type){
                            case 20: case 46:
                                layer.fill(206,216,247)
                                for(let a=0,la=this.width/game.tileset[0];a<la;a++){
                                    layer.quad(
                                        this.width/2-(a+0.5)/la*this.width-1,-this.height/2-0.5,
                                        this.width/2-(a+0.5)/la*this.width+1,-this.height/2-0.5,
                                        this.width/2-(a+0.5)/la*this.width+1,-map(-this.width/2+(a+0.5)/la*this.width-1,-this.width/2-0.5,this.width/2+0.5,this.height/2+0.5,-this.height/2-0.5),
                                        this.width/2-(a+0.5)/la*this.width-1,-map(-this.width/2+(a+0.5)/la*this.width+1,-this.width/2-0.5,this.width/2+0.5,this.height/2+0.5,-this.height/2-0.5)
                                    )
                                }
                                for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                                    layer.quad(
                                        -this.width/2+0.5,this.height/2-(a+0.5)/la*this.height+1,
                                        -this.width/2+0.5,this.height/2-(a+0.5)/la*this.height-1,
                                        map(-this.height/2+(a+0.5)/la*this.height+1,-this.height/2-0.5,this.height/2+0.5,-this.width/2-0.5,this.width/2+0.5),this.height/2-(a+0.5)/la*this.height-1,
                                        map(-this.height/2+(a+0.5)/la*this.height-1,-this.height/2-0.5,this.height/2+0.5,-this.width/2-0.5,this.width/2+0.5),this.height/2-(a+0.5)/la*this.height+1
                                    )
                                }
                            break
                            case 21:
                                layer.fill(206,216,247)
                                for(let a=0,la=this.width/game.tileset[0];a<la;a++){
                                    layer.quad(
                                        -this.width/2+(a+0.5)/la*this.width+1,-this.height/2-0.5,
                                        -this.width/2+(a+0.5)/la*this.width-1,-this.height/2-0.5,
                                        -this.width/2+(a+0.5)/la*this.width-1,-map(-this.width/2+(a+0.5)/la*this.width-1,-this.width/2-0.5,this.width/2+0.5,this.height/2+0.5,-this.height/2-0.5),
                                        -this.width/2+(a+0.5)/la*this.width+1,-map(-this.width/2+(a+0.5)/la*this.width+1,-this.width/2-0.5,this.width/2+0.5,this.height/2+0.5,-this.height/2-0.5)
                                    )
                                }
                                for(let a=0,la=this.height/game.tileset[1];a<la;a++){
                                    layer.quad(
                                        this.width/2-0.5,this.height/2-(a+0.5)/la*this.height+1,
                                        this.width/2-0.5,this.height/2-(a+0.5)/la*this.height-1,
                                        -map(-this.height/2+(a+0.5)/la*this.height+1,-this.height/2-0.5,this.height/2+0.5,-this.width/2-0.5,this.width/2+0.5),this.height/2-(a+0.5)/la*this.height-1,
                                        -map(-this.height/2+(a+0.5)/la*this.height-1,-this.height/2-0.5,this.height/2+0.5,-this.width/2-0.5,this.width/2+0.5),this.height/2-(a+0.5)/la*this.height+1
                                    )
                                }
                            break
                        }
                    break
                    case 29:
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                125+this.balls[a][3]*20,
                                130+this.balls[a][3]*20,
                                125+this.balls[a][3]*20
                            )
                            regStar(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]*0.3,this.balls[a][2]*0.3,this.balls[a][2]*0.15,this.balls[a][2]*0.15,this.balls[a][4])
                        }
                    break
                    case 30: case 56:
                        if(!(this.type==18&&this.height<game.tileset[1]*0.5)&&!(game.level==56&&this.position.y<=game.tileset[1]*10)){
                            layer.stroke(180,210,240)
                            layer.strokeWeight(6)
                            list=[1,4,5]
                            for(let a=0,la=list.length;a<la;a++){
                                for(let b=0,lb=this.boundary[list[a]].length;b<lb;b++){
                                    if(a==1&&this.position.x>game.edge[0]-1200&&this.type==17&&this.height>game.tileset[1]){
                                        layer.line(
                                            this.boundary[list[a]][b][0].x-this.position.x+game.tileset[0]*0.4,
                                            this.boundary[list[a]][b][0].y-this.position.y+game.tileset[1]*0.4,
                                            this.boundary[list[a]][b][1].x-this.position.x,
                                            this.boundary[list[a]][b][1].y-this.position.y
                                        )
                                    }else if(a==2&&this.position.x>game.tileset[0]*50&&this.position.x<game.tileset[0]*60&&this.type==18&&this.height>game.tileset[1]&&game.level==56){
                                        layer.line(
                                            this.boundary[list[a]][b][0].x-this.position.x-game.tileset[0]*0.4,
                                            this.boundary[list[a]][b][0].y-this.position.y+game.tileset[1]*0.4,
                                            this.boundary[list[a]][b][1].x-this.position.x,
                                            this.boundary[list[a]][b][1].y-this.position.y
                                        )
                                    }else{
                                        layer.line(
                                            this.boundary[list[a]][b][0].x-this.position.x,
                                            this.boundary[list[a]][b][0].y-this.position.y,
                                            this.boundary[list[a]][b][1].x-this.position.x,
                                            this.boundary[list[a]][b][1].y-this.position.y
                                        )
                                    }
                                }
                            }
                        }
                    break
                    case 36:
                        if(this.position.y>game.tileset[1]*10){
                            layer.stroke(100,180,120)
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
                        }
                    break
                    case 37:
                        layer.stroke(121,141,44)
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
                    case 38:
                        for(let a=0,la=this.balls[0].length;a<la;a++){
                            layer.fill(
                                70+this.balls[0][a][3]*15,
                                55+this.balls[0][a][3]*15,
                                50+this.balls[0][a][3]*15
                            )
                            regPoly(layer,this.balls[0][a][0],this.balls[0][a][1],this.balls[0][a][5],this.balls[0][a][2]*0.5,this.balls[0][a][2]*0.5,this.balls[0][a][4])
                        }
                    break
                    case 40:
                        layer.stroke(111,151,44)
                        layer.strokeWeight(6)
                        list=[1,2,3,4,5]
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
                    case 42:
                        if(!(this.position.x>game.edge[0]/3&&this.position.x<game.edge[0]*2/3&&(this.position.y-this.height/2)>game.edge[1]-game.tileset[1]*18)){
                            layer.stroke(200,240,210)
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
                        }
                    break
                    case 43:
                        layer.stroke(120,140,90)
                        layer.strokeWeight(8)
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
                    case 44:
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                35+this.balls[a][3]*30,
                                45+this.balls[a][3]*30,
                                37+this.balls[a][3]*30
                            )
                            regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]*0.5,this.balls[a][2]*0.5,this.balls[a][4])
                        }
                    break
                    case 45:
                        if(this.position.y>=game.tileset[1]*10){
                            for(let a=0,la=this.balls.length;a<la;a++){
                                layer.fill(
                                    30+(this.position.y+this.balls[a][1])/game.edge[1]*30+this.balls[a][3]*30,
                                    60-(this.position.y+this.balls[a][1])/game.edge[1]*15+this.balls[a][3]*30,
                                    30+this.balls[a][3]*30
                                )
                                regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]/2,this.balls[a][2]/2,this.balls[a][4])
                            }
                        }
                    break
                    case 47:
                        if(this.position.y-this.height/2<game.edge[1]-game.tileset[1]*5){
                            layer.stroke(140,130,90)
                            layer.strokeWeight(8)
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
                        }
                    break
                    case 49:
                        layer.stroke(54,55,27)
                        layer.strokeWeight(6.5)
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
                    case 51:
                        if(this.position.y>=game.tileset[1]*10){
                            layer.stroke(103,110,79)
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
                        }
                    break
                    case 52:
                        if(this.position.y>=game.tileset[1]*10){
                            layer.stroke(111,151,44)
                            layer.strokeWeight(6)
                            list=[1,2,3,4,5]
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
                        }
                    break
                    case 53:
                        if(this.position.y>=game.tileset[1]*10){
                            for(let a=0,la=this.balls.length;a<la;a++){
                                layer.fill(
                                    125+this.balls[a][3]*20,
                                    130+this.balls[a][3]*20,
                                    125+this.balls[a][3]*20
                                )
                                regStar(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]*0.3,this.balls[a][2]*0.3,this.balls[a][2]*0.15,this.balls[a][2]*0.15,this.balls[a][4])
                            }
                        }
                    break
                    case 54:
                        switch(this.type){
                            case 1:
                                layer.translate(-this.position.x,-this.position.y)
                                layer.fillGradient(graphics.gradient[0])
                                if(this.boundary[1].length>0){
                                    layer.beginShape()
                                    layer.vertex(
                                        this.width/2+0.5+this.position.x,
                                        this.height/2+this.position.y
                                    )
                                    layer.vertex(
                                        -this.width/2-0.5+this.position.x,
                                        this.height/2+this.position.y
                                    )
                                    for(let a=0,la=round(this.width/game.tileset[0]);a<la;a++){
                                        layer.vertex(
                                            this.width*(-0.5+a/la)-(a==0?0.5:0)+this.position.x,
                                            -this.height/2+this.position.y
                                        )
                                        layer.vertex(
                                            this.width*(-0.5+(a+0.2)/la)+this.position.x,
                                            -this.height/2-5+this.position.y
                                        )
                                        layer.vertex(
                                            this.width*(-0.5+(a+0.8)/la)+this.position.x,
                                            -this.height/2-5+this.position.y
                                        )
                                    }
                                    layer.vertex(
                                        this.width/2+0.5+this.position.x,
                                        -this.height/2+this.position.y
                                    )
                                    layer.endShape()
                                }else{
                                    layer.rect(this.position.x,this.position.y,this.width+1,this.height+1)
                                }
                            break
                            case 17:
                                layer.translate(-this.position.x,-this.position.y)
                                layer.fillGradient(graphics.gradient[0])
                                if(this.height/this.width>1.5||this.boundary[4].length<=0){
                                    layer.triangle(
                                        -this.width/2-0.5+this.position.x,-this.height/2-0.5+this.position.y,
                                        -this.width/2-0.5+this.position.x,this.height/2+0.5+this.position.y,
                                        this.width/2+0.5+this.position.x,this.height/2+0.5+this.position.y
                                    )
                                }else{
                                    layer.beginShape()
                                    layer.vertex(
                                        this.width/2+0.5+this.position.x,
                                        this.height/2+this.position.y
                                    )
                                    layer.vertex(
                                        -this.width/2-0.5+this.position.x,
                                        this.height/2+this.position.y
                                    )
                                    for(let a=0,la=round(this.width/game.tileset[0]+this.height/game.tileset[1]-1);a<la;a++){
                                        layer.vertex(
                                            this.width*(-0.5+a/la)-(a==0?0.5:0)+this.position.x,
                                            this.height*(-0.5+a/la)+this.position.y
                                        )
                                        layer.vertex(
                                            this.width*(-0.5+(a+0.2)/la)+5*this.height/this.width+this.position.x,
                                            this.height*(-0.5+(a+0.2)/la)-5+this.position.y
                                        )
                                        layer.vertex(
                                            this.width*(-0.5+(a+0.8)/la)+5*this.height/this.width+this.position.x,
                                            this.height*(-0.5+(a+0.8)/la)-5+this.position.y
                                        )
                                    }
                                    layer.endShape()
                                }
                            break
                            case 18:
                                layer.translate(-this.position.x,-this.position.y)
                                layer.fillGradient(graphics.gradient[0])
                                if(this.height/this.width>1.5||this.boundary[5].length<=0){
                                    layer.triangle(
                                        this.width/2+0.5+this.position.x,-this.height/2-0.5+this.position.y,
                                        -this.width/2-0.5+this.position.x,this.height/2+0.5+this.position.y,
                                        this.width/2+0.5+this.position.x,this.height/2+0.5+this.position.y
                                    )
                                }else{
                                    layer.beginShape()
                                    layer.vertex(
                                        -this.width/2-0.5+this.position.x,
                                        this.height/2+this.position.y
                                    )
                                    layer.vertex(
                                        this.width/2+0.5+this.position.x,
                                        this.height/2+this.position.y
                                    )
                                    for(let a=0,la=round(this.width/game.tileset[0]+this.height/game.tileset[1]-1);a<la;a++){
                                        layer.vertex(
                                            -this.width*(-0.5+a/la)-(a==0?0.5:0)+this.position.x,
                                            this.height*(-0.5+a/la)+this.position.y
                                        )
                                        layer.vertex(
                                            -this.width*(-0.5+(a+0.2)/la)-5*this.height/this.width+this.position.x,
                                            this.height*(-0.5+(a+0.2)/la)-5+this.position.y
                                        )
                                        layer.vertex(
                                            -this.width*(-0.5+(a+0.8)/la)-5*this.height/this.width+this.position.x,
                                            this.height*(-0.5+(a+0.8)/la)-5+this.position.y
                                        )
                                    }
                                    layer.endShape()
                                }
                            break
                        }
                    break
                    case 58: case 63: case 66:
                        switch(this.type){
                            case 1:
                                layer.translate(-this.position.x,-this.position.y)
                                layer.fillGradient(graphics.gradient[0])
                                layer.rect(this.position.x,this.position.y,this.width+1,this.height+1)
                            break
                            case 17:
                                layer.translate(-this.position.x,-this.position.y)
                                layer.fillGradient(graphics.gradient[0])
                                layer.triangle(
                                    -this.width/2-0.5+this.position.x,-this.height/2-0.5+this.position.y,
                                    -this.width/2-0.5+this.position.x,this.height/2+0.5+this.position.y,
                                    this.width/2+0.5+this.position.x,this.height/2+0.5+this.position.y
                                )
                            break
                            case 18:
                                layer.translate(-this.position.x,-this.position.y)
                                layer.fillGradient(graphics.gradient[0])
                                layer.triangle(
                                    this.width/2+0.5+this.position.x,-this.height/2-0.5+this.position.y,
                                    -this.width/2-0.5+this.position.x,this.height/2+0.5+this.position.y,
                                    this.width/2+0.5+this.position.x,this.height/2+0.5+this.position.y
                                )
                            break
                            case 20:
                                layer.translate(-this.position.x,-this.position.y)
                                layer.fillGradient(graphics.gradient[0])
                                layer.triangle(
                                    -this.width/2-0.5+this.position.x,-this.height/2-0.5+this.position.y,
                                    -this.width/2-0.5+this.position.x,this.height/2+0.5+this.position.y,
                                    this.width/2+0.5+this.position.x,-this.height/2-0.5+this.position.y
                                )
                            break
                            case 21:
                                layer.translate(-this.position.x,-this.position.y)
                                layer.fillGradient(graphics.gradient[0])
                                layer.triangle(
                                    -this.width/2-0.5+this.position.x,-this.height/2-0.5+this.position.y,
                                    this.width/2+0.5+this.position.x,-this.height/2-0.5+this.position.y,
                                    this.width/2+0.5+this.position.x,this.height/2+0.5+this.position.y
                                )
                            break
                        }
                        layer.translate(this.position.x,this.position.y)
                        for(let a=0,la=this.balls[1].length;a<la;a++){
                            layer.fill(
                                205+this.balls[1][a][3]*30,
                                212+this.balls[1][a][3]*30,
                                158+this.balls[1][a][3]*30
                            )
                            regPoly(layer,this.balls[1][a][0],this.balls[1][a][1],this.balls[1][a][5],this.balls[1][a][2]*0.4,this.balls[1][a][2]*0.4,this.balls[1][a][4])
                        }
                    break
                    case 64: case 70:
                        switch(this.type){
                            case 1:
                                layer.translate(-this.position.x,-this.position.y)
                                layer.fillGradient(graphics.gradient[0])
                                layer.rect(this.position.x,this.position.y,this.width+1,this.height+1)
                            break
                            case 17:
                                layer.translate(-this.position.x,-this.position.y)
                                layer.fillGradient(graphics.gradient[0])
                                layer.triangle(
                                    -this.width/2-0.5+this.position.x,-this.height/2-0.5+this.position.y,
                                    -this.width/2-0.5+this.position.x,this.height/2+0.5+this.position.y,
                                    this.width/2+0.5+this.position.x,this.height/2+0.5+this.position.y
                                )
                            break
                            case 18:
                                layer.translate(-this.position.x,-this.position.y)
                                layer.fillGradient(graphics.gradient[0])
                                layer.triangle(
                                    this.width/2+0.5+this.position.x,-this.height/2-0.5+this.position.y,
                                    -this.width/2-0.5+this.position.x,this.height/2+0.5+this.position.y,
                                    this.width/2+0.5+this.position.x,this.height/2+0.5+this.position.y
                                )
                            break
                            case 20:
                                layer.translate(-this.position.x,-this.position.y)
                                layer.fillGradient(graphics.gradient[0])
                                layer.triangle(
                                    -this.width/2-0.5+this.position.x,-this.height/2-0.5+this.position.y,
                                    -this.width/2-0.5+this.position.x,this.height/2+0.5+this.position.y,
                                    this.width/2+0.5+this.position.x,-this.height/2-0.5+this.position.y
                                )
                            break
                            case 21:
                                layer.translate(-this.position.x,-this.position.y)
                                layer.fillGradient(graphics.gradient[0])
                                layer.triangle(
                                    -this.width/2-0.5+this.position.x,-this.height/2-0.5+this.position.y,
                                    this.width/2+0.5+this.position.x,-this.height/2-0.5+this.position.y,
                                    this.width/2+0.5+this.position.x,this.height/2+0.5+this.position.y
                                )
                            break
                        }
                    break
                }
            break
            case 2: case 34:
                //mark 2
                switch(game.level){
                    case 6: case 45:
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
                    case 19: case 31:
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
                    case 32: case 33:
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2-10,-this.height/2-0.5,
                            -this.width/2+5,-this.height/2+12,
                            this.width/2-5,-this.height/2+12,
                            this.width/2+10,-this.height/2-0.5
                        )
                    break
                    case 67: case 68:
                        layer.fill(120,200,120)
                        layer.quad(
                            -this.width/2-15,-this.height/2-0.5,
                            -this.width/2,-this.height/2+15,
                            this.width/2,-this.height/2+15,
                            this.width/2+15,-this.height/2-0.5
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
                    case 19: case 31:
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
                    case 23: case 26: case 35:
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
                    case 32: case 33:
                        switch(this.type){
                            case 4:
                                layer.fill(220-min(480,this.reload)/5,120,120)
                                layer.quad(
                                    -this.width/2-10,-this.height/2-0.5,
                                    -this.width/2+5,-this.height/2+12,
                                    this.width/2-5,-this.height/2+12,
                                    this.width/2+10,-this.height/2-0.5
                                )
                            break
                            case 13:
                                layer.fill(220-min(480,this.reload)/5,220-min(480,this.reload)/5,120)
                                layer.quad(
                                    -this.width/2-10,-this.height/2-0.5,
                                    -this.width/2+5,-this.height/2+12,
                                    this.width/2-5,-this.height/2+12,
                                    this.width/2+10,-this.height/2-0.5
                                )
                            break
                            case 32:
                                layer.fill(170-min(480,this.reload)/10,220-min(480,this.reload)/5,120)
                                layer.quad(
                                    -this.width/2-10,-this.height/2-0.5,
                                    -this.width/2+5,-this.height/2+12,
                                    this.width/2-5,-this.height/2+12,
                                    this.width/2+10,-this.height/2-0.5
                                )
                            break
                        }
                    break
                    case 34: case 50:
                        switch(this.type){
                            case 4:
                                layer.fill(220-min(480,this.reload)/5,95,95)
                                layer.quad(
                                    -this.width/2-10,-this.height/2-0.5,
                                    -this.width/2+5,-this.height/2+12,
                                    this.width/2-5,-this.height/2+12,
                                    this.width/2+10,-this.height/2-0.5
                                )
                            break
                        }
                    break
                    case 39:
                        switch(this.type){
                            case 32:
                                layer.fill(170-min(480,this.reload)/10,220-min(480,this.reload)/5,120)
                                layer.quad(
                                    -this.width/2-10,-this.height/2-0.5,
                                    -this.width/2+5,-this.height/2+12,
                                    this.width/2-5,-this.height/2+12,
                                    this.width/2+10,-this.height/2-0.5
                                )
                            break
                        }
                    break
                    case 42:
                        switch(this.type){
                            case 4:
                                layer.fill(220-min(480,this.reload)/5,95,95)
                                layer.quad(
                                    -this.width/2-10,-this.height/2-0.5,
                                    -this.width/2+5,-this.height/2+15,
                                    this.width/2-5,-this.height/2+15,
                                    this.width/2+10,-this.height/2-0.5
                                )
                                layer.stroke(200,240,210)
                                layer.strokeWeight(6)
                                layer.line(-this.width/2-15,-this.height/2,this.width/2+15,-this.height/2)
                            break
                            case 32:
                                layer.fill(120,220-constrain(this.reload,0,480)/5,170-constrain(this.reload,0,480)/10)
                                layer.quad(
                                    -this.width/2-10,-this.height/2-0.5,
                                    -this.width/2+5,-this.height/2+15,
                                    this.width/2-5,-this.height/2+15,
                                    this.width/2+10,-this.height/2-0.5
                                )
                                layer.stroke(200,240,210)
                                layer.strokeWeight(6)
                                layer.line(-this.width/2-15,-this.height/2,this.width/2+15,-this.height/2)
                            break
                            default:
                                layer.stroke(200,240,210)
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
                }
            break
            case 15:
                switch(game.level){
                    case 19: case 31:
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
                    case 23: case 35:
                        layer.fill(220-min(480,this.reload)/5,170-min(480,this.reload)/10,120)
                        layer.quad(
                            -this.width/2,-this.height/2-0.5,
                            -this.width/2+20,-this.height/2+16,
                            this.width/2-20,-this.height/2+16,
                            this.width/2,-this.height/2-0.5
                        )
                    break
                    case 32: case 33:
                        layer.fill(220-min(480,this.reload)/5,170-min(480,this.reload)/10,120)
                        layer.quad(
                            -this.width/2-10,-this.height/2-0.5,
                            -this.width/2+5,-this.height/2+12,
                            this.width/2-5,-this.height/2+12,
                            this.width/2+10,-this.height/2-0.5
                        )
                    break
                }
            break
            case 16: case 50: case 61: case 69: case 72:
                if(this.type==16){
                    if(game.level==22){
                        layer.scale(1-game.pointAnim[2])
                    }else if(game.level==25){
                        layer.scale(1-game.pointAnim[1])
                    }
                }
                if(this.type==16||this.type==50&&game.level!=29||this.type==61||this.type==69||this.type==72){
                    layer.fill(game.level==61||game.level==64||game.level==67||game.level==68||game.level==70?250:180,1-this.recharge/60-this.hide)
                    layer.textSize(9)
                    layer.text(cutName(types.weapon[types.player[this.weapon].weapon].name),0,-this.height)
                }
                if(this.infoFade>0){
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
                    case 19: case 31:
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
                    case 23: case 35:
                        layer.fill(max(120,200-min(480,this.reload)/5),120,max(120,200-min(480,this.reload)/5))
                        layer.quad(
                            -this.width/2-20,-this.height/2-0.5,
                            -this.width/2,-this.height/2+16,
                            this.width/2,-this.height/2+16,
                            this.width/2+20,-this.height/2-0.5
                        )
                    break
                    case 32: case 33:
                        layer.fill(220-min(480,this.reload)/5,120,220-min(480,this.reload)/5)
                        layer.quad(
                            -this.width/2-10,-this.height/2-0.5,
                            -this.width/2+5,-this.height/2+12,
                            this.width/2-5,-this.height/2+12,
                            this.width/2+10,-this.height/2-0.5
                        )
                    break
                }
            break
            case 31: case 33: case 36: case 42:
                if(game.level==30||game.level==54){
                    for(let a=0,la=this.timers.length;a<la;a++){
                        graphics.overlay[0].fill(255)
                        graphics.overlay[0].textSize(10)
                        graphics.overlay[0].text(`${this.timers[a]} (${entities.players[a].stats.points})`,25+a*40,15)
                        graphics.overlay[0].fill(...playerColor(a+1))
                        graphics.overlay[0].rect(25+a*40,25,30,3,1)
                    }
                    let max=4
                    let name=''
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(entities.players[a].id==0&&entities.players[a].stats.points>max){
                            max=entities.players[a].stats.points
                            name=entities.players[a].playerData.name
                        }
                    }
                    if(max>=5){
                        graphics.overlay[0].fill(255)
                        graphics.overlay[0].textSize(10)
                        graphics.overlay[0].text(`${max}`,5+this.timers.length*20,40)
                        graphics.overlay[0].textSize(8)
                        graphics.overlay[0].text(`${name}`,5+this.timers.length*20,60)
                        graphics.overlay[0].fill(255,255,0)
                        graphics.overlay[0].rect(5+this.timers.length*20,50,30,3,1)
                    }
                }else if(game.level==67){
                    for(let a=0,la=this.timers.length;a<la;a++){
                        graphics.overlay[0].fill(255)
                        graphics.overlay[0].textSize(10)
                        graphics.overlay[0].text(`${this.timers[a]}`,25+a*40,15)
                        graphics.overlay[0].fill(...playerColor(a+1))
                        graphics.overlay[0].rect(25+a*40,25,30,3,1)
                    }
                }else if(dm()){
                    for(let a=0,la=this.timers.length;a<la;a++){
                        graphics.overlay[0].fill(255)
                        graphics.overlay[0].textSize(10)
                        graphics.overlay[0].text(`${this.timers[a][0]}`,25+a*40,15)
                        graphics.overlay[0].text(`${formatTime(this.timers[a][1])}`,25+a*40,35)
                        graphics.overlay[0].fill(...playerColor(a+1))
                        graphics.overlay[0].rect(25+a*40,25,30,3,1)
                    }
                    let max=4
                    let name=''
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(entities.players[a].id==0&&entities.players[a].stats.points>max){
                            max=entities.players[a].stats.points
                            name=entities.players[a].playerData.name
                        }
                    }
                    if(max>=5){
                        graphics.overlay[0].fill(255)
                        graphics.overlay[0].textSize(10)
                        graphics.overlay[0].text(`${max}`,5+this.timers.length*20,40)
                        graphics.overlay[0].textSize(8)
                        graphics.overlay[0].text(`${name}`,5+this.timers.length*20,60)
                        graphics.overlay[0].fill(255,255,0)
                        graphics.overlay[0].rect(5+this.timers.length*20,50,30,3,1)
                    }
                }else if(game.level==23||game.level==28||game.level==35){
                    let place=[0,0]
                    switch(game.level){
                        case 23: case 35:
                            place=this.type==42?[1,3]:[[0,1],[1,2],[1,0],[2,1],[1,1],[0,0],[2,0],[0,2],[2,2]][this.pos]
                        break
                        case 28:
                            place=[this.pos%4,floor(this.pos/4)]
                        break
                    }
                    let texts=''
                    if(game.level==19||game.level==24||game.level==27||game.level==34||game.level==36){
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
                        texts=game.level==28?['Turret','Point ','Turret','Turret','Guster','Guster','Guster','Guster'][this.pos]:this.type==42?'Rogue':this.pos>=3&&(game.level==25||game.level==26)||this.pos>=5?'Node':'Point '+'ABCDE'[game.level==28?0:this.pos]
                    }
                    graphics.overlay[0].fill(255)
                    graphics.overlay[0].textSize(10)
                    graphics.overlay[0].text(texts,25+place[0]*40,15+place[1]*25)
                    graphics.overlay[0].fill(...playerColor(this.owner))
                    graphics.overlay[0].rect(25+place[0]*40,25+place[1]*25,30,3,1)
                    if((this.type==33||this.type==63)&&(
                        game.level==23&&this.pos==4||
                        game.level==28&&this.pos==1
                    )){
                        let nudge=game.level==23?2:3
                        for(let a=0,la=this.timers.length;a<la;a++){
                            graphics.overlay[0].fill(255)
                            graphics.overlay[0].textSize(10)
                            graphics.overlay[0].text(formatTime(this.timers[a]),25+(place[0]+nudge)*40,15+a*25)
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
                            graphics.overlay[0].rect(25+(place[0]+nudge)*40,25+a*25,30,3,1)
                        }
                    }
                }else if(game.level==25||game.level==26){
                    let place=[[1,1],[2,0],[0,0],[1,0],[0,1],[2,1]][this.pos]
                    let texts=''
                    if(game.level==19||game.level==24||game.level==27||game.level==34||game.level==36){
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
                        texts=this.type==42?'Rogue':this.pos>=3&&(game.level==25||game.level==26)||this.pos>=5?'Node':'Point '+'ABCDE'[game.level==28?0:this.pos]
                    }
                    graphics.overlay[0].fill(255)
                    graphics.overlay[0].textSize(10)
                    graphics.overlay[0].text(texts,25+place[0]*40,15+place[1]*25)
                    graphics.overlay[0].fill(...playerColor(this.owner))
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
                }else if(game.level==42){
                    let place=[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[4,1]][this.pos]
                    let texts=''
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
                    graphics.overlay[0].fill(255)
                    graphics.overlay[0].textSize(10)
                    graphics.overlay[0].text(texts,25+place[0]*40,15+place[1]*25)
                    graphics.overlay[0].fill(...playerColor(this.owner))
                    graphics.overlay[0].rect(25+place[0]*40,25+place[1]*25,30,3,1)
                    if(this.type==31&&this.pos==2){
                        for(let a=0,la=this.timers.length;a<la;a++){
                            graphics.overlay[0].fill(255)
                            graphics.overlay[0].textSize(10)
                            graphics.overlay[0].text(formatTime(this.timers[a]),25+a*40,65)
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
                            graphics.overlay[0].rect(25+a*40,75,30,3,1)
                        }
                    }
                }else{
                    let texts=''
                    if(game.level==19||game.level==24||game.level==27||game.level==34||game.level==36||game.level==38||game.level==39&&!game.pvp){
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
                                texts=game.level==38?'Payload':'Rogue'
                            break
                        }
                    }else{
                        texts=game.level==39?'Point':game.level==37?'Gate':game.level==29?'Target':game.level==28?['Turret','Point ','Turret','Turret','Guster','Guster','Guster','Guster'][this.pos]:this.type==42?'Payload':this.pos>=3&&(game.level==25||game.level==26)||this.pos>=5?'Node':'Point '+'ABCDE'[game.level==28?0:this.pos]
                    }
                    graphics.overlay[0].fill(255)
                    graphics.overlay[0].textSize(10)
                    graphics.overlay[0].text(texts,25+this.pos*40,15)
                    graphics.overlay[0].fill(...playerColor(this.owner))
                    graphics.overlay[0].rect(25+this.pos*40,25,30,3,1)
                    if(this.type==31&&game.level==19&&game.pvp&&this.pos==2||this.type==31&&game.level==24||this.type==33&&game.level==23&&this.pos==4||game.level==28&&this.pos==1||this.type==31&&game.level==31&&game.pvp&&this.pos==3||game.level==33&&this.pos==0||game.level==39||game.level==49&&this.pos==3||game.level==63&&this.pos==0||game.level==69&&this.pos==2){
                        for(let a=0,la=this.timers.length;a<la;a++){
                            graphics.overlay[0].fill(255)
                            graphics.overlay[0].textSize(10)
                            graphics.overlay[0].text(formatTime(this.timers[a]),25+(this.pos-(game.level==19||game.level==69?2:0)-(game.level==31||game.level==49?3:0))*40,15+(a+1)*25)
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
                            graphics.overlay[0].rect(25+(this.pos-(game.level==19||game.level==69?2:0)-(game.level==31||game.level==49?3:0))*40,25+(a+1)*25,30,3,1)
                        }
                    }else if(this.pos==0&&(game.level==27)&&game.pvp){
                        graphics.overlay[0].fill(255)
                        graphics.overlay[0].textSize(10)
                        graphics.overlay[0].text(formatTime(min(game.time,10800)),25+(this.pos+1.5-(game.level==19||game.level==69?2:0)-(game.level==31?3:0))*40,15+25)
                    }else if(this.pos==0&&(game.level==38)&&game.pvp){
                        graphics.overlay[0].fill(255)
                        graphics.overlay[0].textSize(10)
                        graphics.overlay[0].text(formatTime(min(game.time,14400)),25+(this.pos+1.5-(game.level==19||game.level==69?2:0)-(game.level==31?3:0))*40,15+25)
                    }else if(this.pos==0&&(game.level==44||game.level==65)&&game.pvp){
                        graphics.overlay[0].fill(255)
                        graphics.overlay[0].textSize(10)
                        graphics.overlay[0].text(formatTime(min(game.time,18000)),25+(this.pos+2-(game.level==19||game.level==69?2:0)-(game.level==31?3:0))*40,15+25)
                    }else if(game.level==29&&this.pos==0){
                        for(let a=0,la=game.players;a<la;a++){
                            graphics.overlay[0].fill(255)
                            let escaped=entities.players[a].position.x<500||entities.players[a].position.x>game.edge[0]-500||entities.players[a].position.y<250&&!entities.players[a].parachute&&entities.players[a].velocity.y<2
                            graphics.overlay[0].textSize(escaped?9:10)
                            graphics.overlay[0].text(escaped?'Escaped':'Inside',25+a*40,40)
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
                            graphics.overlay[0].rect(25+a*40,50,30,3,1)
                        }
                    }else if(game.level==37){
                        if(this.pos==2){
                            graphics.overlay[0].fill(255)
                            graphics.overlay[0].textSize(10)
                            graphics.overlay[0].text(formatTime(this.left),25,35)
                        }
                        if(this.pos==0){
                            for(let a=0,la=game.players;a<la;a++){
                                graphics.overlay[0].fill(255)
                                graphics.overlay[0].textSize(10)
                                graphics.overlay[0].text(this.timers[a],25+a*40,50)
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
                                graphics.overlay[0].rect(25+a*40,60,30,3,1)
                            }
                        }
                    }
                }
            break
            case 35:
                //mark 35
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
                                layer.fill(250)
                                layer.textSize(10)
                                layer.text('Deploy',0,-this.height/2+8)
                            break
                            case 2:
                                layer.fill(250)
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
                    case 28: case 29:
                        layer.fill(220-this.reload/4)
                        layer.quad(
                            -this.width/2-5,-this.height/2-0.5,
                            -this.width/2+10,-this.height/2+12,
                            this.width/2-10,-this.height/2+12,
                            this.width/2+5,-this.height/2-0.5
                        )
                    break
                    case 30:
                        layer.fill(220-this.reload*3)
                        layer.quad(
                            -this.width/2,-this.height/2,
                            -this.width/2+15,-this.height/2+10,
                            this.width/2-15,-this.height/2+10,
                            this.width/2,-this.height/2
                        )
                    break
                    case 32: case 33:
                        layer.fill(220-this.reload/4)
                        layer.quad(
                            -this.width/2-10,-this.height/2-0.5,
                            -this.width/2+5,-this.height/2+12,
                            this.width/2-5,-this.height/2+12,
                            this.width/2+10,-this.height/2-0.5
                        )
                    break
                    case 54:
                        layer.fill(220-this.reload*6)
                        layer.quad(
                            -this.width/2+5,-this.height/2,
                            -this.width/2+20,-this.height/2+10,
                            this.width/2-20,-this.height/2+10,
                            this.width/2-5,-this.height/2
                        )
                    break
                    case 55: case 65:
                        layer.fill(220-this.reload*4/3)
                        layer.quad(
                            -this.width/2-10,-this.height/2-0.5,
                            -this.width/2+5,-this.height/2+16,
                            this.width/2-5,-this.height/2+16,
                            this.width/2+10,-this.height/2-0.5
                        )
                        layer.fill(120)
                        regTriangle(layer,0,-this.height/2+7.5+[0,-1,1][this.pos],6,6,[30,0,60][this.pos])
                    break
                    case 61:
                        layer.fill(game.tilecolor[1][0]+10,game.tilecolor[1][1]+10,game.tilecolor[1][2]+10)
                        layer.rect(0,0,this.width+1,this.height+1)
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
                    case 67:
                        layer.fill(220-this.reload*6)
                        layer.quad(
                            -this.width/2-15,-this.height/2-0.5,
                            -this.width/2,-this.height/2+15,
                            this.width/2,-this.height/2+15,
                            this.width/2+15,-this.height/2-0.5
                        )
                    break
                }
            break
            case 40:
                switch(game.level){
                    case 23: case 35:
                        layer.fill(220-min(480,this.reload)/5,70+min(480,this.reload)/10,170-min(480,this.reload)/10)
                        layer.quad(
                            -this.width/2-20,-this.height/2-0.5,
                            -this.width/2,-this.height/2+16,
                            this.width/2,-this.height/2+16,
                            this.width/2+20,-this.height/2-0.5
                        )
                    break
                    case 28:
                        layer.fill(220-min(480,this.reload)/5,70+min(480,this.reload)/10,170-min(480,this.reload)/10)
                        layer.quad(
                            -this.width/2-5,-this.height/2-0.5,
                            -this.width/2+10,-this.height/2+12,
                            this.width/2-10,-this.height/2+12,
                            this.width/2+5,-this.height/2-0.5
                        )
                    break
                }
            break
            case 43: case 44: case 45: case 46: case 47:
                switch(game.level){
                    case 42:
                        if((this.position.y-this.height/2)<game.edge[1]-game.tileset[1]*15){
                            layer.stroke(200,240,210)
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
                        }
                    break
                }
            break
            case 49: case 51: case 52: case 53: case 54:
                switch(game.level){
                    case 25: case 26:
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                220+this.balls[a][3]*40,
                                100+this.balls[a][3]*40,
                                120+this.balls[a][3]*40
                            )
                            regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]/2,this.balls[a][2]/2,this.balls[a][4])
                        }
                    break
                    case 30: case 56:
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                225+this.balls[a][3]*25,
                                125+this.balls[a][3]*50,
                                150+this.balls[a][3]*50
                            )
                            regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]/2,this.balls[a][2]/2,this.balls[a][4])
                        }
                    break
                    case 36:
                        for(let a=0,la=this.balls.length;a<la;a++){
                            layer.fill(
                                220+this.balls[a][3]*40,
                                140+this.balls[a][3]*40,
                                60+this.balls[a][3]*40
                            )
                            regPoly(layer,this.balls[a][0],this.balls[a][1],this.balls[a][5],this.balls[a][2]/2,this.balls[a][2]/2,this.balls[a][4])
                        }
                    break
                    case 61:
                        switch(this.type){
                            case 49:
                                layer.fill(game.tilecolor[1][0]+10,game.tilecolor[1][1]+10,game.tilecolor[1][2]+10)
                                layer.rect(0,0,this.width+1,this.height+1)
                            break
                            case 53:
                                layer.fill(game.tilecolor[1][0]+10,game.tilecolor[1][1]+10,game.tilecolor[1][2]+10)
                                layer.triangle(
                                    -this.width/2-0.5,-this.height/2-0.5,
                                    -this.width/2-0.5,this.height/2+0.5,
                                    this.width/2+0.5,-this.height/2-0.5
                                )
                            break
                            case 54:
                                case 61:
                                layer.fill(game.tilecolor[1][0]+10,game.tilecolor[1][1]+10,game.tilecolor[1][2]+10)
                                layer.triangle(
                                    -this.width/2-0.5,-this.height/2-0.5,
                                    this.width/2+0.5,-this.height/2-0.5,
                                    this.width/2+0.5,this.height/2+0.5
                                )
                            break
                        }
                    break
                }
            break
            case 57:
                layer.push()
                if(game.level==22){
                    layer.scale(1-game.pointAnim[2])
                }else if(game.level==49&&!game.pvp||game.level==57){
                    layer.scale(1-game.pointAnim[1])
                }
                layer.fill(game.level==64||game.level==67||game.level==68||game.level==70?250:180,1-this.recharge/60-this.hide)
                layer.textSize(9)
                layer.text(cutName(types.weapon[types.player[this.weapon].weapon].name),0,-this.height)
                layer.pop()
                if(this.infoFade>0){
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
            case 64: case 70:
                switch(game.level){
                    case 37:
                        layer.fill(39,38,49)
                        layer.rect(-this.width/3,0,this.width/3,this.height)
                        layer.rect(this.width/3,0,this.width/3,this.height)
                    break
                }
            break
            case 71:
                layer.fill(180,1-this.recharge/60-this.hide)
                layer.textSize(9)
                layer.text(cutName(cutName(types.weapon[types.player[this.weapon].weapon].name)),0,-this.height-10)
                layer.text(cutName(cutName(types.weapon[types.player[this.weapon2].weapon].name)),0,-this.height)
            break
        }
        layer.pop()
        if(game.bound){
            this.displayBound(layer)
        }
    }
    displayOver2(layer){
        layer.push()
        layer.translate(this.position.x,this.position.y)
        layer.noStroke()
        switch(this.type){
            case 1: case 17: case 18: case 20: case 21:
                switch(game.level){
                    case 64: case 70:
                        for(let a=0,la=this.balls[1].length;a<la;a++){
                            layer.fill(
                                168+this.balls[1][a][3]*30,
                                135+this.balls[1][a][3]*30,
                                120+this.balls[1][a][3]*30
                            )
                            regPoly(layer,this.balls[1][a][0],this.balls[1][a][1],this.balls[1][a][5],this.balls[1][a][2]*0.4,this.balls[1][a][2]*0.4,this.balls[1][a][4])
                        }
                    break
                }
            break
        }
        layer.pop()
    }
    displayBound(layer){
        layer.stroke(50+(this.mutate?100:0),50+this.type*100,200)
        layer.strokeWeight(4)
        layer.noFill()
        for(let a=0,la=8;a<la;a++){
            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                layer.line(
                    this.boundary[a][b][0].x+(a==2?-2:a==3?2:2),
                    this.boundary[a][b][0].y+(a==0?-2:a==1?2:2),
                    this.boundary[a][b][1].x+(a==2?-2:a==3?2:-2),
                    this.boundary[a][b][1].y+(a==0?-2:a==1?2:-2)
                )
            }
        }
        //layer.rect(this.bounder.position.x,this.bounder.position.y,this.bounder.width,this.bounder.height)
    }
    update(){
        this.time++
        switch(this.type){
            case 2:
                if((game.level==19||game.level==31)&&this.reload>0){
                    this.reload-=(game.level==19||game.level==31?1/3:1)
                }
            break
            case 3:
                switch(game.level){
                    case 25: case 26:
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
                    break
                    case 30: case 56: case 59: case 60: case 67: case 68:
                        this.bounder.position.x=this.position.x+this.width/2
                        this.bounder.position.y=this.position.y+this.height/2
                        this.bounder.width=this.width
                        this.bounder.height=this.height
                    break
                    case 69:
                        this.height=this.base.height*(0.9+sin(this.time/20)*0.5)
                        this.position.y=this.base.position.y+this.base.height-this.height
                        this.bounder.position.x=this.position.x+this.width/2
                        this.bounder.position.y=this.position.y+this.height/2
                        this.bounder.width=this.width
                        this.bounder.height=this.height
                    break
                }
            break
            case 4: case 23: case 32: case 35: case 40:
                if(game.level==61&&this.type==35){
                    if(game.elevate==0&&this.position.y>this.base.position.y){
                        this.position.y-=1.5
                        this.bounder.position.y-=1.5
                        this.internalBounder.position.y-=1.5
                        this.velocity.y=-1.5
                        for(let a=0,la=this.boundary.length;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                    this.boundary[a][b][c].y-=1.5
                                }
                            }
                        }
                    }else if(game.elevate==1&&this.position.y<this.base.position.y+game.tileset[1]*6){
                        this.position.y+=1.5
                        this.bounder.position.y+=1.5
                        this.internalBounder.position.y+=1.5
                        this.velocity.y=1.5
                        for(let a=0,la=this.boundary.length;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                    this.boundary[a][b][c].y+=1.5
                                }
                            }
                        }
                    }else{
                        this.velocity.y=0
                    }
                }
                if(this.reload>0){
                    if(this.type==35&&game.level==29){
                        if(this.position.y>200){
                            let speed=-2
                            this.position.y+=speed
                            this.bounder.position.y+=speed
                            this.velocity.y=speed
                            for(let a=0,la=this.boundary.length;a<la;a++){
                                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                        this.boundary[a][b][c].y+=speed
                                    }
                                }
                            }
                            for(let d=0,ld=entities.walls[1].length;d<ld;d++){
                                if(entities.walls[1][d].type==46||entities.walls[1][d].type==47){
                                    let e=entities.walls[1][d]
                                    e.position.y+=speed
                                    e.bounder.position.y+=speed
                                    e.velocity.y=speed
                                    for(let a=0,la=e.boundary.length;a<la;a++){
                                        for(let b=0,lb=e.boundary[a].length;b<lb;b++){
                                            for(let c=0,lc=e.boundary[a][b].length;c<lc;c++){
                                                e.boundary[a][b][c].y+=speed
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }else{
                        this.reload-=(game.level==28&&this.type==40?0.225:game.level==28&&this.type==35?1/3:game.level==25||game.level==26?0.225:game.level==24?0.225:game.level==22||game.level==23||game.level==33||game.level==40||game.level==49&&this.type==32||game.level==59||game.level==69?0.5:(game.level==19||game.level==31)&&this.type!=35&&!(this.type==32&&game.pvp)?1/3:1)*(this.type==32&&game.level==42?2/3:1)*(this.type==35&&game.level==42?1/6:1)
                    }
                }else if(game.level==42&&this.type==32){
                    this.reload--
                    //pls fix
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
            case 8: case 9: case 12: case 27: case 41: case 50: case 57: case 61: case 63: case 65: 
            case 66: case 67: case 68: case 69: case 70: case 71: case 72: case 73: case 75:
                if(this.rainbow&&this.time%15==0){
                    switch(this.type){
                        case 61: this.type=70; break
                        case 70: this.type=27; break
                        case 27: this.type=66; break
                        case 66: this.type=12; break
                        case 12: this.type=69; break
                        case 69: this.type=50; break
                        case 50: this.type=61; break
                    }
                }
                if(game.level!=29&&game.level!=37||this.type==57){
                    if(this.recharge>0){
                        this.recharge--
                    }
                    if((this.type==8||this.type==27)&&this.falling>0&&game.level==16){
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
                    if(this.type==50||this.type==57||this.type==61||this.type==69||this.type==72){
                        let visible=false
                        for(let a=0,la=game.gaming;a<la;a++){
                            if(dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)<150){
                                visible=true
                            }
                        }
                        this.infoFade=smoothAnim(this.infoFade,visible,0,1,5)
                        if(game.level==49&&game.pvp){
                            this.visible=smoothAnim(this.visible,game.point[1]>0&&game.point[1]<=game.players&&(abs(entities.players[game.point[1]-1].position.x-this.position.x)<300&&abs(entities.players[game.point[1]-1].position.y-this.position.y)<120),0,1,10)
                        }
                    }
                }
                if(game.level==55&&this.pos>=0){
                    if(this.position.x>(127.5+4*this.pos)*game.tileset[0]){
                        this.position.x-=3
                        this.bounder.position.x-=3
                        this.velocity.x=-3
                        for(let a=0,la=this.boundary.length;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                    this.boundary[a][b][c].x-=3
                                }
                            }
                        }
                    }
                    if(this.position.y>this.base.position.y-game.tileset[1]*3&&(this.pos==6||this.pos==8)){
                        this.position.y-=2
                        this.bounder.position.y-=2
                        this.velocity.y=-2
                        for(let a=0,la=this.boundary.length;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                    this.boundary[a][b][c].y-=2
                                }
                            }
                        }
                    }else if(this.pos==7){
                        if(this.hide<1){
                            this.hide+=0.1
                        }
                        if(this.position.y<this.base.position.y+game.tileset[1]*3){
                            this.position.y+=2
                            this.bounder.position.y+=2
                            this.velocity.y=2
                            for(let a=0,la=this.boundary.length;a<la;a++){
                                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                        this.boundary[a][b][c].y+=2
                                    }
                                }
                            }
                        }else{
                            this.remove=true
                        }
                    }
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
                    this.reload-=(game.level==23?(this.reduction?0.5:0.225):game.level==19||game.level==26||game.level==31|game.level==33?0.5:1)
                    if((this.reload==479||this.reload==459||this.reload==439||this.reload==419||this.reload==399)&&game.level!=23&&game.level!=26||this.reload==469&&(game.level==32||game.level==33)){
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
                            case 19: case 31:
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
                            case 32: case 33:
                                if(this.reload==479||this.reload==469){
                                    if(this.position.x<game.tileset[0]*180){
                                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,97,-120+random(-15,15),this.align,400,600,false,-1))
                                    }else{
                                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,97,120+random(-15,15),this.align,400,600,false,-1))
                                    }
                                    let mult=random(1,1.5)
                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                }
                            break
                            case 49:
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x+this.width/2-25,this.position.y,65,random(97.5,112.5),this.align,200,180,false,-1))
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
                    this.reload-=(game.level==19||game.level==31||game.level==55?0.5:1)
                    if(game.level!=55){
                        switch(game.level){
                            case 19: case 22: case 23: case 24: case 31: case 35:
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
                            case 32: case 33:
                                if(this.reload>=431&&this.reload<=479&&this.reload%16==15){
                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,5,-120+random(-15,15),this.align,120,300,false,-1))
                                    let mult=random(1.2,1.8)
                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,5,120+random(-15,15),this.align,120,300,false,-1))
                                    mult=random(1.2,1.8)
                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                }
                            break
                            case 49:
                                if(this.reload>=399&&this.reload<=479&&this.reload%16==15){
                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,5,-110+random(-15,15),this.align,120,300,false,-1))
                                    let mult=random(1,1.5)
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
                if(this.recharge>0&&game.level!=13&&game.level!=29&&game.level!=14&&game.level!=35&&game.level!=37){
                    this.recharge--
                }
                if(this.falling>0&&game.level==16){
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
                if(game.level==55&&this.pos>=0){
                    if(this.position.x>(127.5+4*this.pos)*game.tileset[0]){
                        this.position.x-=3
                        this.bounder.position.x-=3
                        this.velocity.x=-3
                        for(let a=0,la=this.boundary.length;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                    this.boundary[a][b][c].x-=3
                                }
                            }
                        }
                    }
                    if(this.position.y>this.base.position.y-game.tileset[1]*3&&(this.pos==6||this.pos==8)){
                        this.position.y-=2
                        this.bounder.position.y-=2
                        this.velocity.y=-2
                        for(let a=0,la=this.boundary.length;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                    this.boundary[a][b][c].y-=2
                                }
                            }
                        }
                    }else if(this.pos==7){
                        if(this.hide<1){
                            this.hide+=0.1
                        }
                        if(this.position.y<this.base.position.y+game.tileset[1]*3){
                            this.position.y+=2
                            this.bounder.position.y+=2
                            this.velocity.y=2
                            for(let a=0,la=this.boundary.length;a<la;a++){
                                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                        this.boundary[a][b][c].y+=2
                                    }
                                }
                            }
                        }else{
                            this.remove=true
                        }
                    }
                }
            break
            case 31:
                if((game.level==19||game.level==42)&&game.pvp&&this.owner>0&&this.owner<=game.players&&this.owner==game.point[6]){
                    this.timers[this.owner-1]++
                }else if((game.level==24||game.level==39)&&this.owner>0&&this.owner<=game.players){
                    this.timers[this.owner-1]++
                }else if(game.level==31&&game.pvp){
                    for(let a=0,la=entities.walls[1].length;a<la;a++){
                        if(entities.walls[1][a].owner>0&&entities.walls[1][a].owner<=game.players){
                            this.timers[entities.walls[1][a].owner-1]++
                        }
                    }
                }
            break
            case 33:
                //mark 33
                if(game.level==61){
                    if(game.elevate==0&&this.position.y>this.base.position.y){
                        this.position.y-=1.5
                        this.bounder.position.y-=1.5
                        this.internalBounder.position.y-=1.5
                        this.velocity.y=-1.5
                        for(let a=0,la=this.boundary.length;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                    this.boundary[a][b][c].y-=1.5
                                }
                            }
                        }
                    }else if(game.elevate==1&&this.position.y<this.base.position.y+game.tileset[1]*6){
                        this.position.y+=1.5
                        this.bounder.position.y+=1.5
                        this.internalBounder.position.y+=1.5
                        this.velocity.y=1.5
                        for(let a=0,la=this.boundary.length;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                    this.boundary[a][b][c].y+=1.5
                                }
                            }
                        }
                    }else{
                        this.velocity.y=0
                    }
                }
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
                }else if(game.level==26&&this.pos==2){
                    for(let a=0,la=game.point.length;a<la;a++){
                        if(game.point[a]>0&&game.point[a]<=game.players){
                            this.timers[game.point[a]-1]++
                        }
                    }
                }else if((game.level==28||game.level==49||game.level==69)&&this.owner>0&&this.owner<=game.players){
                    this.timers[this.owner-1]++
                }else if((game.level==33||game.level==63)&&game.pvp){
                    for(let a=0,la=entities.walls[1].length;a<la;a++){
                        if(entities.walls[1][a].owner>0&&entities.walls[1][a].owner<=game.players){
                            this.timers[entities.walls[1][a].owner-1]++
                        }
                    }
                }else if(dm()){
                    if(this.owner>0){
                        this.timers[this.owner-1][1]+=game.players>=4?1.5:1.25
                        if(this.timers[this.owner-1][1]>=3600){
                            this.endTime++
                            if(this.endTime>30){
                                this.timers[this.owner-1][0]++
                                entities.players=[]
                                newLoop()
                            }
                        }
                    }
                    let alive=0
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(entities.players[a].id>0&&!entities.players[a].construct&&!entities.players[a].sidekick&&!entities.players[a].fort&&!entities.players[a].auto&&entities.players[a].life>0){
                            alive++
                        }
                    }
                    if(alive<=1&&game.players>=2){
                        this.endTime++
                        if(this.endTime>120){
                            for(let a=0,la=entities.players.length;a<la;a++){
                                if(entities.players[a].id>0&&!entities.players[a].construct&&!entities.players[a].sidekick&&!entities.players[a].fort&&!entities.players[a].auto&&entities.players[a].life>0){
                                    this.timers[entities.players[a].id-1][0]++
                                }
                            }
                            entities.players=[]
                            newLoop()
                        }
                    }
                }else if(game.level==37){
                    if(this.left>0){
                        this.left--
                    }else if(this.owner==0&&this.pos==2){
                        this.endTime++
                        if(this.endTime>120){
                            game.newWave=true
                        }
                    }
                    if(this.pos==0){
                        let total=0
                        for(let a=0,la=entities.walls[1].length;a<la;a++){
                            if(entities.walls[1][a].type==58){
                                total++
                            }
                        }
                        if(total==0){
                            this.endTime++
                            if(this.endTime>120){
                                game.newWave=true
                            }
                        }
                        let alive=0
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if(entities.players[a].id>0&&!entities.players[a].construct&&!entities.players[a].sidekick&&!entities.players[a].fort&&!entities.players[a].auto&&entities.players[a].life>0){
                                alive++
                            }
                        }
                        if(alive<=0){
                            this.endTime++
                            if(this.endTime>120){
                                for(let a=0,la=entities.players.length;a<la;a++){
                                    if(entities.players[a].id>0&&!entities.players[a].construct&&!entities.players[a].sidekick&&!entities.players[a].fort&&!entities.players[a].auto&&entities.players[a].life>0){
                                        this.timers[entities.players[a].id-1][0]++
                                    }
                                }
                                game.newWave=true
                            }
                        }
                    }
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
                }else if(game.level==61&&this.pos!=2){
                    if(game.elevate!=this.pos&&this.width>game.tileset[0]*2){
                        this.width-=0.8
                        this.bounder.width-=0.8
                        if(this.position.x<game.edge[0]/2){
                            this.position.x-=0.4
                            this.bounder.position.x-=0.4
                            this.velocity.x=-0.4
                            for(let a=0,la=this.boundary.length;a<la;a++){
                                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                        if(this.boundary[a][b][c].x>this.position.x){
                                            this.boundary[a][b][c].x-=0.8
                                        }
                                    }
                                }
                            }
                        }else{
                            this.position.x+=0.4
                            this.bounder.position.x+=0.4
                            this.velocity.x=0.4
                            for(let a=0,la=this.boundary.length;a<la;a++){
                                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                        if(this.boundary[a][b][c].x<this.position.x){
                                            this.boundary[a][b][c].x+=0.8
                                        }
                                    }
                                }
                            }
                        }
                    }else if(game.elevate==this.pos&&this.width<game.tileset[0]*7){
                        this.width+=0.8
                        this.bounder.width+=0.8
                        if(this.position.x>game.edge[0]/2){
                            this.position.x-=0.4
                            this.bounder.position.x-=0.4
                            this.velocity.x=-0.4
                            for(let a=0,la=this.boundary.length;a<la;a++){
                                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                        if(this.boundary[a][b][c].x<this.position.x){
                                            this.boundary[a][b][c].x-=0.8
                                        }
                                    }
                                }
                            }
                        }else{
                            this.position.x+=0.4
                            this.bounder.position.x+=0.4
                            this.velocity.x=0.4
                            for(let a=0,la=this.boundary.length;a<la;a++){
                                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                        if(this.boundary[a][b][c].x>this.position.x){
                                            this.boundary[a][b][c].x+=0.8
                                        }
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
                }else if(game.level==33&&this.position.x<400||game.level==63){
                    if(deployer.timer>0){
                        if(this.position.y<this.base.position.y+this.height){
                            this.position.y++
                            this.bounder.position.y++
                            this.internalBounder.position.y++
                            this.velocity.y=1
                            for(let a=0,la=this.boundary.length;a<la;a++){
                                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                        this.boundary[a][b][c].y++
                                    }
                                }
                            }
                        }
                    }else{
                        if(this.position.y>this.base.position.y){
                            this.position.y--
                            this.bounder.position.y--
                            this.internalBounder.position.y--
                            this.velocity.y=-1
                            for(let a=0,la=this.boundary.length;a<la;a++){
                                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                        this.boundary[a][b][c].y--
                                    }
                                }
                            }
                        }
                    }
                }else if(game.level==37){
                    if(
                        game.point[0]!=0&&abs(this.position.x-game.tileset[0]*70.5)<1||
                        game.point[1]!=0&&abs(this.position.x-game.tileset[0]*126.5)<1||
                        game.point[2]!=0&&abs(this.position.x-game.tileset[0]*182.5)<1
                    ){
                        if(this.position.y<this.base.position.y+this.height){
                            this.position.y++
                            this.bounder.position.y++
                            this.internalBounder.position.y++
                            this.velocity.y=1
                            for(let a=0,la=this.boundary.length;a<la;a++){
                                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                        this.boundary[a][b][c].y++
                                    }
                                }
                            }
                        }
                    }else if((abs(this.position.x-game.tileset[0]*70.5)<1||abs(this.position.x-game.tileset[0]*126.5)<1)&&this.time%5==0&&this.position.y<this.base.position.y+game.tileset[1]){
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if(entities.players[a].position.y<this.position.y-this.height/2&&abs(entities.players[a].position.x-this.position.x)<abs(entities.players[a].position.y-(this.position.y-this.height/2))){
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2-4,4,atan2(entities.players[a].position.x-this.position.x,this.position.y-this.height/2-entities.players[a].position.y)+random(-15,15),-1,200,180,false,-1))
                            }
                        }
                    }
                }else if(game.level==40){
                    if(this.base.height<20){
                        if(game.point[0]==0&&abs(this.position.y-game.tileset[1]*38)<game.tileset[1]||game.point[1]==0){
                            if(this.height<game.tileset[1]*(abs(this.position.x-game.tileset[0]*69.5)<1?2:1.25)){
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
                        }else{
                            if(this.height>10){
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
                        }
                    }
                }else if(game.level==43&&display.cycle>=4){
                    if(this.height>0){
                        this.height-=0.1
                        this.bounder.height-=0.1
                        this.internalBounder.height-=0.1
                        this.position.y+=0.05
                        this.bounder.position.y+=0.05
                        this.internalBounder.position.y+=0.05
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
                    }
                }else if(game.level==47){
                    if(game.point[0]==0&&this.position.x<game.tileset[0]*75||game.point[1]==0){
                        if(this.position.y<this.base.position.y){
                            this.position.y+=0.5
                            this.bounder.position.y+=0.5
                            this.internalBounder.position.y+=0.5
                            this.velocity.y=0.5
                            for(let a=0,la=this.boundary.length;a<la;a++){
                                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                        this.boundary[a][b][c].y+=0.5
                                    }
                                }
                            }
                        }
                    }else{
                        if(this.position.y>this.base.position.y-this.height+5){
                            this.position.y-=0.5
                            this.bounder.position.y-=0.5
                            this.internalBounder.position.y-=0.5
                            this.velocity.y=-0.5
                            for(let a=0,la=this.boundary.length;a<la;a++){
                                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                    for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                        this.boundary[a][b][c].y-=0.5
                                    }
                                }
                            }
                        }
                    }
                }else if(game.level==49){
                    if(this.base.height<=10&&!game.pvp){
                        if(game.point[2]==0){
                            if(this.height<game.tileset[1]*3){
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
                        }else{
                            if(this.height>10){
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
                                            if(a==0||a==2&&c==1||a==3&&c==1){
                                                this.boundary[a][b][c].y-=0.1
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }else if(game.pvp){
                        if(game.point[2]>0&&game.point[2]<=game.players&&abs(this.base.position.x-entities.players[game.point[2]-1].position.x)<200&&abs(this.base.position.y+this.base.height/2-entities.players[game.point[2]-1].position.y)<75&&this.position.y>game.tileset[1]*30){
                            if(this.height>0){
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
                                            if(this.boundary[a][b][c].y>this.position.y){
                                                this.boundary[a][b][c].y-=1
                                            }
                                        }
                                    }
                                }
                            }
                        }else{
                            if(this.height<this.base.height){
                                this.height+=1
                                this.bounder.height+=1
                                this.internalBounder.height+=1
                                this.position.y+=0.5
                                this.bounder.position.y+=0.5
                                this.internalBounder.position.y+=0.5
                                this.velocity.y=0.5
                                for(let a=0,la=this.boundary.length;a<la;a++){
                                    for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                        for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                            if(a==0||a==2&&c==1||a==3&&c==1){
                                                this.boundary[a][b][c].y+=1
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            break
            case 49: case 53: case 54:
                if(game.level==61){
                    if(game.elevate==0&&this.position.y>this.base.position.y){
                        this.position.y-=1.5
                        this.bounder.position.y-=1.5
                        this.internalBounder.position.y-=1.5
                        this.velocity.y=-1.5
                        for(let a=0,la=this.boundary.length;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                    this.boundary[a][b][c].y-=1.5
                                }
                            }
                        }
                    }else if(game.elevate==1&&this.position.y<this.base.position.y+game.tileset[1]*6){
                        this.position.y+=1.5
                        this.bounder.position.y+=1.5
                        this.internalBounder.position.y+=1.5
                        this.velocity.y=1.5
                        for(let a=0,la=this.boundary.length;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                    this.boundary[a][b][c].y+=1.5
                                }
                            }
                        }
                    }else{
                        this.velocity.y=0
                    }
                }
            break
            case 74:
                let visible74=false
                for(let a=0,la=game.players;a<la;a++){
                    if(
                        abs(entities.players[a].position.x-this.base.position.x)<250&&abs(entities.players[a].position.y-(this.base.position.y+this.base.height/2))<100&&
                        entities.players[a].id>0&&entities.players[a].life>0&&
                        !(game.level==67&&(entities.players[a].id==1&&this.position.x>game.edge[0]/2||entities.players[a].id==2&&this.position.x<game.edge[0]/2))
                    ){
                        visible74=true
                    }
                }
                if(visible74){
                    if(this.height>0){
                        this.height-=2
                        this.bounder.height-=2
                        this.internalBounder.height-=2
                        this.position.y-=1
                        this.bounder.position.y-=1
                        this.internalBounder.position.y-=1
                        this.velocity.y=-1
                        for(let a=0,la=this.boundary.length;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                    if(this.boundary[a][b][c].y>this.position.y){
                                        this.boundary[a][b][c].y-=2
                                    }
                                }
                            }
                        }
                    }
                }else{
                    if(this.height<this.base.height){
                        this.height+=2
                        this.bounder.height+=2
                        this.internalBounder.height+=2
                        this.position.y+=1
                        this.bounder.position.y+=1
                        this.internalBounder.position.y+=1
                        this.velocity.y=1
                        for(let a=0,la=this.boundary.length;a<la;a++){
                            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                                for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                    if(a==0||a==2&&c==1||a==3&&c==1){
                                        this.boundary[a][b][c].y+=2
                                    }
                                }
                            }
                        }
                    }
                }
            break
        }
        if(this.reload<=0&&this.reload!=-1&&!(game.level==42&&this.type==32)){
            this.reload=0
        }
        if(this.type!=7&&this.type!=55&&this.height>1){
            for(let a=0,la=this.collide.length;a<la;a++){
                for(let b=0,lb=this.collide[a].length;b<lb;b++){
                    let c=this.collide[a][b]
                    if(
                        a==0&&
                        this.type!=3&&this.type!=5&&this.type!=8&&this.type!=9&&this.type!=10&&this.type!=11&&this.type!=12&&this.type!=14&&this.type!=16&&this.type!=27&&
                        this.type!=31&&this.type!=33&&this.type!=36&&this.type!=39&&this.type!=41&&this.type!=42&&this.type!=50&&this.type!=57&&this.type!=61&&this.type!=62&&
                        this.type!=63&&this.type!=65&&this.type!=66&&this.type!=67&&this.type!=68&&this.type!=69&&this.type!=70&&this.type!=71&&this.type!=72&&this.type!=75&&
                        this.type!=76&&
                        !((this.type==37||this.type==24&&(game.level==59||game.level==60))&&c.position.y<c.previous.position.y)&&
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
                            c.type==328||c.type==329||c.type==344||c.type==349||c.type==353
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
                                                if(c.bounces>=4){
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
                                                if(c.bounces>=4){
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
                                                if(c.bounces>=4){
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
                                                if(c.bounces>=4){
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
                                                if(c.bounces>=4){
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
                                                if(c.bounces>=4){
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
                                                if(c.bounces>=4){
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
                                                if(c.bounces>=4){
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
                                                if(c.bounces>=4){
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
                                                if(c.bounces>=4){
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
                                    c.type==286||c.type==304||c.type==314||c.type==323||c.type==329||
                                    c.type==349
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
                                    if(c.bounces>=4){
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
                                }else if((c.type==344||c.type==353)&&c.active){
                                    c.explode()
                                    c.active=false
                                    c.velocity.x=0
                                    c.velocity.y=0
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
                                    if(c.bounces>=4){
                                        c.explode()
                                        c.active=false
                                    }
                                }
                            }
                        }
                     }else if(a==0&&((inBoxBox(this.bounder,c)||this.type==17||this.type==18||this.type==19||this.type==21||this.type==44||this.type==45||this.type==46||this.type==47||this.type==51||this.type==52||this.type==53||this.type==54))&&c.active&&
                        this.type!=3&&this.type!=5&&this.type!=8&&this.type!=9&&this.type!=10&&this.type!=11&&this.type!=12&&this.type!=14&&this.type!=16&&this.type!=27&&
                        this.type!=31&&this.type!=33&&this.type!=36&&this.type!=39&&this.type!=41&&this.type!=42&&this.type!=50&&this.type!=57&&this.type!=61&&this.type!=62&&
                        this.type!=63&&this.type!=66&&this.type!=67&&this.type!=68&&this.type!=69&&this.type!=70&&this.type!=71&&this.type!=72&&this.type!=75&&this.type!=76
                        &&!((this.type==37||this.type==24&&(game.level==59||game.level==60))&&c.position.y<c.previous.position.y)
                        &&!(this.type==65&&this.recharge>0)
                    ){
                        let d=collideBoxBox(this,c)
                        let proxyC={position:c.position,width:c.width*min(c.timer/10+0.2,1),height:c.height*min(c.timer/10+0.2,1)}
                        if(
                            d>=0&&!this.redundant[d]&&c.timer>8||
                            inBoxBox(this,proxyC)&&this.type!=17&&this.type!=18&&this.type!=20&&this.type!=21&&this.type!=44&&this.type!=45&&this.type!=46&&this.type!=47&&this.type!=51&&this.type!=52&&this.type!=53&&this.type!=54&&this.type!=59&&this.type!=60||
                            (this.type==17||this.type==18||this.type==19||this.type==21||this.type==44||this.type==45||this.type==46||this.type==47||this.type==51||this.type==52||this.type==53||this.type==54)&&inTriangleBoxBasic(this.triangle,proxyC)
                        ){
                            if(
                                c.type!=7&&c.type!=23&&c.type!=25&&c.type!=32&&c.type!=37&&
                                c.type!=40&&c.type!=46&&c.type!=79&&c.type!=84&&c.type!=89&&
                                c.type!=100&&c.type!=103&&c.type!=112&&c.type!=193&&c.type!=194&&
                                c.type!=195&&c.type!=270&&c.type!=297&&c.type!=310&&c.type!=330&&
                                c.type!=335
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
                                    c.type==307||c.type==308||c.type==313||c.type==336||c.type==351
                                ){
                                    c.explode()
                                }
                            }
                        }
                    }else if(a==1&&inBoxBox(this.bounder,c)&&this.type!=36&&this.type!=39&&this.type!=42&&this.type!=62&&this.type!=67
                        &&!(this.type==5&&(c.id>0&&!game.attacker&&game.level!=17&&game.level!=18||c.id==0&&(game.attacker||game.level==17||game.level==18)||this.exploded))
                        &&!(this.type==8&&(c.id<=0||this.recharge>0||c.weaponType==-1
                            ||!game.classWeapon&&(c.weapon.uses>=(c.weaponData.uses==1?c.weaponData.uses:c.weaponData.uses*c.ammoMult)||c.weapon.uses<=0)
                            ||game.classWeapon&&(c.subWeaponA.uses>=(c.subWeaponAData.uses==1?c.subWeaponAData.uses:c.subWeaponAData.uses*c.ammoMult)||c.subWeaponA.uses<=0)
                            ||c.construct||c.sidekick))
                        &&!((this.type==9||this.type==41||this.type==63)&&(this.time<45||c.id<=0||this.recharge>0||c.life>=c.base.life||c.construct||c.sidekick||c.auto))
                        &&!((this.type==10||this.type==14)&&(c.id>0&&c.id<=game.gaming))
                        &&!((this.type==12||this.type==70||this.type==76)&&(c.id<=0||this.recharge>0||c.construct))
                        &&!((this.type==16||this.type==50||this.type==61||this.type==69||this.type==71||this.type==72)&&(c.id<=0||c.id>game.gaming&&game.level!=27&&game.level!=38&&game.level!=44||this.recharge>0||c.construct||c.auto||c.playerData.name=='PlayerVIP'))
                        &&!((this.type==27||this.type==57)&&(c.id<=0||this.recharge>0||c.construct||c.sidekick||c.fort||c.auto||c.playerData.name=='PlayerVIP'))
                        &&!(this.type==65&&this.recharge>0)
                        &&!((this.type==68||this.type==73)&&(this.time<45||c.id<=0||this.recharge>0||c.life>=c.base.life*2||c.construct||c.sidekick||c.auto))
                        &&!(this.type==75&&(this.time<45||c.id<=0||this.recharge>0||c.life>=c.base.life&&c.weaponType!=-1&&!game.pvp||c.construct||c.sidekick||c.auto))
                        &&!(this.type==1&&dm()&&this.position.y<game.tileset[1]*10&&this.time>600)
                    ){
                        let clump
                        switch(this.type){
                            case 3:
                                if(
                                    game.level==25||game.level==26||game.level==30||game.level==32||game.level==33||game.level==55||game.level==56||game.level==59||game.level==60||game.level==65||
                                    game.level==67||game.level==68||game.level==69
                                ){
                                    c.velocity.x*=0.925
                                    c.velocity.y*=0.6
                                    c.jump.time=1
                                    c.jump.active=1
                                    c.wet=1
                                    if(game.level==69){
                                        c.velocity.y*=0.8
                                        c.takeDamage(2.5)
                                        c.collect.time=max(c.collect.time,300)
                                    }
                                }else if(game.level==28&&this.position.y>game.edge[1]-650||game.level==41){
                                    c.velocity.x*=0.9
                                    c.velocity.y*=0.6
                                    c.jump.time=1
                                    c.jump.active=1
                                    c.wet=1
                                    c.chillTime=max(c.chillTime,900)
                                }else{
                                    c.velocity.y=-10
                                    c.takeDamage(50)
                                    c.collect.time=max(c.collect.time,300)
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
                                    if(game.classWeapon){
                                        c.subWeaponA.uses=min(c.subWeaponAData.uses==1?c.subWeaponAData.uses:c.subWeaponAData.uses*c.ammoMult,c.subWeaponA.uses+ceil(c.subWeaponAData.uses*c.ammoMult/2))
                                        c.subWeaponA.cooldown=min(c.subWeaponA.cooldown,30)
                                    }else{
                                        c.weapon.uses=min(c.weaponData.uses==1?c.weaponData.uses:c.weaponData.uses*c.ammoMult,c.weapon.uses+ceil(c.weaponData.uses*c.ammoMult/2*(listing[1].includes(c.playerType)?1/3:1)))
                                        c.weapon.cooldown=min(c.weapon.cooldown,30)
                                    }
                                    if(game.level==6){
                                        this.type=[9,12][floor(random(0,2))]
                                    }
                                    if(game.level==55){
                                        this.remove=true
                                    }
                                }
                            break
                            case 9:
                                this.recharge=1800-(game.gaming-1)*300
                                c.life=min(max(c.life,c.base.life),c.life+c.base.life/2)
                                if(game.level==6){
                                    this.type=[8,12][floor(random(0,2))]
                                }
                                if(game.level==55){
                                    this.remove=true
                                }
                            break
                            case 10:
                                c.manage[0]=1
                                c.manage[2]=1
                                c.target.position.x=this.position.x+game.tileset[0]
                            break
                            case 11:
                                if(!(game.level==22&&(abs(this.base.position.y-game.tileset[1]*49.75)<1||abs(this.base.position.y-game.tileset[1]*48.75)<1)&&!game.point[1])){
                                    if(game.level==23){
                                        if(this.height>=this.base.height){
                                            c.defendBuff=max(c.defendBuff,15)
                                        }
                                    }else if((c.id>0&&!game.attacker||c.id==0&&game.attacker)&&!c.fort){
                                        c.defendBuff=max(c.defendBuff,15)
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
                                c.critBuff=max(c.critBuff,game.level==55?600:240)
                                if(game.level==6){
                                    this.type=[8,9][floor(random(0,2))]
                                }
                                if(game.level==55){
                                    this.remove=true
                                }
                            break
                            case 14:
                                c.manage[0]=0
                                c.manage[2]=1
                                c.target.position.x=this.position.x-game.tileset[0]
                            break
                            case 16:
                                if(types.player[this.weapon].name=='PlayerClassWars'){
                                    game.level=menu.level
                                    entities.players=[]
                                    game.weapon=[[this.weapon]]
                                    if(game.level==29){
                                        newWave()
                                    }else{
                                        newLoop()
                                    }
                                }else if(game.level==16){
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
                                    let chunk=game.classWeapon?3:game.peakWeapon?1:game.level==27&&game.pvp?0:floor(random(0,1.5))
                                    this.weapon=listing[chunk][floor(random(listing[chunk].length))]
                                }else if(game.level==41||game.level==52||game.level==53||game.level==56){
                                    let playerLength=entities.players.length
                                    c.newWeaponSet(this.weapon)
                                    c.parachute=true
                                    this.recharge=99999
                                    if(entities.players.length>playerLength){
                                        for(let e=playerLength,le=entities.players.length;e<le;e++){
                                            entities.players[e].parachute=true
                                        }
                                    }
                                }else if(game.level!=13&&game.level!=14&&game.level!=48&&game.level!=57){
                                    if(!(game.level==22&&game.pointAnim[2]>=1)&&!((game.level==23||game.level==26)&&this.visible<1)&&!(game.level==25&&!game.point[1])){
                                        c.newWeaponSet(this.weapon)
                                        let chunk=game.classWeapon?3:game.peakWeapon?1:dm()?0:game.level==27&&game.pvp?1:floor(random(0,1.5))
                                        if(types.player[this.weapon].name=='PlayerVIP'){
                                            this.remove=true
                                        }
                                        this.weapon=listing[chunk][floor(random(listing[chunk].length))]
                                        this.recharge=game.level==27&&game.pvp?14400:game.level==23?1200:3600-(game.gaming-1)*600
                                    }
                                }else if(!game.weapon[c.id-1].includes(this.weapon)&&(game.level==13&&game.weapon[c.id-1].length<3||game.level==14&&game.weapon[c.id-1].length<(game.peakWeapon||game.classWeapon?(game.mainline?1:2):4))||(game.level==48||game.level==57)&&game.weapon[c.id-1].length<1){
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
                                if(game.level==55){
                                    this.remove=true
                                }
                            break
                            case 27:
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
                                if(game.level==55){
                                    this.remove=true
                                }
                            break
                            case 31:
                                if(!c.construct&&!c.sidekick&&!c.fort&&c.id>0&&!game.attacker&&c.weapon.uses<=0&&!((game.level==22||game.level==23||game.level==25||game.level==26||game.level==27||game.level==32||game.level==33)&&!(c.id==this.owner||(game.level==27||game.level==38)&&game.pvp&&(c.id==1&&this.pos==0||c.id==2&&this.pos==3||c.id==3)||this.owner>=0&&c.id>=0&&!game.pvp))){
                                    if(c.auto){
                                        c.newWeaponSet(c.type)
                                    }else{
                                        c.newWeapon()
                                    }
                                }
                            break
                            case 33:
                                if(game.level!=19&&game.level!=29&&game.level!=42&&game.level!=55&&!dm()&&!c.construct&&!c.sidekick&&!c.fort&&c.id>0&&!game.attacker&&c.weapon.uses<=0&&!((game.level==22||game.level==23||game.level==25||game.level==26||game.level==27||game.level==32||game.level==33||game.level==44||game.level==58||game.level==63||game.level==65||game.level==70)&&!(c.id==this.owner||game.level==27&&game.pvp&&(c.id==1&&this.pos==0||c.id==2&&this.pos==3||c.id==3)||this.owner>0&&c.id>0&&!game.pvp))){
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
                                if(game.level==29){
                                    c.newWeapon()
                                    this.recharge=3600-(game.gaming-1)*600
                                }else{
                                    c.newWeaponSet(this.weapon)
                                    let clump=game.classWeapon?3:1
                                    this.weapon=listing[clump][floor(random(listing[clump].length))]
                                    this.recharge=game.level==23?1200:3600-(game.gaming-1)*600
                                    c.stunTime=480
                                }
                                if(game.level==55){
                                    this.remove=true
                                }
                            break
                            case 57:
                                if(!(game.level==49&&!game.pvp&&game.pointAnim[1]>=1)&&!(game.level==49&&game.pvp&&this.visible<1)){
                                    let reserve=[c.type,c.weapon.ammo,c.weapon.uses]
                                    c.newWeaponSet(this.weapon)
                                    if(c.weaponType>=0&&c.id>0&&!c.sidekick&&reserve[2]>0){
                                        c.weapon.ammo=this.ammo
                                        c.weapon.uses=this.uses
                                        this.weapon=reserve[0]
                                        this.ammo=reserve[1]
                                        this.uses=reserve[2]
                                    }else{
                                        let chunk=listing[game.classWeapon?3:game.peakWeapon?1:0]
                                        this.weapon=chunk[floor(random(0,chunk.length))]
                                        this.ammo=types.weapon[types.player[this.weapon].weapon].ammo
                                        this.uses=types.weapon[types.player[this.weapon].weapon].uses==1?types.weapon[types.player[this.weapon].weapon].uses:types.weapon[types.player[this.weapon].weapon].uses*game.ammoMult
                                    }
                                    this.recharge=900
                                }
                            break
                            case 58:
                                if(c.id>0&&!c.sidekick){
                                    for(let e=0,le=entities.walls[1].length;e<le;e++){
                                        if(entities.walls[1][e].type==33&&entities.walls[1][e].pos==0){
                                            entities.walls[1][e].timers[c.id-1]++
                                            this.remove=true
                                            c.stunTime=300
                                        }
                                    }
                                }
                            break
                            case 61:
                                c.newWeaponSet(this.weapon)
                                clump=game.classWeapon?3:1
                                this.weapon=listing[clump][floor(random(listing[clump].length))]
                                this.recharge=3600-(game.gaming-1)*600
                                c.life*=0.225
                                c.collect.time=max(c.collect.time,450)
                                if(game.level==55){
                                    this.remove=true
                                }
                            break
                            case 63:
                                this.recharge=1800-(game.gaming-1)*300
                                this.remove=true
                                c.life=min(c.base.life,c.life+c.base.life/2)
                            break
                            case 65:
                                if(c.sidekick){
                                    c.life=0
                                    this.recharge=300
                                }else if(c.weaponType>=0){
                                    c.weaponType=-1
                                    c.weapon.ammo=0
                                    c.weapon.uses=0
                                    this.recharge=900
                                }
                            break
                            case 66:
                                c.DOT.active+=300
                                c.DOT.damage++
                                this.remove=true
                            break
                            case 68:
                                this.recharge=1800-(game.gaming-1)*300
                                c.life=min(max(c.life,c.base.life*2),c.life+c.base.life/2)
                                if(game.level==55){
                                    this.remove=true
                                }
                            break
                            case 69:
                                c.newWeaponSet(this.weapon)
                                clump=game.classWeapon?3:1
                                this.weapon=listing[clump][floor(random(listing[clump].length))]
                                this.recharge=3600-(game.gaming-1)*600
                                c.enigmaTime=max(c.enigmaTime,1800)
                                if(game.level==55){
                                    this.remove=true
                                }
                            break
                            case 70:
                                this.recharge=1800-(game.gaming-1)*300
                                c.defendBuff=max(c.defendBuff,game.level==55?1200:480)
                                if(game.level==55){
                                    this.remove=true
                                }
                            break
                            case 71:
                                c.newWeaponSet(floor(random(0,2))==0?this.weapon:this.weapon2)
                                let chunk=game.classWeapon?3:game.peakWeapon?1:floor(random(0,1.5))
                                this.weapon=listing[chunk][floor(random(listing[chunk].length))]
                                chunk=game.classWeapon?3:game.peakWeapon?1:floor(random(0,1.5))
                                this.weapon2=listing[chunk][floor(random(listing[chunk].length))]
                                this.recharge=3600-(game.gaming-1)*600
                                if(game.level==55){
                                    this.remove=true
                                }
                            break
                            case 72:
                                c.newWeaponSet(this.weapon)
                                clump=game.classWeapon?3:1
                                this.weapon=listing[clump][floor(random(listing[clump].length))]
                                this.recharge=3600-(game.gaming-1)*600
                                c.DOT.active+=300
                                c.DOT.damage++
                                if(game.level==55){
                                    this.remove=true
                                }
                            break
                            case 73:
                                this.recharge=1800-(game.gaming-1)*300
                                c.life=min(max(c.life,c.base.life*2),c.life+c.base.life/(c.playerData.name=='PlayerVIP'?5:2))
                                this.remove=true
                            break
                            case 75:
                                this.recharge=120
                                c.life=max(c.life,c.base.life)
                                if(c.weaponType==-1||game.pvp){
                                    c.newWeapon()
                                }
                            break
                            case 76:
                                if(c.id==1&&this.position.x>game.edge[0]/2||c.id==2&&this.position.x<game.edge[0]/2){
                                    this.recharge=120
                                    c.assort.intel=true
                                    game.point[c.id-1]=1
                                }
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
                                                c.velocity.y=max(c.velocity.y,0)
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
                                            c.velocity.y=min(c.velocity.y,0)
                                            c.jump.time=5
                                            if(c.doubleJump()&&c.weapon.uses>0){
                                                c.jump.double=1
                                            }
                                            if(c.playerData.name=='PlayerPistolQuadrupleJump'){
                                                c.jump.double=1
                                                c.jump.triple=1
                                                c.jump.quadruple=1
                                            }
                                            if(c.playerData.name=='PlayerScout4'){
                                                c.jump.double=1
                                                c.jump.triple=1
                                            }
                                            switch(this.type){
                                                case 2: case 25: case 29: case 34: case 48:
                                                    if((game.level==19||game.level==31)&&this.type!=25&&this.type!=34){
                                                        if(this.reload<=0&&!c.auto&&(c.id>0||game.attacker||game.level==17||game.level==18||game.level==19||game.level==31)&&c.life>0&&c.attacking){
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
                                                    if(this.reload<=0&&!c.auto&&!c.construct&&(c.id>0||game.attacker||game.level==17||game.level==18||game.level==19||game.level==31)&&c.life>0&&c.attacking&&!(c.construct&&(game.level==19||game.level==31))){
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
                                                            case 19: case 24: case 31: case 42:
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
                                                            case 32: case 33:
                                                                if(this.position.y>game.edge[1]-game.tileset[1]*15){
                                                                    for(let e=0,le=8;e<le;e++){
                                                                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,random(120,150),this.align,100,240,false,-1))
                                                                        let mult=random(1.25,2.5)
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                    }
                                                                }else{
                                                                    for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                        if(entities.walls[1][e].type==33&&dist(this.position.x,this.position.y,entities.walls[1][e].position.x,entities.walls[1][e].position.y)<600&&(entities.walls[1][e].owner==c.id||entities.walls[1][e].owner>0&&c.id>0&&!game.pvp)){
                                                                            hit=true
                                                                            if(entities.walls[1][e].position.x<this.position.x){
                                                                                for(let e=0,le=8;e<le;e++){
                                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,random(120,150),this.align,100,240,false,-1))
                                                                                    let mult=random(1.25,2.5)
                                                                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                                }
                                                                            }else{
                                                                                for(let e=0,le=8;e<le;e++){
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
                                                                }
                                                            break
                                                            case 34: case 50:
                                                                for(let e=0,le=9;e<le;e++){
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,-151+e*4+random(-6.5,6.5),this.align,100,240,false,-1))
                                                                    let mult=random(1.25,2.5)
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                }
                                                            break
                                                            case 35:
                                                                for(let e=0,le=20;e<le;e++){
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,this.position.x<game.edge[0]*0.5?random(97.5,142.5):random(-142.5,-97.5),this.align,100,240,false,-1))
                                                                    let mult=random(1.5,3)
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult*0.6
                                                                }
                                                            break
                                                            case 40:
                                                                if(game.pointAnim[0]<1){
                                                                    for(let e=0,le=20;e<le;e++){
                                                                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,random(-142.5,-97.5),this.align,100,240,false,-1))
                                                                        let mult=random(0.8,1.6)
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                    }
                                                                }else{
                                                                    this.reload=0
                                                                }
                                                            break
                                                            case 49:
                                                                if(game.pointAnim[0]<1&&!game.pvp||game.point[0]==c.id&&game.pvp){
                                                                    for(let e=0,le=20;e<le;e++){
                                                                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,random(-132.5,-112.5),this.align,100,240,false,-1))
                                                                        let mult=random(2.5,4)
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.y*=mult*0.5
                                                                    }
                                                                }else{
                                                                    this.reload=0
                                                                }
                                                            break
                                                            case 55: case 65:
                                                                entities.projectiles.push(new projectile(c.layer,this.position.x,this.position.y-this.height/2-5-game.tileset[1]*4,280,0,c.id,400,1800,0,c.index))
                                                                if(c.id>0&&c.id<=game.gaming){
                                                                    for(let e=0,le=entities.players.length;e<le;e++){
                                                                        if(entities.players[e].id==c.id){
                                                                            entities.players[e].disable=true
                                                                            entities.players[e].assort.missile=true
                                                                        }
                                                                    }
                                                                }
                                                            break
                                                            case 59:
                                                                for(let e=0,le=12;e<le;e++){
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,random(-157.5,-112.5),this.align,100,300,false,-1))
                                                                    let mult=random(1.25,2.5)
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
                                                    if(this.reload<=0&&!c.auto&&!c.construct&&(c.id>0||game.attacker||game.level==17||game.level==18)&&c.life>0&&c.attacking){
                                                        this.reload=480
                                                        if(game.level==19||game.level==31||game.level==32||game.level==33){
                                                            this.align=c.id
                                                        }
                                                        let hit=false
                                                        switch(game.level){
                                                            case 19: case 24: case 31:
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
                                                            case 32: case 33:
                                                                if(this.type==13){
                                                                    for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                        if(entities.walls[1][e].type==33&&dist(this.position.x,this.position.y,entities.walls[1][e].position.x,entities.walls[1][e].position.y)<600&&(entities.walls[1][e].owner==c.id||entities.walls[1][e].owner>0&&c.id>0&&!game.pvp)){
                                                                            hit=true
                                                                        }
                                                                    }
                                                                    if(!hit){
                                                                        this.reload=0
                                                                    }
                                                                }
                                                            break
                                                            case 49:
                                                                if(!(game.pointAnim[0]<1&&!game.pvp||game.point[0]==c.id&&game.pvp||this.type==13)){
                                                                    this.reload=0
                                                                }
                                                            break
                                                            case 55: case 65:
                                                                entities.players.push(new player(this.layer,this.position.x,this.position.y+this.height/2+12,c.id,0,[],false,findName('ConstructRemote',types.player),game.index))
                                                                game.index++
                                                                entities.players[entities.players.length-1].constructify()
                                                                entities.players[entities.players.length-1].builder=c.index
                                                                entities.players[entities.players.length-1].remote=true
                                                                entities.players[entities.players.length-1].direction.goal=c.direction.goal
                                                                entities.players[entities.players.length-1].DOT.active+=1000
                                                                entities.players[entities.players.length-1].DOT.damage=0.5
                                                                if(c.id>0&&c.id<=game.gaming){
                                                                    for(let e=0,le=entities.players.length;e<le;e++){
                                                                        if(entities.players[e].id==c.id){
                                                                            entities.players[e].disable=true
                                                                            entities.players[e].assort.remote=true
                                                                        }
                                                                    }
                                                                }
                                                            break
                                                        }
                                                    }
                                                break
                                                case 23:
                                                    if(this.reload<=0&&!c.auto&&(c.id>0||game.attacker||game.level==17||game.level==18)&&c.life>0&&c.attacking&&!(c.construct&&(game.level==19||game.level==31))&&!c.fort){
                                                        if(game.attacker||game.level==17||game.level==18){
                                                            this.align=c.id
                                                        }
                                                        this.reload=480
                                                        let hit=false
                                                        switch(game.level){
                                                            case 19: case 31:
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
                                                            case 23: case 35:
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
                                                            case 27:
                                                                for(let e=0,le=15;e<le;e++){
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,73,this.position.x<game.edge[0]*0.5?random(-157.5,-112.5):random(112.5,157.5),this.align,40,240,false,-1))
                                                                    let mult=random(1.25,2.5)
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                }
                                                            break
                                                            case 32: case 33:
                                                                for(let e=0,le=8;e<le;e++){
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,73,random(120,150),this.align,100,240,false,-1))
                                                                    let mult=random(1.25,2.5)
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                }
                                                            break
                                                            case 55: case 65:
                                                                entities.projectiles.push(new projectile(c.layer,this.position.x,this.position.y-this.height/2-5-game.tileset[1]*4,316,0,c.id,800,1800,0,c.index))
                                                                if(c.id>0&&c.id<=game.gaming){
                                                                    for(let e=0,le=entities.players.length;e<le;e++){
                                                                        if(entities.players[e].id==c.id){
                                                                            entities.players[e].disable=true
                                                                            entities.players[e].assort.missile=true
                                                                        }
                                                                    }
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
                                                    if(this.reload<=0&&!c.auto&&(!c.fort||c.id==0||game.level==42)&&(c.id>0||game.attacker||game.level==17||game.level==18||game.level==19||game.level==31)&&c.life>0&&(c.attacking&&!(game.level==42&&c.fort)||game.level==42&&c.id>game.gaming&&c.fort&&this.reload<=-1200)){
                                                        if(game.attacker||game.level==17||game.level==18){
                                                            this.align=c.id
                                                        }
                                                        this.reload=480
                                                        let hit=false
                                                        switch(game.level){
                                                            case 19: case 31: case 42:
                                                                for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                    if(entities.walls[1][e].type==31&&abs(this.position.x-entities.walls[1][e].position.x)<600&&(entities.walls[1][e].owner==c.id&&c.id>=0||entities.walls[1][e].owner>0&&c.id>0&&!game.pvp)){
                                                                        hit=true
                                                                        entities.players.push(new player(graphics.main[1],this.position.x,this.position.y-50,entities.walls[1][e].owner,0,[],false,floor(random(findName('ConstructMachineGun',types.player),findName('ConstructRemote',types.player))),game.index))
                                                                        game.index++
                                                                        entities.players[entities.players.length-1].constructify()
                                                                        entities.players[entities.players.length-1].thrown=true
                                                                        entities.players[entities.players.length-1].velocity.x=random(10,25)*(floor(random(0,2))*2-1)*(game.level==42?0.6:1)
                                                                        entities.players[entities.players.length-1].velocity.y=-20
                                                                    }else if(entities.walls[1][e].type==31&&abs(this.position.x-entities.walls[1][e].position.x)<600&&game.pvp&&entities.walls[1][e].owner!=c.id&&c.id>0&&!c.auto&&!c.sidekick){
                                                                        hit=true
                                                                        c.newWeaponSet(floor(random(findName('PlayerDeployerM',types.player),findName('PlayerDeployerGU',types.player)+1)))
                                                                        c.storeWeapon=true
                                                                        this.reload=600
                                                                        for(let f=0,lf=entities.walls.length;f<lf;f++){
                                                                            for(let g=0,lg=entities.walls[f].length;g<lg;g++){
                                                                                if(entities.walls[f][g].reload!=-1&&abs(this.position.x-entities.walls[f][g].position.x)<600){
                                                                                    entities.walls[f][g].reload=1200.225 
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
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,114,random(-120,-240),c.id,200,1200,false,-1))
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
                                                                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,114,random(-120,-240),c.id,200,1200,false,-1))
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
                                                            case 32: case 33:
                                                                for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                    if(entities.walls[1][e].type==33&&dist(this.position.x,this.position.y,entities.walls[1][e].position.x,entities.walls[1][e].position.y)<600&&(entities.walls[1][e].owner==c.id||entities.walls[1][e].owner>0&&c.id>0&&!game.pvp)){
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
                                                            case 39:
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
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.y*=mult*0.5
                                                                        entities.projectiles[entities.projectiles.length-1].position.x+=entities.projectiles[entities.projectiles.length-1].velocity.x
                                                                        entities.projectiles[entities.projectiles.length-1].position.y+=entities.projectiles[entities.projectiles.length-1].velocity.y
                                                                    }
                                                                }
                                                            break
                                                            case 49:
                                                                if(game.pointAnim[0]<1&&!game.pvp||game.point[0]==c.id&&game.pvp){
                                                                    for(let e=0,le=10;e<le;e++){
                                                                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,114,random(-120,-240),c.id,150,1200,false,-1))
                                                                        let mult=random(1.5,3)
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.y*=mult*0.5
                                                                        entities.projectiles[entities.projectiles.length-1].position.x+=entities.projectiles[entities.projectiles.length-1].velocity.x
                                                                        entities.projectiles[entities.projectiles.length-1].position.y+=entities.projectiles[entities.projectiles.length-1].velocity.y
                                                                    }
                                                                }else{
                                                                    this.reload=0
                                                                }
                                                            break
                                                            case 69:
                                                                c.newWeaponSet(floor(random(findName('PlayerDeployerM',types.player),findName('PlayerDeployerGU',types.player)+1)))
                                                                c.weapon.uses=1
                                                                c.storeWeapon=true
                                                                c.weapon.cooldown=random(90,180)
                                                            break
                                                        }
                                                    }
                                                break
                                                case 35:
                                                    if(this.reload<=0&&!c.auto&&!c.construct&&(c.id>0||game.attacker||game.level==17||game.level==18||game.level==19||game.level==31)&&c.life>0&&c.attacking){
                                                        if(game.attacker||game.level==17||game.level==18){
                                                            this.align=c.id
                                                        }
                                                        this.reload=360
                                                        switch(game.level){
                                                            case 19: case 31:
                                                                let hit=false
                                                                for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                    if((
                                                                            entities.walls[1][e].type==36&&game.level==19||
                                                                            entities.walls[1][e].type==33&&game.level==31
                                                                        )
                                                                        &&abs(this.position.x-entities.walls[1][e].position.x)<600&&(entities.walls[1][e].owner==c.id||entities.walls[1][e].owner>0&&c.id>0&&!game.pvp)
                                                                    ){
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
                                                            case 22: case 32: case 33: case 40: case 52:
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
                                                            case 28: case 42:
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
                                                            case 30:
                                                                if(c.stats.points>0&&c.id>0&&c.id<=game.players){
                                                                    c.stats.points--
                                                                    for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                        if(entities.walls[1][e].type==42){
                                                                            entities.walls[1][e].timers[c.id-1]++
                                                                        }
                                                                    }
                                                                    c.stunTime=45
                                                                    this.reload=45
                                                                }else{
                                                                    this.reload=0
                                                                }
                                                            break
                                                            case 37:
                                                                c.bounceTime=0
                                                            break
                                                            case 49:
                                                                if(game.pointAnim[0]<1&&!game.pvp||game.point[0]==c.id&&game.pvp){
                                                                    for(let e=0,le=15;e<le;e++){
                                                                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,258,-255+(e+0.5)/le*150,c.id,50,120,false,-1))
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.x*=0.9
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.y*=0.9
                                                                        entities.projectiles[entities.projectiles.length-1].position.x+=entities.projectiles[entities.projectiles.length-1].velocity.x
                                                                        entities.projectiles[entities.projectiles.length-1].position.y+=entities.projectiles[entities.projectiles.length-1].velocity.y
                                                                    }
                                                                   }else{
                                                                    this.reload=0
                                                                }
                                                            break
                                                            case 54:
                                                                if(c.stats.points>0&&c.id>0&&c.id<=game.players){
                                                                    c.stats.points--
                                                                    for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                        if(entities.walls[1][e].type==42){
                                                                            entities.walls[1][e].timers[c.id-1]++
                                                                        }
                                                                    }
                                                                    c.stunTime=20
                                                                    this.reload=20
                                                                }else{
                                                                    this.reload=0
                                                                }
                                                            break
                                                            case 55: case 65:
                                                                this.reload=90
                                                                for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                    if(entities.walls[1][e].type==35){
                                                                        entities.walls[1][e].reload=90
                                                                    }
                                                                }
                                                                let valid=true
                                                                switch(this.pos){
                                                                    case 0:
                                                                        valid=true
                                                                        for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                            if(entities.walls[1][e].pos==6){
                                                                                valid=false
                                                                            }
                                                                        }
                                                                        if(valid){
                                                                            for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                                if(entities.walls[1][e].type!=33&&entities.walls[1][e].type!=35){
                                                                                    if(entities.walls[1][e].pos==1||entities.walls[1][e].pos==2||entities.walls[1][e].pos==3||entities.walls[1][e].pos==4||entities.walls[1][e].pos==5){
                                                                                        if(entities.walls[1][e].pos==5){
                                                                                            let type=[8,9,9,12,16,16,27,27,50,61,66,68,69,70,70,71][floor(random(0,16))]
                                                                                            if(type==16){
                                                                                                let cluster=game.classWeapon?3:game.peakWeapon?1:game.level==27&&game.pvp?1:floor(random(1.5))
                                                                                                entities.walls[1].push(new wall(graphics.main,entities.walls[1][e].position.x+game.tileset[0]*4,entities.walls[1][e].position.y,game.tileset[1]*0.6,game.tileset[1]*0.6,type))
                                                                                                entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                                                                                            }else{
                                                                                                entities.walls[1].push(new wall(graphics.main,entities.walls[1][e].position.x+game.tileset[0]*4,entities.walls[1][e].position.y,game.tileset[1]*0.6,game.tileset[1]*0.6,type))
                                                                                            }
                                                                                            entities.walls[1][entities.walls[1].length-1].formBoundary()
                                                                                            entities.walls[1][entities.walls[1].length-1].checkRedundancy()
                                                                                            entities.walls[1][entities.walls[1].length-1].checkOverlay()
                                                                                            entities.walls[1][entities.walls[1].length-1].set()
                                                                                            entities.walls[1][entities.walls[1].length-1].checkGap()
                                                                                            entities.walls[1][entities.walls[1].length-1].checkBar()
                                                                                            entities.walls[1][entities.walls[1].length-1].formBounder()
                                                                                            entities.walls[1][entities.walls[1].length-1].pos=5
                                                                                        }
                                                                                        entities.walls[1][e].pos--
                                                                                    }else if(entities.walls[1][e].pos==0){
                                                                                        entities.walls[1][e].pos=6
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    break
                                                                    case 1:
                                                                        valid=true
                                                                        for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                            if(entities.walls[1][e].pos==7){
                                                                                valid=false
                                                                            }
                                                                        }
                                                                        if(valid){
                                                                            for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                                if(entities.walls[1][e].type!=33&&entities.walls[1][e].type!=35){
                                                                                    if(entities.walls[1][e].pos==2||entities.walls[1][e].pos==3||entities.walls[1][e].pos==4||entities.walls[1][e].pos==5){
                                                                                        if(entities.walls[1][e].pos==5){
                                                                                            let type=[8,9,9,12,16,16,27,27,50,61,66,68,69,70,70,71][floor(random(0,16))]
                                                                                            if(type==16){
                                                                                                let cluster=game.classWeapon?3:game.peakWeapon?1:game.level==27&&game.pvp?1:floor(random(1.5))
                                                                                                entities.walls[1].push(new wall(graphics.main,entities.walls[1][e].position.x+game.tileset[0]*4,entities.walls[1][e].position.y,game.tileset[1]*0.6,game.tileset[1]*0.6,type))
                                                                                                entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                                                                                            }else{
                                                                                                entities.walls[1].push(new wall(graphics.main,entities.walls[1][e].position.x+game.tileset[0]*4,entities.walls[1][e].position.y,game.tileset[1]*0.6,game.tileset[1]*0.6,type))
                                                                                            }
                                                                                            entities.walls[1][entities.walls[1].length-1].formBoundary()
                                                                                            entities.walls[1][entities.walls[1].length-1].checkRedundancy()
                                                                                            entities.walls[1][entities.walls[1].length-1].checkOverlay()
                                                                                            entities.walls[1][entities.walls[1].length-1].set()
                                                                                            entities.walls[1][entities.walls[1].length-1].checkGap()
                                                                                            entities.walls[1][entities.walls[1].length-1].checkBar()
                                                                                            entities.walls[1][entities.walls[1].length-1].formBounder()
                                                                                            entities.walls[1][entities.walls[1].length-1].pos=5
                                                                                        }
                                                                                        entities.walls[1][e].pos--
                                                                                    }else if(entities.walls[1][e].pos==1){
                                                                                        entities.walls[1][e].pos=7
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    break
                                                                    case 2:
                                                                        valid=true
                                                                        for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                            if(entities.walls[1][e].pos==7||entities.walls[1][e].pos==8){
                                                                                valid=false
                                                                            }
                                                                        }
                                                                        if(valid){
                                                                            for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                                if(entities.walls[1][e].type!=33&&entities.walls[1][e].type!=35){
                                                                                    if(entities.walls[1][e].pos==2||entities.walls[1][e].pos==3||entities.walls[1][e].pos==4||entities.walls[1][e].pos==5){
                                                                                        if(entities.walls[1][e].pos==5){
                                                                                            let type=[8,9,9,12,16,16,27,27,50,61,66,68,69,70,70,71][floor(random(0,16))]
                                                                                            if(type==16){
                                                                                                let cluster=game.classWeapon?3:game.peakWeapon?1:game.level==27&&game.pvp?1:floor(random(1.5))
                                                                                                entities.walls[1].push(new wall(graphics.main,entities.walls[1][e].position.x+game.tileset[0]*4,entities.walls[1][e].position.y,game.tileset[1]*0.6,game.tileset[1]*0.6,type))
                                                                                                entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                                                                                            }else{
                                                                                                entities.walls[1].push(new wall(graphics.main,entities.walls[1][e].position.x+game.tileset[0]*4,entities.walls[1][e].position.y,game.tileset[1]*0.6,game.tileset[1]*0.6,type))
                                                                                            }
                                                                                            entities.walls[1][entities.walls[1].length-1].formBoundary()
                                                                                            entities.walls[1][entities.walls[1].length-1].checkRedundancy()
                                                                                            entities.walls[1][entities.walls[1].length-1].checkOverlay()
                                                                                            entities.walls[1][entities.walls[1].length-1].set()
                                                                                            entities.walls[1][entities.walls[1].length-1].checkGap()
                                                                                            entities.walls[1][entities.walls[1].length-1].checkBar()
                                                                                            entities.walls[1][entities.walls[1].length-1].formBounder()
                                                                                            entities.walls[1][entities.walls[1].length-1].pos=5
                                                                                        }
                                                                                        entities.walls[1][e].pos--
                                                                                    }else if(entities.walls[1][e].pos==1){
                                                                                        entities.walls[1][e].pos=(entities.walls[1][e].type==8||entities.walls[1][e].type==9||entities.walls[1][e].type==12||entities.walls[1][e].type==70)&&!entities.walls[1][e].rainbow&&game.players!=1?7:8
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    break
                                                                }
                                                            break
                                                            case 61:
                                                                this.reload=15
                                                                game.elevate=1-this.pos
                                                                if(this.pos==0&&abs(this.position.x-this.base.position.x)<1){
                                                                    for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                        if(entities.walls[1][e].type==35&&entities.walls[1][e].pos==1){
                                                                            let f=entities.walls[1][e]
                                                                            let mult=f.velocity.y!=0?2:1
                                                                            f.position.y-=1.5*mult
                                                                            f.bounder.position.y-=1.5*mult
                                                                            f.internalBounder.position.y-=1.5*mult
                                                                            f.velocity.y=-1.5*mult
                                                                            for(let a=0,la=f.boundary.length;a<la;a++){
                                                                                for(let b=0,lb=f.boundary[a].length;b<lb;b++){
                                                                                    for(let c=0,lc=f.boundary[a][b].length;c<lc;c++){
                                                                                        f.boundary[a][b][c].y-=1.5*mult
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            break
                                                            case 67:
                                                                if(c.assort.intel&&(this.position.x<game.edge[0]/2&&c.id==1||this.position.x>game.edge[0]/2&&c.id==2)){
                                                                    this.reload=20
                                                                    for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                        if(entities.walls[1][e].type==42){
                                                                            entities.walls[1][e].timers[c.id-1]++
                                                                        }
                                                                    }
                                                                    c.assort.intel=false
                                                                    game.point[c.id-1]=0
                                                                    for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                        if(entities.walls[1][e].type==76&&(entities.walls[1][e].position.x>game.edge[0]/2&&c.id==1||entities.walls[1][e].position.x<game.edge[0]/2&&c.id==2)){
                                                                            entities.walls[1][e].recharge=0
                                                                        }
                                                                    }
                                                                }else{
                                                                    this.reload=0
                                                                }
                                                            break
                                                        }
                                                    }
                                                break
                                                case 40:
                                                    if(this.reload<=0&&!c.auto&&(c.id>0||game.attacker||game.level==17||game.level==18||game.level==19||game.level==31)&&c.life>0&&c.attacking&&!c.fort){
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
                                                            case 28:
                                                                for(let e=0,le=entities.players.length;e<le;e++){
                                                                    if(entities.players[e].fort&&entities.players[e].pos==1){
                                                                        for(let f=0,lf=entities.players.length;f<lf;f++){
                                                                            if(entities.players[f].fort&&entities.players[f].pos==2){
                                                                                let hold=[entities.players[e].position.x,entities.players[e].position.y]
                                                                                entities.players[e].position.x=entities.players[f].position.x
                                                                                entities.players[e].position.y=entities.players[f].position.y
                                                                                entities.players[f].position.x=hold[0]
                                                                                entities.players[f].position.y=hold[1]
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                for(let e=0,le=entities.walls[1].length;e<le;e++){
                                                                    if(entities.walls[1][e].type==33&&entities.walls[1][e].pos==1){
                                                                        for(let f=0,lf=entities.walls[1].length;f<lf;f++){
                                                                            if(entities.walls[1][f].type==33&&entities.walls[1][f].pos==2){
                                                                                let hold=[entities.walls[1][e].position.x,entities.walls[1][e].position.y]
                                                                                entities.walls[1][e].position.x=entities.walls[1][f].position.x
                                                                                entities.walls[1][e].position.y=entities.walls[1][f].position.y
                                                                                entities.walls[1][f].position.x=hold[0]
                                                                                entities.walls[1][f].position.y=hold[1]
                                                                            }
                                                                        }
                                                                    }
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
                                                if(!game.pvp&&game.level!=19&&game.level!=29&&game.level!=31&&game.level!=41&&game.level!=42&&game.level!=52&&game.level!=53&&game.level!=56){
                                                    c.weapon.cooldown+=120
                                                    c.stuckTime=c.playerData.sizeBuff>=1.5?120:60
                                                }
                                            }
                                        break
                                        case 2:
                                            c.position.x=this.position.x+this.width/2+c.width/2+0.01
                                            c.previous.position.x=this.position.x+this.width/2+c.width/2+0.01
                                            c.velocity.x=this.velocity.x
                                            if(this.type==38&&game.level==47){
                                                c.target.point=-1
                                            }
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
                                            if(game.level!=30||c.position.y>this.position.y-this.height/2-c.height/2){
                                                if(this.type==59||this.type==60){
                                                    c.velocity.y=min(c.velocity.y,c.velocity.x*min(3,this.height/this.width))
                                                }else{
                                                    c.velocity.y=c.velocity.x*this.height/this.width
                                                }
                                            }
                                            c.jump.time=5
                                            if(c.doubleJump()&&c.weapon.uses>0){
                                                c.jump.double=1
                                            }
                                            if(c.thrown&&this.type!=26){
                                                c.thrown=false
                                            }
                                            if(c.parachute){
                                                c.parachute=false
                                                if(!game.pvp&&game.level!=19&&game.level!=29&&game.level!=31&&game.level!=41&&game.level!=42&&game.level!=52&&game.level!=53&&game.level!=56){
                                                    c.weapon.cooldown+=120
                                                    c.stuckTime=60
                                                }
                                            }
                                            c.velocity.x*=1-this.height/this.width*0.1*(c.playerData.name=='PlayerAuger'?0.2:1)
                                        break
                                        case 5:
                                            c.position.y=this.position.y-this.height/2-c.height/2-0.01+this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                            if(this.type==59||this.type==60){
                                                c.velocity.y=min(c.velocity.y,-c.velocity.x*min(3,this.height/this.width))
                                            }else{
                                                c.velocity.y=-c.velocity.x*this.height/this.width
                                            }
                                            c.jump.time=5
                                            if(c.doubleJump()&&c.weapon.uses>0){
                                                c.jump.double=1
                                            }
                                            if(c.thrown&&this.type!=26){
                                                c.thrown=false
                                            }
                                            if(c.parachute){
                                                c.parachute=false
                                                if(!game.pvp&&game.level!=19&&game.level!=29&&game.level!=31&&game.level!=41&&game.level!=42&&game.level!=52&&game.level!=53&&game.level!=56){
                                                    c.weapon.cooldown+=120
                                                    c.stuckTime=60
                                                }
                                            }
                                            c.velocity.x*=1-this.height/this.width*0.1*(c.playerData.name=='PlayerAuger'?0.2:1)
                                        break
                                        case 6:
                                            c.position.y=this.position.y+this.height/2+c.height/2+0.01-this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                            c.velocity.y=-c.velocity.x*min(3,this.height/this.width)
                                            c.velocity.x*=1-this.height/this.width*0.1*(c.playerData.name=='PlayerAuger'?0.2:1)
                                        break
                                        case 7:
                                            c.position.y=this.position.y+this.height/2+c.height/2+0.01-this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                            c.velocity.y=c.velocity.x*min(3,this.height/this.width)
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
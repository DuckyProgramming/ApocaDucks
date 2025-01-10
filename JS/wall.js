class wall{
    constructor(layer,x,y,width,height,type){
        this.layer=layer
        this.position={x:x,y:y}
        this.width=width
        this.height=height
        this.type=type
        this.collide=[entities.projectiles,entities.players]
        this.redundant=[false,false,false,false,false,false,false,false,false],
        this.standard=this.type!=5&&this.type!=7&&this.type!=8&&this.type!=9&&this.type!=10&&this.type!=11&&this.type!=12&&this.type!=14&&this.type!=16&&this.type!=27
        this.velocity={x:0,y:0}
        this.boundary=[
            [[{x:this.position.x-this.width/2,y:this.position.y+this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
            [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y-this.height/2}]],
            [[{x:this.position.x+this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
            [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x-this.width/2,y:this.position.y+this.height/2}]],
        ]
        this.exploded=false
        this.time=0
        this.align=-1
    }
    set(){
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
            break
            case 4: case 13: case 15: case 23:
                this.reload=0
            break
            case 6:
                this.carry=[]
                this.disable=false
            break
            case 8: case 9: case 12: case 16: case 27:
                this.recharge=0
                this.falling=0
                this.infoFade=0
                this.findFall()
            break
            case 17:
                if(game.level==8||game.level==17){
                    this.balls=[]
                    for(let a=0,la=(this.width-10)*(this.height-10)/1600;a<la;a++){
                        let pos=(a*0.205%1)
                        this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5+(this.height-10)*pos,this.height/2-5),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                    }
                }
            break
            case 18:
                if(game.level==8||game.level==17){
                    this.balls=[]
                    for(let a=0,la=(this.width-10)*(this.height-10)/1600;a<la;a++){
                        let pos=(a*0.205%1)
                        this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5+(this.height-10)*(1-pos),this.height/2-5),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                    }
                }
            break
            case 20:
                if(game.level==8||game.level==17){
                    this.balls=[]
                    for(let a=0,la=(this.width-10)*(this.height-10)/1600;a<la;a++){
                        let pos=(a*0.205%1)
                        this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5,-this.height/2+5+(this.height-10)*(1-pos)),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                    }
                }
            break
            case 21:
                if(game.level==8||game.level==17){
                    this.balls=[]
                    for(let a=0,la=(this.width-10)*(this.height-10)/1600;a<la;a++){
                        let pos=(a*0.205%1)
                        this.balls.push([-this.width/2+pos*(this.width-10)+5,random(-this.height/2+5,-this.height/2+5+(this.height-10)*pos),random(15,45),random(0,1),random(0,360),floor(random(4,7))])
                    }
                }
            break
        }
    }
    checkHorizontal(){
        if(!this.remove){
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    let c=entities.walls[a][b]
                    if(c.type==this.type&&(c.position.x!=this.position.x||c.position.y!=this.position.y)&&this.width<game.tileset[0]*10&&!c.remove){
                        if(abs(this.height-c.height)<1&&abs(c.position.x-(this.position.x+this.width/2+c.width/2))<1&&abs(c.position.y-this.position.y)<1&&!c.remove){
                            this.width+=c.width
                            this.position.x+=c.width/2
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
                    if(c.type==this.type&&(c.position.x!=this.position.x||c.position.y!=this.position.y)&&this.height<game.tileset[1]*10&&!c.remove){
                        if(abs(this.width-c.width)<1&&abs(c.position.y-(this.position.y+this.height/2+c.height/2))<1&&abs(c.position.x-this.position.x)<1&&!c.remove){
                            this.height+=c.height
                            this.position.y+=c.height/2
                            c.remove=true
                        }
                    }
                }
            }
        }
    }
    formBoundary(){
        switch(this.type){
            case 17:
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
            case 18:
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
            case 20:
                this.boundary=[
                    [],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y-this.height/2}]],
                    [],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x-this.width/2,y:this.position.y+this.height/2}]],
                    [],
                    [],
                    [[{x:this.position.x+this.width/2,y:this.position.y-this.height/2},{x:this.position.x-this.width/2,y:this.position.y+this.height/2}]],
                    [],
                ]
                this.triangle=[
                    {x:this.position.x-this.width/2,y:this.position.y-this.height/2},
                    {x:this.position.x-this.width/2,y:this.position.y+this.height/2},
                    {x:this.position.x+this.width/2,y:this.position.y-this.height/2}
                ]
            break
            case 21:
                this.boundary=[
                    [],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y-this.height/2}]],
                    [[{x:this.position.x+this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
                    [],
                    [],
                    [],
                    [],
                    [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
                ]
                this.triangle=[
                    {x:this.position.x+this.width/2,y:this.position.y-this.height/2},
                    {x:this.position.x-this.width/2,y:this.position.y-this.height/2},
                    {x:this.position.x+this.width/2,y:this.position.y+this.height/2}
                ]
            break
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
                if(c.standard){
                    if(abs(c.position.y-(this.position.y+this.height/2+c.height/2))<1&&c.position.x-c.width/2<=this.position.x-this.width/2+1&&c.position.x+c.width/2>=this.position.x+this.width/2-1){
                        this.redundant[0]=true
                        this.boundary[0]=[]
                    }
                    if(abs(c.position.y-(this.position.y-this.height/2-c.height/2))<1&&c.position.x-c.width/2<=this.position.x-this.width/2+1&&c.position.x+c.width/2>=this.position.x+this.width/2-1){
                        this.redundant[1]=true
                        this.boundary[1]=[]
                    }
                    if(abs(c.position.x-(this.position.x+this.width/2+c.width/2))<1&&c.position.y-c.height/2<=this.position.y-this.height/2+1&&c.position.y+c.height/2>=this.position.y+this.height/2-1){
                        this.redundant[2]=true
                        this.boundary[2]=[]
                    }
                    if(abs(c.position.x-(this.position.x-this.width/2-c.width/2))<1&&c.position.y-c.height/2<=this.position.y-this.height/2+1&&c.position.y+c.height/2>=this.position.y+this.height/2-1){
                        this.redundant[3]=true
                        this.boundary[3]=[]
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
                if(c.standard){
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
        this.set()
    }
    checkBar(){
        for(let a=0,la=entities.walls.length;a<la;a++){
            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                let c=entities.walls[a][b]
                if((c.position.x!=this.position.x||c.position.y!=this.position.y)&&c.type==this.type){
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
        if(this.standard&&game.attacker&&this.boundary[1].length>0&&this.type!=3&&!this.redundant[1]&&!this.redundant[8]){
            for(let a=0,la=this.boundary[1].length;a<la;a++){
                let scale=floor(dist(this.boundary[1][a][0].x,this.boundary[1][a][0].y,this.boundary[1][a][1].x,this.boundary[1][a][1].y)/10)
                for(let b=0,lb=scale;b<lb;b++){
                    game.spawner.push([
                        map((b+0.5)/lb,0,1,this.boundary[1][a][0].x,this.boundary[1][a][1].x),
                        map((b+0.5)/lb,0,1,this.boundary[1][a][0].y,this.boundary[1][a][1].y)
                    ])
                }
            }
        }
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
                    default:
                        layer.fill(120)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                }
            break
            case 2:
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
                    default:
                        layer.fill(120,200,120)
                        layer.rect(0,0,this.width+1,this.height+1)
                    break
                }
            break
            case 3:
                layer.fill(120,200,200)
                layer.rect(0,0,this.width+1,this.height+1)
            break
            case 4:
                if(game.level==7){
                    layer.noFill()
                    layer.stroke(250-this.reload/5,120,120)
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
                }else if(game.level==15||game.level==18){
                    layer.fill(180-((this.position.y)/game.edge[1]*1.5-0.5)*60,150-((this.position.y)/game.edge[1]*1.5-0.5)*60,240-((this.position.y)/game.edge[1]*1.5-0.5)*120)
                    layer.rect(0,0,this.width+1,this.height+1)
                    layer.fill(220-this.reload/5,120,120)
                    layer.quad(
                        -this.width/2,-this.height/2,
                        -this.width/2+10,-this.height/2+15,
                        this.width/2-10,-this.height/2+15,
                        this.width/2,-this.height/2
                    )
                }else{
                    layer.fill(220-this.reload/5,120,120)
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
                    case 15: case 18:
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
            case 9:
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
                if(game.level==15||game.level==18){
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
                }else if(game.level==19){
                    layer.fill(55,50,65)
                    for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                        layer.rect(-this.width/2+(0.5+a)/la*this.width,this.height/4+1,this.width/la-2,this.height/2-2,2)
                    }
                    for(let a=0,la=this.width/game.tileset[0]*2-1;a<la;a++){
                        layer.rect(-this.width/2+(1+a)/(la+1)*this.width,-this.height/4+1,this.width/(la+1)-2,this.height/2-2,2)
                    }
                }else{
                    if(game.level==6){
                        layer.fill(60+this.position.y/game.edge[1]*20,80-this.position.y/game.edge[1]*10,60)
                    }else{
                        layer.fill(60)
                    }
                    for(let a=0,la=this.width/game.tileset[0]*2;a<la;a++){
                        layer.rect(-this.width/2+(0.5+a)/la*this.width,this.height/4+1,this.width/la-2,this.height/2-2)
                    }
                    for(let a=0,la=this.width/game.tileset[0]*2-1;a<la;a++){
                        layer.rect(-this.width/2+(1+a)/(la+1)*this.width,-this.height/4+1,this.width/(la+1)-2,this.height/2-2)
                    }
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
                if(game.level==15||game.level==18){
                    layer.fill(180-((this.position.y)/game.edge[1]*1.5-0.5)*60,150-((this.position.y)/game.edge[1]*1.5-0.5)*60,240-((this.position.y)/game.edge[1]*1.5-0.5)*120)
                    layer.rect(0,0,this.width+1,this.height+1)
                    layer.fill(220-this.reload/5,220-this.reload/5,120)
                    layer.quad(
                        -this.width/2,-this.height/2,
                        -this.width/2+10,-this.height/2+15,
                        this.width/2-10,-this.height/2+15,
                        this.width/2,-this.height/2
                    )
                }else{
                    layer.fill(220-this.reload/5,220-this.reload/5,120)
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
                }
            break
            case 15:
                layer.fill(220-this.reload/5,170-this.reload/10,120)
                layer.rect(0,0,this.width+1,this.height+1)
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
                }
                for(let a=0,la=4;a<la;a++){
                    if(lcos(a*90+this.time)>0){
                        layer.fill(160+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.rect(this.width/2*lsin(a*90+this.time),0,(this.width+1)*lcos(a*90+this.time),this.height+1)
                        layer.fill(80+lcos(a*90+this.time)*40,1-this.recharge/60)
                        layer.ellipse(this.width/2*lsin(a*90+this.time),0,this.width*lcos(a*90+this.time)*0.6,this.height*0.6)
                        layer.fill(220+lcos(a*90+this.time)*40,1-this.recharge/60)
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
                layer.fill(220-this.reload/5,120,220-this.reload/5)
                layer.rect(0,0,this.width+1,this.height+1)
            break
            case 24:
                switch(game.level){
                    case 15: case 18:
                        layer.fill(160,100,40)
                        layer.rect(0,0,this.width+1,this.height)
                        layer.fill(140,80,20)
                        for(let a=0,la=round(this.width/game.tileset[0]*2);a<la;a++){
                            layer.rect(-this.width/2+(a+0.5)/2*game.tileset[0],0,game.tileset[1]/10,this.height)
                        }
                    break
                    case 16:
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
            case 26:
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
                switch(game.level){
                    case 21:
                        layer.fill(100,90,80)
                        layer.rect(0,0,this.width+1,this.height+1,2)
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
            case 2:
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
                }
            break
            case 4: case 13:
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
                }
            break
            case 16:
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
        }
        layer.pop()
        /*layer.stroke(50,50+this.type*100,200)
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
        }*/
    }
    update(){
        this.time++
        switch(this.type){
            case 4: case 23:
                if(this.reload>0){
                    this.reload--
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
            case 8: case 9: case 12: case 27:
                if(this.recharge>0){
                    this.recharge--
                }
                if((this.type==8||this.type==27)&&this.falling>0){
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
            break
            case 13:
                if(this.reload>0){
                    this.reload--
                    if(this.reload==479||this.reload==459||this.reload==439||this.reload==419||this.reload==399){
                        switch(game.level){
                            case 6:
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,65,random(-100,-80),this.align,200,180,false,"none"))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,65,random(-160,-140),this.align,200,180,false,"none"))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,65,random(140,160),this.align,200,180,false,"none"))
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,65,random(80,100),this.align,200,180,false,"none"))
                            break
                            case 15: case 18:
                                if(this.reload==479||this.reload==459){
                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,97,-120+random(-15,15),this.align,400,300,false,"none"))
                                    let mult=random(1,1.5)
                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                }
                            break
                            default:
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-10,this.position.y,65,random(-92,-88),this.align,200,180,false,"none"))
                            break
                        }
                    }
                }
            break
            case 15:
                if(this.reload>0){
                    this.reload--
                    if(this.reload==479||this.reload==439){
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-15,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-21,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-27,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-33,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-39,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-45,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-51,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-57,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-63,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-69,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-75,this.align,150,180,false,"none"))
                    }else if(this.reload==459){
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-18,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-24,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-30,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-36,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-42,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-48,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-54,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-60,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-66,this.align,150,180,false,"none"))
                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x-this.width/2-4,this.position.y-this.height/2-4,4,-72,this.align,150,180,false,"none"))
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
                if(this.recharge>0&&(game.level==15||game.level==18)){
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
            break
        }
        if(this.type!=7){
            for(let a=0,la=this.collide.length;a<la;a++){
                for(let b=0,lb=this.collide[a].length;b<lb;b++){
                    let c=this.collide[a][b]
                    if(a==0&&this.type!=5&&this.type!=8&&this.type!=9&&this.type!=10&&this.type!=11&&this.type!=12&&this.type!=14&&this.type!=16&&this.type!=27&&(
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
                        c.type==246||c.type==247||c.type==248||c.type==250
                    )){
                        let d=collideBoxBox(this,c)
                        let incident
                        let vecBall
                        if((c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239)&&d<0){
                            let e={position:c.position,previous:c.previous,width:0,height:0}
                            d=collideBoxBox(this,e)
                        }
                        if(d>=0&&!this.redundant[d]){
                            switch(d){
                                case 0:
                                    if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239){
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
                                    if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239){
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
                                    if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239){
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
                                    if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239){
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
                                    if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239){
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
                                    if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239){
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
                                    if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239){
                                        if(c.velocity.x<0){
                                            c.position.y=this.position.y+this.height/2+c.height/2+0.1-this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                            c.velocity.x*=-1
                                            c.direction+=180
                                            c.hit=[]
                                            c.bounces++
                                            if(c.bounces>=3){
                                                c.active=false
                                            }
                                        }
                                    }else if(c.type==135||c.type==136||c.type==169||c.type==170){
                                        c.position.y=this.position.y+this.height/2+c.height/2+0.1-this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                        c.previous.position.y=this.position.y+this.height/2+c.height/2+0.1-this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                        incident=atan2(game.tileset[0]*this.height/this.width,game.tileset[0])
                                        vecBall=[c.effectiveDirection+180,sqrt(c.velocity.x**2+c.velocity.y**2)]
                                        if(abs(incident-vecBall[0])<90||abs(incident-vecBall[0]-360)<90||abs(incident-vecBall[0]+360)<90){
                                            c.velocity.x=lsin(incident*2-vecBall[0])*vecBall[1]
                                            c.velocity.y=lcos(incident*2-vecBall[0])*vecBall[1]
                                            c.position.x+=c.velocity.x*0.1
                                            c.position.y+=c.velocity.y*0.1
                                        }
                                    }else{
                                        c.position.y=this.position.y+this.height/2+c.height/2+0.1-this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                        c.previous.position.y=this.position.y+this.height/2+c.height/2+0.1-this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
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
                                    if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239){
                                        if(c.velocity.x>0){
                                            c.position.y=this.position.y+this.height/2+c.height/2+0.1-this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                            c.velocity.x*=-1
                                            c.direction+=180
                                            c.hit=[]
                                            c.bounces++
                                            if(c.bounces>=3){
                                                c.active=false
                                            }
                                        }
                                    }else if(c.type==135||c.type==136||c.type==169||c.type==170){
                                        c.position.y=this.position.y+this.height/2+c.height/2+0.1-this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                        c.previous.position.y=this.position.y+this.height/2+c.height/2+0.1-this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                        incident=atan2(-game.tileset[0]*this.height/this.width,game.tileset[0])
                                        vecBall=[c.effectiveDirection+180,sqrt(c.velocity.x**2+c.velocity.y**2)]
                                        if(abs(incident-vecBall[0])<90||abs(incident-vecBall[0]-360)<90||abs(incident-vecBall[0]+360)<90){
                                            c.velocity.x=lsin(incident*2-vecBall[0])*vecBall[1]
                                            c.velocity.y=lcos(incident*2-vecBall[0])*vecBall[1]
                                            c.position.x+=c.velocity.x*0.1
                                            c.position.y+=c.velocity.y*0.1
                                        }
                                    }else{
                                        c.position.y=this.position.y+this.height/2+c.height/2+0.1-this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                        c.previous.position.y=this.position.y+this.height/2+c.height/2+0.1-this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
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
                                    if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239){
                                        if(c.velocity.x<0){
                                            c.direction+=180
                                            c.hit=[]
                                            c.bounces++
                                            if(c.bounces>=3){
                                                c.active=false
                                            }
                                        }
                                    }else if(c.velocity.x<0){
                                        c.position.x=this.internalBounder.position.x+this.internalBounder.width/2+c.width/2+0.1
                                        c.velocity.x*=-1
                                    }
                                break
                                case 9:
                                    if(c.type==91||c.type==92||c.type==93||c.type==96||c.type==108||c.type==204||c.type==208||c.type==237||c.type==238||c.type==239){
                                        if(c.velocity.x>0){
                                            c.direction+=180
                                            c.hit=[]
                                            c.bounces++
                                            if(c.bounces>=3){
                                                c.active=false
                                            }
                                        }
                                    }else if(c.velocity.x>0){
                                        c.position.x=this.internalBounder.position.x-this.internalBounder.width/2-c.width/2+0.1
                                        c.velocity.x*=-1
                                    }
                                break
                            }
                            if(
                                c.type==113||c.type==114||c.type==115||c.type==116||c.type==117||
                                c.type==146||c.type==156||c.type==181||c.type==201||c.type==205||
                                c.type==209||c.type==216||c.type==220||c.type==221||c.type==243||
                                c.type==245||c.type==246||c.type==247||c.type==250
                            ){
                                if(c.type==201&&!c.stop){
                                    entities.projectiles.push(new projectile(c.layer,c.position.x,c.position.y,89,c.direction,this.id,1,450,c.crit,c.index))
                                }else if(c.type==221&&!c.stop){
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
                            }else if((c.type==30||c.type==60||c.type==65||c.type==73||c.type==83||c.type==98||c.type==104||c.type==110||c.type==235)&&c.bounceTimer==0){
                                c.bounces++
                                c.bounceTimer=5
                                if(c.type==235){
                                    let mult=random(0.625,1.6)
                                    c.velocity.x*=mult
                                    c.velocity.y*=mult
                                }
                                if(c.bounces>=3){
                                    c.explode()
                                    c.active=false
                                }
                            }
                        }
                    }else if(a==0&&inBoxBox(this.bounder,c)&&c.active&&
                        this.type!=5&&this.type!=8&&this.type!=9&&this.type!=10&&this.type!=11&&this.type!=12&&this.type!=14&&this.type!=16&&this.type!=27
                    ){
                        let d=collideBoxBox(this,c)
                        if(d>=0&&!this.redundant[d]&&c.timer>=2||c.timer==1&&inBoxBox(this,c)&&this.type!=17&&this.type!=18&&this.type!=20&&this.type!=21||c.timer==0&&(this.type==17||this.type==18||this.type==19||this.type==21)&&inTriangleBoxBasic(this.triangle,c)){
                            if(
                                c.type!=7&&c.type!=23&&c.type!=25&&c.type!=32&&c.type!=37&&
                                c.type!=40&&c.type!=46&&c.type!=79&&c.type!=84&&c.type!=89&&
                                c.type!=100&&c.type!=103&&c.type!=112&&c.type!=193&&c.type!=194&&
                                c.type!=195
                            ){
                                c.active=false
                                c.speed=0
                                if(
                                    c.type==2||c.type==3||c.type==16||c.type==21||c.type==22||
                                    c.type==26||c.type==27||c.type==41||c.type==45||c.type==47||
                                    c.type==48||c.type==53||c.type==54||c.type==55||c.type==56||
                                    c.type==58||c.type==64||c.type==66||c.type==78||c.type==80||
                                    c.type==86||c.type==101
                                ){
                                    c.explode()
                                }
                            }
                        }
                    }else if(a==1&&inBoxBox(this.bounder,c)
                        &&!(this.type==5&&(c.id>0&&!game.attacker&&game.level!=17&&game.level!=18||c.id==0&&(game.attacker||game.level==17||game.level==18)||this.exploded))
                        &&!(this.type==8&&(c.id<=0||this.recharge>0||c.weapon.uses>=(c.weaponData.uses==1?c.weaponData.uses:c.weaponData.uses*c.ammoMult)||c.weapon.uses<=0||c.construct||c.mafia))
                        &&!(this.type==9&&(c.id<=0||this.recharge>0||c.life>=c.base.life||c.construct||c.mafia))
                        &&!((this.type==10||this.type==14)&&(c.id>0&&c.id<=game.gaming))
                        &&!(this.type==12&&(c.id<=0||this.recharge>0))
                        &&!(this.type==16&&(c.id<=0||c.id>game.gaming||this.recharge>0||c.construct||c.mafia))
                        &&!(this.type==27&&(c.id<=0||this.recharge>0||c.construct||c.mafia))
                    ){
                        let d=collideBoxBox(this,c)
                        switch(this.type){
                            case 5:
                                this.exploded=true
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,16,0,this.align,200,2,false,"none"))
                                entities.projectiles[entities.projectiles.length-1].explode()
                                entities.projectiles[entities.projectiles.length-1].active=false
                            break
                            case 8:
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
                                c.weapon.uses=min(c.weaponData.uses==1?c.weaponData.uses:c.weaponData.uses*c.ammoMult,c.weapon.uses+ceil(c.weaponData.uses*c.ammoMult/2))
                                c.weapon.cooldown=min(c.weapon.cooldown,30)
                                if(game.level==6){
                                    this.type=[9,12][floor(random(0,2))]
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
                                if(c.id>0&&!game.attacker&&game.level!=17&&game.level!=18||c.id==0&&(game.attacker||game.level==17||game.level==18)){
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
                                    let chunk=floor(random(0,1.5))
                                    this.weapon=listing[chunk][floor(random(listing[chunk].length))]
                                }else if(game.level==15||game.level==18||game.level==20||game.level==21){
                                    c.newWeaponSet(this.weapon)
                                    let chunk=floor(random(0,1.5))
                                    this.weapon=listing[chunk][floor(random(listing[chunk].length))]
                                    this.recharge=3600-(game.gaming-1)*600
                                }else if(!game.weapon[c.id-1].includes(this.weapon)&&(game.level==13&&game.weapon[c.id-1].length<3||game.level==14&&game.weapon[c.id-1].length<(game.peakWeapon?1:4))){
                                    game.weapon[c.id-1].push(this.weapon)
                                    this.recharge=1800
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
                            break
                            default:
                                if(!this.redundant[d]){
                                    switch(d){
                                        case 0:
                                            c.position.y=this.position.y+this.height/2+c.height/2+0.1
                                            c.previous.position.y=this.position.y+this.height/2+c.height/2+0.1
                                            c.velocity.y=0
                                            switch(this.type){
                                                case 15:
                                                    if(this.reload==0&&(c.id>0||game.attacker||game.level==17||game.level==18)&&c.life>0&&c.attacking){
                                                        if(game.attacker||game.level==17||game.level==18){
                                                            this.align=c.id
                                                        }
                                                        this.reload=480
                                                    }
                                                break
                                            }
                                        break
                                        case 1:
                                            c.position.y=this.position.y-this.height/2-c.height/2-0.1
                                            c.previous.position.y=this.position.y-this.height/2-c.height/2-0.1
                                            c.velocity.y=0
                                            c.jump.time=5
                                            if(
                                                (
                                                    c.playerData.name=='PlayerPistol'||c.playerData.name=='PlayerPushPistol'||c.playerData.name=='PlayerPistolVulnerable'||c.playerData.name=='PlayerPistolConfuse'||c.playerData.name=='PlayerMedicDoubleJump'||
                                                    c.playerData.name=='PlayerPushierPistol'||c.playerData.name=='PlayerPistolOfficer'||c.playerData.name=='PlayerPistolception'||c.playerData.name=='PlayerPistolInspect'||
                                                    c.playerData.name=='PlayerSwitcheroo'&&c.subPlayerAData.name=='PlayerPistol'
                                                )&&c.weapon.uses>0){
                                                c.jump.double=1
                                            }
                                            if(c.playerData.name=='PlayerPistolQuadrupleJump'){
                                                c.jump.double=1
                                                c.jump.triple=1
                                                c.jump.quadruple=1
                                            }
                                            switch(this.type){
                                                case 2: case 25: case 29:
                                                    c.bounceTime=15
                                                break
                                                case 3:
                                                    c.velocity.y=-10
                                                    c.takeDamage(50)
                                                    c.collect.time=max(c.collect.time,150)
                                                break
                                                case 4:
                                                    if(this.reload==0&&(c.id>0||game.attacker||game.level==17||game.level==18)&&c.life>0&&c.attacking){
                                                        if(game.attacker||game.level==17||game.level==18){
                                                            this.align=c.id
                                                        }
                                                        this.reload=480
                                                        switch(game.level){
                                                            case 6:
                                                                for(let e=0,le=15;e<le;e++){
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,random(-155,-175),this.align,100,240,false,"none"))
                                                                    let mult=random(2,5)
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                }
                                                            break
                                                            case 7:
                                                                for(let f=0,lf=3;f<lf;f++){
                                                                    for(let e=0,le=4-f%2;e<le;e++){
                                                                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,-180-4+le*4-e*10,this.align,100,240,false,"none"))
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.x*=(4-f)
                                                                        entities.projectiles[entities.projectiles.length-1].velocity.y*=(4-f)
                                                                    }
                                                                }
                                                            break
                                                            case 15: case 18:
                                                                for(let e=0,le=4;e<le;e++){
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,-135+(8+(e%2)*2)*(e>=2?1:-1),this.align,e==2?40:100,240,false,"none"))
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=2-((e%2)*0.4)
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=2-((e%2)*0.4)
                                                                }
                                                            break
                                                            default:
                                                                for(let e=0,le=15;e<le;e++){
                                                                    entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,random(-157.5,-112.5),this.align,100,240,false,"none"))
                                                                    let mult=random(1.25,2.5)
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                                }
                                                            break
                                                        }
                                                    }
                                                break
                                                case 13: case 15:
                                                    if(this.reload==0&&c.id>0&&c.life>0&&c.attacking){
                                                        this.reload=480
                                                    }
                                                break
                                                case 23:
                                                    if(this.reload==0&&(c.id>0||game.attacker||game.level==17||game.level==18)&&c.life>0&&c.attacking){
                                                        if(game.attacker||game.level==17||game.level==18){
                                                            this.align=c.id
                                                        }
                                                        this.reload=480
                                                        for(let e=0,le=15;e<le;e++){
                                                            entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,73,random(-157.5,-112.5),this.align,40,240,false,"none"))
                                                            let mult=random(1.25,2.5)
                                                            entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                            entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
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
                                            }
                                            if(c.thrown&&this.type!=26){
                                                c.thrown=false
                                            }
                                            if(c.parachute){
                                                c.parachute=false
                                                c.weapon.cooldown+=120
                                                if(!game.pvp){
                                                    c.stuckTime=c.playerData.sizeBuff>=1.5?120:60
                                                }
                                            }
                                        break
                                        case 2:
                                            c.position.x=this.position.x+this.width/2+c.width/2+0.1
                                            c.previous.position.x=this.position.x+this.width/2+c.width/2+0.1
                                            c.velocity.x=this.velocity.x
                                        break
                                        case 3:
                                            c.position.x=this.position.x-this.width/2-c.width/2-0.1
                                            c.previous.position.x=this.position.x-this.width/2-c.width/2-0.1
                                            c.velocity.x=this.velocity.x
                                            switch(this.type){
                                                case 13: case 15: case 18:
                                                    if(this.reload==0&&c.id>0&&c.life>0&&c.attacking){
                                                        this.reload=480
                                                    }
                                                break
                                            }
                                        break
                                        case 4:
                                            c.position.y=this.position.y-this.height/2-c.height/2-0.1+this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                            c.velocity.y=c.velocity.x*this.height/this.width
                                            c.jump.time=5
                                            if(
                                                (
                                                    c.playerData.name=='PlayerPistol'||c.playerData.name=='PlayerPushPistol'||c.playerData.name=='PlayerPistolVulnerable'||c.playerData.name=='PlayerPistolConfuse'||c.playerData.name=='PlayerMedicDoubleJump'||
                                                    c.playerData.name=='PlayerPushierPistol'||c.playerData.name=='PlayerPistolOfficer'||c.playerData.name=='PlayerPistolception'||
                                                    c.playerData.name=='PlayerSwitcheroo'&&c.subPlayerAData.name=='PlayerPistol'
                                                )&&c.weapon.uses>0){
                                                c.jump.double=1
                                            }
                                            if(c.thrown&&this.type!=26){
                                                c.thrown=false
                                            }
                                            if(c.parachute){
                                                c.parachute=false
                                                c.weapon.cooldown+=120
                                                if(!game.pvp){
                                                    c.stuckTime=60
                                                }
                                            }
                                            c.velocity.x*=1-this.height/this.width*0.1*(c.playerData.name=='PlayerAuger'?0.2:1)
                                        break
                                        case 5:
                                            c.position.y=this.position.y-this.height/2-c.height/2-0.1+this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                            c.velocity.y=-c.velocity.x*this.height/this.width
                                            c.jump.time=5
                                            if(
                                                (
                                                    c.playerData.name=='PlayerPistol'||c.playerData.name=='PlayerPushPistol'||c.playerData.name=='PlayerPistolVulnerable'||c.playerData.name=='PlayerPistolConfuse'||c.playerData.name=='PlayerMedicDoubleJump'||
                                                    c.playerData.name=='PlayerPushierPistol'||c.playerData.name=='PlayerPistolOfficer'||c.playerData.name=='PlayerPistolception'||
                                                    c.playerData.name=='PlayerSwitcheroo'&&c.subPlayerAData.name=='PlayerPistol'
                                                )&&c.weapon.uses>0){
                                                c.jump.double=1
                                            }
                                            if(c.thrown&&this.type!=26){
                                                c.thrown=false
                                            }
                                            if(c.parachute){
                                                c.parachute=false
                                                c.weapon.cooldown+=120
                                                if(!game.pvp){
                                                    c.stuckTime=60
                                                }
                                            }
                                            c.velocity.x*=1-this.height/this.width*0.1*(c.playerData.name=='PlayerAuger'?0.2:1)
                                        break
                                        case 6:
                                            c.position.y=this.position.y+this.height/2+c.height/2+0.1-this.height*max((c.position.x-c.width/2-this.position.x+this.width/2)/this.width,0)
                                            c.velocity.y=-c.velocity.x*this.height/this.width
                                            c.velocity.x*=1-this.height/this.width*0.1*(c.playerData.name=='PlayerAuger'?0.2:1)
                                        break
                                        case 7:
                                            c.position.y=this.position.y+this.height/2+c.height/2+0.1-this.height*max((this.position.x+this.width/2-c.position.x-c.width/2)/this.width,0)
                                            c.velocity.y=c.velocity.x*this.height/this.width
                                            c.velocity.x*=1-this.height/this.width*0.1*(c.playerData.name=='PlayerAuger'?0.2:1)
                                        break
                                        case 8:
                                            c.position.x=this.internalBounder.position.x+this.internalBounder.width/2+c.width/2+0.1
                                            c.velocity.x=0
                                        break
                                        case 9:
                                            c.position.x=this.internalBounder.position.x-this.internalBounder.width/2-c.width/2+0.1
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
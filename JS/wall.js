class wall{
    constructor(layer,x,y,width,height,type){
        this.layer=layer
        this.position={x:x,y:y}
        this.width=width
        this.height=height
        this.type=type
        this.collide=[entities.projectiles,entities.players]
        this.redundant=[false,false,false,false]
        this.standard=this.type!=5
        this.boundary=[
            [[{x:this.position.x-this.width/2,y:this.position.y+this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
            [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y-this.height/2}]],
            [[{x:this.position.x+this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
            [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x-this.width/2,y:this.position.y+this.height/2}]],
        ]
        this.exploded=false
        this.time=0
    }
    set(){
        switch(this.type){
            case 1: case 2:
                if(game.level==6){
                    this.balls=[]
                    for(let a=0,la=this.width*this.height/225;a<la;a++){
                        this.balls.push([-this.width/2+(a*0.19%1)*this.width,random(-this.height/2,this.height/2),random(30,40),random(0,1)])
                    }
                }
            break
            case 4:
                this.reload=0
            break
            case 6:
                this.carry=[]
                this.disable=false
            break
        }
    }
    checkHorizontal(){
        if(!this.remove){
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    let c=entities.walls[a][b]
                    if(c.type==this.type&&(c.position.x!=this.position.x||c.position.y!=this.position.y)){
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
                    if(c.type==this.type&&(c.position.x!=this.position.x||c.position.y!=this.position.y)){
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
    checkRedundancy(){
        this.boundary=[
            [[{x:this.position.x-this.width/2,y:this.position.y+this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
            [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y-this.height/2}]],
            [[{x:this.position.x+this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
            [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x-this.width/2,y:this.position.y+this.height/2}]],
        ]
        if(this.position.y+this.height/2>=this.layer.height){
            this.redundant[0]=true
            this.boundary[0]=[]
        }
        if(this.position.y-this.height/2<=0){
            this.redundant[1]=true
            this.boundary[1]=[]
        }
        if(this.position.x+this.width/2>=this.layer.width){
            this.redundant[2]=true
            this.boundary[2]=[]
        }
        if(this.position.x-this.width/2<=0){
            this.redundant[3]=true
            this.boundary[3]=[]
        }
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
                    }
                }
            }
        }
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
        this.bounder={position:{x:bounds[0]/2+bounds[1]/2,y:bounds[2]/2+bounds[3]/2},width:bounds[1]-bounds[0],height:bounds[3]-bounds[2]}
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.noStroke()
        switch(this.type){
            case 1:
                if(game.level==7){
                    this.layer.noFill()
                    this.layer.stroke(50,150,200)
                    this.layer.strokeWeight(4)
                    for(let a=0,la=4;a<la;a++){
                        for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                            this.layer.line(
                                this.boundary[a][b][0].x+(a==2?-2:a==3?2:2)-this.position.x,
                                this.boundary[a][b][0].y+(a==0?-2:a==1?2:2)-this.position.y,
                                this.boundary[a][b][1].x+(a==2?-2:a==3?2:-2)-this.position.x,
                                this.boundary[a][b][1].y+(a==0?-2:a==1?2:-2)-this.position.y
                            )
                        }
                    }
                }else if(game.level==6){
                    this.layer.fill(30+this.position.y/this.layer.height*30,60-this.position.y/this.layer.height*15,30)
                    this.layer.rect(0,0,this.width+1,this.height+1)
                }else{
                    this.layer.fill(120)
                    this.layer.rect(0,0,this.width+1,this.height+1)
                }
            break
            case 2:
                if(game.level==6){
                    this.layer.fill(60+this.position.y/this.layer.height*60,120-this.position.y/this.layer.height*30,60)
                    this.layer.rect(0,0,this.width+1,this.height+1)
                }else{
                    this.layer.fill(120,200,120)
                    this.layer.rect(0,0,this.width+1,this.height+1)
                }
            break
            case 3:
                this.layer.fill(120,200,200)
                this.layer.rect(0,0,this.width+1,this.height+1)
            break
            case 4:
                this.layer.fill(220-this.reload/6,120,120)
                this.layer.rect(0,0,this.width+1,this.height+1)
            break
            case 5:
                if(!this.exploded){
                    this.layer.fill(120,40,40)
                    this.layer.rect(0,-this.height/6,this.width*0.6,this.height/3+1)
                    this.layer.fill(80)
                    this.layer.rect(0,this.height/6,this.width+1,this.height*2/3+1)
                }
            break
            case 6:
                this.layer.fill(40,120,40)
                this.layer.rect(0,0,this.width+1,this.height+1)
            break
        }
        //this.layer.stroke(255,150,50)
        //this.layer.noFill()
        //this.layer.rect(0,0,this.width,this.height)
        this.layer.pop()
        /*this.layer.stroke(255,150,50)
        this.layer.noFill()
        this.layer.rect(this.bounder.position.x,this.bounder.position.y,this.bounder.width-10,this.bounder.height-10)*/
    }
    displayOver(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.noStroke()
        switch(this.type){
            case 1:
                if(game.level==6){
                    for(let a=0,la=this.balls.length;a<la;a++){
                        this.layer.fill(
                            30+(this.position.y+this.balls[a][1])/this.layer.height*30+this.balls[a][3]*30,
                            60-(this.position.y+this.balls[a][1])/this.layer.height*15+this.balls[a][3]*30,
                            30+this.balls[a][3]*30
                        )
                        regPoly(this.layer,this.balls[a][0],this.balls[a][1],floor(random(4,9)),this.balls[a][2]/2,this.balls[a][2]/2,random(0,360))
                    }
                }
            break
            case 2:
                if(game.level==6){
                    for(let a=0,la=this.balls.length;a<la;a++){
                        this.layer.fill(
                            60+(this.position.y+this.balls[a][1])/this.layer.height*60+this.balls[a][3]*30,
                            120-(this.position.y+this.balls[a][1])/this.layer.height*30+this.balls[a][3]*30,
                            60+this.balls[a][3]*30
                        )
                        regPoly(this.layer,this.balls[a][0],this.balls[a][1],floor(random(4,9)),this.balls[a][2]/2,this.balls[a][2]/2,random(0,360))
                    }
                }
            break
        }
        this.layer.pop()
        /*this.layer.stroke(50,50+this.type*100,200)
        this.layer.strokeWeight(4)
        for(let a=0,la=1;a<la;a++){
            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                this.layer.line(
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
            case 4:
                if(this.reload>0){
                    this.reload--
                }
            break
            case 6:
                this.position.x+=2
                this.bounder.position.x+=2
                for(let a=0,la=this.boundary.length;a<la;a++){
                    for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                        for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                            this.boundary[a][b][c].x+=2
                        }
                    }
                }
                if(this.time>this.layer.width*0.1){
                    this.position.y+=2
                    for(let a=0,la=this.boundary.length;a<la;a++){
                        for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                            for(let c=0,lc=this.boundary[a][b].length;c<lc;c++){
                                this.boundary[a][b][c].y+=2
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
                        this.carry[a].position.x+=2
                    }
                }
                if(this.position.x>this.layer.height+50){
                    this.remove=true
                }
            break
        }
        for(let a=0,la=this.collide.length;a<la;a++){
            for(let b=0,lb=this.collide[a].length;b<lb;b++){
                let c=this.collide[a][b]
                if(a==0&&(
                    c.type==5||c.type==8||c.type==17||c.type==28||c.type==29||
                    c.type==30||c.type==34||c.type==35||c.type==42||c.type==51||
                    c.type==52||c.type==60||c.type==61||c.type==62
                )){
                    let d=-1
                    if(inBoxBox(this,{position:c.midpoint.position,width:c.width,height:c.height})){
                        d=collideBoxBoxIndex2(this,c)
                    }else if(inBoxBox(this,c)){
                        d=collideBoxBoxIndex1(this,c)
                    }
                    if(d>=0&&!this.redundant[d]){
                        switch(d){
                            case 0:
                                if(c.velocity.y<0){
                                    c.position.y=this.position.y+this.height/2+c.height/2
                                    c.velocity.y*=-1
                                }
                            break
                            case 1:
                                if(c.velocity.y>0){
                                    c.position.y=this.position.y-this.height/2-c.height/2
                                    c.velocity.y*=-1
                                }
                            break
                            case 2:
                                if(c.velocity.x<0){
                                    c.position.x=this.position.x+this.width/2+c.width/2
                                    c.velocity.x*=-1
                                }
                            break
                            case 3:
                                if(c.velocity.x>0){
                                    c.position.x=this.position.x-this.width/2-c.width/2
                                    c.velocity.x*=-1
                                }
                            break
                        }
                        if(c.type==30||c.type==60){
                            c.bounces++
                            if(c.bounces>=3){
                                c.explode()
                                c.active=false
                            }
                        }
                    }
                }else if(a==0&&inBoxBox(this,c)&&c.active){
                    if(
                        c.type!=7&&c.type!=23&&c.type!=25&&c.type!=32&&c.type!=37&&
                        c.type!=40&&c.type!=46
                    ){
                        c.active=false
                        c.speed=0
                        if(
                            c.type==2||c.type==3||c.type==16||c.type==21||c.type==22||
                            c.type==26||c.type==27||c.type==41||c.type==45||c.type==47||
                            c.type==48||c.type==53||c.type==54||c.type==55||c.type==56||
                            c.type==58||c.type==64
                        ){
                            c.explode()
                        }
                    }
                }else if(a==1&&inBoxBox(this.bounder,c)&&!(this.type==5&&(c.id>0||this.exploded))){
                    let d=collideBoxBox(this,c)
                    switch(this.type){
                        case 5:
                            if(!this.exploded){
                                this.exploded=true
                                entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y+this.height/2,16,0,-1,200,2,false,-1))
                            }
                        break
                        default:
                            if(!this.redundant[d]){
                                switch(d){
                                    case 0:
                                        c.position.y=this.position.y+this.height/2+c.height/2
                                        c.previous.position.y=this.position.y+this.height/2+c.height/2
                                        c.velocity.y=0
                                    break
                                    case 1:
                                        c.position.y=this.position.y-this.height/2-c.height/2
                                        c.previous.position.y=this.position.y-this.height/2-c.height/2
                                        c.velocity.y=0
                                        c.jump.time+=5
                                        if((c.playerData.name=='PlayerPistol'||c.playerData.name=='PlayerPushPistol')&&c.weapon.uses>0){
                                            c.jump.double=1
                                        }
                                        switch(this.type){
                                            case 2:
                                                c.bounceTime=15
                                            break
                                            case 3:
                                                c.velocity.y=-10
                                                c.takeDamage(50)
                                            break
                                            case 4:
                                                if(this.reload==0&&c.id>0&&c.life>0&&c.attacking){
                                                    this.reload=600
                                                    for(let e=0,le=12;e<le;e++){
                                                        entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y-this.height/2,60,random(-157.5,-112.5),-1,100,180,false,-1))
                                                        let mult=random(1.25,2.5)
                                                        entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                                                        entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                                                    }
                                                }
                                            break
                                        }
                                        if(c.parachute){
                                            c.parachute=false
                                        }
                                    break
                                    case 2:
                                        c.position.x=this.position.x+this.width/2+c.width/2
                                        c.previous.position.x=this.position.x+this.width/2+c.width/2
                                        c.velocity.x=0
                                    break
                                    case 3:
                                        c.position.x=this.position.x-this.width/2-c.width/2
                                        c.previous.position.x=this.position.x-this.width/2-c.width/2
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
class wall{
    constructor(layer,x,y,width,height,type){
        this.layer=layer
        this.position={x:x,y:y}
        this.width=width
        this.height=height
        this.type=type
        this.collide=[entities.projectiles,entities.players]
        this.redundant=[false,false,false,false]
        this.standard=true
        this.boundary=[
            [[{x:this.position.x-this.width/2,y:this.position.y+this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
            [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y-this.height/2}]],
            [[{x:this.position.x+this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
            [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x-this.width/2,y:this.position.y+this.height/2}]],
        ]
        this.set()
    }
    set(){
        switch(this.type){
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
        }
        if(this.position.y-this.height/2<=0){
            this.redundant[1]=true
        }
        if(this.position.x+this.width/2>=this.layer.width){
            this.redundant[2]=true
        }
        if(this.position.x-this.width/2<=0){
            this.redundant[3]=true
        }
        for(let a=0,la=entities.walls.length;a<la;a++){
            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                let c=entities.walls[a][b]
                if(c.type==this.type&&c.standard){
                    for(let d=0,ld=this.boundary[0].length;d<ld;d++){
                        if(c.position.y==this.position.y+this.height/2+c.height/2&&c.position.x-c.width/2>this.boundary[0][d][0].x&&c.position.x+c.width/2<this.boundary[0][d][1].x){
                            this.boundary[0].push([{x:c.position.x+c.width/2,y:this.boundary[0][d][0].y},{x:this.boundary[0][d][1].x,y:this.boundary[0][d][1].y}])
                            this.boundary[0][d][1].x=c.position.x-c.width/2
                        }
                    }
                    for(let d=0,ld=this.boundary[1].length;d<ld;d++){
                        if(c.position.y==this.position.y-this.height/2-c.height/2&&c.position.x-c.width/2>this.boundary[1][d][0].x&&c.position.x+c.width/2<this.boundary[1][d][1].x){
                            this.boundary[1].push([{x:c.position.x+c.width/2,y:this.boundary[1][d][0].y},{x:this.boundary[1][d][1].x,y:this.boundary[1][d][1].y}])
                            this.boundary[1][d][1].x=c.position.x-c.width/2
                        }
                    }
                    for(let d=0,ld=this.boundary[2].length;d<ld;d++){
                        if(c.position.x==this.position.x+this.width/2+c.width/2&&c.position.y-c.height/2>this.boundary[2][d][0].y&&c.position.y+c.height/2<this.boundary[2][d][1].y){
                            this.boundary[2].push([{x:this.boundary[2][d][0].x,y:c.position.y+c.height/2},{x:this.boundary[2][d][1].x,y:this.boundary[2][d][1].y}])
                            this.boundary[2][d][1].y=c.position.y-c.height/2
                        }
                    }
                    for(let d=0,ld=this.boundary[3].length;d<ld;d++){
                        if(c.position.x==this.position.x-this.width/2-c.width/2&&c.position.y-c.height/2>this.boundary[3][d][0].y&&c.position.y+c.height/2<this.boundary[3][d][1].y){
                            this.boundary[3].push([{x:this.boundary[3][d][0].x,y:c.position.y+c.height/2},{x:this.boundary[3][d][1].x,y:this.boundary[3][d][1].y}])
                            this.boundary[3][d][1].y=c.position.y-c.height/2
                        }
                    }
                    for(let d=0,ld=2;d<ld;d++){
                        for(let e=0,le=this.boundary[0].length;e<le;e++){
                            if(c.position.y==this.position.y+this.height/2+c.height/2&&c.position.x-c.width/2<=this.boundary[0][e][d].x&&c.position.x+c.width/2>=this.boundary[0][e][d].x){
                                this.boundary[0][e][d].x=c.position.x+c.width/2*(1-d*2)
                            }
                        }
                        for(let e=0,le=this.boundary[1].length;e<le;e++){
                            if(c.position.y==this.position.y-this.height/2-c.height/2&&c.position.x-c.width/2<=this.boundary[1][e][d].x&&c.position.x+c.width/2>=this.boundary[1][e][d].x){
                                this.boundary[1][e][d].x=c.position.x+c.width/2*(1-d*2)
                            }
                        }
                        for(let e=0,le=this.boundary[2].length;e<le;e++){
                            if(c.position.x==this.position.x+this.width/2+c.width/2&&c.position.y-c.height/2<=this.boundary[2][e][d].y&&c.position.y+c.height/2>=this.boundary[2][e][d].y){
                                this.boundary[2][e][d].y=c.position.y+c.height/2*(1-d*2)
                            }
                        }
                        for(let e=0,le=this.boundary[3].length;e<le;e++){
                            if(c.position.x==this.position.x-this.width/2-c.width/2&&c.position.y-c.height/2<=this.boundary[3][e][d].y&&c.position.y+c.height/2>=this.boundary[3][e][d].y){
                                this.boundary[3][e][d].y=c.position.y+c.height/2*(1-d*2)
                            }
                        }
                    }
                    if(c.position.y==this.position.y+this.height/2+c.height/2&&c.position.x-c.width/2<=this.position.x-this.width/2&&c.position.x+c.width/2>=this.position.x+this.width/2){
                        this.redundant[0]=true
                    }
                    if(c.position.y==this.position.y-this.height/2-c.height/2&&c.position.x-c.width/2<=this.position.x-this.width/2&&c.position.x+c.width/2>=this.position.x+this.width/2){
                        this.redundant[1]=true
                    }
                    if(c.position.x==this.position.x+this.width/2+c.width/2&&c.position.y-c.height/2<=this.position.y-this.height/2&&c.position.y+c.height/2>=this.position.y+this.height/2){
                        this.redundant[2]=true
                    }
                    if(c.position.x==this.position.x-this.width/2-c.width/2&&c.position.y-c.height/2<=this.position.y-this.height/2&&c.position.y+c.height/2>=this.position.y+this.height/2){
                        this.redundant[3]=true
                    }
                }
            }
        }
        for(let a=0,la=entities.walls.length;a<la;a++){
            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                let c=entities.walls[a][b]
                if(c.type==this.type){
                    for(let d=0,ld=this.boundary[0].length;d<ld;d++){
                        if(abs(c.position.y-(this.position.y+this.height/2+c.height/2))<1&&c.position.x-c.width/2>this.boundary[0][d][0].x&&c.position.x+c.width/2<this.boundary[0][d][1].x){
                            this.boundary[0].push([{x:c.position.x+c.width/2,y:this.boundary[0][d][0].y},{x:this.boundary[0][d][1].x,y:this.boundary[0][d][1].y}])
                            this.boundary[0][d][1].x=c.position.x-c.width/2
                        }
                    }
                    for(let d=0,ld=this.boundary[1].length;d<ld;d++){
                        if(abs(c.position.y-(this.position.y-this.height/2-c.height/2))<1&&c.position.x-c.width/2>this.boundary[1][d][0].x&&c.position.x+c.width/2<this.boundary[1][d][1].x){
                            this.boundary[1].push([{x:c.position.x+c.width/2,y:this.boundary[1][d][0].y},{x:this.boundary[1][d][1].x,y:this.boundary[1][d][1].y}])
                            this.boundary[1][d][1].x=c.position.x-c.width/2
                        }
                    }
                    for(let d=0,ld=this.boundary[2].length;d<ld;d++){
                        if(abs(c.position.x-(this.position.x+this.width/2+c.width/2))<1&&c.position.y-c.height/2>this.boundary[2][d][0].y&&c.position.y+c.height/2<this.boundary[2][d][1].y){
                            this.boundary[2].push([{x:this.boundary[2][d][0].x,y:c.position.y+c.height/2},{x:this.boundary[2][d][1].x,y:this.boundary[2][d][1].y}])
                            this.boundary[2][d][1].y=c.position.y-c.height/2
                        }
                    }
                    for(let d=0,ld=this.boundary[3].length;d<ld;d++){
                        if(abs(c.position.x-(this.position.x-this.width/2-c.width/2))<1&&c.position.y-c.height/2>this.boundary[3][d][0].y&&c.position.y+c.height/2<this.boundary[3][d][1].y){
                            this.boundary[3].push([{x:this.boundary[3][d][0].x,y:c.position.y+c.height/2},{x:this.boundary[3][d][1].x,y:this.boundary[3][d][1].y}])
                            this.boundary[3][d][1].y=c.position.y-c.height/2
                        }
                    }
                    for(let d=0,ld=2;d<ld;d++){
                        for(let e=0,le=this.boundary[0].length;e<le;e++){
                            if(abs(c.position.y-(this.position.y+this.height/2+c.height/2))<1&&c.position.x-c.width/2<=this.boundary[0][e][d].x&&c.position.x+c.width/2>=this.boundary[0][e][d].x){
                                this.boundary[0][e][d].x=c.position.x+c.width/2*(1-d*2)
                            }
                        }
                        for(let e=0,le=this.boundary[1].length;e<le;e++){
                            if(abs(c.position.y-(this.position.y-this.height/2-c.height/2))<1&&c.position.x-c.width/2<=this.boundary[1][e][d].x&&c.position.x+c.width/2>=this.boundary[1][e][d].x){
                                this.boundary[1][e][d].x=c.position.x+c.width/2*(1-d*2)
                            }
                        }
                        for(let e=0,le=this.boundary[2].length;e<le;e++){
                            if(abs(c.position.x-(this.position.x+this.width/2+c.width/2))<1&&c.position.y-c.height/2<=this.boundary[2][e][d].y&&c.position.y+c.height/2>=this.boundary[2][e][d].y){
                                this.boundary[2][e][d].y=c.position.y+c.height/2*(1-d*2)
                            }
                        }
                        for(let e=0,le=this.boundary[3].length;e<le;e++){
                            if(abs(c.position.x-(this.position.x-this.width/2-c.width/2))<1&&c.position.y-c.height/2<=this.boundary[3][e][d].y&&c.position.y+c.height/2>=this.boundary[3][e][d].y){
                                this.boundary[3][e][d].y=c.position.y+c.height/2*(1-d*2)
                            }
                        }
                    }
                    if(abs(c.position.y-(this.position.y+this.height/2+c.height/2))<1&&c.position.x-c.width/2<=this.position.x-this.width/2+1&&c.position.x+c.width/2>=this.position.x+this.width/2-1){
                        this.boundary[0]=[]
                    }
                    if(abs(c.position.y-(this.position.y-this.height/2-c.height/2))<1&&c.position.x-c.width/2<=this.position.x-this.width/2+1&&c.position.x+c.width/2>=this.position.x+this.width/2-1){
                        this.boundary[1]=[]
                    }
                    if(abs(c.position.x-(this.position.x+this.width/2+c.width/2))<1&&c.position.y-c.height/2<=this.position.y-this.height/2+1&&c.position.y+c.height/2>=this.position.y+this.height/2-1){
                        this.boundary[2]=[]
                    }
                    if(abs(c.position.x-(this.position.x-this.width/2-c.width/2))<1&&c.position.y-c.height/2<=this.position.y-this.height/2+1&&c.position.y+c.height/2>=this.position.y+this.height/2-1){
                        this.boundary[3]=[]
                    }
                }
            }
        }
    }
    stopGap(){
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
        let bounds=[0,0,0,0]
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
                this.layer.fill(120)
                this.layer.rect(0,0,this.width+1,this.height+1)
            break
            case 2:
                this.layer.fill(120,200,120)
                this.layer.rect(0,0,this.width+1,this.height+1)
            break
        }
        this.layer.stroke(255,150,50)
        this.layer.noFill()
        //this.layer.rect(0,0,this.width,this.height)
        this.layer.pop()
        /*for(let a=0,la=4;a<la;a++){
            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                this.layer.strokeWeight(2)
                this.layer.stroke(50,150,200)
                this.layer.line(
                    this.boundary[a][b][0].x<this.position.x?this.boundary[a][b][0].x+2:this.boundary[a][b][0].x-2,
                    this.boundary[a][b][0].y<this.position.y?this.boundary[a][b][0].y+2:this.boundary[a][b][0].y-2,
                    this.boundary[a][b][1].x<this.position.x?this.boundary[a][b][1].x+2:this.boundary[a][b][1].x-2,
                    this.boundary[a][b][1].y<this.position.y?this.boundary[a][b][1].y+2:this.boundary[a][b][1].y-2
                )
                this.layer.strokeWeight(4)
                this.layer.point(
                    (this.boundary[a][b][0].x<this.position.x?this.boundary[a][b][0].x+2:this.boundary[a][b][0].x-2)/2+
                    (this.boundary[a][b][1].x<this.position.x?this.boundary[a][b][1].x+2:this.boundary[a][b][1].x-2)/2,
                    (this.boundary[a][b][0].y<this.position.y?this.boundary[a][b][0].y+2:this.boundary[a][b][0].y-2)/2+
                    (this.boundary[a][b][1].y<this.position.y?this.boundary[a][b][1].y+2:this.boundary[a][b][1].y-2)/2
                )
            }
        }*/
    }
    update(){
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
                }else if(a==1&&inBoxBox(this.bounder,c)){
                    let d=collideBoxBox(this,c)
                    if(!this.redundant[d]){
                        switch(d){
                            case 0:
                                if(c.velocity.y<0){
                                    c.position.y=this.position.y+this.height/2+c.height/2
                                    c.velocity.y=0
                                }
                            break
                            case 1:
                                if(c.velocity.y>0){
                                    c.position.y=this.position.y-this.height/2-c.height/2
                                    c.velocity.y=0
                                    c.jump.time=5
                                    switch(this.type){
                                        case 2:
                                            c.bounceTime=15
                                        break
                                    }
                                }
                            break
                            case 2:
                                if(c.velocity.x<0){
                                    c.position.x=this.position.x+this.width/2+c.width/2
                                    c.velocity.x=0
                                }
                            break
                            case 3:
                                if(c.velocity.x>0){
                                    c.position.x=this.position.x-this.width/2-c.width/2
                                    c.velocity.x=0
                                }
                            break
                        }
                    }
                }
            }
        }
    }
}
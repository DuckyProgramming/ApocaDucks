class wall{
    constructor(layer,x,y,width,height,type){
        this.layer=layer
        this.position={x:x,y:y}
        this.width=width
        this.height=height
        this.type=type
        this.collide=[entities.projectiles,entities.players]
        this.redundant=[false,false,false,false]
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
    checkRedundancy(){
        for(let a=0,la=entities.walls.length;a<la;a++){
            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                let c=entities.walls[a][b]
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
                if(abs(c.position.y-(this.position.y+this.height/2+c.height/2))<1&&c.position.x-c.width/2<=this.position.x-this.width/2&&c.position.x+c.width/2>=this.position.x+this.width/2){
                    this.redundant[0]=true
                }
                if(abs(c.position.y-(this.position.y-this.height/2-c.height/2))<1&&c.position.x-c.width/2<=this.position.x-this.width/2&&c.position.x+c.width/2>=this.position.x+this.width/2){
                    this.redundant[1]=true
                }
                if(abs(c.position.x-(this.position.x+this.width/2+c.width/2))<1&&c.position.y-c.height/2<=this.position.y-this.height/2&&c.position.y+c.height/2>=this.position.y+this.height/2){
                    this.redundant[2]=true
                }
                if(abs(c.position.x-(this.position.x-this.width/2-c.width/2))<1&&c.position.y-c.height/2<=this.position.y-this.height/2&&c.position.y+c.height/2>=this.position.y+this.height/2){
                    this.redundant[3]=true
                }
            }
        }
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
        }
        this.layer.pop()
        /*for(let a=0,la=4;a<la;a++){
            if(!this.redundant[a]){
                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                    this.layer.stroke(255,this.select?150:50,this.select?50:0)
                    this.layer.line(
                        this.boundary[a][b][0].x<this.position.x?this.boundary[a][b][0].x+1:this.boundary[a][b][0].x-1,
                        this.boundary[a][b][0].y<this.position.y?this.boundary[a][b][0].y+1:this.boundary[a][b][0].y-1,
                        this.boundary[a][b][1].x<this.position.x?this.boundary[a][b][1].x+1:this.boundary[a][b][1].x-1,
                        this.boundary[a][b][1].y<this.position.y?this.boundary[a][b][1].y+1:this.boundary[a][b][1].y-1
                    )
                }
            }
        }*/
    }
    update(){
        for(let a=0,la=this.collide.length;a<la;a++){
            for(let b=0,lb=this.collide[a].length;b<lb;b++){
                let c=this.collide[a][b]
                if(a==0&&(c.type==5||c.type==8||c.type==17||c.type==28)){
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
                    }
                }else if(inBoxBox(this,c)&&(c.active||a==1)){
                    switch(a){
                        case 0:
                            if(c.type!=7&&c.type!=23&&c.type!=25){
                                c.active=false
                                c.speed=0
                                if(c.type==2||c.type==3||c.type==16||c.type==21||c.type==22||c.type==26||c.type==27){
                                    c.explode()
                                }
                            }
                        break
                        case 1:
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
                        break
                    }
                }
            }
        }
    }
}
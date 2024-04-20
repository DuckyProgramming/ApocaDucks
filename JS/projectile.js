class projectile{
    constructor(layer,x,y,type,direction,id,damage,time,crit){
        this.layer=layer
        this.position={x:x,y:y}
        this.type=type
        this.direction=direction
        this.id=id
        this.damage=damage
		this.crit=crit
        this.width=2
        this.height=2
		switch(this.type){
			case 1: case 4: case 9:
				this.speed=random(6,8)
				this.time=random(time,time*2)
			break
			case 2:
				this.speed=5
				this.time=time
			break
			case 3:
				this.speed=0
				this.time=time
			break
			case 5: case 8:
				this.width=4
				this.height=4
				this.speed=6
				this.time=time
				this.previous={position:{x:this.position.x,y:this.position.y}}
				this.past=[
					[this.position.x,this.position.y],
					[this.position.x,this.position.y],
					[this.position.x,this.position.y],
					[this.position.x,this.position.y],
					[this.position.x,this.position.y],
					[this.position.x,this.position.y],
					[this.position.x,this.position.y],
					[this.position.x,this.position.y],
					[this.position.x,this.position.y],
					[this.position.x,this.position.y],
					[this.position.x,this.position.y],
					[this.position.x,this.position.y]
				]
				this.velocity={x:this.speed*sin(this.direction),y:this.speed*cos(this.direction)-4}
			break
			case 6:
				this.speed=random(3,5)
				this.time=random(time,time*2)
			break
			case 7:
				this.width*=10
				this.height*=10
				this.speed=time/4
				this.time=1
			break
		}
		this.timer=0
        this.fade=1
        this.active=true
        this.remove=false
		this.base={time:this.time}
		if(this.crit==1){
			this.damage*=3
		}
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.rotate(this.direction)
        switch(this.type){
            case 1:
                this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.rect(0,4,1,8)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.rect(0,3,1,6)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.rect(0,2,1,4)
                this.layer.fill(250,this.fade)
                this.layer.ellipse(0,0,3)
            break
			case 2:
				this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.rect(0,4,1,8)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.rect(0,3,1,6)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.rect(0,2,1,4)
                this.layer.fill(120,120+this.crit*200,120+this.crit*200,this.fade)
                this.layer.ellipse(0,0,6,20)
				if(!this.active&&this.fade<1){
					this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
					this.layer.ellipse(0,0,240-this.fade*240)
					this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
					this.layer.ellipse(0,0,160-this.fade*160)
					this.layer.fill(240-this.crit*200,80,40,+this.crit*200,this.fade)
					this.layer.ellipse(0,0,80-this.fade*80)
				}
			break
			case 3:
				if(!this.active&&this.fade<1){
					this.layer.fill(240-this.crit*200,40,120+this.crit*200,this.fade)
                	this.layer.ellipse(0,0,480-this.fade*480)
					this.layer.fill(240-this.crit*200,80,160+this.crit*200,this.fade)
					this.layer.ellipse(0,0,360-this.fade*360)
					this.layer.fill(240-this.crit*200,120,200+this.crit*200,this.fade)
					this.layer.ellipse(0,0,240-this.fade*240)
					this.layer.fill(240-this.crit*200,160,240+this.crit*200,this.fade)
					this.layer.ellipse(0,0,120-this.fade*120)
				}
			break
			case 4:
                this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.rect(0,12,1,24)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.rect(0,9,1,18)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.rect(0,6,1,12)
                this.layer.fill(250,this.fade)
                this.layer.ellipse(0,0,3,4)
            break
			case 5:
				this.layer.rotate(-this.direction)
				this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.ellipse(this.past[0][0]-this.position.x,this.past[0][1]-this.position.y,2)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.ellipse(this.past[4][0]-this.position.x,this.past[4][1]-this.position.y,4)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.ellipse(this.past[8][0]-this.position.x,this.past[8][1]-this.position.y,6)
                this.layer.fill(250,this.fade)
                this.layer.ellipse(0,0,8)
            break
			case 6:
				this.layer.fill(240-this.crit*200,120,this.crit*200,this.fade*this.time/this.base.time)
				this.layer.ellipse(0,0,60*(1-this.time/this.base.time))
				this.layer.fill(240-this.crit*200,180,this.crit*200,this.fade*this.time/this.base.time)
				this.layer.ellipse(0,0,30*(1-this.time/this.base.time))
			break
			case 7:
				if(!this.active&&this.fade<1){
					this.layer.fill(200-this.crit*200,200,200+this.crit*200,this.fade)
					this.layer.ellipse(0,0,30-this.fade*30)
				}
			break
			case 8:
				this.layer.rotate(-this.direction)
				this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.ellipse(this.past[0][0]-this.position.x,this.past[0][1]-this.position.y,2)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.ellipse(this.past[4][0]-this.position.x,this.past[4][1]-this.position.y,4)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.ellipse(this.past[8][0]-this.position.x,this.past[8][1]-this.position.y,6)
                this.layer.fill(250,this.fade)
                this.layer.ellipse(0,0,12)
				this.layer.fill(250-this.crit*200,this.crit*200,this.crit*200,this.fade)
                this.layer.ellipse(0,0,4)
			break
			case 9:
                this.layer.fill(40,240,40+this.crit*200,this.fade)
                this.layer.rect(0,4,1,8)
                this.layer.fill(40,160,40+this.crit*200,this.fade)
                this.layer.rect(0,3,1,6)
                this.layer.fill(40,80,40+this.crit*200,this.fade)
                this.layer.rect(0,2,1,4)
                this.layer.fill(150,250,150,this.fade)
                this.layer.ellipse(0,0,3)
            break
        }
        this.layer.pop()
    }
	explode(){
		switch(this.type){
			case 2:
				for(let b=0,lb=entities.players.length;b<lb;b++){
					let c=dist(this.position.x,this.position.y,entities.players[b].position.x,entities.players[b].position.y)
					if(entities.players[b].life>0&&c<120&&(this.id==0?1:0)!=(entities.players[b].id==0?1:0)){
						entities.players[b].life-=this.damage*(1-c/120)*0.8
						entities.players[b].die.killer=this.id
						entities.players[b].collect.time=600
					}
				}
			break
			case 3:
				for(let b=0,lb=entities.players.length;b<lb;b++){
					let c=dist(this.position.x,this.position.y,entities.players[b].position.x,entities.players[b].position.y)
					if(entities.players[b].life>0&&c<240&&(this.id==0?1:0)!=(entities.players[b].id==0?1:0)){
						entities.players[b].life-=this.damage*(1-c/240)
						entities.players[b].die.killer=this.id
						entities.players[b].collect.time=600
					}
				}
			break
		}
	}
    update(){
		this.timer++
		if(this.type==1||this.type==4||this.type==5||this.type==6||this.type==7||this.type==8||this.type==9){
			this.fade=smoothAnim(this.fade,this.active,0,1,5)
		}else if(this.type==2||this.type==3){
			this.fade=smoothAnim(this.fade,this.active,0,1,10)
		}
        if(this.fade<=0){
            this.remove=true
        }
		if(this.position.x<-50||this.position.x>this.layer.width*3+50||this.position.y>this.layer.height+50){
			this.active=false
		}
		switch(this.type){
			case 5: case 8:
				this.past.splice(0,1)
				this.past.push([this.position.x,this.position.y])
				this.previous.position.x=this.position.x
				this.previous.position.y=this.position.y
				this.velocity.y*=0.98
			break
		}
        for(let a=0,la=this.type==4?8:4;a<la;a++){
            switch(this.type){
				case 1: case 2: case 4: case 6: case 7: case 9:
                    this.position.x+=this.speed*sin(this.direction)
                    this.position.y-=this.speed*cos(this.direction)
                break
				case 3:
					if(this.active){
						this.active=false
						this.explode()
					}
				break
				case 5:
					this.position.x+=this.velocity.x/4
					this.position.y+=this.velocity.y/4
					this.velocity.y+=0.1
				break
				case 8:
					this.position.x+=this.velocity.x/4
					this.position.y+=this.velocity.y/4
					this.velocity.y+=0.1
					if(this.timer%15==0&&this.active){
						let minimum=300
						for(let a=0,la=entities.players.length;a<la;a++){
							if(entities.players[a].life>0&&(this.id==0?1:0)!=(entities.players[a].id==0?1:0)){
								minimum=min(minimum,dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y))
							}
						}
						if(minimum<300){
							for(let a=0,la=entities.players.length;a<la;a++){
								if(entities.players[a].life>0&&(this.id==0?1:0)!=(entities.players[a].id==0?1:0)&&minimum==dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)){
									entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.damage/4,30,this.crit))
									a=la
								}
							}
						}
					}
				break
            }
            if(this.active){
                for(let a=0,la=entities.players.length;a<la;a++){
                    if(inBoxBox(this,entities.players[a])&&((this.id==0?1:0)!=(entities.players[a].id==0?1:0)||this.type==9)&&entities.players[a].life>0&&entities.players[a].invincible<=0&&this.active){
                        this.active=false
						if(this.type==9&&(this.id==0?1:0)==(entities.players[a].id==0?1:0)){
							entities.players[a].life=min(entities.players[a].life+this.damage,entities.players[a].base.life)
						}else if(this.type!=2){
                        	entities.players[a].life-=this.damage
						}
                        entities.players[a].die.killer=this.id
                        entities.players[a].collect.time=600
						if(this.type==2){
							this.explode()
						}
                    }
                }
            }
        }
		if(this.time>0){
            this.time--
        }else{
			this.active=false
		}
    }
}
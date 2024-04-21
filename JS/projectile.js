class projectile{
    constructor(layer,x,y,type,direction,id,damage,time,crit,index){
        this.layer=layer
        this.position={x:x,y:y}
        this.type=type
        this.direction=direction
        this.id=id
        this.damage=damage
		this.crit=crit
		this.index=index
        this.width=2
        this.height=2
		switch(this.type){
			case 1: case 4: case 9: case 10: case 11: case 12: case 13: case 14: case 18: case 19:
			case 20: case 24:
				this.speed=random(6,8)
				this.time=random(time,time*2)
			break
			case 2: case 16: case 21: case 22: case 27:
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
				this.time=time*(this.id==0?0.6:1)
				this.previous={position:{x:this.position.x,y:this.position.y}}
				this.midpoint={position:{x:this.position.x,y:this.position.y}}
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
			case 7: case 23:
				this.width*=15
				this.height*=15
				this.speed=time/4
				this.time=5
			break
			case 15:
				this.speed=random(4,6.5)
				this.time=random(time,time*2)
			break
			case 17:
				this.width=6
				this.height=6
				this.speed=9
				this.time=time*(this.id==0?0.6:1)
				this.previous={position:{x:this.position.x,y:this.position.y}}
				this.midpoint={position:{x:this.position.x,y:this.position.y}}
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
					[this.position.x,this.position.y],
					[this.position.x,this.position.y],
					[this.position.x,this.position.y],
					[this.position.x,this.position.y],
					[this.position.x,this.position.y]
				]
				this.velocity={x:this.speed*sin(this.direction),y:this.speed*cos(this.direction)-4}
			break
			case 25:
				this.width*=15
				this.height*=15
				this.speed=time/4
				this.time=15
			break
			case 26:
				this.speed=3
				this.time=time
			break
			case 28:
				this.width=4
				this.height=4
				this.speed=10
				this.time=time*(this.id==0?0.6:1)
				this.previous={position:{x:this.position.x,y:this.position.y}}
				this.midpoint={position:{x:this.position.x,y:this.position.y}}
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
		this.layer.noStroke()
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
					this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
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
			case 10:
                this.layer.fill(120,240,120+this.crit*200,this.fade)
                this.layer.rect(0,4,1,8)
                this.layer.fill(120,200,120+this.crit*200,this.fade)
                this.layer.rect(0,3,1,6)
                this.layer.fill(120,160,120+this.crit*200,this.fade)
                this.layer.rect(0,2,1,4)
                this.layer.fill(200,250,200,this.fade)
                this.layer.ellipse(0,0,3)
            break
			case 11:
                this.layer.fill(240-80*this.crit*200,240,120+this.crit*200,this.fade)
                this.layer.rect(0,4,1,8)
                this.layer.fill(240-80*this.crit*200,200,120+this.crit*200,this.fade)
                this.layer.rect(0,3,1,6)
                this.layer.fill(240-80*this.crit*200,160,120+this.crit*200,this.fade)
                this.layer.rect(0,2,1,4)
                this.layer.fill(200,250,200,this.fade)
                this.layer.ellipse(0,0,3)
            break
            case 12:
                this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.rect(0,4,1,8)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.rect(0,3,1,6)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.rect(0,2,1,4)
                this.layer.fill(250-this.crit*200,250,100+this.crit*200,this.fade)
                this.layer.ellipse(0,0,6,3)
                this.layer.fill(250,this.fade)
                this.layer.ellipse(0,0,3)
            break
            case 13:
                this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.rect(0,4,1,8)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.rect(0,3,1,6)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.rect(0,2,1,4)
                this.layer.fill(100-this.crit*200,250,100+this.crit*200,this.fade)
                this.layer.ellipse(0,0,6,3)
                this.layer.fill(250,this.fade)
                this.layer.ellipse(0,0,3)
            break
            case 14:
                this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.rect(0,4,1,8)
				this.layer.rect(0,4,8,1)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.rect(0,3,1,6)
				this.layer.rect(0,4,6,1)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.rect(0,2,1,4)
				this.layer.rect(0,4,4,1)
                this.layer.fill(100-this.crit*200,250,100+this.crit*200,this.fade)
                this.layer.ellipse(0,0,6,3)
                this.layer.fill(250,this.fade)
                this.layer.ellipse(0,0,3)
            break
			case 15:
				this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade*this.time/this.base.time)
				this.layer.ellipse(0,0,60*(1-this.time/this.base.time))
				this.layer.fill(240-this.crit*200,200,40+this.crit*200,this.fade*this.time/this.base.time)
				this.layer.ellipse(0,0,30*(1-this.time/this.base.time))
			break
			case 16:
				this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.rect(0,4,1,8)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.rect(0,3,1,6)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.rect(0,2,1,4)
                this.layer.fill(240-this.crit*200,240+this.crit*200,40+this.crit*200,this.fade)
                this.layer.ellipse(0,0,6,20)
				if(!this.active&&this.fade<1){
					this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
					this.layer.ellipse(0,0,240-this.fade*240)
					this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
					this.layer.ellipse(0,0,160-this.fade*160)
					this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
					this.layer.ellipse(0,0,80-this.fade*80)
				}
			break
			case 17:
				this.layer.rotate(-this.direction)
				this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.ellipse(this.past[0][0]-this.position.x,this.past[0][1]-this.position.y,2)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.ellipse(this.past[4][0]-this.position.x,this.past[4][1]-this.position.y,4)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.ellipse(this.past[8][0]-this.position.x,this.past[8][1]-this.position.y,6)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.ellipse(this.past[12][0]-this.position.x,this.past[12][1]-this.position.y,8)
                this.layer.fill(250,this.fade)
                this.layer.ellipse(0,0,10)
            break
            case 18:
                this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.rect(0,4,1,8)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.rect(0,3,1,6)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.rect(0,2,1,4)
                this.layer.fill(250-this.crit*200,250,100+this.crit*200,this.fade)
                this.layer.rect(0,0,6,2)
                this.layer.fill(250,this.fade)
                this.layer.ellipse(0,0,3)
            break
            case 19:
                this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.rect(0,4,1,8)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.rect(0,3,1,6)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.rect(0,2,1,4)
                this.layer.fill(250-this.crit*200,250,100+this.crit*200,this.fade)
                this.layer.ellipse(0,0,3,6)
                this.layer.fill(250,this.fade)
                this.layer.ellipse(0,0,3)
            break
			case 20:
                this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.rect(0,4,1,8)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.rect(0,3,1,6)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.rect(0,2,1,4)
                this.layer.fill(250,this.fade)
                this.layer.ellipse(0,0,4)
                this.layer.fill(100,250,100,this.fade)
                this.layer.ellipse(0,0,2)
            break
			case 21:
				this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.rect(0,4,1,8)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.rect(0,3,1,6)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.rect(0,2,1,4)
                this.layer.fill(120,120+this.crit*200,120+this.crit*200,this.fade)
                this.layer.ellipse(0,0,6,20)
                this.layer.fill(240,40,40,this.fade)
                this.layer.ellipse(0,0,4,12)
				if(!this.active&&this.fade<1){
					this.layer.fill(240-this.crit*200,120,this.crit*200,this.fade)
					this.layer.ellipse(0,0,240-this.fade*240)
					this.layer.fill(240-this.crit*200,80,this.crit*200,this.fade)
					this.layer.ellipse(0,0,160-this.fade*160)
					this.layer.fill(240-this.crit*200,40,this.crit*200,this.fade)
					this.layer.ellipse(0,0,80-this.fade*80)
				}
			break
			case 22:
				this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.rect(0,4,1,8)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.rect(0,3,1,6)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.rect(0,2,1,4)
                this.layer.fill(120,120+this.crit*200,120+this.crit*200,this.fade)
                this.layer.ellipse(0,0,6,20)
                this.layer.fill(240,240,40,this.fade)
                this.layer.ellipse(0,0,4,12)
				if(!this.active&&this.fade<1){
					this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
					this.layer.ellipse(0,0,480-this.fade*480)
					this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
					this.layer.ellipse(0,0,320-this.fade*320)
					this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
					this.layer.ellipse(0,0,160-this.fade*160)
				}
			break
			case 23:
				if(!this.active&&this.fade<1){
					this.layer.fill(240-this.crit*200,180,180+this.crit*200,this.fade)
					this.layer.ellipse(0,0,30-this.fade*30)
				}
			break
			case 24:
                this.layer.fill(240-this.crit*200,60,40+this.crit*200,this.fade)
                this.layer.rect(0,4,1,8)
                this.layer.fill(240-this.crit*200,40,40+this.crit*200,this.fade)
                this.layer.rect(0,3,1,6)
                this.layer.fill(240-this.crit*200,20,40+this.crit*200,this.fade)
                this.layer.rect(0,2,1,4)
                this.layer.fill(250,this.fade)
                this.layer.ellipse(0,0,3)
            break
			case 25:
				if(!this.active&&this.fade<1){
					this.layer.fill(200-this.crit*200,200,200+this.crit*200,this.fade)
					this.layer.ellipse(0,0,36-this.fade*36,27-this.fade*27)
				}
			break
			case 26:
				this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.rect(0,4,1,7)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.rect(0,3,1,5)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.rect(0,2,1,3)
                this.layer.fill(120,120+this.crit*200,120+this.crit*200,this.fade)
                this.layer.ellipse(0,0,8,20)
				if(!this.active&&this.fade<1){
					this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
					this.layer.ellipse(0,0,240-this.fade*240)
					this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
					this.layer.ellipse(0,0,160-this.fade*160)
					this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
					this.layer.ellipse(0,0,80-this.fade*80)
				}
			break
			case 27:
				this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.rect(0,4,1,8)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.rect(0,3,1,6)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.rect(0,2,1,4)
                this.layer.fill(240-this.crit*200,240+this.crit*200,40+this.crit*200,this.fade)
                this.layer.ellipse(0,0,6,20)
                this.layer.fill(240,240,40,this.fade)
                this.layer.ellipse(0,0,4,12)
				if(!this.active&&this.fade<1){
					this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
					this.layer.ellipse(0,0,240-this.fade*240)
					this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
					this.layer.ellipse(0,0,160-this.fade*160)
					this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
					this.layer.ellipse(0,0,80-this.fade*80)
				}
			break
			case 28:
				this.layer.rotate(-this.direction)
				this.layer.fill(240-this.crit*200,240,40+this.crit*200,this.fade)
                this.layer.ellipse(this.past[0][0]-this.position.x,this.past[0][1]-this.position.y,2)
                this.layer.fill(240-this.crit*200,160,40+this.crit*200,this.fade)
                this.layer.ellipse(this.past[4][0]-this.position.x,this.past[4][1]-this.position.y,4)
                this.layer.fill(240-this.crit*200,80,40+this.crit*200,this.fade)
                this.layer.ellipse(this.past[8][0]-this.position.x,this.past[8][1]-this.position.y,6)
                this.layer.fill(250,this.fade)
                regPoly(this.layer,0,0,16,4,4,0)
            break
        }
        this.layer.pop()
    }
	explode(){
		switch(this.type){
			case 2: case 26:
				for(let b=0,lb=entities.players.length;b<lb;b++){
					let c=dist(this.position.x,this.position.y,entities.players[b].position.x,entities.players[b].position.y)
					if(entities.players[b].life>0&&c<120&&(this.id==0?1:0)!=(entities.players[b].id==0?1:0)){
						entities.players[b].life-=this.damage*(1-c/120)*0.8
						entities.players[b].die.killer=this.id
						entities.players[b].collect.time=600
						if(game.invis){
							entities.players[b].visible=15
						}
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
						if(game.invis){
							entities.players[b].visible=15
						}
					}
				}
			break
			case 16:
				for(let b=0,lb=entities.players.length;b<lb;b++){
					let c=dist(this.position.x,this.position.y,entities.players[b].position.x,entities.players[b].position.y)
					if(entities.players[b].life>0&&c<120&&(this.id==0?1:0)!=(entities.players[b].id==0?1:0)){
						entities.players[b].life-=this.damage*(1-c/120)*0.8
						entities.players[b].die.killer=this.id
						entities.players[b].collect.time=600
						if(game.invis){
							entities.players[b].visible=15
						}
						entities.players[b].velocity.x+=15*(1.5-c/120)*sin(atan2(entities.players[b].position.x-this.position.x,this.position.y-entities.players[b].position.y))
						entities.players[b].velocity.y-=15*(1.5-c/120)*cos(atan2(entities.players[b].position.x-this.position.x,this.position.y-entities.players[b].position.y))
					}
				}
			break
			case 21:
				for(let b=0,lb=entities.players.length;b<lb;b++){
					let c=dist(this.position.x,this.position.y,entities.players[b].position.x,entities.players[b].position.y)
					if(entities.players[b].life>0&&c<120&&(this.id==0?1:0)!=(entities.players[b].id==0?1:0)){
						entities.players[b].life-=this.damage*(1-c/120)*0.8
						entities.players[b].die.killer=this.id
						entities.players[b].collect.time=600
						if(game.invis){
							entities.players[b].visible=15
						}
						for(let d=0,ld=entities.players.length;d<ld;d++){
							if(entities.players[d].index==this.index){
								entities.players[d].life=min(entities.players[d].life+this.damage*(1-c/120)*0.8,entities.players[d].base.life)
							}
						}
					}
				}
			break
			case 22:
				for(let b=0,lb=entities.players.length;b<lb;b++){
					let c=dist(this.position.x,this.position.y,entities.players[b].position.x,entities.players[b].position.y)
					if(entities.players[b].life>0&&c<240&&(this.id==0?1:0)!=(entities.players[b].id==0?1:0)){
						entities.players[b].life-=this.damage*(1-c/240)*0.8
						entities.players[b].die.killer=this.id
						entities.players[b].collect.time=600
						if(game.invis){
							entities.players[b].visible=15
						}
					}
				}
			break
			case 27:
				for(let b=0,lb=entities.players.length;b<lb;b++){
					let c=dist(this.position.x,this.position.y,entities.players[b].position.x,entities.players[b].position.y)
					if(entities.players[b].life>0&&c<240&&(this.id==0?1:0)!=(entities.players[b].id==0?1:0)){
						entities.players[b].life-=this.damage*(1-c/240)*0.8
						entities.players[b].die.killer=this.id
						entities.players[b].collect.time=600
						if(game.invis){
							entities.players[b].visible=15
						}
						entities.players[b].velocity.x+=20*(1.5-c/240)*sin(atan2(entities.players[b].position.x-this.position.x,this.position.y-entities.players[b].position.y))
						entities.players[b].velocity.y-=20*(1.5-c/240)*cos(atan2(entities.players[b].position.x-this.position.x,this.position.y-entities.players[b].position.y))
					}
				}
			break
		}
	}
    update(){
		this.timer++
		if(
			this.type==1||this.type==4||this.type==5||this.type==6||this.type==7||
			this.type==8||this.type==9||this.type==10||this.type==11||this.type==12||
			this.type==13||this.type==14||this.type==15||this.type==17||this.type==18||
			this.type==19||this.type==20||this.type==23||this.type==24||this.type==25||
			this.type==28
		){
			this.fade=smoothAnim(this.fade,this.active,0,1,5)
		}else if(
			this.type==2||this.type==3||this.type==16||this.type==21||this.type==22||
			this.type==26||this.type==27
		){
			this.fade=smoothAnim(this.fade,this.active,0,1,10)
		}
        if(this.fade<=0){
            this.remove=true
        }
		if(this.position.x<-50||this.position.x>this.layer.width*3+50||this.position.y>this.layer.height+50){
			this.active=false
		}
		switch(this.type){
			case 5: case 8: case 17: case 28:
				this.past.splice(0,1)
				this.past.push([this.position.x,this.position.y])
				this.previous.position.x=this.position.x
				this.previous.position.y=this.position.y
				this.velocity.y*=0.98
			break
		}
        for(let a=0,la=this.type==4?8:4;a<la;a++){
            switch(this.type){
				case 1: case 2: case 4: case 6: case 7: case 9: case 10: case 11: case 12: case 13:
				case 14: case 15: case 16: case 18: case 19: case 20: case 21: case 22: case 23: case 24:
				case 25: case 26: case 27:
                    this.position.x+=this.speed*sin(this.direction)
                    this.position.y-=this.speed*cos(this.direction)
                break
				case 3:
					if(this.active){
						this.active=false
						this.explode()
					}
				break
				case 5: case 17: case 28:
					if(a==2){
						this.midpoint.position.x=this.position.x
						this.midpoint.position.y=this.position.y
					}
					this.position.x+=this.velocity.x/4
					this.position.y+=this.velocity.y/4
					this.velocity.y+=0.1
				break
				case 8:
					if(a==2){
						this.midpoint.position.x=this.position.x
						this.midpoint.position.y=this.position.y
					}
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
                    if(inBoxBox(this,entities.players[a])&&((this.id==0?1:0)!=(entities.players[a].id==0?1:0)||this.type==9||this.type==10||this.type==11)&&entities.players[a].life>0&&entities.players[a].invincible<=0&&this.active){
                        this.active=false
						if(this.type==11&&(this.id==0?1:0)==(entities.players[a].id==0?1:0)){
							entities.players[a].life=entities.players[a].base.life
						}else if(this.type==10&&(this.id==0?1:0)==(entities.players[a].id==0?1:0)){
							entities.players[a].life=min(entities.players[a].life+this.damage,entities.players[a].base.life)
						}else if(this.type==9&&(this.id==0?1:0)==(entities.players[a].id==0?1:0)){
							entities.players[a].life=min(entities.players[a].life+this.damage,entities.players[a].base.life)
						}else if(this.type!=2){
                        	entities.players[a].life-=this.damage
						}
						if(this.type==12){
							entities.players[a].velocity.x+=this.speed*sin(this.direction)*3
							entities.players[a].velocity.y-=this.speed*cos(this.direction)*3
						}else if(this.type==13){
							entities.players[a].weapon.cooldown=min(entities.players[a].weaponData.cooldown+15,entities.players[a].weapon.cooldown+15)
						}else if(this.type==14){
							entities.players[a].weaponType=-1
						}else if(this.type==16){
							entities.players[a].velocity.x+=this.speed*sin(this.direction)*4
							entities.players[a].velocity.y-=this.speed*cos(this.direction)*4
						}else if(this.type==18){
							entities.players[a].velocity.y-=this.speed*abs(sin(this.direction)*3)
						}else if(this.type==19){
							entities.players[a].velocity.x+=this.speed*sin(this.direction)*-3
							entities.players[a].velocity.y-=this.speed*cos(this.direction)*-3
						}else if(this.type==23){
							for(let d=0,ld=entities.players.length;d<ld;d++){
								if(entities.players[d].index==this.index){
									entities.players[d].life=min(entities.players[d].life+this.damage*2,entities.players[d].base.life)
								}
							}
						}else if(this.type==24){
							for(let d=0,ld=entities.players.length;d<ld;d++){
								if(entities.players[d].index==this.index){
									entities.players[d].life=min(entities.players[d].life+this.damage,entities.players[d].base.life)
								}
							}
						}
						if(game.invis){
							entities.players[a].visible=15
						}
						if(this.type==20){
							entities.players[a].DOT.damage+=this.damage/120
							entities.players[a].DOT.active=min(120,entities.players[a].DOT.active+30)
						}
                        entities.players[a].die.killer=this.id
                        entities.players[a].collect.time=600
						if(this.type==2||this.type==16||this.type==21||this.type==22||this.type==26||this.type==27){
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
class player{
    constructor(layer,x,y,id,control,inputs,primary,type,index){
        this.layer=layer
        this.position={x:x,y:y}
        this.id=id
        this.control=control
        this.inputs=inputs
        this.primary=primary
        this.type=type
        this.index=index
        this.playerData=types.player[this.type]
        this.weaponType=this.playerData.weapon
        this.weaponData=types.weapon[this.weaponType]
        this.selector=0
        this.width=8*this.playerData.sizeBuff
        this.height=24*this.playerData.sizeBuff
        this.fade=0
        this.size=0.5*this.playerData.sizeBuff
        this.life=100*this.playerData.lifeBuff
        this.dead=false
        this.velocity={x:0,y:0}
        this.offset={position:{x:0,y:12*this.playerData.sizeBuff}}
        this.previous={position:{x:0,y:0}}
        this.infoAnim={life:1,ammo:[0,0,0],uses:[0,0,0]}
        this.jump={time:0,active:0}
        this.base={life:this.life,position:{x:this.position.x,y:this.position.y},control:0}
        this.collect={life:this.life,time:0}
        this.weapon={ammo:this.weaponData.ammo,cooldown:0,reload:0,uses:this.weaponData.uses}
        this.DOT={damage:0,active:0}
        this.die={timer:0,killer:0}
        this.stats={kills:0,deaths:0}
        this.invincible=0
        if(this.playerData.name=='Spy'||this.playerData.name=='SpyHealSelf'||this.playerData.name=='RapidSpy'){
            this.copy=floor(random(0,game.players))
        }
        if(this.weaponType==14||this.weaponType==66||this.playerData.name=='HyperPistol'||this.playerData.name=='CritHyperPistol'||this.playerData.name=='BigHyperPistol'||this.playerData.name=='HyperCaffeinePistol'){
            this.active=0
        }
        this.visible=0
        this.setupGraphics()
        this.manage=[0,0,0]
        this.infoAnim.bar=[0,0]
        if((this.weaponType==11||this.weaponType==13||this.weaponType==14||this.weaponType==62||this.weaponType==66)&&entities.players.length>game.players){
            this.target=floor(random(game.players,entities.players.length))
        }else{
            this.target=floor(random(0,game.players))
        }
        this.time=0
        this.critBuff=0
        this.defendBuff=0
        this.stunTime=0
        this.vulnerableTime=0
        this.confuseTime=0
    }
    setupGraphics(){
        this.direction=this.position.x<this.layer.width/2?{main:54,goal:54}:{main:-54,goal:-54}
        this.skin={
            body:{fade:1,display:true,level:-19},
            head:{fade:1,display:true,level:-38},
            legs:[
                {fade:1,display:true,anim:{theta:24,phi:90},length:10,points:{base:{start:{x:3,y:-15},end:{x:0,y:0}},final:{start:{x:0,y:0},end:{x:0,y:0}}}},
                {fade:1,display:true,anim:{theta:24,phi:-90},length:10,points:{base:{start:{x:3,y:-15},end:{x:0,y:0}},final:{start:{x:0,y:0},end:{x:0,y:0}}}}
            ],arms:[
                {fade:1,display:true,anim:{theta:54,phi:90},length:10,points:{base:{start:{x:3,y:-25},end:{x:0,y:0}},final:{start:{x:0,y:0},end:{x:0,y:0}}}},
                {fade:1,display:true,anim:{theta:54,phi:-90},length:10,points:{base:{start:{x:3,y:-25},end:{x:0,y:0}},final:{start:{x:0,y:0},end:{x:0,y:0}}}}
            ]
        }
        this.face={
            beak:{
                main:{fade:1,display:true,level:-33},
                mouth:{fade:1,display:true,level:-33},
                nostril:{fade:1,display:true,level:-34.5}
            },eye:[
                {fade:1,display:true,anim:0,spin:-18,level:-40},
                {fade:1,display:true,anim:0,spin:18,level:-40}
            ]
        }
        this.setColor()
        this.animSet={loop:0,flip:0}
    }
    calculateParts(){
        for(let a=0,la=2;a<la;a++){
            this.skin.legs[a].points.base.end.x=this.skin.legs[a].points.base.start.x+sin(this.skin.legs[a].anim.theta)*this.skin.legs[a].length
            this.skin.legs[a].points.base.end.y=this.skin.legs[a].points.base.start.y+cos(this.skin.legs[a].anim.theta)*this.skin.legs[a].length
            this.skin.legs[a].points.final.start.x=this.skin.legs[a].points.base.start.x*sin(this.skin.legs[a].anim.phi+this.direction.main),
            this.skin.legs[a].points.final.start.y=this.skin.legs[a].points.base.start.y
            this.skin.legs[a].points.final.end.x=this.skin.legs[a].points.base.end.x*sin(this.skin.legs[a].anim.phi+this.direction.main),
            this.skin.legs[a].points.final.end.y=this.skin.legs[a].points.base.end.y
            this.skin.arms[a].points.base.end.x=this.skin.arms[a].points.base.start.x+sin(this.skin.arms[a].anim.theta)*this.skin.arms[a].length
            this.skin.arms[a].points.base.end.y=this.skin.arms[a].points.base.start.y+cos(this.skin.arms[a].anim.theta)*this.skin.arms[a].length
            this.skin.arms[a].points.final.start.x=this.skin.arms[a].points.base.start.x*sin(this.skin.arms[a].anim.phi+this.direction.main),
            this.skin.arms[a].points.final.start.y=this.skin.arms[a].points.base.start.y
            this.skin.arms[a].points.final.end.x=this.skin.arms[a].points.base.end.x*sin(this.skin.arms[a].anim.phi+this.direction.main),
            this.skin.arms[a].points.final.end.y=this.skin.arms[a].points.base.end.y
        }
    }
    runAnim(rate){
        this.animSet.loop+=rate
        for(let a=0,la=2;a<la;a++){
            this.skin.legs[a].anim.phi=90*(1-a*2)+sin((this.animSet.loop+this.animSet.flip)*360)*75
            this.skin.arms[a].anim.phi=90*(1-a*2)+sin((this.animSet.loop+this.animSet.flip)*360)*60
        }
    }
    displayBack(){
        if(this.primary&&this.id>0){
        }
    }
    displayInfo(){
        this.layer.push()
        this.layer.translate(this.position.x+this.offset.position.x,this.position.y-42.5*this.playerData.sizeBuff+this.offset.position.y)
        this.layer.noStroke()
        this.layer.fill(150,this.fade*this.infoAnim.life)
        this.layer.rect(0,0,30,4,2)
        if(this.id>0||this.playerData.name=='Spy'||this.playerData.name=='SpyHealSelf'||this.playerData.name=='RapidSpy'){
            if(this.weaponType>=0){
                    if(this.weaponData.ammo>3){
                        this.layer.rect(0,-14,30,4,2)
                        this.layer.fill(200,this.fade*this.infoAnim.life)
                        this.layer.rect(-15+15*this.weapon.ammo/this.weaponData.ammo,-14,30*this.weapon.ammo/this.weaponData.ammo,4,2)
                    }else{
                for(let a=0,la=this.weapon.ammo;a<la;a++){
                    this.layer.fill(150,this.fade*this.infoAnim.ammo[a])
                    this.layer.ellipse(-12+a*8,-14,6)
                    this.layer.fill(200,this.fade*this.infoAnim.ammo[a])
                    this.layer.ellipse(-12+a*8,-14,4)
                }
                    }
                    this.layer.fill(150,this.fade*this.infoAnim.life)
                    if(this.weaponData.uses>3){
                        this.layer.rect(0,-7,30,4,2)
                        this.layer.fill(0,150,255,this.fade*this.infoAnim.life)
                        if(this.weapon.uses>0){
                            this.layer.rect(-15+15*this.weapon.uses/this.weaponData.uses,-7,30*this.weapon.uses/this.weaponData.uses,4,2)
                        }
                    }else{
                for(let a=0,la=this.weapon.uses;a<la;a++){
                    this.layer.fill(0,100,200,this.fade*this.infoAnim.uses[a])
                    this.layer.ellipse(-12+a*8,-7,6)
                    this.layer.fill(0,150,255,this.fade*this.infoAnim.uses[a])
                    this.layer.ellipse(-12+a*8,-7,4)
                }
                    }
                }
            }else{
                if(this.weaponData.ammo>3){
                    this.layer.rect(0,-7,30,4,2)
                    this.layer.fill(200,this.fade*this.infoAnim.life)
                    this.layer.rect(-15+15*this.weapon.ammo/this.weaponData.ammo,-7,30*this.weapon.ammo/this.weaponData.ammo,4,2)
                }else{
            for(let a=0,la=this.weapon.ammo;a<la;a++){
                this.layer.fill(150,this.fade*this.infoAnim.ammo[a])
                this.layer.ellipse(-12+a*8,-7,6)
                this.layer.fill(200,this.fade*this.infoAnim.ammo[a])
                this.layer.ellipse(-12+a*8,-7,4)
            }
            }
        }
        if(this.collect.life>=this.life){
            this.layer.fill(240,0,0,this.fade*this.infoAnim.life)
            this.layer.rect((max(0,this.collect.life)/this.base.life)*15-15,0,(max(0,this.collect.life)/this.base.life)*30,1+min((max(0,this.collect.life)/this.base.life)*60,3),2)
            this.layer.fill(min(255,510-max(0,this.life)/this.base.life*510)-max(0,5-max(0,this.life)/this.base.life*30)*25,max(0,this.life)/this.base.life*510,0,this.fade*this.infoAnim.life)
            this.layer.rect((max(0,this.life)/this.base.life)*15-15,0,(max(0,this.life)/this.base.life)*30,2+min((max(0,this.life)/this.base.life)*60,3),2)
        }else if(this.collect.life<this.life){
            this.layer.fill(240,0,0,this.fade*this.infoAnim.life)
            this.layer.rect((max(0,this.life)/this.base.life)*15-15,0,(max(0,this.life)/this.base.life)*30,1+min((max(0,this.life)/this.base.life)*60,3),2)
            this.layer.fill(min(255,510-max(0,this.collect.life)/this.base.life*510)-max(0,5-max(0,this.collect.life)/this.base.life*30)*25,max(0,this.collect.life)/this.base.life*510,0,this.fade*this.infoAnim.life)
            this.layer.rect((max(0,this.collect.life)/this.base.life)*15-15,0,(max(0,this.collect.life)/this.base.life)*30,2+min((max(0,this.collect.life)/this.base.life)*60,3),2)
        }
        this.layer.pop()
    }
    display(){
        this.calculateParts()
        this.layer.push()
        this.layer.translate(this.position.x+this.offset.position.x,this.position.y+this.offset.position.y)
        this.layer.fill(255,this.fade)
        this.layer.noStroke()
        this.layer.textSize(10)
        if(this.playerData.name=='Spy'||this.playerData.name=='SpyHealSelf'||this.playerData.name=='RapidSpy'){
            this.layer.text(`Kills: ${entities.players[this.copy].stats.kills}\nDeaths: ${entities.players[this.copy].stats.deaths}\n${entities.players[this.copy].weaponType==-1?`None`:entities.players[this.copy].weaponData.name}`,0,-35-42.5*this.playerData.sizeBuff)
        }else if(this.id>0){
            this.layer.text(`Kills: ${this.stats.kills}\nDeaths: ${this.stats.deaths}\nWeapon: ${this.weaponType==-1?`None`:this.weaponData.name}`,0,-35-42.5*this.playerData.sizeBuff)
        }else{
            this.layer.text(this.playerData.name,0,-17.5-42.5*this.playerData.sizeBuff)
        }
        if(this.playerData.name=='MedicShield'||this.playerData.name=='HyperMedicShield'){
            this.layer.stroke(255,150,150,this.fade)
            this.layer.strokeWeight(2)
            if(sin(this.direction.main)<0){
                this.layer.line(-80,-70,-80,50)
            }else{
                this.layer.line(80,-70,80,50)
            }
            this.layer.noStroke()
            this.layer.fill(255,150,150,this.fade*0.1)
            if(sin(this.direction.main)<0){
                this.layer.triangle(-80,-70,-80,50,0,-10)
            }else{
                this.layer.triangle(80,-70,80,50,0,-10)
            }
        }
        this.layer.scale(this.size)
        if(this.playerData.crit==1||this.critBuff>0){
            this.layer.fill(150,255,255,this.fade)
            regStar(this.layer,0,this.skin.body.level,12,45,45,9,9,0)
        }
        if(this.defendBuff>0){
            this.layer.fill(255,255,150,this.fade)
            regStar(this.layer,0,this.skin.body.level,12,45,45,9,9,15)
        }
        if(this.stunTime>0){
            this.layer.fill(255,255,150,this.fade)
            regStar(this.layer,0,this.skin.body.level,9,45,45,9,9,0)
        }
        if(this.vulnerableTime>0){
            this.layer.fill(255,150,150,this.fade)
            regStar(this.layer,0,this.skin.body.level,9,45,45,9,9,40/3)
        }
        if(this.confuseTime>0){
            this.layer.fill(255,100,255,this.fade)
            regStar(this.layer,0,this.skin.body.level,9,45,45,9,9,80/3)
        }
        switch(this.weaponType){
            case 6: case 17: case 45:
                this.layer.stroke(255,0,0,this.infoAnim.bar[0]*0.5*this.fade)
                this.layer.strokeWeight(3)
                this.layer.line(
                    this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y,
                    -6000+this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y
                )
                this.layer.stroke(255,0,0,this.infoAnim.bar[1]*0.5*this.fade)
                this.layer.strokeWeight(3)
                this.layer.line(
                    this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y,
                    6000+this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y
                )
            break
            case 12: case 69:
                this.layer.stroke(255,0,0,this.infoAnim.bar[0]*0.5*this.fade)
                this.layer.strokeWeight(3)
                this.layer.line(
                    this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y-4,
                    -6000+this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y-4
                )
                this.layer.line(
                    this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y+4,
                    -6000+this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y+4
                )
                this.layer.stroke(255,0,0,this.infoAnim.bar[1]*0.5*this.fade)
                this.layer.strokeWeight(3)
                this.layer.line(
                    this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y-4,
                    6000+this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y-4
                )
                this.layer.line(
                    this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y+4,
                    6000+this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y+4
                )
            break
            case 54:
                this.layer.stroke(255,0,0,this.infoAnim.bar[0]*0.5*this.fade)
                this.layer.strokeWeight(3)
                this.layer.line(
                    this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y,
                    -600+this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y
                )
                this.layer.stroke(255,0,0,this.infoAnim.bar[1]*0.5*this.fade)
                this.layer.strokeWeight(3)
                this.layer.line(
                    this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y,
                    600+this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y
                )
            break
        }
        /*for(let a=0,la=2;a<la;a++){
            if(this.skin.arms[a].display&&a==sin(this.direction.main)<0?1:0){
                this.layer.noStroke()
                this.layer.fill(120,this.fade*this.skin.arms[a].fade)
                this.layer.rect(this.skin.arms[a].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*10,this.skin.arms[a].points.final.end.y-1,16,3)
                this.layer.fill(80,this.fade*this.skin.arms[a].fade)
                this.layer.rect(this.skin.arms[a].points.final.end.x+constrain(sin(this.direction.main)*3,-1,1)*4,this.skin.arms[a].points.final.end.y+1,8,1)
            }
        }*/
        for(let a=0,la=2;a<la;a++){
            if(this.skin.arms[a].display&&cos(this.direction.main+this.skin.arms[a].anim.phi)<=0){
                this.layer.fill(this.color.skin.arms[0]+cos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.color.skin.arms[1]+cos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.color.skin.arms[2]+cos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.fade*this.skin.arms[a].fade)
                this.layer.noStroke()
                this.layer.ellipse(this.skin.arms[a].points.final.end.x,this.skin.arms[a].points.final.end.y,12,12)
            }
        }
        for(let a=0,la=2;a<la;a++){
            if(this.skin.legs[a].display&&cos(this.direction.main+this.skin.legs[a].anim.theta)<=0){
                this.layer.fill(this.color.skin.legs[0]+cos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.color.skin.legs[1]+cos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.color.skin.legs[2]+cos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.fade*this.skin.legs[a].fade)
                this.layer.noStroke()
                this.layer.ellipse(this.skin.legs[a].points.final.end.x,this.skin.legs[a].points.final.end.y,12,12)
            }
        }
        if(this.skin.body.display){
            this.layer.fill(this.color.skin.body[0],this.color.skin.body[1],this.color.skin.body[2],this.fade*this.skin.body.fade)
            this.layer.noStroke()
            this.layer.ellipse(0,this.skin.body.level,14,24)
        }
        for(let a=0,la=2;a<la;a++){
            if(this.skin.legs[a].display&&cos(this.direction.main+this.skin.legs[a].anim.theta)>0){
                this.layer.fill(this.color.skin.legs[0]+cos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.color.skin.legs[1]+cos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.color.skin.legs[2]+cos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.fade*this.skin.legs[a].fade)
                this.layer.noStroke()
                this.layer.ellipse(this.skin.legs[a].points.final.end.x,this.skin.legs[a].points.final.end.y,12,12)
            }
        }
        if(this.face.beak.main.display){
            this.layer.fill(this.color.beak.main[0],this.color.beak.main[1],this.color.beak.main[2],this.fade*this.face.beak.main.fade)
            this.layer.noStroke()
            this.layer.ellipse(sin(this.direction.main)*13,this.face.beak.main.level,12+2*cos(this.direction.main),8)
        }
        if(this.face.beak.mouth.display){
            this.layer.noFill()
            this.layer.stroke(this.color.beak.mouth[0],this.color.beak.mouth[1],this.color.beak.mouth[2],this.fade*this.face.beak.mouth.fade)
            this.layer.strokeWeight(0.5)
            this.layer.arc(sin(this.direction.main)*13,this.face.beak.mouth.level,12+2*cos(this.direction.main),1,0,180)
        }
        if(this.face.beak.nostril.display){
            this.layer.noFill()
            this.layer.stroke(this.color.beak.nostril[0],this.color.beak.nostril[1],this.color.beak.nostril[2],this.fade*this.face.beak.nostril.fade)
            this.layer.strokeWeight(0.5)
            for(let a=0,la=2;a<la;a++){
                this.layer.line(sin(this.direction.main-6+a*12)*16,this.face.beak.nostril.level,sin(this.direction.main-6+a*12)*16,this.face.beak.nostril.level+0.5)
            }
        }
        if(this.skin.head.display){
            this.layer.fill(this.color.skin.head[0],this.color.skin.head[1],this.color.skin.head[2],this.fade*this.skin.head.fade)
            this.layer.noStroke()
            this.layer.ellipse(0,this.skin.head.level,27,27)
        }
        for(let a=0,la=2;a<la;a++){
            if(this.skin.arms[a].display&&cos(this.direction.main+this.skin.arms[a].anim.phi)>0){
                this.layer.fill(this.color.skin.arms[0]+cos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.color.skin.arms[1]+cos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.color.skin.arms[2]+cos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.fade*this.skin.arms[a].fade)
                this.layer.noStroke()
                this.layer.ellipse(this.skin.arms[a].points.final.end.x,this.skin.arms[a].points.final.end.y,12,12)
            }
            if(this.face.eye[a].display){
                if(this.control==0){
                    this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.face.eye[a].fade)
                }else{
                    this.layer.stroke(255,0,0,this.fade*this.face.eye[a].fade)
                }
                this.layer.strokeWeight((2.5-this.face.eye[a].anim*1.5)*constrain(cos(this.face.eye[a].spin+this.direction.main)*5,0,1))
                if(this.face.eye[a].anim==0){
                    this.layer.point(sin(this.face.eye[a].spin+this.direction.main)*13-(a*2-1)*cos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.face.eye[a].level)
                    this.layer.point(sin(this.face.eye[a].spin+this.direction.main)*13-(a*2-1)*cos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.face.eye[a].level)
                }else{
                    this.layer.line(sin(this.face.eye[a].spin+this.direction.main)*13-(a*2-1)*cos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.face.eye[a].level,sin(this.face.eye[a].spin+this.direction.main)*13+(a*2-1)*cos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.parts.eyeLevel-this.face.eye[a].anim*2)
                    this.layer.line(sin(this.face.eye[a].spin+this.direction.main)*13-(a*2-1)*cos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.face.eye[a].level,sin(this.face.eye[a].spin+this.direction.main)*13+(a*2-1)*cos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.parts.eyeLevel+this.face.eye[a].anim*2)
                }
            }
        }
        if(this.face.beak.main.display&&cos(this.direction.main)>0){
            this.layer.fill(this.color.beak.main[0],this.color.beak.main[1],this.color.beak.main[2],this.fade*this.face.beak.main.fade)
            this.layer.noStroke()
            this.layer.ellipse(sin(this.direction.main)*13,this.face.beak.main.level,12+2*cos(this.direction.main),8)
        }
        if(this.face.beak.mouth.display&&cos(this.direction.main)>0){
            this.layer.noFill()
            this.layer.stroke(this.color.beak.mouth[0],this.color.beak.mouth[1],this.color.beak.mouth[2],this.fade*this.face.beak.mouth.fade)
            this.layer.strokeWeight(0.5)
            this.layer.arc(sin(this.direction.main)*13,this.face.beak.mouth.level,12+2*cos(this.direction.main),1,0,180)
        }
        if(this.face.beak.nostril.display&&cos(this.direction.main)>0){
            this.layer.noFill()
            this.layer.stroke(this.color.beak.nostril[0],this.color.beak.nostril[1],this.color.beak.nostril[2],this.fade*this.face.beak.nostril.fade)
            this.layer.strokeWeight(0.5)
            for(let a=0,la=2;a<la;a++){
                this.layer.line(sin(this.direction.main-6+a*12)*16,this.face.beak.nostril.level,sin(this.direction.main-6+a*12)*16,this.face.beak.nostril.level+0.5)
            }
        }
        this.layer.pop()
    }
    setColor(){
        switch(this.id){
            case 0:
                if(this.playerData.name=='Tank'||this.playerData.name=='BallingTank'){
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[160,165,170],body:[150,155,160],legs:[140,145,150],arms:[145,150,155]}}
                }else if(this.playerData.name=='HeavyTank'){
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[200,205,210],body:[190,195,200],legs:[180,185,190],arms:[185,190,195]}}
                }else if(this.playerData.name=='LightTank'){
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[130,135,140],body:[120,125,130],legs:[110,115,120],arms:[115,120,125]}}
                }else if(this.playerData.name=='Spy'||this.playerData.name=='SpyHealSelf'||this.playerData.name=='RapidSpy'){
                    this.color=[
                        {eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[25,85,255],body:[15,75,255],legs:[0,60,255],arms:[5,65,255]}},
                        {eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[235,25,255],body:[225,15,255],legs:[210,0,255],arms:[215,5,255]}},
                        {eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[55,235,25],body:[55,225,15],legs:[55,210,0],arms:[55,215,5]}},
                        {eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[235,105,25],body:[225,105,15],legs:[210,105,0],arms:[215,105,5]}}
                    ][this.copy]
                }else{
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[255,225,15],legs:[255,210,0],arms:[255,215,5]}}
                }
            break
            case 1:
                this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[25,85,255],body:[15,75,255],legs:[0,60,255],arms:[5,65,255]}}
            break
            case 2:
                this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[235,25,255],body:[225,15,255],legs:[210,0,255],arms:[215,5,255]}}
            break
            case 3:
                this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[55,235,25],body:[55,225,15],legs:[55,210,0],arms:[55,215,5]}}
            break
            case 4:
                this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[235,105,25],body:[225,105,15],legs:[210,105,0],arms:[215,105,5]}}
            break
        }
        this.base.color={eye:{back:this.color.eye.back},beak:{main:this.color.beak.main,mouth:this.color.beak.mouth,nostril:this.color.beak.nostril},skin:{head:this.color.skin.head,body:this.color.skin.body,legs:this.color.skin.legs,arms:this.color.skin.arms}}
    }
    newWeapon(){
        this.type=floor(random(0,9))+floor(random(0,1.2))*9
        this.playerData=types.player[this.type]
        this.weaponType=this.playerData.weapon
        this.weaponData=types.weapon[this.weaponType]
        this.weapon={ammo:this.weaponData.ammo,cooldown:0,reload:0,uses:this.weaponData.uses}
        this.weapon.cooldown=30
    }
    newWeaponSet(type){
        this.type=type
        this.playerData=types.player[this.type]
        this.weaponType=this.playerData.weapon
        this.weaponData=types.weapon[this.weaponType]
        this.weapon={ammo:this.weaponData.ammo,cooldown:0,reload:0,uses:this.weaponData.uses}
        this.weapon.cooldown=30
    }
    respawn(){
        this.manage[1]=0
        this.type=floor(random(0,9))+floor(random(0,1.2))*9
        this.playerData=types.player[this.type]
        this.weaponType=this.playerData.weapon
        this.weaponData=types.weapon[this.weaponType]
        this.weapon={ammo:this.weaponData.ammo,cooldown:0,reload:0,uses:this.weaponData.uses}
        this.life=this.base.life
        this.dead=false
        this.die.timer=0
        this.position.x=this.base.position.x
        this.position.y=this.base.position.y
        this.velocity.x=0
        this.velocity.y=0
        this.weapon.ammo=this.weaponData.ammo
        this.weapon.cooldown=0
        this.invincible=60
        this.setColor()
        this.base.control=0
        this.critBuff=0
        this.defendBuff=0
        this.stunTime=0
        this.vulnerableTime=0
        this.confuseTime=0
    }
    takeDamage(damage){
        this.life-=damage*(this.vulnerableTime>0?3:1)*(this.defendBuff>0?1/3:1)
    }
	attack(){
        this.visible=15
		this.weapon.cooldown=this.weaponData.cooldown
					this.weapon.reload=this.weaponData.stop
			this.weapon.ammo--
            this.weapon.uses--
		if(this.weaponType==4&&this.weapon.ammo%3!=0){
			this.weapon.cooldown*=0.1
		}
        let crit=constrain(this.playerData.crit+(this.critBuff>0?1:0),0,1)
        let spawn=[this.position.x+this.offset.position.x+this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.x*this.size+constrain(sin(this.direction.main)*3,-1,1)*10*this.size,this.position.y+this.offset.position.y+this.skin.arms[sin(this.direction.main)<0?1:0].points.final.end.y*this.size]
		switch(this.weaponType){
			case 0:
				for(let a=0,la=10;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(sin(this.direction.main)<0?-90:90)+random(-10,10),this.id,this.weaponData.damage*this.playerData.damageBuff,15,crit,this.index))
				}
			break
			case 1: case 2: case 4: case 34:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
			case 3:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
			case 5:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],3,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
            case 6:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(sin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
            case 7:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],5,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,180,crit,this.index))
			break
            case 8:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],6,(sin(this.direction.main)<0?-90:90)+random(-15,15),this.id,this.weaponData.damage*this.playerData.damageBuff,10,crit,this.index))
            break
            case 9:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],7,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,abs(this.velocity.x),crit,this.index))
            break
            case 10:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],8,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,360,crit,this.index))
            break
            case 11: case 62:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],9,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
            break
            case 12:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(sin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(sin(this.direction.main)<0?-90:90)+random(-0.1,0.1)-5,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(sin(this.direction.main)<0?-90:90)+random(-0.1,0.1)+5,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
            case 13:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],10,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
            break
            case 14: case 66:
                if(this.active>0||this.id>0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],11,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                }else{
                    this.weapon.ammo++
                }
            break
            case 15:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],12,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
            case 16:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],13,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
            case 17:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],14,(sin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
			case 18:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,(sin(this.direction.main)<0?-90:90)+random(-5,5),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
            case 19:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],15,(sin(this.direction.main)<0?-90:90)+random(-15,15),this.id,this.weaponData.damage*this.playerData.damageBuff,15,crit,this.index))
            break
			case 20:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],16,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
            case 21:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],17,(sin(this.direction.main)<0?-90:90)+random(-30,30),this.id,this.weaponData.damage*this.playerData.damageBuff,180,crit,this.index))
			break
            case 22:
				for(let a=0,la=15;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(sin(this.direction.main)<0?-90:90)+random(-15,15),this.id,this.weaponData.damage*this.playerData.damageBuff,15,crit,this.index))
				}
			break
            case 23:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],18,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
            case 24:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],19,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
            case 25: case 46:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],20,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
			case 26:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],21,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
			case 27:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],22,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
            case 28:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],23,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,abs(this.velocity.x),crit,this.index))
            break
            case 29: case 48:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],24,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
            case 30:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],25,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,abs(this.velocity.x),crit,this.index))
            break
			case 31:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],26,(sin(this.direction.main)<0?-90:90)+random(-7.5,7.5),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
			case 32:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],27,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
            case 33:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],28,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,180,crit,this.index))
			break
            case 35:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],29,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,360,crit,this.index))
            break
            case 36:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],30,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,180,crit,this.index))
			break
			case 37:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],31,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
			case 38:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],32,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
            case 39:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],33,(sin(this.direction.main)<0?-90:90)+random(-15,15),this.id,this.weaponData.damage*this.playerData.damageBuff,10,crit,this.index))
            break
            case 40:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],34,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,180,crit,this.index))
			break
            case 41:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],35,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,180,crit,this.index))
			break
            case 42:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],36,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
            break
            case 43:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],37,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,abs(this.velocity.x),crit,this.index))
            break
            case 44: case 76:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],38,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
            break
            case 45:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],39,(sin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
            case 47:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],40,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,abs(this.velocity.x),crit,this.index))
            break
			case 49:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],41,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
            case 50:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],5,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,180,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],5,(sin(this.direction.main)<0?90:-90),this.id,this.weaponData.damage*this.playerData.damageBuff,180,crit,this.index))
			break
			case 51:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],16,(sin(this.direction.main)<0?-90:90)+random(-5,5),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
            case 52:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],42,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,360,crit,this.index))
            break
            case 53:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],43,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
            case 54:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(sin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,this.weaponData.damage*this.playerData.damageBuff,10,crit,this.index))
			break
            case 55:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],5,(sin(this.direction.main)<0?-90:90)+random(-15,15),this.id,this.weaponData.damage*this.playerData.damageBuff,180,crit,this.index))
			break
            case 56:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,10,crit,this.index))
			break
            case 57: case 68:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],44,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
			case 58:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],45,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
            case 59:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],46,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,abs(this.velocity.x),crit,this.index))
            break
			case 60:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],47,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
			case 61:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],48,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
            case 62:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,10,crit,this.index))
			break
            case 63:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],20,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,10,crit,this.index))
			break
            case 64:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],49,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
			case 65:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],52,(sin(this.direction.main)<0?-90:90)+random(-7.5,7.5),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
			case 67:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],53,(sin(this.direction.main)<0?-90:90)+random(-7.5,7.5),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
            case 69:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],50,(sin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],50,(sin(this.direction.main)<0?-90:90)+random(-0.1,0.1)-5,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],50,(sin(this.direction.main)<0?-90:90)+random(-0.1,0.1)+5,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
			case 70:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],54,(sin(this.direction.main)<0?-90:90)+random(-7.5,7.5),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
            case 71:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],51,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,180,crit,this.index))
			break
			case 72:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],55,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
			case 73:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],55,(sin(this.direction.main)<0?-90:90)-10,this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],55,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],55,(sin(this.direction.main)<0?-90:90)+10,this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
			case 74:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],56,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
            case 75:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],57,(sin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
			case 77:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],58,(sin(this.direction.main)<0?-90:90)+random(-7.5,7.5),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break
            case 78:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],59,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
            case 79:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],39,(sin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],39,(sin(this.direction.main)<0?-90:90)+random(-0.1,0.1)-5,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],39,(sin(this.direction.main)<0?-90:90)+random(-0.1,0.1)+5,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
            case 80:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],60,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,180,crit,this.index))
			break
            case 81:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],61,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,180,crit,this.index))
			break
            case 82:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],62,(sin(this.direction.main)<0?-90:90)+random(-7.5,7.5),this.id,this.weaponData.damage*this.playerData.damageBuff,180,crit,this.index))
			break
            case 83:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],63,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
            break
            case 84:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(sin(this.direction.main)<0?-90:90)+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                this.takeDamage(1)
			break
            case 85:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(sin(this.direction.main)<0?-90:90)+random(-12.5,12.5),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(sin(this.direction.main)<0?-90:90)+random(-12.5,12.5),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
			break
			case 86:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],64,(sin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff,600,crit,this.index))
			break

		}
        if(this.weapon.uses<=0&&this.id>0){
            this.weaponType=-1
        }
	}
    update(){
        this.time++
        switch(this.weaponType){
            case 6: case 12: case 17: case 45: case 54: case 69:
                this.infoAnim.bar=[smoothAnim(this.infoAnim.bar[0],sin(this.direction.main)<0,0,1,5),smoothAnim(this.infoAnim.bar[1],sin(this.direction.main)>0,0,1,5)]
            break
        }
        for(let a=0,la=this.infoAnim.ammo.length;a<la;a++){
            this.infoAnim.ammo[a]=smoothAnim(this.infoAnim.ammo[a],this.weapon.ammo>a,0,1,5)
        }
        for(let a=0,la=this.infoAnim.uses.length;a<la;a++){
            this.infoAnim.uses[a]=smoothAnim(this.infoAnim.uses[a],this.weapon.uses>a,0,1,5)
        }
        if(abs(this.direction.main-this.direction.goal)<=18||abs(this.direction.main-this.direction.goal-360)<=18||abs(this.direction.main-this.direction.goal+360)<=18||abs(this.direction.main-this.direction.goal-720)<=18||abs(this.direction.main-this.direction.goal+720)<=18){
            this.direction.main=this.direction.goal
        }else if(
            this.direction.main>this.direction.goal&&this.direction.main<this.direction.goal+180||
            this.direction.main>this.direction.goal-360&&this.direction.main<this.direction.goal-180||
            this.direction.main>this.direction.goal+360&&this.direction.main<this.direction.goal+540||
            this.direction.main>this.direction.goal-720&&this.direction.main<this.direction.goal-540||
            this.direction.main>this.direction.goal+720&&this.direction.main<this.direction.goal+900){
            this.direction.main-=15
        }else if(
            this.direction.main<this.direction.goal&&this.direction.main>this.direction.goal-180||
            this.direction.main<this.direction.goal+360&&this.direction.main>this.direction.goal+180||
            this.direction.main<this.direction.goal-360&&this.direction.main>this.direction.goal-540||
            this.direction.main<this.direction.goal+720&&this.direction.main>this.direction.goal+540||
            this.direction.main<this.direction.goal-720&&this.direction.main>this.direction.goal-900){
            this.direction.main+=15
        }else{
            this.direction.main+=15*randSign()
        }
        if(this.direction.main>180){
            this.direction.main-=360
        }else if(this.direction.main<-180){
            this.direction.main+=360
        }
        if(this.direction.goal>180){
            this.direction.goal-=360
        }else if(this.direction.goal<-180){
            this.direction.goal+=360
        }
        this.collect.life=this.collect.life*0.9+this.life*0.1
        this.previous.position.x=this.position.x
        this.previous.position.y=this.position.y
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        if(this.weaponType==14||this.weaponType==66||this.playerData.name=='BigHyperPistol'){
            if(this.active>0){
                this.life=this.base.life
                this.active--
                if(this.active<=0){
                    this.active=-1
                    this.color=this.base.color
                }
            }else if(this.active==0&&this.life<this.base.life){
                this.active=this.playerData.name=='BigHyperMedic'?600:this.playerData.name=='ShortHyperMedic'?120:300
                this.color.skin.head=mergeColor(this.color.skin.head,[255,255,255],0.6)
                this.color.skin.body=mergeColor(this.color.skin.body,[255,255,255],0.6)
                this.color.skin.legs=mergeColor(this.color.skin.legs,[255,255,255],0.6)
                this.color.skin.arms=mergeColor(this.color.skin.arms,[255,255,255],0.6)
            }
        }else if(this.playerData.name=='HyperPistol'||this.playerData.name=='CritHyperPistol'||this.playerData.name=='HyperCaffeinePistol'){
            if(this.active>0){
                this.life=this.base.life
                this.active--
                if(this.active<=0){
                    this.active=-1
                    this.color=this.base.color
                }
            }else if(this.active==0&&this.life<this.base.life){
                this.active=150
                if(this.playerData.name=='HyperCaffeinePistol'){
                    this.critBuff=max(this.critBuff,150)
                }
                this.color.skin.head=mergeColor(this.color.skin.head,[255,255,255],0.6)
                this.color.skin.body=mergeColor(this.color.skin.body,[255,255,255],0.6)
                this.color.skin.legs=mergeColor(this.color.skin.legs,[255,255,255],0.6)
                this.color.skin.arms=mergeColor(this.color.skin.arms,[255,255,255],0.6)
            }
        }
        if(this.id>=game.gaming+1||this.id==0){
            if(floor(random(0,120))==0||this.target>=entities.players.length){
                if((this.weaponType==11||this.weaponType==13||this.weaponType==14||this.weaponType==62||this.weaponType==66)&&entities.players.length>game.players){
                    this.target=floor(random(game.players,entities.players.length))
                }else{
                    this.target=game.gaming==1&&entities.players[0].life<=0&&this.id>0?0:floor(random(0,game.players))
                }
            }
            if(this.target>=entities.players.length){
                this.target=entities.players.length-1
            }
            if(this.weaponData.name.includes('Punch')&&floor(random(0,10))==0){
                this.manage[0]=this.position.x>entities.players[this.target].position.x?0:1
            }else if(floor(random(0,30))==0){
                this.manage[0]=this.position.x>entities.players[this.target].position.x?([2,0,0,0,1][floor(random(0,5))]):([2,1,1,1,0][floor(random(0,5))])
            }
            if(this.manage[1]==0&&(floor(random(0,15))==0&&!game.invisible||floor(random(0,300))==0&&game.invisible)&&this.weaponType!=5&&this.weaponType!=3&&this.weapon.ammo==this.weaponData.ammo){
                this.manage[1]=1
            }else if(this.manage[1]==1&&(floor(random(0,600))==0||this.weapon.ammo==0)&&this.weaponType!=5&&this.weaponType!=3){
                this.manage[1]=0
            }else if(this.manage[1]==0&&floor(random(0,60))==0&&this.weaponType==3&&dist(this.position.x,this.position.y,this.base.position.x,this.base.position.y)>150){
                this.manage[1]=1
            }else if(this.manage[1]==0&&floor(random(0,120))==0&&this.weaponType==5&&dist(this.position.x,this.position.y,this.base.position.x,this.base.position.y)>300){
                this.manage[1]=1
            }
            if(this.playerData.name=='PistolJump'||this.playerData.name=='FastPunchJump'||this.playerData.name=='BigRocketLauncherJump'||this.playerData.name=='BigCritPistolJump'||this.playerData.name=='ShotgunJump'){
                if(this.manage[2]==0&&(floor(random(0,120))==0||floor(random(0,30))==0&&this.position.y>entities.players[this.target].position.y)){
                    this.manage[2]=1
                }else if(this.manage[2]==1&&(floor(random(0,60))==0||floor(random(0,30))==0&&this.position.y<entities.players[this.target].position.y)){
                    this.manage[2]=0
                }
            }else if(this.id==0){
                if(this.manage[2]==0&&(floor(random(0,240))==0||floor(random(0,60))==0&&this.position.y>entities.players[this.target].position.y)){
                    this.manage[2]=1
                }else if(this.manage[2]==1&&(floor(random(0,60))==0||floor(random(0,30))==0&&this.position.y<entities.players[this.target].position.y)){
                    this.manage[2]=0
                }
            }else{
                if(this.manage[2]==0&&(floor(random(0,60))==0||floor(random(0,30))==0&&this.position.y>entities.players[this.target].position.y)){
                    this.manage[2]=1
                }else if(this.manage[2]==1&&(floor(random(0,240))==0||floor(random(0,15))==0&&this.position.y<entities.players[this.target].position.y)){
                    this.manage[2]=0
                }
            }
            if(this.manage[0]==0&&this.life>0&&this.stunTime<=0){
                this.direction.goal=-54
                this.velocity.x-=(this.weaponType==-1?1.6:this.weaponData.speed)*this.playerData.speedBuff
                this.runAnim(1/30)
            }else if(this.manage[0]==1&&this.life>0&&this.stunTime<=0){
                this.direction.goal=54
                this.velocity.x+=(this.weaponType==-1?1.6:this.weaponData.speed)*this.playerData.speedBuff
                this.runAnim(1/30)
            }else if(this.animSet.loop<1&&this.animSet.loop>0){
                this.runAnim(1/30)
            }else if(this.animSet.loop>=1){
                this.animSet.loop=0
            }
            if(this.manage[2]==1&&this.life>0&&(this.jump.time>0||this.jump.active>0)){
                if(this.jump.time>0){
                    this.jump.time=0
                    this.jump.active=10
                }
                if(this.playerData.name=='PistolJump'||this.playerData.name=='FastPunchJump'||this.playerData.name=='BigRocketLauncherJump'||this.playerData.name=='BigCritPistolJump'||this.playerData.name=='ShotgunJump'){
                    this.velocity.y=min(-21,this.velocity.y-2.25)
                }else{
                    this.velocity.y=min(-14,this.velocity.y-1.5)
                }
            }
            if(this.manage[1]==1&&this.life>0&&this.weapon.cooldown<=0&&this.weapon.ammo>0&&this.life>0){
                this.attack()
            }
        }else if(this.control==0){
					if(this.life>0){
            this.inputs.push([inputs.keys[this.id-1][0],inputs.keys[this.id-1][1],inputs.keys[this.id-1][2],inputs.keys[this.id-1][3]])
					}
            if(inputs.keys[this.id-1][0]&&!inputs.keys[this.id-1][1]&&this.life>0&&this.stunTime<=0){
                this.direction.goal=-54
                this.velocity.x-=(this.weaponType==-1?1.6:this.weaponData.speed)*this.playerData.speedBuff
                this.runAnim(1/30)
            }else if(inputs.keys[this.id-1][1]&&!inputs.keys[this.id-1][0]&&this.life>0&&this.stunTime<=0){
                this.direction.goal=54
                this.velocity.x+=(this.weaponType==-1?1.6:this.weaponData.speed)*this.playerData.speedBuff
                this.runAnim(1/30)
            }else if(this.animSet.loop<1&&this.animSet.loop>0){
                this.runAnim(1/30)
            }else if(this.animSet.loop>=1){
                this.animSet.loop=0
            }
            if(inputs.keys[this.id-1][2]&&this.life>0&&(this.jump.time>0||this.jump.active>0)){
                if(this.jump.time>0){
                    this.jump.time=0
                    this.jump.active=10
                }
                this.velocity.y=min(-14,this.velocity.y-1.5)
            }
            if(inputs.keys[this.id-1][3]&&this.life>0&&this.weapon.cooldown<=0&&this.weapon.ammo>0&&this.life>0&&this.weaponType>=0){
                this.attack()
            }
        }else{
            if(this.selector>=this.inputs.length){
                this.control=0
            }else{
                if(this.inputs[this.selector][0]&&!this.inputs[this.selector][1]&&this.life>0&&this.stunTime<=0){
                    this.direction.goal=-54
                    this.velocity.x-=(this.weaponType==-1?1.6:this.weaponData.speed)*this.playerData.speedBuff
                    this.runAnim(1/30)
                }else if(this.inputs[this.selector][1]&&!this.inputs[this.selector][0]&&this.life>0&&this.stunTime<=0){
                    this.direction.goal=54
                    this.velocity.x+=(this.weaponType==-1?1.6:this.weaponData.speed)*this.playerData.speedBuff
                    this.runAnim(1/30)
                }else if(this.animSet.loop<1&&this.animSet.loop>0){
                    this.runAnim(1/30)
                }else if(this.animSet.loop>=1){
                    this.animSet.loop=0
                }
                if(this.inputs[this.selector][2]&&this.life>0&&(this.jump.time>0||this.jump.active>0)){
                    if(this.jump.time>0){
                        this.jump.time=0
                        this.jump.active=10
                    }
                    this.velocity.y=min(-14,this.velocity.y-1.5)
                }
                if(this.inputs[this.selector][3]&&this.life>0&&this.weapon.cooldown<=0&&this.weapon.ammo>0&&this.life>0&&this.weaponType>=0){
                    this.attack()
                }
                this.selector++
            }
        }
        if(this.weaponType>=0){
            if(this.weapon.cooldown>0){
                this.weapon.cooldown-=this.playerData.reloadBuff*(this.confuseTime>0?1/3:1)
            }
            if(this.weapon.reload>0){
                this.weapon.reload-=this.playerData.reloadBuff*(this.confuseTime>0?1/3:1)
            }else if(this.weapon.ammo<this.weaponData.ammo&&(this.weapon.ammo<this.weapon.uses||this.id==0||this.id>=game.gaming+1)){
                this.weapon.ammo++
                this.weapon.reload=this.weaponData.reload
            }
        }else{
            if(
                dist(this.position.x,this.position.y,this.layer.width/2,this.layer.height/3)<50&&(game.level==0||game.level==1)||
                dist(this.position.x,this.position.y,this.layer.width/2,this.layer.height/3-40)<50&&game.level==4||
                dist(this.position.x,this.position.y,150,this.layer.height-320)<50&&game.level==5||
                this.id>=game.gaming+1){
                this.newWeapon()
            }
        }
        if(this.jump.time>0){
            this.jump.time--
        }
        if(this.jump.active>0){
            this.jump.active--
        }
        if(this.collect.time>0){
            this.collect.time--
            if(this.weaponType==11||this.weaponType==13||this.weaponType==14||this.weaponType==62||this.weaponType==66){
                this.collect.time-=2
            }
        }else if(this.life>0&&this.id>0){
            this.life=min(this.base.life,this.life+this.base.life/300)
        }
        if(this.position.x<0){
            this.position.x=0
            this.velocity.x=0
        }
        if(this.position.x>this.layer.width){
            this.position.x=this.layer.width
            this.velocity.x=0
        }
        if(this.position.y<0){
            this.position.y=0
            this.velocity.y=0
        }
        if(this.position.y>this.layer.height){
            this.life=0
            this.die.killer=-1
        }
        if(this.life<=0){
            this.life=0
            if(!this.dead){
                this.dead=true
                for(let a=0,la=entities.players.length;a<la;a++){
                    if(entities.players[a].id==this.die.killer){
                        entities.players[a].stats.kills++
                    }
                }
                this.stats.deaths++
            }else{
                this.die.timer++
                if(this.die.timer>180&&!game.classicRespawn){
                    this.respawn()
                }
                if(this.die.timer>=120&&game.classicRespawn){
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(inBoxBox(this,entities.players[a])&&this.id!=entities.players[a].id&&!entities.players[a].dead&&this.id>0&&entities.players[a].id>0){
                            this.life=this.id>=game.gaming+1?this.base.life:this.base.life*0.2
                            this.dead=false
                        }
                    }
                }
            }
        }
        switch(this.playerData.name){
            case 'RocketLauncherHeal': case 'FastPunchHeal':
                for(let a=0,la=entities.players.length;a<la;a++){
                    if(dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<300&&this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&this.id==0&&entities.players[a].id==0){
                        entities.players[a].life=min(entities.players[a].base.life,entities.players[a].life+entities.players[a].base.life/600)
                    }
                }
            break
            case 'RocketLauncherBuff': case 'BigRocketLauncherBuff': case 'BigCritRocketLauncherBuff': case 'BigSpamRocketLauncherBuff': case 'RocketLauncherHealSelfBuff':
                for(let a=0,la=entities.players.length;a<la;a++){
                    if(dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<300&&this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&this.id==0&&entities.players[a].id==0){
                        entities.players[a].critBuff=max(entities.players[a].critBuff,15)
                    }
                }
            break
            case 'RocketLauncherDefendBuff':  case 'BigCritRocketLauncherDefendBuff': case 'BigRocketLauncherDefendBuff': case 'RocketLauncherHealSelfDefendBuff':
                for(let a=0,la=entities.players.length;a<la;a++){
                    if(dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<300&&this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&this.id==0&&entities.players[a].id==0){
                        entities.players[a].defendBuff=max(entities.players[a].defendBuff,15)
                    }
                }
            break
            case 'MedicShield': case 'HyperMedicShield': case 'CritApplyMedicShield':
                for(let a=0,la=entities.projectiles.length;a<la;a++){
                    if((entities.projectiles[a].id==0?1:0)!=(this.id==0?1:0)&&inBoxBox({position:{x:this.position.x+(sin(this.direction.main)<0?-75:75),y:this.position.y},width:20,height:120},entities.projectiles[a])&&entities.projectiles[a].active){
                        entities.projectiles[a].active=false

                    }
                }
            break
            case 'EngineerSpawner':
                if(this.time%300==0){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,0,0,[],true,findName(['Pistol','Shotgun','RocketLauncher','Flamethrower','MachineGun','Baller','Punch','Medic'][floor(random(0,8))],types.player),game.index))
                    game.index++
                }
            break
        }
        if(this.critBuff>0){
            this.critBuff--
        }
        if(this.defendBuff>0){
            this.defendBuff--
        }
        if(this.stunTime>0){
            this.stunTime--
        }
        if(this.vulnerableTime>0){
            this.vulnerableTime--
        }
        if(this.confuseTime>0){
            this.confuseTime--
        }
        if(this.DOT.active>0){
            this.DOT.active--
            this.life-=this.DOT.damage
        }
        if(game.invis){
            if(this.visible>0){
                this.visible--
            }
            for(let a=0,la=entities.players.length;a<la;a++){
                if(inBoxBox(this,entities.players[a])&&this.id!=entities.players[a].id&&!entities.players[a].dead&&!this.dead){
                    this.visible=15
                }
            }
        }
        if(this.base.control==0&&this.control==1){
            this.color.skin.head=mergeColor(this.color.skin.head,[100,100,100],0.6)
            this.color.skin.body=mergeColor(this.color.skin.body,[100,100,100],0.6)
            this.color.skin.legs=mergeColor(this.color.skin.legs,[100,100,100],0.6)
            this.color.skin.arms=mergeColor(this.color.skin.arms,[100,100,100],0.6)
            this.base.control=1
        }else if(this.base.control==1&&this.control==0){
            this.color.skin.head=mergeColor(this.color.skin.head,[255,255,255],0.6)
            this.color.skin.body=mergeColor(this.color.skin.body,[255,255,255],0.6)
            this.color.skin.legs=mergeColor(this.color.skin.legs,[255,255,255],0.6)
            this.color.skin.arms=mergeColor(this.color.skin.arms,[255,255,255],0.6)
            this.base.control=0
        }
        this.velocity.x*=0.85
        this.velocity.y+=1.5
        if(this.id==0){
            if(game.invis){
                this.fade=smoothAnim(this.fade,this.visible>0&&!this.dead,0,1,10)
            }else{
                this.fade=smoothAnim(this.fade,!this.dead,0,1,5)
            }
            if(this.dead&&this.fade<=0){
                this.remove=true
            }
        }else{
            if(this.invincible>0){
                this.invincible--
                this.fade=smoothAnim(this.fade,game.time%20>=10,0.4,1,5)
            }else if(game.invis){
                this.fade=smoothAnim(this.fade,this.visible>0&&!this.dead,0,1,10)
            }else{
                this.fade=smoothAnim(this.fade,!this.dead,0.4,1,5)
            }
        }
    }
}
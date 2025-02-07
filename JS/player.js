class player{
    constructor(layer,x,y,id,control,inputs,primary,type,index){
        layer=layer
        this.position={x:x,y:y}
        this.id=id
        this.control=control
        this.inputs=inputs
        this.primary=primary
        this.type=type
        this.index=index
        this.playerData=types.player[this.type]
        this.weaponType=this.playerData.weapon
        this.weaponData=this.weaponType==-1?{name:'None'}:types.weapon[this.weaponType]
        this.selector=0
        this.width=8*((game.level==1||game.level==6)&&this.playerData.sizeBuff>1?this.playerData.sizeBuff*0.1+0.9:this.playerData.sizeBuff)
        this.height=24*((game.level==1||game.level==6)&&this.playerData.sizeBuff>1?this.playerData.sizeBuff*0.1+0.9:this.playerData.sizeBuff)
        this.fade=0
        this.size=0.5*((game.level==1||game.level==6)&&this.playerData.sizeBuff>1?this.playerData.sizeBuff*0.1+0.9:this.playerData.sizeBuff)
        this.life=100*this.playerData.lifeBuff
        this.ammoMult=game.ammoMult
        this.dead=false
        this.velocity={x:0,y:0}
        this.offset={position:{x:0,y:12*((game.level==1||game.level==6)&&this.playerData.sizeBuff>1?this.playerData.sizeBuff*0.1+0.9:this.playerData.sizeBuff)}}
        this.previous={position:{x:this.position.x,y:this.position.y}}
        this.infoAnim={life:1,ammo:[0,0,0,0],uses:[0,0,0,0],ammoA:[0,0,0,0],usesA:[0,0,0,0],ammoB:[0,0,0,0],usesB:[0,0,0,0]}
        this.jump={time:0,double:0,triple:0,quadruple:0,active:0}
        this.base={life:this.life,position:{x:this.position.x,y:this.position.y},control:0}
        this.collect={life:this.life,time:0}
        this.record={life:this.life}
        this.weapon={ammo:this.weaponData.ammo,cooldown:0,reload:0,uses:(this.weaponData.uses==1?this.weaponData.uses:this.weaponData.uses*this.ammoMult),reloading:false}
        this.DOT={damage:0,active:0}
        this.die={timer:0,killer:'none'}
        this.stats={kills:0,deaths:0,damage:0,bust:0}
        this.invincible=0
        if(this.playerData.name=='Spy'||this.playerData.name=='SpyHealSelf'||this.playerData.name=='RapidSpy'||this.playerData.name=='SpyTank'||this.playerData.name=='CritSpy'||this.playerData.name=='RevolverSpy'||this.playerData.name=='SpyHeal'||game.randomizer){
            this.copy=floor(random(0,game.players))
        }
        if(this.weaponType==14||this.weaponType==66||this.playerData.name=='HyperPistol'||this.playerData.name=='CritHyperPistol'||this.playerData.name=='BigHyperPistol'||this.playerData.name=='HyperCaffeinePistol'||this.playerData.name=='BigHyperMultiMedic'||this.playerData.name=='HyperTank'||this.playerData.name=='HyperShotgun'||game.randomizer){
            this.active=0
        }
        this.visible=0
        this.setupGraphics()
        this.manage=[0,0,0]
        this.infoAnim.bar=[0,0]
        this.infoAnim.elevate=0
        this.target={position:{x:this.position.x,y:this.position.y},index:0}
        this.time=0
        this.critBuff=0
        this.defendBuff=0
        this.speedBuff=0
        this.stunTime=0
        this.stuckTime=0
        this.vulnerableTime=0
        this.confuseTime=0
        this.bounceTime=0
        this.dizzyTime=0
        this.chillTime=0
        this.shrinkTime=0
        this.gasTime=0
        this.gasser=0
        this.exploded=false
        this.thrown=false
        this.thrown2=false
        this.parachute=false
        this.disable=false
        this.attacking=0
        this.construct=false
        this.remote=false
        this.sidekick=false
        this.builder=-1
        this.inspect=[]
        this.scan=[0,0,0,0,0,0,0,0,0]
        this.firearc=[0,0]
        this.lastingForce=[0,0]
        this.pointer={x:0,y:0,fails:0,hit:false}
        this.free=false
        this.assort={detonate:0,glove:0,gas:0,ultraviolet:0,elevate:0}

        this.subPlayerAType=0
        this.subPlayerBType=0
        this.subPlayerAData=types.player[this.subPlayerAType]
        this.subPlayerBData=types.player[this.subPlayerBType]
        this.subWeaponAType=0
        this.subWeaponBType=0
        this.subWeaponAData=types.weapon[this.subWeaponAType]
        this.subWeaponBData=types.weapon[this.subWeaponBType]
        this.subWeaponA={ammo:this.subWeaponAData.ammo,cooldown:0,reload:0,uses:(this.subWeaponAData.uses==1?this.subWeaponAData.uses:this.subWeaponAData.uses*this.ammoMult),reloading:false}
        this.subWeaponB={ammo:this.subWeaponBData.ammo,cooldown:0,reload:0,uses:(this.subWeaponBData.uses==1?this.subWeaponBData.uses:this.subWeaponBData.uses*this.ammoMult),reloading:false}

        if(this.id>0&&game.randomizer){
            this.multLife(2)
        }
        if(this.id!=1&&game.assault){
            this.multLife(0.5)
        }
        this.variant=0
        if(game.brutal){
            this.variant=this.id==0?floor(random(0,16)):0
            if(this.variant==12){
                this.multLife(6)
            }else if(this.variant==14){
                this.active=0
            }
        }
        /*if(this.id==0){
            this.critBuff=999999
            this.multLife(2)
        }*/
    }
    multLife(value){
        this.life*=value
        this.base.life*=value
        this.collect.life*=value
        this.record.life*=value
    }
    setupGraphics(){
        this.direction=(this.position.x<game.edge[0]/2&&entities.players.length<=1||entities.players.length>1&&this.position.x<entities.players[0].position.x)?{main:54,goal:54,back:54}:{main:-54,goal:-54,back:54}
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
            this.skin.legs[a].points.base.end.x=this.skin.legs[a].points.base.start.x+lsin(this.skin.legs[a].anim.theta)*this.skin.legs[a].length
            this.skin.legs[a].points.base.end.y=this.skin.legs[a].points.base.start.y+lcos(this.skin.legs[a].anim.theta)*this.skin.legs[a].length
            this.skin.legs[a].points.final.start.x=this.skin.legs[a].points.base.start.x*lsin(this.skin.legs[a].anim.phi+this.direction.main),
            this.skin.legs[a].points.final.start.y=this.skin.legs[a].points.base.start.y
            this.skin.legs[a].points.final.end.x=this.skin.legs[a].points.base.end.x*lsin(this.skin.legs[a].anim.phi+this.direction.main),
            this.skin.legs[a].points.final.end.y=this.skin.legs[a].points.base.end.y
            this.skin.arms[a].points.base.end.x=this.skin.arms[a].points.base.start.x+lsin(this.skin.arms[a].anim.theta)*this.skin.arms[a].length
            this.skin.arms[a].points.base.end.y=this.skin.arms[a].points.base.start.y+lcos(this.skin.arms[a].anim.theta)*this.skin.arms[a].length
            this.skin.arms[a].points.final.start.x=this.skin.arms[a].points.base.start.x*lsin(this.skin.arms[a].anim.phi+this.direction.main),
            this.skin.arms[a].points.final.start.y=this.skin.arms[a].points.base.start.y
            this.skin.arms[a].points.final.end.x=this.skin.arms[a].points.base.end.x*lsin(this.skin.arms[a].anim.phi+this.direction.main),
            this.skin.arms[a].points.final.end.y=this.skin.arms[a].points.base.end.y
        }
    }
    runAnim(rate){
        this.animSet.loop+=rate
        for(let a=0,la=2;a<la;a++){
            this.skin.legs[a].anim.phi=90*(1-a*2)+lsin((this.animSet.loop+this.animSet.flip)*360)*75
            this.skin.arms[a].anim.phi=90*(1-a*2)+lsin((this.animSet.loop+this.animSet.flip)*360)*60
        }
    }
    displayBack(){
        if(this.primary&&this.id>0){
        }
    }
    displayInfo(layer,offsetX=0,offsetY=0){
        layer.push()
        layer.translate(this.position.x+this.offset.position.x+offsetX,this.position.y-42.5*this.playerData.sizeBuff+this.offset.position.y+offsetY)
        layer.noStroke()
        layer.fill(180,this.fade)
        layer.noStroke()
        layer.textSize(10)
        if(!this.sidekick){
            if(game.newStats){
                if(this.playerData.name=='PlayerSpy'){
                    layer.text('Pistol',0,-17.5)
                }else if(this.id>0&&game.past){
                    layer.text(`Wins: ${game.wins[this.id-1]}`,0,-35)
                    layer.text(this.playerData.name,0,-18.5)
                }else if(this.construct){
                    layer.text(`Damage: ${regNum(this.stats.damage)}`,0,-38)
                }else if(this.playerData.name=='Spy'||this.playerData.name=='SpyHealSelf'||this.playerData.name=='RapidSpy'||this.playerData.name=='SpyTank'||this.playerData.name=='CritSpy'||this.playerData.name=='RevolverSpy'||this.playerData.name=='SpyHeal'){
                    layer.text(`Damage: ${regNum(entities.players[this.copy].stats.damage)}\nDeaths: ${entities.players[this.copy].stats.deaths}\nWeapon: ${entities.players[this.copy].weaponType==-1?`None`:entities.players[this.copy].weaponData.name}`,0,-35)
                }else if(game.randomizer&&this.id>0){
                    layer.text(`Damage: ${regNum(this.stats.damage)}\nDeaths: ${this.stats.deaths}`,0,-38)
                    layer.text(this.playerData.name,0,-18.5)
                }else if(this.id>0){
                    if(game.level==13){
                        layer.text(`Damage: ${regNum(this.stats.damage)}\nDeaths: ${this.stats.deaths}\nWeapon: ${game.weapon[this.id-1].length}/3`,0,-35)
                    }else if(game.level==14){
                        layer.text(`Damage: ${regNum(this.stats.damage)}\nDeaths: ${this.stats.deaths}\nWeapon: ${game.weapon[this.id-1].length}/${game.peakWeapon?(game.mainline?1:2):4}`,0,-35)
                    }else{
                        layer.text(`Damage: ${regNum(this.stats.damage)}\nDeaths: ${this.stats.deaths}\nWeapon: ${this.weaponType==-1?`None`:this.weaponData.name+(this.playerData.name==`PlayerConglomeration`?`[${this.subWeaponAData.name},${this.subWeaponBData.name}]`:this.playerData.name==`PlayerSwitcheroo`?`[${this.subWeaponAData.name}]`:``)}`,0,-35)
                    }
                }else{
                    layer.text(this.playerData.name,0,-17.5)
                }
            }else{
                if(this.playerData.name=='PlayerSpy'){
                    layer.text('Pistol',0,-17.5)
                }else if(this.id>0&&game.past){
                    layer.text(`Wins: ${game.wins[this.id-1]}`,0,-35)
                    layer.text(this.playerData.name,0,-18.5)
                }else if(this.construct){
                    layer.text(`Kills: ${this.stats.kills}`,0,-38)
                }else if(this.playerData.name=='Spy'||this.playerData.name=='SpyHealSelf'||this.playerData.name=='RapidSpy'||this.playerData.name=='SpyTank'||this.playerData.name=='CritSpy'||this.playerData.name=='RevolverSpy'||this.playerData.name=='SpyHeal'){
                    layer.text(`Kills: ${entities.players[this.copy].stats.kills}\nDeaths: ${entities.players[this.copy].stats.deaths}\nWeapon: ${entities.players[this.copy].weaponType==-1?`None`:entities.players[this.copy].weaponData.name}`,0,-35)
                }else if(game.randomizer&&this.id>0){
                    layer.text(`Kills: ${this.stats.kills}\nDeaths: ${this.stats.deaths}`,0,-38)
                    layer.text(this.playerData.name,0,-18.5)
                }else if(this.id>0){
                    if(game.level==13){
                        layer.text(`Kills: ${this.stats.kills}\nDeaths: ${this.stats.deaths}\nWeapon: ${game.weapon[this.id-1].length}/3`,0,-35)
                    }else if(game.level==14){
                        layer.text(`Kills: ${this.stats.kills}\nDeaths: ${this.stats.deaths}\nWeapon: ${game.weapon[this.id-1].length}/${game.peakWeapon?(game.mainline?1:2):4}`,0,-35)
                    }else{
                        layer.text(`Kills: ${this.stats.kills}\nDeaths: ${this.stats.deaths}\nWeapon: ${this.weaponType==-1?`None`:this.weaponData.name+(this.playerData.name==`PlayerConglomeration`?`[${this.subWeaponAData.name},${this.subWeaponBData.name}]`:this.playerData.name==`PlayerSwitcheroo`?`[${this.subWeaponAData.name}]`:``)}`,0,-35)
                    }
                }else{
                    layer.text(this.playerData.name,0,-17.5)
                }
            }
        }
        layer.fill(150,this.fade*this.infoAnim.life)
        layer.rect(0,0,30,4,2)
        if(this.id>0&&this.playerData.name!='PlayerSpy'||this.playerData.name=='Spy'||this.playerData.name=='SpyHealSelf'||this.playerData.name=='RapidSpy'||this.playerData.name=='SpyTank'||this.playerData.name=='CritSpy'||this.playerData.name=='RevolverSpy'){
            if(!game.randomizer){
                if(this.weaponType>=0){
                    if(this.weaponData.ammo>4){
                        layer.rect(0,-14,30,4,2)
                        layer.fill(200,this.fade*this.infoAnim.life)
                        layer.rect(-15+15*this.weapon.ammo/this.weaponData.ammo,-14,30*this.weapon.ammo/this.weaponData.ammo,4,2)
                    }else{
                        for(let a=0,la=this.weapon.ammo;a<la;a++){
                            layer.fill(150,this.fade*this.infoAnim.ammo[a])
                            layer.ellipse(-12+a*8,-14,6)
                            layer.fill(200,this.fade*this.infoAnim.ammo[a])
                            layer.ellipse(-12+a*8,-14,4)
                        }
                    }
                    layer.fill(150,this.fade*this.infoAnim.life)
                    if((this.weaponData.uses*this.ammoMult)>4){
                        layer.rect(0,-7,30,4,2)
                        layer.fill(0,150,255,this.fade*this.infoAnim.life)
                        if(this.weapon.uses>0){
                            layer.rect(-15+15*this.weapon.uses/(this.weaponData.uses*this.ammoMult),-7,30*this.weapon.uses/(this.weaponData.uses*this.ammoMult),4,2)
                        }
                    }else{
                        for(let a=0,la=this.weapon.uses;a<la;a++){
                            layer.fill(0,100,200,this.fade*this.infoAnim.uses[a])
                            layer.ellipse(-12+a*8,-7,6)
                            layer.fill(0,150,255,this.fade*this.infoAnim.uses[a])
                            layer.ellipse(-12+a*8,-7,4)
                        }
                    }
                    if(this.playerData.name=='PlayerConglomeration'){
                        if(this.subWeaponAData.ammo>4){
                            layer.fill(150,this.fade*this.infoAnim.life)
                            layer.rect(-32,-14,30,4,2)
                            layer.fill(200,this.fade*this.infoAnim.life)
                            layer.rect(-47+15*this.subWeaponA.ammo/this.subWeaponAData.ammo,-14,30*this.subWeaponA.ammo/this.subWeaponAData.ammo,4,2)
                        }else{
                            for(let a=0,la=this.subWeaponA.ammo;a<la;a++){
                                layer.fill(150,this.fade*this.infoAnim.ammoA[a])
                                layer.ellipse(-44+a*8,-14,6)
                                layer.fill(200,this.fade*this.infoAnim.ammoA[a])
                                layer.ellipse(-44+a*8,-14,4)
                            }
                        }
                        if(this.subWeaponBData.ammo>4){
                            layer.fill(150,this.fade*this.infoAnim.life)
                            layer.rect(32,-14,30,4,2)
                            layer.fill(200,this.fade*this.infoAnim.life)
                            layer.rect(17+15*this.subWeaponB.ammo/this.subWeaponBData.ammo,-14,30*this.subWeaponB.ammo/this.subWeaponBData.ammo,4,2)
                        }else{
                            for(let a=0,la=this.subWeaponB.ammo;a<la;a++){
                                layer.fill(150,this.fade*this.infoAnim.ammoB[a])
                                layer.ellipse(20+a*8,-14,6)
                                layer.fill(200,this.fade*this.infoAnim.ammoB[a])
                                layer.ellipse(20+a*8,-14,4)
                            }
                        }
                        layer.fill(150,this.fade*this.infoAnim.life)
                        if((this.subWeaponAData.uses*this.ammoMult)>4){
                            layer.fill(150,this.fade*this.infoAnim.life)
                            layer.rect(-32,-7,30,4,2)
                            layer.fill(0,150,255,this.fade*this.infoAnim.life)
                            if(this.subWeaponA.uses>0){
                                layer.rect(-47+15*this.subWeaponA.uses/(this.subWeaponAData.uses*this.ammoMult),-7,30*this.subWeaponA.uses/(this.subWeaponAData.uses*this.ammoMult),4,2)
                            }
                        }else{
                            for(let a=0,la=this.subWeaponA.uses;a<la;a++){
                                layer.fill(0,100,200,this.fade*this.infoAnim.usesA[a])
                                layer.ellipse(-44+a*8,-7,6)
                                layer.fill(0,150,255,this.fade*this.infoAnim.usesA[a])
                                layer.ellipse(-44+a*8,-7,4)
                            }
                        }
                        if((this.subWeaponBData.uses*this.ammoMult)>4){
                            layer.fill(150,this.fade*this.infoAnim.life)
                            layer.rect(32,-7,30,4,2)
                            layer.fill(0,150,255,this.fade*this.infoAnim.life)
                            if(this.subWeaponB.uses>0){
                                layer.rect(17+15*this.subWeaponB.uses/(this.subWeaponBData.uses*this.ammoMult),-7,30*this.subWeaponB.uses/(this.subWeaponBData.uses*this.ammoMult),4,2)
                            }
                        }else{
                            for(let a=0,la=this.subWeaponB.uses;a<la;a++){
                                layer.fill(0,100,200,this.fade*this.infoAnim.usesB[a])
                                layer.ellipse(20+a*8,-7,6)
                                layer.fill(0,150,255,this.fade*this.infoAnim.usesB[a])
                                layer.ellipse(20+a*8,-7,4)
                            }
                        }
                    }else if(this.playerData.name=='PlayerSwitcheroo'){
                        if(this.subWeaponAData.ammo>4){
                            layer.fill(150,this.fade*this.infoAnim.life)
                            layer.rect(-32,-14,30,4,2)
                            layer.fill(200,this.fade*this.infoAnim.life)
                            layer.rect(-47+15*this.subWeaponA.ammo/this.subWeaponAData.ammo,-14,30*this.subWeaponA.ammo/this.subWeaponAData.ammo,4,2)
                        }else{
                            for(let a=0,la=this.subWeaponA.ammo;a<la;a++){
                                layer.fill(150,this.fade*this.infoAnim.ammoA[a])
                                layer.ellipse(-44+a*8,-14,6)
                                layer.fill(200,this.fade*this.infoAnim.ammoA[a])
                                layer.ellipse(-44+a*8,-14,4)
                            }
                        }
                        layer.fill(150,this.fade*this.infoAnim.life)
                        if((this.subWeaponAData.uses*this.ammoMult)>4){
                            layer.fill(150,this.fade*this.infoAnim.life)
                            layer.rect(-32,-7,30,4,2)
                            layer.fill(0,150,255,this.fade*this.infoAnim.life)
                            if(this.subWeaponA.uses>0){
                                layer.rect(-47+15*this.subWeaponA.uses/(this.subWeaponAData.uses*this.ammoMult),-7,30*this.subWeaponA.uses/(this.subWeaponAData.uses*this.ammoMult),4,2)
                            }
                        }else{
                            for(let a=0,la=this.subWeaponA.uses;a<la;a++){
                                layer.fill(0,100,200,this.fade*this.infoAnim.usesA[a])
                                layer.ellipse(-44+a*8,-7,6)
                                layer.fill(0,150,255,this.fade*this.infoAnim.usesA[a])
                                layer.ellipse(-44+a*8,-7,4)
                            }
                        }
                    }
                }
            }else{        
                if(this.weaponType>=0){
                    if(this.weaponData.ammo>4){
                        layer.rect(0,-7,30,4,2)
                        layer.fill(200,this.fade*this.infoAnim.life)
                        layer.rect(-15+15*this.weapon.ammo/this.weaponData.ammo,-7,30*this.weapon.ammo/this.weaponData.ammo,4,2)
                    }else{
                        for(let a=0,la=this.weapon.ammo;a<la;a++){
                            layer.fill(150,this.fade*this.infoAnim.ammo[a])
                            layer.ellipse(-12+a*8,-7,6)
                            layer.fill(200,this.fade*this.infoAnim.ammo[a])
                            layer.ellipse(-12+a*8,-7,4)
                        }
                    }
                }
            }
        }
        if(this.collect.life>=this.life){
            layer.fill(240,0,0,this.fade*this.infoAnim.life)
            layer.rect((max(0,this.collect.life)/this.base.life)*15-15,0,(max(0,this.collect.life)/this.base.life)*30,1+min((max(0,this.collect.life)/this.base.life)*60,3),2)
            layer.fill(min(255,510-max(0,this.life)/this.base.life*510)-max(0,5-max(0,this.life)/this.base.life*30)*25,max(0,this.life)/this.base.life*510,0,this.fade*this.infoAnim.life)
            layer.rect((max(0,this.life)/this.base.life)*15-15,0,(max(0,this.life)/this.base.life)*30,2+min((max(0,this.life)/this.base.life)*60,3),2)
        }else if(this.collect.life<this.life){
            layer.fill(240,0,0,this.fade*this.infoAnim.life)
            layer.rect((max(0,this.life)/this.base.life)*15-15,0,(max(0,this.life)/this.base.life)*30,1+min((max(0,this.life)/this.base.life)*60,3),2)
            layer.fill(min(255,510-max(0,this.collect.life)/this.base.life*510)-max(0,5-max(0,this.collect.life)/this.base.life*30)*25,max(0,this.collect.life)/this.base.life*510,0,this.fade*this.infoAnim.life)
            layer.rect((max(0,this.collect.life)/this.base.life)*15-15,0,(max(0,this.collect.life)/this.base.life)*30,2+min((max(0,this.collect.life)/this.base.life)*60,3),2)
        }
        layer.pop()
    }
    display(layer,offsetX=0,offsetY=0){
        this.calculateParts()
        layer.push()
        layer.translate(this.position.x+this.offset.position.x+offsetX,this.position.y+this.offset.position.y+offsetY)
        if(this.parachute||this.playerData.name=='ParaPistol'||this.playerData.name=='ParaRocketLauncher'||this.playerData.name=='PlayerParaRocketLauncher'||this.playerData.name=='PlayerParaGrenadier'||this.playerData.name=='PlayerStratofortress'||this.playerData.name=='PlayerParachutist'||this.playerData.name=='PlayerDropship'||this.playerData.name=='PlayerApache'||this.playerData.name=='ParaMedic'||this.playerData.name=='BigParaRocketLauncher'||this.playerData.name=='BigCritParaRocketLauncher'||this.playerData.name=='PlayerAirdrop'||this.playerData.name=='SidekickGuardian'||this.playerData.name=='PlayerRadio'||this.playerData.name=='PlayerWhirlybird'||this.playerData.name=='PlayerRain'||this.playerData.name=='PlayerRTX'||this.playerData.name=='PlayerAircraft'){
            layer.noFill()
            layer.stroke(200,this.fade)
            layer.strokeWeight(1)
            layer.line(-25,-90,0,-5)
            layer.line(25,-90,0,-5)
            layer.stroke(160,this.fade)
            layer.strokeWeight(5)
            layer.arc(0,-80,80,20,-165,-15)
        }
        if(this.playerData.name=='MedicShield'||this.playerData.name=='HyperMedicShield'||this.playerData.name=='CritApplyMedicShield'||this.playerData.name=='BigFastRapidMedicShield'||this.playerData.name=='EngineerShield'||this.playerData.name=='BigMedicShield'||this.playerData.name=='TankShield'||game.brutal&&this.variant==10){
            layer.stroke(255,150,150,this.fade)
            layer.strokeWeight(4)
            if(lsin(this.direction.main)<0){
                layer.line(-80,-70,-80,50)
            }else{
                layer.line(80,-70,80,50)
            }
            layer.noStroke()
            layer.fill(255,150,150,this.fade*0.1)
            if(lsin(this.direction.main)<0){
                layer.triangle(-80,-70,-80,50,0,-10)
            }else{
                layer.triangle(80,-70,80,50,0,-10)
            }
        }
        if(this.playerData.name=='PlayerRearguard'||this.playerData.name=='PlayerBackFlak'){
            layer.stroke(255,150,150,this.fade)
            layer.strokeWeight(4)
            if(lsin(this.direction.main)<0){
                layer.line(80,-70,80,50)
            }else{
                layer.line(-80,-70,-80,50)
            }
            layer.noStroke()
            layer.fill(255,150,150,this.fade*0.1)
            if(lsin(this.direction.main)<0){
                layer.triangle(80,-70,80,50,0,-10)
            }else{
                layer.triangle(-80,-70,-80,50,0,-10)
            }
        }
        if(this.playerData.name=='PlayerRotary'||this.playerData.name=='PlayerClusterShield'){
            layer.stroke(255,150,150,this.fade)
            layer.strokeWeight(4)
            layer.line(80,-70,80,50)
            layer.line(-80,-70,-80,50)
            layer.noStroke()
            layer.fill(255,150,150,this.fade*0.1)
            layer.triangle(80,-70,80,50,0,-10)
            layer.triangle(-80,-70,-80,50,0,-10)
        }
        if(this.playerData.name=='PlayerKannon'){
            layer.stroke(255,150,150,this.fade)
            layer.strokeWeight(4)
            layer.line(-60,-100,60,-100)
            layer.noStroke()
            layer.fill(255,150,150,this.fade*0.1)
            layer.triangle(-60,-100,60,-100,0,-20)
        }
        if(this.playerData.name=='PlayerRho'){
            layer.stroke(150,this.fade)
            layer.strokeWeight(2)
            layer.noFill()
            layer.ellipse(0,-10,100)
            layer.noStroke()
            layer.fill(100,this.fade)
            layer.ellipse(50*lsin(this.time),50*lcos(this.time)-10,24)
            layer.ellipse(-50*lsin(this.time),-50*lcos(this.time)-10,24)
            layer.fill(225,this.fade)
            layer.ellipse(50*lcos(this.time),-50*lsin(this.time)-10,12)
            layer.ellipse(-50*lcos(this.time),50*lsin(this.time)-10,12)
            layer.fill(225,25,25,this.fade)
            layer.ellipse(50*lcos(this.time),-50*lsin(this.time)-10,4)
            layer.ellipse(-50*lcos(this.time),50*lsin(this.time)-10,4)
        }
        if(this.playerData.name=='PlayerOganesson'){
            let mapping=[2,8,18,32,32,18,8]
            layer.stroke(150,this.fade)
            layer.strokeWeight(2)
            layer.noFill()
            for(let a=0,la=mapping.length;a<la;a++){
                layer.ellipse(0,-10,100+a*40)
            }
            layer.noStroke()
            layer.fill(225,this.fade)
            for(let a=0,la=mapping.length;a<la;a++){
                for(let b=0,lb=mapping[a];b<lb;b++){
                    layer.ellipse((50+a*20)*lsin(this.time+b/lb*360),(50+a*20)*lcos(this.time+b/lb*360)-10,12)
                }
            }
            layer.fill(225,25,25,this.fade)
            for(let a=0,la=mapping.length;a<la;a++){
                for(let b=0,lb=mapping[a];b<lb;b++){
                    layer.ellipse((50+a*20)*lsin(this.time+b/lb*360),(50+a*20)*lcos(this.time+b/lb*360)-10,4)
                }
            }
        }
        if(this.playerData.name=='PlayerCircuit'){
            layer.stroke(150,this.fade)
            layer.strokeWeight(2)
            layer.noFill()
            layer.ellipse(0,-10,100)
            layer.noStroke()
            layer.fill(225,this.fade)
            layer.ellipse(50*lcos(this.time),-50*lsin(this.time)-10,12)
            layer.ellipse(-50*lcos(this.time),50*lsin(this.time)-10,12)
            layer.fill(225,25,25,this.fade)
            layer.ellipse(50*lcos(this.time),-50*lsin(this.time)-10,4)
            layer.ellipse(-50*lcos(this.time),50*lsin(this.time)-10,4)
        }
        if(this.playerData.name=='ConstructGuard'||this.playerData.name=='SidekickDisappointmentGuard'||this.playerData.name=='SidekickBonkerGuard'||this.playerData.name=='PlayerGuard'||this.playerData.name=='PlayerGuillotine'){
            layer.stroke(255,150,150,this.fade)
            layer.strokeWeight(4)
            if(lsin(this.direction.main)<0){
                layer.line(-80,-70,-80,50)
            }else{
                layer.line(80,-70,80,50)
            }
            layer.noStroke()
            layer.fill(255,150,150,this.fade*0.1)
            if(lsin(this.direction.main)<0){
                layer.triangle(-80,-70,-80,50,0,-10)
            }else{
                layer.triangle(80,-70,80,50,0,-10)
            }
        }
        if(this.playerData.name=='PlayerSchismist'||this.playerData.name=='PlayerRevolutionist'||this.playerData.name=='PlayerBohrer'){
            layer.stroke(150,this.fade)
            layer.strokeWeight(2)
            layer.noFill()
            layer.ellipse(0,-10,100)
            layer.noStroke()
            layer.fill(225,this.fade)
            layer.ellipse(50*lcos(this.time),-50*lsin(this.time)-10,12)
            layer.ellipse(-50*lcos(this.time),50*lsin(this.time)-10,12)
            layer.fill(225,25,25,this.fade)
            layer.ellipse(50*lcos(this.time),-50*lsin(this.time)-10,4)
            layer.ellipse(-50*lcos(this.time),50*lsin(this.time)-10,4)
        }
        if(this.playerData.name=='PlayerRevolutionistception'){
            layer.stroke(150,this.fade)
            layer.strokeWeight(2)
            layer.noFill()
            layer.ellipse(0,-10,100)
            layer.ellipse(0,-10,70)
            layer.noStroke()
            layer.fill(225,this.fade)
            layer.ellipse(50*lcos(this.time),-50*lsin(this.time)-10,12)
            layer.ellipse(-50*lcos(this.time),50*lsin(this.time)-10,12)
            layer.ellipse(35*lcos(-this.time),-35*lsin(-this.time)-10,8.4)
            layer.ellipse(-35*lcos(-this.time),35*lsin(-this.time)-10,8.4)
            layer.fill(225,25,25,this.fade)
            layer.ellipse(50*lcos(this.time),-50*lsin(this.time)-10,4)
            layer.ellipse(-50*lcos(this.time),50*lsin(this.time)-10,4)
            layer.ellipse(35*lcos(-this.time),-35*lsin(-this.time)-10,2.8)
            layer.ellipse(-35*lcos(-this.time),35*lsin(-this.time)-10,2.8)
        }
        if(this.playerData.name=='PlayerPlanetoid'){
            layer.stroke(150,this.fade)
            layer.strokeWeight(2)
            layer.noFill()
            layer.ellipse(0,-10,100)
            layer.noStroke()
            layer.fill(100,this.fade)
            for(let a=0,la=4;a<la;a++){
                regPoly(layer,50*lsin(this.time+a*90),50*lcos(this.time+a*90)-10,6,14,14,this.time*3)
            }
            layer.fill(175,this.fade)
            for(let a=0,la=4;a<la;a++){
                layer.ellipse(50*lsin(this.time+a*90),50*lcos(this.time+a*90)-10,20)
            }
        }
        if(this.playerData.name=='PlayerShovel'){
            layer.stroke(255,175,100,this.fade)
            layer.strokeWeight(4)
            if(lsin(this.direction.main)<0){
                layer.line(-80,-70,-80,50)
            }else{
                layer.line(80,-70,80,50)
            }
            layer.noStroke()
            layer.fill(255,175,100,this.fade*0.1)
            if(lsin(this.direction.main)<0){
                layer.triangle(-80,-70,-80,50,0,-10)
            }else{
                layer.triangle(80,-70,80,50,0,-10)
            }
        }
        if(this.playerData.name=='PlayerGuardception'){
            layer.stroke(255,150,150,this.fade)
            layer.strokeWeight(4)
            if(lsin(this.direction.main)<0){
                layer.line(-80,-70,-80,50)
                layer.line(-60,-55,-60,35)
            }else{
                layer.line(80,-70,80,50)
                layer.line(60,-55,60,35)
            }
            layer.noStroke()
            layer.fill(255,150,150,this.fade*0.1)
            if(lsin(this.direction.main)<0){
                layer.triangle(-80,-70,-80,50,0,-10)
            }else{
                layer.triangle(80,-70,80,50,0,-10)
            }
        }
        if(this.playerData.name=='PlayerBouncyShield'){
            layer.stroke(255,200,200,this.fade)
            layer.strokeWeight(4)
            if(lsin(this.direction.main)<0){
                layer.line(-80,-70,-80,50)
            }else{
                layer.line(80,-70,80,50)
            }
            layer.noStroke()
            layer.fill(255,200,200,this.fade*0.1)
            if(lsin(this.direction.main)<0){
                layer.triangle(-80,-70,-80,50,0,-10)
            }else{
                layer.triangle(80,-70,80,50,0,-10)
            }
        }
        if(this.playerData.name=='PlayerSpiny'){
            layer.stroke(255,150,150,this.fade)
            layer.strokeWeight(4)
            if(lsin(this.direction.main)<0){
                layer.line(-80,-70,-80,50)
                layer.strokeWeight(2)
                for(let a=0,la=12;a<la;a++){
                    layer.line(-80,-70+a*10,-85,-65+a*10)
                    layer.line(-80,-60+a*10,-85,-65+a*10)
                    layer.line(-80,-70+a*10,-75,-65+a*10)
                    layer.line(-80,-60+a*10,-75,-65+a*10)
                }
            }else{
                layer.line(80,-70,80,50)
                layer.strokeWeight(2)
                for(let a=0,la=12;a<la;a++){
                    layer.line(80,-70+a*10,85,-65+a*10)
                    layer.line(80,-60+a*10,85,-65+a*10)
                    layer.line(80,-70+a*10,75,-65+a*10)
                    layer.line(80,-60+a*10,75,-65+a*10)
                }
            }
            layer.noStroke()
            layer.fill(255,150,150,this.fade*0.1)
            if(lsin(this.direction.main)<0){
                layer.triangle(-80,-70,-80,50,0,-10)
            }else{
                layer.triangle(80,-70,80,50,0,-10)
            }
        }
        if(this.firearc[1]>0){
            layer.stroke(255,50,50,this.fade*this.firearc[1]/15)
            layer.strokeWeight(2)
            layer.line(0,-10,lsin(this.firearc[0])*50,-lcos(this.firearc[0])*50-10)
        }
        layer.scale(this.size)
        layer.noStroke()
        if(this.playerData.crit==1||this.critBuff>0){
            layer.fill(150,255,255,this.fade)
            regStar(layer,0,this.skin.body.level,12,45,45,9,9,0)
        }
        if(this.defendBuff>0){
            layer.fill(255,255,150,this.fade)
            regStar(layer,0,this.skin.body.level,12,45,45,9,9,15)
        }
        if(this.speedBuff>0){
            layer.fill(255,200,255,this.fade)
            regStar(layer,0,this.skin.body.level,12,45,45,9,9,15)
        }
        if(this.stunTime>0){
            layer.fill(255,255,150,this.fade)
            regStar(layer,0,this.skin.body.level,9,45,45,9,9,0)
        }
        if(this.vulnerableTime>0){
            layer.fill(255,150,150,this.fade)
            regStar(layer,0,this.skin.body.level,9,45,45,9,9,40/3)
        }
        if(this.confuseTime>0){
            layer.fill(255,100,255,this.fade)
            regStar(layer,0,this.skin.body.level,9,45,45,9,9,80/3)
        }
        if(this.dizzyTime>0){
            layer.fill(255,this.fade)
            for(let a=0,la=3;a<la;a++){
                layer.ellipse(18*lsin(this.time*3+a*120),this.skin.head.level-18+4.5*lcos(this.time*3+a*120),3)
            }
        }
        if(this.gasTime>0){
            layer.fill(80,120,60,this.fade)
            regStar(layer,0,this.skin.body.level,10,45,45,9,9,0)
        }
        if(this.DOT.active>0){
            layer.fill(100,200,120,this.fade)
            regStar(layer,0,this.skin.body.level,10,45,45,9,9,18)
        }
        switch(this.weaponType){
            case 6: case 17: case 45: case 75: case 92: case 93: case 132: case 145: case 181: case 237:
            case 249: case 288: case 293: case 299: case 326: case 368: case 369: case 460: case 465: case 519:
            case 530:
                layer.stroke(255,0,0,this.infoAnim.bar[0]*0.5*this.fade)
                layer.strokeWeight(3)
                layer.line(
                    this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y,
                    -6000+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y
                )
                layer.stroke(255,0,0,this.infoAnim.bar[1]*0.5*this.fade)
                layer.strokeWeight(3)
                layer.line(
                    this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y,
                    6000+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y
                )
            break
            case 191: case 202: case 203: case 204: case 205: case 206: case 209: case 211: case 219: case 220:
            case 226: case 228: case 230: case 247: case 263: case 265: case 266: case 267: case 274: case 284:
            case 285: case 287: case 302: case 303: case 304: case 305: case 320: case 322: case 323: case 324:
            case 354: case 355: case 359: case 389: case 408: case 425: case 427: case 428: case 438: case 439:
            case 456: case 487: case 489: case 509: case 513: case 554: case 557:
                layer.stroke(0,255,0,this.infoAnim.bar[0]*0.5*this.fade)
                layer.strokeWeight(3)
                layer.line(
                    this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y,
                    -900+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y
                )
                layer.stroke(0,255,0,this.infoAnim.bar[1]*0.5*this.fade)
                layer.strokeWeight(3)
                layer.line(
                    this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y,
                    900+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y
                )
            break
            case 12: case 69: case 79:
                layer.stroke(255,0,0,this.infoAnim.bar[0]*0.5*this.fade)
                layer.strokeWeight(3)
                layer.line(
                    this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y-4,
                    -6000+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y-4
                )
                layer.line(
                    this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y+4,
                    -6000+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y+4
                )
                layer.stroke(255,0,0,this.infoAnim.bar[1]*0.5*this.fade)
                layer.strokeWeight(3)
                layer.line(
                    this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y-4,
                    6000+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y-4
                )
                layer.line(
                    this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y+4,
                    6000+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y+4
                )
            break
            case 54:
                layer.stroke(255,0,0,this.infoAnim.bar[0]*0.5*this.fade)
                layer.strokeWeight(3)
                layer.line(
                    this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y,
                    -600+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y
                )
                layer.stroke(255,0,0,this.infoAnim.bar[1]*0.5*this.fade)
                layer.strokeWeight(3)
                layer.line(
                    this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y,
                    600+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y
                )
            break
            case 387:
                if(this.subPlayerAData.name=='PlayerSniper'){
                    layer.stroke(255,0,0,this.infoAnim.bar[0]*0.5*this.fade)
                    layer.strokeWeight(3)
                    layer.line(
                        this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y,
                        -6000+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y
                    )
                    layer.stroke(255,0,0,this.infoAnim.bar[1]*0.5*this.fade)
                    layer.strokeWeight(3)
                    layer.line(
                        this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y,
                        6000+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y
                    )
                }
            break
            case 454:
                layer.push()
                layer.translate(+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y)
                layer.rotate(this.infoAnim.elevate)
                layer.stroke(255,0,0,this.infoAnim.bar[0]*0.5*this.fade)
                layer.strokeWeight(3)
                layer.line(
                    0,0,
                    -6000,0
                )
                layer.rotate(this.infoAnim.elevate*-2)
                layer.stroke(255,0,0,this.infoAnim.bar[1]*0.5*this.fade)
                layer.strokeWeight(3)
                layer.line(
                    0,0,
                    6000,0
                )
                layer.pop()
            break
            case 510:
                layer.stroke(255,0,0,this.infoAnim.bar[0]*0.5*this.fade)
                layer.strokeWeight(3)
                layer.line(
                    this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y,
                    -3000*sqrt(3)+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y+3000
                )
                layer.stroke(255,0,0,this.infoAnim.bar[1]*0.5*this.fade)
                layer.strokeWeight(3)
                layer.line(
                    this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y,
                    3000*sqrt(3)+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y+3000
                )
            break
        }
        /*for(let a=0,la=2;a<la;a++){
            if(this.skin.arms[a].display&&a==lsin(this.direction.main)<0?1:0){
                layer.noStroke()
                layer.fill(120,this.fade*this.skin.arms[a].fade)
                layer.rect(this.skin.arms[a].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*10,this.skin.arms[a].points.final.end.y-1,16,3)
                layer.fill(80,this.fade*this.skin.arms[a].fade)
                layer.rect(this.skin.arms[a].points.final.end.x+constrain(lsin(this.direction.main)*3,-1,1)*4,this.skin.arms[a].points.final.end.y+1,8,1)
            }
        }*/
        for(let a=0,la=2;a<la;a++){
            if(this.skin.arms[a].display&&lcos(this.direction.main+this.skin.arms[a].anim.phi)<=0){
                layer.fill(this.color.skin.arms[0]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.color.skin.arms[1]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.color.skin.arms[2]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.fade*this.skin.arms[a].fade)
                layer.noStroke()
                layer.ellipse(this.skin.arms[a].points.final.end.x,this.skin.arms[a].points.final.end.y,12,12)
            }
        }
        for(let a=0,la=2;a<la;a++){
            if(this.skin.legs[a].display&&lcos(this.direction.main+this.skin.legs[a].anim.theta)<=0){
                layer.fill(this.color.skin.legs[0]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.color.skin.legs[1]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.color.skin.legs[2]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.fade*this.skin.legs[a].fade)
                layer.noStroke()
                layer.ellipse(this.skin.legs[a].points.final.end.x,this.skin.legs[a].points.final.end.y,12,12)
            }
        }
        if(this.skin.body.display){
            layer.fill(this.color.skin.body[0],this.color.skin.body[1],this.color.skin.body[2],this.fade*this.skin.body.fade)
            layer.noStroke()
            layer.ellipse(0,this.skin.body.level,14,24)
            if(this.remote){
                layer.fill(25,225,250,this.fade)
				layer.ellipse(0,this.skin.body.level,5)
            }
        }
        for(let a=0,la=2;a<la;a++){
            if(this.skin.legs[a].display&&lcos(this.direction.main+this.skin.legs[a].anim.theta)>0){
                layer.fill(this.color.skin.legs[0]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.color.skin.legs[1]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.color.skin.legs[2]+lcos(this.skin.legs[a].anim.theta+this.direction.main)*20,this.fade*this.skin.legs[a].fade)
                layer.noStroke()
                layer.ellipse(this.skin.legs[a].points.final.end.x,this.skin.legs[a].points.final.end.y,12,12)
            }
        }
        if(this.face.beak.main.display){
            layer.fill(this.color.beak.main[0],this.color.beak.main[1],this.color.beak.main[2],this.fade*this.face.beak.main.fade)
            layer.noStroke()
            layer.ellipse(lsin(this.direction.main)*13,this.face.beak.main.level,12+2*lcos(this.direction.main),8)
        }
        if(this.face.beak.mouth.display){
            layer.noFill()
            layer.stroke(this.color.beak.mouth[0],this.color.beak.mouth[1],this.color.beak.mouth[2],this.fade*this.face.beak.mouth.fade)
            layer.strokeWeight(0.5)
            layer.arc(lsin(this.direction.main)*13,this.face.beak.mouth.level,12+2*lcos(this.direction.main),1,0,180)
        }
        if(this.face.beak.nostril.display){
            layer.noFill()
            layer.stroke(this.color.beak.nostril[0],this.color.beak.nostril[1],this.color.beak.nostril[2],this.fade*this.face.beak.nostril.fade)
            layer.strokeWeight(0.5)
            for(let a=0,la=2;a<la;a++){
                layer.line(lsin(this.direction.main-6+a*12)*16,this.face.beak.nostril.level,lsin(this.direction.main-6+a*12)*16,this.face.beak.nostril.level+0.5)
            }
        }
        if(this.skin.head.display){
            if(game.brutal&&this.variant==11){
                layer.fill(50,225,225,this.fade*this.skin.head.fade)
            }else if(game.brutal&&this.variant==12){
                layer.fill(80,this.fade*this.skin.head.fade)
            }else if(game.brutal&&this.variant==13){
                layer.fill(225,50,50,this.fade*this.skin.head.fade)
            }else if(game.brutal&&this.variant==14){
                layer.fill(225,this.fade*this.skin.head.fade)
            }else if(game.brutal&&this.variant==15){
                layer.fill(50,225,50,this.fade*this.skin.head.fade)
            }else{
                layer.fill(this.color.skin.head[0],this.color.skin.head[1],this.color.skin.head[2],this.fade*this.skin.head.fade)
            }
            layer.noStroke()
            layer.ellipse(0,this.skin.head.level,27,27)
        }
        for(let a=0,la=2;a<la;a++){
            if(this.skin.arms[a].display&&lcos(this.direction.main+this.skin.arms[a].anim.phi)>0){
                layer.fill(this.color.skin.arms[0]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.color.skin.arms[1]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.color.skin.arms[2]+lcos(this.skin.arms[a].anim.phi+this.direction.main)*20,this.fade*this.skin.arms[a].fade)
                layer.noStroke()
                layer.ellipse(this.skin.arms[a].points.final.end.x,this.skin.arms[a].points.final.end.y,12,12)
            }
            if(this.face.eye[a].display){
                if(this.control==0){
                    layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.face.eye[a].fade)
                }else{
                    layer.stroke(255,0,0,this.fade*this.face.eye[a].fade)
                }
                layer.strokeWeight((2.5-this.face.eye[a].anim*1.5)*constrain(lcos(this.face.eye[a].spin+this.direction.main)*5,0,1))
                if(this.face.eye[a].anim==0){
                    layer.point(lsin(this.face.eye[a].spin+this.direction.main)*13-(a*2-1)*lcos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.face.eye[a].level)
                    layer.point(lsin(this.face.eye[a].spin+this.direction.main)*13-(a*2-1)*lcos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.face.eye[a].level)
                }else{
                    layer.line(lsin(this.face.eye[a].spin+this.direction.main)*13-(a*2-1)*lcos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.face.eye[a].level,lsin(this.face.eye[a].spin+this.direction.main)*13+(a*2-1)*lcos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.parts.eyeLevel-this.face.eye[a].anim*2)
                    layer.line(lsin(this.face.eye[a].spin+this.direction.main)*13-(a*2-1)*lcos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.face.eye[a].level,lsin(this.face.eye[a].spin+this.direction.main)*13+(a*2-1)*lcos(this.face.eye[a].spin+this.direction.main)*this.face.eye[a].anim*2,this.parts.eyeLevel+this.face.eye[a].anim*2)
                }
            }
        }
        if(this.face.beak.main.display&&lcos(this.direction.main)>0){
            layer.fill(this.color.beak.main[0],this.color.beak.main[1],this.color.beak.main[2],this.fade*this.face.beak.main.fade)
            layer.noStroke()
            layer.ellipse(lsin(this.direction.main)*13,this.face.beak.main.level,12+2*lcos(this.direction.main),8)
        }
        if(this.face.beak.mouth.display&&lcos(this.direction.main)>0){
            layer.noFill()
            layer.stroke(this.color.beak.mouth[0],this.color.beak.mouth[1],this.color.beak.mouth[2],this.fade*this.face.beak.mouth.fade)
            layer.strokeWeight(0.5)
            layer.arc(lsin(this.direction.main)*13,this.face.beak.mouth.level,12+2*lcos(this.direction.main),1,0,180)
        }
        if(this.face.beak.nostril.display&&lcos(this.direction.main)>0){
            layer.noFill()
            layer.stroke(this.color.beak.nostril[0],this.color.beak.nostril[1],this.color.beak.nostril[2],this.fade*this.face.beak.nostril.fade)
            layer.strokeWeight(0.5)
            for(let a=0,la=2;a<la;a++){
                layer.line(lsin(this.direction.main-6+a*12)*16,this.face.beak.nostril.level,lsin(this.direction.main-6+a*12)*16,this.face.beak.nostril.level+0.5)
            }
        }
        layer.pop()
    }
    displayOver(layer){
        layer.push()
        layer.translate(this.position.x,this.position.y)
        if(this.inspect.length>0){
            layer.noStroke()
            for(let a=0,la=entities.players.length;a<la;a++){
                if(this.inspect.includes(entities.players[a].index)&&entities.players[a].index!=this.index){
                    let dir=atan2(entities.players[a].position.x-this.position.x,entities.players[a].position.y-this.position.y)
                    let extent=dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)/10+100
                    layer.fill(...entities.players[a].color.skin.body)
                    regTriangle(layer,sin(dir)*extent,cos(dir)*extent,6,6,dir)
                    layer.fill(255)
                    layer.textSize(10)
                    layer.text(entities.players[a].id>0?entities.players[a].weaponData.name:entities.players[a].playerData.name,sin(dir)*extent,cos(dir)*extent+16)
                    layer.fill(150)
                    layer.rect(sin(dir)*extent,cos(dir)*extent+30,30,4,2)
                    layer.fill(240,0,0)
                    layer.rect((max(0,entities.players[a].collect.life)/entities.players[a].base.life)*15-15+sin(dir)*extent,cos(dir)*extent+30,(max(0,entities.players[a].collect.life)/entities.players[a].base.life)*30,1+min((max(0,entities.players[a].collect.life)/entities.players[a].base.life)*60,3),2)
                    layer.fill(min(255,510-max(0,entities.players[a].life)/entities.players[a].base.life*510)-max(0,5-max(0,entities.players[a].life)/entities.players[a].base.life*30)*25,max(0,entities.players[a].life)/entities.players[a].base.life*510,0)
                    layer.rect((max(0,entities.players[a].life)/entities.players[a].base.life)*15-15+sin(dir)*extent,cos(dir)*extent+30,(max(0,entities.players[a].life)/entities.players[a].base.life)*30,2+min((max(0,entities.players[a].life)/entities.players[a].base.life)*60,3),2)
                }
            }
        }
        if(this.playerData.name=='PlayerMinesweeper'||this.playerData.name=='PlayerDegausser'||this.playerData.name=='PlayerRangefinder'||this.playerData.name=='PlayerAnapsid'||this.playerData.name=='PlayerRadio'||this.playerData.name=='PlayerMinesweeperception'||this.playerData.name=='PlayerRanger'||this.playerData.name=='PlayerRescue'||this.playerData.name=='SidekickMinesweeper'){
            layer.strokeWeight(8*this.size)
            layer.noFill()
            for(let a=0,la=this.scan.length;a<la;a++){
                if(this.scan[a]>0){
                    layer.stroke(40,240,40,this.fade*this.scan[a]/30)
                    layer.arc(0,0,100*this.size,100*this.size,(a-0.5)/la*360+10-90,(a+0.5)/la*360-10-90)
                }
            }
        }
        layer.pop()
    }
    jumper(){
        return this.playerData.name=='PistolJump'||this.playerData.name=='FastPunchJump'||this.playerData.name=='BigRocketLauncherJump'||this.playerData.name=='BigCritPistolJump'||this.playerData.name=='ShotgunJump'||this.playerData.name=='LongPunchJump'||this.playerData.name=='ParaPistol'||this.playerData.name=='ParaRocketLauncher'||this.playerData.name=='BigFastPunchJump'||this.playerData.name=='PistolHealSelfJump'||this.playerData.name=='PistolJumpDamaged'||this.playerData.name=='BigPistolJump'||this.playerData.name=='PlayerParaRocketLauncher'||this.playerData.name=='PlayerParaGrenadier'||this.playerData.name=='PlayerStratofortress'||this.playerData.name=='PlayerParachutist'||this.playerData.name=='PlayerDropship'||this.playerData.name=='PlayerApache'||this.playerData.name=='TankJump'||this.playerData.name=='ParaMedic'||this.playerData.name=='BigParaRocketLauncher'||this.playerData.name=='BigCritParaRocketLauncher'||this.playerData.name=='BallerJump'||this.playerData.name=='BigShotgunJump'||this.playerData.name=='PlayerAirdrop'||this.playerData.name=='SidekickGuardian'||this.playerData.name=='PlayerRadio'||this.playerData.name=='PlayerWhirlybird'||this.playerData.name=='PlayerRain'||this.playerData.name=='PlayerRTX'||this.playerData.name=='PlayerAircraft'
    }
    setColor(){
        if(this.playerData.name=='BigMachineGunDamaged'||this.playerData.name=='BigCritRocketLauncherDamaged'){
            this.takeDamage(150)
        }
        if(this.playerData.name=='MachineGunDamaged'||this.playerData.name=='SniperDamaged'||this.playerData.name=='PistolJumpDamaged'){
            this.takeDamage(50)
        }
        if(this.playerData.name=='HeavyShotgunDamaged'){
            this.takeDamage(100)
        }
        if(this.playerData.name=='TankDamaged'){
            this.takeDamage(450)
        }
        switch(this.id){
            case 0:
                if(this.playerData.name=='Buster'){
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[80,160,200],body:[70,150,190],legs:[60,140,180],arms:[65,145,185]}}
                }else if(
                    this.playerData.name=='Tank'||this.playerData.name=='BallingTank'||this.playerData.name=='PistolingTank'||this.playerData.name=='EngineeringTank'||this.playerData.name=='TankSpawner'||
                    this.playerData.name=='FlamethrowingTank'||this.playerData.name=='HyperTank'||this.playerData.name=='RocketLaunchingTank'||this.playerData.name=='AutoTank'||this.playerData.name=='TankDefendBuff'||
                    this.playerData.name=='TankJump'||this.playerData.name=='TankBump'||this.playerData.name=='TankShield'||this.playerData.name=='TankSpeedBuff'||this.playerData.name=='SlicingTank'
                ){
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[160,165,170],body:[150,155,160],legs:[140,145,150],arms:[145,150,155]}}
                }else if(this.playerData.name=='MegaTank'){
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[220,225,230],body:[210,215,220],legs:[200,205,210],arms:[185,190,195]}}
                }else if(this.playerData.name=='HeavyTank'){
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[200,205,210],body:[190,195,200],legs:[180,185,190],arms:[185,190,195]}}
                }else if(this.playerData.name=='LightTank'){
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[130,135,140],body:[120,125,130],legs:[110,115,120],arms:[115,120,125]}}
                }else if(this.playerData.name=='PaperTank'){
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,255,230],body:[255,255,210],legs:[255,255,190],arms:[255,255,200]}}
                }else if(this.playerData.name=='HeftyTank'){
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[50,125,50],body:[40,115,40],legs:[30,105,30],arms:[35,110,35]}}
                }else if(this.playerData.name=='DeadlyTank'){
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[100,250,100],body:[90,240,90],legs:[80,230,80],arms:[85,235,85]}}
                }else if(this.playerData.name=='Spy'||this.playerData.name=='SpyHealSelf'||this.playerData.name=='RapidSpy'||this.playerData.name=='SpyTank'||this.playerData.name=='CritSpy'||this.playerData.name=='RevolverSpy'||this.playerData.name=='SpyHeal'){
                    this.color=[
                        {eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[25,85,255],body:[15,75,255],legs:[0,60,255],arms:[5,65,255]}},
                        {eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[235,25,255],body:[225,15,255],legs:[210,0,255],arms:[215,5,255]}},
                        {eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[55,235,25],body:[55,225,15],legs:[55,210,0],arms:[55,215,5]}},
                        {eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[235,105,25],body:[225,105,15],legs:[210,105,0],arms:[215,105,5]}},
                        {eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[25,245,255],body:[15,235,255],legs:[0,220,255],arms:[5,225,255]}},
                        {eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[135,25,255],body:[125,15,255],legs:[110,0,255],arms:[215,5,255]}}
                    ][this.copy]
                }else if(game.level==6&&this.playerData.sizeBuff>1.25){
                    this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,35,25],body:[255,25,15],legs:[255,10,0],arms:[255,15,5]}}
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
            case 5:
                this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[25,245,255],body:[15,235,255],legs:[0,220,255],arms:[5,225,255]}}
            break
            case 6:
                this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[135,25,255],body:[125,15,255],legs:[110,0,255],arms:[215,5,255]}}
            break
            default:
                let a=[floor(random(50,255)),floor(random(50,255)),floor(random(50,255))]
                this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[a[0],a[1],a[2]],body:[a[0]-10,a[1]-10,a[2]-10],legs:[a[0]-25,a[1]-25,a[2]-25],arms:[a[0]-20,a[1]-20,a[2]-20]}}
            break
        }
        if(this.construct){
            this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[160,165,170],body:[150,155,160],legs:[140,145,150],arms:[145,150,155]}}
        }
        this.base.color={eye:{back:this.color.eye.back},beak:{main:this.color.beak.main,mouth:this.color.beak.mouth,nostril:this.color.beak.nostril},skin:{head:this.color.skin.head,body:this.color.skin.body,legs:this.color.skin.legs,arms:this.color.skin.arms}}
    }
    newWeapon(){
        if(game.randomizer){
            this.type=floor(random(listing[1][listing[1].length-1]+1,types.player.length))
        }else if(game.classicWeapon||this.id>game.gaming){
            let clump=listing[game.peakWeapon?1:floor(random(1.5))]
            this.type=clump[floor(random(0,clump.length))]
        }else if(this.id<=game.weapon.length){
            game.weaponTick[this.id-1]++
            this.type=game.weapon[game.mainline?game.players:this.id-1][game.weaponTick[this.id-1]%game.weapon[game.mainline?game.players:this.id-1].length]
        }
        this.playerData=types.player[this.type]
        this.weaponType=this.playerData.weapon
        this.weaponData=types.weapon[this.weaponType]
        this.weapon={ammo:this.weaponData.ammo,cooldown:0,reload:0,uses:(this.weaponData.uses==1?this.weaponData.uses:this.weaponData.uses*this.ammoMult)}
        if(game.level==16){
            this.weapon.uses=floor(random(ceil(this.weaponData.uses*this.ammoMult/2),this.weaponData.uses*this.ammoMult))
            this.weapon.ammo=min(this.weapon.ammo,this.weapon.uses)
        }
        this.weapon.cooldown=30
        if(game.randomizer){
            this.width=8*this.playerData.sizeBuff
            this.height=24*this.playerData.sizeBuff
            this.fade=0
            this.size=0.5*this.playerData.sizeBuff
            this.base.life=100*this.playerData.lifeBuff
            this.life=this.base.life
            this.collect.life=this.life
            this.record.life=this.base.life
            this.offset={position:{x:0,y:12*this.playerData.sizeBuff}}
            if(this.id>0){
                this.multLife(2)
            }
            this.setColor()
        }
        this.initialWeapon()
    }
    critCheck(){
        if(this.id<=0||game.pvp){
            return 0
        }
        let chance=1
        for(let a=0,la=game.gaming;a<la;a++){
            if(entities.players[a].life<=0){
                chance+=2
            }
        }
        return (this.id>0&&floor(random(0,100))<chance?1:0)
    }
    initialWeapon(){
        switch(this.playerData.name){
            case 'PlayerConglomeration':
                this.newSubWeaponA()
                this.newSubWeaponB()
            break
            case 'PlayerSpy':
                this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[255,225,15],legs:[255,210,0],arms:[255,215,5]}}
            break
            case 'PlayerSwitcheroo':
                this.newSubWeaponASet(findName('PlayerPistol',types.player))
            break
        }
        if(this.playerData.name!='PlayerSpy'){
            this.setColor()
        }
        let crit=constrain(this.playerData.crit+(this.critBuff>0?1:0)+this.critCheck(),0,1)
        let spawn=[this.position.x+this.offset.position.x+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x*this.size+constrain(lsin(this.direction.main)*3,-1,1)*10*this.size,this.position.y+this.offset.position.y+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y*this.size]
		switch(this.weaponType){
            case 222:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],134,(lsin(this.direction.main)<0?-90:90)+180,this.id,this.weaponData.damage*this.playerData.damageBuff*10,5400,crit,this.index))
            break
            case 225:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],138,(lsin(this.direction.main)<0?-90:90)+180,this.id,this.weaponData.damage*this.playerData.damageBuff*2,5400,crit,this.index))
            break
            case 227:
                for(let a=0,la=2;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickGun',types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.4,-0.4][a]
                }
            break
            case 254:
                for(let a=0,la=2;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickDoubleAuto',types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.4,-0.4][a]
                }
            break
            case 256:
                for(let a=0,la=2;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickTrapper',types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.4,-0.4][a]
                }
            break
            case 257:
                for(let a=0,la=2;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickShotgun',types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.4,-0.4][a]
                }
            break
            case 259:
                for(let a=0,la=2;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickHelix',types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.4,-0.4][a]
                }
            break
            case 260:
                for(let a=0,la=10;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickLight',types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=0.9-a*0.2
                }
            break
            case 274:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],162,(lsin(this.direction.main)<0?-90:90)+180,this.id,this.weaponData.damage*this.playerData.damageBuff*10,5400,crit,this.index))
            break
            case 275:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],163,(lsin(this.direction.main)<0?-90:90)+180,this.id,this.weaponData.damage*this.playerData.damageBuff*10,5400,crit,this.index))
                if(this.id>0&&this.id<=game.gaming){
                    this.disable=true
                }
            break
            case 276:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],164,(lsin(this.direction.main)<0?-90:90)+180,this.id,this.weaponData.damage*this.playerData.damageBuff*10,5400,crit,this.index))
            break
            case 277:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],165,(lsin(this.direction.main)<0?-90:90)+180,this.id,this.weaponData.damage*this.playerData.damageBuff*10,5400,crit,this.index))
            break
            case 288:
                for(let a=0,la=2;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickSniper',types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.4,-0.4][a]
                }
            break
            case 298:
                for(let a=0,la=4;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName(['SidekickShootist','SidekickMachineSniper','SidekickSharpSniper','SidekickDriller'][a],types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.5,0.25,-0.25,-0.5][a]
                }
            break
            case 300:
                for(let a=0,la=2;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickMachineGun',types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.4,-0.4][a]
                }
            break
            case 331:
                for(let a=0,la=4;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName(['SidekickStreamlinedRifle','SidekickGroundwire','SidekickAssaultRiflePierce','SidekickAssaultRifleSplasher'][a],types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.5,0.25,-0.25,-0.5][a]
                }
            break
            case 382:
                for(let a=0,la=2;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickStealth',types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.4,-0.4][a]
                }
            break
            case 399:
                for(let a=0,la=2;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickBonkerGuard',types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[1.6,-1.6][a]
                }
            break
            case 420:
                for(let a=0,la=2;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickGrenadier',types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.4,-0.4][a]
                }
            break
            case 434:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],233,(lsin(this.direction.main)<0?-90:90)+180,this.id,this.weaponData.damage*this.playerData.damageBuff*10,5400,crit,this.index))
            break
            case 471:
                for(let a=0,la=2;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickGun',types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.4,-0.4][a]
                    entities.players[entities.players.length-1].newWeaponSet(findName('SidekickSubSidekick',types.player))
                }
            break
            case 473:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],252,(lsin(this.direction.main)<0?-90:90)+180,this.id,this.weaponData.damage*this.playerData.damageBuff*10,5400,crit,this.index))
            break
            case 485:
                for(let a=0,la=2;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickLight',types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.2,-0.2][a]+this.lastingForce[0]
                }
            break
            case 486:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],259,(lsin(this.direction.main)<0?-90:90)+180,this.id,this.weaponData.damage*this.playerData.damageBuff*10,5400,crit,this.index))
            break
            case 497:
                for(let a=0,la=2;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickPelleter',types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.4,-0.4][a]
                }
            break
            case 502:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],268,(lsin(this.direction.main)<0?-90:90)+180,this.id,this.weaponData.damage*this.playerData.damageBuff*10,5400,crit,this.index))
            break
            case 532:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],283,(lsin(this.direction.main)<0?-90:90)+180,this.id,this.weaponData.damage*this.playerData.damageBuff*10,5400,crit,this.index))
            break
            case 547:
                for(let a=0,la=4;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName(['SidekickTicker','SidekickDial','SidekickHourglass','SidekickSickle'][a],types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.5,0.25,-0.25,-0.5][a]
                }
            break
            case 548:
                for(let a=0,la=4;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName(['SidekickFreezeBeam','SidekickMaximizer','SidekickPetawatt','SidekickShrinkray'][a],types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.5,0.25,-0.25,-0.5][a]
                }
            break
            case 563:
                for(let a=0,la=2;a<la;a++){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickMinesweeper',types.player),this.index))
                    entities.players[entities.players.length-1].sidekick=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                    entities.players[entities.players.length-1].lastingForce[0]+=[0.4,-0.4][a]
                }
            break
        }
    }
    newSubWeaponA(){
        let clump=listing[2]
        this.subPlayerAType=clump[floor(random(0,clump.length))]
        this.subPlayerAData=types.player[this.subPlayerAType]
        this.subWeaponAType=this.subPlayerAData.weapon
        this.subWeaponAData=types.weapon[this.subWeaponAType]
        this.subWeaponA={ammo:this.subWeaponAData.ammo,cooldown:0,reload:0,uses:(this.subWeaponAData.uses==1?this.subWeaponAData.uses:this.subWeaponAData.uses*this.ammoMult),reloading:false}
        this.subWeaponA.cooldown=0
    }
    newSubWeaponB(){
        let clump=listing[2]
        this.subPlayerBType=clump[floor(random(0,clump.length))]
        this.subPlayerBData=types.player[this.subPlayerBType]
        this.subWeaponBType=this.subPlayerBData.weapon
        this.subWeaponBData=types.weapon[this.subWeaponBType]
        this.subWeaponB={ammo:this.subWeaponBData.ammo,cooldown:0,reload:0,uses:(this.subWeaponBData.uses==1?this.subWeaponBData.uses:this.subWeaponBData.uses*this.ammoMult),reloading:false}
        this.subWeaponB.cooldown=0
    }
    newWeaponSet(type){
        this.type=type
        this.playerData=types.player[this.type]
        this.weaponType=this.playerData.weapon
        this.weaponData=types.weapon[this.weaponType]
        this.weapon={ammo:this.weaponData.ammo,cooldown:0,reload:0,uses:(this.weaponData.uses==1?this.weaponData.uses:this.weaponData.uses*this.ammoMult)}
        this.weapon.cooldown=60
        if(game.randomizer){
            this.width=8*this.playerData.sizeBuff
            this.height=24*this.playerData.sizeBuff
            this.fade=0
            this.size=0.5*this.playerData.sizeBuff
            this.base.life=100*this.playerData.lifeBuff
            this.life=this.base.life
            this.collect.life=this.life
            this.record.life=this.base.life
            this.offset={position:{x:0,y:12*this.playerData.sizeBuff}}
            if(this.id>0){
                this.multLife(2)
            }
            this.setColor()
        }
        this.initialWeapon()
    }
    newSubWeaponASet(type){
        this.subPlayerAType=type
        this.subPlayerAData=types.player[this.subPlayerAType]
        this.subWeaponAType=this.subPlayerAData.weapon
        this.subWeaponAData=types.weapon[this.subWeaponAType]
        this.subWeaponA={ammo:this.subWeaponAData.ammo,cooldown:0,reload:0,uses:(this.subWeaponAData.uses==1?this.subWeaponAData.uses:this.subWeaponAData.uses*this.ammoMult),reloading:false}
        this.subWeaponA.cooldown=0
    }
    newWeaponSelect(type){
        for(let a=0,la=types.player.length;a<la;a++){
            if(types.player[a].weapon==type){
                this.newWeaponSet(a)
                break
            }
        }
    }
    respawn(){
        this.die.killer='none'
        this.stats.bust*=0.25
        this.jump={time:0,double:0,triple:0,quadruple:0,active:0}
        this.manage[1]=0
        this.base.life=100*this.playerData.lifeBuff
        this.life=this.base.life
        this.collect.life=this.life
        this.record.life=this.base.life
        this.dead=false
        this.die.timer=0
        if(game.randomSpawn){
            this.position.x=random(0,game.edge[0])
            this.position.y=random(0,game.edge[1]/2)
        }else{
            this.position.x=this.base.position.x
            this.position.y=this.base.position.y
        }
        this.previous.position.x=this.position.x
        this.previous.position.y=this.position.y
        this.newWeapon()
        this.velocity.x=0
        this.velocity.y=0
        this.weapon.ammo=this.weaponData.ammo
        this.weapon.cooldown=0
        this.invincible=60
        this.base.control=0
        this.critBuff=0
        this.defendBuff=0
        this.speedBuff=0
        this.stunTime=0
        this.stuckTime=0
        this.vulnerableTime=0
        this.confuseTime=0
        this.bounceTime=0
        this.dizzyTime=0
        this.chillTime=0
        this.shrinkTime=0
        this.gasTime=0
        this.width=8*this.playerData.sizeBuff
        this.height=24*this.playerData.sizeBuff
        this.size=0.5*this.playerData.sizeBuff
        this.offset={position:{x:0,y:12*this.playerData.sizeBuff}}
        if((game.level==8||game.level==17)&&this.base.position.y<game.tileset[1]*5){
            this.position.x=game.edge[0]/2
            this.position.y=1000
            this.parachute=true
        }
    }
    takeDamage(damage){
        if(this.invincible<=0&&!(
            (this.weaponType==14||this.weaponType==66||this.playerData.name=='BigHyperPistol'||this.playerData.name=='HyperTank')&&this.active>0&&!(this.playerData.name=='BigMultiHyperMedic'&&this.active<660)||
            (this.playerData.name=='HyperPistol'||this.playerData.name=='CritHyperPistol'||this.playerData.name=='HyperCaffeinePistol'||this.playerData.name=='HyperShotgun'||game.brutal&&this.variant==14)&&this.active>0
        )){
            let preLife=this.life
            this.life-=damage*(this.vulnerableTime>0?3:1)*(this.defendBuff>0?0.5:1)*(
                this.playerData.name=='PlayerDisappointment'||this.playerData.name=='SidekickDisappointmentGuard'?0.25:
                this.playerData.name=='PlayerBonkerception'?0.4:
                this.playerData.name=='PlayerMedicArmored'||this.playerData.name=='PlayerDoublePushPunchArmored'||this.playerData.name=='PlayerRecoiler'||this.playerData.name=='PlayerBonker'||this.playerData.name=='PlayerIceberg'||
                this.playerData.name=='PlayerSurprise'||this.playerData.name=='PlayerBorder'||this.playerData.name=='SidekickBonker'||this.playerData.name=='PlayerThrasher'||this.playerData.name=='PlayerCobalt'||
                this.playerData.name=='PlayerAuger'||this.playerData.name=='PlayerToxin'||this.playerData.name=='PlayerAnapsid'||this.playerData.name=='PlayerWhirlybird'||this.playerData.name=='SidekickBonkerGuard'||
                this.playerData.name=='PlayerPlanetoid'||this.playerData.name=='PlayerGear'||this.playerData.name=='PlayerGuillotine'||this.playerData.name=='PlayerWatcher'
                ?0.5:1)
            if(this.playerData.name=='PlayerGlassCannon'&&this.weapon.cooldown<this.weaponData.cooldown){
                this.weapon.cooldown=300
                let crit=constrain(this.playerData.crit+(this.critBuff>0?1:0),0,1)
                let spawn=[this.position.x+this.offset.position.x+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x*this.size+constrain(lsin(this.direction.main)*3,-1,1)*10*this.size,this.position.y+this.offset.position.y+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y*this.size]
                for(let a=0,la=20;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,a*18,this.id,this.weaponData.damage*this.playerData.damageBuff*2,300,crit,this.index))
                }
            }else if(this.playerData.name=='PlayerPrism'&&this.weapon.cooldown<this.weaponData.cooldown){
                this.weapon.cooldown=300
                let crit=constrain(this.playerData.crit+(this.critBuff>0?1:0),0,1)
                let spawn=[this.position.x+this.offset.position.x+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x*this.size+constrain(lsin(this.direction.main)*3,-1,1)*10*this.size,this.position.y+this.offset.position.y+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y*this.size]
                for(let a=0,la=12;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],119,360*a/la,this.id,this.weaponData.damage*this.playerData.damageBuff*1.5,300,crit,this.index))
                }
            }
            if(preLife>=this.base.life&&this.life<=0&&this.id>0&&!game.nuke){
                this.life=1
            }
            if(this.gasTime>0&&this.assort.gas==0){
                this.assort.gas=4
				for(let b=0,lb=12;b<lb;b++){
					entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,6,random(0,360),-1,40,10,false,this.gasser))
                    let c=entities.projectiles[entities.projectiles.length-1]
                    c.position.x+=c.speed*lsin(c.direction)*5*this.size
				    c.position.y-=c.speed*lcos(c.direction)*5*this.size
				}
            }
        }
    }
	attack(variant){
        let weapon=[this.weapon,this.subWeaponA,this.subWeaponB][variant]
        let weaponType=[this.weaponType,this.subWeaponAType,this.subWeaponBType][variant]
        let weaponData=[this.weaponData,this.subWeaponAData,this.subWeaponBData][variant]
        let damageBuff=[this.playerData.damageBuff,this.subPlayerAData.damageBuff,this.subPlayerBData.damageBuff][variant]
        this.visible=15
		weapon.cooldown=weaponData.cooldown
        weapon.reload=weaponData.stop
        weapon.ammo--
        weapon.uses--
		if((weaponType==4||weaponType==149||weaponType==156||weaponType==157||weaponType==168||weaponType==297||weaponType==407||weaponType==496)&&weapon.ammo%3!=0||(weaponType==483||weaponType==511)&&weapon.ammo%2!=0){
			weapon.cooldown*=(weaponType==297||weaponType==407?0.2:0.1)
		}
        if(weaponType==161){
            weapon.cooldown*=(0.2+0.8*this.weapon.ammo/this.weaponData.ammo)
        }
        let crit=constrain(this.playerData.crit+(this.critBuff>0?1:0)+(this.id>0&&floor(random(0,100))==0&&this.weaponType!=334&&this.weaponType!=335&&this.weaponType!=360&&this.weaponType!=394&&this.weaponType!=478&&this.weaponType!=479&&this.weaponType!=480&&this.weaponType!=481&&this.weaponType!=557
            ?1:0),0,1)
        let spawn=[this.position.x+this.offset.position.x+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x*this.size+constrain(lsin(this.direction.main)*3,-1,1)*10*this.size,this.position.y+this.offset.position.y+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y*this.size]
        let bypass=false
		switch(weaponType){
			case 0: case 177: case 257:
				for(let a=0,la=10;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-20,20),this.id,weaponData.damage*damageBuff,15,crit,this.index))
				}
			break
			case 1: case 2: case 4: case 131: case 142: case 149: case 161: case 176: case 178: case 179:
            case 187: case 189: case 190: case 195: case 211: case 222: case 225: case 227: case 233: case 240:
            case 241: case 272: case 274: case 275: case 276: case 277: case 300: case 315: case 352: case 353:
            case 382: case 390: case 399: case 402: case 429: case 434: case 459: case 469: case 470: case 471:
            case 473: case 485: case 528: case 529: case 531: case 532: case 542: case 545: case 546: case 549:
            case 553: case 558: case 563:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 3: case 180:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 5:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],3,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 6: case 92: case 93: case 181: case 237: case 288: case 368: case 519:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 7: case 123: case 182:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],5,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 8: case 183:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],6,(lsin(this.direction.main)<0?-90:90)+random(-15,15),this.id,weaponData.damage*damageBuff,10,crit,this.index))
            break
            case 9:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],7,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,max(0.5,abs(this.velocity.x)),crit,this.index))
            break
            case 10: case 184:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],8,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,360,crit,this.index))
            break
            case 11: case 62: case 127: case 129: case 185: case 356:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],9,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 12:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1)-5,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1)+5,this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 13:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],10,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 14: case 66:
                if(this.active>0&&!(this.active<660&&this.playerData.name=='BigMultiHyperMedic')||this.id>0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],11,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                }else{
                    weapon.ammo++
                }
            break
            case 15: case 163:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],12,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 16:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],13,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 17:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],14,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 18:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,(lsin(this.direction.main)<0?-90:90)+random(-5,5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 19:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],15,(lsin(this.direction.main)<0?-90:90)+random(-15,15),this.id,weaponData.damage*damageBuff,15,crit,this.index))
            break
			case 20:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],16,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 21:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],17,(lsin(this.direction.main)<0?-90:90)+random(-30,30),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 22:
				for(let a=0,la=15;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-15,15),this.id,weaponData.damage*damageBuff,15,crit,this.index))
				}
			break
            case 23:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],18,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 24:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],19,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 25: case 46:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],20,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 26:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],21,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 27:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],22,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 28:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],23,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,max(0.5,abs(this.velocity.x)),crit,this.index))
            break
            case 29: case 48:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],24,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 30:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],25,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,max(0.5,abs(this.velocity.x)),crit,this.index))
            break
			case 31:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],26,(lsin(this.direction.main)<0?-90:90)+random(-7.5,7.5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 32:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],27,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 33:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],28,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 34:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-5,5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 35:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],29,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,360,crit,this.index))
            break
            case 36: case 188: case 420:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],30,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
			case 37:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],31,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 38:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],32,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 39:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],33,(lsin(this.direction.main)<0?-90:90)+random(-15,15),this.id,weaponData.damage*damageBuff,10,crit,this.index))
            break
            case 40:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],34,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 41:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],35,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 42:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],36,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 43:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],37,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,max(0.5,abs(this.velocity.x)),crit,this.index))
            break
            case 44: case 76:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],38,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 45:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],39,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 47:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],40,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,max(0.5,abs(this.velocity.x)),crit,this.index))
            break
			case 49:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],41,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 50:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],5,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],5,(lsin(this.direction.main)<0?90:-90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
			case 51:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],16,(lsin(this.direction.main)<0?-90:90)+random(-5,5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 52:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],42,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,360,crit,this.index))
            break
            case 53:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],43,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 54:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,5,crit,this.index))
			break
            case 55:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],5,(lsin(this.direction.main)<0?-90:90)+random(-15,15),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 56:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,10,crit,this.index))
			break
            case 57: case 68:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],44,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 58:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],45,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 59:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],46,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,max(0.5,abs(this.velocity.x)),crit,this.index))
            break
			case 60:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],47,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 61:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],48,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 62:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,10,crit,this.index))
			break
            case 63:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],20,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,10,crit,this.index))
			break
            case 64:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],49,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 65:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],52,(lsin(this.direction.main)<0?-90:90)+random(-7.5,7.5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 67:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],53,(lsin(this.direction.main)<0?-90:90)+random(-7.5,7.5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 69:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],50,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],50,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1)-5,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],50,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1)+5,this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 70:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],54,(lsin(this.direction.main)<0?-90:90)+random(-7.5,7.5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 71:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],51,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
			case 72:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],55,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 73:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],55,(lsin(this.direction.main)<0?-90:90)-10,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],55,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],55,(lsin(this.direction.main)<0?-90:90)+10,this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 74:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],56,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 75:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],57,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 77:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],58,(lsin(this.direction.main)<0?-90:90)+random(-7.5,7.5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 78:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],59,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 79:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],39,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],39,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1)-5,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],39,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1)+5,this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 80:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],60,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 81:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],61,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 82:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],62,(lsin(this.direction.main)<0?-90:90)+random(-7.5,7.5),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 83:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],63,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 84:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                this.takeDamage(1)
			break
            case 85:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-12.5,12.5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-12.5,12.5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 86:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],64,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 87:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],26,(lsin(this.direction.main)<0?-90:90)+random(-22.5,22.5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 88:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],66,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 89:
				for(let a=0,la=10;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(lsin(this.direction.main)<0?-90:90)+random(-20,20),this.id,weaponData.damage*damageBuff,15,crit,this.index))
				}
			break
			case 90:
				for(let a=0,la=10;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],5,(lsin(this.direction.main)<0?-90:90)+random(-20,20),this.id,weaponData.damage*damageBuff,180,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].velocity.x*=random(0.75,1.5)
                    entities.projectiles[entities.projectiles.length-1].velocity.y*=random(0.75,1.5)
				}
			break
            case 91:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],67,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 94:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],68,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,720,crit,this.index))
			break
            case 95:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],69,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,360,crit,this.index))
            break
            case 96:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],70,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,360,crit,this.index))
            break
            case 97:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],6,(lsin(this.direction.main)<0?-90:90)+random(-15,15),this.id,weaponData.damage*damageBuff,10,crit,this.index))
                if(weapon.ammo%2==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],71,(lsin(this.direction.main)<0?-90:90)+random(-15,15),this.id,weaponData.damage*damageBuff,15,crit,this.index))
                }
            break
            case 98:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],6,(lsin(this.direction.main)<0?-90:90)+random(-15,15),this.id,weaponData.damage*damageBuff,10,crit,this.index))
                if(weapon.ammo%2==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff*2,300,crit,this.index))
                }
            break
            case 99:
                for(let a=0,la=entities.players.length;a<la;a++){
                    if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)<450){
				        entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,atan2(entities.players[a].position.x-spawn[0],spawn[1]-entities.players[a].position.y),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                    }
                }
			break
            case 100:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],72,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 102:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],74,(lsin(this.direction.main)<0?-90:90)+random(-15,15),this.id,weaponData.damage*damageBuff,15,crit,this.index))
            break
            case 103:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-1,1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 104:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],76,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,max(0.5,abs(this.velocity.x)),crit,this.index))
            break
            case 105: case 134:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],77,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,max(0.5,abs(this.velocity.x)),crit,this.index))
            break
            case 106:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,85,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,95,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,-85,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,-95,this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
			case 107:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,(lsin(this.direction.main)<0?-90:90)*random(1.1,1.4),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 108:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],78,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 109:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],75,(lsin(this.direction.main)<0?-90:90)+random(-15,15),this.id,weaponData.damage*damageBuff,15,crit,this.index))
            break
			case 110:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,(lsin(this.direction.main)<0?-90:90)-5,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,(lsin(this.direction.main)<0?-90:90)+5,this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 111:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],79,(lsin(this.direction.main)<0?-90:90)+random(-15,15),this.id,weaponData.damage*damageBuff,10,crit,this.index))
            break
            case 112:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],8,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,360,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],8,(lsin(this.direction.main)<0?90:-90),this.id,weaponData.damage*damageBuff,360,crit,this.index))
			break
			case 113:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],80,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 114:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],15,random(-30,30)+180,this.id,weaponData.damage*damageBuff,10,crit,this.index))
                this.velocity.y=-1.6
            break
            case 115:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],6,-90+random(-15,15),this.id,weaponData.damage*damageBuff,10,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],6,90+random(-15,15),this.id,weaponData.damage*damageBuff,10,crit,this.index))
            break
            case 116:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],81,(lsin(this.direction.main)<0?-90:90)+random(-15,15),this.id,weaponData.damage*damageBuff,10,crit,this.index))
            break
			case 117:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 118:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],82,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
			case 119:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,85,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,95,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,-85,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,-95,this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 120:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],50,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 121:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],83,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 122:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],84,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 124:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                if(weapon.ammo%6==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],86,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff*4,300,crit,this.index))
                }
			break
			case 125:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],85,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 126:
				for(let a=0,la=10;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],12,(lsin(this.direction.main)<0?-90:90)+random(-20,20),this.id,weaponData.damage*damageBuff,15,crit,this.index))
				}
			break
			case 128:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],86,(lsin(this.direction.main)<0?-90:90)-5,this.id,weaponData.damage*damageBuff/2,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],86,(lsin(this.direction.main)<0?-90:90)+5,this.id,weaponData.damage*damageBuff/2,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],86,(lsin(this.direction.main)<0?-90:90)-10,this.id,weaponData.damage*damageBuff/2,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],86,(lsin(this.direction.main)<0?-90:90)+10,this.id,weaponData.damage*damageBuff/2,300,crit,this.index))
			break
            case 130:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],87,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 132:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],88,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 133: case 347: case 362:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],89,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,450,crit,this.index))
			break
            case 135:
                for(let a=0,la=16;a<la;a++){
				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,a*22.5,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                }
			break
            case 136: case 150:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],90,(lsin(this.direction.main)<0?-90:90)+random(-1,1),this.id,weaponData.damage*damageBuff,10,crit,this.index))
			break
            case 137: case 140: case 186:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],91,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,50,crit,this.index))
			break
            case 138:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],92,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,100,crit,this.index))
			break
            case 139:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],93,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,50,crit,this.index))
			break
			case 141:
				for(let a=0,la=10;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],43,(lsin(this.direction.main)<0?-90:90)+random(-20,20),this.id,weaponData.damage*damageBuff,15,crit,this.index))
				}
			break
            case 143:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 144:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,(lsin(this.direction.main)<0?-90:90)+random(-10,10),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                for(let a=0,la=3;a<la;a++){
				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-10,10),this.id,weaponData.damage*damageBuff*0.25,300,crit,this.index))
                }
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],5,(lsin(this.direction.main)<0?-90:90)+random(-10,10),this.id,weaponData.damage*damageBuff*0.5,180,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],6,(lsin(this.direction.main)<0?-90:90)+random(-10,10),this.id,weaponData.damage*damageBuff*0.5,10,crit,this.index))
            break
            case 145:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],94,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 146:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],95,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,360,crit,this.index))
            break
            case 147:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],96,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,500,crit,this.index))
			break
            case 148:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],97,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 151:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],98,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
                entities.projectiles[entities.projectiles.length-1].velocity.x*=1.25
                entities.projectiles[entities.projectiles.length-1].velocity.y*=3
			break
            case 152:
                entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('ConstructMachineGun',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].constructify()
                entities.players[entities.players.length-1].builder=this.index
                entities.players[entities.players.length-1].direction.goal=this.direction.goal
                this.inspect.push(entities.players[entities.players.length-1].index)
            break
            case 153: case 154: case 409:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-0.5,0.5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 156:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-3,1,(lsin(this.direction.main)<0?-90:90)+random(-1,1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]+3,1,(lsin(this.direction.main)<0?-90:90)+random(-1,1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 157:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],99,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 159:
                entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('ConstructRocketLauncher',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].constructify()
                entities.players[entities.players.length-1].builder=this.index
                entities.players[entities.players.length-1].direction.goal=this.direction.goal
                this.inspect.push(entities.players[entities.players.length-1].index)
            break
            case 160:
				for(let a=0,la=5;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-10,10),this.id,weaponData.damage*damageBuff,15,crit,this.index))
				}
			break
			case 162:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],101,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 164:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],102,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 165:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],103,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,450,crit,this.index))
			break
            case 166:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],30,random(-3,3),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 167:
				for(let a=0,la=12;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-6*(9-this.weapon.ammo),6*(9-this.weapon.ammo)),this.id,weaponData.damage*damageBuff,15,crit,this.index))
				}
			break
            case 168:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-20,20),this.id,weaponData.damage*damageBuff,3,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-20,20),this.id,weaponData.damage*damageBuff,3,crit,this.index))
            break
            case 169:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],65,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 170:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],104,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 171:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],105,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                this.setColor()
                this.newWeaponSet(findName('PlayerRevolver',types.player))
                this.weapon.uses-=12
            break
            case 172:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],105,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 173:
                entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('ConstructSniper',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].constructify()
                entities.players[entities.players.length-1].builder=this.index
                entities.players[entities.players.length-1].direction.goal=this.direction.goal
                this.inspect.push(entities.players[entities.players.length-1].index)
            break
            case 174:
                entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('ConstructFlamethrower',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].constructify()
                entities.players[entities.players.length-1].builder=this.index
                entities.players[entities.players.length-1].direction.goal=this.direction.goal
                this.inspect.push(entities.players[entities.players.length-1].index)
            break
            case 175:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                if(this.weapon.ammo%2==0){
    				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-1,1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                }
			break
            case 191: case 228:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],111,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1500,crit,this.index))
            break
            case 192:
                entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('ConstructMedic',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].constructify()
                entities.players[entities.players.length-1].builder=this.index
                entities.players[entities.players.length-1].direction.goal=this.direction.goal
                this.inspect.push(entities.players[entities.players.length-1].index)
            break
            case 193:
                for(let a=0,la=10;a<la;a++){
				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],112,a*36,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                }
			break
            case 194:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                this.velocity.x+=20*(lsin(this.direction.main)<0?1:-1)
                this.lastingForce[0]+=6*(lsin(this.direction.main)<0?1:-1)
			break
            case 196:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],113,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
			break
            case 197: case 201: case 256:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],114,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
			break
            case 198:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff*0.8,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],114,(lsin(this.direction.main)<0?60:-60),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
			break
            case 199:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],117,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
			break
            case 200:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],115,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
			break
            case 202: case 206: case 247: case 263: case 408: case 428: case 489:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],118,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1200,crit,this.index))
            break
            case 203:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],119,(lsin(this.direction.main)<0?-90:90)-45+weapon.uses%3*45,this.id,weaponData.damage*damageBuff,600,crit,this.index))
            break
            case 204:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],120,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,900,crit,this.index))
            break
            case 205:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],[122,123][weapon.uses%2],(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1200,crit,this.index))
            break
            case 207:
                for(let a=0,la=7;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],a==3?112:1,(lsin(this.direction.main)<0?-90:90)-15+a*5,this.id,weaponData.damage*damageBuff*(a==3?3:1),300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=a==3?8:6
                }
            break
            case 208:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-1:1)*(90+this.weapon.ammo*18),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-1:1)*(90+this.weapon.ammo*18)+180,this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 209:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],[128,129][weapon.uses%2],(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1200,crit,this.index))
            break
            case 210:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],86,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 212: case 213: case 217: case 491:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],125,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
			break
            case 214:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],126,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
			break
            case 215:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-2,1,(lsin(this.direction.main)<0?-88:88),this.id,weaponData.damage*damageBuff*0.05,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]+2,1,(lsin(this.direction.main)<0?-92:92),this.id,weaponData.damage*damageBuff*0.05,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-4,1,(lsin(this.direction.main)<0?-86:86),this.id,weaponData.damage*damageBuff*0.05,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]+4,1,(lsin(this.direction.main)<0?-94:94),this.id,weaponData.damage*damageBuff*0.05,300,crit,this.index))
                if(weapon.uses%10==0){
				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],125,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
                }
			break
            case 216:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],127,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
			break
            case 218:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],131,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,240,crit,this.index))
            break
            case 219:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                if(weapon.uses%15==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],118,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*8,1200,crit,this.index))
                }
			break
            case 220:
                if(weapon.uses%2==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],119,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)-15,this.id,weaponData.damage*damageBuff,60,crit,this.index))
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+15,this.id,weaponData.damage*damageBuff,60,crit,this.index))
                }else{
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],132,(lsin(this.direction.main)<0?-90:90)+180,this.id,weaponData.damage*damageBuff*0.8,600,crit,this.index))
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)-5,this.id,weaponData.damage*damageBuff,60,crit,this.index))
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+5,this.id,weaponData.damage*damageBuff,60,crit,this.index))
                }
            break
            case 221:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-5+weapon.ammo%2*10,133,(lsin(this.direction.main)<0?-90:90)-6+floor(weapon.ammo/2)%3*6,this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
			case 223:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],68,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,720,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],135,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,720,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],136,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,720,crit,this.index))
			break
			case 224:
				for(let a=0,la=15;a<la;a++){
                    let mult=random(5,10)
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],132,(lsin(this.direction.main)<0?-90:90)+random(-20,20),this.id,weaponData.damage*damageBuff,450,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
				}
			break
            case 226:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],[139,140,141,142][weapon.uses%4],(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1500,crit,this.index))
            break
            case 229:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],146,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
			break
            case 230:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],144,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1500,crit,this.index))
            break
            case 231: case 444: case 540:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],147,(lsin(this.direction.main)<0?-105:105)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 232:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],147,(lsin(this.direction.main)<0?-105:105)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],132,(lsin(this.direction.main)<0?90:-90)+random(-10,10),this.id,weaponData.damage*damageBuff,60,crit,this.index))
			break
            case 234: case 238:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-5+weapon.ammo%2*10,133,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 235:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],148,(lsin(this.direction.main)<0?-90:90)-18+weapon.ammo*3%7*6,this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 236:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-5+weapon.ammo%2*10,149,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 239:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-5+weapon.ammo%2*10,150,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1800,crit,this.index))
            break
            case 244:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],152,(lsin(this.direction.main)<0?-90:90)+random(-15,15),this.id,weaponData.damage*damageBuff,10,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],152,(lsin(this.direction.main)<0?-90:90)+random(-15,15)+180,this.id,weaponData.damage*damageBuff,10,crit,this.index))
            break
            case 248:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],154,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
			break
            case 249:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)-2+random(-0.1,0.1),this.id,weaponData.damage*damageBuff*0.5,30,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+2+random(-0.1,0.1),this.id,weaponData.damage*damageBuff*0.5,30,crit,this.index))
			break
            case 250:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],155,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 251:
                for(let a=0,la=4;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-0.5,0.5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=6-a
                }
            break
            case 252:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,60,crit,this.index))
                entities.projectiles[entities.projectiles.length-1].speed*=0.8
            break
            case 254: case 255: case 289: case 544:
                let minimum=[900,900]
                for(let a=0,la=entities.players.length;a<la;a++){
                    if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)<900){
                        let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                        if(entities.players[a].position.x<this.position.x){
                            minimum[0]=min(minimum[0],distance)
                        }else if(entities.players[a].position.x>this.position.x){
                            minimum[1]=min(minimum[1],distance)
                        }
                    }
                }
                let fired=[false,false]
                for(let a=0,la=entities.players.length;a<la;a++){
                    if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0){
                        let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                        if(!fired[0]&&distance==minimum[0]){
                            entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                            fired[0]=true
                        }
                        if(!fired[1]&&distance==minimum[1]){
                            entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                            fired[1]=true
                        }
                    }
                }
                if(!fired[0]){
                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,-90,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                }
                if(!fired[1]){
                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,90,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                }
            break
			case 258: case 259: case 286:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],135,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,720,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],136,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,720,crit,this.index))
			break
            case 261:
                let minimum261=[900,900,900,900,900,900,900,900,900,900]
                for(let a=0,la=entities.players.length;a<la;a++){
                    if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)<900){
                        let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                        let dir=atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y)
                        for(let b=0,lb=10;b<lb;b++){
                            if(abs(dir-((b*36+this.time)%360))<60||abs(dir-((b*36+this.time)%360)+360)<60||abs(dir-((b*36+this.time)%360)-360)<60){
                                minimum261[b]=min(minimum261[b],distance)
                            }
                        }
                    }
                }
                let fired261=[false,false,false,false,false,false,false,false,false,false]
                for(let a=0,la=entities.players.length;a<la;a++){
                    if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0){
                        let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                        for(let b=0,lb=10;b<lb;b++){
                            if(!fired261[b]&&distance==minimum261[b]){
                                entities.projectiles.push(new projectile(this.layer,this.position.x+lsin(b*36+this.time)*4,this.position.y-lcos(b*36+this.time)*4,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                                fired261[b]=true
                            }
                        }
                    }
                }
                for(let b=0,lb=10;b<lb;b++){
                    if(!fired261[b]){
                        entities.projectiles.push(new projectile(this.layer,this.position.x+lsin(b*36+this.time)*4,this.position.y-lcos(b*36+this.time)*4,1,b*36+this.time,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                    }
                }
			break
            case 262:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],156,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],119,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
			break
            case 264:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],114,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1800,crit,this.index))
			break
            case 265:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],157,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1500,crit,this.index))
            break
            case 266:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],[158,159,160,158][weapon.uses%4],(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1500,crit,this.index))
            break
            case 267:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],[118,111,124][weapon.uses%3],(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1500,crit,this.index))
            break
            case 268:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3)+165,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3)-165,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                this.velocity.x+=3*(lsin(this.direction.main)<0?-1:1)
                this.lastingForce[0]+=0.2*(lsin(this.direction.main)<0?-1:1)
            break
            case 271:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],114,-90,this.id,weaponData.damage*damageBuff,900,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],114,90,this.id,weaponData.damage*damageBuff,900,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],119,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
            break
            case 273:
                entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('ConstructGuard',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].constructify()
                entities.players[entities.players.length-1].builder=this.index
                entities.players[entities.players.length-1].direction.goal=this.direction.goal
                this.inspect.push(entities.players[entities.players.length-1].index)
            break
			case 278:
				for(let a=0,la=15;a<la;a++){
                    let mult=random(1.5,2.5)
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],114,(lsin(this.direction.main)<0?-90:90)+random(-20,20),this.id,weaponData.damage*damageBuff,900,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
				}
			break
            case 279: case 486:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-135:135)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 280:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],166,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,720,crit,this.index))
			break
            case 281:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],6,(lsin(this.direction.main)<0?-90:90)+random(-15,15),this.id,weaponData.damage*damageBuff,10,crit,this.index))
                if(weapon.uses%2==0){
				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],147,(lsin(this.direction.main)<0?-105:105)+random(-3,3),this.id,weaponData.damage*damageBuff*3,300,crit,this.index))
                }
			break
            case 282:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],135,(lsin(this.direction.main)<0?-45:45),this.id,weaponData.damage*damageBuff,720,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],136,(lsin(this.direction.main)<0?-45:45),this.id,weaponData.damage*damageBuff,720,crit,this.index))
			break
            case 283:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],167,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 284: case 285:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],119,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
            break
            case 287:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],[118,171][weapon.uses%2],(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1200,crit,this.index))
            break
            case 290:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],135,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,720,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],136,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,720,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],119,(lsin(this.direction.main)<0?-90:90)-36,this.id,weaponData.damage*damageBuff,600,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],119,(lsin(this.direction.main)<0?-90:90)+36,this.id,weaponData.damage*damageBuff,600,crit,this.index))
			break
            case 291:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],135,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,720,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],136,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,720,crit,this.index))
                if(weapon.uses%3==0){
				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],130,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*10,600,crit,this.index))
                }
			break
            case 292:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],135,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,720,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],136,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,720,crit,this.index))
                for(let a=0,la=5;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],15,(lsin(this.direction.main)<0?-90:90)+random(-15,15),this.id,weaponData.damage*damageBuff,15,crit,this.index))
                }
			break
            case 293:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],9,(lsin(this.direction.main)<0?-90:90)-1+random(-0.1,0.1),this.id,weaponData.damage*damageBuff*0.4,30,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],9,(lsin(this.direction.main)<0?-90:90)+1+random(-0.1,0.1),this.id,weaponData.damage*damageBuff*0.4,30,crit,this.index))
			break
            case 294:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],172,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
            break
            case 295:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                if(weapon.ammo==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],173,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*4,300,crit,this.index))
                }
            break
            case 296:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                this.velocity.x+=8*(lsin(this.direction.main)<0?1:-1)
                this.lastingForce[0]+=2.4*(lsin(this.direction.main)<0?1:-1)
                entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickRocketLauncher',types.player),this.index))
                entities.players[entities.players.length-1].sidekick=true
                entities.players[entities.players.length-1].direction.goal=this.direction.goal
                entities.players[entities.players.length-1].DOT.damage=1
                entities.players[entities.players.length-1].DOT.active=9999
			break
            case 297:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],174,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 299:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],175,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 301:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],176,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 302:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],[119,124][weapon.uses%2],(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,900,crit,this.index))
            break
            case 303:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],177,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,900,crit,this.index))
            break
            case 304:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],178,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,900,crit,this.index))
            break
            case 305:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],179,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,900,crit,this.index))
            break
            case 306:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                this.velocity.x+=10*(lsin(this.direction.main)<0?-1:1)
                this.lastingForce[0]+=2.4*(lsin(this.direction.main)<0?-1:1)
			break
            case 307:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],50,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                this.velocity.x+=10*(lsin(this.direction.main)<0?-1:1)
                this.lastingForce[0]+=2.4*(lsin(this.direction.main)<0?-1:1)
			break
            case 308:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],119,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,900,crit,this.index))
                this.velocity.x+=10*(lsin(this.direction.main)<0?-1:1)
                this.lastingForce[0]+=2.4*(lsin(this.direction.main)<0?-1:1)
			break
            case 309: case 316: case 318:
                for(let a=0,la=7;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)-15+a*5,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=6
                }
            break
            case 310:
                entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('ConstructDestroyer',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].constructify()
                entities.players[entities.players.length-1].builder=this.index
                entities.players[entities.players.length-1].direction.goal=this.direction.goal
                this.inspect.push(entities.players[entities.players.length-1].index)
            break
            case 311:
                entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('ConstructAuto',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].constructify()
                entities.players[entities.players.length-1].builder=this.index
                entities.players[entities.players.length-1].direction.goal=this.direction.goal
                this.inspect.push(entities.players[entities.players.length-1].index)
            break
            case 312:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],181,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
			break
            case 313:
                for(let a=0,la=12;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-1:1)*(90-56+a*8-max(0,a-7)*6.5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=6
                }
            break
            case 314:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-3+weapon.uses%2*6,1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                if(weapon.uses%4==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],114,random(0,360),this.id,weaponData.damage*damageBuff*2,900,crit,this.index))
                }
            break
            case 317:
                for(let a=0,la=11;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)-15+a*3,this.id,weaponData.damage*damageBuff*(2-abs(a-5)*0.3),300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=8-abs(a-5)*0.6
                }
            break
            case 319: case 321: case 376:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                this.velocity.x+=10*(lsin(this.direction.main)<0?-1:1)
                this.lastingForce[0]+=2.4*(lsin(this.direction.main)<0?-1:1)
			break
            case 320: case 322:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],182,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,900,crit,this.index))
            break
            case 323:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],121,(lsin(this.direction.main)<0?-90:90)+weapon.uses%4*90,this.id,weaponData.damage*damageBuff,600,crit,this.index))
            break
            case 324:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],114,(lsin(this.direction.main)<0?60:-60),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
                if(weapon.uses%3==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],184,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*2,1200,crit,this.index))
                }
			break
            case 325:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],185,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1200,crit,this.index))
			break
            case 326:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],186,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 327:
                entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('ConstructSpreadling',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].constructify()
                entities.players[entities.players.length-1].builder=this.index
                entities.players[entities.players.length-1].direction.goal=this.direction.goal
                this.inspect.push(entities.players[entities.players.length-1].index)
            break
			case 328:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],187,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 329:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],91,-90,this.id,weaponData.damage*damageBuff,50,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],91,90,this.id,weaponData.damage*damageBuff,50,crit,this.index))
			break
            case 330:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],188,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 332: case 343: case 497:
                for(let a=0,la=2;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-2+a*4,1,(lsin(this.direction.main)<0?-1:1)*(90-1+a*2),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=8
                }
			break
            case 333:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],189,(lsin(this.direction.main)<0?-90:90)+random(-15,15),this.id,weaponData.damage*damageBuff,10,crit,this.index))
            break
            case 334:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],190,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1,crit,this.index))
            break
            case 335: case 360: case 479:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],191,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1,crit,this.index))
            break
            case 336:
                for(let a=0,la=7;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)-15+a*5,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=6
                }
                for(let a=0,la=6;a<la;a++){
                    if(a!=2&&a!=3){
                        entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)-12.5+a*5,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                        entities.projectiles[entities.projectiles.length-1].speed=8
                    }
                }
            break
            case 337:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],192,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
			break
            case 338: case 351: case 447:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],173,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 339:
                if(this.assort.glove==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-3,1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff/2,300,crit,this.index))
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]+3,1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff/2,300,crit,this.index))
                    if(weapon.ammo==0){
                        entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],199,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*2,300,crit,this.index))
                        this.assort.glove=360
                    }
                }else{
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff/2,300,crit,this.index))
                }
            break
            case 340:
                for(let a=0,la=2;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-2+a*4,1,(lsin(this.direction.main)<0?-1:1)*(90+0.5-a),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=8
                }
			break
            case 341:
                let minimum341=[900,900]
                for(let a=0,la=entities.players.length;a<la;a++){
                    if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)<900){
                        let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                        if(entities.players[a].position.x<this.position.x){
                            minimum341[0]=min(minimum341[0],distance)
                        }else if(entities.players[a].position.x>this.position.x){
                            minimum341[1]=min(minimum341[1],distance)
                        }
                    }
                }
                let fired341=[false,false]
                for(let a=0,la=entities.players.length;a<la;a++){
                    if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0){
                        let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                        if(!fired341[0]&&distance==minimum341[0]){
                            let dir=atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y)
                            for(let a=0,la=2;a<la;a++){
                                entities.projectiles.push(new projectile(this.layer,spawn[0]+(-2+a*4)*lcos(dir),spawn[1]+(-2+a*4)*lsin(dir),1,dir-1+a*2,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                                entities.projectiles[entities.projectiles.length-1].speed=8
                            }
                            fired341[0]=true
                        }
                        if(!fired341[1]&&distance==minimum341[1]){
                            let dir=atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y)
                            for(let a=0,la=2;a<la;a++){
                                entities.projectiles.push(new projectile(this.layer,spawn[0]+(-2+a*4)*lcos(dir),spawn[1]+(-2+a*4)*lsin(dir),1,dir-1+a*2,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                                entities.projectiles[entities.projectiles.length-1].speed=8
                            }
                            fired341[1]=true
                        }
                    }
                }
                if(!fired341[0]){
                    for(let a=0,la=2;a<la;a++){
                        entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-2+a*4,1,-90+2-a*4,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                        entities.projectiles[entities.projectiles.length-1].speed=8
                    }
                }
                if(!fired341[1]){
                    for(let a=0,la=2;a<la;a++){
                        entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-2+a*4,1,90-1+a*2,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                        entities.projectiles[entities.projectiles.length-1].speed=8
                    }
                }
            break
            case 342:
                for(let a=0,la=2;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-2+a*4,1,(lsin(this.direction.main)<0?-1:1)*(90-1+a*2),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=8
                }
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],68,(lsin(this.direction.main)<0?-90:90)+random(-5,5),this.id,weaponData.damage*damageBuff*2,720,crit,this.index))
			break
            case 344:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],193,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,450,crit,this.index))
			break
            case 345:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],194,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,450,crit,this.index))
			break
            case 346:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],195,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,450,crit,this.index))
			break
            case 348:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],196,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 349:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-3+weapon.uses%2*6,197,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 350:
                if(weapon.uses%2==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],173,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                }else{
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],8,(lsin(this.direction.main)<0?90:-90),this.id,weaponData.damage*damageBuff,360,crit,this.index))
                }
            break
            case 354:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],200,(lsin(this.direction.main)<0?-90:90)+weapon.uses%4*90,this.id,weaponData.damage*damageBuff,600,crit,this.index))
            break
            case 355:
                for(let a=0,la=2;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-2+a*4,1,(lsin(this.direction.main)<0?-1:1)*(90-1+a*2),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=8
                }
                if(weapon.uses%2==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],119,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*2,600,crit,this.index))
                }else{
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],132,(lsin(this.direction.main)<0?-90:90)+180,this.id,weaponData.damage*damageBuff,600,crit,this.index))
                }
			break
            case 357:
                entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('ConstructAssaultRifle',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].constructify()
                entities.players[entities.players.length-1].builder=this.index
                entities.players[entities.players.length-1].direction.goal=this.direction.goal
                this.inspect.push(entities.players[entities.players.length-1].index)
            break
            case 358: case 467:
                let minimum358=[900,900,900,900]
                for(let a=0,la=entities.players.length;a<la;a++){
                    if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)<900){
                        let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                        if(entities.players[a].position.x<this.position.x){
                            if(entities.players[a].position.y<this.position.y){
                                minimum358[0]=min(minimum358[0],distance)
                            }else{
                                minimum358[2]=min(minimum358[2],distance)
                            }
                        }else if(entities.players[a].position.x>this.position.x){
                            if(entities.players[a].position.y<this.position.y){
                                minimum358[1]=min(minimum358[1],distance)
                            }else{
                                minimum358[3]=min(minimum358[3],distance)
                            }
                        }
                    }
                }
                let fired358=[false,false,false,false]
                for(let a=0,la=entities.players.length;a<la;a++){
                    if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0){
                        let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                        if(!fired358[0]&&distance==minimum358[0]){
                            entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                            fired358[0]=true
                        }else if(!fired358[1]&&distance==minimum358[1]){
                            entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                            fired358[1]=true
                        }else if(!fired358[2]&&distance==minimum358[2]){
                            entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                            fired358[2]=true
                        }else if(!fired358[3]&&distance==minimum358[3]){
                            entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                            fired358[3]=true
                        }
                    }
                }
                if(!fired358[0]){
                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,-45,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                }
                if(!fired358[1]){
                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,45,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                }
                if(!fired358[2]){
                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,-135,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                }
                if(!fired358[3]){
                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,135,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                }
            break
            case 359:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],125,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],118,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*0.25,1200,crit,this.index))
			break
            case 361:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],201,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
			break
            case 363:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-1,1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-1,1)-4,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-1,1)+4,this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 364: case 502:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],151,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 365:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],202,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 366:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+150,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+180,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+210,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                this.velocity.x+=15*(lsin(this.direction.main)<0?-1:1)
                this.lastingForce[0]+=3.6*(lsin(this.direction.main)<0?-1:1)
			break
            case 367:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3)+135,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3)+225,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                this.velocity.x+=10*(lsin(this.direction.main)<0?-1:1)
                this.lastingForce[0]+=2.4*(lsin(this.direction.main)<0?-1:1)
			break
            case 369:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],203,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 371:
                for(let a=0,la=2;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-0.5,0.5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=6-a*2
                }
            break
            case 372:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],204,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,50,crit,this.index))
			break
            case 373:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,-90,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,-120,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,90,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,120,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                if(this.velocity.y>-9){
                    this.velocity.y=-9
                }
                this.velocity.y-=6
			break
            case 374:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,-90,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,-120,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,90,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,120,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0]-3,spawn[1],1,180,this.id,weaponData.damage*damageBuff*3,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0]+3,spawn[1],1,180,this.id,weaponData.damage*damageBuff*3,300,crit,this.index))
                if(this.velocity.y>-9){
                    this.velocity.y=-9
                }
                this.velocity.y-=6
			break
            case 375:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],205,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 377:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*0.5,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],114,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
                if(weapon.uses<=0){
                    entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('ConstructMedic',types.player),game.index))
                    game.index++
                    entities.players[entities.players.length-1].color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[160,165,170],body:[150,155,160],legs:[140,145,150],arms:[145,150,155]}}
                    entities.players[entities.players.length-1].construct=true
                    entities.players[entities.players.length-1].direction.goal=this.direction.goal
                }
			break
            case 378:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],175,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                this.velocity.x+=10*(lsin(this.direction.main)<0?-1:1)
                this.lastingForce[0]+=2.4*(lsin(this.direction.main)<0?-1:1)
			break
            case 379:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],207,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 380:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],203,(lsin(this.direction.main)<0?-90:90)+random(-1,1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 381:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],208,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,50,crit,this.index))
			break
            case 383:
				for(let a=0,la=10;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],[12,24,67,231,232][floor(random(0,5))],(lsin(this.direction.main)<0?-90:90)+random(-20,20),this.id,weaponData.damage*damageBuff,15,crit,this.index))
				}
			break
            case 384:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]+[-6,4,-4,6][weapon.uses%4],209,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1800,crit,this.index))
			break
            case 386:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],2,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],210,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*2,150,crit,this.index))
                this.velocity.x+=8*(lsin(this.direction.main)<0?1:-1)
                this.lastingForce[0]+=2.4*(lsin(this.direction.main)<0?1:-1)
			break
            case 388:
                this.newWeapon()
                bypass=true
            break
            case 389:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],211,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
            break
            case 391: case 417: case 457:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-2,2),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 392:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],212,(lsin(this.direction.main)<0?-90:90)+random(-2,2),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 393:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],213,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 394:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],214,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*(3-2*weapon.ammo/weaponData.ammo),(3-2*weapon.ammo/weaponData.ammo),crit,this.index))
            break
            case 395:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-3+weapon.uses%2*6,1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                if(weapon.uses%2==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],34,random(0,360),this.id,weaponData.damage*damageBuff*2,900,crit,this.index))
                }
            break
			case 396:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],215,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 397:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],216,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
			break
            case 401:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],130,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],130,(lsin(this.direction.main)<0?-90:90)+random(-3,3)+135,this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],130,(lsin(this.direction.main)<0?-90:90)+random(-3,3)+225,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                this.velocity.x+=20*(lsin(this.direction.main)<0?-1:1)
                this.lastingForce[0]+=4.8*(lsin(this.direction.main)<0?-1:1)
			break
            case 403:
                for(let a=0,la=5;a<la;a++){
				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,180-20+a*10,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                }
			break
            case 404:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff*0.4,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3)+135,this.id,weaponData.damage*damageBuff*0.4,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3)+225,this.id,weaponData.damage*damageBuff*0.4,300,crit,this.index))
                this.velocity.x+=15*(lsin(this.direction.main)<0?-1:1)
                this.lastingForce[0]+=3.6*(lsin(this.direction.main)<0?-1:1)
                if(weapon.uses%2==0){
				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],181,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
                }
			break
            case 405:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-4+weapon.uses%2*8,217,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                if(weapon.uses%2==0){
                    let minimum405=[600,600]
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)<900){
                            let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                            if(entities.players[a].position.x<this.position.x){
                                minimum405[0]=min(minimum405[0],distance)
                            }else if(entities.players[a].position.x>this.position.x){
                                minimum405[1]=min(minimum405[1],distance)
                            }
                        }
                    }
                    let fired405=[false,false]
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0){
                            let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                            if(!fired405[0]&&distance==minimum405[0]){
                                let dir=atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y)
                                for(let a=0,la=2;a<la;a++){
                                    entities.projectiles.push(new projectile(this.layer,spawn[0]+(-2+a*4)*lcos(dir),spawn[1]+(-2+a*4)*lsin(dir),1,dir-1+a*2,this.id,weaponData.damage*damageBuff/3,300,crit,this.index))
                                    entities.projectiles[entities.projectiles.length-1].speed=8
                                }
                                fired405[0]=true
                            }
                            if(!fired405[1]&&distance==minimum405[1]){
                                let dir=atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y)
                                for(let a=0,la=2;a<la;a++){
                                    entities.projectiles.push(new projectile(this.layer,spawn[0]+(-2+a*4)*lcos(dir),spawn[1]+(-2+a*4)*lsin(dir),1,dir-1+a*2,this.id,weaponData.damage*damageBuff/3,300,crit,this.index))
                                    entities.projectiles[entities.projectiles.length-1].speed=8
                                }
                                fired405[1]=true
                            }
                        }
                    }
                }
            break
            case 406:
                for(let a=0,la=2;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*0.4,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=7-a
                }
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],114,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
			break
            case 407:
                switch(weapon.ammo%3){
                    case 0:
    				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],218,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*2,300,crit,this.index))
                        entities.projectiles[entities.projectiles.length-1].speed=7
                        entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)-4,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                        entities.projectiles[entities.projectiles.length-1].speed=7
                        entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+4,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                        entities.projectiles[entities.projectiles.length-1].speed=7
                    break
                    case 1:
    				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],217,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*2,300,crit,this.index))
                        entities.projectiles[entities.projectiles.length-1].speed=7
                        entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],219,(lsin(this.direction.main)<0?-90:90)-4,this.id,weaponData.damage*damageBuff*0.5,300,crit,this.index))
                        entities.projectiles[entities.projectiles.length-1].speed=7
                        entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],219,(lsin(this.direction.main)<0?-90:90)+4,this.id,weaponData.damage*damageBuff*0.5,300,crit,this.index))
                        entities.projectiles[entities.projectiles.length-1].speed=7
                    break
                    case 2:
    				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                        entities.projectiles[entities.projectiles.length-1].speed=7
                    break
                }
			break
			case 410:
				for(let a=0,la=3;a<la;a++){
                    let mult=random(5,10)
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],134,(lsin(this.direction.main)<0?-90:90)+random(-20,20),this.id,weaponData.damage*damageBuff,360,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
				}
			break
            case 411:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-2,2),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                if(weapon.uses%12==1){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],8,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*3,240,crit,this.index))
                }
			break
            case 412:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],221,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
			break
            case 413: case 537:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],222,(lsin(this.direction.main)<0?-90:90)-25+(weapon.uses*19+15)%50,this.id,weaponData.damage*damageBuff,15,crit,this.index))
            break
            case 414:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],223,(lsin(this.direction.main)<0?-90:90)-25+(weapon.uses*19+15)%50,this.id,weaponData.damage*damageBuff,15,crit,this.index))
            break
            case 416:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-135:135)+random(-10,10),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
			case 418:
                for(let a=0,la=9;a<la;a++){
                    let mult=1+lcos(a/la*360)*0.2
				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],68,(lsin(this.direction.main)<0?-90:90)+11*lsin(a/la*360),this.id,weaponData.damage*damageBuff,720,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
                }
			break
            case 419:
                for(let a=0,la=2;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-2+a*4,1,(lsin(this.direction.main)<0?-1:1)*(90-1+a*2),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=8
                }
                let minimum419=[900,900]
                for(let a=0,la=entities.players.length;a<la;a++){
                    if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)<900){
                        let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                        if(entities.players[a].position.x<this.position.x){
                            minimum419[0]=min(minimum419[0],distance)
                        }else if(entities.players[a].position.x>this.position.x){
                            minimum419[1]=min(minimum419[1],distance)
                        }
                    }
                }
                let fired419=[false,false]
                for(let a=0,la=entities.players.length;a<la;a++){
                    if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0){
                        let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                        if(!fired419[0]&&distance==minimum419[0]){
                            entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                            fired419[0]=true
                        }
                        if(!fired419[1]&&distance==minimum419[1]){
                            entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                            fired419[1]=true
                        }
                    }
                }
                if(!fired419[0]){
                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,-90,this.id,this.weaponData.damage*this.playerData.damageBuff*1.5,300,crit,this.index))
                }
                if(!fired419[1]){
                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,90,this.id,this.weaponData.damage*this.playerData.damageBuff*1.5,300,crit,this.index))
                }
			break
            case 422:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],224,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,360,crit,this.index))
            break
            case 423:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],225,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 424:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],226,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 425:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],227,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,900,crit,this.index))
            break
            case 426:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],228,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 427:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-5+weapon.ammo%2*10,133,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                if(weapon.ammo==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],139,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*3,1500,crit,this.index))
                }
            break
            case 430:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],229,(lsin(this.direction.main)<0?-90:90)+[-6,-3,3,6][weapon.uses%4],this.id,weaponData.damage*damageBuff,600,crit,this.index))
			break
            case 431:
                let dir=random(-2,2)
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+dir,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles[entities.projectiles.length-1].speed=6
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],219,(lsin(this.direction.main)<0?-90:90)+dir,this.id,weaponData.damage*damageBuff*0.5,300,crit,this.index))
                entities.projectiles[entities.projectiles.length-1].speed=9
			break
            case 432:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-5+weapon.ammo%3*5,230,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 435:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],234,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 436:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],235,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 437:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],236,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
			break
            case 438:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],118,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1200,crit,this.index))
            break
            case 439:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],181,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],118,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1200,crit,this.index))
            break
            case 440:
                for(let a=0,la=2;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-2+a*4,1,(90-1+a*2),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=8
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-2+a*4,1,-(90-1+a*2),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=8
                }
                if(weapon.uses%4==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],130,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*10,600,crit,this.index))
                }
			break
            case 441:
                for(let a=0,la=5;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],6,this.time+a*72+random(-15,15),this.id,weaponData.damage*damageBuff,10,crit,this.index))
                }
            break
            case 442:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-3+weapon.uses%2*6,1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*0.2,300,crit,this.index))
                if(weapon.uses%6==0){
				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],125,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
                }
			break
            case 443:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-4,237,(lsin(this.direction.main)<0?-86:86)-8,this.id,weaponData.damage*damageBuff,50,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-4,238,(lsin(this.direction.main)<0?-86:86)+8,this.id,weaponData.damage*damageBuff,50,crit,this.index))
			break
            case 445:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],239,(lsin(this.direction.main)<0?90:-90),this.id,weaponData.damage*damageBuff,75,crit,this.index))
			break
			case 446:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],240,(lsin(this.direction.main)<0?-120:120),this.id,weaponData.damage*damageBuff,720,crit,this.index))
			break
            case 448:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1+floor(random(0,2))*240,(lsin(this.direction.main)<0?-90:90)+random(-2,2),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 449:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-5+weapon.ammo%2*10,133,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-5+weapon.ammo%2*10,242,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 450:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],249,(lsin(this.direction.main)<0?-90:90)+random(-1,1),this.id,weaponData.damage*damageBuff,10,crit,this.index))
			break
            case 451:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],243,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
			break
            case 452:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],89,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,450,crit,this.index))
                let minimum452=[900,900]
                for(let a=0,la=entities.players.length;a<la;a++){
                    if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)<900){
                        let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                        if(entities.players[a].position.x<this.position.x){
                            minimum452[0]=min(minimum452[0],distance)
                        }else if(entities.players[a].position.x>this.position.x){
                            minimum452[1]=min(minimum452[1],distance)
                        }
                    }
                }
                let fired452=[false,false]
                for(let a=0,la=entities.players.length;a<la;a++){
                    if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0){
                        let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                        if(!fired452[0]&&distance==minimum452[0]){
                            entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff*200,300,crit,this.index))
                            fired452[0]=true
                        }
                        if(!fired452[1]&&distance==minimum452[1]){
                            entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff*200,300,crit,this.index))
                            fired452[1]=true
                        }
                    }
                }
                if(!fired452[0]){
                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,-90,this.id,this.weaponData.damage*this.playerData.damageBuff*200,300,crit,this.index))
                }
                if(!fired452[1]){
                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,90,this.id,this.weaponData.damage*this.playerData.damageBuff*200,300,crit,this.index))
                }
			break
            case 453:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],244,(lsin(this.direction.main)<0?-105:105)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 454:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],this.infoAnim.elevate>=15?88:4,(lsin(this.direction.main)<0?-1:1)*(90-this.infoAnim.elevate)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],this.infoAnim.elevate>=15?88:4,(lsin(this.direction.main)<0?-1:1)*(90-this.infoAnim.elevate)-1+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],this.infoAnim.elevate>=15?88:4,(lsin(this.direction.main)<0?-1:1)*(90-this.infoAnim.elevate)+1+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 455:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],[146,245,246,247][weapon.uses%4],(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
            break
            case 456:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],248,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1500,crit,this.index))
            break
            case 458:
                entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('ConstructPelleter',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].constructify()
                entities.players[entities.players.length-1].builder=this.index
                entities.players[entities.players.length-1].direction.goal=this.direction.goal
                this.inspect.push(entities.players[entities.players.length-1].index)
            break
            case 460:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],203,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 462:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-2,2),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                if(weapon.uses%12==1){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],181,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*6,240,crit,this.index))
                }
			break
            case 463:
                entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('ConstructInterceptor',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].constructify()
                entities.players[entities.players.length-1].builder=this.index
                entities.players[entities.players.length-1].direction.goal=this.direction.goal
                this.inspect.push(entities.players[entities.players.length-1].index)
            break
            case 464:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],250,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 465: case 530:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],251,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 466:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],251,random(156,204),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 468:
                for(let a=0,la=[2,2,3,3,3,1][floor(weapon.ammo/5)%6];a<la;a++){
				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3)+3-la*3+a*6,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                }
			break
			case 472:
				for(let a=0,la=3;a<la;a++){
                    let mult=random(1,2.5)
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],182,(lsin(this.direction.main)<0?-90:90)+random(-20,20),this.id,weaponData.damage*damageBuff,600,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult*4
                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult
				}
			break
            case 474:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                if(weapon.ammo==0){
                    this.velocity.x+=15*(lsin(this.direction.main)<0?-1:1)
                    this.lastingForce[0]+=3.6*(lsin(this.direction.main)<0?-1:1)
                }
            break
            case 475:
				for(let a=0,la=5;a<la;a++){
                    for(let b=0,lb=[3,4,5,4,3][a];b<lb;b++){
                        entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)-12+a*6,this.id,weaponData.damage*damageBuff,15,crit,this.index))
                        entities.projectiles[entities.projectiles.length-1].speed=7+b-lb*0.5+0.5
                    }
				}
			break
            case 476:
				for(let a=0,la=10;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],212,(lsin(this.direction.main)<0?-90:90)+random(-20,20),this.id,weaponData.damage*damageBuff,30,crit,this.index))
				}
			break
            case 477:
				for(let a=0,la=5;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],254,(lsin(this.direction.main)<0?-90:90)+random(-20,20),this.id,weaponData.damage*damageBuff,60,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed*=random(0.75,1.25)
                    entities.projectiles[entities.projectiles.length-1].time*=random(0.75,1.25)
				}
			break
            case 478:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],191,(lsin(this.direction.main)<0?-90:90)+random(-2,2),this.id,weaponData.damage*damageBuff,1,crit,this.index))
            break
            case 480:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],256,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1,crit,this.index))
            break
            case 481:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],257,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1,crit,this.index))
            break
            case 482:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],258,(lsin(this.direction.main)<0?-105:105)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 483:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-6,219,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0]+(lsin(this.direction.main)<0?-2:2),spawn[1]-3,219,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0]+(lsin(this.direction.main)<0?-2:2),spawn[1]+3,219,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]+6,219,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                for(let a=0,la=4;a<la;a++){
                    entities.projectiles[entities.projectiles.length-1-a].speed=6.5
                }
			break
            case 484:
                for(let a=0,la=7;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],a==3?217:1,(lsin(this.direction.main)<0?-90:90)-15+a*5,this.id,weaponData.damage*damageBuff*(a==3?3:1),300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=a==3?7:6
                }
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-4,217,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*3,300,crit,this.index))
                entities.projectiles[entities.projectiles.length-1].speed=7
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]+4,217,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*3,300,crit,this.index))
                entities.projectiles[entities.projectiles.length-1].speed=7
            break
            case 487:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],260,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1500,crit,this.index))
            break
            case 488:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],261,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,900,crit,this.index))
            break
            case 490:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-5+weapon.ammo%2*10,262,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 492:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],263,(lsin(this.direction.main)<0?-1:1)*105,this.id,weaponData.damage*damageBuff,3600,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],263,(lsin(this.direction.main)<0?-1:1)*85,this.id,weaponData.damage*damageBuff,3600,crit,this.index))
			break
            case 493:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],264,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 494:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],265,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1,crit,this.index))
            break
            case 496:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)-4+random(-1,1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+4+random(-1,1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 498:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],266,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 499:
                if(weapon.uses%5==0){
                    for(let a=0,la=20;a<la;a++){
                        entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-20,20),this.id,weaponData.damage*damageBuff,15,crit,this.index))
                    }
                }else{
				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                }
			break
            case 500:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],267,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,360,crit,this.index))
            break
            case 501:
                for(let a=0,la=8;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+180+random(-20,20),this.id,weaponData.damage*damageBuff,15,crit,this.index))
                }
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                this.velocity.x+=10*(lsin(this.direction.main)<0?-1:1)
                this.lastingForce[0]+=2.4*(lsin(this.direction.main)<0?-1:1)
			break
            case 503:
                if(weapon.uses%2==0){
                    for(let a=0,la=7;a<la;a++){
                        if(a!=3){
                            entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)-15+a*5,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                            entities.projectiles[entities.projectiles.length-1].speed=6
                        }
                    }
                }
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-6,1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles[entities.projectiles.length-1].speed=7
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-2,1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles[entities.projectiles.length-1].speed=7
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]+2,1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles[entities.projectiles.length-1].speed=7
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]+6,1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles[entities.projectiles.length-1].speed=7
                break
            case 504:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],135,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,720,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],136,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,720,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],241,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 505:
                for(let a=0,la=3;a<la;a++){
                    if(weapon.uses%2==0){
                        entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-3+a*3,1,(lsin(this.direction.main)<0?-1:1)*90,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                        entities.projectiles[entities.projectiles.length-1].speed=8
                    }else{
                        entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-2+a*2,1,(lsin(this.direction.main)<0?-1:1)*(90-2+a*2),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                        entities.projectiles[entities.projectiles.length-1].speed=8-abs(1-a)
                    }
                }
			break
            case 506:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],269,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 507:
                let chance=floor(random(0,4))
				for(let a=0,la=10;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],chance==0?218:1,(lsin(this.direction.main)<0?-90:90)+random(-20,20),this.id,weaponData.damage*damageBuff*(chance==0?10:1),15,crit,this.index))
				}
			break
            case 508:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],270,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,450,crit,this.index))
			break
            case 509:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],271,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,900,crit,this.index))
            break
            case 510:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(lsin(this.direction.main)<0?-120:120)+random(-1,1),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 511:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],217,(lsin(this.direction.main)<0?-90:90)+random(-4,4),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                entities.projectiles[entities.projectiles.length-1].speed=7.5
			break
            case 512:
                for(let a=0,la=4;a<la;a++){
				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,this.time*2+a*90,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                }
			break
            case 513:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],272,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1500,crit,this.index))
            break
            case 514:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],273,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 515:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],274,(lsin(this.direction.main)<0?-90:90)+random(-5,5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 516:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],125,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*0.5,300,crit,this.index))
			break
            case 517:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-2,2),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                if(weapon.uses%6==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1),this.id,weaponData.damage*damageBuff*4,300,crit,this.index))
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1)-5,this.id,weaponData.damage*damageBuff*4,300,crit,this.index))
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(lsin(this.direction.main)<0?-90:90)+random(-0.1,0.1)+5,this.id,weaponData.damage*damageBuff*4,300,crit,this.index))
                }
			break
            case 518:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],275,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,100,crit,this.index))
			break
            case 520:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]-5,276,(lsin(this.direction.main)<0?-90:90)+random(-5,5),this.id,weaponData.damage*damageBuff,10,crit,this.index))
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1]+5,276,(lsin(this.direction.main)<0?-90:90)+random(-5,5),this.id,weaponData.damage*damageBuff,10,crit,this.index))
            break
            case 521:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],277,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 522:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],278,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
                this.velocity.x+=20*(lsin(this.direction.main)<0?1:-1)
                this.lastingForce[0]+=6*(lsin(this.direction.main)<0?1:-1)
			break
			case 523:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],279,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 524:
                for(let a=0,la=3;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],133,(lsin(this.direction.main)<0?-90:90)+random(-0.5,0.5),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=4.5-a
                }
            break
            case 525:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],280,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1800,crit,this.index))
                if(this.id>0&&this.id<=game.gaming){
                    this.disable=true
                }
			break
            case 526:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],281,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 527:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],282,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,360,crit,this.index))
            break
            case 534:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],284+weapon.uses%2*2,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,7200,crit,this.index))
			break
            case 535:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],285,(lsin(this.direction.main)<0?-105:105)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 536:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],287,(lsin(this.direction.main)<0?-90:90)-25+(weapon.uses*19+15)%50,this.id,weaponData.damage*damageBuff,15,crit,this.index))
            break
            case 538:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],289,(lsin(this.direction.main)<0?-105:105)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 539:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],290,(lsin(this.direction.main)<0?-105:105)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
			break
            case 550:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],292,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,360,crit,this.index))
            break
            case 551:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],293,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,180,crit,this.index))
			break
            case 552:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],294,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,300,crit,this.index))
            break
            case 554:
                for(let a=0,la=7;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)-15+a*5,this.id,weaponData.damage*damageBuff,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].speed=6
                }
                if(weapon.uses%5==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],118,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*10,1200,crit,this.index))
                }
            break
            case 555:
				entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                if(weapon.uses%3==0){
				    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],132,(lsin(this.direction.main)<0?-90:90)+random(-3,3),this.id,weaponData.damage*damageBuff*3,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].velocity.x*=10
                    entities.projectiles[entities.projectiles.length-1].velocity.y*=10
                }
			break
            case 556:
                if(floor(random(0,2))==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],125,(lsin(this.direction.main)<0?90:-90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],8,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*0.5,360,crit,this.index))
                }else{
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],125,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,600,crit,this.index))
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],8,(lsin(this.direction.main)<0?90:-90),this.id,weaponData.damage*damageBuff*0.5,360,crit,this.index))
                }
            break
            case 557:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],191,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,1,crit,this.index))
                if(weapon.uses%60==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],118,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*30,1200,crit,this.index))
                }
            break
            case 559:
                if(this.assort.elevate==0){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*0.4,300,crit,this.index))
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],114,(lsin(this.direction.main)<0?90:-90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
                    if(weapon.uses%6==0){
                        entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],118,(lsin(this.direction.main)<0?90:-90),this.id,weaponData.damage*damageBuff*2.4,1200,crit,this.index))
                    }
                }else{
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],114,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff,3600,crit,this.index))
                    if(weapon.uses%3==0){
                        entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],118,(lsin(this.direction.main)<0?-90:90),this.id,weaponData.damage*damageBuff*2.4,1200,crit,this.index))
                    }
                }
			break
            case 560:
                entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],1,(lsin(this.direction.main)<0?-90:90)+random(-2,2),this.id,weaponData.damage*damageBuff,300,crit,this.index))
                if(weapon.uses%12==1){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],117,(lsin(this.direction.main)<0?90:-90),this.id,weaponData.damage*damageBuff*3,240,crit,this.index))
                }
            break
			case 561:
				for(let a=0,la=10;a<la;a++){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],4,(lsin(this.direction.main)<0?-90:90)+random(-4,4),this.id,weaponData.damage*damageBuff,15,crit,this.index))
				}
			break
            case 562:
                let minimum562=[900,900]
                for(let a=0,la=entities.players.length;a<la;a++){
                    if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)<900){
                        let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                        if(entities.players[a].position.x<this.position.x){
                            minimum562[0]=min(minimum562[0],distance)
                        }else if(entities.players[a].position.x>this.position.x){
                            minimum562[1]=min(minimum562[1],distance)
                        }
                    }
                }
                let fired562=[false,false]
                for(let a=0,la=entities.players.length;a<la;a++){
                    if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0){
                        let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                        if(!fired562[0]&&distance==minimum562[0]){
                            entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                            fired562[0]=true
                        }
                        if(!fired562[1]&&distance==minimum562[1]){
                            entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                            fired562[1]=true
                        }
                    }
                }
                if(!fired562[0]){
                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,-90,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                }
                if(!fired562[1]){
                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,90,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                }
                if(weapon.ammo%8==1){
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],125,-90,this.id,weaponData.damage*damageBuff*10,600,crit,this.index))
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],125,90,this.id,weaponData.damage*damageBuff*10,600,crit,this.index))
                }
            break
            case 564:
                entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('ConstructRemote',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].constructify()
                entities.players[entities.players.length-1].builder=this.index
                entities.players[entities.players.length-1].remote=true
                entities.players[entities.players.length-1].direction.goal=this.direction.goal
                this.inspect.push(entities.players[entities.players.length-1].index)
                this.disable=true
            break
            //mark
		}
        if(weapon.uses<=0&&this.id>0&&!game.randomizer&&!bypass){
            switch(variant){
                case 0: this.weaponType=-1
                case 1: this.subWeaponAType=-1
                case 2: this.subWeaponBType=-1
            }
        }
	}
    constructify(){
        this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[160,165,170],body:[150,155,160],legs:[140,145,150],arms:[145,150,155]}}
        this.construct=true
        this.ammoMult*=4
        this.weapon.uses*=4
    }
    validTarget(target){
        return (this.id==0&&target.id!=0||this.id!=0&&target.id==0||game.pvp&&this.id!=target.id)&&target.playerData.name!='PlayerSpy'&&target.fade>0&&!(this.playerData.name=='Buster'&&target.index!=this.target.index)
    }
    med(){
        return this.weaponType==11||this.weaponType==13||this.weaponType==14||this.weaponType==62||this.weaponType==66||this.weaponType==83||this.weaponType==100||this.weaponType==127||this.weaponType==185||this.weaponType==250||this.weaponType==356||this.weaponType==514
    }
    explodable(){
        return this.weaponType!=406&&this.weaponType!=495
    }
    update(){
        let projectilesLength=entities.projectiles.length
        this.attacking=false
        this.time++
        switch(this.weaponType){
            case 6: case 12: case 17: case 45: case 54: case 69: case 75: case 79: case 92: case 93:
            case 132: case 145: case 181: case 237: case 249: case 288: case 293: case 299: case 326: case 368:
            case 369: case 454: case 460: case 465: case 510: case 519: case 530:
                this.infoAnim.bar=[smoothAnim(this.infoAnim.bar[0],lsin(this.direction.main)<0,0,1,5),smoothAnim(this.infoAnim.bar[1],lsin(this.direction.main)>0,0,1,5)]
                if(this.time%10==0){
                    this.pointer.hit=false
                    this.pointer.x=this.position.x
                    this.pointer.y=this.position.y
                }
            break
            case 191: case 202: case 203: case 204: case 205: case 206: case 209: case 211: case 219: case 220:
            case 226: case 228: case 230: case 247: case 263: case 265: case 266: case 267: case 274: case 284:
            case 285: case 287: case 302: case 303: case 304: case 305: case 320: case 322: case 323: case 324:
            case 354: case 355: case 359: case 389: case 408: case 425: case 427: case 428: case 438: case 439:
            case 456: case 487: case 489: case 509: case 513: case 554: case 557:
                this.infoAnim.bar=[smoothAnim(this.infoAnim.bar[0],lsin(this.direction.main)<0,0,1,5),smoothAnim(this.infoAnim.bar[1],lsin(this.direction.main)>0,0,1,5)]
                if(!this.sidekick){
                    if(this.time%5==0){
                        let hit=false
                        if(![191,226,228,230,265,266].includes(this.weaponType)){
                            for(let a=0,la=entities.walls.length;a<la;a++){
                                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                    let c=entities.walls[a][b]
                                    if(
                                        (
                                            (!hit&&c.position.x+c.width/2+10>this.position.x+(lsin(this.direction.main)<0?-450:450)||hit&&c.position.x+c.width/2+10>this.pointer.x)&&c.position.x<this.position.x&&lsin(this.direction.main)<0||
                                            (!hit&&c.position.x-c.width/2-10<this.position.x+(lsin(this.direction.main)<0?-450:450)||hit&&c.position.x-c.width/2-10<this.pointer.x)&&c.position.x>this.position.x&&lsin(this.direction.main)>0
                                        )&&
                                        c.standard&&c.position.y+c.height/2>this.position.y&&c.position.y-c.height/2<this.position.y
                                    ){
                                        if(!hit){
                                            this.pointer.x=this.position.x+(lsin(this.direction.main)<0?-450:450)
                                            this.pointer.y=this.position.y
                                            hit=true
                                        }
                                        this.pointer.x=c.position.x-c.width/2-10
                                    }
                                }
                            }
                        }
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if(
                                (
                                    (!hit&&entities.players[a].position.x+entities.players[a].width/2+10>this.position.x+(lsin(this.direction.main)<0?-450:450)||hit&&entities.players[a].position.x+entities.players[a].width/2+10>this.pointer.x)&&entities.players[a].position.x<this.position.x&&lsin(this.direction.main)<0||
                                    (!hit&&entities.players[a].position.x-entities.players[a].width/2-10<this.position.x+(lsin(this.direction.main)<0?-450:450)||hit&&entities.players[a].position.x-entities.players[a].width/2-10<this.pointer.x)&&entities.players[a].position.x>this.position.x&&lsin(this.direction.main)>0
                                )&&
                                entities.players[a].position.y+entities.players[a].height/2>this.position.y&&entities.players[a].position.y-entities.players[a].height/2<this.position.y
                            ){
                                this.pointer.y=this.position.y
                                hit=true
                                this.pointer.hit=true
                                this.pointer.x=entities.players[a].position.x
                            }
                        }
                        if(!hit){
                            this.pointer.hit=false
                            this.pointer.fails++
                            if(this.pointer.fails>=([191,226,228,230,265,266].includes(this.weaponType)?15:6)){
                                this.pointer.x=this.position.x+(lsin(this.direction.main)<0?-150:150)
                                this.pointer.y=this.position.y
                            }
                        }else{
                            this.pointer.fails=0
                        }
                    }
                }
            break
            case 387:
                if(this.subPlayerAData.name=='PlayerSniper'){
                    this.infoAnim.bar=[smoothAnim(this.infoAnim.bar[0],lsin(this.direction.main)<0,0,1,5),smoothAnim(this.infoAnim.bar[1],lsin(this.direction.main)>0,0,1,5)]
                }
                if(this.time%10==0){
                    this.pointer.hit=false
                    this.pointer.x=this.position.x
                    this.pointer.y=this.position.y
                }
            break
            default:
                if(this.time%10==0){
                    this.pointer.hit=false
                    this.pointer.x=this.position.x
                    this.pointer.y=this.position.y
                }
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
            this.direction.main-=18
        }else if(
            this.direction.main<this.direction.goal&&this.direction.main>this.direction.goal-180||
            this.direction.main<this.direction.goal+360&&this.direction.main>this.direction.goal+180||
            this.direction.main<this.direction.goal-360&&this.direction.main>this.direction.goal-540||
            this.direction.main<this.direction.goal+720&&this.direction.main>this.direction.goal+540||
            this.direction.main<this.direction.goal-720&&this.direction.main>this.direction.goal-900){
            this.direction.main+=18
        }else{
            this.direction.main+=18*randSign()
        }
        if(this.direction.main>180){
            this.direction.main-=360
        }else if(this.direction.main<-180){
            this.direction.main+=360
        }
        let goal=90*sign(this.direction.goal)
        if(abs(this.direction.back-goal)<=3||abs(this.direction.back-goal-360)<=3||abs(this.direction.back-goal+360)<=3||abs(this.direction.back-goal-720)<=3||abs(this.direction.back-goal+720)<=3){
            this.direction.back=goal
        }else if(
            this.direction.back>goal&&this.direction.back<goal+180||
            this.direction.back>goal-360&&this.direction.back<goal-180||
            this.direction.back>goal+360&&this.direction.back<goal+540||
            this.direction.back>goal-720&&this.direction.back<goal-540||
            this.direction.back>goal+720&&this.direction.back<goal+900){
            this.direction.back-=3
        }else if(
            this.direction.back<goal&&this.direction.back>goal-180||
            this.direction.back<goal+360&&this.direction.back>goal+180||
            this.direction.back<goal-360&&this.direction.back>goal-540||
            this.direction.back<goal+720&&this.direction.back>goal+540||
            this.direction.back<goal-720&&this.direction.back>goal-900){
            this.direction.back+=3
        }else{
            this.direction.back+=3*randSign()
        }
        if(this.direction.back>180){
            this.direction.back-=360
        }else if(this.direction.back<-180){
            this.direction.back+=360
        }
        if(this.direction.goal>180){
            this.direction.goal-=360
        }else if(this.direction.goal<-180){
            this.direction.goal+=360
        }
        this.collect.life=this.collect.life*0.9+this.life*0.1
        if(this.weaponType==14||this.weaponType==66||this.playerData.name=='BigHyperPistol'||this.playerData.name=='HyperTank'){
            if(this.active>0){
                if(this.playerData.name=='BigMultiHyperMedic'){
                    if(this.active==659){
                        this.color.skin.head=this.base.color.skin.head
                        this.color.skin.body=this.base.color.skin.body
                        this.color.skin.legs=this.base.color.skin.legs
                        this.color.skin.arms=this.base.color.skin.arms
                    }
                    this.active--
                }else{
                    this.active--
                    if(this.active<=0){
                        this.active=-1
                        this.color=this.base.color
                    }
                }
            }else if(this.active==0&&this.life<this.base.life){
                this.active=this.playerData.name=='BigLongHyperMedic'?600:this.playerData.name=='BigMultiHyperMedic'?900:this.playerData.name=='BigHyperMedic'?360:this.playerData.name=='ShortHyperMedic'?120:240
                this.color.skin.head=mergeColor(this.color.skin.head,[255,255,255],0.6)
                this.color.skin.body=mergeColor(this.color.skin.body,[255,255,255],0.6)
                this.color.skin.legs=mergeColor(this.color.skin.legs,[255,255,255],0.6)
                this.color.skin.arms=mergeColor(this.color.skin.arms,[255,255,255],0.6)
            }
        }else if(this.playerData.name=='HyperPistol'||this.playerData.name=='CritHyperPistol'||this.playerData.name=='HyperCaffeinePistol'||this.playerData.name=='HyperShotgun'||game.brutal&&this.variant==14){
            if(this.active>0){
                this.active--
                if(this.active<=0){
                    this.active=-1
                    this.color=this.base.color
                }
            }else if(this.active==0&&this.life<this.base.life){
                this.active=game.brutal&&this.variant==14?240:120
                if(this.playerData.name=='HyperCaffeinePistol'){
                    this.critBuff=max(this.critBuff,150)
                }
                this.color.skin.head=mergeColor(this.color.skin.head,[255,255,255],0.6)
                this.color.skin.body=mergeColor(this.color.skin.body,[255,255,255],0.6)
                this.color.skin.legs=mergeColor(this.color.skin.legs,[255,255,255],0.6)
                this.color.skin.arms=mergeColor(this.color.skin.arms,[255,255,255],0.6)
            }
        }
        let effectiveWeaponSpeed=this.playerData.name=='PlayerSwitcheroo'?this.subWeaponAData.speed:this.weaponData.speed
        let effectivePlayerSpeed=this.playerData.name=='PlayerSwitcheroo'?this.subPlayerAData.speedBuff:this.playerData.speedBuff
        if(this.construct&&!this.remote){
            if(this.time%15==0){
                let targets=[]
                for(let a=0,la=entities.players.length;a<la;a++){
                    if(
                        this.id==0&&entities.players[a].id!=0&&(entities.players[a].playerData.name!='PlayerSpy'&&entities.players[a].fade>0&&!(this.playerData.name=='Buster'&&entities.players[a].index!=this.target.index))||
                        this.id!=0&&entities.players[a].id==0&&(entities.players[a].playerData.name!='PlayerSpy'&&entities.players[a].fade>0&&!(this.playerData.name=='Buster'&&entities.players[a].index!=this.target.index))||
                        game.pvp&&this.id!=entities.players[a].id||
                        this.weaponType==11&&entities.players[a].life<entities.players[a].base.life*2&&this.index!=entities.players[a].index&&!entities.players[a].playerData.name.includes('Medic')&&this.construct
                    ){
                        if((
                            abs(this.position.x-entities.players[a].position.x)<600&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x-entities.players[a].position.x)/10+25&&this.weaponType!=6&&this.weaponType!=8&&this.weaponType!=11&&this.weaponType!=99||
                            abs(this.position.x-entities.players[a].position.x)<900&&abs(this.position.y-entities.players[a].position.y)<15&&this.weaponType==6||
                            abs(this.position.x-entities.players[a].position.x)<120&&abs(this.position.y-entities.players[a].position.y)<45&&this.weaponType==8||
                            abs(this.position.x-entities.players[a].position.x)<300&&abs(this.position.y-entities.players[a].position.y)<45&&this.weaponType==11||
                            abs(this.position.x-entities.players[a].position.x)<120&&abs(this.position.y-entities.players[a].position.y)<120&&this.weaponType==99
                        )&&entities.players[a].life>0){
                            let b=entities.players[a]
                            let bar=[{position:{x:this.position.x*0.5+b.position.x*0.5,y:this.position.y*0.5+b.position.y*0.5},width:abs(this.position.x-b.position.x),height:abs(this.position.y-b.position.y)}]
                            let valid=true
                            for(let c=0,lc=entities.walls.length;c<lc;c++){
                                for(let d=0,ld=entities.walls[c].length;d<ld;d++){
                                    for(let e=0,le=bar.length;e<le;e++){
                                        if(inBoxBox(entities.walls[c][d],bar[e])&&entities.walls[c][d].standard){
                                            valid=false
                                            c=lc
                                            d=ld
                                            e=le
                                        }
                                    }
                                }
                            }
                            if(valid){
                                targets.push([b.position.x,b.position.y])
                            }
                        }else if((game.level==7||game.level==16)&&(
                            abs(this.position.x-game.edge[0]-entities.players[a].position.x)<600&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x-game.edge[0]-entities.players[a].position.x)/10+25&&this.weaponType!=6&&this.weaponType!=8&&this.weaponType!=11&&this.weaponType!=99||
                            abs(this.position.x-game.edge[0]-entities.players[a].position.x)<900&&abs(this.position.y-entities.players[a].position.y)<15&&this.weaponType==6||
                            abs(this.position.x-game.edge[0]-entities.players[a].position.x)<120&&abs(this.position.y-entities.players[a].position.y)<45&&this.weaponType==8||
                            abs(this.position.x-game.edge[0]-entities.players[a].position.x)<300&&abs(this.position.y-entities.players[a].position.y)<45&&this.weaponType==11||
                            abs(this.position.x-game.edge[0]-entities.players[a].position.x)<120&&abs(this.position.y-entities.players[a].position.y)<120&&this.weaponType==99
                        )&&entities.players[a].life>0){
                            let b=entities.players[a]
                            let bar=[{position:{x:this.position.x*0.5+b.position.x*0.5+game.edge[0]*0.5,y:this.position.y*0.5+b.position.y*0.5},width:abs(this.position.x-b.position.x-game.edge[0]),height:abs(this.position.y-b.position.y)}]
                            let valid=true
                            for(let c=0,lc=entities.walls.length;c<lc;c++){
                                for(let d=0,ld=entities.walls[c].length;d<ld;d++){
                                    for(let e=0,le=bar.length;e<le;e++){
                                        if(inBoxBox(entities.walls[c][d],bar[e])&&entities.walls[c][d].standard){
                                            valid=false
                                            c=lc
                                            d=ld
                                            e=le
                                        }
                                    }
                                }
                            }
                            if(valid){
                                targets.push([b.position.x+game.edge[0],b.position.y])
                            }
                        }else if((game.level==7||game.level==16)&&(
                            abs(this.position.x+game.edge[0]-entities.players[a].position.x)<600&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x+game.edge[0]-entities.players[a].position.x)/10+25&&this.weaponType!=6&&this.weaponType!=8&&this.weaponType!=11&&this.weaponType!=99||
                            abs(this.position.x+game.edge[0]-entities.players[a].position.x)<900&&abs(this.position.y-entities.players[a].position.y)<15&&this.weaponType==6||
                            abs(this.position.x+game.edge[0]-entities.players[a].position.x)<120&&abs(this.position.y-entities.players[a].position.y)<45&&this.weaponType==8||
                            abs(this.position.x+game.edge[0]-entities.players[a].position.x)<300&&abs(this.position.y-entities.players[a].position.y)<45&&this.weaponType==11||
                            abs(this.position.x+game.edge[0]-entities.players[a].position.x)<120&&abs(this.position.y-entities.players[a].position.y)<120&&this.weaponType==99
                        )&&entities.players[a].life>0){
                            let b=entities.players[a]
                            let bar=[{position:{x:this.position.x*0.5+b.position.x*0.5-game.edge[0]*0.5,y:this.position.y*0.5+b.position.y*0.5},width:abs(this.position.x-b.position.x+game.edge[0]),height:abs(this.position.y-b.position.y)}]
                            let valid=true
                            for(let c=0,lc=entities.walls.length;c<lc;c++){
                                for(let d=0,ld=entities.walls[c].length;d<ld;d++){
                                    for(let e=0,le=bar.length;e<le;e++){
                                        if(inBoxBox(entities.walls[c][d],bar[e])&&entities.walls[c][d].standard){
                                            valid=false
                                            c=lc
                                            d=ld
                                            e=le
                                        }
                                    }
                                }
                            }
                            if(valid){
                                targets.push([b.position.x-game.edge[0],b.position.y])
                            }
                        }
                    }
                }
                if(targets.length>0){
                    let target=targets[floor(random(targets.length))]
                    this.target.position.x=target[0]
                    this.target.position.y=target[1]
                    this.direction.goal=target[0]>this.position.x?54:-54
                    this.manage[1]=true
                }else{
                    this.manage[1]=false
                }
            }
            this.attacking=this.manage[1]
            if(this.manage[1]==1&&this.life>0&&this.weapon.cooldown<=0&&this.weapon.ammo>0&&this.life>0&&!this.weapon.reloading){
                this.attack(0)
            }
        }else if(this.id>=game.gaming+1||this.id==0){
            if(floor(random(0,this.id>0?60:10))==0||abs(this.position.x-this.target.position.x)<10){
                if(game.attacker&&this.id==0&&!this.free&&this.playerData.name!='Buster'){
                    let targets=[]
                    this.manage[1]=false
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x)<600&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x-entities.players[a].position.x)/5+25&&entities.players[a].life>0){
                            targets.push([entities.players[a].position.x,entities.players[a].position.y])
                        }
                    }
                    if(targets.length>0){
                        let target=targets[floor(random(targets.length))]
                        this.target.position.x=target[0]+random(-60,60)*(this.weaponData.name.includes('Punch')?0.2:1)
                        this.target.position.y=target[1]
                        this.manage[1]=true
                    }else if(floor(random(0,10))==0){
                        this.target.position.x=this.base.position.x+random(-80,80)
                        this.target.position.y=this.position.y
                    }
                }else if(game.level==6||game.level==8||game.level==17){
                    let targets=[]
                    this.target.position.x=this.position.x
                    this.target.position.y=game.edge[1]*0.1
                    this.manage[1]=false
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x)<400&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x-entities.players[a].position.x)/10+25&&entities.players[a].life>0){
                            targets.push([entities.players[a].position.x,entities.players[a].position.y])
                        }
                    }
                    if(targets.length>0){
                        let target=targets[floor(random(targets.length))]
                        this.target.position.x=target[0]+random(-60,60)
                        this.target.position.y=target[1]
                        this.manage[1]=true
                    }else{
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if(this.validTarget(entities.players[a])&&dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<(game.level==21?600:1000)&&entities.players[a].life>0){
                                targets.push([entities.players[a].position.x,entities.players[a].position.y])
                            }
                        }
                        if(targets.length==0&&game.level==8){
                            for(let a=0,la=entities.players.length;a<la;a++){
                                if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x)<1500&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x-entities.players[a].position.x)/5+25&&entities.players[a].life>0){
                                    targets.push([entities.players[a].position.x,entities.players[a].position.y])
                                }
                            }
                            if(targets.length==0){
                                for(let a=0,la=entities.players.length;a<la;a++){
                                    if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x)<2500&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x-entities.players[a].position.x)/5+50&&entities.players[a].life>0){
                                        targets.push([entities.players[a].position.x,entities.players[a].position.y])
                                    }
                                }
                                if(targets.length==0){
                                    for(let a=0,la=entities.players.length;a<la;a++){
                                        if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x)<5000&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x-entities.players[a].position.x)/5+100&&entities.players[a].life>0){
                                            targets.push([entities.players[a].position.x,entities.players[a].position.y])
                                        }
                                    }
                                }
                            }
                        }
                        if(targets.length>0){
                            let target=targets[floor(random(targets.length))]
                            this.target.position.y=target[1]
                            if(this.target.position.y>this.position.y-(game.level==20||game.level==21?500:game.level==8?400:100)){
                                if(this.target.position.y<this.position.y+(game.level==20||game.level==21?500:game.level==8?400:100)){
                                    this.target.position.x=target[0]+random(-80,80)
                                }else{
                                    targets=[]
                                    for(let a=0,la=entities.walls.length;a<la;a++){
                                        for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                            let c=entities.walls[a][b]
                                            if((c.type==2||c.type==25||c.type==29)&&abs(this.position.x-c.position.x)<400&&abs(this.position.y+240-c.position.y)<80){
                                                targets.push([c.position.x,c.position.y-c.height/2])
                                            }
                                        }
                                    }
                                    if(targets.length>0){
                                        target=targets[floor(random(targets.length))]
                                        this.target.position.x=target[0]+random(-20,20)*(this.weaponData.name.includes('Punch')?0.2:1)
                                    }else{
                                        this.target.position.x=target[0]+random(-150,150)*(this.weaponData.name.includes('Punch')?0.2:1)
                                    }
                                }
                            }else{
                                targets=[]
                                for(let a=0,la=entities.walls.length;a<la;a++){
                                    for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                        let c=entities.walls[a][b]
                                        if((c.type==2||c.type==25||c.type==29)&&abs(this.position.x-c.position.x)<400&&abs(this.position.y-c.position.y)<80){
                                            targets.push([c.position.x,c.position.y-c.height/2])
                                        }
                                    }
                                }
                                if(targets.length>0){
                                    target=targets[floor(random(targets.length))]
                                    this.target.position.x=target[0]+random(-20,20)*(this.weaponData.name.includes('Punch')?0.2:1)
                                }else{
                                    this.target.position.x=target[0]+random(-150,150)*(this.weaponData.name.includes('Punch')?0.2:1)
                                }
                            }
                        }else{
                            for(let a=0,la=entities.players.length;a<la;a++){
                                if(this.validTarget(entities.players[a])&&entities.players[a].life>0){
                                    targets.push([entities.players[a].position.x,entities.players[a].position.y])
                                }
                            }
                            if(targets.length>0){
                                let target=targets[floor(random(targets.length))]
                                this.target.position.y=target[1]
                                if(this.target.position.y>this.position.y-50){
                                    if(this.target.position.y<this.position.y+50){
                                        this.target.position.x=target[0]
                                    }else{
                                        targets=[]
                                        for(let a=0,la=entities.walls.length;a<la;a++){
                                            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                                let c=entities.walls[a][b]
                                                if((c.type==2||c.type==25||c.type==29)&&abs(this.position.x-c.position.x)<400&&abs(this.position.y+240-c.position.y)<80){
                                                    targets.push([c.position.x,c.position.y-c.height/2])
                                                }
                                            }
                                        }
                                        if(targets.length>0){
                                            target=targets[floor(random(targets.length))]
                                            this.target.position.x=target[0]+random(-20,20)*(this.weaponData.name.includes('Punch')?0.2:1)
                                        }else{
                                            this.target.position.x=target[0]+random(-150,150)*(this.weaponData.name.includes('Punch')?0.2:1)
                                        }
                                    }
                                }else{
                                    targets=[]
                                    for(let a=0,la=entities.walls.length;a<la;a++){
                                        for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                            let c=entities.walls[a][b]
                                            if((c.type==2||c.type==25||c.type==29)&&abs(this.position.x-c.position.x)<400&&abs(this.position.y-c.position.y)<80){
                                                targets.push([c.position.x,c.position.y-c.height/2])
                                            }
                                        }
                                    }
                                    if(targets.length>0){
                                        target=targets[floor(random(targets.length))]
                                        this.target.position.x=target[0]+random(-20,20)*(this.weaponData.name.includes('Punch')?0.2:1)
                                    }else{
                                        this.target.position.x=target[0]+random(-150,150)*(this.weaponData.name.includes('Punch')?0.2:1)
                                    }
                                }
                            }else{
                                this.target.position.x=game.edge[0]*random(0.2,0.8)
                                this.target.position.y=game.edge[1]/10
                            }
                        }
                    }
                }else if(game.level==7){
                    let targets=[]
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(this.validTarget(entities.players[a])&&(
                            dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<300
                        )&&entities.players[a].life>0){
                            targets.push([entities.players[a].position.x,entities.players[a].position.y])
                        }
                        if(this.validTarget(entities.players[a])&&(
                            dist(this.position.x,this.position.y,entities.players[a].position.x-game.edge[0],entities.players[a].position.y)<300
                        )&&entities.players[a].life>0){
                            targets.push([entities.players[a].position.x-game.edge[0],entities.players[a].position.y])
                        }
                        if(this.validTarget(entities.players[a])&&(
                            dist(this.position.x,this.position.y,entities.players[a].position.x+game.edge[0],entities.players[a].position.y)<300
                        )&&entities.players[a].life>0){
                            targets.push([entities.players[a].position.x+game.edge[0],entities.players[a].position.y])
                        }
                        if(this.validTarget(entities.players[a])&&(
                            dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y-game.edge[1])<300
                        )&&entities.players[a].life>0){
                            targets.push([entities.players[a].position.x,entities.players[a].position.y-game.edge[1]])
                        }
                        if(this.validTarget(entities.players[a])&&(
                            dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y+game.edge[1])<300
                        )&&entities.players[a].life>0){
                            targets.push([entities.players[a].position.x,entities.players[a].position.y+game.edge[1]])
                        }
                    }
                    if(targets.length>0){
                        let target=targets[floor(random(targets.length))]
                        this.target.position.x=target[0]+random(-240,240)*(this.weaponData.name.includes('Punch')?0.2:1)
                        this.target.position.y=target[1]
                        this.manage[1]=1
                    }else{
                        this.target.position.x+=random(-game.edge[0]*0.1,game.edge[0]*0.1)
                        this.target.position.y+=random(-game.edge[1]*0.1,game.edge[1]*0.1)
                        if(this.target.position.x<0){
                            this.target.position.x+=game.edge[0]
                        }else if(this.target.position.x>game.edge[0]){
                            this.target.position.x-=game.edge[0]
                        }
                        if(this.target.position.y<0){
                            this.target.position.y+=game.edge[1]
                        }else if(this.target.position.y>game.edge[1]){
                            this.target.position.y-=game.edge[1]
                        }
                        this.manage[1]=0
                    }
                }else if(game.level==15||game.level==18||game.level==19){
                    let targets=[]
                    this.target.position.x=this.position.x
                    this.target.position.y=game.edge[1]*0.1
                    this.manage[1]=false
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x)<500&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x-entities.players[a].position.x)*0.3+25&&entities.players[a].life>0){
                            targets.push([entities.players[a].position.x,entities.players[a].position.y])
                        }
                    }
                    if(targets.length>0){
                        let target=targets[floor(random(targets.length))]
                        this.target.position.x=target[0]+random(-60,60)
                        this.target.position.y=target[1]
                        this.manage[1]=true
                    }else{
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x)<1000&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x-entities.players[a].position.x)*0.4+25&&entities.players[a].life>0){
                                targets.push([entities.players[a].position.x,entities.players[a].position.y])
                            }
                        }
                        if(targets.length>0){
                            let target=targets[floor(random(targets.length))]
                            this.target.position.x=target[0]+random(-60,60)
                            this.target.position.y=target[1]
                        }else{
                            for(let a=0,la=entities.players.length;a<la;a++){
                                if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x)>=1000&&entities.players[a].life>0){
                                    targets.push([entities.players[a].position.x,entities.players[a].position.y])
                                }
                            }
                            if(targets.length>0){
                                let target=targets[floor(random(targets.length))]
                                this.target.position.x=target[0]+random(-60,60)
                                this.target.position.y=target[1]
                            }else{
                                for(let a=0,la=entities.players.length;a<la;a++){
                                    if(this.validTarget(entities.players[a])&&dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<1200&&entities.players[a].life>0){
                                        targets.push([entities.players[a].position.x,entities.players[a].position.y])
                                    }
                                }
                                if(targets.length>0){
                                    let target=targets[floor(random(targets.length))]
                                    this.target.position.y=target[1]
                                    if(this.target.position.y>this.position.y-50){
                                        if(this.target.position.y<this.position.y+50){
                                            this.target.position.x=target[0]
                                        }else{
                                            targets=[]
                                            for(let a=0,la=entities.walls.length;a<la;a++){
                                                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                                    let c=entities.walls[a][b]
                                                    if((c.type==2||c.type==25||c.type==29)&&abs(this.position.x-c.position.x)<400&&abs(this.position.y+240-c.position.y)<80){
                                                        targets.push([c.position.x,c.position.y-c.height/2])
                                                    }
                                                }
                                            }
                                            if(targets.length>0){
                                                target=targets[floor(random(targets.length))]
                                                this.target.position.x=target[0]+random(-20,20)*(this.weaponData.name.includes('Punch')?0.2:1)
                                            }else{
                                                this.target.position.x=target[0]+random(-150,150)*(this.weaponData.name.includes('Punch')?0.2:1)
                                            }
                                        }
                                    }else{
                                        targets=[]
                                        for(let a=0,la=entities.walls.length;a<la;a++){
                                            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                                let c=entities.walls[a][b]
                                                if((c.type==2||c.type==25||c.type==29)&&abs(this.position.x-c.position.x)<400&&abs(this.position.y-c.position.y)<80){
                                                    targets.push([c.position.x,c.position.y-c.height/2])
                                                }
                                            }
                                        }
                                        if(targets.length>0){
                                            target=targets[floor(random(targets.length))]
                                            this.target.position.x=target[0]+random(-20,20)*(this.weaponData.name.includes('Punch')?0.2:1)
                                        }else{
                                            this.target.position.x=target[0]+random(-150,150)*(this.weaponData.name.includes('Punch')?0.2:1)
                                        }
                                    }
                                }else{
                                    for(let a=0,la=entities.players.length;a<la;a++){
                                        if(this.validTarget(entities.players[a])&&entities.players[a].life>0){
                                            targets.push([entities.players[a].position.x,entities.players[a].position.y])
                                        }
                                    }
                                    if(targets.length>0){
                                        let target=targets[floor(random(targets.length))]
                                        this.target.position.y=target[1]
                                        if(this.target.position.y>this.position.y-50){
                                            if(this.target.position.y<this.position.y+50){
                                                this.target.position.x=target[0]
                                            }else{
                                                targets=[]
                                                for(let a=0,la=entities.walls.length;a<la;a++){
                                                    for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                                        let c=entities.walls[a][b]
                                                        if((c.type==2||c.type==25||c.type==29)&&abs(this.position.x-c.position.x)<400&&abs(this.position.y+240-c.position.y)<80){
                                                            targets.push([c.position.x,c.position.y-c.height/2])
                                                        }
                                                    }
                                                }
                                                if(targets.length>0){
                                                    target=targets[floor(random(targets.length))]
                                                    this.target.position.x=target[0]+random(-20,20)*(this.weaponData.name.includes('Punch')?0.2:1)
                                                }else{
                                                    this.target.position.x=target[0]+random(-150,150)*(this.weaponData.name.includes('Punch')?0.2:1)
                                                }
                                            }
                                        }else{
                                            targets=[]
                                            for(let a=0,la=entities.walls.length;a<la;a++){
                                                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                                    let c=entities.walls[a][b]
                                                    if((c.type==2||c.type==25||c.type==29)&&abs(this.position.x-c.position.x)<400&&abs(this.position.y-c.position.y)<80){
                                                        targets.push([c.position.x,c.position.y-c.height/2])
                                                    }
                                                }
                                            }
                                            if(targets.length>0){
                                                target=targets[floor(random(targets.length))]
                                                this.target.position.x=target[0]+random(-20,20)*(this.weaponData.name.includes('Punch')?0.2:1)
                                            }else{
                                                this.target.position.x=target[0]+random(-150,150)*(this.weaponData.name.includes('Punch')?0.2:1)
                                            }
                                        }
                                    }else{
                                        this.target.position.x=game.edge[0]*random(0.2,0.8)
                                        this.target.position.y=game.edge[1]/10
                                    }
                                }
                            }
                        }
                    }
                }else if(game.level==16){
                    let targets=[]
                    this.target.position.x=this.position.x
                    this.target.position.y=game.edge[1]*0.1
                    this.manage[1]=false
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x)<500&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x-entities.players[a].position.x)*0.3+25&&entities.players[a].life>0){
                            targets.push([entities.players[a].position.x,entities.players[a].position.y])
                        }else if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x-game.edge[0])<500&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x-entities.players[a].position.x-game.edge[0])*0.3+25&&entities.players[a].life>0){
                            targets.push([entities.players[a].position.x-game.edge[0],entities.players[a].position.y])
                        }else if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x+game.edge[0])<500&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x-entities.players[a].position.x+game.edge[0])*0.3+25&&entities.players[a].life>0){
                            targets.push([entities.players[a].position.x+game.edge[0],entities.players[a].position.y])
                        }
                    }
                    if(targets.length>0){
                        let target=targets[floor(random(targets.length))]
                        this.target.position.x=target[0]+random(-60,60)
                        this.target.position.y=target[1]
                        this.manage[1]=true
                    }else{
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x)<1000&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x-entities.players[a].position.x)*0.4+25&&entities.players[a].life>0){
                                targets.push([entities.players[a].position.x,entities.players[a].position.y])
                            }else if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x-game.edge[0])<1000&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x-entities.players[a].position.x-game.edge[0])*0.4+25&&entities.players[a].life>0){
                                targets.push([entities.players[a].position.x-game.edge[0],entities.players[a].position.y])
                            }else if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x+game.edge[0])<1000&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x-entities.players[a].position.x+game.edge[0])*0.4+25&&entities.players[a].life>0){
                                targets.push([entities.players[a].position.x+game.edge[0],entities.players[a].position.y])
                            }
                        }
                        if(targets.length>0){
                            let target=targets[floor(random(targets.length))]
                            this.target.position.x=target[0]+random(-60,60)
                            this.target.position.y=target[1]
                            this.manage[1]=true
                        }else{
                            for(let a=0,la=entities.players.length;a<la;a++){
                                if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x)>=1000&&entities.players[a].life>0){
                                    targets.push([entities.players[a].position.x,entities.players[a].position.y])
                                }else if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x-game.edge[0])>=1000&&entities.players[a].life>0){
                                    targets.push([entities.players[a].position.x-game.edge[0],entities.players[a].position.y])
                                }else if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x+game.edge[0])>=1000&&entities.players[a].life>0){
                                    targets.push([entities.players[a].position.x+game.edge[0],entities.players[a].position.y])
                                }
                            }
                            if(targets.length>0){
                                let target=targets[floor(random(targets.length))]
                                this.target.position.x=target[0]+random(-60,60)
                                this.target.position.y=target[1]
                                this.manage[1]=true
                            }else{
                                for(let a=0,la=entities.players.length;a<la;a++){
                                    if(this.validTarget(entities.players[a])&&dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<1200&&entities.players[a].life>0){
                                        targets.push([entities.players[a].position.x,entities.players[a].position.y])
                                    }else if(this.validTarget(entities.players[a])&&dist(this.position.x,this.position.y,entities.players[a].position.x-game.edge[0],entities.players[a].position.y)<1200&&entities.players[a].life>0){
                                        targets.push([entities.players[a].position.x-game.edge[0],entities.players[a].position.y])
                                    }else if(this.validTarget(entities.players[a])&&dist(this.position.x,this.position.y,entities.players[a].position.x+game.edge[0],entities.players[a].position.y)<1200&&entities.players[a].life>0){
                                        targets.push([entities.players[a].position.x+game.edge[0],entities.players[a].position.y])
                                    }
                                }
                                if(targets.length>0){
                                    let target=targets[floor(random(targets.length))]
                                    this.target.position.y=target[1]
                                    if(this.target.position.y>this.position.y-50){
                                        if(this.target.position.y<this.position.y+50){
                                            this.target.position.x=target[0]
                                        }else{
                                            targets=[]
                                            for(let a=0,la=entities.walls.length;a<la;a++){
                                                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                                    let c=entities.walls[a][b]
                                                    if((c.type==2||c.type==25||c.type==29)&&abs(this.position.x-c.position.x)<400&&abs(this.position.y+240-c.position.y)<80){
                                                        targets.push([c.position.x,c.position.y-c.height/2])
                                                    }
                                                }
                                            }
                                            if(targets.length>0){
                                                target=targets[floor(random(targets.length))]
                                                this.target.position.x=target[0]+random(-20,20)*(this.weaponData.name.includes('Punch')?0.2:1)
                                            }else{
                                                this.target.position.x=target[0]+random(-150,150)*(this.weaponData.name.includes('Punch')?0.2:1)
                                            }
                                        }
                                    }else{
                                        targets=[]
                                        for(let a=0,la=entities.walls.length;a<la;a++){
                                            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                                let c=entities.walls[a][b]
                                                if((c.type==2||c.type==25||c.type==29)&&abs(this.position.x-c.position.x)<400&&abs(this.position.y-c.position.y)<80){
                                                    targets.push([c.position.x,c.position.y-c.height/2])
                                                }
                                            }
                                        }
                                        if(targets.length>0){
                                            target=targets[floor(random(targets.length))]
                                            this.target.position.x=target[0]+random(-20,20)*(this.weaponData.name.includes('Punch')?0.2:1)
                                        }else{
                                            this.target.position.x=target[0]+random(-150,150)*(this.weaponData.name.includes('Punch')?0.2:1)
                                        }
                                    }
                                }else{
                                    for(let a=0,la=entities.players.length;a<la;a++){
                                        if(this.validTarget(entities.players[a])&&entities.players[a].life>0){
                                            targets.push([entities.players[a].position.x,entities.players[a].position.y])
                                        }else if(this.validTarget(entities.players[a])&&entities.players[a].life>0){
                                            targets.push([entities.players[a].position.x-game.edge[0],entities.players[a].position.y])
                                        }else if(this.validTarget(entities.players[a])&&entities.players[a].life>0){
                                            targets.push([entities.players[a].position.x+game.edge[0],entities.players[a].position.y])
                                        }
                                    }
                                    if(targets.length>0){
                                        let target=targets[floor(random(targets.length))]
                                        this.target.position.y=target[1]
                                        if(this.target.position.y>this.position.y-50){
                                            if(this.target.position.y<this.position.y+50){
                                                this.target.position.x=target[0]
                                            }else{
                                                targets=[]
                                                for(let a=0,la=entities.walls.length;a<la;a++){
                                                    for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                                        let c=entities.walls[a][b]
                                                        if((c.type==2||c.type==25||c.type==29)&&abs(this.position.x-c.position.x)<400&&abs(this.position.y+240-c.position.y)<80){
                                                            targets.push([c.position.x,c.position.y-c.height/2])
                                                        }
                                                    }
                                                }
                                                if(targets.length>0){
                                                    target=targets[floor(random(targets.length))]
                                                    this.target.position.x=target[0]+random(-20,20)*(this.weaponData.name.includes('Punch')?0.2:1)
                                                }else{
                                                    this.target.position.x=target[0]+random(-150,150)*(this.weaponData.name.includes('Punch')?0.2:1)
                                                }
                                            }
                                        }else{
                                            targets=[]
                                            for(let a=0,la=entities.walls.length;a<la;a++){
                                                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                                    let c=entities.walls[a][b]
                                                    if((c.type==2||c.type==25||c.type==29)&&abs(this.position.x-c.position.x)<400&&abs(this.position.y-c.position.y)<80){
                                                        targets.push([c.position.x,c.position.y-c.height/2])
                                                    }
                                                }
                                            }
                                            if(targets.length>0){
                                                target=targets[floor(random(targets.length))]
                                                this.target.position.x=target[0]+random(-20,20)*(this.weaponData.name.includes('Punch')?0.2:1)
                                            }else{
                                                this.target.position.x=target[0]+random(-150,150)*(this.weaponData.name.includes('Punch')?0.2:1)
                                            }
                                        }
                                    }else{
                                        this.target.position.x=game.edge[0]*random(0.2,0.8)
                                        this.target.position.y=game.edge[1]/10
                                    }
                                }
                            }
                        }
                    }
                }else if(game.level==20||game.level==21){
                    let targets=[]
                    this.target.position.x=this.position.x
                    this.target.position.y=game.edge[1]*0.1
                    this.manage[1]=false
                    let valid=true
                    for(let a=0,la=entities.players.length;a<la;a++){
                        let b=entities.players[a]
                        if(this.validTarget(b)&&abs(this.position.x-b.position.x)<800&&(abs(this.position.y+100-b.position.y)<300||game.level==21&&this.position.y>game.edge[1]*0.8-50)&&b.life>0){
                            let bar
                            if(b.position.y>this.position.y-50){
                                bar=[
                                    {position:{x:this.position.x*0.5+b.position.x*0.5,y:this.position.y},width:abs(this.position.x-b.position.x),height:1},
                                    {position:{x:b.position.x,y:this.position.y*0.5+b.position.y*0.5},width:1,height:abs(this.position.y-b.position.y)}
                                ]
                            }else{
                                bar=[{position:{x:this.position.x*0.5+b.position.x*0.5,y:this.position.y*0.5+b.position.y*0.5},width:abs(this.position.x-b.position.x),height:abs(this.position.y-b.position.y)}]
                            }
                            valid=true
                            for(let c=0,lc=entities.walls.length;c<lc;c++){
                                for(let d=0,ld=entities.walls[c].length;d<ld;d++){
                                    for(let e=0,le=bar.length;e<le;e++){
                                        if(inBoxBox(entities.walls[c][d],bar[e])&&entities.walls[c][d].standard){
                                            valid=false
                                            c=lc
                                            d=ld
                                            e=le
                                        }
                                    }
                                }
                            }
                            if(valid){
                                targets.push([b.position.x,b.position.y])
                            }
                        }
                    }
                    if(targets.length==0){
                        for(let a=0,la=entities.players.length;a<la;a++){
                            let b=entities.players[a]
                            if(this.validTarget(b)&&abs(this.position.x-b.position.x)<1600&&(abs(this.position.y+100-b.position.y)<400||game.level==21&&this.position.y>game.edge[1]*0.8-50)&&b.life>0){
                                let bar
                                if(b.position.y>this.position.y-50){
                                    bar=[
                                        {position:{x:this.position.x*0.5+b.position.x*0.5,y:this.position.y},width:abs(this.position.x-b.position.x),height:1},
                                        {position:{x:b.position.x,y:this.position.y*0.5+b.position.y*0.5},width:1,height:abs(this.position.y-b.position.y)}
                                    ]
                                }else{
                                    bar=[{position:{x:this.position.x*0.5+b.position.x*0.5,y:this.position.y*0.5+b.position.y*0.5},width:abs(this.position.x-b.position.x),height:abs(this.position.y-b.position.y)}]
                                }
                                valid=true
                                for(let c=0,lc=entities.walls.length;c<lc;c++){
                                    for(let d=0,ld=entities.walls[c].length;d<ld;d++){
                                        for(let e=0,le=bar.length;e<le;e++){
                                            if(inBoxBox(entities.walls[c][d],bar[e])&&entities.walls[c][d].standard){
                                                valid=false
                                                c=lc
                                                d=ld
                                                e=le
                                            }
                                        }
                                    }
                                }
                                if(valid){
                                    targets.push([b.position.x,b.position.y])
                                }
                            }
                        }
                        if(targets.length==0){
                            for(let a=0,la=entities.players.length;a<la;a++){
                                let b=entities.players[a]
                                if(this.validTarget(b)&&abs(this.position.x-b.position.x)<3000&&(abs(this.position.y+100-b.position.y)<500||game.level==21&&this.position.y>game.edge[1]*0.8-50)&&b.life>0){
                                    let bar
                                    if(b.position.y>this.position.y-50){
                                        bar=[
                                            {position:{x:this.position.x*0.5+b.position.x*0.5,y:this.position.y},width:abs(this.position.x-b.position.x),height:1},
                                            {position:{x:b.position.x,y:this.position.y*0.5+b.position.y*0.5},width:1,height:abs(this.position.y-b.position.y)}
                                        ]
                                    }else{
                                        bar=[{position:{x:this.position.x*0.5+b.position.x*0.5,y:this.position.y*0.5+b.position.y*0.5},width:abs(this.position.x-b.position.x),height:abs(this.position.y-b.position.y)}]
                                    }
                                    valid=true
                                    for(let c=0,lc=entities.walls.length;c<lc;c++){
                                        for(let d=0,ld=entities.walls[c].length;d<ld;d++){
                                            for(let e=0,le=bar.length;e<le;e++){
                                                if(inBoxBox(entities.walls[c][d],bar[e])&&entities.walls[c][d].standard){
                                                    valid=false
                                                    c=lc
                                                    d=ld
                                                    e=le
                                                }
                                            }
                                        }
                                    }
                                    if(valid){
                                        targets.push([b.position.x,b.position.y])
                                    }
                                }
                            }
                        }
                    }
                    if(targets.length>0){
                        let target=targets[floor(random(targets.length))]
                        this.target.position.x=target[0]+random(-60,60)*(this.weaponData.name.includes('Punch')?0.2:1)
                        this.target.position.y=target[1]
                        if(abs(this.target.position.x-this.position.x)<600){
                            this.manage[1]=true
                        }
                    }else{
                        for(let a=0,la=entities.players.length;a<la;a++){
                            let b=entities.players[a]
                            if(this.validTarget(b)&&abs(this.position.x-b.position.x)<800&&abs(this.position.y-b.position.y)<600&&b.life>0){
                                targets.push([b.position.x,b.position.y])
                            }
                        }
                        if(targets.length==0){
                            for(let a=0,la=entities.players.length;a<la;a++){
                                let b=entities.players[a]
                                if(this.validTarget(b)&&abs(this.position.x-b.position.x)<1200&&abs(this.position.y-b.position.y)<900&&b.life>0){
                                    targets.push([b.position.x,b.position.y])
                                }
                            }
                            if(targets.length==0){
                                for(let a=0,la=entities.players.length;a<la;a++){
                                    let b=entities.players[a]
                                    if(this.validTarget(b)&&abs(this.position.x-b.position.x)<2000&&abs(this.position.y-b.position.y)<1500&&b.life>0){
                                        targets.push([b.position.x,b.position.y])
                                    }
                                }
                                if(targets.length==0){
                                    for(let a=0,la=entities.players.length;a<la;a++){
                                        let b=entities.players[a]
                                        if(this.validTarget(b)&&abs(this.position.x-b.position.x)<4000&&abs(this.position.y-b.position.y)<3000&&b.life>0){
                                            targets.push([b.position.x,b.position.y])
                                        }
                                    }
                                    if(targets.length==0){
                                        for(let a=0,la=entities.players.length;a<la;a++){
                                            let b=entities.players[a]
                                            if(this.validTarget(b)&&b.life>0){
                                                targets.push([b.position.x,b.position.y])
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if(targets.length>0){
                            let target=targets[floor(random(targets.length))]
                            if(target[1]<this.position.y+50){
                                targets=[]
                                for(let a=0,la=entities.walls.length;a<la;a++){
                                    for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                        let c=entities.walls[a][b]
                                        if((c.type==2||c.type==25||c.type==29)&&(abs(this.position.x-c.position.x)<1200||abs(target[0]-c.position.x)<1200)&&c.position.y<this.position.y+300&&c.position.y>this.position.y-100){
                                            let bar={position:{x:this.position.x*0.5+c.position.x*0.5,y:this.position.y*0.5+(c.position.y-c.height/2-10)*0.5},width:abs(this.position.x-c.position.x),height:abs(this.position.y-(c.position.y-c.height/2-10))}
                                            valid=true
                                            for(let d=0,ld=entities.walls.length;d<ld;d++){
                                                for(let e=0,le=entities.walls[d].length;e<le;e++){
                                                    if(inBoxBox(entities.walls[d][e],bar)&&entities.walls[d][e].standard){
                                                        valid=false
                                                        d=ld
                                                        e=le
                                                    }
                                                }
                                            }
                                            if(valid){
                                                targets.push([c.position.x,c.position.y-c.height/2])
                                            }
                                        }
                                    }
                                }
                            }
                            if(target[1]>this.position.y-50||targets.length==0){
                                targets=[]
                                for(let a=0,la=entities.walls.length;a<la;a++){
                                    for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                        let c=entities.walls[a][b]
                                        if((c.type==2||c.type==25||c.type==29)&&(abs(this.position.x-c.position.x)<1200||abs(target[0]-c.position.x)<1200)&&c.position.y>this.position.y+100&&c.position.y<this.position.y+900){
                                            let bar={position:{x:this.position.x*0.5+c.position.x*0.5,y:this.position.y},width:abs(this.position.x-c.position.x),height:1}
                                            valid=true
                                            for(let d=0,ld=entities.walls.length;d<ld;d++){
                                                for(let e=0,le=entities.walls[d].length;e<le;e++){
                                                    if(inBoxBox(entities.walls[d][e],bar)&&entities.walls[d][e].standard){
                                                        valid=false
                                                        d=ld
                                                        e=le
                                                    }
                                                }
                                            }
                                            if(valid){
                                                targets.push([c.position.x,c.position.y-c.height/2])
                                            }
                                        }
                                    }
                                }
                            }
                            if(targets.length>0){
                                target=targets[floor(random(targets.length))]
                                this.target.position.x=target[0]+random(-20,20)*(this.weaponData.name.includes('Punch')?0.2:1)
                            }else{
                                this.target.position.x=target[0]+random(-150,150)*(this.weaponData.name.includes('Punch')?0.2:1)
                            }
                        }else{
                            this.target.position.x=this.position.x+random(-120,120)*(this.weaponData.name.includes('Punch')?0.2:1)
                            this.target.position.y=this.position.y
                        }
                    }
                }else{
                    let targets=[]
                    switch(game.level){
                        case 1:
                            this.target.position.x=game.edge[0]/2
                            this.target.position.y=game.edge[1]/5
                        break
                        case 5:
                            this.target.position.x=150
                            this.target.position.y=game.edge[1]-320
                        break
                    }
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x)<240&&abs(this.position.y-entities.players[a].position.y)<80&&entities.players[a].life>0){
                            targets.push([entities.players[a].position.x,entities.players[a].position.y])
                        }
                    }
                    if(targets.length>0){
                        let target=targets[floor(random(targets.length))]
                        this.target.position.x=target[0]+random(-60,60)*(this.weaponData.name.includes('Punch')?0.2:1)
                        this.target.position.y=target[1]
                    }else{
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((this.id==0&&entities.players[a].id!=0&&(entities.players[a].playerData.name!='PlayerSpy'&&entities.players[a].fade>0&&!(this.playerData.name=='Buster'&&entities.players[a].index!=this.target.index))||this.id!=0&&entities.players[a].id==0&&(entities.players[a].playerData.name!='PlayerSpy'&&entities.players[a].fade>0&&!(this.playerData.name=='Buster'&&entities.players[a].index!=this.target.index)))&&dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<300&&entities.players[a].life>0){
                                targets.push([entities.players[a].position.x,entities.players[a].position.y])
                            }
                        }
                        if(targets.length>0){
                            let target=targets[floor(random(targets.length))]
                            this.target.position.x=target[0]+random(-120,120)
                            this.target.position.y=target[1]
                        }else{
                            for(let a=0,la=entities.players.length;a<la;a++){
                                if((this.id==0&&entities.players[a].id!=0&&(entities.players[a].playerData.name!='PlayerSpy'&&entities.players[a].fade>0&&!(this.playerData.name=='Buster'&&entities.players[a].index!=this.target.index))||this.id!=0&&entities.players[a].id==0&&(entities.players[a].playerData.name!='PlayerSpy'&&entities.players[a].fade>0&&!(this.playerData.name=='Buster'&&entities.players[a].index!=this.target.index)))&&dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<1500&&entities.players[a].life>0){
                                    targets.push([entities.players[a].position.x,entities.players[a].position.y])
                                }
                            }
                            if(targets.length>0){
                                let target=targets[floor(random(targets.length))]
                                this.target.position.x=target[0]+random(-120,120)
                                this.target.position.y=target[1]
                            }else{
                                for(let a=0,la=entities.players.length;a<la;a++){
                                    if((this.id==0&&entities.players[a].id!=0&&(entities.players[a].playerData.name!='PlayerSpy'&&entities.players[a].fade>0&&!(this.playerData.name=='Buster'&&entities.players[a].index!=this.target.index))||this.id!=0&&entities.players[a].id==0&&(entities.players[a].playerData.name!='PlayerSpy'&&entities.players[a].fade>0&&!(this.playerData.name=='Buster'&&entities.players[a].index!=this.target.index)))&&entities.players[a].life>0){
                                        targets.push([entities.players[a].position.x,entities.players[a].position.y])
                                    }
                                }
                                if(targets.length>0){
                                    let target=targets[floor(random(targets.length))]
                                    this.target.position.x=target[0]+random(-120,120)
                                    this.target.position.y=target[1]
                                }
                            }
                        }
                    }
                    this.manage[1]=dist(this.position.x,this.position.y,this.target.position.x,this.target.position.y)<500?1:0
                }
                if(this.playerData.name=='ParaPistol'||this.playerData.name=='ParaRocketLauncher'||this.playerData.name=='ParaGrenadier'||this.playerData.name=='PlayerStratofortress'||this.playerData.name=='PlayerParachutist'||this.playerData.name=='PlayerDropship'||this.playerData.name=='PlayerApache'||this.playerData.name=='BigParaRocketLauncher'||this.playerData.name=='BigCritParaRocketLauncher'||this.playerData.name=='PlayerRadio'||this.playerData.name=='PlayerWhirlybird'||this.playerData.name=='PlayerRain'||this.playerData.name=='PlayerRTX'||this.playerData.name=='PlayerAircraft'){
                    this.manage[1]=1
                }
            }
            if(this.disable){
                this.manage[1]=false
                for(let a=0,la=entities.players.length;a<la;a++){
                    if(this.validTarget(entities.players[a])&&abs(this.position.x-entities.players[a].position.x)<400&&entities.players[a].position.x>this.position.x-50&&abs(this.position.y-entities.players[a].position.y)<abs(this.position.x-entities.players[a].position.x)/10+25&&entities.players[a].life>0){
                        this.manage[1]=true
                        this.direction.goal=entities.players[a].position.x>this.position.x?54:-54
                        a=la
                    }
                }
                this.attacking=this.manage[1]
                if(this.manage[1]==1&&this.life>0&&this.weapon.cooldown<=0&&this.weapon.ammo>0&&this.life>0&&!this.weapon.reloading){
                    this.attack(0)
                }
            }else{
                this.manage[0]=this.position.x>this.target.position.x?0:1
                let jumpMult=(game.level==1||game.level==6?0.5:game.level==15||game.level==18?2:1)*(this.id>0?0.8:1)
                if(this.jumper()){
                    if(this.manage[2]==0&&(floor(random(0,120*jumpMult))==0||floor(random(0,30*jumpMult))==0&&this.position.y>this.target.position.y)){
                        this.manage[2]=1
                    }else if(this.manage[2]==1&&(floor(random(0,30))==0||floor(random(0,15))==0&&this.position.y<this.target.position.y)){
                        this.manage[2]=0
                    }
                }else if(this.id==0){
                    if(this.manage[2]==0&&(floor(random(0,240*jumpMult))==0||floor(random(0,60*jumpMult))==0&&this.position.y>this.target.position.y)){
                        this.manage[2]=1
                    }else if(this.manage[2]==1&&(floor(random(0,30))==0||floor(random(0,15))==0&&this.position.y<this.target.position.y)){
                        this.manage[2]=0
                    }
                }else{
                    if(this.manage[2]==0&&(floor(random(0,60*jumpMult))==0||floor(random(0,30*jumpMult))==0&&this.position.y>this.target.position.y)){
                        this.manage[2]=1
                    }else if(this.manage[2]==1&&(floor(random(0,120))==0||floor(random(0,15))==0&&this.position.y<this.target.position.y)){
                        this.manage[2]=0
                    }
                }
                if(this.manage[0]==0&&this.life>0&&this.stunTime<=0&&this.stuckTime<=0&&!(game.attacker&&this.id==0&&!this.free&&this.playerData.name!='Buster'&&this.position.x<this.base.position.x-150)){
                    this.direction.goal=-54
                    if(!this.thrown&&!this.thrown2){
                        this.velocity.x-=(this.weaponType==-1?1.6:effectiveWeaponSpeed)*(game.level==6&&effectivePlayerSpeed<1?effectivePlayerSpeed*0.8+0.2:effectivePlayerSpeed)*(this.id>0&&game.randomizer?2:1)*(this.speedBuff>0?1.5:1)
                    }
                    this.runAnim(1/30)
                }else if(this.manage[0]==1&&this.life>0&&this.stunTime<=0&&this.stuckTime<=0&&!(game.attacker&&this.id==0&&!this.free&&this.playerData.name!='Buster'&&this.position.x>this.base.position.x+150)){
                    this.direction.goal=54
                    if(!this.thrown&&!this.thrown2){
                        this.velocity.x+=(this.weaponType==-1?1.6:effectiveWeaponSpeed)*(game.level==6&&effectivePlayerSpeed<1?effectivePlayerSpeed*0.8+0.2:effectivePlayerSpeed)*(this.id>0&&game.randomizer?2:1)*(this.speedBuff>0?1.5:1)
                    }
                    this.runAnim(1/30)
                }else if(this.animSet.loop<1&&this.animSet.loop>0){
                    this.runAnim(1/30)
                }else if(this.animSet.loop>=1){
                    this.animSet.loop=0
                }
                if(this.manage[2]==1&&this.life>0&&(this.jump.time>0||this.jump.active>0)&&this.stuckTime<=0&&!(game.attacker&&this.id==0&&!this.free&&this.playerData.name!='Buster'&&this.position.y<this.base.position.y+50)&&this.stunTime<=0){
                    if(this.jump.time>0){
                        this.jump.time=0
                        this.jump.active=10
                    }
                    if(this.bounceTime>0){
                        let bounceMult=game.level==1?3:1.5
                        if(this.jumper()){
                            this.velocity.y=min(-21*bounceMult,this.velocity.y-2.25*bounceMult)
                        }else{
                            this.velocity.y=min(-14*bounceMult,this.velocity.y-1.5*bounceMult)
                        }
                    }else{
                        if(this.jumper()){
                            this.velocity.y=min(-21,this.velocity.y-2.25)
                        }else{
                            this.velocity.y=min(-14,this.velocity.y-1.5)
                        }
                    }
                }
                this.attacking=this.manage[1]
                if(this.manage[1]==1&&this.life>0&&this.weapon.cooldown<=0&&this.weapon.ammo>0&&this.life>0&&!this.weapon.reloading){
                    this.attack(0)
                }
            }
        }else if(this.control==0){
            if(this.disable){
                if(this.weaponType==275&&this.id<=game.gaming){
                    this.disable=false
                    for(let a=0,la=entities.projectiles.length;a<la;a++){
                        if(entities.projectiles[a].type==163&&entities.projectiles[a].index==this.index){
                            if(this.life<=0){
                                entities.projectiles[a].active=false
                            }
                            this.disable=true
                            a=la
                        }
                    }
                }else if(this.playerData.name=='PlayerGuidedMissile'&&this.id<=game.gaming){
                    this.disable=false
                    for(let a=0,la=entities.projectiles.length;a<la;a++){
                        if(entities.projectiles[a].type==280&&entities.projectiles[a].index==this.index){
                            if(this.life<=0){
                                entities.projectiles[a].active=false
                            }
                            this.disable=true
                            a=la
                        }
                    }
                }else if(this.playerData.name=='PlayerRemoteControl'&&this.id<=game.gaming){
                    this.disable=false
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(entities.players[a].playerData.name=='ConstructRemote'&&entities.players[a].builder==this.index&&entities.players[a].remote){
                            if(this.life<=0){
                                entities.players[a].remote=false
                            }
                            this.disable=true
                            a=la
                        }
                    }
                }else{
                    this.disable=false
                }
            }else{
                let inputSet=inputs.keys[game.gaming==1?1:this.id-1]
                let inputSetB=inputs.tap[game.gaming==1?1:this.id-1]
                let inputSetC=inputs.release[game.gaming==1?1:this.id-1]
                if(this.life>0&&game.past){
                    this.inputs.push([inputSet[0],inputSet[1],inputSet[2],inputSet[3]])
                }
                if(inputSet[0]&&!inputSet[1]&&this.life>0&&this.stunTime<=0&&this.stuckTime<=0){
                    this.direction.goal=-54
                    if(!this.thrown&&!this.thrown2){
                        this.velocity.x-=(this.weaponType==-1?1.6:effectiveWeaponSpeed*effectivePlayerSpeed)*(this.id>0&&game.randomizer?5/3:1)*(this.id!=1&&game.assault?0.45:1)*(this.speedBuff>0?1.5:1)
                    }
                    this.runAnim(1/30)
                }else if(inputSet[1]&&!inputSet[0]&&this.life>0&&this.stunTime<=0&&this.stuckTime<=0){
                    this.direction.goal=54
                    if(!this.thrown&&!this.thrown2){
                        this.velocity.x+=(this.weaponType==-1?1.6:effectiveWeaponSpeed*effectivePlayerSpeed)*(this.id>0&&game.randomizer?5/3:1)*(this.id!=1&&game.assault?0.45:1)*(this.speedBuff>0?1.5:1)
                    }
                    this.runAnim(1/30)
                }else if(this.animSet.loop<1&&this.animSet.loop>0){
                    this.runAnim(1/30)
                }else if(this.animSet.loop>=1){
                    this.animSet.loop=0
                }
                if(inputSet[2]&&this.life>0&&(this.jump.time>0||this.jump.active>0||this.jump.double==1&&inputSetB[2]||this.jump.triple==1&&inputSetB[2]||this.jump.quadruple==1&&inputSetB[2])&&this.stuckTime<=0){
                    if(this.jump.time>0){
                        this.jump.time=0
                        this.jump.active=10
                    }else if(this.jump.quadruple==1&&this.jump.active==0){
                        this.jump.quadruple=0
                        this.jump.active=10
                    }else if(this.jump.triple==1&&this.jump.active==0){
                        this.jump.triple=0
                        this.jump.active=10
                    }else if(this.jump.double==1&&this.jump.active==0){
                        this.jump.double=0
                        this.jump.active=10
                    }
                    if(this.bounceTime>0){
                        let bounceMult=game.level==1?3:1.5
                        if(this.jumper()){
                            this.velocity.y=min(-21*bounceMult,this.velocity.y-2.25*bounceMult)
                        }else{
                            this.velocity.y=min(-14*bounceMult,this.velocity.y-1.5*bounceMult)
                        }
                    }else{
                        if(this.jumper()){
                            this.velocity.y=min(-21,this.velocity.y-2.25)
                        }else{
                            this.velocity.y=min(-14,this.velocity.y-1.5)
                        }
                    }
                }else if((this.playerData.name=='PlayerHopper'||this.playerData.name=='PlayerGear')&&inputSetC[0]&&this.life>0&&this.jump.time>0&&this.stuckTime<=0){
                    this.jump.time=0
                    this.velocity.x=lsin(this.direction.main)*30
                    this.velocity.y=-25
                    this.thrown=true
                }
                this.attacking=inputSet[3]
                if((this.playerData.name=='PlayerPistol'||this.playerData.name=='PlayerPushPistol'||this.playerData.name=='PlayerPistolVulnerable'||this.playerData.name=='PlayerPistolConfuse'||this.playerData.name=='PlayerPistolOfficer'||this.playerData.name=='PlayerPistolQuadrupleJump'||this.playerData.name=='PlayerPistolception'||this.playerData.name=='PlayerRocketMasher'||this.playerData.name=='PlayerCursor'||this.playerData.name=='PlayerClicker'||this.playerData.name=='PlayerPistolInspect'||this.playerData.name=='PlayerRegional'||this.playerData.name=='PlayerQuarry'||this.playerData.name=='PlayerFaucet'||this.playerData.name=='PlayerHeister')&&this.weapon.uses>0&&inputSetB[3]){
                    this.weapon.cooldown=0
                }
                if(inputSetC[0]&&this.playerData.name=='PlayerSwitcheroo'){
                    let hold=this.subWeaponA.cooldown
                    if(this.subPlayerAData.name=='PlayerPistol'){
                        this.newSubWeaponASet(findName('PlayerMachineGun',types.player))
                    }else if(this.subPlayerAData.name=='PlayerMachineGun'){
                        this.newSubWeaponASet(findName('PlayerSniper',types.player))
                    }else{
                        this.newSubWeaponASet(findName('PlayerPistol',types.player))
                    }
                    this.subWeaponA.cooldown=hold
                }
                if(inputSetC[0]&&this.playerData.name=='PlayerUltraviolet'&&this.assort.ultraviolet==0){
                    let crit=constrain(this.playerData.crit+(this.critBuff>0?1:0)+this.critCheck(),0,1)
                    let spawn=[this.position.x+this.offset.position.x+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x*this.size+constrain(lsin(this.direction.main)*3,-1,1)*10*this.size,this.position.y+this.offset.position.y+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y*this.size]
                    this.assort.ultraviolet=240
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],86,(lsin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff*2.5,300,crit,this.index))
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],86,(lsin(this.direction.main)<0?-90:90)-4,this.id,this.weaponData.damage*this.playerData.damageBuff*2.5,300,crit,this.index))
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],86,(lsin(this.direction.main)<0?-90:90)+4,this.id,this.weaponData.damage*this.playerData.damageBuff*2.5,300,crit,this.index))
                }
                if(inputSetC[0]&&(this.playerData.name=='PlayerAZGun'||this.playerData.name=='PlayerSilvally')){
                    this.assort.elevate=1-this.assort.elevate
                }
                if(inputSetC[0]&&this.playerData.name=='PlayerRegional'&&this.assort.ultraviolet==0){
                    let crit=constrain(this.playerData.crit+(this.critBuff>0?1:0)+this.critCheck(),0,1)
                    let spawn=[this.position.x+this.offset.position.x+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.x*this.size+constrain(lsin(this.direction.main)*3,-1,1)*10*this.size,this.position.y+this.offset.position.y+this.skin.arms[lsin(this.direction.main)<0?1:0].points.final.end.y*this.size]
                    this.assort.ultraviolet=60
                    entities.projectiles.push(new projectile(this.layer,spawn[0],spawn[1],68,(lsin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff*4,300,crit,this.index))
                    entities.projectiles[entities.projectiles.length-1].velocity.x*=1.5
                    entities.projectiles[entities.projectiles.length-1].velocity.y*=1.5
                }
                if(inputSet[3]&&this.life>0&&this.playerData.name!='PlayerSplitter'&&this.playerData.name!='SidekickBonker'&&this.playerData.name!='SidekickDisappointmentGuard'&&this.playerData.name!='SidekickBonkerGuard'){
                    if(this.playerData.name=='PlayerConglomeration'){
                        if(this.subWeaponA.cooldown<=0&&this.subWeaponA.ammo>0&&this.subWeaponAType>=0){
                            this.attack(1)
                        }
                        if(this.subWeaponB.cooldown<=0&&this.subWeaponB.ammo>0&&this.subWeaponBType>=0){
                            this.attack(2)
                        }
                    }else if(this.playerData.name=='PlayerSwitcheroo'){
                        if(this.subPlayerAData.name=='PlayerPistol'&&this.weapon.uses>0&&inputSetB[3]){
                            this.subWeaponA.cooldown=0
                        }
                        if(this.subWeaponA.cooldown<=0&&this.subWeaponA.ammo>0&&this.subWeaponAType>=0){
                            this.attack(1)
                        }
                    }else if(this.weapon.cooldown<=0&&this.weapon.ammo>0&&this.weaponType>=0){
                        this.attack(0)
                    }
                }
                if(inputSetC[0]&&this.playerData.name=='ConstructRemote'){
                    this.remote=false
                }
            }
        }else{
            if(this.selector>=this.inputs.length){
                this.control=0
            }else{
                if(this.inputs[this.selector][0]&&!this.inputs[this.selector][1]&&this.life>0&&this.stunTime<=0&&this.stuckTime<=0){
                    this.direction.goal=-54
                    if(!this.thrown&&!this.thrown2){
                        this.velocity.x-=(this.weaponType==-1?1.6:effectiveWeaponSpeed)*effectivePlayerSpeed*(this.id>0&&game.randomizer?2:1)*(this.speedBuff>0?1.5:1)
                    }
                    this.runAnim(1/30)
                }else if(this.inputs[this.selector][1]&&!this.inputs[this.selector][0]&&this.life>0&&this.stunTime<=0&&this.stuckTime<=0){
                    this.direction.goal=54
                    if(!this.thrown&&!this.thrown2){
                        this.velocity.x+=(this.weaponType==-1?1.6:effectiveWeaponSpeed)*effectivePlayerSpeed*(this.id>0&&game.randomizer?2:1)*(this.speedBuff>0?1.5:1)
                    }
                    this.runAnim(1/30)
                }else if(this.animSet.loop<1&&this.animSet.loop>0){
                    this.runAnim(1/30)
                }else if(this.animSet.loop>=1){
                    this.animSet.loop=0
                }
                if(this.inputs[this.selector][2]&&this.life>0&&(this.jump.time>0||this.jump.active>0)&&this.stuckTime<=0){
                    if(this.jump.time>0){
                        this.jump.time=0
                        this.jump.active=10
                    }
                    if(this.jumper()){
                        this.velocity.y=min(-21,this.velocity.y-2.25)
                    }else{
                        this.velocity.y=min(-14,this.velocity.y-1.5)
                    }
                }
                this.attacking=this.inputs[this.selector][3]
                if(this.inputs[this.selector][3]&&this.life>0&&this.weapon.cooldown<=0&&this.weapon.ammo>0&&this.life>0&&this.weaponType>=0){
                    this.attack(0)
                }
                this.selector++
            }
        }
        if(this.weaponType>=0){
            if(this.weapon.ammo==0){
                this.weapon.reloading=true
            }
            if(this.weapon.cooldown>0){
                this.weapon.cooldown-=this.playerData.reloadBuff*(game.brutal&&this.variant==11?3:1)*(this.confuseTime>0||this.dizzyTime>0?1/3:1)*((!game.peakWeapon||game.classicWeapon&&this.id>0&&this.id<=game.gaming)&&(this.playerData.name.includes('Deployer'))?2:1)
            }
            if(this.weapon.reload>0){
                this.weapon.reload-=this.playerData.reloadBuff*(game.brutal&&this.variant==11?3:1)*(this.confuseTime>0||this.dizzyTime>0?1/3:1)*((!game.peakWeapon||game.classicWeapon&&this.id>0&&this.id<=game.gaming)&&(this.playerData.name.includes('Deployer'))?2:1)
            }else if(this.weapon.ammo<this.weaponData.ammo&&(this.weapon.ammo<this.weapon.uses||game.randomizer||this.id==0||this.id>=game.gaming+1)){
                this.weapon.ammo++
                this.weapon.reload=this.weaponData.reload
                if(this.weapon.ammo==this.weaponData.ammo||this.weapon.ammo==this.weapon.uses){
                    this.weapon.reloading=false
                }
            }
            if(this.playerData.name=='PlayerConglomeration'){
                if(this.subWeaponA.ammo==0){
                    this.subWeaponA.reloading=true
                }
                if(this.subWeaponA.cooldown>0){
                    this.subWeaponA.cooldown-=this.subPlayerAData.reloadBuff*(this.confuseTime>0||this.dizzyTime>0?1/3:1)
                }
                if(this.subWeaponA.reload>0){
                    this.subWeaponA.reload-=this.subPlayerAData.reloadBuff*(this.confuseTime>0||this.dizzyTime>0?1/3:1)
                }else if(this.subWeaponA.ammo<this.subWeaponAData.ammo&&(this.subWeaponA.ammo<this.subWeaponA.uses||game.randomizer||this.id==0||this.id>=game.gaming+1)){
                    this.subWeaponA.ammo++
                    this.subWeaponA.reload=this.subWeaponAData.reload
                    if(this.subWeaponA.ammo==this.subWeaponAData.ammo||this.subWeaponA.ammo==this.subWeaponA.uses){
                        this.subWeaponA.reloading=false
                    }
                }
                if(this.subWeaponB.ammo==0){
                    this.subWeaponB.reloading=true
                }
                if(this.subWeaponB.cooldown>0){
                    this.subWeaponB.cooldown-=this.subPlayerBData.reloadBuff*(this.confuseTime>0||this.dizzyTime>0?1/3:1)
                }
                if(this.subWeaponB.reload>0){
                    this.subWeaponB.reload-=this.subPlayerBData.reloadBuff*(this.confuseTime>0||this.dizzyTime>0?1/3:1)
                }else if(this.subWeaponB.ammo<this.subWeaponBData.ammo&&(this.subWeaponB.ammo<this.subWeaponB.uses||game.randomizer||this.id==0||this.id>=game.gaming+1)){
                    this.subWeaponB.ammo++
                    this.subWeaponB.reload=this.subWeaponBData.reload
                    if(this.subWeaponB.ammo==this.subWeaponBData.ammo||this.subWeaponB.ammo==this.subWeaponB.uses){
                        this.subWeaponB.reloading=false
                    }
                }
            }else if(this.playerData.name=='PlayerSwitcheroo'){
                if(this.subWeaponA.ammo==0){
                    this.subWeaponA.reloading=true
                }
                if(this.subWeaponA.cooldown>0){
                    this.subWeaponA.cooldown-=this.subPlayerAData.reloadBuff*(this.confuseTime>0||this.dizzyTime>0?1/3:1)
                }
                if(this.subWeaponA.reload>0){
                    this.subWeaponA.reload-=this.subPlayerAData.reloadBuff*(this.confuseTime>0||this.dizzyTime>0?1/3:1)
                }else if(this.subWeaponA.ammo<this.subWeaponAData.ammo&&(this.subWeaponA.ammo<this.subWeaponA.uses||game.randomizer||this.id==0||this.id>=game.gaming+1)){
                    this.subWeaponA.ammo++
                    this.subWeaponA.reload=this.subWeaponAData.reload
                    if(this.subWeaponA.ammo==this.subWeaponAData.ammo||this.subWeaponA.ammo==this.subWeaponA.uses){
                        this.subWeaponA.reloading=false
                    }
                }
            }
        }else{
            if(!this.construct&&!this.sidekick&&game.level!=13&&game.level!=14&&(
                (
                    dist(this.position.x,this.position.y,game.edge[0]/2,game.edge[1]/3)<50&&(game.level==0||game.level==1||game.level==2)||
                    dist(this.position.x,this.position.y,game.edge[0]/2-100,game.edge[1]/3-120)<50&&game.level==3||
                    dist(this.position.x,this.position.y,game.edge[0]/2,game.edge[1]/3-40)<50&&game.level==4||
                    dist(this.position.x,this.position.y,150,game.edge[1]-320)<50&&game.level==5||
                    dist(this.position.x,this.position.y,game.edge[0]/2+1300,game.edge[1]-120)<80&&game.level==6||
                    dist(this.position.x,this.position.y,game.edge[0]/2,game.edge[1]/2+360)<80&&game.level==7||
                    dist(this.position.x,this.position.y,game.edge[0]-150,game.edge[1]-520)<80&&game.level==8||
                    dist(this.position.x,this.position.y,game.edge[0]-100,800)<80&&game.level==15||
                    dist(this.position.x,this.position.y,150,game.edge[1]-120)<80&&game.level==17||
                    dist(this.position.x,this.position.y,100,game.edge[1]-220)<80&&game.level==18||
                    dist(this.position.x,this.position.y,3600,1050)<80&&game.level==19||
                    dist(this.position.x,this.position.y,6900,1050)<80&&game.level==19||
                    dist(this.position.x,this.position.y,2250,965)<80&&game.level==20||
                    dist(this.position.x,this.position.y,3500,1200)<80&&game.level==21
                )&&this.id>0&&this.id<=game.gaming&&!game.attacker||
                this.id>=game.gaming+1||game.attacker&&this.id!=0
            )){
                this.newWeapon()
            }
        }
        if(this.record.life<this.life){
            this.record.life=this.life
        }else if(this.record.life>max(0,this.life)){
            for(let a=0,la=entities.players.length;a<la;a++){
                if(entities.players[a].index==this.die.killer&&entities.players[a].index!=this.index){
                    entities.players[a].stats.damage+=this.record.life-max(0,this.life)
                    if(!game.pvp||this.id>0){
                        entities.players[a].stats.bust+=this.record.life-max(0,this.life)
                    }
                    if(entities.players[a].stats.bust>=(game.pvp?[1600,1400,1200,1000][game.players-1]:game.attacker?[3200,2800,2400,2000][game.players-1]:[8000,7000,6000,5000][game.players-1])*(game.peakWeapon?1.5:1)&&game.bust&&entities.players[a].id>0&&game.players>1){
                        entities.players[a].stats.bust=0
                        for(let c=0,lc=game.pvp?4:1;c<lc;c++){
                            if(game.level==7){
                                let key='ABCDEF'[floor(random(0,6))]
                                for(let a=0,la=levels[7].length;a<la;a++){
                                    for(let b=0,lb=levels[7][a].length;b<lb;b++){
                                        if(levels[7][a][b]==key){
                                            entities.players.push(new player(this.layer,game.tileset[0]*(b+0.5),game.tileset[1]*(a+0.5),0,0,[],true,findName('Buster',types.player),game.index))
                                            game.index++
                                        }
                                    }
                                }
                            }else{
                                entities.players.push(new player(this.layer,entities.players[a].position.x,-50-c*100,0,0,[],true,findName('Buster',types.player),game.index))
                                entities.players[entities.players.length-1].parachute=true
                                entities.players[entities.players.length-1].target.index=entities.players[a].index
                                game.index++
                            }
                        }
                    }
                    if(entities.players[a].builder!=-1){
                        for(let b=0,lb=entities.players.length;b<lb;b++){
                            if(entities.players[b].index==entities.players[a].builder){
                                entities.players[b].stats.damage+=this.record.life-max(0,this.life)
                                if(!game.pvp||this.id>0){
                                    entities.players[b].stats.bust+=this.record.life-max(0,this.life)
                                }
                                if(entities.players[b].stats.bust>=(game.pvp?[1600,1400,1200,1000][game.players-1]:game.attacker?[3200,2800,2400,2000][game.players-1]:[8000,7000,6000,5000][game.players-1])*(game.peakWeapon?1.5:1)&&game.bust&&entities.players[b].id>0&&game.players>1){
                                    entities.players[b].stats.bust=0
                                    for(let c=0,lc=game.pvp?4:1;c<lc;c++){
                                        if(game.level==7){
                                            let key='ABCDEF'[floor(random(0,6))]
                                            for(let a=0,la=levels[7].length;a<la;a++){
                                                for(let b=0,lb=levels[7][b].length;b<lb;b++){
                                                    if(levels[7][b][b]==key){
                                                        entities.players.push(new player(this.layer,game.tileset[0]*(b+0.5),game.tileset[1]*(a+0.5),0,0,[],true,findName('Buster',types.player),game.index))
                                                        game.index++
                                                    }
                                                }
                                            }
                                        }else{
                                            entities.players.push(new player(this.layer,entities.players[b].position.x,-50-c*100,0,0,[],true,findName('Buster',types.player),game.index))
                                            entities.players[entities.players.length-1].parachute=true
                                            entities.players[entities.players.length-1].target.index=entities.players[b].index
                                            game.index++
                                        }
                                    }
                                }
                                b=lb
                            }
                        }
                    }
                    a=la
                }
            }
            this.record.life=max(0,this.life)
        }
        if(this.jump.time>0){
            this.jump.time--
        }
        if(this.jump.active>0){
            this.jump.active--
        }
        if(this.collect.time>0&&(this.playerData.name!='PlayerImmortal'||this.weaponData.uses<=0)){
            this.collect.time--
            if(this.med()){
                this.collect.time-=3
            }
        }else if(this.life>0&&this.id>0&&this.size<2.25*0.5&&!game.pvp&&!this.construct){
            this.life=min(max(this.life,this.base.life),this.life+this.base.life/(this.playerData.name=='PlayerImmortal'&&this.weaponData.uses>0?60:this.med()&&this.weaponData.uses>0?150:300))
        }
        if(this.firearc[1]>0){
            this.firearc[1]--
        }
        if(!this.disable){
            if(this.position.x<0){
                if(game.level==3||game.level==7||game.level==16){
                    this.position.x=game.edge[0]
                    this.previous.position.x=game.edge[0]
                }else{
                    this.position.x=0
                    this.velocity.x=0
                }
            }
            if(this.position.x>game.edge[0]){
                if(game.level==3||game.level==7||game.level==16){
                    this.position.x=0
                    this.previous.position.x=0
                }else{
                    this.position.x=game.edge[0]
                    this.velocity.x=0
                }
            }
            if(this.position.y<0&&this.playerData.name!='Buster'){
                if(game.level==3||game.level==7){
                    this.position.y=game.edge[1]
                    this.previous.position.y=game.edge[1]
                }else{
                    this.position.y=0
                    this.velocity.y=0
                }
            }
            if(this.position.y>game.edge[1]){
                if(game.level==3||game.level==7){
                    this.position.y=0
                    this.previous.position.y=0
                }else if(true){
                    this.position.y=0
                    this.previous.position.y=0
                    this.velocity.y=0
                }else{
                    this.life=0
                    this.die.killer=-1
                }
            }
        }
        if(this.dead&&this.life>0){
            this.life=0
        }
        if(this.life<=0){
            this.life=0
            if(!this.dead){
                this.dead=true
                for(let a=0,la=entities.players.length;a<la;a++){
                    if(entities.players[a].index==this.die.killer){
                        entities.players[a].stats.kills=round(entities.players[a].stats.kills*10+(game.pvp&&this.id==0?(this.size>2.25*0.5?5:this.size>1.25*0.5?1:0.2):(this.size>2.25*0.5?25:this.size>1.25*0.5?5:1))*10)/10
                        if(this.id>0&&game.pvp&&entities.players[a].life>0&&!this.construct&&!this.sidekick){
                            entities.players[a].life=max(entities.players[a].life,entities.players[a].base.life)
                        }
                    }
                    if(entities.players[a].life>0&&entities.players[a].playerData.name=='PlayerKinoko'&&dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<750){
                        entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,137,(lsin(this.direction.main)<0?-90:90),entities.players[a].id,120,1200,false,entities.players[a].index))
                    }
                }
                this.stats.deaths++
            }else if(this.id>0){
                this.die.timer++
                if(this.die.timer>(game.assault?60:180)&&game.classicRespawn&&!game.past||this.id>game.gaming&&this.die.timer>600&&!game.past&&!game.classicRespawn){
                    this.respawn()
                }
                if(this.die.timer>=90&&!game.classicRespawn&&!game.past&&!game.pvp){
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(inBoxBox(this,entities.players[a])&&this.id!=entities.players[a].id&&!entities.players[a].dead&&this.id>0&&entities.players[a].id>0){
                            this.stats.bust*=0.5
                            this.life=this.id>=game.gaming+1?this.base.life:this.base.life*0.2
                            this.invincible=60
                            this.dead=false
                        }
                    }
                }
            }
        }
        if(this.life>0){
            let crit=constrain(this.playerData.crit+(this.critBuff>0?1:0),0,1)
            if(game.brutal){
                switch(this.variant){
                    case 10:
                        for(let a=0,la=entities.projectiles.length;a<la;a++){
                            if(((entities.projectiles[a].id==0?1:0)!=(this.id==0?1:0)||game.pvp)&&inBoxBox({position:{x:this.position.x+(lsin(this.direction.main)<0?-80:80),y:this.position.y+this.offset.position.y-10},width:15,height:100},entities.projectiles[a])&&entities.projectiles[a].active&&!entities.projectiles[a].passer){
                                entities.projectiles[a].active=false
                                if(entities.projectiles[a].exploder){
                                    entities.projectiles[a].explode()
                                }
                            }
                        }
                    break
                    case 15:
                        this.life=min(this.base.life,this.life+1/3)
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if(dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<240&&this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&this.id==entities.players[a].id){
                                entities.players[a].life=min(entities.players[a].base.life,entities.players[a].life+1/3)
                            }
                        }
                    break
                }
            }
            switch(this.playerData.name){
                case 'RocketLauncherHeal': case 'BigRocketLauncherHeal': case 'FastPunchHeal': case 'PistolHeal': case 'CritRocketLauncherHeal': case 'SpyHeal':
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<240&&this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&this.id==entities.players[a].id){
                            entities.players[a].life=min(entities.players[a].base.life,entities.players[a].life+entities.players[a].base.life/600)
                        }
                    }
                break
                case 'RocketLauncherBuff': case 'BigRocketLauncherBuff': case 'BigCritRocketLauncherBuff': case 'BigSpamRocketLauncherBuff': case 'RocketLauncherHealSelfBuff': case 'DamageOverTimeMachineGunBuff':
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<240&&this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&this.id==entities.players[a].id){
                            entities.players[a].critBuff=max(entities.players[a].critBuff,15)
                        }
                    }
                break
                case 'RocketLauncherDefendBuff':  case 'BigCritRocketLauncherDefendBuff': case 'BigRocketLauncherDefendBuff': case 'RocketLauncherHealSelfDefendBuff': case 'HeavyPunchDefendBuff': case 'EngineerDefendBuff': case 'DamageOverTimeMachineGunDefendBuff': case 'TankDefendBuff':
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<240&&this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&this.id==entities.players[a].id){
                            entities.players[a].defendBuff=max(entities.players[a].defendBuff,15)
                        }
                    }
                break
                case 'MedicShield': case 'HyperMedicShield': case 'CritApplyMedicShield': case 'EngineerShield': case 'BigMedicShield': case 'BigFastRapidMedicShield': case 'TankShield':
                    for(let a=0,la=entities.projectiles.length;a<la;a++){
                        if(((entities.projectiles[a].id==0?1:0)!=(this.id==0?1:0)||game.pvp)&&inBoxBox({position:{x:this.position.x+(lsin(this.direction.main)<0?-80:80),y:this.position.y+this.offset.position.y-10},width:15,height:100},entities.projectiles[a])&&entities.projectiles[a].active&&!entities.projectiles[a].passer){
                            entities.projectiles[a].active=false
                            if(entities.projectiles[a].exploder){
                                entities.projectiles[a].explode()
                            }
                        }
                    }
                break
                case 'EngineerSpawner': case 'TankSpawner':
                    if(this.time%600==0){
                        entities.players.push(new player(this.layer,this.position.x,this.position.y,0,0,[],true,findName(['Pistol','Shotgun','RocketLauncher','Flamethrower','MachineGun','Baller','Punch','Medic'][floor(random(0,8))],types.player),game.index))
                        game.index++
                        entities.players[entities.players.length-1].free=true
                    }
                break
                case 'RocketLauncherDefendBuffWide':
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<480&&this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&this.id==entities.players[a].id){
                            entities.players[a].defendBuff=max(entities.players[a].defendBuff,15)
                        }
                    }
                break
                case 'PunchRegen': case 'HeavyPunchRegen': case 'MedicRegen':
                    this.life=min(this.base.life,this.life+this.base.life/600)
                break
                case 'BigMedicAura': case 'MedicAura':
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<360&&this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&(this.id==0?1:0)==(entities.players[a].id==0?1:0)){
                            entities.players[a].life=min(max(entities.players[a].base.life,entities.players[a].life),entities.players[a].life+entities.players[a].base.life/1200)
                        }
                    }
                break
                case 'PlayerMedicAura':
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<360&&this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&(this.id==0?1:0)==(entities.players[a].id==0?1:0)){
                            entities.players[a].life=min(max(entities.players[a].base.life,entities.players[a].life),entities.players[a].life+entities.players[a].base.life/300)
                        }
                    }
                break
                case 'PlayerPistolOfficer':
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<150&&this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&(this.id==0?1:0)==(entities.players[a].id==0?1:0)){
                            entities.players[a].critBuff=max(entities.players[a].critBuff,15)
                        }
                    }
                break
                case 'PlayerAutoMachineGun':
                    if(this.time%20==0){
                        let minimum=450
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)<450){
                                minimum=min(minimum,dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y))
                            }
                        }
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum){
                                entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff*2,300,crit,this.index))
                                a=la
                            }
                        }
                    }
                break
                case 'PlayerInspector':
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<600&&this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&!this.inspect.includes(entities.players[a].index)&&entities.players[a].index!=this.index){
                            this.inspect.push(entities.players[a].index)
                        }
                    }
                break
                case 'PlayerOpticalInspector':
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<1200&&this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&!this.inspect.includes(entities.players[a].index)&&entities.players[a].index!=this.index){
                            this.inspect.push(entities.players[a].index)
                        }
                    }
                break
                case 'PlayerTripleAuto':
                    if(this.time%20==0){
                        let hit=false
                        let minimum=[600,600,600]
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)<600){
                                let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                                if(distance<minimum[0]){
                                    minimum[2]=minimum[1]
                                    minimum[1]=minimum[0]
                                    minimum[0]=distance
                                }else if(distance<minimum[1]){
                                    minimum[2]=minimum[1]
                                    minimum[1]=distance
                                }else if(distance<minimum[2]){
                                    minimum[2]=distance
                                }
                            }
                        }
                        let fired=[false,false,false]
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0){
                                if(!fired[0]&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum[0]){
                                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                                    fired[0]=true
                                    hit=true
                                }
                                if(!fired[1]&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum[1]){
                                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                                    fired[1]=true
                                    hit=true
                                }
                                if(!fired[2]&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum[2]){
                                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                                    fired[2]=true
                                    hit=true
                                }
                            }
                        }
                        if(hit){
                            this.weapon.uses--
                            if(this.weapon.uses<=0&&this.id>0&&!game.randomizer){
                                this.weaponType=-1
                            }
                        }
                    }
                break
                case 'PlayerConglomeration':
                    if(this.time%600==0){
                        this.newSubWeaponA()
                        this.newSubWeaponB()
                        this.weapon.uses--
                        if(this.weapon.uses<=0&&this.id>0&&!game.randomizer){
                            this.weaponType=-1
                        }
                    }
                    for(let a=0,la=this.infoAnim.ammoA.length;a<la;a++){
                        this.infoAnim.ammoA[a]=smoothAnim(this.infoAnim.ammoA[a],this.subWeaponA.ammo>a,0,1,5)
                    }
                    for(let a=0,la=this.infoAnim.usesA.length;a<la;a++){
                        this.infoAnim.usesA[a]=smoothAnim(this.infoAnim.usesA[a],this.subWeaponA.uses>a,0,1,5)
                    }
                    for(let a=0,la=this.infoAnim.ammoB.length;a<la;a++){
                        this.infoAnim.ammoB[a]=smoothAnim(this.infoAnim.ammoB[a],this.subWeaponB.ammo>a,0,1,5)
                    }
                    for(let a=0,la=this.infoAnim.usesB.length;a<la;a++){
                        this.infoAnim.usesB[a]=smoothAnim(this.infoAnim.usesB[a],this.subWeaponB.uses>a,0,1,5)
                    }
                break
                case 'PlayerGunception': case 'PlayerPistolception': case 'PlayerMachineGunception': case 'PlayerRocketLauncherception': case 'PlayerSniperception':
                case 'PlayerBallerception': case 'PlayerEngineerception': case 'PlayerMedicception': case 'PlayerSlicerception': case 'PlayerAssaultRifleception':
                case 'PlayerGrenadierception': case 'PlayerGaslighter': case 'PlayerTrapperception': case 'PlayerDirectorception': case 'PlayerDestroyerception':
                case 'PlayerMotorizerception': case 'PlayerSunburstception': case 'PlayerStealthception': case 'PlayerIceberg': case 'PlayerGunceptionception':
                case 'PlayerSoftwareception': case 'PlayerSwarmerception': case 'PlayerDasherception': case 'PlayerEmplacementception': case 'PlayerInterceptorception':
                case 'PlayerDischarge': case 'PlayerMayfly': case 'PlayerWintermint': case 'PlayerForeman': case 'PlayerUserdrive':
                case 'PlayerSubmachineception': case 'PlayerMinesweeperception': case 'PlayerLaserception': case 'PlayerBallistaception': case 'PlayerGuardception':
                    if(this.playerData.name=='PlayerMinesweeperception'){
                        if(game.time%150==0){
                            this.scan=[0,0,0,0,0,0,0,0,0]
                            for(let a=0,la=entities.players.length;a<la;a++){
                                if(entities.players[a].id!=this.id){
                                    let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                                    if(distance>150&&distance<2400){
                                        this.scan[floor(((atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y)+380)%360)/40)]+=20
                                    }
                                }
                            }
                        }else{
                            for(let a=0,la=this.scan.length;a<la;a++){
                                if(this.scan[a]>0){
                                    this.scan[a]--
                                }
                            }
                        }
                    }else if(this.playerData.name=='PlayerGuardception'){
                        for(let a=0,la=entities.projectiles.length;a<la;a++){
                            if(((entities.projectiles[a].id==0?1:0)!=(this.id==0?1:0)||game.pvp&&entities.projectiles[a].id!=this.id)&&(
                                inBoxBox({position:{x:this.position.x+(lsin(this.direction.main)<0?-80:80),y:this.position.y+this.offset.position.y-10},width:25,height:100},entities.projectiles[a])||
                                inBoxBox({position:{x:this.position.x+(lsin(this.direction.main)<0?-60:60),y:this.position.y+this.offset.position.y-10},width:25,height:75},entities.projectiles[a])
                            )&&entities.projectiles[a].active&&!entities.projectiles[a].passer){
                                entities.projectiles[a].active=false
                                if(entities.projectiles[a].exploder){
                                    entities.projectiles[a].explode()
                                }
                            }
                        }
                    }
                    if(
                        this.time%40==0&&(this.playerData.name=='PlayerGunception'||this.playerData.name=='PlayerBallerception'||this.playerData.name=='PlayerTrapperception'||this.playerData.name=='PlayerStealthception'&&this.fade>0||this.playerData.name=='PlayerGaslighter'||this.playerData.name=='PlayerSoftwareception'|this.playerData.name=='PlayerGuardception')||
                        this.time%20==0&&(this.playerData.name=='PlayerPistolception'||this.playerData.name=='PlayerGunceptionception'||this.playerData.name=='PlayerDasherception'||this.playerData.name=='PlayerMinesweeperception')||
                        this.time%3==0&&(this.playerData.name=='PlayerMachineGunception'||this.playerData.name=='PlayerForeman')&&this.time%360<180||
                        this.time%120==0&&this.playerData.name=='PlayerRocketLauncherception'||
                        this.time%100==0&&this.playerData.name=='PlayerSniperception'||
                        this.time%300==0&&this.playerData.name=='PlayerEngineerception'||
                        this.time%15==0&&this.playerData.name=='PlayerMedicception'||
                        this.time%60==0&&(this.playerData.name=='PlayerSlicerception'||this.playerData.name=='PlayerIceberg'||this.playerData.name=='PlayerDischarge')||
                        (this.time%50==0||this.time%50==5||this.time%50==10)&&(this.playerData.name=='PlayerAssaultRifleception'||this.playerData.name=='PlayerUserdrive')||
                        this.time%50==0&&(this.playerData.name=='PlayerGrenadierception'||this.playerData.name=='PlayerWintermint')||
                        this.time%180==0&&this.playerData.name=='PlayerDirectorception'||
                        this.time%240==0&&this.playerData.name=='PlayerDestroyerception'||
                        this.time%300==0&&this.playerData.name=='PlayerMotorizerception'||
                        this.time%12==0&&this.playerData.name=='PlayerSunburstception'||
                        this.time%30==0&&this.playerData.name=='PlayerSwarmerception'||
                        this.time%480==0&&this.playerData.name=='PlayerEmplacementception'||
                        this.time%75==0&&(this.playerData.name=='PlayerInterceptorception'||this.playerData.name=='PlayerMayfly')||
                        this.time%8==0&&this.playerData.name=='PlayerSubmachineception'||
                        this.playerData.name=='PlayerLaserception'&&this.time%360<180||
                        this.time%15==0&&this.playerData.name=='PlayerBallistaception'
                    ){
                        let minimum=this.playerData.name=='PlayerMayfly'?1200:this.playerData.name=='PlayerSniperception'?900:this.playerData.name=='PlayerSunburstception'?600:this.playerData.name=='PlayerSlicerception'?360:450
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&entities.players[a].id!=this.id){
                                minimum=min(minimum,dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y))
                            }
                        }
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum){
                                let dir=atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y+(this.playerData.name=='PlayerBallistaception'?50:0))
                                entities.projectiles.push(new projectile(this.layer,this.playerData.name=='PlayerLaserception'?this.position.x+lsin(dir)*10:this.position.x,this.playerData.name=='PlayerLaserception'?this.position.y-lcos(dir)*10:this.position.y,
                                    this.playerData.name=='PlayerRocketLauncherception'?86:
                                    this.playerData.name=='PlayerSniperception'||this.playerData.name=='PlayerMayfly'?4:
                                    this.playerData.name=='PlayerBallerception'?106:
                                    this.playerData.name=='PlayerEngineerception'?107:
                                    this.playerData.name=='PlayerMedicception'?9:
                                    this.playerData.name=='PlayerSlicerception'?108:
                                    this.playerData.name=='PlayerGrenadierception'?110:
                                    this.playerData.name=='PlayerGaslighter'?112:
                                    this.playerData.name=='PlayerTrapperception'?116:
                                    this.playerData.name=='PlayerDirectorception'?124:
                                    this.playerData.name=='PlayerDestroyerception'?130:
                                    this.playerData.name=='PlayerMotorizerception'?143:
                                    this.playerData.name=='PlayerSunburstception'?133:
                                    this.playerData.name=='PlayerIceberg'?151:
                                    this.playerData.name=='PlayerSwarmerception'?168:
                                    this.playerData.name=='PlayerEmplacementception'?183:
                                    this.playerData.name=='PlayerInterceptorception'?198:
                                    this.playerData.name=='PlayerDischarge'?43:
                                    this.playerData.name=='PlayerWintermint'?220:
                                    this.playerData.name=='PlayerLaserception'?255:
                                    this.playerData.name=='PlayerBallistaception'?291:
                                    1,
                                    this.playerData.name=='PlayerBallerception'||this.playerData.name=='PlayerEngineerception'||this.playerData.name=='PlayerGrenadierception'||this.playerData.name=='PlayerTrapperception'||this.playerData.name=='PlayerDirectorception'||this.playerData.name=='PlayerEmplacementception'||this.playerData.name=='PlayerWintermint'?(this.position.x>entities.players[a].position.x?-90+(dir+90)*0.2:90+(dir-90)*0.2):
                                    dir+(this.playerData.name=='PlayerSubmachineception'?random(-2,2):random(-3,3)),this.id,
                                    this.weaponData.damage*this.playerData.damageBuff*(this.playerData.name=='PlayerMayfly'?2:1)*(this.playerData.name=='PlayerWintermint'?0.5:1),this.playerData.name=='PlayerLaserception'?1:this.playerData.name=='PlayerTrapperception'||this.playerData.name=='PlayerWintermint'?1800:this.playerData.name=='PlayerSlicerception'?50:this.playerData.name=='PlayerDirectorception'?1200:this.playerData.name=='PlayerSwarmerception'?600:300,crit,this.index
                                ))
                                this.firearc=[atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),30]
                                a=la
                            }
                        }
                    }
                break
                case 'PlayerShotgunception':
                    if(this.time%45==0){
                        let minimum=450
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0){
                                minimum=min(minimum,dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y))
                            }
                        }
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum){
                                for(let b=0,lb=10;b<lb;b++){
                                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y)+random(-20,20),this.id,this.weaponData.damage*this.playerData.damageBuff,15,crit,this.index))
                                }
                                this.firearc=[atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),30]
                                a=la
                            }
                        }
                    }
                break
                case 'PlayerFlamethrowerception': case 'PlayerAnnexer': case 'PlayerGustception':
                    if(this.time%5==0&&this.time%360<240){
                        let minimum=300
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0){
                                minimum=min(minimum,dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y))
                            }
                        }
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum){
                                entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,this.playerData.name=='PlayerGustception'?288:109,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y)+random(-15,15),this.id,this.weaponData.damage*this.playerData.damageBuff,10,crit,this.index))
                                this.firearc=[atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),30]
                                a=la
                            }
                        }
                    }
                break
                case 'PlayerRearguard': case 'PlayerBackFlak':
                    for(let a=0,la=entities.projectiles.length;a<la;a++){
                        if(((entities.projectiles[a].id==0?1:0)!=(this.id==0?1:0)||game.pvp&&entities.projectiles[a].id!=this.id)&&inBoxBox({position:{x:this.position.x+(lsin(this.direction.main)<0?80:-80),y:this.position.y+this.offset.position.y-10},width:25,height:100},entities.projectiles[a])&&entities.projectiles[a].active&&!entities.projectiles[a].passer){
                            entities.projectiles[a].active=false
                            if(entities.projectiles[a].exploder){
                                entities.projectiles[a].explode()
                            }
                        }
                    }
                    if(this.playerData.name=='PlayerBackFlak'&&this.time%45==0){
                        let minimum=450
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0){
                                minimum=min(minimum,dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y))
                            }
                        }
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum){
                                for(let b=0,lb=10;b<lb;b++){
                                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y)+random(-20,20),this.id,this.weaponData.damage*this.playerData.damageBuff*0.5,15,crit,this.index))
                                }
                                this.firearc=[atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),30]
                                a=la
                            }
                        }
                    }
                break
                case 'PlayerMinesweeper': case 'PlayerDegausser': case 'PlayerRangefinder': case 'PlayerAnapsid': case 'PlayerRadio': case 'PlayerRanger': case 'PlayerRescue': case 'SidekickMinesweeper':
                    if(game.time%150==(this.playerData.name=='SidekickMinesweeper'?75:0)){
                        this.scan=[0,0,0,0,0,0,0,0,0]
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if(entities.players[a].id!=this.id){
                                let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                                if(distance>150&&distance<2400){
                                    this.scan[floor(((atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y)+380)%360)/40)]+=20
                                }
                            }
                        }
                    }else{
                        for(let a=0,la=this.scan.length;a<la;a++){
                            if(this.scan[a]>0){
                                this.scan[a]--
                            }
                        }
                    }
                break
                case 'PlayerRotary': case 'PlayerClusterShield':
                    for(let a=0,la=entities.projectiles.length;a<la;a++){
                        if(((entities.projectiles[a].id==0?1:0)!=(this.id==0?1:0)||game.pvp&&entities.projectiles[a].id!=this.id)&&(
                            inBoxBox({position:{x:this.position.x+(lsin(this.direction.main)<0?80:-80),y:this.position.y+this.offset.position.y-10},width:25,height:100},entities.projectiles[a])||
                            inBoxBox({position:{x:this.position.x+(lsin(this.direction.main)<0?-80:80),y:this.position.y+this.offset.position.y-10},width:25,height:100},entities.projectiles[a])
                        )&&entities.projectiles[a].active&&!entities.projectiles[a].passer){
                            entities.projectiles[a].active=false
                            if(entities.projectiles[a].exploder){
                                entities.projectiles[a].explode()
                            }
                        }
                    }
                break
                case 'PlayerSplitter': case 'PlayerDivision': case 'PlayerSquad': case 'PlayerFleet': case 'PlayerPointer':
                    if(this.time%600==0){
                        this.newSubWeaponA()
                        this.newSubWeaponB()
                        this.weapon.uses--
                        if(this.weapon.uses<=0&&this.id>0&&!game.randomizer){
                            this.weaponType=-1
                        }
                    }
                break
                case 'PlayerDullahan':
                    if(this.time%60==0){
                        let hit=false
                        let minimum=[600,600,600]
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)<600){
                                let distance=dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)
                                if(distance<minimum[0]){
                                    minimum[2]=minimum[1]
                                    minimum[1]=minimum[0]
                                    minimum[0]=distance
                                }else if(distance<minimum[1]){
                                    minimum[2]=minimum[1]
                                    minimum[1]=distance
                                }else if(distance<minimum[2]){
                                    minimum[2]=distance
                                }
                            }
                        }
                        let fired=[false,false,false]
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0){
                                if(!fired[0]&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum[0]){
                                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff/4,300,crit,this.index))
                                    fired[0]=true
                                    hit=true
                                }
                                if(!fired[1]&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum[1]){
                                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff/4,300,crit,this.index))
                                    fired[1]=true
                                    hit=true
                                }
                                if(!fired[2]&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum[2]){
                                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),this.id,this.weaponData.damage*this.playerData.damageBuff/4,300,crit,this.index))
                                    fired[2]=true
                                    hit=true
                                }
                            }
                        }
                    }else if(this.time%60==30){
                        let minimum=600
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)<600){
                                minimum=min(minimum,dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y))
                            }
                        }
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum){
                                let dir=atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y)
                                for(let b=0,lb=3;b<lb;b++){
                                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,dir+b*120,this.id,this.weaponData.damage*this.playerData.damageBuff/4,300,crit,this.index))
                                }
                                a=la
                            }
                        }
                    }
                break
                case 'ConstructGuard': case 'SidekickDisappointmentGuard': case 'SidekickBonkerGuard': case 'PlayerGuard': case 'PlayerGuillotine':
                    for(let a=0,la=entities.projectiles.length;a<la;a++){
                        if(((entities.projectiles[a].id==0?1:0)!=(this.id==0?1:0)||game.pvp&&entities.projectiles[a].id!=this.id)&&inBoxBox({position:{x:this.position.x+(lsin(this.direction.main)<0?-80:80),y:this.position.y+this.offset.position.y-10},width:25,height:100},entities.projectiles[a])&&entities.projectiles[a].active&&!entities.projectiles[a].passer){
                            entities.projectiles[a].active=false
                            if(entities.projectiles[a].exploder){
                                entities.projectiles[a].explode()
                            }
                        }
                    }
                break
                case 'PlayerHelixception':
                    if(
                        this.time%40==0
                    ){
                        let minimum=450
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&entities.players[a].id!=this.id){
                                minimum=min(minimum,dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y))
                            }
                        }
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum){
                                let dir=atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y)
                                entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,
                                    169,
                                    180-dir,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index
                                ))
                                entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,
                                    170,
                                    180-dir,this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index
                                ))
                                this.firearc=[atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),30]
                                a=la
                            }
                        }
                    }
                break
                case 'SpawnerBoss':
                    if(this.time%120==0){
                        entities.players.push(new player(this.layer,this.position.x,this.position.y,0,0,[],true,findName(['Pistol','Shotgun','RocketLauncher','Flamethrower','MachineGun','Baller','Punch','Medic'][floor(random(0,8))],types.player),game.index))
                        game.index++
                        entities.players[entities.players.length-1].free=true
                    }
                break
                case 'BigRocketLauncherDoubleBuff':
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<240&&this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&this.id==entities.players[a].id){
                            entities.players[a].critBuff=max(entities.players[a].critBuff,15)
                            entities.players[a].defendBuff=max(entities.players[a].defendBuff,15)
                        }
                    }
                break
                case 'PlayerRho': case 'PlayerSchismist': case 'PlayerRevolutionist': case 'PlayerRevolutionistception': case 'PlayerBohrer':
                    if(this.playerData.name=='PlayerRho'){
                        for(let a=0,la=entities.projectiles.length;a<la;a++){
                            if(((entities.projectiles[a].id==0?1:0)!=(this.id==0?1:0)||game.pvp&&entities.projectiles[a].id!=this.id)&&(
                                dist(this.position.x+50*lsin(this.time),this.position.y+this.offset.position.y+50*lcos(this.time)-10,entities.projectiles[a].position.x,entities.projectiles[a].position.y)<12+entities.projectiles[a].width*0.25+entities.projectiles[a].height*0.25||
                                dist(this.position.x-50*lsin(this.time),this.position.y+this.offset.position.y-50*lcos(this.time)-10,entities.projectiles[a].position.x,entities.projectiles[a].position.y)<12+entities.projectiles[a].width*0.25+entities.projectiles[a].height*0.25
                            )&&entities.projectiles[a].active&&!entities.projectiles[a].passer){
                                entities.projectiles[a].active=false
                                if(entities.projectiles[a].exploder){
                                    entities.projectiles[a].explode()
                                }
                            }
                        }
                    }
                    if(this.time%40==0){
                        let minimum=[450,450]
                        let center=[
                            [this.position.x+50*lcos(this.time),this.position.y-50*lsin(this.time)+this.offset.position.y-10],
                            [this.position.x-50*lcos(this.time),this.position.y+50*lsin(this.time)+this.offset.position.y-10]
                        ]
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&entities.players[a].id!=this.id){
                                minimum[0]=min(minimum[0],dist(entities.players[a].position.x,entities.players[a].position.y,center[0][0],center[0][1]))
                                minimum[1]=min(minimum[1],dist(entities.players[a].position.x,entities.players[a].position.y,center[1][0],center[1][1]))
                            }
                        }
                        let fired=[false,false]
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if(
                                (entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&
                                dist(entities.players[a].position.x,entities.players[a].position.y,center[0][0],center[0][1])==minimum[0]&&!fired[0]
                            ){
                                let dir=atan2(entities.players[a].position.x-center[0][0],center[0][1]-entities.players[a].position.y)
                                entities.projectiles.push(new projectile(this.layer,center[0][0],center[0][1],1,dir+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff*(this.playerData.name=='PlayerSchismist'?1/3:1)*(this.playerData.name=='PlayerBohrer'?2/3:1),300,crit,this.index))
                                fired[0]=true
                            }
                            if(
                                (entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&
                                dist(entities.players[a].position.x,entities.players[a].position.y,center[1][0],center[1][1])==minimum[1]&&!fired[1]
                            ){
                                let dir=atan2(entities.players[a].position.x-center[1][0],center[1][1]-entities.players[a].position.y)
                                entities.projectiles.push(new projectile(this.layer,center[1][0],center[1][1],1,dir+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff*(this.playerData.name=='PlayerSchismist'?1/3:1)*(this.playerData.name=='PlayerBohrer'?2/3:1),300,crit,this.index))
                                fired[1]=true
                            }
                        }
                    }
                    if(this.time%40==20&&this.playerData.name=='PlayerRevolutionistception'){
                        let minimum=[450,450,450]
                        let center=[
                            [this.position.x+35*lcos(-this.time),this.position.y-35*lsin(-this.time)+this.offset.position.y-10],
                            [this.position.x-35*lcos(-this.time),this.position.y+35*lsin(-this.time)+this.offset.position.y-10],
                            [this.position.x,this.position.y-10]
                        ]
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&entities.players[a].id!=this.id){
                                minimum[0]=min(minimum[0],dist(entities.players[a].position.x,entities.players[a].position.y,center[0][0],center[0][1]))
                                minimum[1]=min(minimum[1],dist(entities.players[a].position.x,entities.players[a].position.y,center[1][0],center[1][1]))
                                minimum[2]=min(minimum[2],dist(entities.players[a].position.x,entities.players[a].position.y,center[2][0],center[2][1]))
                            }
                        }
                        let fired=[false,false,false]
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if(
                                (entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&
                                dist(entities.players[a].position.x,entities.players[a].position.y,center[0][0],center[0][1])==minimum[0]&&!fired[0]
                            ){
                                let dir=atan2(entities.players[a].position.x-center[0][0],center[0][1]-entities.players[a].position.y)
                                entities.projectiles.push(new projectile(this.layer,center[0][0],center[0][1],1,dir+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff*(this.playerData.name=='PlayerSchismist'?1/3:1),300,crit,this.index))
                                fired[0]=true
                            }
                            if(
                                (entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&
                                dist(entities.players[a].position.x,entities.players[a].position.y,center[1][0],center[1][1])==minimum[1]&&!fired[1]
                            ){
                                let dir=atan2(entities.players[a].position.x-center[1][0],center[1][1]-entities.players[a].position.y)
                                entities.projectiles.push(new projectile(this.layer,center[1][0],center[1][1],1,dir+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff*(this.playerData.name=='PlayerSchismist'?1/3:1),300,crit,this.index))
                                fired[1]=true
                            }
                            if(
                                (entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&
                                dist(entities.players[a].position.x,entities.players[a].position.y,center[1][0],center[1][1])==minimum[1]&&!fired[1]
                            ){
                                let dir=atan2(entities.players[a].position.x-center[2][0],center[2][1]-entities.players[a].position.y)
                                entities.projectiles.push(new projectile(this.layer,center[2][0],center[2][1],1,dir+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff*(this.playerData.name=='PlayerSchismist'?1/3:1),300,crit,this.index))
                                fired[2]=true
                            }
                        }
                    }
                break
                case 'PlayerSpreadlingception': case 'PlayerLurker':
                    if(
                        this.time%50==0
                    ){
                        let minimum=450
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&entities.players[a].id!=this.id){
                                minimum=min(minimum,dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y))
                            }
                        }
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum){
                                let dir=atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y)
                                for(let a=0,la=7;a<la;a++){
                                    entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,1,dir-15+a*5,this.id,this.weaponData.damage*this.playerData.damageBuff*(this.playerData.name=='PlayerLurker'?0.2:1),300,crit,this.index))
                                    entities.projectiles[entities.projectiles.length-1].speed=6
                                }
                                this.firearc=[atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),30]
                                a=la
                            }
                        }
                    }
                break
                case 'PlayerBattlerock':
                    if(
                        this.time%60==0
                    ){
                        let minimum=450
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&entities.players[a].id!=this.id){
                                minimum=min(minimum,dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y))
                            }
                        }
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum){
                                let dir=atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y)
                                for(let a=0,la=3;a<la;a++){
                                    entities.projectiles.push(new projectile(this.layer,this.position.x+lsin(a*120)*6,this.position.y-lcos(a*120)*6,1,dir,this.id,this.weaponData.damage*this.playerData.damageBuff*1.2,300,crit,this.index))
                                }
                                this.firearc=[atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),30]
                                a=la
                            }
                        }
                    }
                break
                case 'Buster':
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(inBoxBox({position:{x:(this.position.x/2+this.previous.position.x/2),y:(this.position.y/2+this.previous.position.y/2)},width:this.width,height:this.height},entities.players[a])&&(entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&!entities.players[a].dead&&!this.dead){
                            let dir=[entities.players[a].position.x-(this.position.x/2+this.previous.position.x/2),entities.players[a].position.y+entities.players[a].height/2-(this.position.y/2+this.previous.position.y/2)-this.height/2]
                            entities.players[a].lastingForce[0]+=dir[0]/(sqrt(dir[0]**2+dir[1]**2))*2
                            entities.players[a].lastingForce[1]+=dir[1]/(sqrt(dir[0]**2+dir[1]**2))
                            entities.players[a].velocity.x=dir[0]/(sqrt(dir[0]**2+dir[1]**2))*20+this.velocity.x
                            entities.players[a].velocity.y=dir[1]/(sqrt(dir[0]**2+dir[1]**2))*20+this.velocity.y
                            entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y,153,0,this.id,300,2,false,this.index))
                            this.life=0
                        }else if(inBoxBox(this,entities.players[a])&&(entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&!entities.players[a].dead&&!this.dead){
                            let dir=[entities.players[a].position.x-this.position.x,entities.players[a].position.y+entities.players[a].height/2-this.position.y-this.height/2]
                            entities.players[a].lastingForce[0]+=dir[0]/(sqrt(dir[0]**2+dir[1]**2))*2
                            entities.players[a].lastingForce[1]+=dir[1]/(sqrt(dir[0]**2+dir[1]**2))
                            entities.players[a].velocity.x=dir[0]/(sqrt(dir[0]**2+dir[1]**2))*20+this.velocity.x
                            entities.players[a].velocity.y=dir[1]/(sqrt(dir[0]**2+dir[1]**2))*20+this.velocity.y
                            entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y,153,0,this.id,300,2,false,this.index))
                            this.life=0
                        }
                    }
                break
                case 'RocketLauncherSpeedBuff': case 'BigRocketLauncherSpeedBuff': case 'TankSpeedBuff':
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<240&&this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&this.id==entities.players[a].id){
                            entities.players[a].speedBuff=max(entities.players[a].speedBuff,15)
                        }
                    }
                break
                case 'PlayerPelleterception': case 'PlayerBlastdoor':
                    if(
                        this.time%25==0
                    ){
                        let minimum=450
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&entities.players[a].id!=this.id){
                                minimum=min(minimum,dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y))
                            }
                        }
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum){
                                let dir=atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y)
                                for(let a=0,la=2;a<la;a++){
                                    entities.projectiles.push(new projectile(this.layer,this.position.x+(-2+a*4)*lcos(dir),this.position.y+(-2+a*4)*lsin(dir),1,dir-1+a*2,this.id,this.weaponData.damage*this.playerData.damageBuff*(this.playerData.name=='PlayerBlastdoor'?1/15:1),300,crit,this.index))
                                    entities.projectiles[entities.projectiles.length-1].speed=8
                                }
                                this.firearc=[atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),30]
                                a=la
                            }
                        }
                    }
                break
                case 'PlayerDropkick':
                    if(this.time%10==0){
                        let exists=false
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if(entities.players[a].sidekick&&entities.players[a].playerData.name=='SidekickBonker'&&entities.players[a].id==this.id){
                                exists=true
                            }
                        }
                        if(!exists){
                            entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickBonker',types.player),this.index))
                            entities.players[entities.players.length-1].sidekick=true
                            entities.players[entities.players.length-1].direction.goal=this.direction.goal
                            entities.players[entities.players.length-1].velocity.x=sign(lsin(this.direction.goal))*24
                            entities.players[entities.players.length-1].velocity.y=-18
                            entities.players[entities.players.length-1].thrown=true
                        }
                    }
                break
                case 'PlayerOganesson':
                    let mapping=[2,8,18,32,32,18,8]
                    if(this.time%60==0){
                        let minimum=[]
                        let center=[]
                        let fired=[]
                        for(let a=0,la=mapping.length;a<la;a++){
                            minimum.push([])
                            center.push([])
                            fired.push([])
                            for(let b=0,lb=mapping[a];b<lb;b++){
                                minimum[a].push(450)
                                center[a].push([this.position.x+(50+a*20)*lsin(this.time+360*b/lb),this.position.y+(50+a*20)*lcos(this.time+360*b/lb)+this.offset.position.y-10])
                                fired[a].push(false)
                            }
                        }
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&entities.players[a].id!=this.id){
                                for(let b=0,lb=minimum.length;b<lb;b++){
                                    for(let c=0,lc=minimum[b].length;c<lc;c++){
                                        minimum[b][c]=min(minimum[b][c],dist(entities.players[a].position.x,entities.players[a].position.y,center[b][c][0],center[b][c][1]))
                                    }
                                }
                            }
                        }
                        for(let a=0,la=entities.players.length;a<la;a++){
                            for(let b=0,lb=minimum.length;b<lb;b++){
                                for(let c=0,lc=minimum[b].length;c<lc;c++){
                                    if(
                                        (entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&
                                        dist(entities.players[a].position.x,entities.players[a].position.y,center[b][c][0],center[b][c][1])==minimum[b][c]&&!fired[b][c]
                                    ){
                                        let dir=atan2(entities.players[a].position.x-center[b][c][0],center[b][c][1]-entities.players[a].position.y)
                                        entities.projectiles.push(new projectile(this.layer,center[b][c][0],center[b][c][1],1,dir+random(-3,3),this.id,this.weaponData.damage*this.playerData.damageBuff,300,crit,this.index))
                                        fired[b][c]=true
                                    }
                                }
                            }
                        }
                    }
                break
                case 'PlayerBeacon':
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(dist(this.position.x,this.position.y,entities.players[a].position.x,entities.players[a].position.y)<150&&this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&(this.id==0?1:0)==(entities.players[a].id==0?1:0)){
                            entities.players[a].defendBuff=max(entities.players[a].defendBuff,15)
                        }
                    }
                break
                case 'PlayerSwitcheroo':
                    if(this.time%600==0){
                        this.weapon.uses--
                        if(this.weapon.uses<=0&&this.id>0&&!game.randomizer){
                            this.weaponType=-1
                        }
                    }
                    for(let a=0,la=this.infoAnim.ammoA.length;a<la;a++){
                        this.infoAnim.ammoA[a]=smoothAnim(this.infoAnim.ammoA[a],this.subWeaponA.ammo>a,0,1,5)
                    }
                    for(let a=0,la=this.infoAnim.usesA.length;a<la;a++){
                        this.infoAnim.usesA[a]=smoothAnim(this.infoAnim.usesA[a],this.subWeaponA.uses>a,0,1,5)
                    }
                    for(let a=0,la=this.infoAnim.ammoB.length;a<la;a++){
                        this.infoAnim.ammoB[a]=smoothAnim(this.infoAnim.ammoB[a],this.subWeaponB.ammo>a,0,1,5)
                    }
                    for(let a=0,la=this.infoAnim.usesB.length;a<la;a++){
                        this.infoAnim.usesB[a]=smoothAnim(this.infoAnim.usesB[a],this.subWeaponB.uses>a,0,1,5)
                    }
                break
                case 'PlayerConsort':
                    if(this.time%10==0){
                        let exists=false
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if(entities.players[a].sidekick&&entities.players[a].playerData.name=='SidekickGuardian'&&entities.players[a].id==this.id){
                                exists=true
                            }
                        }
                        if(!exists){
                            entities.players.push(new player(this.layer,this.position.x,this.position.y,this.id,0,[],false,findName('SidekickGuardian',types.player),this.index))
                            entities.players[entities.players.length-1].sidekick=true
                            entities.players[entities.players.length-1].direction.goal=this.direction.goal
                            entities.players[entities.players.length-1].velocity.y=-30
                        }
                    }
                break
                case 'PlayerCircuit':
                    if(this.time%80==0){
                        let minimum=[450,450]
                        let center=[
                            [this.position.x+50*lcos(this.time),this.position.y-50*lsin(this.time)+this.offset.position.y-10],
                            [this.position.x-50*lcos(this.time),this.position.y+50*lsin(this.time)+this.offset.position.y-10]
                        ]
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&entities.players[a].id!=this.id){
                                minimum[0]=min(minimum[0],dist(entities.players[a].position.x,entities.players[a].position.y,center[0][0],center[0][1]))
                                minimum[1]=min(minimum[1],dist(entities.players[a].position.x,entities.players[a].position.y,center[1][0],center[1][1]))
                            }
                        }
                        let fired=[false,false]
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if(
                                (entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&
                                dist(entities.players[a].position.x,entities.players[a].position.y,center[0][0],center[0][1])==minimum[0]&&!fired[0]
                            ){
                                let dir=atan2(entities.players[a].position.x-center[0][0],center[0][1]-entities.players[a].position.y)
                                for(let a=0,la=10;a<la;a++){
                                    entities.projectiles.push(new projectile(this.layer,center[0][0],center[0][1],1,dir+random(-20,20),this.id,this.weaponData.damage*this.playerData.damageBuff*0.25,15,crit,this.index))
                                }
                                fired[0]=true
                            }
                            if(
                                (entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&
                                dist(entities.players[a].position.x,entities.players[a].position.y,center[1][0],center[1][1])==minimum[1]&&!fired[1]
                            ){
                                let dir=atan2(entities.players[a].position.x-center[1][0],center[1][1]-entities.players[a].position.y)
                                for(let a=0,la=10;a<la;a++){
                                    entities.projectiles.push(new projectile(this.layer,center[1][0],center[1][1],1,dir+random(-20,20),this.id,this.weaponData.damage*this.playerData.damageBuff*0.25,15,crit,this.index))
                                }
                                fired[1]=true
                            }
                        }
                    }
                break
                case 'PlayerHistorian':
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(this.position.x!=entities.players[a].position.x&&!entities.players[a].dead&&!this.dead&&!this.inspect.includes(entities.players[a].index)&&entities.players[a].index!=this.index){
                            this.inspect.push(entities.players[a].index)
                        }
                    }
                break
                case 'PlayerAZGun':
                    if(this.infoAnim.elevate>0&&this.assort.elevate==0){
                        this.infoAnim.elevate--
                    }
                    if(this.infoAnim.elevate<30&&this.assort.elevate==1){
                        this.infoAnim.elevate++
                    }
                break
                case 'PlayerKannon':
                    for(let a=0,la=entities.projectiles.length;a<la;a++){
                        if(((entities.projectiles[a].id==0?1:0)!=(this.id==0?1:0)||game.pvp&&entities.projectiles[a].id!=this.id)&&inBoxBox({position:{x:this.position.x,y:this.position.y+this.offset.position.y-100},width:100,height:25},entities.projectiles[a])&&entities.projectiles[a].active&&!entities.projectiles[a].passer){
                            entities.projectiles[a].active=false
                            if(entities.projectiles[a].exploder){
                                entities.projectiles[a].explode()
                            }
                        }
                    }
                break
                case 'PlayerPlanetoid':
                    for(let a=0,la=entities.players.length;a<la;a++){
                        for(let b=0,lb=4;b<lb;b++){
                            if(inBoxBox({position:{x:this.position.x+50*lsin(this.time+b*90),y:this.position.y+50*lcos(this.time+b*90)-10},width:16,height:16},entities.players[a])&&(entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&!entities.players[a].dead&&!this.dead){
                                let dir=[entities.players[a].position.x-(this.position.x+50*lsin(this.time+a*90)),entities.players[a].position.y+entities.players[a].height/2-(this.position.y+50*lcos(this.time+a*90)-10)]
                                entities.players[a].takeDamage(100*(crit?3:1))
                                entities.players[a].velocity.x=dir[0]/(sqrt(dir[0]**2+dir[1]**2))*20+this.velocity.x
                                entities.players[a].velocity.y=dir[1]/(sqrt(dir[0]**2+dir[1]**2))*20+this.velocity.y
                                entities.players[a].lastingForce[0]+=dir[0]/(sqrt(dir[0]**2+dir[1]**2))*2
                                entities.players[a].lastingForce[1]+=dir[1]/(sqrt(dir[0]**2+dir[1]**2))
                                entities.players[a].collect.time=450
                                entities.players[a].die.killer=this.index
                            }
                        }
                    }
                break
                case 'PlayerShovel':
                    for(let a=0,la=entities.projectiles.length;a<la;a++){
                        if(((entities.projectiles[a].id==0?1:0)!=(this.id==0?1:0)||game.pvp&&entities.projectiles[a].id!=this.id)&&inBoxBox({position:{x:this.position.x+(lsin(this.direction.main)<0?-80:80),y:this.position.y+this.offset.position.y-10},width:25,height:100},entities.projectiles[a])&&entities.projectiles[a].active&&!entities.projectiles[a].passer){
                            entities.projectiles[a].active=false
                            if(entities.projectiles[a].exploder){
                                entities.projectiles[a].explode()
                            }
                        }
                    }
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(((entities.players[a].id==0?1:0)!=(this.id==0?1:0)||game.pvp&&entities.projectiles[a].id!=this.id)&&inBoxBox({position:{x:this.position.x+(lsin(this.direction.main)<0?-80:80),y:this.position.y+this.offset.position.y-10},width:10,height:100},entities.players[a])){
                            entities.players[a].velocity.x+=lsin(this.direction.main)*5
                            entities.players[a].lastingForce[0]+=lsin(this.direction.main)
                        }
                    }
                break
                case 'PlayerBouncyShield':
                    for(let a=0,la=entities.projectiles.length;a<la;a++){
                        if(((entities.projectiles[a].id==0?1:0)!=(this.id==0?1:0)||game.pvp&&entities.projectiles[a].id!=this.id)&&inBoxBox({position:{x:this.position.x+(lsin(this.direction.main)<0?-80:80),y:this.position.y+this.offset.position.y-10},width:25,height:100},entities.projectiles[a])&&entities.projectiles[a].active&&!entities.projectiles[a].passer){
                            if(entities.projectiles[a].hasOwnProperty("velocity")){
                                entities.projectiles[a].velocity.x*=-1
                            }
                            entities.projectiles[a].direction+=180
                            entities.projectiles[a].id=this.id
                            entities.projectiles[a].index=this.index
                        }
                    }
                break
                case 'PlayerSpiny':
                    for(let a=0,la=entities.projectiles.length;a<la;a++){
                        if(((entities.projectiles[a].id==0?1:0)!=(this.id==0?1:0)||game.pvp&&entities.projectiles[a].id!=this.id)&&inBoxBox({position:{x:this.position.x+(lsin(this.direction.main)<0?-80:80),y:this.position.y+this.offset.position.y-10},width:25,height:100},entities.projectiles[a])&&entities.projectiles[a].active&&!entities.projectiles[a].passer){
                            entities.projectiles[a].active=false
                            if(entities.projectiles[a].exploder){
                                entities.projectiles[a].explode()
                            }
                        }
                    }
                    for(let a=0,la=entities.players.length;a<la;a++){
                        if(((entities.players[a].id==0?1:0)!=(this.id==0?1:0)||game.pvp&&entities.projectiles[a].id!=this.id)&&inBoxBox({position:{x:this.position.x+(lsin(this.direction.main)<0?-80:80),y:this.position.y+this.offset.position.y-10},width:20,height:100},entities.players[a])){
                            entities.players[a].takeDamage(crit==1?25:10)
                        }
                    }
                break
                case 'PlayerHeister':
                    if(
                        this.jump.active==9
                    ){
                        let minimum=450
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&entities.players[a].id!=this.id){
                                minimum=min(minimum,dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y))
                            }
                        }
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if((entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0||this.playerData.name=='PlayerMedicception')&&entities.players[a].life>0&&dist(entities.players[a].position.x,entities.players[a].position.y,this.position.x,this.position.y)==minimum){
                                let dir=atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y)
                                for(let a=0,la=3;a<la;a++){
                                    entities.projectiles.push(new projectile(this.layer,this.position.x+(-2+a*2)*lcos(dir),this.position.y+(-2+a*2)*lsin(dir),1,dir-1.5+a*1.5,this.id,this.weaponData.damage*this.playerData.damageBuff*(this.playerData.name=='PlayerBlastdoor'?1/15:1),300,crit,this.index))
                                    entities.projectiles[entities.projectiles.length-1].speed=8-abs(1-a)*0.5
                                }
                                this.firearc=[atan2(entities.players[a].position.x-this.position.x,this.position.y-entities.players[a].position.y),30]
                                a=la
                            }
                        }
                    }
                break
                case 'PlayerColonizer':
                    if(this.time%90==0){
                        entities.projectiles.push(new projectile(this.layer,this.position.x,this.position.y,295,(lsin(this.direction.main)<0?-90:90),this.id,this.weaponData.damage*this.playerData.damageBuff*2,1200,crit,this.index))
                    }
                break
                
            }
            if(this.playerData.name.includes('Tank')||game.brutal&&this.variant==13||this.weaponType==194||this.weaponType==242||this.weaponType==243||this.weaponType==245||this.weaponType==246||this.weaponType==247||this.weaponType==253||this.weaponType==347||this.weaponType==356||this.weaponType==370||this.weaponType==385||this.weaponType==398||this.weaponType==400||this.weaponType==415||this.weaponType==421||this.weaponType==433||this.weaponType==461||this.weaponType==495||this.weaponType==533||this.weaponType==541||this.weaponType==543){
                let crit=constrain(this.playerData.crit+(this.critBuff>0?1:0)+this.critCheck(),0,1)
                for(let a=0,la=entities.players.length;a<la;a++){
                    if(inBoxBox({position:{x:(this.position.x/2+this.previous.position.x/2),y:(this.position.y/2+this.previous.position.y/2)},width:this.width,height:this.height},entities.players[a])&&(entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&!entities.players[a].dead&&!this.dead){
                        let dir=[entities.players[a].position.x-(this.position.x/2+this.previous.position.x/2),entities.players[a].position.y+entities.players[a].height/2-(this.position.y/2+this.previous.position.y/2)-this.height/2]
                        if(this.weaponType==253||this.weaponType==400){
                            entities.players[a].lastingForce[0]+=dir[0]/(sqrt(dir[0]**2+dir[1]**2))*8
                            entities.players[a].lastingForce[1]+=dir[1]/(sqrt(dir[0]**2+dir[1]**2))*4
                        }else{
                            entities.players[a].takeDamage((this.weaponType==415?400:this.weaponType==461||this.weaponType==533?300:this.weaponType==194||this.weaponType==242||this.weaponType==243||this.weaponType==245||this.weaponType==246||this.weaponType==247||this.weaponType==347||this.weaponType==356||this.weaponType==370||this.weaponType==385||this.weaponType==398||this.weaponType==421||this.weaponType==433||this.weaponType==495||this.weaponType==541||this.weaponType==543||this.playerData.name=='DeadlyTank'?200:100)*(crit?3:1))
                            if(this.playerData.name=='TankBump'){
                                entities.players[a].lastingForce[0]+=dir[0]/(sqrt(dir[0]**2+dir[1]**2))*4
                                entities.players[a].lastingForce[1]+=dir[1]/(sqrt(dir[0]**2+dir[1]**2))*2
                            }
                            if(this.weaponType==398){
                                entities.players[a].DOT.damage=1
                                entities.players[a].DOT.active=max(300,entities.players[a].DOT.active)
                            }else if(this.weaponType==461){
                                entities.players[a].stunTime=30
                            }
                        }
                        entities.players[a].velocity.x=dir[0]/(sqrt(dir[0]**2+dir[1]**2))*20+this.velocity.x
                        entities.players[a].velocity.y=dir[1]/(sqrt(dir[0]**2+dir[1]**2))*20+this.velocity.y
                        entities.players[a].collect.time=450
                        entities.players[a].die.killer=this.index
                        if(this.weaponType==246&&this.assort.detonate==0){
                            entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y,153,0,this.id,120,2,false,this.index))
                            this.assort.detonate=30
                        }
                        if(this.playerData.name=='PlayerSurprise'){
                            this.visible=60
                        }
                    }else if(inBoxBox(this,entities.players[a])&&(entities.players[a].id!=this.id&&game.pvp||entities.players[a].id==0&&this.id!=0||entities.players[a].id!=0&&this.id==0)&&!entities.players[a].dead&&!this.dead){
                        let dir=[entities.players[a].position.x-this.position.x,entities.players[a].position.y+entities.players[a].height/2-this.position.y-this.height/2]
                        if(this.weaponType==253||this.weaponType==400){
                            entities.players[a].lastingForce[0]+=dir[0]/(sqrt(dir[0]**2+dir[1]**2))*8
                            entities.players[a].lastingForce[1]+=dir[1]/(sqrt(dir[0]**2+dir[1]**2))*4
                        }else{
                            entities.players[a].takeDamage((this.weaponType==415?400:this.weaponType==461||this.weaponType==533?300:this.weaponType==194||this.weaponType==242||this.weaponType==243||this.weaponType==245||this.weaponType==246||this.weaponType==247||this.weaponType==347||this.weaponType==356||this.weaponType==370||this.weaponType==385||this.weaponType==398||this.weaponType==421||this.weaponType==433||this.weaponType==495||this.weaponType==541||this.weaponType==543||this.playerData.name=='DeadlyTank'?200:100)*(crit?3:1))
                            if(this.playerData.name=='TankBump'){
                                entities.players[a].lastingForce[0]+=dir[0]/(sqrt(dir[0]**2+dir[1]**2))*4
                                entities.players[a].lastingForce[1]+=dir[1]/(sqrt(dir[0]**2+dir[1]**2))*2
                            }
                            if(this.weaponType==398){
                                entities.players[a].DOT.damage=1
                                entities.players[a].DOT.active=max(300,entities.players[a].DOT.active)
                            }else if(this.weaponType==461){
                                entities.players[a].stunTime=30
                            }
                        }
                        entities.players[a].velocity.x=dir[0]/(sqrt(dir[0]**2+dir[1]**2))*20+this.velocity.x
                        entities.players[a].velocity.y=dir[1]/(sqrt(dir[0]**2+dir[1]**2))*20+this.velocity.y
                        entities.players[a].collect.time=450
                        entities.players[a].die.killer=this.index
                        if(this.weaponType==246&&this.assort.detonate==0){
                            entities.projectiles.push(new projectile(graphics.main[0],this.position.x,this.position.y,153,0,this.id,120,2,false,this.index))
                            this.assort.detonate=30
                        }
                        if(this.playerData.name=='PlayerSurprise'){
                            this.visible=60
                        }
                    }
                }
            }
        }
        if(this.critBuff>0){
            this.critBuff--
        }
        if(this.defendBuff>0){
            this.defendBuff--
        }
        if(this.speedBuff>0){
            this.speedBuff--
        }
        if(this.stunTime>0){
            this.stunTime--
        }
        if(this.stuckTime>0){
            this.stuckTime--
        }
        if(this.vulnerableTime>0){
            this.vulnerableTime--
        }
        if(this.confuseTime>0){
            this.confuseTime--
        }
        if(this.bounceTime>0){
            this.bounceTime--
        }
        if(this.assort.detonate>0){
            this.assort.detonate--
        }
        if(this.assort.glove>0){
            this.assort.glove--
        }
        if(this.assort.gas>0){
            this.assort.gas--
        }
        if(this.assort.ultraviolet>0){
            this.assort.ultraviolet--
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
        }else if(this.playerData.name=='PlayerGriefer'||this.playerData.name=='PlayerHuntress'||this.playerData.name=='PlayerStealth'||this.playerData.name=='PlayerStealthception'||this.playerData.name=='PlayerFog'||this.playerData.name=='PlayerSurprise'||this.playerData.name=='PlayerMarine'||this.playerData.name=='PlayerVigilante'||this.playerData.name=='SidekickStealth'||this.playerData.name=='PlayerPhantasm'||this.playerData.name=='PlayerVPN'||this.playerData.name=='PlayerVanguard'){
            if(this.visible>0){
                this.visible--
            }
            if(abs(this.velocity.x)+abs(this.velocity.y)>0.4&&this.playerData.name!='PlayerVPN'){
                this.visible=15
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
        if(!this.disable2){
            this.velocity.x*=1-(this.thrown2?0.025:this.thrown?0.04:0.15)*(this.playerData.name=='PlayerAuger'&&this.weapon.uses>0?0.2:1)
            this.velocity.y+=this.playerData.name=='ParaPistol'||this.playerData.name=='ParaRocketLauncher'||this.playerData.name=='PlayerParaRocketLauncher'||this.playerData.name=='PlayerParaGrenadier'||this.playerData.name=='PlayerStratofortress'||this.playerData.name=='PlayerParachutist'||this.playerData.name=='PlayerDropship'||this.playerData.name=='PlayerApache'||this.playerData.name=='ParaMedic'||this.playerData.name=='BigParaRocketLauncher'||this.playerData.name=='BigCritParaRocketLauncher'||this.playerData.name=='PlayerAirdrop'||this.playerData.name=='SidekickGuardian'||this.playerData.name=='PlayerRadio'||this.playerData.name=='PlayerWhirlybird'||this.playerData.name=='PlayerRain'||this.playerData.name=='PlayerRTX'||this.playerData.name=='PlayerAircraft'?1:1.5
            this.previous.position.x=this.position.x
            this.previous.position.y=this.position.y
            this.position.x+=this.velocity.x
            this.position.y+=this.velocity.y
            this.velocity.x+=this.lastingForce[0]
            this.velocity.y+=this.lastingForce[1]
            this.lastingForce[0]*=0.925
            this.lastingForce[1]*=0.9
        }
        if(this.parachute){
            this.velocity.x*=game.pvp?(game.assault?0.8:0.99):0.5
            this.velocity.y*=2/3
        }else if(this.playerData.name=='ParaPistol'||this.playerData.name=='ParaRocketLauncher'||this.playerData.name=='PlayerParaRocketLauncher'||this.playerData.name=='PlayerParaGrenadier'||this.playerData.name=='PlayerStratofortress'||this.playerData.name=='PlayerParachutist'||this.playerData.name=='PlayerDropship'||this.playerData.name=='PlayerApache'||this.playerData.name=='ParaMedic'||this.playerData.name=='BigParaRocketLauncher'||this.playerData.name=='BigCritParaRocketLauncher'||this.playerData.name=='PlayerRadio'||this.playerData.name=='PlayerWhirlybird'||this.playerData.name=='PlayerRain'||this.playerData.name=='PlayerRTX'||this.playerData.name=='PlayerAircraft'){
            this.velocity.x*=0.9
            if(this.velocity.y>0){
                this.velocity.y*=this.playerData.name=='PlayerWhirlybird'&&this.id>0&&this.id<=game.gaming&&inputs.keys[game.gaming==1?1:this.id-1][2]?0.96:0.6
            }
        }else if(this.playerData.name=='PlayerAirdrop'||this.playerData.name=='SidekickGuardian'){
            if(this.velocity.y>0){
                this.velocity.y*=0.6
            }
        }
        if(this.dizzyTime>0){
            this.dizzyTime--
            this.velocity.x*=0.8
        }
        if(this.chillTime>0){
            this.chillTime--
            this.velocity.x*=0.75
        }
        if(this.shrinkTime>0){
            this.shrinkTime--
            if(this.size>0.4){
                this.life-=(this.playerData.lifeBuff-0.5)*0.005/(this.playerData.sizeBuff*0.5-0.4)*this.life/this.playerData.lifeBuff
                this.size-=0.005
                this.width=8*this.size*2
                this.height=24*this.size*2
                this.offset={position:{x:0,y:12*this.size*2}}
            }
        }
        if(this.gasTime>0){
            this.gasTime--
        }
        if(this.id==0&&!game.body||this.construct||this.sidekick){
            if(game.invis||this.playerData.name=='SidekickStealth'){
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
            }else if(game.invis&&game.level!=13&&game.level!=14||this.playerData.name=='PlayerGriefer'||this.playerData.name=='PlayerHuntress'||this.playerData.name=='PlayerStealth'||this.playerData.name=='PlayerStealthception'||this.playerData.name=='PlayerFog'||this.playerData.name=='PlayerSurprise'||this.playerData.name=='PlayerMarine'||this.playerData.name=='PlayerVigilante'||this.playerData.name=='SidekickStealth'||this.playerData.name=='PlayerPhantasm'||this.playerData.name=='PlayerVPN'||this.playerData.name=='PlayerVanguard'){
                if(this.life<=0){
                    this.fade=smoothAnim(this.fade,!this.dead,0.4,1,5)
                }else{
                    this.fade=smoothAnim(this.fade,this.visible>0,0,1,10)
                }
            }else if(game.past){
                this.fade=smoothAnim(this.fade,!this.dead,0,1,5)
            }else{
                this.fade=smoothAnim(this.fade,!this.dead,0.4,1,5)
            }
        }
        if(entities.projectiles.length>projectilesLength){
            for(let a=projectilesLength,la=entities.projectiles.length;a<la;a++){
                entities.projectiles[a].previous.position.x=this.position.x
                entities.projectiles[a].previous.position.y=this.position.y
            }
        }
    }
}
//basic
function stanh(value){
    return (2**value-1)/(2**value+1)*0.5+0.5
}
function vectorAdd(v1,v2){
    v1.x+=v2.x
    v1.y+=v2.y
}
function vectorSet(v1,v2){
    v1.x=v2.x
    v1.y=v2.y
}
function vectorDot(v1,v2){
    v1.x=v1.x*v2.x
    v1.y=v1.y*v2.y
}
function vectorMultScalar(v,s){
    v.x=v.x*s
    v.y=v.y*s
}
function randSign(){
    return floor(random(0,2))*2-1
}
function sign(value){
    return value>=0?1:-1
}
//calculatory
function inPointBox(point,box){
    return point.position.x>box.position.x-box.width/2&&point.position.x<box.position.x+box.width/2&&point.position.y>box.position.y-box.height/2&&point.position.y<box.position.y+box.height/2
}
function inBoxBox(box1,box2){
    return box1.position.x>box2.position.x-box1.width/2-box2.width/2&&box1.position.x<box2.position.x+box1.width/2+box2.width/2&&box1.position.y>box2.position.y-box1.height/2-box2.height/2&&box1.position.y<box2.position.y+box1.height/2+box2.height/2
}
function onSegment(p,q,r){ 
    return q.x<=max(p.x,r.x)&&q.x>=min(p.x, r.x)&&q.y<=max(p.y,r.y)&&q.y>=min(p.y, r.y)
}
function orientPoint(p,q,r){ 
    s=(q.y-p.y)*(r.x-q.x)-(q.x-p.x)*(r.y-q.y) 
    return s==0?0:s>0?1:2
}
function intersect(p1,q1,p2,q2){
    o1=orientPoint(p1,q1,p2)
    o2=orientPoint(p1,q1,q2)
    o3=orientPoint(p2,q2,p1)
    o4=orientPoint(p2,q2,q1)
    return o1!=o2&&o3!=o4||
    o1==0&&onSegment(p1,p2,q1)||
    o2==0&&onSegment(p1,q2,q1)||
    o3==0&&onSegment(p2,p1,q2)||
    o4==0&&onSegment(p2,q1,q2)
} 
function collideBoxBox(static,mobile){
    /*if(inBoxBox(static,{position:mobile.previous.position,width:mobile.width-1,height:mobile.height-1})){
        return basicCollideBoxBox(static,mobile)
    }*/
    for(let a=0,la=static.boundary.length;a<la;a++){
        for(let b=0,lb=static.boundary[a].length;b<lb;b++){
            if(intersect(mobile.position,mobile.previous.position,
                {x:static.boundary[a][b][0].x+mobile.width/2*(a==2?1:-1),y:static.boundary[a][b][0].y+mobile.height/2*(a==0?1:-1)},
                {x:static.boundary[a][b][1].x+mobile.width/2*(a!=3?1:-1),y:static.boundary[a][b][1].y+mobile.height/2*(a!=1?1:-1)})
            ){
                return a
            }
        }
    }
    return -1
    //return basicCollideBoxBox(static,mobile)
}
function collideBoxBoxIndex1(static,mobile){
    for(let a=0,la=static.boundary.length;a<la;a++){
        for(let b=0,lb=static.boundary[a].length;b<lb;b++){
            if(intersect(mobile.position,mobile.midpoint.position,
                {x:static.boundary[a][b][0].x+mobile.width/2*(a==2?1:-1),y:static.boundary[a][b][0].y+mobile.height/2*(a==0?1:-1)},
                {x:static.boundary[a][b][1].x+mobile.width/2*(a!=3?1:-1),y:static.boundary[a][b][1].y+mobile.height/2*(a!=1?1:-1)})){
                return a
            }
        }
    }
    return basicCollideBoxBox(static,mobile)
}
function collideBoxBoxIndex2(static,mobile){
    for(let a=0,la=static.boundary.length;a<la;a++){
        for(let b=0,lb=static.boundary[a].length;b<lb;b++){
            if(intersect(mobile.midpoint.position,mobile.previous.position,
                {x:static.boundary[a][b][0].x+mobile.width/2*(a==2?1:-1),y:static.boundary[a][b][0].y+mobile.height/2*(a==0?1:-1)},
                {x:static.boundary[a][b][1].x+mobile.width/2*(a!=3?1:-1),y:static.boundary[a][b][1].y+mobile.height/2*(a!=1?1:-1)})){
                return a
            }
        }
    }
    return basicCollideBoxBox(static,mobile)
}
function basicCollideBoxBox(static,mobile){
    let u=atan2(mobile.position.x-static.position.x,mobile.position.y-static.position.y)
    if(u>180){
        u-=360
    }else if(u<-180){
        u+=360
    }
    return u>atan2(-static.width/2-mobile.width/2,static.height/2+mobile.height/2)&&u<atan2(static.width/2+mobile.width/2,static.height/2+mobile.height/2)?
    0:u<atan2(-static.width/2-mobile.width/2,-static.height/2-mobile.height/2)||u>atan2(static.width/2+mobile.width/2,-static.height/2-mobile.height/2)?
    1:u<atan2(static.width/2+mobile.width/2,-static.height/2-mobile.height/2)&&u>atan2(static.width/2+mobile.width/2,static.height/2+mobile.height/2)?
    2:u<atan2(-static.width/2-mobile.width/2,static.height/2+mobile.height/2)&&u>atan2(-static.width/2-mobile.width/2,-static.height/2-mobile.height/2)?
    3:-1
}
function smoothAnim(anim,trigger,minPoint,maxPoint,speed){
	if(trigger&&anim<maxPoint){
		return min(round(anim*speed+1)/speed,maxPoint)
	}
	if(!trigger&&anim>minPoint){
		return max(round(anim*speed-1)/speed,minPoint)
	}
	return anim
}
function formatTime(frames){
    return `${floor(frames/216000)}:${floor(frames/3600)%60<10?`0`:``}${floor(frames/3600)%60}:${floor(frames/60)%60<10?`0`:``}${floor(frames/60)%60}.${floor(frames%60/6*100)<10?`0`:``}${floor(frames%60/6*100)<100?`0`:``}${floor(frames%60/6*100)}`
}
function updateMouse(layer){
	inputs.mouse.x=mouseX
	inputs.mouse.y=mouseY
    if(layer!=undefined){
        inputs.rel.x=(inputs.mouse.x-width/2)/stage.scale+layer.width/2
        inputs.rel.y=(inputs.mouse.y-height/2)/stage.scale+layer.height/2
    }
}
//graphical
function setupBase(){
    colorMode(RGB,255,255,255,1)
    angleMode(DEGREES)
    rectMode(CENTER)
    imageMode(CENTER)
    textAlign(CENTER,CENTER)
    noStroke()
}
function setupLayer(layer){
    layer.colorMode(RGB,255,255,255,1)
    layer.angleMode(DEGREES)
    layer.rectMode(CENTER)
    layer.imageMode(CENTER)
    layer.textAlign(CENTER,CENTER)
    layer.noStroke()
}
function regTriangle(layer,x,y,radiusX,radiusY,direction){
    layer.triangle(x+sin(direction)*radiusX,y+cos(direction)*radiusY,x+sin(direction+120)*radiusX,y+cos(direction+120)*radiusY,x+sin(direction-120)*radiusX,y+cos(direction-120)*radiusY)
}
function regPoly(layer,x,y,sides,radiusX,radiusY,direction){
    layer.beginShape()
    for(let a=0,la=sides;a<la;a++){
        layer.vertex(x+sin(a/la*360+direction)*radiusX,y+cos(a/la*360+direction)*radiusY)
    }
    layer.endShape(CLOSE)
}
function regStar(layer,x,y,points,radiusX,radiusY,innerRadiusX,innerRadiusY,direction){
    layer.beginShape()
    for(let a=0,la=points;a<la;a++){
        layer.vertex(x+sin(a/la*360+direction)*radiusX,y+cos(a/la*360+direction)*radiusY)
        layer.vertex(x+sin((a+0.5)/la*360+direction)*innerRadiusX,y+cos((a+0.5)/la*360+direction)*innerRadiusY)
    }
    layer.endShape(CLOSE)
}
function diamond(layer,x,y,width,height){
    layer.quad(x-width/2,y,x,y-height/2,x+width/2,y,x,y+height/2)
}
function mergeColor(color1,color2,key){
    return [color1[0]*(1-key)+color2[0]*key,color1[1]*(1-key)+color2[1]*key,color1[2]*(1-key)+color2[2]*key]
}
function tripletColor(color1,color2,color3,key){
    return key>=1?[color2[0]*(2-key)+color3[0]*(key-1),color2[1]*(2-key)+color3[1]*(key-1),color2[2]*(2-key)+color3[2]*(key-1)]:[color1[0]*(1-key)+color2[0]*key,color1[1]*(1-key)+color2[1]*key,color1[2]*(1-key)+color2[2]*key]
}
//key
function displayMain(layer){
    let key=[]
    for(let a=0,la=game.players;a<la;a++){
        key.push(entities.players[a].weaponType==6||entities.players[a].weaponType==12?2:1)
    }
    let marker=[-1,-1,-1,-1]
    for(let a=entities.players.length-1,la=0;a>=la;a--){
        if(entities.players[a].id>0&&entities.players[a].id<=4&&marker[entities.players[a].id-1]==-1&&entities.players[a].control==0&&entities.players[a].life>0){
            marker[entities.players[a].id-1]=a
        }
    }
    for(let a=entities.players.length-1,la=0;a>=la;a--){
        if(entities.players[a].id>0&&entities.players[a].id<=4&&marker[entities.players[a].id-1]==-1&&entities.players[a].control==1&&entities.players[a].life>0){
            marker[entities.players[a].id-1]=a
        }
    }
    for(let a=entities.players.length-1,la=0;a>=la;a--){
        if(entities.players[a].id>0&&entities.players[a].id<=4&&marker[entities.players[a].id-1]==-1&&entities.players[a].control==0){
            marker[entities.players[a].id-1]=a
        }
    }
    for(let a=0,la=marker.length;a<la;a++){
        if(marker[a]==-1){
            marker[a]=0
        }
    }
    let scaleKey=game.level==6?8:game.level==8?8:4
    stage.scale=min(width/layer[0].width,height/layer[0].height)
    if(game.gaming==1){
        image(layer[0],width/2,height/2,
                        layer[0].width*stage.scale,layer[0].height*stage.scale,
            
                        entities.players[marker[0]].position.x-layer[0].width/2/scaleKey*key[0]*2,entities.players[marker[0]].position.y-layer[0].height/2/scaleKey*key[0]*2,
            
                        layer[0].width/scaleKey*key[0]*2,layer[0].height/scaleKey*key[0]*2)
    }else if(game.gaming==2){
        image(layer[0],width/2-layer[0].width*stage.scale*0.25,height/2,
                        layer[0].width*stage.scale*0.5,layer[0].height*stage.scale,
            
                        entities.players[marker[1]].position.x-layer[0].width/2/scaleKey*key[1],entities.players[marker[1]].position.y-layer[0].height/2/scaleKey*key[1]*2,
                        
                        layer[0].width/scaleKey*key[1],layer[0].height/scaleKey*key[1]*2)
        image(layer[0],width/2+layer[0].width*stage.scale*0.25,height/2,
                        layer[0].width*stage.scale*0.5,layer[0].height*stage.scale,
            
                        entities.players[marker[0]].position.x-layer[0].width/2/scaleKey*key[0],entities.players[marker[0]].position.y-layer[0].height/2/scaleKey*key[0]*2,
            
                        layer[0].width/scaleKey*key[0],layer[0].height/scaleKey*key[0]*2)
    }else{
        image(layer[0],width/2-layer[0].width*stage.scale*0.25,height/2-layer[0].height*stage.scale*0.25,
                        layer[0].width*stage.scale*0.5,layer[0].height*stage.scale*0.5,
            
                        entities.players[marker[1]].position.x-layer[0].width/2/scaleKey*key[1],entities.players[marker[1]].position.y-layer[0].height/2/scaleKey*key[1],
            
                        layer[0].width/scaleKey*key[1],layer[0].height/scaleKey*key[1])
                        if(game.gaming>=2){
        image(layer[0],width/2+layer[0].width*stage.scale*0.25,height/2-layer[0].height*stage.scale*0.25,
                        layer[0].width*stage.scale*0.5,layer[0].height*stage.scale*0.5,
            
                        entities.players[marker[0]].position.x-layer[0].width/2/scaleKey*key[0],entities.players[marker[0]].position.y-layer[0].height/2/scaleKey*key[0],
                        
                        layer[0].width/scaleKey*key[0],layer[0].height/scaleKey*key[0])
                        }
                        if(game.gaming>=3){
        image(layer[0],width/2-layer[0].width*stage.scale*0.25,height/2+layer[0].height*stage.scale*0.25,
                        layer[0].width*stage.scale*0.5,layer[0].height*stage.scale*0.5,
            
                        entities.players[marker[2]].position.x-layer[0].width/2/scaleKey*key[2],entities.players[marker[2]].position.y-layer[0].height/2/scaleKey*key[2],
            
                        layer[0].width/scaleKey*key[2],layer[0].height/scaleKey*key[2])
                        }
                        if(game.gaming>=4){
        image(layer[0],width/2+layer[0].width*stage.scale*0.25,height/2+layer[0].height*stage.scale*0.25,
                        layer[0].width*stage.scale*0.5,layer[0].height*stage.scale*0.5,
            
                        entities.players[marker[3]].position.x-layer[0].width/2/scaleKey*key[3],entities.players[marker[3]].position.y-layer[0].height/2/scaleKey*key[3],
            
                        layer[0].width/scaleKey*key[3],layer[0].height/scaleKey*key[3])
                        }
    }
}
function generateLevel(level,layer){
    entities.projectiles=[]
    entities.walls=[[],[]]
    game.tileset=[layer.width/level[0].length,layer.height/level.length]
    let index=0
    for(let a=0,la=level.length;a<la;a++){
        for(let b=0,lb=level[a].length;b<lb;b++){
            switch(level[a][b]){
				case '#': case '.':
                    entities.walls[1].push(new wall(graphics.pane[1],game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],1))
                break
                case '@':
                    entities.walls[1].push(new wall(graphics.pane[1],game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],2))
                break
                case '!':
                    entities.walls[1].push(new wall(graphics.pane[1],game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1],3))
                break
                case '%':
                    entities.walls[0].push(new wall(graphics.main[0],game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],4))
                break
                case '$':
                    entities.walls[0].push(new wall(graphics.main[0],game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.4)*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.2,5))
                break
                case '|':
                    entities.walls[0].push(new wall(graphics.pane[0],game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                break
            }
        }
    }
    let weapon=game.randomizer?floor(random(18,types.player.length)):floor(random(0,9))+floor(random(0,1.2))*9
    for(let c=0,lc=game.players;c<lc;c++){
        for(let a=0,la=level.length;a<la;a++){
            for(let b=0,lb=level[a].length;b<lb;b++){
                if(int(level[a][b])==c+1&&!game.pvp){
                    index--
                    entities.players.push(new player(layer,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],c+1,0,[],true,game.past?weapon:game.randomizer?floor(random(18,types.player.length)):floor(random(0,9))+floor(random(0,1.2))*9,index))
                }
                if(level[a][b]=='qwerty'[c]&&game.pvp){
                    index--
                    entities.players.push(new player(layer,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],c+1,0,[],true,game.past?weapon:game.randomizer?floor(random(18,types.player.length)):floor(random(0,9))+floor(random(0,1.2))*9,index))
                }
            }
        }
    }
    entities.walls.forEach(set=>set.forEach(item=>item.checkHorizontal()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkVertical()))
    entities.walls[1]=entities.walls[1].filter(item=>!item.remove)
    entities.walls.forEach(set=>set.forEach(item=>item.checkRedundancy()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkOverlay()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkGap()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkBar()))
    let temps=[]
    for(let a=0,la=entities.walls[1].length;a<la;a++){
        temps.push(a)
    }
    entities.walls[1].forEach(wall=>wall.display())
    while(temps.length>0){
        let index=floor(random(0,temps.length))
        entities.walls[1][temps[index]].displayOver()
        temps.splice(index,1)
    }
    run.back=[entities.players]
    run.fore=[entities.projectiles,entities.players,entities.walls[0]]
    run.update=[entities.walls[1]]
    run.info=[entities.players]
    if(game.level==6){
        for(let a=0,la=graphics.pane[0].width/25;a<la;a++){
            for(let b=0,lb=graphics.pane[0].height/25-20;b<lb;b++){
                effectiveA=(a*7+b*3)%la
                let pos=[effectiveA*25+random(0,25),b*25+500+sin(effectiveA*30+random(-15,15))*100+sin(effectiveA*8.5+random(-10,10))*50]
                let size=random(45,60)
                let bounce=random(0,1)
                graphics.pane[0].fill(
                    10+pos[1]/graphics.pane[0].height*10+bounce*20,
                    20-pos[1]/graphics.pane[0].height*5+bounce*20,
                    10+bounce*20
                )
                regPoly(graphics.pane[0],pos[0],pos[1],floor(random(4,9)),size/2,size/2,random(0,360))
            }
        }
    }
}
function kill(){
    for(let a=0,la=entities.players.length;a<la;a++){
        if(entities.players[a].id==0){
            entities.players[a].life=0
        }
    }
}
function newLoop(){
    for(let a=0,la=entities.players.length;a<la;a++){
        entities.players[a].selector=0
        entities.players[a].control=1
        entities.players[a].respawn()
    }
    generateLevel(levels[game.level],graphics.main[0])
}
function newWave(level,layer){
    if(display.cycle>=types.mission[game.mission].wave.length){
        display.win=1
        display.wait=999999999999999999999
        game.classicRespawn=true
        game.pvp=true
    }else{
        if(game.level==8){
            entities.walls[0].forEach(wall=>wall.exploded=false)
        }
        display.anim=1
        game.sendTime=0
        game.index=0
        for(let a=0,la=types.mission[game.mission].wave[display.cycle].length;a<la;a++){
            if(types.mission[game.mission].wave[display.cycle][a][1]==1){
                game.stack.push([floor(random(0,6))+((types.mission[game.mission].wave[display.cycle][a][0]=='Spy'||types.mission[game.mission].wave[display.cycle][a][0]=='SpyHealSelf'||types.mission[game.mission].wave[display.cycle][a][0]=='RapidSpy')?0:6),types.mission[game.mission].wave[display.cycle][a][0]])
            }else{
                for(let b=0,lb=ceil(types.mission[game.mission].wave[display.cycle][a][1]*constrain(game.players/2,0,1)*(game.classicRespawn?0.5:1)*(game.level==8?1.5:1))*game.diff;b<lb;b++){
                    game.stack.push([floor(random(0,6))+((types.mission[game.mission].wave[display.cycle][a][0]=='Spy'||types.mission[game.mission].wave[display.cycle][a][0]=='SpyHealSelf'||types.mission[game.mission].wave[display.cycle][a][0]=='RapidSpy')?0:6),types.mission[game.mission].wave[display.cycle][a][0]])
                }
            }
        }
        display.cycle++
    }
}
function findName(name,list){
	for(let a=0,la=list.length;a<la;a++){
		if(list[a].name==name){
			return a
		}
	}
	return -1
}
function runTransition(layer){
    if(transition.trigger){
        transition.anim+=0.05
        if(transition.anim>=1){
            transition.trigger=false
            stage.scene=transition.scene
            newLoop()
        }
    }else if(transition.anim>0){
        transition.anim-=0.05
    }
    if(transition.anim>0){
        layer.fill(0)
        layer.rect(layer.width/2,layer.height/4*transition.anim,layer.width,layer.height*transition.anim/2)
        layer.rect(layer.width/2,layer.height*(1-1/4*transition.anim),layer.width,layer.height*transition.anim/2)
        layer.rect(layer.width/4*transition.anim,layer.height/2,layer.width/2*transition.anim,layer.height*(1-transition.anim))
        layer.rect(layer.width*(1-1/4*transition.anim),layer.height/2,layer.width/2*transition.anim,layer.height*(1-transition.anim))
    }
}
function checkEnd(level,layer){
    if(game.past){
        if(!transition.trigger){
            let ids=[]
            for(let a=0,la=entities.players.length;a<la;a++){
                if(!ids.includes(entities.players[a].id)&&entities.players[a].life>0){
                    ids.push(entities.players[a].id)
                }
            }
            if(ids.length<=1){
                if(ids.length==1){
                    game.wins[ids[0]-1]++
                }
                transition.scene='main'
                transition.trigger=true
            }
        }
    }else{
        if(game.level==8){
            if(deployer.spawn.length>=5&&deployer.timer<=0){
                for(let a=0,la=level.length;a<la;a++){
                    for(let b=0,lb=level[a].length;b<lb;b++){
                        if(level[a][b]=='A'){
                            entities.walls[0].push(new wall(graphics.main[0],game.tileset[0]/2+(b-7)*game.tileset[0],game.tileset[1]/2+(a+1.7)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,6))
                            entities.walls[0].push(new wall(graphics.main[0],game.tileset[0]/2+(b-3)*game.tileset[0],game.tileset[1]/2+(a+1.7)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,6))
                            entities.walls[0].push(new wall(graphics.main[0],game.tileset[0]/2+(b-5)*game.tileset[0],game.tileset[1]/2+(a+2.4)*game.tileset[1],game.tileset[0]*5,game.tileset[1],6))
                            entities.walls[0][entities.walls[0].length-1].checkGap()
                            entities.walls[0][entities.walls[0].length-2].checkGap()
                            entities.walls[0][entities.walls[0].length-3].checkGap()
                            entities.walls[0][entities.walls[0].length-1].checkBar()
                            entities.walls[0][entities.walls[0].length-2].checkBar()
                            entities.walls[0][entities.walls[0].length-3].checkBar()
                            let tick=0
                            for(let c=0,lc=5;c<lc;c++){
                                entities.players.push(deployer.spawn[c])
                                entities.players[entities.players.length-1].position.x=game.tileset[0]/2+(b-5)*game.tileset[0]-50+tick*25
                                entities.players[entities.players.length-1].position.y=game.tileset[1]/2+(a+1.8)*game.tileset[1]-50
                                entities.players[entities.players.length-1].disable=true
                                entities.walls[0][entities.walls[0].length-3].carry.push(entities.players[entities.players.length-1])
                                tick++
                                deployer.spawn.splice(c,1)
                                c--
                                lc--
                            }
                            deployer.timer=300
                        }
                    }
                }
            }
            if(deployer.timer>0){
                deployer.timer--
            }
        }
        if(game.stack.length>0){
            if(game.sendTime>0){
                game.sendTime--
            }else{
                for(let a=0,la=level.length;a<la;a++){
                    for(let b=0,lb=level[a].length;b<lb;b++){
                        if(level[a][b]=='123456ABCDEF'[game.stack[0][0]]){
                            if(a>5&&game.stack[0][0]>=6&&game.level==8){
                                deployer.spawn.push(new player(layer,game.tileset[0]/2+b*game.tileset[0]+random(-20,20),game.tileset[1]/2+a*game.tileset[1]+random(-20,20),0,0,[],true,findName(game.stack[0][1],types.player),game.index))
                            }else{
                                entities.players.push(new player(layer,game.tileset[0]/2+b*game.tileset[0]+random(-20,20),game.tileset[1]/2+a*game.tileset[1]+random(-20,20),0,0,[],true,findName(game.stack[0][1],types.player),game.index))
                                if(game.level==8){
                                    entities.players[entities.players.length-1].position.x=[entities.players[floor(random(0,game.players))].position.x+random(-30,30),layer.width*0.6][floor(random(0,2))]
                                    entities.players[entities.players.length-1].position.ys=1000
                                    entities.players[entities.players.length-1].parachute=true
                                }
                                game.index++
                            }
                        }
                    }
                }
                game.sendTime=types.mission[game.mission].sendTime*4/max(1,game.gaming)*(game.pvp?10:1)/game.diff
                game.stack.splice(0,1)
            }
        }else{
            let total=0
            let subTotal=0
            for(let a=0,la=entities.players.length;a<la;a++){
                if(entities.players[a].id==0&&entities.players[a].life>0){
                    total++
                }
                if(entities.players[a].id==0&&entities.players[a].base.life>2000){
                    subTotal++
                }
            }
            if(total<4&&subTotal==0&&!(display.cycle==types.mission[game.mission].wave.length&&total>0)){
                display.wait--
                if(display.wait<=0){
                    display.wait=240
                    newWave(level,layer)
                }
            }
        }
    }
}
function setupGraphics(){
    setupBase()
}
function initialGraphics(){
    switch(game.level){
        case 1:
            graphics.main.push(createGraphics(1700,750))
        break
        case 5:
            graphics.main.push(createGraphics(3000,1300))
        break
        case 6:
            graphics.main.push(createGraphics(3600,2000))
        break
        case 7:
            graphics.main.push(createGraphics(2400,1400))
        break
        case 8:
            graphics.main.push(createGraphics(5000,3000))
        break
        default:
            graphics.main.push(createGraphics(2500,1600))
        break
    }
    //graphics.main.push(createGraphics(1200,800))

    //graphics.main.push(createGraphics(2000,800))
    //
    //graphics.main.push(createGraphics(4500,1800))
    setupLayer(graphics.main[0])
    graphics.pane.push(createGraphics(graphics.main[0].width,graphics.main[0].height))
    setupLayer(graphics.pane[0])
    graphics.pane.push(createGraphics(graphics.main[0].width,graphics.main[0].height))
    setupLayer(graphics.pane[1])
}
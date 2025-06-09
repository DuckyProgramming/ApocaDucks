//basic
function dm(){
    return game.level==36||game.level==41||game.level==45||game.level==50||game.level==51||game.level==52||game.level==53||game.level==56||game.level==60||game.level==61||game.level==62||game.level==64||game.level==71||game.level==72||game.level==73||game.level==74||game.level==75||game.level==90||game.level==91||game.level==92||game.level==93
}
function teamMode(){
    return menu.level==44||menu.level==65||menu.level==67||menu.level==76||menu.level==77||menu.level==78||menu.level==44||menu.level==65||menu.level==67||menu.level==76||menu.level==77||menu.level==78||menu.level==81||menu.level==88||menu.level==89&&game.pvp
}
function backed(){
    return game.level==25||game.level==26||game.level==54||game.level==55||game.level==61||game.level==65||game.level==67||game.level==68||game.level==69||game.level==71||game.level==77||game.level==78||game.level==88||game.level==89||game.level==90||game.level==91||game.level==92
}
function playerColor(owner){
    switch(owner){
        case -1:
            return [200,200,200]
        case 0:
            return [255,255,0]
        case 1:
            return [15,75,255]
        case 2:
            return teamMode()?[235,35,45]:[225,15,255]
        case 3:
            return [55,225,15]
        case 4:
            return [225,105,15]
        case 5:
            return [15,235,255]
        case 6:
            return [125,15,255]
    }
}
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
function range(start,end){
    return [...Array(end-start).keys()].map(a=>a+start)
}
function safeRange(start,end){
    //return [...Array(end-start).keys()].map(a=>a+start).filter(a=>types.player[a].weapon<findName('Arcer',types.weapon))
    return range(start,end)
}
function sortNumbers(numbers){
	return numbers.length<=1?numbers:mergeNumbers(sortNumbers(numbers.slice(0,floor(numbers.length/2))),sortNumbers(numbers.slice(floor(numbers.length/2),numbers.length)))
}
function mergeNumbers(left,right){
	let result=[]
	while(left.length>0&&right.length>0){
		result.push((left[0]<=right[0]?left:right).shift())
	}
	return [...result,...left,...right]
}
function sortNumbers2(numbers){
	return numbers.length<=1?numbers:mergeNumbers2(sortNumbers2(numbers.slice(0,floor(numbers.length/2))),sortNumbers2(numbers.slice(floor(numbers.length/2),numbers.length)))
}
function mergeNumbers2(left,right){
	let result=[]
	while(left.length>0&&right.length>0){
		result.push((left[0][0]<=right[0][0]?left:right).shift())
	}
	return [...result,...left,...right]
}
function cutName(name){
    return name.substr(name.length-2,name.length).localeCompare(' C')==0||name.substr(name.length-2,name.length).localeCompare(' W')==0?name.substr(0,name.length-2):name
}
function shuffleArray(array){
    let base=array.slice()
    for(let a=0,la=array.length;a<la-1;a++){
        let index=floor(random(0,la-a))
        let hold=array[index]
        array.splice(index,1)
        array.push(hold)
    }
    return base

}
function swivel(char){
    switch(char){
        case '>':
            return '<'
        case '<':
            return '>'
        case '[':
            return ']'
        case ']':
            return '['
        default:
            return char
    }
}
function mirrorMap(level){
    let result=[]
    for(let a=0,la=level.length;a<la;a++){
        result.push("")
        for(let b=level[a].length-1,lb=1;b>=lb;b--){
            result[a]+=swivel(level[a][b])
        }
        for(let b=0,lb=level[a].length;b<lb;b++){
            result[a]+=level[a][b]
        }
    }
    for(let a=0,la=result.length;a<la;a++){
        let final=""
        final+='"'
        final+=result[a]
        final+='",\n'
        print(final)
    }
}
//calculatory
function inPointBox(point,box){
    return point.position.x>box.position.x-box.width/2&&point.position.x<box.position.x+box.width/2&&point.position.y>box.position.y-box.height/2&&point.position.y<box.position.y+box.height/2
}
function inBoxBox(box1,box2){
    return box1.position.x>box2.position.x-box1.width/2-box2.width/2&&box1.position.x<box2.position.x+box1.width/2+box2.width/2&&box1.position.y>box2.position.y-box1.height/2-box2.height/2&&box1.position.y<box2.position.y+box1.height/2+box2.height/2
}
function inFullBoxBox(box1,box2){
    return box1.position.x>box2.position.x+box1.width/2-box2.width/2&&box1.position.x<box2.position.x-box1.width/2+box2.width/2&&box1.position.y>box2.position.y+box1.height/2-box2.height/2&&box1.position.y<box2.position.y-box1.height/2+box2.height/2
}
function inFullBoxBoxOpen(box1,box2){
    return box1.position.x>box2.position.x+box1.width/2-box2.width/2-1&&box1.position.x<box2.position.x-box1.width/2+box2.width/2+1&&box1.position.y>box2.position.y+box1.height/2-box2.height/2-1&&box1.position.y<box2.position.y-box1.height/2+box2.height/2+1
}
function triangleArea(triangle){
    return abs(triangle[0].x*(triangle[1].y-triangle[2].y)+triangle[1].x*(triangle[2].y-triangle[0].y)+triangle[2].x*(triangle[0].y-triangle[1].y))
}
function inPointTriangle(point,triangle){
    return abs(triangleArea(triangle)-(triangleArea([point,triangle[0],triangle[1]])+triangleArea([point,triangle[0],triangle[2]])+triangleArea([point,triangle[1],triangle[2]])))<1
}
function inTriangleBoxBasic(triangle,box){
    let corners=[
        {x:box.position.x-box.width/2,y:box.position.y-box.height/2},
        {x:box.position.x+box.width/2,y:box.position.y-box.height/2},
        {x:box.position.x-box.width/2,y:box.position.y+box.height/2},
        {x:box.position.x+box.width/2,y:box.position.y+box.height/2}
    ]
    return intersect(corners[0],corners[1],triangle[0],triangle[1])||
        intersect(corners[1],corners[2],triangle[0],triangle[1])||
        intersect(corners[2],corners[3],triangle[0],triangle[1])||
        intersect(corners[3],corners[0],triangle[0],triangle[1])||
        intersect(corners[0],corners[1],triangle[1],triangle[2])||
        intersect(corners[1],corners[2],triangle[1],triangle[2])||
        intersect(corners[2],corners[3],triangle[1],triangle[2])||
        intersect(corners[3],corners[0],triangle[1],triangle[2])||
        intersect(corners[0],corners[1],triangle[2],triangle[0])||
        intersect(corners[1],corners[2],triangle[2],triangle[0])||
        intersect(corners[2],corners[3],triangle[2],triangle[0])||
        intersect(corners[3],corners[0],triangle[2],triangle[0])||
        inPointTriangle({x:box.position.x,y:box.position.y},triangle)
    /*return inPointTriangle({x:box.position.x-box.width/2,y:box.position.y-box.height/2},triangle)||
        inPointTriangle({x:box.position.x+box.width/2,y:box.position.y-box.height/2},triangle)||
        inPointTriangle({x:box.position.x-box.width/2,y:box.position.y+box.height/2},triangle)||
        inPointTriangle({x:box.position.x+box.width/2,y:box.position.y+box.height/2},triangle)*/
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
function intersectKey(p1,q1,p2,q2){
    let ud=((q2.y-p2.y)*(q1.x-p1.x)-(q2.x-p2.x)*(q1.y-p1.y))
    let ua=((q2.x-p2.x)*(p1.y-p2.y)-(q2.y-p2.y)*(p1.x-p2.x))/ud
    return {x:p1.x+ua*(q1.x-p1.x),y:p1.y+ua*(q1.y-p1.y)}
}
function collideBoxBox(static,mobile){
    /*if(inBoxBox(static,{position:mobile.previous.position,width:mobile.width-1,height:mobile.height-1})){
        return basicCollideBoxBox(static,mobile)
    }*/
    let set=mobile.position.y<mobile.previous.position.y?[0,4,5,1,6,7,2,3]:[1,6,7,0,4,5,2,3]
    for(let a=0,la=set.length;a<la;a++){
        for(let b=0,lb=static.boundary[set[a]].length;b<lb;b++){
            if(set[a]<=3){
                if(intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[set[a]][b][0].x+mobile.width/2*(set[a]==2?1:-1),y:static.boundary[set[a]][b][0].y+mobile.height/2*(set[a]==0?1:-1)-(set[a]==0?0.02:0)},
                    {x:static.boundary[set[a]][b][1].x+mobile.width/2*(set[a]!=3?1:-1),y:static.boundary[set[a]][b][1].y+mobile.height/2*(set[a]!=1?1:-1)-(set[a]==0?0.02:0)})
                ){
                    return set[a]
                }
            }else if(set[a]==4){
                if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[set[a]][b][0].x+mobile.width/2,y:static.boundary[set[a]][b][0].y-mobile.height/2},
                    {x:static.boundary[set[a]][b][1].x+mobile.width/2,y:static.boundary[set[a]][b][1].y-mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[set[a]][b][0].x-mobile.width/2,y:static.boundary[set[a]][b][0].y-mobile.height/2},
                    {x:static.boundary[set[a]][b][0].x+mobile.width/2,y:static.boundary[set[a]][b][0].y-mobile.height/2})
                ){
                    return set[a]
                }else if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[set[a]][b][1].x+mobile.width/2,y:static.boundary[set[a]][b][1].y-mobile.height/2},
                    {x:static.boundary[set[a]][b][1].x+mobile.width/2,y:static.boundary[set[a]][b][1].y+mobile.height/2})
                ){
                    return 8
                }
            }else if(set[a]==5){
                if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[set[a]][b][0].x-mobile.width/2,y:static.boundary[set[a]][b][0].y-mobile.height/2},
                    {x:static.boundary[set[a]][b][1].x-mobile.width/2,y:static.boundary[set[a]][b][1].y-mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[set[a]][b][0].x-mobile.width/2,y:static.boundary[set[a]][b][0].y-mobile.height/2},
                    {x:static.boundary[set[a]][b][0].x+mobile.width/2,y:static.boundary[set[a]][b][0].y-mobile.height/2})
                ){
                    return set[a]
                }else if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[set[a]][b][1].x-mobile.width/2,y:static.boundary[set[a]][b][1].y-mobile.height/2},
                    {x:static.boundary[set[a]][b][1].x-mobile.width/2,y:static.boundary[set[a]][b][1].y+mobile.height/2})
                ){
                    return 9
                }
            }else if(set[a]==6){
                if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[set[a]][b][0].x-mobile.width/2,y:static.boundary[set[a]][b][0].y+mobile.height/2},
                    {x:static.boundary[set[a]][b][1].x-mobile.width/2,y:static.boundary[set[a]][b][1].y+mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[set[a]][b][0].x+mobile.width/2,y:static.boundary[set[a]][b][0].y+mobile.height/2},
                    {x:static.boundary[set[a]][b][0].x-mobile.width/2,y:static.boundary[set[a]][b][0].y+mobile.height/2})
                ){
                    return set[a]
                }else if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[set[a]][b][1].x-mobile.width/2,y:static.boundary[set[a]][b][1].y+mobile.height/2},
                    {x:static.boundary[set[a]][b][1].x-mobile.width/2,y:static.boundary[set[a]][b][1].y-mobile.height/2})
                ){
                    return 10
                }
            }else if(set[a]==7){
                if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[set[a]][b][0].x+mobile.width/2,y:static.boundary[set[a]][b][0].y+mobile.height/2},
                    {x:static.boundary[set[a]][b][1].x+mobile.width/2,y:static.boundary[set[a]][b][1].y+mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[set[a]][b][0].x+mobile.width/2,y:static.boundary[set[a]][b][0].y+mobile.height/2},
                    {x:static.boundary[set[a]][b][0].x-mobile.width/2,y:static.boundary[set[a]][b][0].y+mobile.height/2})
                ){
                    return set[a]
                }else if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[set[a]][b][1].x+mobile.width/2,y:static.boundary[set[a]][b][1].y+mobile.height/2},
                    {x:static.boundary[set[a]][b][1].x+mobile.width/2,y:static.boundary[set[a]][b][1].y-mobile.height/2})
                ){
                    return 11
                }
            }
        }
    }
    return -1
    //return basicCollideBoxBox(static,mobile)
}
function collideBoxBoxIndex1(static,mobile){
    for(let a=0,la=static.boundary.length;a<la;a++){
        for(let b=0,lb=static.boundary[a].length;b<lb;b++){
            if(a<=3){
                if(intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2*(a==2?1:-1),y:static.boundary[a][b][0].y+mobile.height/2*(a==0?1:-1)},
                    {x:static.boundary[a][b][1].x+mobile.width/2*(a!=3?1:-1),y:static.boundary[a][b][1].y+mobile.height/2*(a!=1?1:-1)})
                ){
                    return a
                }
            }else if(a==4){
                if(
                    intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2})||
                    intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2})||
                    intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y})
                ){
                    return a
                }else if(
                    intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})
                ){
                    return 8
                }
            }else if(a==5){
                if(
                    intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2})||
                    intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2})||
                    intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y})
                ){
                    return a
                }else if(
                    intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})
                ){
                    return 9
                }
            }else if(a==6){
                if(
                    intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2})||
                    intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2})||
                    intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y})
                ){
                    return a
                }else if(
                    intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})
                ){
                    return 8
                }
            }else if(a==7){
                if(
                    intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2})||
                    intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2})||
                    intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y})
                ){
                    return a
                }else if(
                    intersect(mobile.position,{x:mobile.midpoint.position.x+static.velocity.x,y:mobile.midpoint.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})
                ){
                    return 9
                }
            }
        }
    }
    return -1
    //return basicCollideBoxBox(static,mobile)
}
function collideBoxBoxIndex2(static,mobile){
    for(let a=0,la=static.boundary.length;a<la;a++){
        for(let b=0,lb=static.boundary[a].length;b<lb;b++){
            if(a<=3){
                if(intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2*(a==2?1:-1),y:static.boundary[a][b][0].y+mobile.height/2*(a==0?1:-1)},
                    {x:static.boundary[a][b][1].x+mobile.width/2*(a!=3?1:-1),y:static.boundary[a][b][1].y+mobile.height/2*(a!=1?1:-1)})
                ){
                    return a
                }
            }else if(a==4){
                if(
                    intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2})||
                    intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2})||
                    intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y})
                ){
                    return a
                }else if(
                    intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})
                ){
                    return 8
                }
            }else if(a==5){
                if(
                    intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2})||
                    intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2})||
                    intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y})
                ){
                    return a
                }else if(
                    intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})
                ){
                    return 9
                }
            }else if(a==6){
                if(
                    intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})||
                    intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2})||
                    intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y})
                ){
                    return a
                }else if(
                    intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})
                ){
                    return 8
                }
            }else if(a==7){
                if(
                    intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})||
                    intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2})||
                    intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                        {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2},
                        {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y})
                ){
                    return a
                }else if(
                    intersect(mobile.midpoint.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                        {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y},
                        {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})
                ){
                    return 9
                }
            }
        }
    }
    return -1
    //return basicCollideBoxBox(static,mobile)
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
function regNum(value){
    return round(value)>=1000?floor(round(value)/1000)+'.'+floor(round(value)/100)%10+'K':round(value)
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
    layer.triangle(x+lsin(direction)*radiusX,y+lcos(direction)*radiusY,x+lsin(direction+120)*radiusX,y+lcos(direction+120)*radiusY,x+lsin(direction-120)*radiusX,y+lcos(direction-120)*radiusY)
}
function regPoly(layer,x,y,sides,radiusX,radiusY,direction){
    layer.beginShape()
    for(let a=0,la=sides;a<la;a++){
        layer.vertex(x+lsin(a/la*360+direction)*radiusX,y+lcos(a/la*360+direction)*radiusY)
    }
    layer.endShape(CLOSE)
}
function regStar(layer,x,y,points,radiusX,radiusY,innerRadiusX,innerRadiusY,direction){
    layer.beginShape()
    for(let a=0,la=points;a<la;a++){
        layer.vertex(x+lsin(a/la*360+direction)*radiusX,y+lcos(a/la*360+direction)*radiusY)
        layer.vertex(x+lsin((a+0.5)/la*360+direction)*innerRadiusX,y+lcos((a+0.5)/la*360+direction)*innerRadiusY)
    }
    layer.endShape(CLOSE)
}
function regGem(layer,x,y,sides,radiusX,radiusY,direction){
    layer.beginShape()
    for(let a=0,la=sides;a<la;a++){
        layer.vertex(x+lsin(a/la*360+direction)*radiusX,y+lcos(a/la*360+direction)*radiusY)
        if(a%2==0){
            layer.vertex(x,y)
        }
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
function displayMain(layer,effective,keyStore){
    if(game.flash){
        for(let a=0,la=graphics.overlay.length;a<la;a++){
            graphics.overlay[a].background(0)
            graphics.overlay[a].erase()
            graphics.overlay[a].beginShape()
            graphics.overlay[a].vertex(
                (entities.players[a].position.x-effective[a][0])/keyStore[a]+graphics.overlay[a].width*0.5-65*sin(entities.players[a].direction.main*5/3),
                (entities.players[a].position.y-effective[a][1])/keyStore[a]+graphics.overlay[a].height/2-160
            )
            graphics.overlay[a].vertex(
                (entities.players[a].position.x-effective[a][0])/keyStore[a]+map(0.5+0.5*sin(entities.players[a].direction.main*5/3),0,1,graphics.overlay[a].width*0.5+130,graphics.overlay[a].width),
                (entities.players[a].position.y-effective[a][1])/keyStore[a]+graphics.overlay[a].height/2-160-100*sin(entities.players[a].direction.main*5/3)
            )
            graphics.overlay[a].vertex(
                (entities.players[a].position.x-effective[a][0])/keyStore[a]+map(0.5+0.5*sin(entities.players[a].direction.main*5/3),0,1,graphics.overlay[a].width*0.5+130,graphics.overlay[a].width),
                (entities.players[a].position.y-effective[a][1])/keyStore[a]+graphics.overlay[a].height/2+160+100*sin(entities.players[a].direction.main*5/3)
            )
            graphics.overlay[a].vertex(
                (entities.players[a].position.x-effective[a][0])/keyStore[a]+graphics.overlay[a].width*0.5-65*sin(entities.players[a].direction.main*5/3),
                (entities.players[a].position.y-effective[a][1])/keyStore[a]+graphics.overlay[a].height/2+160
            )
            graphics.overlay[a].vertex(
                (entities.players[a].position.x-effective[a][0])/keyStore[a]+map(0.5+0.5*sin(entities.players[a].direction.main*5/3),0,1,0,graphics.overlay[a].width*0.5-130),
                (entities.players[a].position.y-effective[a][1])/keyStore[a]+graphics.overlay[a].height/2+160-100*sin(entities.players[a].direction.main*5/3)
            )
            graphics.overlay[a].vertex(
                (entities.players[a].position.x-effective[a][0])/keyStore[a]+map(0.5+0.5*sin(entities.players[a].direction.main*5/3),0,1,0,graphics.overlay[a].width*0.5-130),
                (entities.players[a].position.y-effective[a][1])/keyStore[a]+graphics.overlay[a].height/2-160+100*sin(entities.players[a].direction.main*5/3)
            )
            graphics.overlay[a].endShape()
        }
    }else if((game.level==79||game.level==82)&&!dev.sight){
        for(let a=0,la=graphics.overlay.length-1;a<la;a++){
            graphics.overlay[a+1].background(0)
            graphics.overlay[a+1].erase()
            graphics.overlay[a+1].push()
            graphics.overlay[a+1].translate(
                graphics.overlay[a+1].width*0.5+(entities.players[a].truePrevious.position.x-effective[a][0])/keyStore[a],
                graphics.overlay[a+1].height*0.5+(entities.players[a].truePrevious.position.y-effective[a][1])/keyStore[a]
            )
            graphics.overlay[a+1].scale(1.2)
            sizing=1
            for(let b=0,lb=30;b<lb;b++){
                graphics.overlay[a+1].fill(0,0.0025*(b+1)*(1-min(1,entities.players[a].infoAnim.wet)*0.9))
                graphics.overlay[a+1].beginShape()
                graphics.overlay[a+1].vertex(
                    20*sin(entities.players[a].direction.main*5/3),
                    -100
                )
                graphics.overlay[a+1].vertex(
                    map(0.5+0.5*sin(entities.players[a].direction.main*5/3),0,1,30,graphics.overlay[a+1].width*0.2/sizing),
                    -(100-b/lb*75/4)-(10-b/lb*75/4)*sin(entities.players[a].direction.main*5/3)
                )
                graphics.overlay[a+1].vertex(
                    map(0.5+0.5*sin(entities.players[a].direction.main*5/3),0,1,75,graphics.overlay[a+1].width*0.45/sizing),
                    -(100-b/lb*75)-(40-b/lb*75)*sin(entities.players[a].direction.main*5/3)
                )
                graphics.overlay[a+1].vertex(
                    map(0.5+0.5*sin(entities.players[a].direction.main*5/3),0,1,90,graphics.overlay[a+1].width*0.5/sizing),
                    0
                )
                graphics.overlay[a+1].vertex(
                    map(0.5+0.5*sin(entities.players[a].direction.main*5/3),0,1,75,graphics.overlay[a+1].width*0.45/sizing),
                    (100-b/lb*75)+(40-b/lb*75)*sin(entities.players[a].direction.main*5/3)
                )
                graphics.overlay[a+1].vertex(
                    map(0.5+0.5*sin(entities.players[a].direction.main*5/3),0,1,30,graphics.overlay[a+1].width*0.2/sizing),
                    (100-b/lb*75/4)+(10-b/lb*75/4)*sin(entities.players[a].direction.main*5/3)
                )
                graphics.overlay[a+1].vertex(
                    (entities.players[a].truePrevious.position.x-effective[a][0])/keyStore[a]+20*sin(entities.players[a].direction.main*5/3),
                    100
                )
                graphics.overlay[a+1].vertex(
                    map(0.5+0.5*sin(entities.players[a].direction.main*5/3),0,1,-graphics.overlay[a+1].width*0.2/sizing,-30),
                    (100-b/lb*75/4)-(10-b/lb*75/4)*sin(entities.players[a].direction.main*5/3)
                )
                graphics.overlay[a+1].vertex(
                    map(0.5+0.5*sin(entities.players[a].direction.main*5/3),0,1,-graphics.overlay[a+1].width*0.45/sizing,-75),
                    (100-b/lb*75)-(40-b/lb*75)*sin(entities.players[a].direction.main*5/3)
                )
                graphics.overlay[a+1].vertex(
                    map(0.5+0.5*sin(entities.players[a].direction.main*5/3),0,1,-graphics.overlay[a+1].width*0.5/sizing,-90),
                    0
                )
                graphics.overlay[a+1].vertex(
                    map(0.5+0.5*sin(entities.players[a].direction.main*5/3),0,1,-graphics.overlay[a+1].width*0.45/sizing,-75),
                    -(100-b/lb*75)+(40-b/lb*75)*sin(entities.players[a].direction.main*5/3)
                )
                graphics.overlay[a+1].vertex(
                    map(0.5+0.5*sin(entities.players[a].direction.main*5/3),0,1,-graphics.overlay[a+1].width*0.2/sizing,-30),
                    -(100-b/lb*75/4)+(10-b/lb*75/4)*sin(entities.players[a].direction.main*5/3)
                )
                graphics.overlay[a+1].endShape()
                graphics.overlay[a+1].scale(0.975)
                sizing*=0.975
            }
            graphics.overlay[a+1].pop()
        }
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
    for(let a=0,la=layer.length;a<la;a++){
        stage.scale=min(width/layer[a].width,height/layer[a].height)
    }
    if(game.gaming==1){
        image(
            layer[0],
            width/2,height/2,width,height
        )
    }else if(game.gaming==2){
        image(
            layer[0],
            width*3/4,height/2,width/2,height
        )
        image(
            layer[1],
            width/4,height/2,width/2,height
        )
    }else if(game.gaming==5){
        image(
            layer[0],
            width*5/6,height/4,width/3,height/2
        )
        if(game.gaming>=2){
            image(
                layer[1],
                width/6,height/4,width/3,height/2
            )
        }
        if(game.gaming>=3){
            image(
                layer[2],
                width/2,height/4,width/3,height/2
            )
        }
        if(game.gaming>=4){
            image(
                layer[3],
                width/3,height*3/4,width/3,height/2
            )
        }
        if(game.gaming>=5){
            image(
                layer[4],
                width*2/3,height*3/4,width/3,height/2
            )
        }
    }else{
        image(
            layer[0],
            width*3/4,height/4,width/2,height/2
        )
        if(game.gaming>=2){
            image(
                layer[1],
                width/4,height/4,width/2,height/2
            )
        }
        if(game.gaming>=3){
            image(
                layer[2],
                width/4,height*3/4,width/2,height/2
            )
        }
        if(game.gaming>=4){
            image(
                layer[3],
                width*3/4,height*3/4,width/2,height/2
            )
        }
    }
    if(game.level==62){
        if(game.gaming==1){
            image(
                graphics.overlay[1],
                width/2,height/2,width,height
            )
        }else if(game.gaming==2){
            image(
                graphics.overlay[1],
                width*3/4,height/2,width/2,height
            )
            image(
                graphics.overlay[1],
                width/4,height/2,width/2,height
            )
        }else if(game.gaming==5){
            image(
                graphics.overlay[1],
                width*5/6,height/4,width/3,height/2
            )
            if(game.gaming>=2){
                image(
                    graphics.overlay[1],
                    width/6,height/4,width/3,height/2
                )
            }
            if(game.gaming>=3){
                image(
                    graphics.overlay[1],
                    width/2,height/4,width/3,height/2
                )
            }
            if(game.gaming>=4){
                image(
                    graphics.overlay[1],
                    width/3,height*3/4,width/3,height/2
                )
            }
            if(game.gaming>=5){
                image(
                    graphics.overlay[1],
                    width*2/3,height*3/4,width/3,height/2
                )
            }
        }else{
            image(
                graphics.overlay[1],
                width*3/4,height/4,width/2,height/2
            )
            if(game.gaming>=2){
                image(
                    graphics.overlay[1],
                    width/4,height/4,width/2,height/2
                )
            }
            if(game.gaming>=3){
                image(
                    graphics.overlay[1],
                    width/4,height*3/4,width/2,height/2
                )
            }
            if(game.gaming>=4){
                image(
                    graphics.overlay[1],
                    width*3/4,height*3/4,width/2,height/2
                )
            }
        }
    }
    if(game.flash&&game.level!=13&&game.level!=14||game.level==79||game.level==82){
        if(game.gaming==1){
            image(
                graphics.overlay[1],
                width/2,height/2,width,height
            )
        }else if(game.gaming==2){
            image(
                graphics.overlay[1],
                width*3/4,height/2,width/2,height
            )
            image(
                graphics.overlay[2],
                width/4,height/2,width/2,height
            )
        }else{
            image(
                graphics.overlay[1],
                width*3/4,height/4,width/2,height/2
            )
            if(game.gaming>=2){
                image(
                    graphics.overlay[2],
                    width/4,height/4,width/2,height/2
                )
            }
            if(game.gaming>=3){
                image(
                    graphics.overlay[3],
                    width/4,height*3/4,width/2,height/2
                )
            }
            if(game.gaming>=4){
                image(
                    graphics.overlay[4],
                    width*3/4,height*3/4,width/2,height/2
                )
            }
        }
    }
    if(
        game.level==19||game.level==22||game.level==23||game.level==24||game.level==25||game.level==26||game.level==27||game.level==28||game.level==29||game.level==30||
        game.level==31||game.level==32||game.level==33||game.level==34||game.level==35||game.level==36||game.level==37||game.level==38||game.level==39||game.level==40||
        game.level==41||game.level==42||game.level==43||game.level==44||game.level==45||game.level==47||game.level==49||game.level==50||game.level==51||game.level==52||
        game.level==53||game.level==54||game.level==55||game.level==56||game.level==58||game.level==59||game.level==60||game.level==61||game.level==62||game.level==63||
        game.level==64||game.level==65||game.level==67||game.level==68||game.level==69||game.level==70||game.level==71||game.level==72||game.level==73||game.level==74||
        game.level==75||game.level==76||game.level==77||game.level==78||game.level==79||game.level==81||game.level==82||game.level==83||game.level==84||game.level==85||
        game.level==86||game.level==87||game.level==88||game.level==89||game.level==90||game.level==91||game.level==92||game.level==93
    ){
        image(
            graphics.overlay[0],
            width/2,100,width,200
        )
        graphics.overlay[0].clear()
    }
}
function generateLevel(info,layer){
    let level=[]
    for(let a=0,la=info.length;a<la;a++){
        level.push(info[a].slice())
    }
    entities.projectiles=[]
    switch(game.level){
        case 29: case 36: case 37: case 41: case 43: case 45: case 46: case 50: case 51: case 52:
        case 53: case 56: case 60: case 61: case 62: case 64: case 71: case 72: case 73: case 74:
        case 75: case 79: case 81: case 82: case 83: case 85: case 90: case 91: case 92:
            game.placer=[[],[],[],[]]
        break
    }
    if(game.level==29&&display.cycle>0){
        for(let a=0,la=entities.walls[1].length;a<la;a++){
            if(entities.walls[1][a].type==57){
                game.placer[2].push([entities.walls[1][a].weapon,entities.walls[1][a].ammo,entities.walls[1][a].uses])
            }
        }
    }
    if((dm()||game.level==81)&&entities.walls.length>0){
        for(let a=0,la=entities.walls[1].length;a<la;a++){
            if(entities.walls[1][a].type==33||entities.walls[1][a].type==42){
                game.placer[2].push(entities.walls[1][a].timers)
            }
        }
    }
    if(game.level==37){
        if(entities.walls.length>0){
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==33&&entities.walls[1][a].pos==0){
                    game.placer[2].push(entities.walls[1][a].timers)
                }
            }
        }
        let possible=[[0],[1],[2],[0,1],[0,2],[1,2],[0,1,2],[0,1,2],[0,1,2]]
        game.placer[0]=possible[floor(random(0,possible.length))]
        game.placer[3]=0
    }
    if(game.level==41&&display.cycle>0){
        for(let a=0,la=entities.walls[1].length;a<la;a++){
            if(entities.walls[1][a].type==57){
                game.placer[3].push([entities.walls[1][a].weapon,entities.walls[1][a].ammo,entities.walls[1][a].uses])
            }
        }
    }
    entities.walls=[[],[],[],[]]
    game.spawner=[]
    switch(game.level){
        case 1:
            game.edge=[1700,750]
        break
        case 2:
            game.edge=[1200,800]
        break
        case 5:
            game.edge=[3000,1300]
        break
        case 6:
            game.edge=[3600,2000]
        break
        case 7:
            game.edge=[2400,1400]
        break
        case 8:
            game.edge=[5000,3000]
        break
        case 15: case 18:
            game.edge=[10000,3300]
        break
        case 16:
            game.edge=[16000,2800]
        break
        case 17:
            game.edge=[5480,3000]
        break
        case 19:
            game.edge=[12800,2500]
        break
        case 20: case 46:
            game.edge=[4500,1700]
        break
        case 21:
            game.edge=[9500,2000]
        break
        case 22:
            game.edge=[9000,2880]
            game.sectors=[
                [1200,660,2400,1000],
                [7450,635,3100,950],
                [4150,510,3500,700],
                [2050,1410,1300,900],
                [700,1310,1400,300],
                [700,1610,1400,300],
                [4340,1010,2480,300],
                [3800,1335,1100,350],
                [6700,1310,2600,400],
                [5850,1460,6300,600],
                [5700,1980,6600,240],
                [4500,2160,9600,800],
                [2820,1010,400,300],
                [5740,1010,320,300],
            ]
        break
        case 23: case 35:
            game.edge=[9000,2880]
            game.sectors=[
                [1200,660,2400,1000],
                [7450,635,3100,950],
                [4150,510,3500,700],
                [1925,1410,1050,900],
                [700,1310,1400,300],
                [700,1610,1400,300],
                [4120,1010,2040,300],
                [3150,1335,1100,350],
                [6700,1310,2600,400],
                [5725,1460,6550,600],
                [5700,1980,6600,240],
                [4500,2160,9600,800],
                [2900,1010,400,300],
                [5520,1010,760,300],
            ]
        break
        case 24:
            game.edge=[level[0].length*50,level.length*40]
        break
        case 25: case 26:
            game.edge=[level[0].length*40,level.length*40]
            game.sectors=[
                [5100,2120,680,160],
                [3860,1660,920,440],
                [5080,1860,7600,600],
                [8390,1160,3700,480],
                [3910,1420,5260,280],

                [640,1880,1280,1200],
                [2050,1200,1540,160],
                [3660,1200,720,160],
                [5520,1200,2040,160],
                [3240,1040,3120,160],

                [3660,880,1320,160],
                [3060,1200,480,160],
                [4260,1200,480,160],
                [6300,1000,480,160],
                [6540,840,1080,160],

                [6300,680,600,160],
                [6030,1000,60,160],
            ]
        break
        case 27:
            game.edge=[level[0].length*40,level.length*35]
            game.sectors=[
                [180,1767.5,280,175],
                [10820,1767.5,280,175],
                [3780,1820,280,210],
                [7220,1820,280,210],
                [3180,1960,200,210],
                [7820,1960,200,210],
                [game.edge[0]*0.5,game.edge[1]*0.5,game.edge[0]+1,game.edge[1]+1],
            ]
        break
        case 28:
            game.edge=[level[0].length*42,level.length*42]
        break
        case 29: case 45: case 53:
            game.edge=[level[0].length*44,level.length*36]
        break
        case 30:
            game.edge=[level[0].length*45,level.length*40]
            game.sectors=[
                [630,2420,1260,760],
                [5602.5,1960,225,160],
                [5602.5,1720,1620,320],
                [5602.5,1480,1080,160],
                [5602.5,1320,1260,160],

                [5602.5,1160,450,160],
                [3510,2120,1890,160],
                [4240,1960,1010,160],
                [4263.75,1800,1057.5,160],
                [4263.75,1640,1057.5,160],

                [1867.5,1960,3735,160],
                [1867.5,1800,3735,160],
                [2092.5,1640,1260,160],
                [2092.5,1480,720,160],
                [6941.25,1800,1057.5,160],

                [7687.5,1640,2552.5,160],
                [7762.5,1480,540,160],
                [7762.5,1320,720,160],
                [9180,1320,1080,1080],
                [4852.5,1480,420,160],

                [6352.5,1480,420,160],
                [7312.5,1480,360,160],
                [8212.5,1480,360,160],

            ]
        break
        case 31:
            game.edge=[level[0].length*160/3,2500]
        break
        case 32:
            game.edge=[level[0].length*48,level.length*42]
            game.sectors=[
                [1872,2814,960,168],
                [6216,2520,144,168],
                [492,2436,984,420],
                [8664,966,432,168],
                [9912,1470,5616,840],

                [7320,2016,432,252],
                [11112,1995,336,210],
                [12072,1995,336,210],
                [6384,2352,480,168],
                [8664,1990,480,210],

                [game.edge[0]*0.5,game.edge[1]*0.5,game.edge[0]+1,game.edge[1]+1],
            ]
        break
        case 33:
            game.edge=[level[0].length*48,level.length*42]
            game.sectors=[
                [1872,2814,960,168],
                [6216,2520,144,168],
                [492,2436,984,420],
                [8664,966,432,168],
                [9912,1470,5616,840],

                [7320,2016,432,252],
                [11112,1995,336,210],
                [12072,1995,336,210],
                [6384,2352,480,168],
                [0,0,0,0],

                [game.edge[0]*0.5,game.edge[1]*0.5,game.edge[0]+1,game.edge[1]+1],
            ]
        break
        case 34: case 50:
            game.edge=[level[0].length*44,level.length*38]
            game.sectors=[
                [4400,1178,264,304],
                [2112,1655,1232,114],
                [880,1691,440,190],
                [2574,1235,220,190],
                [3146,1140,308,152],

                [6138,570,308,152],
                [4334,760,88,152],
                [4422,760,88,152],
                [1386,1617,220,190],
                [3652,1140,264,152],

                [1600,1427,220,190],
                [4070,1406,220,152],
                [6666,798,308,152],
                [4906,1064,44,76],
                [4906,1368,44,76],

                [5434,1178,44,76],
                [3476,1292,88,152],
                [4774,1140,44,76],
                [5478,1083,44,114],
                [5522,950,44,76],

                [5214,1121,660,418],
                [2024,1560,308,76],
                [2596,1560,264,76],
            ]
        break
        case 35:
            game.edge=[level[0].length*46,level.length*40]
        break
        case 37:
            game.edge=[level[0].length*46,level.length*40]
        break
        case 38:
            game.edge=[level[0].length*44,level.length*36]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*4,game.edge[1]-game.tileset[1]*12.5,game.tileset[0]*8,game.tileset[1]*25],
                [game.edge[0]-game.tileset[0]*4,game.edge[1]-game.tileset[1]*12.5,game.tileset[0]*8,game.tileset[1]*25],
                [game.tileset[0]*53.25,game.edge[1]-game.tileset[1]*8.5,game.tileset[0]*38.5,game.tileset[1]*17],
                [game.edge[0]-game.tileset[0]*53.25,game.edge[1]-game.tileset[1]*8.5,game.tileset[0]*38.5,game.tileset[1]*17],
                [game.tileset[0]*53.25,game.edge[1]-game.tileset[1]*19,game.tileset[0]*38.5,game.tileset[1]*4],
                [game.edge[0]-game.tileset[0]*53.25,game.edge[1]-game.tileset[1]*19,game.tileset[0]*38.5,game.tileset[1]*4],
                [game.tileset[0]*48,game.edge[1]-game.tileset[1]*23,game.tileset[0]*28,game.tileset[1]*4],
                [game.edge[0]-game.tileset[0]*48,game.edge[1]-game.tileset[1]*23,game.tileset[0]*28,game.tileset[1]*4],
                [game.edge[0]*0.5,game.edge[1]-game.tileset[1]*23,game.tileset[0]*21,game.tileset[1]*4],
                [game.tileset[0]*43,game.edge[1]-game.tileset[1]*27,game.tileset[0]*18,game.tileset[1]*4],
                [game.edge[0]-game.tileset[0]*43,game.edge[1]-game.tileset[1]*27,game.tileset[0]*18,game.tileset[1]*4],
                [game.edge[0]*0.5,game.edge[1]-game.tileset[1]*27,game.tileset[0]*41,game.tileset[1]*4],
                [game.tileset[0]*53.25,game.edge[1]-game.tileset[1]*31,game.tileset[0]*38.5,game.tileset[1]*4],
                [game.edge[0]-game.tileset[0]*53.25,game.edge[1]-game.tileset[1]*31,game.tileset[0]*38.5,game.tileset[1]*4],
                [game.tileset[0]*53.25,game.edge[1]-game.tileset[1]*35,game.tileset[0]*38.5,game.tileset[1]*4],
                [game.edge[0]-game.tileset[0]*53.25,game.edge[1]-game.tileset[1]*35,game.tileset[0]*38.5,game.tileset[1]*4],
                [game.tileset[0]*17,game.edge[1]*0.5,game.tileset[0]*34,game.edge[1]],
                [game.edge[0]-game.tileset[0]*17,game.edge[1]*0.5,game.tileset[0]*34,game.edge[1]],
            ]
        break
        case 39:
            game.edge=[level[0].length*46,level.length*38]
        break
        case 40: case 52:
            game.edge=[level[0].length*40,level.length*36]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*58,game.tileset[1]*35,game.tileset[0]*25,game.tileset[1]*4],
                [game.tileset[0]*87.5,game.tileset[1]*34,game.tileset[0]*5,game.tileset[1]*2],
                [game.tileset[0]*95.5,game.tileset[1]*41,game.tileset[0]*5,game.tileset[1]*2],
                [game.tileset[0]*71,game.tileset[1]*43,game.tileset[0]*5,game.tileset[1]*2],
                [game.tileset[0]*76,game.tileset[1]*43,game.tileset[0]*5,game.tileset[1]*2],
                
                [game.tileset[0]*79,game.tileset[1]*28,game.tileset[0]*72,game.tileset[1]*10],
                [game.tileset[0]*92.25,game.tileset[1]*36.5,game.tileset[0]*45.5,game.tileset[1]*7],
                [game.tileset[0]*57.5,game.tileset[1]*46,game.tileset[0]*115,game.tileset[1]*12],
                [game.tileset[0]*44,game.tileset[1]*35,game.tileset[0]*3,game.tileset[1]*4],
                [game.tileset[0]*67.75,game.tileset[1]*36.5,game.tileset[0]*3.5,game.tileset[1]*7],
            ]
        break
        case 41:
            game.edge=[level[0].length*40,level.length*35]
        break
        case 42:
            game.edge=[level[0].length*46,level.length*40]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*164.5,game.tileset[1]*40,game.tileset[0]*53,game.tileset[1]*10],
            ]
        break
        case 43:
            game.edge=[level[0].length*42,level.length*40]
        break
        case 44:
            game.edge=[level[0].length*42,level.length*38]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*6.5,game.tileset[1]*47,game.tileset[0]*5,game.tileset[1]*4],
                [game.tileset[0]*318.5,game.tileset[1]*47,game.tileset[0]*5,game.tileset[1]*4],
                [game.tileset[0]*83.5,game.tileset[1]*48,game.tileset[0]*5,game.tileset[1]*4],
                [game.tileset[0]*241.5,game.tileset[1]*48,game.tileset[0]*5,game.tileset[1]*4],
                [game.tileset[0]*162.5,game.tileset[1]*53,game.tileset[0]*5,game.tileset[1]*4],

                [game.tileset[0]*89,game.tileset[1]*42,game.tileset[0]*12,game.tileset[1]*8],
                [game.tileset[0]*236,game.tileset[1]*42,game.tileset[0]*12,game.tileset[1]*8],
                [game.tileset[0]*97,game.tileset[1]*40,game.tileset[0]*4,game.tileset[1]*4],
                [game.tileset[0]*228,game.tileset[1]*40,game.tileset[0]*4,game.tileset[1]*4],
                [game.tileset[0]*162.5,game.tileset[1]*47.5,game.tileset[0]*35,game.tileset[1]*7],

                [game.tileset[0]*127,game.tileset[1]*43,game.tileset[0]*6,game.tileset[1]*4],
                [game.tileset[0]*198,game.tileset[1]*43,game.tileset[0]*6,game.tileset[1]*4],
                [game.edge[0]*0.5,game.edge[1]*0.5,game.edge[0],game.edge[1]]
            ]
        break
        case 47:
            game.edge=[level[0].length*42,level.length*40]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*101.5,game.tileset[1]*26.5,game.tileset[0]*17,game.tileset[1]*3],
                [game.tileset[0]*104,game.tileset[1]*30,game.tileset[0]*36,game.tileset[1]*4],
                [game.tileset[0]*73.5,game.tileset[1]*31.5,game.tileset[0]*25,game.tileset[1]*1],
                [game.tileset[0]*83.5,game.tileset[1]*35.5,game.tileset[0]*29,game.tileset[1]*1],
                [game.tileset[0]*71.5,game.tileset[1]*38.5,game.tileset[0]*11,game.tileset[1]*3],

                [game.tileset[0]*132,game.tileset[1]*34,game.tileset[0]*20,game.tileset[1]*4],
                [game.tileset[0]*132,game.tileset[1]*28.5,game.tileset[0]*20,game.tileset[1]*7],
                [game.tileset[0]*101.5,game.tileset[1]*36.5,game.tileset[0]*9,game.tileset[1]*7],
                [game.tileset[0]*61,game.tileset[1]*36.5,game.tileset[0]*8,game.tileset[1]*7],
                [game.tileset[0]*47.5,game.tileset[1]*38,game.tileset[0]*5,game.tileset[1]*4],
                
                [game.tileset[0]*100,game.tileset[1]*42,game.tileset[0]*20,game.tileset[1]*4],
                [game.tileset[0]*72.5,game.tileset[1]*41,game.tileset[0]*145,game.tileset[1]*8],
                [game.tileset[0]*72.5,game.tileset[1]*35,game.tileset[0]*145,game.tileset[1]*4],
                [game.tileset[0]*72.5,game.tileset[1]*23 ,game.tileset[0]*145,game.tileset[1]*20],
            ]
        break
        case 49:
            game.edge=[level[0].length*40,level.length*32]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*39.5,game.tileset[1]*75,game.tileset[0]*79,game.tileset[1]*30],
                [game.tileset[0]*100,game.tileset[1]*62.5,game.tileset[0]*42,game.tileset[1]*5],
                [game.tileset[0]*90,game.tileset[1]*58.5,game.tileset[0]*12,game.tileset[1]*3],
                [game.tileset[0]*106,game.tileset[1]*57.5,game.tileset[0]*22,game.tileset[1]*5],
                [game.tileset[0]*64,game.tileset[1]*57.5,game.tileset[0]*40,game.tileset[1]*5],

                [game.tileset[0]*81.25,game.tileset[1]*52.5,game.tileset[0]*26.5,game.tileset[1]*5],
                [game.tileset[0]*85.25,game.tileset[1]*47.5,game.tileset[0]*18.5,game.tileset[1]*5],
                [game.tileset[0]*87.25,game.tileset[1]*42.5,game.tileset[0]*14.5,game.tileset[1]*5],
                [game.tileset[0]*90.25,game.tileset[1]*37.5,game.tileset[0]*4.5,game.tileset[1]*5],
                [game.tileset[0]*81.5,game.tileset[1]*37.5,game.tileset[0]*13,game.tileset[1]*5],

                [game.tileset[0]*90.5,game.tileset[1]*32.5,game.tileset[0]*45,game.tileset[1]*5],
                [game.tileset[0]*73.25,game.tileset[1]*27.5,game.tileset[0]*10.5,game.tileset[1]*5],
                [game.tileset[0]*91.75,game.tileset[1]*27.5,game.tileset[0]*26.5,game.tileset[1]*5],
                [game.tileset[0]*105.25,game.tileset[1]*37.5,game.tileset[0]*25.5,game.tileset[1]*5],
                [game.tileset[0]*99.75,game.tileset[1]*42.5,game.tileset[0]*10.5,game.tileset[1]*5],

                [game.tileset[0]*101.75,game.tileset[1]*47.5,game.tileset[0]*14.5,game.tileset[1]*5],
                [game.tileset[0]*171.5,game.tileset[1]*32.5,game.tileset[0]*53,game.tileset[1]*5],
                [game.tileset[0]*129.5,game.tileset[1]*32.5,game.tileset[0]*33,game.tileset[1]*5],
                [game.tileset[0]*138.5,game.tileset[1]*27.5,game.tileset[0]*37,game.tileset[1]*5],
                [game.tileset[0]*174.5,game.tileset[1]*27.5,game.tileset[0]*13,game.tileset[1]*5],

                [game.tileset[0]*166.5,game.tileset[1]*22.5,game.tileset[0]*45,game.tileset[1]*5],
                [game.tileset[0]*171.5,game.tileset[1]*37.5,game.tileset[0]*17,game.tileset[1]*5],
                [game.tileset[0]*157,game.tileset[1]*37.5,game.tileset[0]*12,game.tileset[1]*5],
                [game.tileset[0]*189,game.tileset[1]*37.5,game.tileset[0]*18,game.tileset[1]*5],
                [game.tileset[0]*192.25,game.tileset[1]*42.5,game.tileset[0]*11.5,game.tileset[1]*5],

                [game.tileset[0]*192.25,game.tileset[1]*47.5,game.tileset[0]*11.5,game.tileset[1]*5],
                [game.tileset[0]*192.25,game.tileset[1]*52.5,game.tileset[0]*11.5,game.tileset[1]*5],
                [game.tileset[0]*192.25,game.tileset[1]*57.5,game.tileset[0]*11.5,game.tileset[1]*5],
                [game.tileset[0]*178,game.tileset[1]*63.5,game.tileset[0]*4,game.tileset[1]*3],
                [game.tileset[0]*188.5,game.tileset[1]*62.5,game.tileset[0]*19,game.tileset[1]*5],

                [game.tileset[0]*193,game.tileset[1]*67.5,game.tileset[0]*10,game.tileset[1]*5],
                [game.tileset[0]*193,game.tileset[1]*74,game.tileset[0]*10,game.tileset[1]*8],
                [game.tileset[0]*172.5,game.tileset[1]*77.5,game.tileset[0]*31,game.tileset[1]*5],
                [game.tileset[0]*171,game.tileset[1]*72.5,game.tileset[0]*28,game.tileset[1]*5],
                [game.tileset[0]*169,game.tileset[1]*67.5,game.tileset[0]*24,game.tileset[1]*5],

                [game.tileset[0]*118,game.tileset[1]*77.5,game.tileset[0]*78,game.tileset[1]*25],
                [game.tileset[0]*164.5,game.tileset[1]*57.5,game.tileset[0]*44,game.tileset[1]*5],
                [game.tileset[0]*140.5,game.tileset[1]*58.5,game.tileset[0]*4,game.tileset[1]*3],
                [game.tileset[0]*162,game.tileset[1]*52.5,game.tileset[0]*18,game.tileset[1]*5],
                [game.tileset[0]*178.75,game.tileset[1]*52.5,game.tileset[0]*15.5,game.tileset[1]*5],

                [game.tileset[0]*158.25,game.tileset[1]*47.5,game.tileset[0]*12.5,game.tileset[1]*5],
                [game.tileset[0]*175.5,game.tileset[1]*47.5,game.tileset[0]*22,game.tileset[1]*5],
                [game.tileset[0]*176.5,game.tileset[1]*42.5,game.tileset[0]*20,game.tileset[1]*5],
                [game.tileset[0]*157.25,game.tileset[1]*42.5,game.tileset[0]*18.5,game.tileset[1]*5],
                [game.tileset[0]*123.75,game.tileset[1]*45,game.tileset[0]*58.5,game.tileset[1]*20],
            ]
        break
        case 54:
            game.edge=[level[0].length*42,level.length*38]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*19.5,game.tileset[1]*24.5,game.tileset[0]*31,game.tileset[1]*23],
                [game.tileset[0]*45,game.tileset[1]*34,game.tileset[0]*20,game.tileset[1]*4],
                [game.tileset[0]*39.5,game.tileset[1]*30,game.tileset[0]*9,game.tileset[1]*4],
                [game.tileset[0]*47.5,game.tileset[1]*26,game.tileset[0]*9,game.tileset[1]*4],
                [game.tileset[0]*39.5,game.tileset[1]*22,game.tileset[0]*9,game.tileset[1]*4],

                [game.tileset[0]*55.5,game.tileset[1]*18,game.tileset[0]*25,game.tileset[1]*4],
                [game.tileset[0]*71.5,game.tileset[1]*30,game.tileset[0]*41,game.tileset[1]*4],
                [game.tileset[0]*71.5,game.tileset[1]*26,game.tileset[0]*23,game.tileset[1]*4],
                [game.tileset[0]*75.5,game.tileset[1]*22,game.tileset[0]*31,game.tileset[1]*4],
                [game.tileset[0]*79.5,game.tileset[1]*16,game.tileset[0]*23,game.tileset[1]*8],

                [game.tileset[0]*95.5,game.tileset[1]*12,game.tileset[0]*9,game.tileset[1]*8],
                [game.tileset[0]*95.5,game.tileset[1]*18,game.tileset[0]*9,game.tileset[1]*4],
                [game.tileset[0]*107.5,game.tileset[1]*16,game.tileset[0]*15,game.tileset[1]*8],
                [game.tileset[0]*97,game.tileset[1]*22,game.tileset[0]*10,game.tileset[1]*4],
                [game.tileset[0]*119.5,game.tileset[1]*14,game.tileset[0]*9,game.tileset[1]*4],

                [game.tileset[0]*140,game.tileset[1]*18,game.tileset[0]*50,game.tileset[1]*4],
                [game.tileset[0]*122,game.tileset[1]*22,game.tileset[0]*34,game.tileset[1]*4],
                [game.tileset[0]*99.5,game.tileset[1]*26,game.tileset[0]*31,game.tileset[1]*4],
                [game.tileset[0]*104,game.tileset[1]*30,game.tileset[0]*10,game.tileset[1]*4],
                [game.tileset[0]*111.5,game.tileset[1]*34,game.tileset[0]*47,game.tileset[1]*4],

                [game.tileset[0]*127.5,game.tileset[1]*26,game.tileset[0]*23,game.tileset[1]*4],
                [game.tileset[0]*120,game.tileset[1]*30,game.tileset[0]*8,game.tileset[1]*4],
                [game.tileset[0]*136,game.tileset[1]*30,game.tileset[0]*24,game.tileset[1]*4],
                [game.tileset[0]*158.5,game.tileset[1]*22,game.tileset[0]*21,game.tileset[1]*4],
                [game.tileset[0]*157,game.tileset[1]*26,game.tileset[0]*16,game.tileset[1]*4],
                [game.tileset[0]*158.5,game.tileset[1]*30.5,game.tileset[0]*21,game.tileset[1]*5],

                [game.tileset[0]*217,game.tileset[1]*24,game.tileset[0]*96,game.tileset[1]*20],

            ]
        break
        case 55:
            game.edge=[level[0].length*45,level.length*40]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*142,game.tileset[1]*17.5,game.tileset[0]*16,game.tileset[1]*35],
                [game.tileset[0]*102,game.tileset[1]*18.5,game.tileset[0]*64,game.tileset[1]*37],
                [game.tileset[0]*69,game.tileset[1]*21,game.tileset[0]*2,game.tileset[1]*42],
                [game.tileset[0]*80.5,game.tileset[1]*42.5,game.tileset[0]*11,game.tileset[1]*3],
                [game.tileset[0]*79.5,game.tileset[1]*51.5,game.tileset[0]*13,game.tileset[1]*3],

                [game.tileset[0]*73.5,game.tileset[1]*49,game.tileset[0]*7,game.tileset[1]*2],
                [game.tileset[0]*36.5,game.tileset[1]*50,game.tileset[0]*19,game.tileset[1]*4],
                [game.tileset[0]*31.5,game.tileset[1]*44,game.tileset[0]*3,game.tileset[1]*4],
                [game.tileset[0]*14.5,game.tileset[1]*21.5,game.tileset[0]*29,game.tileset[1]*43],
                [game.tileset[0]*75.5,game.tileset[1]*45.5,game.tileset[0],game.tileset[1]*3],

                [game.tileset[0]*70,game.tileset[1]*46,game.tileset[0]*2,game.tileset[1]*2],
            ]
        break
        case 56: case 92:
            game.edge=[level[0].length*45,level.length*40]
        break
        case 58:
            game.edge=[level[0].length*46,level.length*40]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*88,game.tileset[1]*59.5,game.tileset[0]*54,game.tileset[1]*7],
                [game.tileset[0]*93.5,game.tileset[1]*51.5,game.tileset[0]*43,game.tileset[1]*9],
                [game.tileset[0]*78.5,game.tileset[1]*42,game.tileset[0]*13,game.tileset[1]*6],
                [game.tileset[0]*138,game.tileset[1]*40,game.tileset[0]*6,game.tileset[1]*4],
                [game.tileset[0]*131.5,game.tileset[1]*36.5,game.tileset[0]*21,game.tileset[1]*3],

                [game.tileset[0]*132,game.tileset[1]*33.5,game.tileset[0]*22,game.tileset[1]*3],
                [game.tileset[0]*132,game.tileset[1]*30.5,game.tileset[0]*22,game.tileset[1]*3],
                [game.tileset[0]*159.5,game.tileset[1]*28,game.tileset[0]*7,game.tileset[1]*4],
                [game.edge[0]*0.5,game.edge[1]*0.5,game.edge[0]+1,game.edge[1]+1],
            ]
        break
        case 59:
            game.edge=[level[0].length*42,level.length*38]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*40,game.tileset[1]*49.5,game.tileset[0]*80,game.tileset[1]*7],
                [game.tileset[0]*82.5,game.tileset[1]*47.5,game.tileset[0]*5,game.tileset[1]*3],
                [game.tileset[0]*84,game.tileset[1]*51,game.tileset[0]*8,game.tileset[1]*4],
                [game.tileset[0]*50.5,game.tileset[1]*44.5,game.tileset[0]*40,game.tileset[1]*3],
                [game.tileset[0]*29,game.tileset[1]*43,game.tileset[0]*3,game.tileset[1]*6],

                [game.tileset[0]*44,game.tileset[1]*35,game.tileset[0]*32,game.tileset[1]*10],
                [game.tileset[0]*78.5,game.tileset[1]*32,game.tileset[0]*37,game.tileset[1]*4],
                [game.tileset[0]*78.5,game.tileset[1]*37,game.tileset[0]*37,game.tileset[1]*6],
                [game.tileset[0]*104.5,game.tileset[1]*37,game.tileset[0]*9,game.tileset[1]*6],
                [game.tileset[0]*121,game.tileset[1]*35,game.tileset[0]*24,game.tileset[1]*10],

                [game.tileset[0]*139,game.tileset[1]*37,game.tileset[0]*12,game.tileset[1]*6],
                [game.tileset[0]*137.75,game.tileset[1]*32,game.tileset[0]*9.5,game.tileset[1]*4],
                [game.tileset[0]*143.75,game.tileset[1]*32,game.tileset[0]*2.5,game.tileset[1]*4],
                [game.tileset[0]*79.75,game.tileset[1]*43,game.tileset[0]*18.5,game.tileset[1]*6],
                [game.tileset[0]*105.25,game.tileset[1]*43,game.tileset[0]*26.5,game.tileset[1]*6],

                [game.tileset[0]*134.5,game.tileset[1]*44.5,game.tileset[0]*32,game.tileset[1]*3],
                [game.tileset[0]*152,game.tileset[1]*43,game.tileset[0]*3,game.tileset[1]*6],
                [game.tileset[0]*111.5,game.tileset[1]*51,game.tileset[0]*47,game.tileset[1]*4],
                [game.tileset[0]*138,game.tileset[1]*48,game.tileset[0]*6,game.tileset[1]*4],
                [game.tileset[0]*152,game.tileset[1]*49,game.tileset[0]*16,game.tileset[1]*6],
                
                [game.tileset[0]*40.5,game.tileset[1]*42,game.tileset[0]*4,game.tileset[1]*2],
                [game.tileset[0]*44.5,game.tileset[1]*42,game.tileset[0]*4,game.tileset[1]*2],
                [game.tileset[0]*128.5,game.tileset[1]*42,game.tileset[0]*4,game.tileset[1]*2],
                [game.tileset[0]*132.5,game.tileset[1]*42,game.tileset[0]*4,game.tileset[1]*2],
                [game.tileset[0]*96.5,game.tileset[1]*48,game.tileset[0]*4,game.tileset[1]*2],

                [game.tileset[0]*100.5,game.tileset[1]*48,game.tileset[0]*4,game.tileset[1]*2],
                [game.tileset[0]*104.5,game.tileset[1]*32,game.tileset[0]*9,game.tileset[1]*4],

            ]
        break
        case 60: case 91:
            game.edge=[level[0].length*42,level.length*38]
        break
        case 61:
            game.edge=[level[0].length*44,level.length*36]
        break
        case 62: case 72: case 81:
            game.edge=[level[0].length*48,level.length*36]
        break
        case 63: case 66:
            game.edge=[level[0].length*46,level.length*40]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*88,game.tileset[1]*59.5,game.tileset[0]*54,game.tileset[1]*7],
                [game.tileset[0]*93.5,game.tileset[1]*51.5,game.tileset[0]*43,game.tileset[1]*9],
                [game.tileset[0]*78.5,game.tileset[1]*42,game.tileset[0]*13,game.tileset[1]*6],
                [game.tileset[0]*138,game.tileset[1]*40,game.tileset[0]*6,game.tileset[1]*4],
                [game.tileset[0]*121.5,game.tileset[1]*36.5,game.tileset[0]*41,game.tileset[1]*3],

                [game.tileset[0]*115.5,game.tileset[1]*39,game.tileset[0]*11,game.tileset[1]*2],
                [game.tileset[0]*132,game.tileset[1]*33.5,game.tileset[0]*22,game.tileset[1]*3],
                [game.tileset[0]*132,game.tileset[1]*30.5,game.tileset[0]*22,game.tileset[1]*3],
                [game.tileset[0]*135,game.tileset[1]*27.5,game.tileset[0]*16,game.tileset[1]*3],
                [game.edge[0]*0.5,game.edge[1]*0.5,game.edge[0]+1,game.edge[1]+1],
            ]
        break
        case 64:
            game.edge=[level[0].length*45,level.length*40]
        break
        case 65:
            game.edge=[level[0].length*45,level.length*40]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*131.5,game.tileset[1]*47.5,game.tileset[0]*5,game.tileset[1]*3],
                [game.tileset[0]*67.5,game.tileset[1]*50.5,game.tileset[0]*5,game.tileset[1]*3],
                [game.tileset[0]*195.5,game.tileset[1]*50.5,game.tileset[0]*5,game.tileset[1]*3],
                [game.tileset[0]*30,game.tileset[1]*18.5,game.tileset[0]*60,game.tileset[1]*37],
                [game.tileset[0]*229,game.tileset[1]*18.5,game.tileset[0]*60,game.tileset[1]*37],

                [game.tileset[0]*61,game.tileset[1]*21,game.tileset[0]*2,game.tileset[1]*42],
                [game.tileset[0]*202,game.tileset[1]*21,game.tileset[0]*2,game.tileset[1]*42],
                [game.tileset[0]*49,game.tileset[1]*43,game.tileset[0]*12,game.tileset[1]*4],
                [game.tileset[0]*214,game.tileset[1]*43,game.tileset[0]*12,game.tileset[1]*4],
                [game.tileset[0]*50.5,game.tileset[1]*51.5,game.tileset[0]*13,game.tileset[1]*3],
                
                [game.tileset[0]*212.5,game.tileset[1]*51.5,game.tileset[0]*13,game.tileset[1]*3],
                [game.tileset[0]*56.5,game.tileset[1]*49,game.tileset[0]*7,game.tileset[1]*2],
                [game.tileset[0]*206.5,game.tileset[1]*49,game.tileset[0]*7,game.tileset[1]*2],
                [game.tileset[0]*93.5,game.tileset[1]*50,game.tileset[0]*19,game.tileset[1]*4],
                [game.tileset[0]*169.5,game.tileset[1]*50,game.tileset[0]*19,game.tileset[1]*4],

                [game.tileset[0]*99.5,game.tileset[1]*44,game.tileset[0]*3,game.tileset[1]*4],
                [game.tileset[0]*164.5,game.tileset[1]*44,game.tileset[0]*3,game.tileset[1]*4],
                [game.tileset[0]*131.5,game.tileset[1]*20,game.tileset[0]*61,game.tileset[1]*40],
                [game.tileset[0]*103.5,game.tileset[1]*41.5,game.tileset[0]*5,game.tileset[1]*3],
                [game.tileset[0]*159.5,game.tileset[1]*41.5,game.tileset[0]*5,game.tileset[1]*3],

                [game.tileset[0]*55.5,game.tileset[1]*46,game.tileset[0],game.tileset[1]*2],
                [game.tileset[0]*207.5,game.tileset[1]*46,game.tileset[0],game.tileset[1]*2],
                [game.tileset[0]*59,game.tileset[1]*46.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*204,game.tileset[1]*46.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*2,game.tileset[1]*45.5,game.tileset[0]*4,game.tileset[1]*3],

                [game.tileset[0]*261,game.tileset[1]*45.5,game.tileset[0]*4,game.tileset[1]*3],
                [game.edge[0]*0.5,game.edge[1]*0.5,game.edge[0]+1,game.edge[1]+1],

            ]
        break
        case 67: case 77:
            game.edge=[level[0].length*48,level.length*36]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*107.5,game.tileset[1]*50,game.tileset[0]*51,game.tileset[1]*10],
                [game.tileset[0]*107.5,game.tileset[1]*43,game.tileset[0]*71,game.tileset[1]*4],
                [game.tileset[0]*73,game.tileset[1]*52,game.tileset[0]*18,game.tileset[1]*2],
                [game.tileset[0]*142,game.tileset[1]*52,game.tileset[0]*18,game.tileset[1]*2],
                [game.tileset[0]*57.5,game.tileset[1]*52,game.tileset[0]*11,game.tileset[1]*2],
                [game.tileset[0]*157.5,game.tileset[1]*52,game.tileset[0]*11,game.tileset[1]*2],
                [game.tileset[0]*45.5,game.tileset[1]*52,game.tileset[0]*11,game.tileset[1]*2],
                [game.tileset[0]*169.5,game.tileset[1]*52,game.tileset[0]*11,game.tileset[1]*2],
                [game.tileset[0]*29.5,game.tileset[1]*52,game.tileset[0]*19,game.tileset[1]*2],
                [game.tileset[0]*185.5,game.tileset[1]*52,game.tileset[0]*19,game.tileset[1]*2],

                [game.tileset[0]*51.5,game.tileset[1]*50.5,game.tileset[0]*35,game.tileset[1]],
                [game.tileset[0]*163.5,game.tileset[1]*50.5,game.tileset[0]*35,game.tileset[1]],
                [game.tileset[0]*75,game.tileset[1]*39.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*140,game.tileset[1]*39.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*48,game.tileset[1]*42,game.tileset[0]*40,game.tileset[1]*4],
                [game.tileset[0]*167,game.tileset[1]*42,game.tileset[0]*40,game.tileset[1]*4],
                [game.tileset[0]*28,game.tileset[1]*38.5,game.tileset[0]*8,game.tileset[1]*3],
                [game.tileset[0]*187,game.tileset[1]*38.5,game.tileset[0]*8,game.tileset[1]*3],
                [game.tileset[0]*46,game.tileset[1]*38.5,game.tileset[0]*28,game.tileset[1]*3],
                [game.tileset[0]*169,game.tileset[1]*38.5,game.tileset[0]*28,game.tileset[1]*3],

                [game.tileset[0]*50,game.tileset[1]*35,game.tileset[0]*12,game.tileset[1]*4],
                [game.tileset[0]*165,game.tileset[1]*35,game.tileset[0]*12,game.tileset[1]*4],
                [game.tileset[0]*65.5,game.tileset[1]*35,game.tileset[0]*19,game.tileset[1]*4],
                [game.tileset[0]*149.5,game.tileset[1]*35,game.tileset[0]*19,game.tileset[1]*4],
                [game.tileset[0]*78.5,game.tileset[1]*30.5,game.tileset[0]*9,game.tileset[1]*5],
                [game.tileset[0]*136.5,game.tileset[1]*30.5,game.tileset[0]*9,game.tileset[1]*5],
                [game.tileset[0]*82.5,game.tileset[1]*37,game.tileset[0],game.tileset[1]*8],
                [game.tileset[0]*132.5,game.tileset[1]*37,game.tileset[0],game.tileset[1]*8],
                [game.tileset[0]*64,game.tileset[1]*31,game.tileset[0]*8,game.tileset[1]*4], 
                [game.tileset[0]*151,game.tileset[1]*31,game.tileset[0]*8,game.tileset[1]*4], 

                [game.tileset[0]*61.75,game.tileset[1]*27,game.tileset[0]*12.5,game.tileset[1]*4],
                [game.tileset[0]*153.25,game.tileset[1]*27,game.tileset[0]*12.5,game.tileset[1]*4],
                [game.tileset[0]*55,game.tileset[1]*27,game.tileset[0],game.tileset[1]*4],
                [game.tileset[0]*160,game.tileset[1]*27,game.tileset[0],game.tileset[1]*4],
                [game.tileset[0]*55.5,game.tileset[1]*31,game.tileset[0]*9,game.tileset[1]*4],
                [game.tileset[0]*159.5,game.tileset[1]*31,game.tileset[0]*9,game.tileset[1]*4],
                [game.tileset[0]*39.5,game.tileset[1]*31,game.tileset[0]*17,game.tileset[1]*4],
                [game.tileset[0]*175.5,game.tileset[1]*31,game.tileset[0]*17,game.tileset[1]*4],
                [game.tileset[0]*39.5,game.tileset[1]*34.5,game.tileset[0]*7,game.tileset[1]*3],
                [game.tileset[0]*175.5,game.tileset[1]*34.5,game.tileset[0]*7,game.tileset[1]*3],

                [game.tileset[0]*20,game.tileset[1]*35,game.tileset[0]*24,game.tileset[1]*4],
                [game.tileset[0]*195,game.tileset[1]*35,game.tileset[0]*24,game.tileset[1]*4],
                [game.tileset[0]*8,game.tileset[1]*31,game.tileset[0]*2,game.tileset[1]*4],
                [game.tileset[0]*207,game.tileset[1]*31,game.tileset[0]*2,game.tileset[1]*4],
                [game.tileset[0]*3.5,game.tileset[1]*35,game.tileset[0]*7,game.tileset[1]*12],
                [game.tileset[0]*211.5,game.tileset[1]*35,game.tileset[0]*7,game.tileset[1]*12],
                [game.tileset[0]*27,game.tileset[1]*41.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*188,game.tileset[1]*41.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*26.5,game.tileset[1]*49.5,game.tileset[0]*13,game.tileset[1]*3],
                [game.tileset[0]*188.5,game.tileset[1]*49.5,game.tileset[0]*13,game.tileset[1]*3],

                [game.tileset[0]*68,game.tileset[1]*46.5,game.tileset[0]*6,game.tileset[1]*5],
                [game.tileset[0]*147,game.tileset[1]*46.5,game.tileset[0]*6,game.tileset[1]*5],
                [game.tileset[0]*77.5,game.tileset[1]*45.5,game.tileset[0]*7,game.tileset[1]],
                [game.tileset[0]*137.5,game.tileset[1]*45.5,game.tileset[0]*7,game.tileset[1]],
                [game.tileset[0]*33.5,game.tileset[1]*43.5,game.tileset[0]*63,game.tileset[1]*11],
                [game.tileset[0]*181.5,game.tileset[1]*43.5,game.tileset[0]*63,game.tileset[1]*11],
                [game.tileset[0]*70,game.tileset[1]*41.5,game.tileset[0]*4,game.tileset[1]*3],
                [game.tileset[0]*145,game.tileset[1]*41.5,game.tileset[0]*4,game.tileset[1]*3],
                [game.tileset[0]*78.5,game.tileset[1]*39.5,game.tileset[0]*4,game.tileset[1]*3],
                [game.tileset[0]*136.5,game.tileset[1]*39.5,game.tileset[0]*4,game.tileset[1]*3],
            ]
        break
        case 68:
            game.edge=[level[0].length*48,level.length*36]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*17.5,game.tileset[1]*50,game.tileset[0]*23,game.tileset[1]*10],
                [game.tileset[0]*19.5,game.tileset[1]*43,game.tileset[0]*39,game.tileset[1]*4],
                [game.tileset[0]*38,game.tileset[1]*52,game.tileset[0]*18,game.tileset[1]*2],
                [game.tileset[0]*53.5,game.tileset[1]*52,game.tileset[0]*11,game.tileset[1]*2],
                [game.tileset[0]*65.5,game.tileset[1]*52,game.tileset[0]*11,game.tileset[1]*2],

                [game.tileset[0]*81.5,game.tileset[1]*52,game.tileset[0]*19,game.tileset[1]*2],
                [game.tileset[0]*59.5,game.tileset[1]*50.5,game.tileset[0]*35,game.tileset[1]],
                [game.tileset[0]*36,game.tileset[1]*39.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*63,game.tileset[1]*42,game.tileset[0]*40,game.tileset[1]*4],
                [game.tileset[0]*83,game.tileset[1]*38.5,game.tileset[0]*8,game.tileset[1]*3],

                [game.tileset[0]*65,game.tileset[1]*38.5,game.tileset[0]*28,game.tileset[1]*3],
                [game.tileset[0]*61,game.tileset[1]*35,game.tileset[0]*12,game.tileset[1]*4],
                [game.tileset[0]*45.5,game.tileset[1]*35,game.tileset[0]*19,game.tileset[1]*4],
                [game.tileset[0]*32.5,game.tileset[1]*30.5,game.tileset[0]*9,game.tileset[1]*5],
                [game.tileset[0]*28.5,game.tileset[1]*37,game.tileset[0],game.tileset[1]*8],

                [game.tileset[0]*47,game.tileset[1]*31,game.tileset[0]*8,game.tileset[1]*4],
                [game.tileset[0]*49.25,game.tileset[1]*27,game.tileset[0]*12.5,game.tileset[1]*4],
                [game.tileset[0]*56,game.tileset[1]*27,game.tileset[0],game.tileset[1]*4],
                [game.tileset[0]*55.5,game.tileset[1]*31,game.tileset[0]*9,game.tileset[1]*4],
                [game.tileset[0]*71.5,game.tileset[1]*31,game.tileset[0]*17,game.tileset[1]*4],

                [game.tileset[0]*71.5,game.tileset[1]*34.5,game.tileset[0]*7,game.tileset[1]*3],
                [game.tileset[0]*91,game.tileset[1]*35,game.tileset[0]*24,game.tileset[1]*4],
                [game.tileset[0]*103,game.tileset[1]*31,game.tileset[0]*2,game.tileset[1]*4],
                [game.tileset[0]*107.5,game.tileset[1]*35,game.tileset[0]*7,game.tileset[1]*12],
                [game.tileset[0]*84,game.tileset[1]*41.5,game.tileset[0]*2,game.tileset[1]*3],

                [game.tileset[0]*84.5,game.tileset[1]*49.5,game.tileset[0]*13,game.tileset[1]*3],
                [game.tileset[0]*43,game.tileset[1]*46.5,game.tileset[0]*6,game.tileset[1]*5],
                [game.tileset[0]*33.5,game.tileset[1]*45.5,game.tileset[0]*7,game.tileset[1]],
                [game.tileset[0]*77.5,game.tileset[1]*43.5,game.tileset[0]*63,game.tileset[1]*11],
                [game.tileset[0]*41,game.tileset[1]*41.5,game.tileset[0]*4,game.tileset[1]*3],
            ]
        break
        case 69:
            game.edge=[level[0].length*38,level.length*32]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*43.5,game.tileset[1]*25,game.tileset[0]*5,game.tileset[1]*4],
                [game.tileset[0]*39.5,game.tileset[1]*28,game.tileset[0]*19,game.tileset[1]*2],
                [game.tileset[0]*107.5,game.tileset[1]*42.5,game.tileset[0]*27,game.tileset[1]*5],
                [game.tileset[0]*107.5,game.tileset[1]*37.5,game.tileset[0]*63,game.tileset[1]*5],
                [game.tileset[0]*80.5,game.tileset[1]*33.5,game.tileset[0]*3,game.tileset[1]*3],

                [game.tileset[0]*115,game.tileset[1]*32.5,game.tileset[0]*68,game.tileset[1]*5],
                [game.tileset[0]*129.75,game.tileset[1]*27.5,game.tileset[0]*24.5,game.tileset[1]*5],
                [game.tileset[0]*149,game.tileset[1]*27.5,game.tileset[0]*14,game.tileset[1]*5],
                [game.tileset[0]*127.25,game.tileset[1]*22.5,game.tileset[0]*29.5,game.tileset[1]*5],
                [game.tileset[0]*105.25,game.tileset[1]*23.5,game.tileset[0]*14.5,game.tileset[1]*3],

                [game.tileset[0]*89.5,game.tileset[1]*22.5,game.tileset[0]*21,game.tileset[1]*5],
                [game.tileset[0]*115.75,game.tileset[1]*27.5,game.tileset[0]*3.5,game.tileset[1]*5],
                [game.tileset[0]*79.25,game.tileset[1]*27.5,game.tileset[0]*33.5,game.tileset[1]*5],
                [game.tileset[0]*60.75,game.tileset[1]*27.5,game.tileset[0]*3.5,game.tileset[1]*5],
                [game.tileset[0]*38,game.tileset[1]*37.5,game.tileset[0]*76,game.tileset[1]*15],
            ]
        break
        case 70: case 84:
            game.edge=[level[0].length*45,level.length*40]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*36.5,game.tileset[1]*43,game.tileset[0]*9,game.tileset[1]*4],
                [game.tileset[0]*51.5,game.tileset[1]*43,game.tileset[0]*15,game.tileset[1]*4],
                [game.tileset[0]*42.5,game.tileset[1]*39,game.tileset[0]*33,game.tileset[1]*4],
                [game.tileset[0]*34,game.tileset[1]*35,game.tileset[0]*26,game.tileset[1]*4],
                [game.tileset[0]*30.5,game.tileset[1]*31,game.tileset[0]*21,game.tileset[1]*4],

                [game.tileset[0]*33.5,game.tileset[1]*27.5,game.tileset[0]*15,game.tileset[1]*3],
                [game.tileset[0]*32,game.tileset[1]*24.5,game.tileset[0]*12,game.tileset[1]*3],
                [game.tileset[0]*35,game.tileset[1]*21.5,game.tileset[0]*12,game.tileset[1]*3],
                [game.tileset[0]*23.5,game.tileset[1]*17,game.tileset[0]*35,game.tileset[1]*6],
                [game.tileset[0]*94,game.tileset[1]*49.5,game.tileset[0]*116,game.tileset[1]*5],

                [game.tileset[0]*140.5,game.tileset[1]*44,game.tileset[0]*23,game.tileset[1]*6],
                [game.tileset[0]*133.5,game.tileset[1]*35,game.tileset[0]*37,game.tileset[1]*12],
                [game.tileset[0]*106,game.tileset[1]*40,game.tileset[0]*18,game.tileset[1]*12],
                [game.edge[0]*0.5,game.edge[1]*0.5,game.edge[0],game.edge[1]],
            ]
        break
        case 71: case 75:
            game.edge=[level[0].length*40,level.length*38]
        break
        case 76:
            game.edge=[level[0].length*40,level.length*40]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*112.5,game.tileset[1]*55.5,game.tileset[0]*151,game.tileset[1]*25],
                [game.edge[0]*0.5,game.edge[1]*0.5,game.edge[0],game.edge[1]],
            ]
        break
        case 78:
            game.edge=[level[0].length*48,level.length*36]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*83.5,game.tileset[1]*50,game.tileset[0]*39,game.tileset[1]*10],
                [game.tileset[0]*83.5,game.tileset[1]*43,game.tileset[0]*55,game.tileset[1]*4],
                [game.tileset[0]*58,game.tileset[1]*52,game.tileset[0]*12,game.tileset[1]*2],
                [game.tileset[0]*109,game.tileset[1]*52,game.tileset[0]*12,game.tileset[1]*2],
                [game.tileset[0]*45.5,game.tileset[1]*52,game.tileset[0]*11,game.tileset[1]*2],
                [game.tileset[0]*121.5,game.tileset[1]*52,game.tileset[0]*11,game.tileset[1]*2],
                [game.tileset[0]*33.5,game.tileset[1]*52,game.tileset[0]*11,game.tileset[1]*2],
                [game.tileset[0]*133.5,game.tileset[1]*52,game.tileset[0]*11,game.tileset[1]*2],
                [game.tileset[0]*20.5,game.tileset[1]*52,game.tileset[0]*13,game.tileset[1]*2],
                [game.tileset[0]*146.5,game.tileset[1]*52,game.tileset[0]*13,game.tileset[1]*2],

                [game.tileset[0]*39.5,game.tileset[1]*50.5,game.tileset[0]*35,game.tileset[1]],
                [game.tileset[0]*127.5,game.tileset[1]*50.5,game.tileset[0]*35,game.tileset[1]],
                [game.tileset[0]*59,game.tileset[1]*39.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*108,game.tileset[1]*39.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*36,game.tileset[1]*42,game.tileset[0]*32,game.tileset[1]*4],
                [game.tileset[0]*131,game.tileset[1]*42,game.tileset[0]*32,game.tileset[1]*4],
                [game.tileset[0]*20,game.tileset[1]*38.5,game.tileset[0]*8,game.tileset[1]*3],
                [game.tileset[0]*147,game.tileset[1]*38.5,game.tileset[0]*8,game.tileset[1]*3],
                [game.tileset[0]*34,game.tileset[1]*38.5,game.tileset[0]*20,game.tileset[1]*3],
                [game.tileset[0]*133,game.tileset[1]*38.5,game.tileset[0]*20,game.tileset[1]*3],

                [game.tileset[0]*36,game.tileset[1]*35,game.tileset[0]*8,game.tileset[1]*4],
                [game.tileset[0]*131,game.tileset[1]*35,game.tileset[0]*8,game.tileset[1]*4],
                [game.tileset[0]*49.5,game.tileset[1]*35,game.tileset[0]*19,game.tileset[1]*4],
                [game.tileset[0]*117.5,game.tileset[1]*35,game.tileset[0]*19,game.tileset[1]*4],
                [game.tileset[0]*61.5,game.tileset[1]*30.5,game.tileset[0]*7,game.tileset[1]*5],
                [game.tileset[0]*105.5,game.tileset[1]*30.5,game.tileset[0]*7,game.tileset[1]*5],
                [game.tileset[0]*64.5,game.tileset[1]*37,game.tileset[0],game.tileset[1]*8],
                [game.tileset[0]*102.5,game.tileset[1]*37,game.tileset[0],game.tileset[1]*8],
                [game.tileset[0]*48,game.tileset[1]*31,game.tileset[0]*8,game.tileset[1]*4], 
                [game.tileset[0]*119,game.tileset[1]*31,game.tileset[0]*8,game.tileset[1]*4], 

                [game.tileset[0]*45.75,game.tileset[1]*27,game.tileset[0]*12.5,game.tileset[1]*4],
                [game.tileset[0]*121.25,game.tileset[1]*27,game.tileset[0]*12.5,game.tileset[1]*4],
                [game.tileset[0]*39,game.tileset[1]*27,game.tileset[0],game.tileset[1]*4],
                [game.tileset[0]*128,game.tileset[1]*27,game.tileset[0],game.tileset[1]*4],
                [game.tileset[0]*41.5,game.tileset[1]*31,game.tileset[0]*5,game.tileset[1]*4],
                [game.tileset[0]*125.5,game.tileset[1]*31,game.tileset[0]*5,game.tileset[1]*4],
                [game.tileset[0]*29.5,game.tileset[1]*31,game.tileset[0]*13,game.tileset[1]*4],
                [game.tileset[0]*137.5,game.tileset[1]*31,game.tileset[0]*13,game.tileset[1]*4],
                [game.tileset[0]*29.5,game.tileset[1]*34.5,game.tileset[0]*3,game.tileset[1]*3],
                [game.tileset[0]*137.5,game.tileset[1]*34.5,game.tileset[0]*3,game.tileset[1]*3],

                [game.tileset[0]*17.5,game.tileset[1]*35,game.tileset[0]*19,game.tileset[1]*4],
                [game.tileset[0]*149.5,game.tileset[1]*35,game.tileset[0]*19,game.tileset[1]*4],
                [game.tileset[0]*8,game.tileset[1]*31,game.tileset[0]*2,game.tileset[1]*4],
                [game.tileset[0]*159,game.tileset[1]*31,game.tileset[0]*2,game.tileset[1]*4],
                [game.tileset[0]*3.5,game.tileset[1]*35,game.tileset[0]*7,game.tileset[1]*12],
                [game.tileset[0]*163.5,game.tileset[1]*35,game.tileset[0]*7,game.tileset[1]*12],
                [game.tileset[0]*19,game.tileset[1]*41.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*148,game.tileset[1]*41.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*17.5,game.tileset[1]*49.5,game.tileset[0]*7,game.tileset[1]*3],
                [game.tileset[0]*149.5,game.tileset[1]*49.5,game.tileset[0]*7,game.tileset[1]*3],

                [game.tileset[0]*52,game.tileset[1]*46.5,game.tileset[0]*6,game.tileset[1]*5],
                [game.tileset[0]*115,game.tileset[1]*46.5,game.tileset[0]*6,game.tileset[1]*5],
                [game.tileset[0]*60.5,game.tileset[1]*45.5,game.tileset[0]*5,game.tileset[1]],
                [game.tileset[0]*106.5,game.tileset[1]*45.5,game.tileset[0]*5,game.tileset[1]],
                [game.tileset[0]*25.5,game.tileset[1]*43.5,game.tileset[0]*47,game.tileset[1]*11],
                [game.tileset[0]*141.5,game.tileset[1]*43.5,game.tileset[0]*47,game.tileset[1]*11],
                [game.tileset[0]*54,game.tileset[1]*41.5,game.tileset[0]*4,game.tileset[1]*3],
                [game.tileset[0]*113,game.tileset[1]*41.5,game.tileset[0]*4,game.tileset[1]*3],
            ]
        break
        case 79:
            game.edge=[level[0].length*42,level.length*38]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*39,game.tileset[1]*49.5,game.tileset[0]*78,game.tileset[1]*7],
                [game.tileset[0]*81.5,game.tileset[1]*47.5,game.tileset[0]*7,game.tileset[1]*3],
                [game.tileset[0]*83,game.tileset[1]*51,game.tileset[0]*10,game.tileset[1]*4],
                [game.tileset[0]*50.5,game.tileset[1]*44.5,game.tileset[0]*40,game.tileset[1]*3],
                [game.tileset[0]*29,game.tileset[1]*43,game.tileset[0]*3,game.tileset[1]*6],

                [game.tileset[0]*44,game.tileset[1]*35,game.tileset[0]*32,game.tileset[1]*10],
                [game.tileset[0]*78.5,game.tileset[1]*32,game.tileset[0]*37,game.tileset[1]*4],
                [game.tileset[0]*78.5,game.tileset[1]*37,game.tileset[0]*37,game.tileset[1]*6],
                [game.tileset[0]*104.5,game.tileset[1]*37,game.tileset[0]*9,game.tileset[1]*6],
                [game.tileset[0]*121,game.tileset[1]*35,game.tileset[0]*24,game.tileset[1]*10],

                [game.tileset[0]*147,game.tileset[1]*37,game.tileset[0]*28,game.tileset[1]*6],
                [game.tileset[0]*137.75,game.tileset[1]*32,game.tileset[0]*9.5,game.tileset[1]*4],
                [game.tileset[0]*143.75,game.tileset[1]*32,game.tileset[0]*2.5,game.tileset[1]*4],
                [game.tileset[0]*79.75,game.tileset[1]*43,game.tileset[0]*18.5,game.tileset[1]*6],
                [game.tileset[0]*105.25,game.tileset[1]*43,game.tileset[0]*26.5,game.tileset[1]*6],

                [game.tileset[0]*138.5,game.tileset[1]*44.5,game.tileset[0]*40,game.tileset[1]*3],
                [game.tileset[0]*160,game.tileset[1]*43,game.tileset[0]*3,game.tileset[1]*6],
                [game.tileset[0]*111.5,game.tileset[1]*51,game.tileset[0]*47,game.tileset[1]*4],
                [game.tileset[0]*138,game.tileset[1]*48,game.tileset[0]*6,game.tileset[1]*4],
                [game.tileset[0]*159.5,game.tileset[1]*49,game.tileset[0]*31,game.tileset[1]*6],
                
                [game.tileset[0]*40.5,game.tileset[1]*42,game.tileset[0]*4,game.tileset[1]*2],
                [game.tileset[0]*44.5,game.tileset[1]*42,game.tileset[0]*4,game.tileset[1]*2],
                [game.tileset[0]*128.5,game.tileset[1]*42,game.tileset[0]*4,game.tileset[1]*2],
                [game.tileset[0]*132.5,game.tileset[1]*42,game.tileset[0]*4,game.tileset[1]*2],
                [game.tileset[0]*96.5,game.tileset[1]*48,game.tileset[0]*4,game.tileset[1]*2],

                [game.tileset[0]*100.5,game.tileset[1]*48,game.tileset[0]*4,game.tileset[1]*2],
                [game.tileset[0]*104.5,game.tileset[1]*32,game.tileset[0]*9,game.tileset[1]*4],

            ]
        break
        case 82: case 83: case 85:
            game.edge=[level[0].length*44,level.length*38]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*28.25,game.tileset[1]*38.5,game.tileset[0]*15.5,game.tileset[1]*5],
                [game.tileset[0]*37,game.tileset[1]*37,game.tileset[0]*2,game.tileset[1]*2],
                [game.tileset[0]*19.5,game.tileset[1]*38.5,game.tileset[0]*2,game.tileset[1]*5],
                [game.tileset[0]*29.5,game.tileset[1]*33.5,game.tileset[0]*9,game.tileset[1]*5],
                [game.tileset[0]*48,game.tileset[1]*33.5,game.tileset[0]*20,game.tileset[1]*5],

                [game.tileset[0]*37,game.tileset[1]*39.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*53.5,game.tileset[1]*38.5,game.tileset[0]*31,game.tileset[1]*5],
                [game.tileset[0]*70,game.tileset[1]*39.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*70,game.tileset[1]*37,game.tileset[0]*2,game.tileset[1]*2],
                [game.tileset[0]*77,game.tileset[1]*38.5,game.tileset[0]*12,game.tileset[1]*5],

                [game.tileset[0]*84,game.tileset[1]*37.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*85.5,game.tileset[1]*36.5,game.tileset[0],game.tileset[1]],
                [game.tileset[0]*65,game.tileset[1]*33.5,game.tileset[0]*8,game.tileset[1]*5],
                [game.tileset[0]*80.5,game.tileset[1]*33.5,game.tileset[0]*15,game.tileset[1]*5],
                [game.tileset[0]*84,game.tileset[1]*40,game.tileset[0]*2,game.tileset[1]*2],

                [game.tileset[0]*85.5,game.tileset[1]*39,game.tileset[0],game.tileset[1]*4],
                [game.tileset[0]*98.5,game.tileset[1]*38.5,game.tileset[0]*25,game.tileset[1]*5],
                [game.tileset[0]*113,game.tileset[1]*40,game.tileset[0]*2,game.tileset[1]*2],
                [game.tileset[0]*111.5,game.tileset[1]*39,game.tileset[0],game.tileset[1]*4],
                [game.tileset[0]*107,game.tileset[1]*33.5,game.tileset[0]*8,game.tileset[1]*5],
                
                [game.tileset[0]*113,game.tileset[1]*37.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*111.5,game.tileset[1]*36.5,game.tileset[0],game.tileset[1]],
                [game.tileset[0]*126,game.tileset[1]*38.5,game.tileset[0]*24,game.tileset[1]*5],
                [game.tileset[0]*139,game.tileset[1]*37,game.tileset[0]*2,game.tileset[1]*2],
                [game.tileset[0]*125.5,game.tileset[1]*33.5,game.tileset[0]*21,game.tileset[1]*5],

                [game.tileset[0]*143.5,game.tileset[1]*33.5,game.tileset[0]*7,game.tileset[1]*5],
                [game.tileset[0]*148,game.tileset[1]*34.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*149.5,game.tileset[1]*35.5,game.tileset[0],game.tileset[1]],
                [game.tileset[0]*148,game.tileset[1]*32,game.tileset[0]*2,game.tileset[1]*2],
                [game.tileset[0]*149.5,game.tileset[1]*33,game.tileset[0],game.tileset[1]*4],

                [game.tileset[0]*151.5,game.tileset[1]*33.5,game.tileset[0]*3,game.tileset[1]*5],
                [game.tileset[0]*143,game.tileset[1]*28.5,game.tileset[0]*8,game.tileset[1]*5],
                [game.tileset[0]*139,game.tileset[1]*39.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*146.5,game.tileset[1]*38.5,game.tileset[0]*13,game.tileset[1]*5],
                [game.tileset[0]*154,game.tileset[1]*39.5,game.tileset[0]*2,game.tileset[1]*3],

                [game.tileset[0]*155.5,game.tileset[1]*40.5,game.tileset[0],game.tileset[1]],
                [game.tileset[0]*154,game.tileset[1]*37,game.tileset[0]*2,game.tileset[1]*2],
                [game.tileset[0]*155.5,game.tileset[1]*38,game.tileset[0],game.tileset[1]*4],
                [game.tileset[0]*166.25,game.tileset[1]*38.5,game.tileset[0]*20.5,game.tileset[1]*5],
                [game.tileset[0]*177.5,game.tileset[1]*38.5,game.tileset[0]*2,game.tileset[1]*5],

                [game.tileset[0]*20.5,game.tileset[1]*43.5,game.tileset[0]*13,game.tileset[1]*5],
                [game.tileset[0]*28,game.tileset[1]*44.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*28,game.tileset[1]*42,game.tileset[0]*2,game.tileset[1]*2],
                [game.tileset[0]*38.5,game.tileset[1]*43.5,game.tileset[0]*19,game.tileset[1]*5],
                [game.tileset[0]*55.5,game.tileset[1]*43.5,game.tileset[0]*15,game.tileset[1]*5],

                [game.tileset[0]*64,game.tileset[1]*44.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*65.5,game.tileset[1]*45.5,game.tileset[0],game.tileset[1]],
                [game.tileset[0]*64,game.tileset[1]*42,game.tileset[0]*2,game.tileset[1]*2],
                [game.tileset[0]*65.5,game.tileset[1]*43,game.tileset[0],game.tileset[1]*4],
                [game.tileset[0]*72,game.tileset[1]*43.5,game.tileset[0]*12,game.tileset[1]*5],

                [game.tileset[0]*79,game.tileset[1]*42,game.tileset[0]*2,game.tileset[1]*2],
                [game.tileset[0]*79,game.tileset[1]*44.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*89.5,game.tileset[1]*43.5,game.tileset[0]*19,game.tileset[1]*5],
                [game.tileset[0]*100,game.tileset[1]*44.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*100,game.tileset[1]*42,game.tileset[0]*2,game.tileset[1]*2],

                [game.tileset[0]*109.5,game.tileset[1]*43.5,game.tileset[0]*17,game.tileset[1]*5],
                [game.tileset[0]*128,game.tileset[1]*43.5,game.tileset[0]*14,game.tileset[1]*5],
                [game.tileset[0]*153.5,game.tileset[1]*43.5,game.tileset[0]*29,game.tileset[1]*5],
                [game.tileset[0]*169,game.tileset[1]*42,game.tileset[0]*2,game.tileset[1]*2],
                [game.tileset[0]*169,game.tileset[1]*44.5,game.tileset[0]*2,game.tileset[1]*3],

                [game.tileset[0]*174,game.tileset[1]*43.5,game.tileset[0]*8,game.tileset[1]*5],
                [game.tileset[0]*6,game.tileset[1]*48.5,game.tileset[0]*12,game.tileset[1]*5],
                [game.tileset[0]*13,game.tileset[1]*47,game.tileset[0]*2,game.tileset[1]*2],
                [game.tileset[0]*13,game.tileset[1]*49.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*26.5,game.tileset[1]*48.5,game.tileset[0]*25,game.tileset[1]*5],

                [game.tileset[0]*40,game.tileset[1]*49.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*40,game.tileset[1]*47,game.tileset[0]*2,game.tileset[1]*2],
                [game.tileset[0]*62.5,game.tileset[1]*49,game.tileset[0]*43,game.tileset[1]*6],
                [game.tileset[0]*85,game.tileset[1]*47,game.tileset[0]*2,game.tileset[1]*2],
                [game.tileset[0]*85,game.tileset[1]*49.5,game.tileset[0]*2,game.tileset[1]*3],

                [game.tileset[0]*100,game.tileset[1]*48.5,game.tileset[0]*28,game.tileset[1]*5],
                [game.tileset[0]*115,game.tileset[1]*47,game.tileset[0]*2,game.tileset[1]*2],
                [game.tileset[0]*115,game.tileset[1]*49.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*125.5,game.tileset[1]*48.5,game.tileset[0]*19,game.tileset[1]*5],
                [game.tileset[0]*136,game.tileset[1]*49.5,game.tileset[0]*2,game.tileset[1]*3],

                [game.tileset[0]*136,game.tileset[1]*47,game.tileset[0]*2,game.tileset[1]*2],
                [game.tileset[0]*143.5,game.tileset[1]*49,game.tileset[0]*13,game.tileset[1]*6],
                [game.tileset[0]*151,game.tileset[1]*47,game.tileset[0]*2,game.tileset[1]*2],
                [game.tileset[0]*151,game.tileset[1]*49.5,game.tileset[0]*2,game.tileset[1]*3],
                [game.tileset[0]*171.5,game.tileset[1]*48.5,game.tileset[0]*39,game.tileset[1]*5],

                [game.edge[0]*0.5,game.edge[1]*0.5,game.edge[0],game.edge[1]],


            ]
        break
        case 86:
            game.edge=[level[0].length*40,level.length*40]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*122.5,game.tileset[1]*55.5,game.tileset[0]*105,game.tileset[1]*25],
                [game.edge[0]*0.5,game.edge[1]*0.5,game.edge[0],game.edge[1]],
            ]
        break
        case 87: case 90:
            game.edge=[level[0].length*44,level.length*38]
        break
        case 88:
            game.edge=[level[0].length*42,level.length*38]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*6,game.tileset[1]*38,game.tileset[0]*12,game.tileset[1]*4],
                [game.tileset[0]*135,game.tileset[1]*38,game.tileset[0]*12,game.tileset[1]*4],
                [game.tileset[0]*29,game.tileset[1]*27.5,game.tileset[0]*5,game.tileset[1]*1],
                [game.tileset[0]*112,game.tileset[1]*27.5,game.tileset[0]*5,game.tileset[1]*1],
                [game.tileset[0]*70.5,game.tileset[1]*38,game.tileset[0]*77,game.tileset[1]*4],
                [game.tileset[0]*70.5,game.tileset[1]*34,game.tileset[0]*77,game.tileset[1]*4],
                [game.edge[0]*0.5,game.edge[1]*0.5,game.edge[0],game.edge[1]],
            ]
        break
        case 89:
            game.edge=[level[0].length*44,level.length*38]
            game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
            game.sectors=[
                [game.tileset[0]*29,game.tileset[1]*43.5,game.tileset[0]*58,game.tileset[1]*19],
                [game.tileset[0]*76.25,game.tileset[1]*49.5,game.tileset[0]*36.5,game.tileset[1]*9],
                [game.tileset[0]*118.5,game.tileset[1]*51.5,game.tileset[0]*48,game.tileset[1]*9],
                [game.tileset[0]*134.75,game.tileset[1]*58,game.tileset[0]*15.5,game.tileset[1]*4],
                [game.tileset[0]*150.25,game.tileset[1]*58,game.tileset[0]*15.5,game.tileset[1]*4],

                [game.tileset[0]*160.75,game.tileset[1]*53.5,game.tileset[0]*36.5,game.tileset[1]*5],
                [game.tileset[0]*183.5,game.tileset[1]*53,game.tileset[0]*9,game.tileset[1]*10],
                [game.tileset[0]*160.75,game.tileset[1]*49.5,game.tileset[0]*36.5,game.tileset[1]*3],
                [game.tileset[0]*152.5,game.tileset[1]*46.5,game.tileset[0]*11,game.tileset[1]*3],
                [game.tileset[0]*152.5,game.tileset[1]*43.5,game.tileset[0]*11,game.tileset[1]*3],

                [game.tileset[0]*162,game.tileset[1]*45,game.tileset[0]*8,game.tileset[1]*4],
                [game.tileset[0]*159.25,game.tileset[1]*40,game.tileset[0]*24.5,game.tileset[1]*4],
                [game.tileset[0]*180.75,game.tileset[1]*41,game.tileset[0]*18.5,game.tileset[1]*4],
                [game.tileset[0]*169.75,game.tileset[1]*43.5,game.tileset[0]*3.5,game.tileset[1]],
                [game.tileset[0]*173.25,game.tileset[1]*43.5,game.tileset[0]*3.5,game.tileset[1]],

                [game.tileset[0]*80.75,game.tileset[1]*39,game.tileset[0]*45.5,game.tileset[1]*12],
                [game.tileset[0]*123.5,game.tileset[1]*35,game.tileset[0]*40,game.tileset[1]*20],
                [game.tileset[0]*153.75,game.tileset[1]*29.5,game.tileset[0]*20.5,game.tileset[1]*7],
                [game.tileset[0]*180.5,game.tileset[1]*18,game.tileset[0]*39,game.tileset[1]*16],
                [game.tileset[0]*162.5,game.tileset[1]*35.5,game.tileset[0]*23,game.tileset[1]*5],

                [game.tileset[0]*176.5,game.tileset[1]*37,game.tileset[0]*5,game.tileset[1]*4],
                [game.tileset[0]*179.5,game.tileset[1]*34,game.tileset[0]*11,game.tileset[1]*2],
                [game.tileset[0]*184,game.tileset[1]*36.5,game.tileset[0]*8,game.tileset[1]*3],
                [game.tileset[0]*162,game.tileset[1]*47.5,game.tileset[0]*8,game.tileset[1]],
                [game.tileset[0]*167.25,game.tileset[1]*42.5,game.tileset[0]*8.5,game.tileset[1]],

                [game.tileset[0]*169,game.tileset[1]*31.5,game.tileset[0]*10,game.tileset[1]*3],
                [game.tileset[0]*186.5,game.tileset[1]*38.5,game.tileset[0]*5,game.tileset[1]],
                [game.tileset[0]*179.5,game.tileset[1]*38,game.tileset[0],game.tileset[1]*2],
                [game.tileset[0]*179.5,game.tileset[1]*36,game.tileset[0],game.tileset[1]*2],


            ]
        break
        default:
            //game.edge=[3640,2280]
            game.edge=[level[0].length*40,level.length*40]
        break
    }
    game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
    switch(game.level){
        case 8: case 17:
            game.tilecolor[0]=[100,100,100]
        break
        case 16:
            game.tilecolor[0]=[90,85,80]
        break
        case 19: case 31: case 42:
            game.tilecolor[0]=[90,85,105]
        break
        case 21:
            game.tilecolor[0]=[60,65,70]
        break
        case 22: case 23: case 35:
            game.tilecolor[0]=[110,105,100]
        break
        case 29: case 53:
            game.tilecolor[0]=[125,130,125]
        break
        case 30: case 56:
            game.tilecolor[0]=[115,105,120]
        break
        case 32: case 33:
            game.tilecolor[0]=[152,134,112]
        break
        case 36: case 73:
            game.tilecolor[0]=[160,150,130]
        break
        case 37:
            game.tilecolor[0]=[216,192,140]
        break
        case 40: case 52:
            game.tilecolor[0]=[186,152,90]
        break
        case 43:
            game.tilecolor[0]=[120,100,90]
        break
        case 44:
            game.tilecolor[0]=[67,72,78]
        break
        case 47:
            game.tilecolor[0]=[145,110,100]
        break
        case 49:
            game.tilecolor[0]=[53,47,35]
        break
        case 51:
            game.tilecolor[0]=[117,109,86]
        break
        case 55: case 65: case 89: case 90: case 92:
            game.tilecolor[0]=[252,157,127]
        break
        case 58: case 63: case 66:
            game.tilecolor[0]=[141,147,103]
        break
        case 59: case 60: case 79:
            game.tilecolor[0]=[79,72,62]
        break
        case 61:
            game.tilecolor[0]=[151,83,57]
        break
        case 64: case 70: case 84:
            game.tilecolor[0]=[170,124,98]
        break
        case 67: case 68: case 77: case 78:
            game.tilecolor[0]=[214,180,115]
        break
        case 69:
            game.tilecolor[0]=[62,26,13]
        break
        case 71:
            game.tilecolor[0]=[45,42,35]
        break
        case 74:
            game.tilecolor[0]=[236,172,98]
        break
        case 75:
            game.tilecolor[0]=[103,70,55]
        break
        case 76: case 86:
            game.tilecolor[0]=[223,149,104]
        break
        case 82: case 83: case 85:
            game.tilecolor[0]=[133,112,108]
        break
        case 87:
            game.tilecolor[0]=[113,78,56]
        break
        case 88: case 91:
            game.tilecolor[0]=[154,133,114]
        break
        default:
            game.tilecolor[0]=[120,120,120]
        break
    }
    switch(game.level){
        case 21:
            game.tilecolor[1]=[100,90,80]
        break
        case 29: case 53:
            game.tilecolor[1]=[60,65,60]
        break
        case 37:
            game.tilecolor[1]=[126,102,70]
        break
        case 38:
            game.tilecolor[1]=[55,50,55]
        break
        case 40: case 52:
            game.tilecolor[1]=[110,105,100]
        break
        case 43:
            game.tilecolor[1]=[134,125,126]
        break
        case 47:
            game.tilecolor[1]=[105,100,100]
        break
        case 49:
            game.tilecolor[1]=[48,45,40]
        break
        case 54:
            game.tilecolor[1]=[53,49,44]
        break
        case 55: case 65: case 92:
            game.tilecolor[1]=[149,139,129]
        break
        case 59: case 60: case 79:
            game.tilecolor[1]=[64,65,60]
        break
        case 61:
            game.tilecolor[1]=[189,141,106]
        break
        case 67: case 68: case 77: case 78:
            game.tilecolor[1]=[173,177,177]
        break
        case 69:
            game.tilecolor[1]=[124,84,69]
        break
        case 71:
            game.tilecolor[1]=[255,227,81]
        break
        case 75:
            game.tilecolor[1]=[105,102,93]
        break
        case 76: case 86:
            game.tilecolor[1]=[198,175,157]
        break
        case 82: case 83: case 85:
            game.tilecolor[1]=[164,143,125]
        break
        case 87:
            game.tilecolor[1]=[93,85,82]
        break
        case 88: case 91:
            game.tilecolor[1]=[154,148,138]
        break
        case 89: case 90:
            game.tilecolor[1]=[125,116,117]
        break
        default:
            game.tilecolor[1]=[60,60,65]
        break
    }
    if(game.pane){
        graphics.pane=[]
        graphics.panePoint=[]
        for(let a=0,la=graphics.main.length;a<la;a++){
            graphics.pane.push(createGraphics(graphics.main[a].width*2,graphics.main[a].height*2))
            setupLayer(graphics.pane[a])
            graphics.panePoint.push({position:{x:-1000,y:-1000},width:0,height:0})
        }
    }else{
        for(let a=0,la=graphics.pane.length;a<la;a++){
            delete graphics.pane[a]
            graphics.pane.splice(a,1)
        }
        if(game.level!=15&&game.level!=18&&game.level!=19&&game.level!=22&&game.level!=23&&game.level!=24){
            graphics.pane=[]
            graphics.pane.push(createGraphics(game.edge[0],game.edge[1]))
            setupLayer(graphics.pane[0])
        }
    }
    let reject=[]
    let clumper=[[],[]]
    if(game.level==58||game.level==63||game.level==64||game.level==66||game.level==70||game.level==84){
        for(let a=0,la=level.length;a<la;a++){
            for(let b=0,lb=level[a].length;b<lb;b++){
                if(!reject.includes(a*lb+b)){
                    let extent=[0,0]
                    switch(level[a][b]){
                        case '>': case '<': case '[': case ']':
                            extent=[0,0]
                            for(let e=1,le=level.length-a;e<le;e++){
                                if(level[a+e][b]==level[a][b]){
                                    extent[0]++
                                }else{
                                    e=le
                                }
                            }
                            for(let e=1,le=level[0].length-b;e<le;e++){
                                let valid=true
                                for(let f=0,lf=extent[0]+1;f<lf;f++){
                                    if(level[a+f][b+e]!=level[a][b]){
                                        valid=false
                                        f=lf
                                    }
                                }
                                if(valid){
                                    extent[1]++
                                }else{
                                    e=le
                                }
                            }
                            for(let e=0,le=extent[0]+1;e<le;e++){
                                for(let f=0,lf=extent[1]+1;f<lf;f++){
                                    reject.push((a+e)*lb+(b+f))
                                }
                            }
                            switch(level[a][b]){
                                case '>':
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent[1]*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent[0]*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent[1]),game.tileset[1]*(1+extent[0]),17))
                                break
                                case '<':
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent[1]*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent[0]*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent[1]),game.tileset[1]*(1+extent[0]),18))
                                break
                                case '[':
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent[1]*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent[0]*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent[1]),game.tileset[1]*(1+extent[0]),20))
                                break
                                case ']':
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent[1]*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent[0]*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent[1]),game.tileset[1]*(1+extent[0]),21))
                                break
                            }
                        break
                    }
                }
            }
        }
    }
    for(let g=0,lg=
        game.level==41?0:
        game.level==25||game.level==26||game.level==37||game.level==42||game.level==47||game.level==54||game.level==55||game.level==58||game.level==59||game.level==60||
        game.level==65||game.level==67||game.level==68||game.level==69||game.level==77||game.level==78||game.level==79||game.level==88||game.level==89||game.level==90||
        game.level==91||game.level==92?
        2:1
    ;g<lg;g++){
        for(let a=0,la=level.length;a<la;a++){
            for(let b=0,lb=level[a].length;b<lb;b++){
                if(!reject.includes(a*lb+b)){
                    switch(level[a][b]){
                        case '>':
                            if(!reject.includes(a*lb+b)){
                                let extent=0
                                for(let e=1,le=min(level.length-a,level[0].length-b);e<le;e++){
                                    if(level[a+e][b+e]=='>'&&level[a+e+1][b+e]!='>'){
                                        let valid=true
                                        for(let f=0,lf=e;f<lf;f++){
                                            if(!(level[a+e][b+f]=='#'&&game.level!=82||level[a+e][b+f]=='.')){
                                                valid=false
                                            }
                                        }
                                        if(valid){
                                            for(let f=0,lf=e+1;f<lf;f++){
                                                reject.push((a+e)*lb+(b+f))
                                            }
                                            extent++
                                        }
                                    }else{
                                        e=le
                                    }
                                }
                                reject.push(a*lb+b)
                                if(game.level==30&&level[a][b-1]=='_'&&level[a][b+1]=='c'){
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.55+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(0.9+extent),17))
                                }else if(game.level==30&&level[a][b-1]=='_'&&level[a][b+1]=='_'){
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.7+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(0.6+extent),17))
                                }else if((game.level==25||game.level==26||game.level==30||game.level==36||game.level==56||game.level==73||game.level==88)&&level[a][b-1]=='m'){
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),51))
                                }else if((
                                    game.level==25||game.level==26||game.level==32||game.level==33||game.level==37||game.level==38||game.level==40||game.level==41||game.level==42||game.level==43||
                                    game.level==47||game.level==49||game.level==52||game.level==54||game.level==55||game.level==59||game.level==60||game.level==61||game.level==65||game.level==67&&g==0||
                                    game.level==68&&g==0||game.level==69||game.level==75||game.level==76||game.level==77||game.level==78&&g==0||game.level==79||game.level==82||game.level==83||game.level==85||
                                    game.level==86||game.level==87||game.level==88||game.level==89||game.level==90||game.level==91||game.level==92
                                )&&(
                                    level[a][b-1]=='.'||
                                    level[a][b-1]=='@'&&level[a][b-2]=='@'&&level[a][b-3]=='@'&&(game.level==40||game.level==52)||
                                    level[a][b-1]=='c'&&level[a][b-2]=='c'&&level[a][b-3]=='c'&&(game.level==40||game.level==42||game.level==52||game.level==54)||
                                    level[a][b-1]=='<'&&game.level==42||
                                    a<la-2&&level[a+1][b]=='.'&&level[a+2][b+1]=='.'&&(game.level==89||game.level==90)
                                )){
                                    if(level[a][b+1]=='#'||game.level==42&&level[a+1][b]=='#'){
                                        for(let e=0,le=extent+1;e<le;e++){
                                            level[a+e]=level[a+e].substr(0,b+e)+']'+level[a+e].substr(b+e+1)
                                            if(reject.includes((a+e)*lb+(b+e))){
                                                reject.splice(reject.indexOf((a+e)*lb+(b+e)),1)
                                            }
                                        }
                                    }
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),44))
                                }else{
                                    if(game.level==54){
                                        clumper[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),17))
                                    }else{
                                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),17))
                                    }
                                    if(g==1&&game.level==37){
                                        entities.walls[0][entities.walls[0].length-1].exploded=true
                                    }
                                }
                                if(a<la-1&&level[a+1+extent][b+extent]==' '){
                                    entities.walls[0][entities.walls[0].length-1].mutate=true
                                }
                            }
                        break
                        case '<':
                            if(!reject.includes(a*lb+b)){
                                let extent=0
                                for(let e=1,le=min(level.length-a,b+1);e<le;e++){
                                    if((level[a+e][b-e]=='<'||level[a+e][b-e]=='x')&&level[a+e+1][b-e]!='<'){
                                        let valid=true
                                        for(let f=0,lf=e;f<lf;f++){
                                            if(!(level[a+e][b-f]=='#'&&game.level!=82||level[a+e][b-f]=='.')){
                                                valid=false
                                            }
                                        }
                                        if(valid){
                                            for(let f=0,lf=e+1;f<lf;f++){
                                                if(f==0&&level[a-e][b+e]=='x'){
                                                    level[a-e][b+e]=='|'
                                                }
                                                reject.push((a+e)*lb+(b-f))
                                            }
                                            extent++
                                        }
                                    }else{
                                        e=le
                                    }
                                }
                                reject.push(a*lb+b)
                                if(game.level==30&&level[a][b-1]=='_'&&level[a][b+1]=='#'){
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5-extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.2+extent*0.5)+a*game.tileset[1]+1,game.tileset[0]*(1+extent),game.tileset[1]*(0.4+extent),1))
                                }else if(game.level==30&&level[a][b-1]=='_'&&level[a][b+1]=='_'){
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5-extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.7+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(0.6+extent),18))
                                }else if((game.level==25||game.level==26||game.level==30||game.level==36||game.level==56||game.level==73||game.level==88)&&level[a][b+1]=='m'){
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5-extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),52))
                                }else if((
                                    game.level==25||game.level==26||game.level==32||game.level==33||game.level==37||game.level==38||game.level==40||game.level==41||game.level==42||game.level==43||
                                    game.level==47||game.level==49||game.level==52||game.level==54||game.level==55||game.level==59||game.level==60||game.level==61||game.level==65||game.level==67&&g==0||
                                    game.level==68&&g==0||game.level==69||game.level==75||game.level==76||game.level==77||game.level==78&&g==0||game.level==79||game.level==82||game.level==83||game.level==85||
                                    game.level==86||game.level==87||game.level==88||game.level==89||game.level==90||game.level==91||game.level==92
                                )&&(
                                    level[a][b+1]=='.'||
                                    level[a][b+1]=='@'&&level[a][b+2]=='@'&&level[a][b+3]=='@'&&level[a][b+4]=='.'||
                                    level[a][b+1]=='%'&&level[a][b+2]=='%'&&level[a][b+3]=='%'&&level[a][b+4]=='.'||
                                    level[a][b+1]=='@'&&level[a][b+2]=='@'&&level[a][b+3]=='@'&&(game.level==40||game.level==52)||
                                    level[a][b+1]=='c'&&level[a][b+2]=='c'&&level[a][b+3]=='c'&&(game.level==40||game.level==42||game.level==52||game.level==54)||
                                    a<la-1&&level[a+1][b]=='.'&&game.level==49||
                                    level[a][b+1]=='>'&&game.level==42||
                                    a<la-1&&level[a+1][b+1]=='.'&&level[a+1][b]==']'&&level[a][b+1]!='<'&&(game.level==89||game.level==90)
                                )){
                                    if(level[a][b-1]=='#'||(game.level==42||(game.level==67||game.level==77||game.level==78)&&(b>=lb/2+30||b<=lb/2-30)||game.level==68&&b>=30)&&level[a+1][b]=='#'){
                                        for(let e=0,le=extent+1;e<le;e++){
                                            level[a+e]=level[a+e].substr(0,b-e)+'['+level[a+e].substr(b-e+1)
                                            if(reject.includes((a+e)*lb+(b-e))){
                                                reject.splice(reject.indexOf((a+e)*lb+(b-e)),1)
                                            }
                                        }
                                    }
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5-extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),45))
                                }else{
                                    if(game.level==54){
                                        clumper[0].push(new wall(graphics.main,game.tileset[0]*(0.5-extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),18))
                                    }else{
                                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5-extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),18))
                                    }
                                    if(g==1&&game.level==37){
                                        entities.walls[0][entities.walls[0].length-1].exploded=true
                                    }
                                }
                                if(a<la-1&&level[a+1+extent][b-extent]==' '){
                                    entities.walls[0][entities.walls[0].length-1].mutate=true
                                    
                                }
                            }
                        break
                    }
                }
            }
        }
        for(let a=level.length-1,la=0;a>=la;a--){
            for(let b=0,lb=level[a].length;b<lb;b++){
                if(!reject.includes(a*lb+b)){
                    switch(level[a][b]){
                        case '[':
                            if(!reject.includes(a*lb+b)){
                                let extent=0
                                for(let e=1,le=min(a+1,level[0].length-b);e<le;e++){
                                    if((level[a-e][b+e]=='['||level[a-e][b+e]=='v')&&level[a-e-1][b+e]!='['){
                                        let valid=true
                                        for(let f=0,lf=e;f<lf;f++){
                                            if(level[a-e][b+f]!='#'&&level[a-e][b+f]!='.'||reject.includes((a-e)*lb+(b+f))){
                                                valid=false
                                            }
                                        }
                                        if(valid){
                                            for(let f=0,lf=e+1;f<lf;f++){
                                                if(f==0&&level[a-e][b+e]=='v'){
                                                    level[a-e][b+e]=='='
                                                }
                                                reject.push((a-e)*lb+(b+f))
                                            }
                                            extent++
                                        }
                                    }else{
                                        e=le
                                    }
                                }
                                reject.push(a*lb+b)
                                if((game.level==25||game.level==26||game.level==30||game.level==36||game.level==56||game.level==73||game.level==88)&&level[a][b-1]=='m'){
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5-extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),53))
                                }else if((
                                    game.level==25||game.level==26||game.level==37||game.level==38||game.level==40||game.level==41||game.level==42||game.level==43||game.level==47||game.level==49||
                                    game.level==52||game.level==54||game.level==55||game.level==59||game.level==60||game.level==61||game.level==65||game.level==67||game.level==68||game.level==69||
                                    game.level==75||game.level==76||game.level==77||game.level==78||game.level==79||game.level==82||game.level==83||game.level==85||game.level==86||game.level==87||
                                    game.level==88||game.level==89||game.level==90||game.level==91||game.level==92
                                )&&(
                                    level[a][b-1]=='.'||
                                    level[a][b-1]=='c'||
                                    level[a][b-1]=='%'&&level[a][b-2]=='%'&&level[a][b-3]=='%'&&(game.level==40||game.level==49||game.level==59||game.level==79)||
                                    level[a][b-1]=='`'&&level[a][b-2]=='`'&&level[a][b-3]=='`'&&game.level==49
                                )){
                                    if(level[a][b+1]=='#'||(game.level==67||game.level==68||game.level==77||game.level==78)&&level[a+1][b]=='#'){
                                        for(let e=0,le=extent+1;e<le;e++){
                                            level[a-e]=level[a-e].substr(0,b+e)+'<'+level[a-e].substr(b+e+1)
                                            if(reject.includes((a-e)*lb+(b+e))){
                                                reject.splice(reject.indexOf((a-e)*lb+(b+e)),1)
                                            }
                                        }
                                    }
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5-extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),46))
                                }else{
                                    if(game.level==54){
                                        clumper[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5-extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),20))
                                    }else{
                                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5-extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),20))
                                    }
                                }
                                if(a>0&&level[a-extent-1][b-extent]==' '){
                                    entities.walls[0][entities.walls[0].length-1].mutate=true
                                }
                            }
                        break
                        case ']':
                            if(!reject.includes(a*lb+b)){
                                let extent=0
                                for(let e=1,le=min(a+1,b+1);e<le;e++){
                                    if(level[a-e][b-e]==']'&&level[a-e-1][b-e]!=']'){
                                        let valid=true
                                        for(let f=0,lf=(game.level==89||game.level==90?e+1:e);f<lf;f++){
                                            if(level[a-e][b-f]!='#'&&level[a-e][b-f]!='.'||reject.includes((a-e)*lb+(b-f))){
                                                valid=false
                                            }
                                        }
                                        if(valid){
                                            for(let f=0,lf=e+1;f<lf;f++){
                                                reject.push((a-e)*lb+(b-f))
                                            }
                                            extent++
                                        }
                                    }else{
                                        e=le
                                    }
                                }
                                reject.push(a*lb+b)
                                if((game.level==25||game.level==26||game.level==30||game.level==36||game.level==56||game.level==73||game.level==88)&&level[a][b+1]=='m'){
                                    if(level[a][b-1]=='#'){
                                        for(let e=0,le=extent+1;e<le;e++){
                                            level[a-e]=level[a-e].substr(0,b-e)+'>'+level[a-e].substr(b-e+1)
                                            if(reject.includes((a-e)*lb+(b-e))){
                                                reject.splice(reject.indexOf((a-e)*lb+(b-e)),1)
                                            }
                                        }
                                    }
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5-extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5-extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),54))
                                }else if((
                                    game.level==25||game.level==26||game.level==37||game.level==38||game.level==40||game.level==41||game.level==42||game.level==43||game.level==47||game.level==49||
                                    game.level==52||game.level==54||game.level==55||game.level==59||game.level==60||game.level==61||game.level==65||game.level==67||game.level==68||game.level==69||
                                    game.level==75||game.level==76||game.level==77||game.level==78||game.level==79||game.level==82||game.level==83||game.level==85||game.level==86||game.level==87||
                                    game.level==88||game.level==89||game.level==90||game.level==91||game.level==92
                                )&&(
                                    level[a][b+1]=='.'||
                                    level[a][b+1]=='c'||
                                    level[a][b+1]=='%'&&level[a][b+2]=='%'&&level[a][b+3]=='%'&&(game.level==40||game.level==49||game.level==59||game.level==79)||
                                    level[a][b+1]=='`'&&level[a][b+2]=='`'&&level[a][b+3]=='`'&&game.level==49
                                )){
                                    if(level[a][b-1]=='#'||(game.level==67||game.level==77||game.level==78)&&level[a+1][b]=='#'){
                                        for(let e=0,le=extent+1;e<le;e++){
                                            level[a-e]=level[a-e].substr(0,b-e)+'>'+level[a-e].substr(b-e+1)
                                            if(reject.includes((a-e)*lb+(b-e))){
                                                reject.splice(reject.indexOf((a-e)*lb+(b-e)),1)
                                            }
                                        }
                                    }
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5-extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5-extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),47))
                                }else{
                                    if(game.level==54){
                                        clumper[0].push(new wall(graphics.main,game.tileset[0]*(0.5-extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5-extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),21))
                                    }else{
                                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5-extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5-extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),21))
                                    }
                                }
                                if(a>0&&level[a-extent-1][b-extent]==' '){
                                    entities.walls[0][entities.walls[0].length-1].mutate=true
                                }
                            }
                        break
                    }
                }
            }
        }
    }
    //level.forEach(item=>print(item))
    if(game.level==55&&game.players==1){
        reject.push((level.length-18)*level[0].length+129)
        reject.push((level.length-17)*level[0].length+129)
    }
    for(let a=0,la=level.length;a<la;a++){
        for(let b=0,lb=level[a].length;b<lb;b++){
            let cluster=0
            switch(level[a][b]){
				case '#': case '.':
                    if(level[a][b]=='.'&&(game.level==19||game.level==31)){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],34))
                    }else if(level[a][b]=='.'&&game.level==39){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.3)*game.tileset[1],game.tileset[0]*0.8,game.tileset[1]*0.4,43))
                    }else if(level[a][b]=='.'&&(
                        game.level==25||game.level==26||game.level==32||game.level==33||game.level==37||game.level==38||game.level==40||game.level==41||game.level==42||game.level==43||
                        game.level==47||game.level==49||game.level==52||game.level==54||game.level==55||game.level==59||game.level==60||game.level==61||game.level==65||game.level==67||
                        game.level==68||game.level==69||game.level==75||game.level==76||game.level==77||game.level==78||game.level==79||game.level==82||game.level==83||game.level==85||
                        game.level==86||game.level==87||game.level==88||game.level==89||game.level==90||game.level==91||game.level==92
                    )&&!reject.includes(a*lb+b)){
                        let extent=0
                        for(let e=1,le=level.length-a;e<le;e++){
                            if(level[a+e][b]=='.'&&!reject.includes((a+e)*lb+b)){
                                reject.push((a+e)*lb+b)
                                extent++
                            }else{
                                e=le
                            }
                        }
                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+extent/2)*game.tileset[1],game.tileset[0],game.tileset[1]*(1+extent),43))
                    }else if(!reject.includes(a*lb+b)){
                        if(game.level==23||game.level==35){
                            let extent=0
                            let gapper=[]
                            for(let e=1,le=level[a].length-b;e<le;e++){
                                if((level[a][b+e]=='#'||level[a][b+e]=='@'||level[a][b+e]=='`'||level[a][b+e]=='g'||level[a][b+e]=='?'||level[a][b+e]=='c'||level[a][b+e]=='~'||level[a][b+e]=='Q')&&!reject.includes(a*lb+b+e)){
                                    if(level[a][b+e]=='#'){
                                        reject.push(a*lb+b+e)
                                    }else{
                                        gapper.push([game.tileset[0]*(b+e),game.tileset[0]*(b+e+1)])
                                    }
                                    extent++
                                }else{
                                    e=le
                                }
                            }
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1],1))
                            entities.walls[0][entities.walls[0].length-1].gapper=gapper
                        }else{
                            let extent=0
                            for(let e=1,le=level.length-a;e<le;e++){
                                if(level[a+e][b]=='#'&&!reject.includes((a+e)*lb+b)){
                                    reject.push((a+e)*lb+b)
                                    extent++
                                }else{
                                    e=le
                                }
                            }
                            if(
                                (game.level==30||game.level==56)&&a>0&&(
                                    (level[a-1][b]=='_'||level[a-1][b]=='c')&&
                                    !(level[a-1][b+1]=='<'&&level[a-1][b+2]!='#')&&
                                    !(level[a-1][b+2]=='<'&&level[a-1][b+3]!='#')&&
                                    !(level[a-1][b+3]=='<'&&level[a-1][b+4]!='#')&&
                                    !(level[a-1][b+4]=='<'&&level[a-1][b+5]!='#')||
                                    level[a-1][b]=='<'&&level[a-1][b-1]=='_'&&level[a-1][b+1]=='#'
                                )
                            ){
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2+extent/2)*game.tileset[1],game.tileset[0],game.tileset[1]*(1.6+extent),1))
                            }else if(game.level==54){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+extent/2)*game.tileset[1],game.tileset[0],game.tileset[1]*(1+extent),1))
                            }else{
                                entities.walls[dm()&&a<5?1:0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+extent/2)*game.tileset[1],game.tileset[0],game.tileset[1]*(1+extent),1))
                            }
                        }
                    }
                break
                case '@':
                    switch(game.level){
                        case 25: case 26: case 42: case 82: case 83: case 85:
                            if(level[a][b+1]=='.'||level[a][b+2]=='.'||level[a][b+3]=='.'){
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],48))
                            }else{
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],2))
                            }
                        break
                        case 23: case 35: case 67: case 68: case 77: case 78:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],2))
                        break
                        default:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],2))
                        break
                    }
                break
                case '!':
                    cluster=game.classWeapon?3:game.peakWeapon?1:dm()?0:game.level==27&&game.pvp?1:floor(random(1.5))
                    switch(game.level){
                        case 27:
                            if(game.pvp){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                                entities.walls[1].push(new wall(graphics.main,game.edge[0]-(game.tileset[0]/2+b*game.tileset[0]),game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                                let weapon=listing[cluster][floor(random(listing[cluster].length))]
                                entities.walls[1][entities.walls[1].length-2].weapon=weapon
                                entities.walls[1][entities.walls[1].length-1].weapon=weapon
                            }else{
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                                entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                            }
                        break
                        case 19: case 22: case 23: case 24: case 31: case 35: case 36: case 49: case 50: case 51:
                        case 52: case 53: case 54: case 56: case 61: case 62: case 64: case 70: case 71: case 72:
                        case 73: case 74: case 75: case 81: case 84: case 86: case 90: case 91: case 92:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                            entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                        break
                        case 25: case 26:
                            entities.walls[2].push(new wall(graphics.main,b*game.tileset[0],a*game.tileset[1],0,0,3))
                        break
                        case 28:
                            if(a>la-12){
                                entities.walls[1].push(new wall(graphics.main,game.edge[0]*0.5,(a-0.5)*game.tileset[1]*0.5+game.edge[1]*0.5,game.edge[0],game.edge[1]-(a-0.5)*game.tileset[1],3))
                            }else{
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.1)*game.tileset[1],game.tileset[0],game.tileset[1]*0.8,3))
                            }
                        break
                        case 30: case 32: case 33:
                            clumper[1].push(new wall(graphics.main,b*game.tileset[0],a*game.tileset[1],0,0,3))
                        break
                        case 41:
                            entities.walls[1].push(new wall(graphics.main,game.edge[0]*0.5+(b-5)*game.tileset[0]*0.5,(a-0.5)*game.tileset[1]*0.5+game.edge[1]*0.5,game.edge[0]-(b-5)*game.tileset[0],game.edge[1]-(a-0.5)*game.tileset[1],3))
                        break
                        case 44:
                            if(!game.classWeapon){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                                entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                            }
                        break
                        case 55:
                            entities.walls[1].push(new wall(graphics.main,game.edge[0]*0.2,(a-0.5)*game.tileset[1]*0.5+game.edge[1]*0.5,game.edge[0]*0.4,game.edge[1]-(a-1)*game.tileset[1],3))
                        break
                        case 59: case 60: case 68: case 79:
                            entities.walls[1].push(new wall(graphics.main,b*game.tileset[0],a*game.tileset[1],0,0,3))
                        break
                        case 65:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]*93,(a-0.5)*game.tileset[1]*0.5+game.edge[1]*0.5,game.tileset[0]*18,game.edge[1]-(a-1)*game.tileset[1],3))
                            entities.walls[1].push(new wall(graphics.main,game.edge[0]-game.tileset[0]*93,(a-0.5)*game.tileset[1]*0.5+game.edge[1]*0.5,game.tileset[0]*18,game.edge[1]-(a-1)*game.tileset[1],3))
                        break
                        case 66:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                            entities.walls[1][entities.walls[1].length-1].weapon=findName('PlayerMobster',types.player)
                        break
                        case 67: case 77: case 78:
                            clumper[0].push(new wall(graphics.main,b*game.tileset[0],a*game.tileset[1],0,0,3))
                        break
                        case 69:
                            entities.walls[1].push(new wall(graphics.main,game.edge[0]*0.375,(a-0.3)*game.tileset[1],game.edge[0]*0.625,game.edge[1]-(a-0.5)*game.tileset[1],3))
                        break
                        case 88:
                            entities.walls[1].push(new wall(graphics.main,game.edge[0]*0.3,(a+0.4)*game.tileset[1],game.edge[0]*0.4,game.edge[1]-(a+1.3)*game.tileset[1],3))
                        break
                        default:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.1)*game.tileset[1],game.tileset[0],game.tileset[1]*0.8,3))
                        break
                    }
                break
                case '%':
                    if(game.level==7){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*2,game.tileset[1],4))
                    }else{
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],4))
                    }
                break
                case '$':
                    switch(game.level){
                        case 32: case 33:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],15))
                        break
                        case 37:
                            if(game.placer[0].includes(game.placer[3])){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,58))
                            }
                            game.placer[3]++
                        break
                        case 54:
                            entities.walls[2].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],67))
                        break
                        case 55: case 65:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],23))
                        break
                        case 58: case 63: case 66:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,68))
                        break
                        case 59: case 60: case 79:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,69))
                        break
                        case 61:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,70))
                        break
                        case 64: case 70: case 84:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,70))
                        break
                        case 67: case 77:
                            if(game.classWeapon){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,27))
                            }else{
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,69))
                            }
                        break
                        case 68: case 69:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,69))
                        break
                        case 72: case 81:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,77))
                        break
                        case 78:
                            if(!game.classWeapon){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,69))
                            }
                        break
                        case 86:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,61))
                        break
                        case 88: case 91:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,73))
                        break
                        case 89: case 90:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],a*game.tileset[1],game.tileset[0],game.tileset[1]*2,43))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*-0.4+b*game.tileset[0],a*game.tileset[1],game.tileset[0]*0.8,game.tileset[1]*2,45))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*1.4+b*game.tileset[0],a*game.tileset[1],game.tileset[0]*0.8,game.tileset[1]*2,44))
                        break
                        default:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.4)*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.2,5))
                        break
                    }
                break
                case '|':
                    switch(game.level){
                        case 25: case 26:
                            if(a>0&&(level[a-1][b]==']'||level[a-1][b]=='[')){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],a*game.tileset[1],game.tileset[0]*0.125,game.tileset[1]*2,7))
                            }else if(a<la-1&&(level[a+1][b]=='>'||level[a+1][b]=='<')){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1)*game.tileset[1],game.tileset[0]*0.125,game.tileset[1]*2,7))
                            }else{
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.125,game.tileset[1],7))
                            }
                        break
                        case 30: case 32: case 33: case 36: case 37: case 38: case 40: case 42: case 52: case 55:
                        case 56: case 58: case 59: case 60: case 61: case 62: case 63: case 64: case 65: case 66:
                        case 67: case 68: case 69: case 70: case 72: case 73: case 74: case 75: case 76: case 77:
                        case 78: case 79: case 81: case 82: case 83: case 84: case 85: case 86: case 88: case 91:
                        case 92:
                            if(a<la-2&&level[a+1][b]=='a'&&level[a+2][b]=='a'&&(game.level==64||game.level==70||game.level==84)){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1.5)*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*3,7))
                            }else if(a<la-1&&level[a+1][b]=='a'&&(game.level==64||game.level==70||game.level==84)){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1)*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*2,7))
                            }else if(a<la-1&&level[a+1][b]=='/'&&(game.level==40||game.level==52)){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.75)*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*1.5,7))
                            }else if(a<la-1&&level[a+1][b]=='/'&&(game.level==59||game.level==60||game.level==79)){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1)*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*2,7))
                            }else if(a<la-1&&(level[a+1][b]=='>'&&level[a+2][b]=='>'||level[a+1][b]=='<'&&level[a+2][b]=='<')){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1.5)*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*3,7))
                            }else if(a>0&&level[a-1][b]=='m'||a>1&&level[a-2][b]=='m'){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],55))
                            }else if(a>0&&(level[a-1][b]==']'||level[a-1][b]=='[')){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*2,7))
                            }else if(a<la-2&&level[a+1][b]=='N'&&level[a+2][b]=='-'){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1.5)*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*3,7))
                            }else if(a<la-1&&(level[a+1][b]=='>'||level[a+1][b]=='<'||level[a+1][b]=='-'||level[a+1][b]=='N'||level[a+1][b]=='1'||level[a+1][b]=='2'||level[a+1][b]=='3'||level[a+1][b]=='4'||level[a+1][b]=='5'||level[a+1][b]=='a'&&game.level==69||level[a+1][b]=='^')){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1)*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*2,7))
                            }else{
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                            }
                        break
                        case 44: case 47:
                            if(a>0&&(level[a-1][b]==']'||level[a-1][b]=='[')){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*2,7))
                            }else if(a<la-1&&(level[a+1][b]=='>'||level[a+1][b]=='<'||level[a+1][b]=='-')){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1)*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*2,7))
                            }else{
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                            }
                        break
                        default:
                            if(a>0&&(level[a-1][b]==']'||level[a-1][b]=='[')){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*2,7))
                            }else if(a<la-1&&(level[a+1][b]=='>'||level[a+1][b]=='<')){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1)*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*2,7))
                            }else{
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                            }
                        break
                    }
                break
                case '^':
                    switch(game.level){
                        case 16:
                            for(let a=0,la=game.players;a<la;a++){
                                entities.walls[1].push(new wall(graphics.main,random(100,game.edge[0]-100),random(-2000,0),game.tileset[1]*0.6,game.tileset[1]*0.6,8))
                            }
                        break
                        case 49:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.4+a*game.tileset[1],game.tileset[1]*0.75,game.tileset[1]*0.75,8))
                        break
                        case 59: case 60: case 79:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]+(b+(game.level==7?0.5:0))*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,8))
                        break
                        case 61:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]+(b+(game.level==7?0.5:0))*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,8))
                        break
                        case 67: case 78:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,76))
                        break
                        default:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+(game.level==7?0.5:0))*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,8))
                        break
                    }
                break
                case '*':
                    switch(game.level){
                        case 41:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.4+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,9))
                        break
                        case 49:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.4+a*game.tileset[1],game.tileset[1]*0.75,game.tileset[1]*0.75,9))
                        break
                        case 59: case 60: case 79:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,9))
                        break
                        case 61:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,68))
                        break
                        case 87:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,61))
                        break
                        default:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,9))
                        break
                    }
                break
                case '_':
                    switch(game.level){
                        case 8: case 17:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.5)*game.tileset[1],game.tileset[1]*1.2,game.tileset[1]*2,10))
                        break
                        case 16:
                            if(!reject.includes(a*lb+b)){
                                let extent=0
                                for(let e=1,le=level[0].length-a;e<le;e++){
                                    if(level[a][b+e]=='_'){
                                        reject.push(a*lb+b+e)
                                        extent++
                                    }else{
                                        e=le
                                    }
                                }
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],game.tileset[1]/2+(a+0.3)*game.tileset[1],game.tileset[0]*(0.6+extent),game.tileset[1]*0.4,24))
                            }
                        break
                        case 23: case 35:
                            if(level[a][b-1]=='['||level[a][b-1]=='>'){
                                clumper[0].push(new wall(graphics.main,b*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.3,24))
                            }else if(level[a][b+1]==']'||level[a][b+1]=='<'){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]+b*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.3,24))
                            }else{
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0],game.tileset[1]*0.3,24))
                            }
                        break
                        case 25: case 26:
                            if(level[a][b-1]=='['||level[a][b-1]=='>'){
                                entities.walls[0].splice(0,0,new wall(graphics.main,b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.4,24))
                            }else if(level[a][b+1]==']'||level[a][b+1]=='<'){
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.4,24))
                            }else{
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                            }
                        break
                        case 28:
                            if(!reject.includes(a*lb+b)){
                                let extent=0
                                for(let e=1,le=level[0].length-a;e<le;e++){
                                    if(level[a][b+e]=='_'){
                                        reject.push(a*lb+b+e)
                                        extent++
                                    }else{
                                        e=le
                                    }
                                }
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],game.tileset[1]/2+(a+0.3)*game.tileset[1],game.tileset[0]*(0.8+extent),game.tileset[1]*0.4,24))
                            }
                        break
                        case 29: case 34: case 36: case 37: case 38: case 39: case 49: case 50: case 51: case 53: case 54:
                        case 55: case 58: case 59: case 60: case 61: case 63: case 65: case 66: case 73: case 74: case 79:
                        case 89: case 90: case 92:
                            if(level[a][b-1]=='['||level[a][b-1]=='>'){
                                entities.walls[0].splice(0,0,new wall(graphics.main,b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.4,24))
                            }else if(level[a][b+1]==']'||level[a][b+1]=='<'){
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.4,24))
                            }else{
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                            }
                            if(level[a+1][b]==':'){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*0.3,game.tileset[1]*0.6,38))
                            }else if(level[a+1][b]=='|'){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*0.6,7))
                            }
                        break
                        case 30: case 56:
                            if(level[a][b-1]=='['){
                                entities.walls[0].splice(0,0,new wall(graphics.main,b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.4,24))
                                entities.walls[0][0].corner=[false,false]
                            }else if(level[a][b+1]==']'){
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*0.75+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*1.5,game.tileset[1]*0.4,24))
                                entities.walls[0][0].corner=[false,false]
                            }else if(level[a][b+1]=='<'&&level[a][b+2]=='#'){
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.4,24))
                                entities.walls[0][entities.walls[0].length-1].corner=[false,true]
                            }else{
                                if(level[a][b-1]=='>'){
                                    entities.walls[0].push(new wall(graphics.main,b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.4,24))
                                }else if(level[a][b+1]=='<'){
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.4,24))
                                }else if(level[a][b+1]=='c'){
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*4,game.tileset[1]*0.4,24))
                                    entities.walls[0][entities.walls[0].length-1].gapper=[[game.tileset[0]+b*game.tileset[0],game.tileset[0]*4+b*game.tileset[0]]]
                                }else{
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                                }
                                entities.walls[0][entities.walls[0].length-1].corner=[
                                    level[a][b+1]=='_'&&(level[a+1][b+1]=='|'||level[a+1][b+1]==':')&&level[a][b-1]==' ',
                                    level[a][b-1]=='_'&&(level[a+1][b-1]=='|'||level[a+1][b-1]==':')&&level[a][b+1]==' '
                                ]
                            }
                            if(level[a+1][b]==':'){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*0.6,38))
                            }else if(level[a+1][b]==';'){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*0.6,56))
                            }else if(level[a+1][b]=='|'){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*0.6,7))
                            }
                        break
                        case 32: case 33:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                            if(level[a+1][b]==':'){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*0.6,38))
                            }else if(level[a+1][b]==';'){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*0.6,56))
                            }else if(level[a+1][b]=='|'){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*0.6,7))
                            }
                        break
                        case 40: case 42: case 52:
                            if(level[a][b-1]=='['||level[a][b-1]=='>'){
                                clumper[0].push(new wall(graphics.main,b*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.3,24))
                            }else if(level[a][b+1]==']'||level[a][b+1]=='<'){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]+b*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.3,24))
                            }else if(level[a][b+1]=='g'){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]*0.75+b*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*1.5,game.tileset[1]*0.3,24))
                            }else if(level[a][b-1]==' '&&level[a+1][b]=='|'&&a>la-10){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]*0.25+b*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*1.5,game.tileset[1]*0.3,24))
                            }else if(level[a][b+1]==' '&&level[a+1][b]=='|'&&a>la-10){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]*0.75+b*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*1.5,game.tileset[1]*0.3,24))
                            }else{
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0],game.tileset[1]*0.3,24))
                            }
                            if(level[a+1][b]=='|'){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.65+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*0.7,7))
                            }
                        break
                        case 43:
                            if(level[a][b-1]=='['||level[a][b-1]=='>'){
                                entities.walls[0].splice(0,0,new wall(graphics.main,b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.4,24))
                            }else if(level[a][b+1]==']'||level[a][b+1]=='<'){
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.4,24))
                            }else{
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                            }
                            if(level[a+1][b]==':'){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.6,38))
                            }else if(level[a+1][b]=='|'){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*0.6,7))
                            }
                        break
                        case 62: case 64: case 70: case 72: case 81: case 84:
                            if(level[a][b-1]=='['||level[a][b-1]=='>'){
                                entities.walls[0].splice(0,0,new wall(graphics.main,b*game.tileset[0],(a+0.1)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.2,24))
                            }else if(level[a][b+1]==']'||level[a][b+1]=='<'){
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]+b*game.tileset[0],(a+0.1)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.2,24))
                            }else{
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.1)*game.tileset[1],game.tileset[0],game.tileset[1]*0.2,24))
                            }
                            if(level[a+1][b]==':'){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.6+a*game.tileset[1],game.tileset[0]*0.3,game.tileset[1]*0.8,38))
                            }else if(level[a+1][b]=='|'){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.6+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*0.8,7))
                            }
                        break
                        case 67: case 77: case 78:
                            if(b<=lb/2){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1.5)*game.tileset[1],game.tileset[0]*0.2,game.tileset[1]*3,74))
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]*5.5+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,75))
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*5.5+b*game.tileset[0],(a+1.7)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,37))
                            }else{
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1.5)*game.tileset[1],game.tileset[0]*0.2,game.tileset[1]*3,74))
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]*-4.5+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,75))
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*-4.5+b*game.tileset[0],(a+1.7)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,37))
                            }
                        break
                        case 68:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1.5)*game.tileset[1],game.tileset[0]*0.2,game.tileset[1]*3,74))
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]*-4.5+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,75))
                            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*-4.5+b*game.tileset[0],(a+1.7)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,37))
                        break
                        case 69:
                            if(level[a][b-1]=='['||level[a][b-1]=='>'){
                                entities.walls[0].splice(0,0,new wall(graphics.main,b*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.3,24))
                            }else if(level[a][b+1]==']'||level[a][b+1]=='<'){
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]+b*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.3,24))
                            }else{
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0],game.tileset[1]*0.3,24))
                            }
                            if(level[a+1][b]==':'){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.65+a*game.tileset[1],game.tileset[0]*0.3,game.tileset[1]*0.7,38))
                            }else if(level[a+1][b]=='|'){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.65+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*0.7,7))
                            }
                        break
                        case 76: case 86:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1.5)*game.tileset[1],game.tileset[0]*0.2,game.tileset[1]*3,74))
                        break
                        case 82: case 83: case 85:
                            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1]*0.2,24))
                            if(level[a+1][b]=='|'){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.8+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*0.4,7))
                            }
                        break
                        case 87:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1.5)*game.tileset[1],game.tileset[0]*0.2,game.tileset[1]*3,74))
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]*5.5+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,75))
                            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*5.5+b*game.tileset[0],(a+1.7)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,37))
                        break
                        case 88: case 91:
                            if(level[a][b-1]=='['||level[a][b-1]=='>'){
                                entities.walls[0].splice(0,0,new wall(graphics.main,b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.4,24))
                            }else if(level[a][b+1]==']'||level[a][b+1]=='<'){
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.4,24))
                            }else{
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                            }
                            entities.walls[0][0].corner=[
                                level[a][b+1]=='_'&&(level[a+1][b+1]=='|'||level[a+1][b+1]==':')&&level[a][b-1]==' ',
                                level[a][b-1]=='_'&&(level[a+1][b-1]=='|'||level[a+1][b-1]==':')&&level[a][b+1]==' '
                            ]
                            if(level[a+1][b]==':'){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*0.6,38))
                            }else if(level[a+1][b]=='|'){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*0.6,7))
                            }
                        break
                        default:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                        break
                    }
                break
                case '-':
                    switch(game.level){
                        case 23:
                            //intentionally left blank
                        break
                        case 82: case 83: case 85:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.3)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,11))
                        break
                        default:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0],game.tileset[1]*0.5,11))
                            if(game.level==30&&level[a-1][b]=='|'){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                            }
                        break
                    }
                break
                case '&':
                    switch(game.level){
                        case 87:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,68))
                        break
                        default:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,12))
                        break
                    }
                break
                case '+':
                    switch(game.level){
                        case 8: case 17:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0],game.tileset[1]*0.5,11))
                        break
                        case 23:
                            if(level[a+1][b]=='+'||level[a-1][b]=='+'){
                                clumper[1].push(new wall(graphics.main,b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                            }else{
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0],game.tileset[1]*0.3,24))
                            }
                        break
                        case 24:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,37))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                        break
                        case 25: case 26:
                            if(level[a+1][b]==':'){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*0.6,38))
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                            }else{
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.125,game.tileset[1],7))
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                            }
                        break
                        case 29:
                            if(level[a+1][b]==':'){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.3,game.tileset[1],38))
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                            }else{
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.125,game.tileset[1],7))
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                            }
                        break
                        case 39:
                            if(!reject.includes(a*lb+b)){
                                let extent=0
                                for(let e=1,le=level[0].length-a;e<le;e++){
                                    if(level[a][b+e]=='+'){
                                        reject.push(a*lb+b+e)
                                        extent++
                                    }else{
                                        e=le
                                    }
                                }
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],game.tileset[1]/2+(a+0.1)*game.tileset[1],game.tileset[0]*(0.9+extent),game.tileset[1]*0.8,49))
                            }
                        break
                        case 21:
                            clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                        break
                        default:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                        break
                    }
                break
                case '`':
                    switch(game.level){
                        case 67: case 77: case 78:
                            if(game.classWeapon){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,65))
                            }else{  
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,57))
                            }
                        break
                        default:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],13))
                        break
                    }
                break
                case '=':
                    switch(game.level){
                        case 8: case 17:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.5)*game.tileset[1],game.tileset[1]*1.2,game.tileset[1]*2,14))
                        break
                        case 24:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,37))
                        break
                        default:
                            if(!reject.includes(a*lb+b)){
                                let extent=0
                                for(let e=1,le=level[0].length-a;e<le;e++){
                                    if(level[a][b+e]=='<'){
                                        extent++
                                    }else if(level[a][b+e]==']'){
                                        extent+=0.5
                                    }else if(level[a][b+e]=='='){
                                        reject.push(a*lb+b+e)
                                        extent++
                                    }else{
                                        e=le
                                    }
                                }
                                switch(game.level){
                                    case 25: case 26:
                                        if(a>35){
                                            if(level[a][b-1]=='>'){
                                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*0.3,37))
                                            }else if(level[a][b-1]=='['){
                                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.25)*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*(1.5+extent),game.tileset[1]*0.3,37))
                                            }else{
                                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*0.3,37))
                                            }
                                        }else{
                                            if(level[a][b-1]=='>'){
                                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*0.4,37))
                                            }else if(level[a][b-1]=='['){
                                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.25)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(1.5+extent),game.tileset[1]*0.4,37))
                                            }else{
                                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*0.4,37))
                                            }
                                        }
                                    break
                                    case 37: case 38: case 41: case 47: case 55: case 65: case 71: case 87: case 92:
                                        if(level[a][b-1]=='>'){
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*0.3,37))
                                        }else if(level[a][b-1]=='['){
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.25)*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*(1.5+extent),game.tileset[1]*0.3,37))
                                        }else{
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*0.3,37))
                                        }
                                        for(let c=0,lc=1+extent;c<lc;c++){
                                            if(level[a+1][b+c]==':'){
                                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+(b+c)*game.tileset[0],game.tileset[1]*0.65+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*0.7,38))
                                            }else if(level[a+1][b+c]==';'){
                                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+(b+c)*game.tileset[0],game.tileset[1]*0.65+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*0.7,56))
                                            }else if(level[a+1][b+c]=='|'){
                                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+c)*game.tileset[0],game.tileset[1]*0.65+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*0.7,7))
                                            }
                                        }
                                    break
                                    case 49:
                                        if(level[a][b-1]==' '&&level[a][b+1]==']'||level[a][b-1]=='|'&&level[a][b+1]==']'){
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+0.5)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,37))
                                        }else if(level[a][b-1]=='>'){
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*0.4,37))
                                        }else if(level[a][b-1]=='['){
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.25)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(1.5+extent),game.tileset[1]*0.4,37))
                                        }else{
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*0.4,37))
                                        }
                                    break
                                    case 54:
                                        if(level[a][b-1]=='>'){
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+(b>=150?0.2:0.15))*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*(b>=150?0.4:0.3),37))
                                        }else if(level[a][b-1]=='['){
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.25)*game.tileset[0],(a+(b>=150?0.2:0.15))*game.tileset[1],game.tileset[0]*(1.5+extent),game.tileset[1]*(b>=150?0.4:0.3),37))
                                        }else{
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],(a+(b>=150?0.2:0.15))*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(b>=150?0.4:0.3),37))
                                        }
                                        for(let c=0,lc=1+extent;c<lc;c++){
                                            if(level[a+1][b+c]==':'){
                                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+(b+c)*game.tileset[0],game.tileset[1]*0.65+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*0.7,38))
                                            }else if(level[a+1][b+c]==';'){
                                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+(b+c)*game.tileset[0],game.tileset[1]*0.65+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*0.7,56))
                                            }else if(level[a+1][b+c]=='|'){
                                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+c)*game.tileset[0],game.tileset[1]*0.65+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*0.7,7))
                                            }
                                        }
                                    break
                                    case 59: case 60: case 79: case 82: case 83: case 85:
                                        if(level[a][b-1]=='>'){
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+0.125)*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*0.25,37))
                                        }else if(level[a][b-1]=='['){
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.25)*game.tileset[0],(a+0.125)*game.tileset[1],game.tileset[0]*(1.5+extent),game.tileset[1]*0.25,37))
                                        }else{
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],(a+0.125)*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*0.25,37))
                                        }
                                    break
                                    case 61: case 69:
                                        if(level[a][b-1]=='>'){
                                            entities.walls[1].splice(0,0,new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*0.3,37))
                                        }else if(level[a][b-1]=='['){
                                            entities.walls[1].splice(0,0,new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.25)*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*(1.5+extent),game.tileset[1]*0.3,37))
                                        }else{
                                            entities.walls[1].splice(0,0,new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*0.3,37))
                                        }
                                        for(let c=0,lc=1+extent;c<lc;c++){
                                            if(level[a+1][b+c]=='|'){
                                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+c)*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                                            }
                                        }
                                    break
                                    case 64: case 70: case 84:
                                        if(level[a][b-1]=='>'){
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+0.1)*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*0.2,37))
                                        }else if(level[a][b-1]=='['){
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.25)*game.tileset[0],(a+0.1)*game.tileset[1],game.tileset[0]*(1.5+extent),game.tileset[1]*0.2,37))
                                        }else{
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],(a+0.1)*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*0.2,37))
                                        }
                                    break
                                    case 67: case 68: case 76: case 77: case 78: case 86:
                                        if(level[a][b-1]=='>'){
                                            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*0.4,37))
                                        }else if(level[a][b-1]=='['){
                                            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.25)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(1.5+extent),game.tileset[1]*0.4,37))
                                        }else{
                                            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*0.4,37))
                                        }
                                        for(let c=0,lc=1+extent;c<lc;c++){
                                            if(level[a+1][b+c]=='|'){
                                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+c)*game.tileset[0],(a+0.7)*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*0.6,7))
                                            }
                                        }
                                    break
                                    case 89: case 90:
                                        if(level[a][b-1]=='>'){
                                            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+0.125)*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*0.25,37))
                                        }else if(level[a][b-1]=='['){
                                            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.25)*game.tileset[0],(a+0.125)*game.tileset[1],game.tileset[0]*(1.5+extent),game.tileset[1]*0.25,37))
                                        }else{
                                            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],(a+0.125)*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*0.25,37))
                                        }
                                        for(let c=0,lc=1+extent;c<lc;c++){
                                            if(level[a+1][b+c]=='|'){
                                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+c)*game.tileset[0],(a+0.625)*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*0.8,7))
                                            }
                                        }
                                    break
                                    default:
                                        if(level[a][b-1]=='>'&&game.level==22){
                                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*0.4,37))
                                        }else if(level[a][b-1]=='>'){
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*0.4,37))
                                        }else if(level[a][b-1]=='['){
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.25)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(1.5+extent),game.tileset[1]*0.4,37))
                                        }else{
                                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*0.4,37))
                                        }
                                    break
                                }
                            }
                            switch(game.level){
                                case 32: case 33:
                                    if(level[a+1][b]==':'){
                                        clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*0.6,38))
                                    }else if(level[a+1][b]==';'){
                                        clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*0.6,56))
                                    }else if(level[a+1][b]=='|'){
                                        clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*0.6,7))
                                    }
                                break
                            }
                        break
                    }
                break
                case '~':
                    switch(game.level){
                        case 16:
                            for(let a=0,la=game.players;a<la;a++){
                                entities.walls[1].push(new wall(graphics.main,random(100,game.edge[0]-100),random(-2000,0),game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                                cluster=game.classWeapon?3:game.peakWeapon?1:game.level==27&&game.pvp?0:floor(random(1.5))
                                entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                            }
                        break
                        case 15: case 18: case 20: case 21: case 25: case 26: case 30: case 32: case 33: case 34:
                        case 38: case 40: case 41: case 42: case 45: case 47: case 50: case 60: case 69: case 74:
                        case 75:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                            cluster=game.classWeapon?3:game.peakWeapon?1:game.level==38||dm()?0:game.level==27&&game.pvp?0:floor(random(1.5))
                            entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                        break
                        case 28:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                            if(a<20||a>la-5){
                                entities.walls[1][entities.walls[1].length-1].weapon=findName('PlayerUpdraft',types.player)
                            }else if(a>la-10){
                                entities.walls[1][entities.walls[1].length-1].weapon=findName('PlayerGust',types.player)
                            }else{
                                cluster=game.classWeapon?3:game.peakWeapon?1:game.level==27&&game.pvp?0:floor(random(1.5))
                                entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                            }
                        break
                        case 52: case 58: case 63: case 66:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,27))
                        break
                        case 56:
                            clumper[1].push(new wall(graphics.main,b*game.tileset[0],a*game.tileset[1],0,0,3))
                        break
                        case 59: case 60:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                            cluster=game.classWeapon?3:game.peakWeapon?1:game.level==38||dm()?0:game.level==27&&game.pvp?0:floor(random(1.5))
                            entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                        break
                        case 64: case 68: case 70: case 84:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,61))
                        break
                        case 67: case 77: case 78:
                            if(game.classWeapon){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,9))
                            }else{
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,61))
                            }
                        break
                        case 71:
                            entities.walls[1].push(new wall(graphics.main,game.edge[0]*0.5,(a+1.2)*game.tileset[1],game.tileset[0]*33,game.tileset[1]*2,3))
                        break
                        case 72: case 81:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,69))
                        break
                        case 79: case 82: case 83: case 85:
                            game.placer[1].push([game.tileset[0]*(b+1),game.tileset[1]*(a+0.5)])
                        break
                        default:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],15))
                        break
                    }
                break
                case '/':
                    switch(game.level){
                        case 28:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,68))
                        break
                        case 38:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.25+b*game.tileset[0],game.tileset[1]*0.75+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.5,18))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.75+b*game.tileset[0],game.tileset[1]*0.75+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.5,17))
                        break
                        case 40: case 52:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.75+b*game.tileset[0],game.tileset[1]*0.25+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.5,44))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.75+b*game.tileset[0],game.tileset[1]*0.75+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.5,43))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.25+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1],43))
                        break
                        case 42:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a-0.25)*game.tileset[1],game.tileset[0],game.tileset[1]*0.5,1))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+(b-0.25)*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.5,21))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+(b+0.25)*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.5,20))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+(b-0.25)*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.5,44))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+(b+0.25)*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.5,45))
                        break
                        case 49: case 82: case 83: case 85:
                            clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a-0.2)*game.tileset[1],game.tileset[0]*0.1,game.tileset[1]*0.6,62))
                        break
                        case 54:
                            entities.walls[2].splice(0,0,new wall(graphics.main,(b*0.5+0.9)*game.tileset[0],(a*0.5+la*0.5-5)*game.tileset[1],(b+1.8)*game.tileset[0],(la-a+10)*game.tileset[1],62))
                        break
                        case 55: case 92:
                            if(b<5){
                                entities.walls[2].push(new wall(graphics.main,(b+3.75)*game.tileset[0],(a*0.5+la*0.5)*game.tileset[1],9.5*game.tileset[0],(la-a)*game.tileset[1],62))
                            }else{
                                entities.walls[2].push(new wall(graphics.main,(b*0.5+lb*0.5+0.25-1)*game.tileset[0],(a*0.5+la*0.5-6)*game.tileset[1],(lb-b-0.5+2)*game.tileset[0],(la-a)*game.tileset[1],62))
                            }
                        break
                        case 58: case 66:
                            entities.walls[0].push(new wall(graphics.main,(b+0.5)*game.tileset[0],(a+2.44)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,37))
                            entities.walls[0].push(new wall(graphics.main,(b-0.5)*game.tileset[0],(a+2.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.08,59))
                            entities.walls[0].push(new wall(graphics.main,(b+1.5)*game.tileset[0],(a+2.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.08,60))
                            entities.walls[0].push(new wall(graphics.main,(b-1.5)*game.tileset[0],(a+2.08)*game.tileset[1],game.tileset[0],game.tileset[1]*0.16,59))
                            entities.walls[0].push(new wall(graphics.main,(b+2.5)*game.tileset[0],(a+2.08)*game.tileset[1],game.tileset[0],game.tileset[1]*0.16,60))
                            entities.walls[0].push(new wall(graphics.main,(b-2.5)*game.tileset[0],(a+1.88)*game.tileset[1],game.tileset[0],game.tileset[1]*0.24,59))
                            entities.walls[0].push(new wall(graphics.main,(b+3.5)*game.tileset[0],(a+1.88)*game.tileset[1],game.tileset[0],game.tileset[1]*0.24,60))
                            entities.walls[0].push(new wall(graphics.main,(b-3.5)*game.tileset[0],(a+1.6)*game.tileset[1],game.tileset[0],game.tileset[1]*0.32,59))
                            entities.walls[0].push(new wall(graphics.main,(b+4.5)*game.tileset[0],(a+1.6)*game.tileset[1],game.tileset[0],game.tileset[1]*0.32,60))
                            entities.walls[0].push(new wall(graphics.main,(b-4.5)*game.tileset[0],(a+1.24)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,59))
                            entities.walls[0].push(new wall(graphics.main,(b+5.5)*game.tileset[0],(a+1.24)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,60))
                            entities.walls[0].push(new wall(graphics.main,(b-5.5)*game.tileset[0],(a+0.8)*game.tileset[1],game.tileset[0],game.tileset[1]*0.48,59))
                            entities.walls[0].push(new wall(graphics.main,(b+6.5)*game.tileset[0],(a+0.8)*game.tileset[1],game.tileset[0],game.tileset[1]*0.48,60))
                            entities.walls[0].push(new wall(graphics.main,(b-6.5)*game.tileset[0],(a+0.28)*game.tileset[1],game.tileset[0],game.tileset[1]*0.56,59))
                            entities.walls[0].push(new wall(graphics.main,(b+7.5)*game.tileset[0],(a+0.28)*game.tileset[1],game.tileset[0],game.tileset[1]*0.56,60))
                        break
                        case 59: case 60: case 79:
                            if(level[a][b-1]=='.'){
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.125+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1],43))
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1],44))
                            }else{
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.875+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1],43))
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1],45))
                            }
                        break
                        case 61:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]*-3.5+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],49))
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]*4.5+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],49))
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0]*5,game.tileset[1],49))
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]*-4.5+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],54))
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]*5.5+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],53))
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]*-2.5+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],35))
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]*3.5+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],35))
                        break
                        case 63:
                            entities.walls[0].push(new wall(graphics.main,(b+0.5)*game.tileset[0],(a+2.44)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,37))
                            entities.walls[0].push(new wall(graphics.main,(b-0.5)*game.tileset[0],(a+2.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.08,59))
                            entities.walls[0].push(new wall(graphics.main,(b+1.5)*game.tileset[0],(a+2.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.08,60))
                            entities.walls[0].push(new wall(graphics.main,(b-1.5)*game.tileset[0],(a+2.08)*game.tileset[1],game.tileset[0],game.tileset[1]*0.16,59))
                            entities.walls[0].push(new wall(graphics.main,(b+2.5)*game.tileset[0],(a+2.08)*game.tileset[1],game.tileset[0],game.tileset[1]*0.16,60))
                            entities.walls[0].push(new wall(graphics.main,(b-2.5)*game.tileset[0],(a+1.88)*game.tileset[1],game.tileset[0],game.tileset[1]*0.24,59))
                            entities.walls[0].push(new wall(graphics.main,(b+3.5)*game.tileset[0],(a+1.88)*game.tileset[1],game.tileset[0],game.tileset[1]*0.24,60))
                            entities.walls[0].push(new wall(graphics.main,(b-3.5)*game.tileset[0],(a+1.6)*game.tileset[1],game.tileset[0],game.tileset[1]*0.32,59))
                            entities.walls[0].push(new wall(graphics.main,(b+4.5)*game.tileset[0],(a+1.6)*game.tileset[1],game.tileset[0],game.tileset[1]*0.32,60))
                            entities.walls[0].push(new wall(graphics.main,(b-4.5)*game.tileset[0],(a+1.24)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,59))
                            entities.walls[0].push(new wall(graphics.main,(b+5.5)*game.tileset[0],(a+1.24)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,60))
                            entities.walls[0].push(new wall(graphics.main,(b-5.5)*game.tileset[0],(a+0.8)*game.tileset[1],game.tileset[0],game.tileset[1]*0.48,59))
                            entities.walls[0].push(new wall(graphics.main,(b+6.5)*game.tileset[0],(a+0.8)*game.tileset[1],game.tileset[0],game.tileset[1]*0.48,60))
                            entities.walls[0].push(new wall(graphics.main,(b-6.5)*game.tileset[0],(a+0.28)*game.tileset[1],game.tileset[0],game.tileset[1]*0.56,59))
                            entities.walls[0].push(new wall(graphics.main,(b+7.5)*game.tileset[0],(a+0.28)*game.tileset[1],game.tileset[0],game.tileset[1]*0.56,60))
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*2+a*game.tileset[1],game.tileset[1]*8,game.tileset[1]*4,33))
                        break
                        case 65:
                            if(b>lb/2-5&&b<lb/2+5){
                                entities.walls[2].push(new wall(graphics.main,(b+0.5)*game.tileset[0],(a*0.5+la*0.5-6)*game.tileset[1],22*game.tileset[0],(la-a)*game.tileset[1],62))
                            }else if(b<lb/2){
                                entities.walls[2].push(new wall(graphics.main,(b*0.5+1.25)*game.tileset[0],(a*0.5+la*0.5-6)*game.tileset[1],(b+0.5+2)*game.tileset[0],(la-a)*game.tileset[1],62))
                            }else{
                                entities.walls[2].push(new wall(graphics.main,(b*0.5+lb*0.5+0.25-1)*game.tileset[0],(a*0.5+la*0.5-6)*game.tileset[1],(lb-b-0.5+2)*game.tileset[0],(la-a)*game.tileset[1],62))
                            }
                        break
                        case 67: case 68: case 77: case 78:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.8+a*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,43))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*-0.25+b*game.tileset[0],game.tileset[1]*0.8+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.4,45))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*1.25+b*game.tileset[0],game.tileset[1]*0.8+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.4,44))
                        break
                        case 69:
                            entities.walls[2].splice(0,0,new wall(graphics.main,(b*0.5+lb*0.5)*game.tileset[0],game.edge[1]*0.5+game.tileset[1]*2,(lb-b)*game.tileset[0],game.edge[1],62))
                        break
                        case 71:
                            let size=225
                            for(let c=0,lc=15;c<lc;c++){
                                entities.walls[0].push(new wall(graphics.main,
                                    (b+0.5)*game.tileset[0]-size*lcos(c/lc*90)*0.5-size*lcos((c+1)/lc*90)*0.5,
                                    (a+2)*game.tileset[1]-size*lsin(c/lc*90)*0.5-size*lsin((c+1)/lc*90)*0.5,
                                    abs(lcos(c/lc*90)-lcos((c+1)/lc*90))*size,
                                    abs(lsin(c/lc*90)-lsin((c+1)/lc*90))*size,
                                    45
                                ))
                                entities.walls[0].push(new wall(graphics.main,
                                    (b+0.5)*game.tileset[0]+size*lcos(c/lc*90)*0.5+size*lcos((c+1)/lc*90)*0.5,
                                    (a+2)*game.tileset[1]-size*lsin(c/lc*90)*0.5-size*lsin((c+1)/lc*90)*0.5,
                                    abs(lcos(c/lc*90)-lcos((c+1)/lc*90))*size,
                                    abs(lsin(c/lc*90)-lsin((c+1)/lc*90))*size,
                                    44
                                ))
                                entities.walls[0].push(new wall(graphics.main,
                                    (b+0.5)*game.tileset[0],
                                    (a+2)*game.tileset[1]-size*lsin(c/lc*90)*0.5-size*lsin((c+1)/lc*90)*0.5,
                                    abs(lcos((c+1)/lc*90))*size*2-0.5,
                                    abs(lsin(c/lc*90)-lsin((c+1)/lc*90))*size-0.5,
                                    43
                                ))
                            }
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*2+a*game.tileset[1],size*2,size*2,67))
                        break
                        case 74:
                            entities.walls[0].push(new wall(graphics.main,(b+4.5)*game.tileset[0],(a+4)*game.tileset[1],game.tileset[0]*9,game.tileset[1]*8,59))
                        break
                        case 87:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0]*3,game.tileset[1]*0.6,43))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*2.5+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0],game.tileset[1]*0.6,44))
                            entities.walls[0].push(new wall(graphics.main,-game.tileset[0]*1.5+b*game.tileset[0],game.tileset[1]*0.7+a*game.tileset[1],game.tileset[0],game.tileset[1]*0.6,45))
                        break
                        case 88: case 91:
                            if(b>lb/2){
                                entities.walls[0].push(new wall(graphics.main,(b+4)*game.tileset[0],(a+1)*game.tileset[1],game.tileset[0]*8,game.tileset[1]*2,59))
                            }else{
                                entities.walls[0].push(new wall(graphics.main,(b-3)*game.tileset[0],(a+1)*game.tileset[1],game.tileset[0]*8,game.tileset[1]*2,60))
                            }
                        break
                        case 89: case 90:
                            entities.walls[1].push(new wall(graphics.main,(b-4)*game.tileset[0],(a+2)*game.tileset[1],game.tileset[0]*10,game.tileset[1]*4,60))
                        break
                        default:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a-0.5)*game.tileset[1],game.tileset[0],game.tileset[1]*2,18))
                        break
                    }
                break
                case '?':
                    switch(game.level){
                        case 13: case 14: case 48: case 57: case 80:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                        break
                        case 29: case 37: case 46: case 53: case 79:
                            game.placer[1].push([game.tileset[0]*(b+0.5),game.tileset[1]*(a+0.5)])
                        break
                        case 55: case 92:
                            let type=[8,9,9,12,16,16,27,27,50,61,66,68,69,70,70,71][floor(random(0,16))]
                            if(type==16){
                                cluster=game.classWeapon?3:game.peakWeapon?1:game.level==27&&game.pvp?1:floor(random(1.5))
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,type))
                                entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                            }else{
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,type))
                            }
                        break
                        case 82: case 83: case 85:
                            if(level[a+1][b]=='_'){
                                game.placer[1].push([game.tileset[0]*(b+0.5),game.tileset[1]*(a+0.9)])
                            }else{
                                game.placer[1].push([game.tileset[0]*(b+0.5),game.tileset[1]*(a+0.5)])
                            }
                        break
                        case 91:
                            entities.walls[1].push(new wall(graphics.main,game.edge[0]*0.3,(a+0.4)*game.tileset[1],game.edge[0]*0.4,game.edge[1]-(a+1.3)*game.tileset[1],3))
                        
                        default:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],23))
                        break
                    }
                break
                case 'a':
                    switch(game.level){
                        case 23: case 29: case 30: case 32: case 33: case 34: case 35: case 39: case 40: case 41:
                        case 43: case 44: case 47: case 49: case 50: case 51: case 52: case 53: case 54: case 55:
                        case 56: case 59: case 60: case 61: case 79: case 92:
                            if(b>0&&(level[a][b-1]=='.'||level[a][b-1]=='a'&&level[a][b-2]=='.'||level[a][b-1]=='a'&&level[a][b-2]=='a'&&level[a][b-3]=='.')){
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.56+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                            }else if(level[a+1][b]=='a'){
                                entities.walls[0].push(new wall(graphics.main,-game.tileset[0]*0.06+b*game.tileset[0],game.tileset[1]*0.56+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                            }else{
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.44+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                            }
                        break
                        case 28:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,57))
                        break
                        case 62: case 64: case 70: case 71: case 72: case 74: case 81: case 84:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                        break
                        case 65: case 69: case 82: case 83: case 85: case 87: case 88: case 91:
                            if(level[a+1][b]=='a'){
                                entities.walls[0].push(new wall(graphics.main,b*game.tileset[0],game.tileset[1]*0.56+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                            }else{
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                            }
                        break
                        case 67: case 68: case 77: case 78:
                            if(level[a][b-1]=='.'){
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.56+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                            }else if(level[a][b+1]=='.'){
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.44+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                            }else if(level[a+1][b]=='a'){
                                entities.walls[0].push(new wall(graphics.main,b*game.tileset[0],game.tileset[1]*0.56+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                            }else{
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                            }
                        break
                        case 75:
                            if(level[a+1][b]=='a'){
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.06+b*game.tileset[0],game.tileset[1]*0.56+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                            }else{
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.56+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                            }
                        break
                        case 63:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,69))
                        break
                        //DO NOT ADD A DEFAULT
                    }
                break
                case 'b':
                    switch(game.level){
                        case 8: case 17:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],18))
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                        break
                        case 22: case 35:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0],game.tileset[1]*0.5,11))
                        break
                        case 23:
                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                        break
                        case 25: case 26:
                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.125,game.tileset[1],7))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0],game.tileset[1]*0.5,11))
                        break
                        case 49:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*4.5,game.tileset[1],43))
                            entities.walls[0].push(new wall(graphics.main,(b-2)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1],45))
                            entities.walls[0].push(new wall(graphics.main,(b+3)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1],44))
                        break
                        case 54:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,65))
                        break
                        case 67: case 68: case 75: case 77: case 78: case 86: case 87:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,70))
                        break
                        default:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,25))
                        break
                    }
                break
                case 'c':
                    switch(game.level){
                        case 19: case 30: case 31: case 56:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,35))
                        break
                        case 21:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a-0.5)*game.tileset[1],game.tileset[0],game.tileset[1]*2,17))
                        break
                        case 22: case 23: case 25: case 26: case 28: case 32: case 33: case 35: case 40: case 42:
                        case 49: case 52: case 54: case 55: case 65: case 67: case 77: case 78: case 82: case 83:
                        case 85: case 88: case 91: case 92:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],35))
                        break
                        case 29:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],35))
                            entities.walls[1].push(new wall(graphics.main,-game.tileset[0]/2+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],47))
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]*3/2+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],46))
                        break
                        case 47: case 72: case 75: case 81:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.4+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,69))
                        break
                        default:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,26))
                        break
                    }
                break
                case 'd':
                    switch(game.level){
                        case 16:
                            for(let a=0,la=game.players;a<la;a++){
                                entities.walls[1].push(new wall(graphics.main,random(100,game.edge[0]-100),random(-2000,0),game.tileset[1]*0.6,game.tileset[1]*0.6,27))
                            }
                        break
                        case 19: case 22: case 23: case 31: case 35:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a-0.5)*game.tileset[1],game.tileset[0],game.tileset[1]*2,17))
                        break
                        case 25: case 26: case 28: case 30: case 49: case 54: case 56:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.4+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,50))
                        break
                        case 29: case 91:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,57))
                        break
                        case 40: case 41: case 51: case 52:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,61))
                        break
                        case 58: case 59: case 63: case 66: case 79:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,70))
                        break
                        case 60:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,70))
                        break
                        case 67: case 77: case 78:
                            if(!game.classWeapon){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,50))
                            }
                        break
                        case 68:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,50))
                        break
                        case 88:
                            if(game.classWeapon){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,27))
                            }else{
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,57))
                            }
                        break
                        default:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,27))
                        break
                    }
                break
                case 'f':
                    switch(game.level){
                        case 15:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,30))
                        break
                        case 23: case 25: case 26: case 30: case 32: case 33: case 34: case 35: case 38: case 39:
                        case 40: case 41: case 42: case 43: case 47: case 49: case 50: case 51: case 52: case 54:
                        case 55: case 56: case 58: case 59: case 60: case 61: case 63: case 64: case 66: case 69:
                        case 70: case 74: case 75: case 79: case 84: case 86: case 87: case 92:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,57))
                        break
                        case 28:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],40))
                        break
                        case 65:
                            if(!game.classWeapon){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,57))
                            }
                        break
                        case 67: case 77: case 78:
                            if(a>la-10){
                                if(game.classWeapon){
                                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,27))
                                }else{
                                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,57))
                                }
                            }else{
                                if(game.classWeapon){
                                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,27))
                                }else{
                                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,57))
                                }
                            }
                        break
                        case 68:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,57))
                        break
                        case 76: case 86: case 88: case 91:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,77))
                        break
                        default:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],29))
                        break
                    }
                break
                case 'g':
                    switch(game.level){
                        case 23: case 35:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],40))
                        break
                        case 32: case 33:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],23))
                        break
                        case 40: case 52:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.85+b*game.tileset[0],game.tileset[1]*0.15+a*game.tileset[1],game.tileset[0]*0.3,game.tileset[1]*0.3,44))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.15+b*game.tileset[0],game.tileset[1]*0.15+a*game.tileset[1],game.tileset[0]*0.3,game.tileset[1]*0.3,45))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.85+b*game.tileset[0],game.tileset[1]*0.85+a*game.tileset[1],game.tileset[0]*0.3,game.tileset[1]*0.3,46))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.15+b*game.tileset[0],game.tileset[1]*0.85+a*game.tileset[1],game.tileset[0]*0.3,game.tileset[1]*0.3,47))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0]*0.4,game.tileset[1],43))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.15+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0]*0.3,game.tileset[1]*0.4,43))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.85+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0]*0.3,game.tileset[1]*0.4,43))
                        break
                        case 49: case 54:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,61))
                        break
                        case 55: case 65: case 92:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,65))
                        break
                        case 58: case 63: case 66:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,72))
                        break
                        case 59: case 67: case 68: case 69: case 77: case 78: case 79:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,68))
                        break
                        case 60: case 61: case 64: case 70: case 84:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,68))
                        break
                        case 76:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,75))
                        break
                        case 86:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,77))
                        break
                        case 87:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*2+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0]*4,game.tileset[1],43))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*2+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0]*4,game.tileset[1],46))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*2+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0]*4,game.tileset[1],18))
                        break
                        case 88:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.1+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,75))
                            if(b>lb/2){
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.8+a*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,17))
                            }else{
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.8+a*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,18))
                            }
                        break
                        case 89: case 90:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]*0.25+b*game.tileset[0],game.tileset[1]*0.25+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.5,44))
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]*0.25+b*game.tileset[0],game.tileset[1]*0.75+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.5,46))
                        break
                        case 91:
                            if(b>lb/2){
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.8+a*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,17))
                            }else{
                                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.8+a*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,18))
                            }
                        break
                        default:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                        break
                    }
                break
                case 'V':
                    switch(game.level){
                        case 89:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*1.8+a*game.tileset[1],game.tileset[1]*8,game.tileset[1]*4,33))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*1.9+a*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.2,1))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*2+b*game.tileset[0],game.tileset[1]*1.9+a*game.tileset[1],game.tileset[0],game.tileset[1]*0.2,17))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*-1+b*game.tileset[0],game.tileset[1]*1.9+a*game.tileset[1],game.tileset[0],game.tileset[1]*0.2,18))
                        break
                        case 90:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*1.3+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,27))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*1.9+a*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.2,1))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*2+b*game.tileset[0],game.tileset[1]*1.9+a*game.tileset[1],game.tileset[0],game.tileset[1]*0.2,17))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*-1+b*game.tileset[0],game.tileset[1]*1.9+a*game.tileset[1],game.tileset[0],game.tileset[1]*0.2,18))
                        break
                        default:
                            if(game.level==27&&!game.pvp&&b>100){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*2+a*game.tileset[1],game.tileset[1]*8,game.tileset[1]*4,33))
                            }else{
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*2+a*game.tileset[1],game.tileset[1]*8,game.tileset[1]*4,31))
                            }
                        break
                    }
                break
                case 'Q':
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],32))
                break
                case 'N':
                    switch(game.level){
                        case 29: case 43:
                            game.placer[0].push([game.tileset[0]*(b+0.5),game.tileset[1]*(a+2)])
                        break
                        default:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*2+a*game.tileset[1],game.tileset[1]*8,game.tileset[1]*4,33))
                        break
                    }
                break
                case 'M':
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*2+a*game.tileset[1],game.tileset[1]*8,game.tileset[1]*4,36))
                break
                case 'R':
                    if(!(game.level==54&&!game.pvp)){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*2+a*game.tileset[1],game.tileset[1]*8,game.tileset[1]*4,42))
                    }
                break
                case 'X':
                    print(game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1])
                break
                case ':':
                    switch(game.level){
                        case 25: case 26: case 30: case 32: case 34: case 50: case 55: case 56: case 59: case 60:
                        case 62: case 65: case 72: case 74: case 75: case 79: case 81: case 92:
                            if(a<la-1&&(level[a+1][b]=='<'||level[a+1][b]=='>')){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*2,38))
                            }else{
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1],38))
                            }
                        break
                        case 29:
                            clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.3,game.tileset[1],38))
                        break
                        case 33: case 63:
                            if(a<la-1&&(level[a+1][b]=='<'||level[a+1][b]=='>')){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*2,38))
                            }else{
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1],38))
                            }
                        break
                        case 37:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.32,game.tileset[1],38))
                        break
                        case 38:
                            clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.32,game.tileset[1],38))
                        break
                        case 49:
                            if(game.pvp){
                                if(a<la-1&&(level[a+1][b]=='<'||level[a+1][b]=='>')){
                                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[0]*0.45,game.tileset[1]*2,38))
                                }else if(a>0&&(level[a-1][b]==']'||level[a-1][b]=='[')){
                                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],a*game.tileset[1],game.tileset[0]*0.45,game.tileset[1]*2,38))
                                }else{
                                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.45,game.tileset[1],38))
                                }
                            }else{
                                if(a<la-1&&(level[a+1][b]=='<'||level[a+1][b]=='>')){
                                    clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[0]*0.45,game.tileset[1]*2,38))
                                }else if(a>0&&(level[a-1][b]==']'||level[a-1][b]=='[')){
                                    clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],a*game.tileset[1],game.tileset[0]*0.45,game.tileset[1]*2,38))
                                }else{
                                    clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.45,game.tileset[1],38))
                                }
                            }
                        break
                        case 67: case 68: case 77: case 78: case 87:
                            if(a<la-1&&(level[a+1][b]=='<'||level[a+1][b]=='>')){
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*2,38))
                            }else{
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1],38))
                            }
                        break
                        case 82: case 83: case 85:
                            clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.2,game.tileset[1],38))
                        break
                        default:
                            if(game.level==22||a>10&&a<la-10&&(game.level==23||game.level==35)||game.level==37||game.level==43||game.level==47){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1],38))
                            }else{
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1],38))
                            }
                        breakx
                    }
                break
                case 'z':
                    switch(game.level){
                        case 22: case 23: case 35:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],17))
                        break
                        case 54:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0],game.tileset[1],44))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0],game.tileset[1],21))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*1.5+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0],game.tileset[1],45))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*1.5+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0],game.tileset[1],20))
                        break
                        case 59: case 79:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,61))
                        break
                        case 60:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,61))
                        break
                        case 61:
                            entities.walls[2].push(new wall(graphics.main,(b+0.5)*game.tileset[0],(a+0.65)*game.tileset[1],8.2*game.tileset[0],1.3*game.tileset[1],62))
                        break
                        case 92:
                            entities.walls[1].push(new wall(graphics.main,game.edge[0]*0.2,(a-0.5)*game.tileset[1]*0.5+game.edge[1]*0.5,game.edge[0]*0.4,game.edge[1]-(a-1)*game.tileset[1],3))
                        break
                    }
                break
                case 'x':
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],18))
                break
                case 'v':
                    switch(game.level){
                        case 61:
                            entities.walls[2].push(new wall(graphics.main,b*game.tileset[0],(a+0.5)*game.tileset[1],3.6*game.tileset[0],3*game.tileset[1],62))
                        break
                        case 78:
                            entities.walls[2].push(new wall(graphics.main,(b+0.5)*game.tileset[0],(a+0.75)*game.tileset[1],3*game.tileset[0],0.5*game.tileset[1],43))
                            entities.walls[2].push(new wall(graphics.main,(b-1.25)*game.tileset[0],(a+0.75)*game.tileset[1],0.5*game.tileset[0],0.5*game.tileset[1],45))
                            entities.walls[2].push(new wall(graphics.main,(b+2.25)*game.tileset[0],(a+0.75)*game.tileset[1],0.5*game.tileset[0],0.5*game.tileset[1],44))
                        break
                        default:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],20))
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,37))
                        break
                    }
                break
                case ';':
                    switch(game.level){
                        case 22: case 23:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],5+a*game.tileset[1],game.tileset[0]*0.5,10,38))
                        break
                        case 30: case 56:
                            if(a<la-1&&(level[a+1][b]=='<'||level[a+1][b]=='>')){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*2,56))
                            }else{
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1],56))
                            }
                        break
                        case 37:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.4,game.tileset[1],64))
                        break
                        case 40:
                            if(level[a-1][b]=='_'){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],5+(a-0.5)*game.tileset[1],game.tileset[0]*0.5,10,38))
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*1.7,7))
                            }else if(level[a+1][b]=='/'){
                                entities.walls[1].splice(0,0,new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],5+a*game.tileset[1],game.tileset[0]*0.5,10,38))
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.75+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*1.5,7))
                            }else{
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],5+a*game.tileset[1],game.tileset[0]*0.5,10,38))
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                            }
                        break
                        case 42:
                            if(b<lb/2){
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0],game.tileset[1],47))
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0],game.tileset[1],17))
                            }else{
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0],game.tileset[1],46))
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0],game.tileset[1],18))
                            }
                        break
                        case 49:
                            if(!game.pvp){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],5+a*game.tileset[1],game.tileset[0]*0.5,10,38))
                            }
                        break
                        case 54:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.75+a*game.tileset[1],game.tileset[0]*3,game.tileset[1]*0.5,43))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*2.5+b*game.tileset[0],game.tileset[1]*0.75+a*game.tileset[1],game.tileset[0],game.tileset[1]*0.5,44))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*-1.5+b*game.tileset[0],game.tileset[1]*0.75+a*game.tileset[1],game.tileset[0],game.tileset[1]*0.5,45))
                        break
                        case 55: case 92:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.6+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0]*1.2,game.tileset[1],46))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*2.4+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0]*1.2,game.tileset[1],45))
                        break
                        case 58: case 63: case 66:
                            entities.walls[0].push(new wall(graphics.main,(b+0.5)*game.tileset[0],(a+1.4)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,37))
                            entities.walls[0].push(new wall(graphics.main,(b-0.5)*game.tileset[0],(a+1.16)*game.tileset[1],game.tileset[0],game.tileset[1]*0.08,59))
                            entities.walls[0].push(new wall(graphics.main,(b+1.5)*game.tileset[0],(a+1.16)*game.tileset[1],game.tileset[0],game.tileset[1]*0.08,60))
                            entities.walls[0].push(new wall(graphics.main,(b-1.5)*game.tileset[0],(a+1.04)*game.tileset[1],game.tileset[0],game.tileset[1]*0.16,59))
                            entities.walls[0].push(new wall(graphics.main,(b+2.5)*game.tileset[0],(a+1.04)*game.tileset[1],game.tileset[0],game.tileset[1]*0.16,60))
                            entities.walls[0].push(new wall(graphics.main,(b-2.5)*game.tileset[0],(a+0.84)*game.tileset[1],game.tileset[0],game.tileset[1]*0.24,59))
                            entities.walls[0].push(new wall(graphics.main,(b+3.5)*game.tileset[0],(a+0.84)*game.tileset[1],game.tileset[0],game.tileset[1]*0.24,60))
                            entities.walls[0].push(new wall(graphics.main,(b-3.5)*game.tileset[0],(a+0.56)*game.tileset[1],game.tileset[0],game.tileset[1]*0.32,59))
                            entities.walls[0].push(new wall(graphics.main,(b+4.5)*game.tileset[0],(a+0.56)*game.tileset[1],game.tileset[0],game.tileset[1]*0.32,60))
                            entities.walls[0].push(new wall(graphics.main,(b-4.5)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,59))
                            entities.walls[0].push(new wall(graphics.main,(b+5.5)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,60))
                        break
                        case 61:
                            entities.walls[2].push(new wall(graphics.main,(b+0.5)*game.tileset[0],(a+1.5)*game.tileset[1],42.6*game.tileset[0],16.6*game.tileset[1],62))
                        break
                        case 65:
                            if(b<lb/2){
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0],game.tileset[1],45))
                                entities.walls[0].push(new wall(graphics.main,-game.tileset[0]*1.5+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0],game.tileset[1],46))
                            }else{
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0],game.tileset[1],44))
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*2.5+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0],game.tileset[1],47))
                            }
                        break
                        case 67: case 68: case 77: case 78:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.2+a*game.tileset[1],game.tileset[0]*3,game.tileset[1]*0.4,37))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*1.75+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1],47))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*-0.75+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1],46))
                        break
                        case 71:
                            entities.walls[2].splice(0,0,new wall(graphics.main,(b+0.5)*game.tileset[0],game.tileset[1]*(a+2.5),game.tileset[0]*40,game.tileset[1]*21,62))
                            entities.walls[2].splice(0,0,new wall(graphics.main,(b+0.5-25)*game.tileset[0],game.tileset[1]*(a+2.5),game.tileset[0]*32,game.tileset[1]*21,62))
                            entities.walls[2].splice(0,0,new wall(graphics.main,(b+0.5+25)*game.tileset[0],game.tileset[1]*(a+2.5),game.tileset[0]*32,game.tileset[1]*21,62))
                        break
                        case 76: case 86:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1],43))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]+b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1],44))
                            entities.walls[0].push(new wall(graphics.main,b*game.tileset[0],game.tileset[1]*0.5+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1],45))
                        break
                        case 79:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.25+b*game.tileset[0],game.tileset[1]*0.25+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.5,46))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.25+b*game.tileset[0],game.tileset[1]*1.75+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.5,44))
                        break
                        case 82: case 83: case 85:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.75+a*game.tileset[1],game.tileset[0]*3,game.tileset[1]*0.5,49))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*-1.2+b*game.tileset[0],game.tileset[1]*0.75+a*game.tileset[1],game.tileset[0]*0.4,game.tileset[1]*0.5,52))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*2.2+b*game.tileset[0],game.tileset[1]*0.75+a*game.tileset[1],game.tileset[0]*0.4,game.tileset[1]*0.5,51))
                        break
                        case 87:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.4+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*1.2,43))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.95+b*game.tileset[0],game.tileset[1]*0.4+a*game.tileset[1],game.tileset[0]*0.4,game.tileset[1]*1.2,44))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.05+b*game.tileset[0],game.tileset[1]*0.4+a*game.tileset[1],game.tileset[0]*0.4,game.tileset[1]*1.2,45))
                        break
                        case 88: case 91:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.5+b*game.tileset[0],game.tileset[1]*0.8+a*game.tileset[1],game.tileset[0]*3,game.tileset[1]*0.4,43))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*-1.2+b*game.tileset[0],game.tileset[1]*0.8+a*game.tileset[1],game.tileset[0]*0.4,game.tileset[1]*0.4,45))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]*2.2+b*game.tileset[0],game.tileset[1]*0.8+a*game.tileset[1],game.tileset[0]*0.4,game.tileset[1]*0.4,44))
                        break
                        case 89: case 90:
                            if(game.pvp){
                                if(b>=lb/2){
                                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1.5)*game.tileset[1],game.tileset[0]*0.2,game.tileset[1]*3,74))
                                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]*5.5+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,75))
                                    entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*5.5+b*game.tileset[0],(a+1.625)*game.tileset[1],game.tileset[0],game.tileset[1]*0.25,37))
                                }else{
                                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1.5)*game.tileset[1],game.tileset[0]*0.2,game.tileset[1]*3,74))
                                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]*-4.5+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,75))
                                    entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*-4.5+b*game.tileset[0],(a+1.625)*game.tileset[1],game.tileset[0],game.tileset[1]*0.25,37))
                                }
                            }else{
                                if(b>=lb/2){
                                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1.5)*game.tileset[1],game.tileset[0]*0.2,game.tileset[1]*3,74))
                                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]*5.5+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,27))
                                    entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*5.5+b*game.tileset[0],(a+1.625)*game.tileset[1],game.tileset[0],game.tileset[1]*0.25,37))
                                }else{
                                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1.5)*game.tileset[1],game.tileset[0]*0.2,game.tileset[1]*3,74))
                                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]*-4.5+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,27))
                                    entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*-4.5+b*game.tileset[0],(a+1.625)*game.tileset[1],game.tileset[0],game.tileset[1]*0.25,37))
                                }
                            }
                        break
                    }
                break
                case 'r':
                    if(game.level==23||game.level==35){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                    }
                break
                case 'm':
                    switch(game.level){
                        case 54:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],43))
                        break
                        case 88: case 91:
                            entities.walls[0].push(new wall(graphics.main,(b+0.5)*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*3,49))
                            entities.walls[0].push(new wall(graphics.main,(b-1)*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],49))
                            entities.walls[0].push(new wall(graphics.main,(b+2)*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],49))
                            entities.walls[0].push(new wall(graphics.main,(b-1)*game.tileset[0],(a-0.5)*game.tileset[1],game.tileset[0],game.tileset[1],52))
                            entities.walls[0].push(new wall(graphics.main,(b+2)*game.tileset[0],(a-0.5)*game.tileset[1],game.tileset[0],game.tileset[1],51))
                            entities.walls[0].push(new wall(graphics.main,(b-1)*game.tileset[0],(a+1.5)*game.tileset[1],game.tileset[0],game.tileset[1],54))
                            entities.walls[0].push(new wall(graphics.main,(b+2)*game.tileset[0],(a+1.5)*game.tileset[1],game.tileset[0],game.tileset[1],53))
                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*3+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*2,55))
                        break
                        default:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],49))
                        break
                    }
                break
                case '>':
                    switch(game.level){
                        case 41:
                            entities.walls[0].push(new wall(graphics.main,(b+2.5)*game.tileset[0],(a+1.5)*game.tileset[1],game.tileset[0]*5,game.tileset[1]*3,59))
                        break
                    }
                break
                case '<':
                    switch(game.level){
                        case 41:
                            entities.walls[0].push(new wall(graphics.main,(b-1.5)*game.tileset[0],(a+1.5)*game.tileset[1],game.tileset[0]*5,game.tileset[1]*3,60))
                        break
                    }
                break
                case 't':
                    switch(game.level){
                        case 82: case 83: case 85:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.3)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,11))
                        break
                    }
                break
                
            }
        }
    }
    for(let a=0,la=clumper.length;a<la;a++){
        while(clumper[a].length>0){
            entities.walls[game.level==61?1:0].splice(0,0,clumper[a][0])
            clumper[a].splice(0,1)
        }
    }
    let ticker=0
    let temp=[]
    let mixed=[]
    let set=[]
    let colorset=[]
    switch(game.level){
        case 13:
            ticker=0
            temp=[]
            for(let a=0,la=listing[0].length;a<la;a++){
                temp.push(listing[0][a])
            }
            mixed=[]
            while(temp.length>0){
                let index=floor(random(0,temp.length))
                mixed.push(temp[index])
                let value=temp[index]
                for(let a=0,la=temp.length;a<la;a++){
                    if(temp[a]==value){
                        temp.splice(a,1)
                        a--
                        la--
                    }
                }
            }
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==16){
                    entities.walls[1][a].weapon=mixed[floor(ticker/2)]
                    ticker++
                }
            }
            for(let a=0,la=game.players;a<la;a++){
                game.weapon.push([])
                game.weaponTick.push(0)
            }
            if(game.mainline){
                game.weapon.push([])
            }
        break
        case 14:
            ticker=0
            temp=[]
            for(let a=0,la=listing[1].length;a<la;a++){
                temp.push(listing[1][a])
            }
            mixed=[]
            while(temp.length>0){
                let index=floor(random(0,temp.length))
                mixed.push(temp[index])
                let value=temp[index]
                for(let a=0,la=temp.length;a<la;a++){
                    if(temp[a]==value){
                        temp.splice(a,1)
                        a--
                        la--
                    }
                }
            }
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==16){
                    entities.walls[1][a].weapon=mixed[ticker]
                    ticker++
                }
            }
        break
        case 22: case 23: case 35:
            set=[
                [112,65.5,[-90,90,-90,game.level!=22?0:-90,-90],[0,1,2,3,4]],

                [112,74.5,[-90,90,90,90],[0,2,3,4]],

                [86.5,55.5,[-90,90,0,90,90],[0,1,2,3,4]],

                [112,54.5,[-90,90,-90,90],[0,1,2,3]],

                [137.5,55.5,[-90,180,0,0,-90],[0,1,2,3,4]],

                [game.level!=22?83:99,35.5,[-90,-90,90,90,-90],[0,1,2,3,4]],

                [53,44.5,[-90,-90,90,90],[1,2,3,4]],

                [171,44.5,[-90,-90,90,-90],[0,1,2,4]],

                [26,56,[90,180,0,90,90],[0,1,2,3,4]],

                [112,21.5,[-90,180,90,180],[0,1,3,4]],

                [game.level!=22?120:137,35.5,[-90,-90,0,90,90],[0,1,2,3,4]],
            ]
            for(let a=0,la=set.length;a<la;a++){
                entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+set[a][0]*game.tileset[0],game.tileset[1]/2+set[a][1]*game.tileset[1],game.tileset[1]*0.8,game.tileset[1]*0.8,39))
                entities.walls[0][entities.walls[0].length-1].dir=set[a][2]
                entities.walls[0][entities.walls[0].length-1].point=set[a][3]
            }
        break
        case 48:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==16){
                    entities.walls[1][a].weapon=listing[3][[0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,...range(10,70)][ticker]]
                    ticker++
                }
            }
            for(let a=0,la=game.players;a<la;a++){
                game.weapon.push([])
                game.weaponTick.push(0)
            }
        break
        case 49:
            set=[
                [169,41,[0,180,0,180],[0,1,2,3]],
                [180.5,51,[0,180,0,-90],[0,1,2,3]],
                [158.5,51,[0,180,0,-90],[0,1,2,3]],
                [192.5,35,[-90,-90,-90],[0,1,3]],
                [160.5,36,[0,180,90,180],[0,1,2,3]],
                [120.5,36,[-90,180,90,180],[0,1,2,3]],
                [88.5,30,[90,90,90],[1,2,3]],
                [56.5,61,[0,180,0,0],[0,1,2,3]],
                [74.5,61,[0,90,0,90],[0,1,2,3]],
                [108.5,66,[-90,90,90,0],[0,1,2,3]],
                [164.5,70,[-90,90,90],[0,2,3]],
                [188.5,66,[0,-90,0,-90],[0,1,2,3]],
                [162.5,61,[0,-90,0,0],[0,1,2,3]],
                [152.5,56,[-90,90,0,-90],[0,1,2,3]],
                [104.5,56,[0,90,0,90],[0,1,2,3]],
                [90.5,51,[0,-90,0,0],[0,1,2,3]],
                [106.5,41,[0,180,90,180],[0,1,2,3]],
                [156.5,26,[-90,180,90,180],[0,1,2,3]],
            ]
            for(let a=0,la=set.length;a<la;a++){
                entities.walls[0].push(new wall(graphics.main,set[a][0]*game.tileset[0],set[a][1]*game.tileset[1],game.tileset[1]*0.8,game.tileset[1]*0.8,39))
                entities.walls[0][entities.walls[0].length-1].dir=set[a][2]
                entities.walls[0][entities.walls[0].length-1].point=set[a][3]
            }
        break
        case 57:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==16){
                    entities.walls[1][a].weapon=ticker==0?findName('PlayerClassWars',types.player):listing[3][[0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,...range(10,70)][ticker-1]]
                    ticker++
                }
            }
            for(let a=0,la=game.players;a<la;a++){
                game.weapon.push([])
                game.weaponTick.push(0)
            }
        break
        case 80:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==16){
                    entities.walls[1][a].weapon=findName('PlayerNightwatchEngineer',types.player)+[1,1,3,3,2,2,0,0][ticker]
                    ticker++
                }
            }
            for(let a=0,la=game.players;a<la;a++){
                game.weapon.push([])
                game.weaponTick.push(0)
            }
        break
    }
    let spawns=[]
    switch(game.level){
        case 6:
            spawns=[]
            for(let a=0,la=level.length;a<la;a++){
                for(let b=0,lb=level[a].length;b<lb;b++){
                    if(a<la-1&&b<lb-6&&floor(random(0,8))==0&&
                        level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&level[a][b+3]==' '&&level[a][b+4]==' '&&level[a][b+5]==' '&&
                        level[a+1][b]=='#'&&level[a+1][b+1]=='#'&&level[a+1][b+2]=='#'&&level[a+1][b+3]=='#'&&level[a+1][b+4]=='#'&&level[a+1][b+5]=='#'
                    ){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+2.5)*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0]*4,game.tileset[1]*0.5,11))
                        b+=6
                    }else if(a<la-1&&b<lb-5&&floor(random(0,7))==0&&
                        level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&level[a][b+3]==' '&&level[a][b+4]==' '&&
                        level[a+1][b]=='#'&&level[a+1][b+1]=='#'&&level[a+1][b+2]=='#'&&level[a+1][b+3]=='#'&&level[a+1][b+4]=='#'
                    ){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+2)*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0]*3,game.tileset[1]*0.5,11))
                        b+=5
                    }else if(a<la-1&&b<lb-4&&floor(random(0,6))==0&&
                        level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&level[a][b+3]==' '&&
                        level[a+1][b]=='#'&&level[a+1][b+1]=='#'&&level[a+1][b+2]=='#'&&level[a+1][b+3]=='#'
                    ){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+1.5)*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.5,11))
                        b+=4
                    }else if(a<la-1&&b<lb-3&&floor(random(0,2))==0&&
                        level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&
                        level[a+1][b]=='#'&&level[a+1][b+1]=='#'&&level[a+1][b+2]=='#'
                    ){
                        spawns.push([game.tileset[0]/2+(b+1)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1]])
                        b+=3
                    }
                }
            }
            for(let a=0,la=min(9,spawns.length);a<la;a++){
                let index=floor(random(0,spawns.length))
                entities.walls[1].push(new wall(graphics.main,spawns[index][0],spawns[index][1],game.tileset[0]*0.4,game.tileset[1]*0.4,[8,9,12][a%3]))
                spawns.splice(index,1)
            }
        break
        case 15: case 18:
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(-75,-100,-25),
                1.0,color(100,75,175)
            )
        break
        case 21:
            for(let a=1,la=level.length;a<la;a++){
                for(let b=0,lb=level[a].length;b<lb;b++){
                    if(a<la-1&&b<lb-6&&floor(random(0,8))==0&&
                        level[a-1][b]==' '&&level[a-1][b+1]==' '&&level[a-1][b+2]==' '&&level[a-1][b+3]==' '&&level[a-1][b+4]==' '&&level[a-1][b+5]==' '&&
                        level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&level[a][b+3]==' '&&level[a][b+4]==' '&&level[a][b+5]==' '&&
                        level[a+1][b]=='g'&&level[a+1][b+1]=='g'&&level[a+1][b+2]=='g'&&level[a+1][b+3]=='g'&&level[a+1][b+4]=='g'&&level[a+1][b+5]=='g'
                    ){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+2.5)*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0]*4,game.tileset[1]*0.5,11))
                        b+=6
                    }else if(a<la-1&&b<lb-5&&floor(random(0,7))==0&&
                        level[a-1][b]==' '&&level[a-1][b+1]==' '&&level[a-1][b+2]==' '&&level[a-1][b+3]==' '&&level[a-1][b+4]==' '&&
                        level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&level[a][b+3]==' '&&level[a][b+4]==' '&&
                        level[a+1][b]=='g'&&level[a+1][b+1]=='g'&&level[a+1][b+2]=='g'&&level[a+1][b+3]=='g'&&level[a+1][b+4]=='g'
                    ){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+2)*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0]*3,game.tileset[1]*0.5,11))
                        b+=5
                    }else if(a<la-1&&b<lb-4&&floor(random(0,6))==0&&
                        level[a-1][b]==' '&&level[a-1][b+1]==' '&&level[a-1][b+2]==' '&&level[a-1][b+3]==' '&&
                        level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&level[a][b+3]==' '&&
                        level[a+1][b]=='g'&&level[a+1][b+1]=='g'&&level[a+1][b+2]=='g'&&level[a+1][b+3]=='g'
                    ){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+1.5)*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.5,11))
                        b+=4
                    }else if(a<la-1&&b<lb-6&&floor(random(0,8))==0&&
                        level[a-1][b]==' '&&level[a-1][b+1]==' '&&level[a-1][b+2]==' '&&level[a-1][b+3]==' '&&level[a-1][b+4]==' '&&level[a-1][b+5]==' '&&level[a-1][b+6]==' '&&
                        level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&level[a][b+3]==' '&&level[a][b+4]==' '&&level[a][b+5]==' '&&level[a][b+6]==' '&&
                        level[a+1][b]=='g'&&level[a+1][b+1]=='g'&&level[a+1][b+2]=='g'&&level[a+1][b+3]=='g'&&level[a+1][b+4]=='g'&&level[a+1][b+5]=='g'&&level[a+1][b+6]=='g'
                    ){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+3)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*3,game.tileset[1],28))
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+1)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],45))
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+5)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],44))
                        b+=6
                    }else if(a<la-1&&b<lb-5&&floor(random(0,7))==0&&
                        level[a-1][b]==' '&&level[a-1][b+1]==' '&&level[a-1][b+2]==' '&&level[a-1][b+3]==' '&&level[a-1][b+4]==' '&&level[a-1][b+5]==' '&&
                        level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&level[a][b+3]==' '&&level[a][b+4]==' '&&level[a][b+5]==' '&&
                        level[a+1][b]=='g'&&level[a+1][b+1]=='g'&&level[a+1][b+2]=='g'&&level[a+1][b+3]=='g'&&level[a+1][b+4]=='g'&&level[a+1][b+5]=='g'
                    ){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+2.5)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*2,game.tileset[1],28))
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+1)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],45))
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+4)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],44))
                        b+=5
                    }else if(a<la-1&&b<lb-4&&floor(random(0,6))==0&&
                        level[a-1][b]==' '&&level[a-1][b+1]==' '&&level[a-1][b+2]==' '&&level[a-1][b+3]==' '&&level[a-1][b+4]==' '&&
                        level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&level[a][b+3]==' '&&level[a][b+4]==' '&&
                        level[a+1][b]=='g'&&level[a+1][b+1]=='g'&&level[a+1][b+2]=='g'&&level[a+1][b+3]=='g'&&level[a+1][b+4]=='g'
                    ){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+2)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+1)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],45))
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+3)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],44))
                        b+=4
                    }
                }
            }
        break
        case 30: case 56:
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(-75,-100,-25),
                1.0,color(50,0,75)
            )
        break
        case 36: case 73:
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(-75,-25,25),
                1.0,color(35,85,115)
            )
        break
        case 37:
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(-75,-25,-40),
                1.0,color(30,60,60)
            )
        break
        case 38:
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(25,50,75),
                1.0,color(125,175,200)
            )
        break
        case 40: case 43:
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(-75,-25,-40),
                1.0,color(30,40,60)
            )
        break
        case 41:
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(-75,-25,25),
                1.0,color(75,150,125)
            )
        break
        case 44:
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(-45,-55,-25),
                1.0,color(86,112,101)
            )
            game.index=0
        break
        case 46:
            for(let a=1,la=level.length;a<la;a++){
                for(let b=0,lb=level[a].length;b<lb;b++){
                    if(a<la-1&&b<lb-6&&floor(random(0,8))==0&&
                        level[a-1][b]==' '&&level[a-1][b+1]==' '&&level[a-1][b+2]==' '&&level[a-1][b+3]==' '&&level[a-1][b+4]==' '&&level[a-1][b+5]==' '&&
                        level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&level[a][b+3]==' '&&level[a][b+4]==' '&&level[a][b+5]==' '&&
                        level[a+1][b]=='#'&&level[a+1][b+1]=='#'&&level[a+1][b+2]=='#'&&level[a+1][b+3]=='#'&&level[a+1][b+4]=='#'&&level[a+1][b+5]=='#'
                    ){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+2.5)*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0]*4,game.tileset[1]*0.5,11))
                        b+=6
                    }else if(a<la-1&&b<lb-5&&floor(random(0,7))==0&&
                        level[a-1][b]==' '&&level[a-1][b+1]==' '&&level[a-1][b+2]==' '&&level[a-1][b+3]==' '&&level[a-1][b+4]==' '&&
                        level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&level[a][b+3]==' '&&level[a][b+4]==' '&&
                        level[a+1][b]=='#'&&level[a+1][b+1]=='#'&&level[a+1][b+2]=='#'&&level[a+1][b+3]=='#'&&level[a+1][b+4]=='#'
                    ){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+2)*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0]*3,game.tileset[1]*0.5,11))
                        b+=5
                    }else if(a<la-1&&b<lb-4&&floor(random(0,6))==0&&
                        level[a-1][b]==' '&&level[a-1][b+1]==' '&&level[a-1][b+2]==' '&&level[a-1][b+3]==' '&&
                        level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&level[a][b+3]==' '&&
                        level[a+1][b]=='#'&&level[a+1][b+1]=='#'&&level[a+1][b+2]=='#'&&level[a+1][b+3]=='#'
                    ){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+1.5)*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0]*2,game.tileset[1]*0.5,11))
                        b+=4
                    }else if(a<la-1&&b<lb-6&&floor(random(0,8))==0&&
                        level[a-1][b]==' '&&level[a-1][b+1]==' '&&level[a-1][b+2]==' '&&level[a-1][b+3]==' '&&level[a-1][b+4]==' '&&level[a-1][b+5]==' '&&level[a-1][b+6]==' '&&
                        level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&level[a][b+3]==' '&&level[a][b+4]==' '&&level[a][b+5]==' '&&level[a][b+6]==' '&&
                        level[a+1][b]=='#'&&level[a+1][b+1]=='#'&&level[a+1][b+2]=='#'&&level[a+1][b+3]=='#'&&level[a+1][b+4]=='#'&&level[a+1][b+5]=='#'&&level[a+1][b+6]=='#'
                    ){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+3)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*3,game.tileset[1],1))
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+1)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],18))
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+5)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],17))
                        b+=6
                    }else if(a<la-1&&b<lb-5&&floor(random(0,7))==0&&
                        level[a-1][b]==' '&&level[a-1][b+1]==' '&&level[a-1][b+2]==' '&&level[a-1][b+3]==' '&&level[a-1][b+4]==' '&&level[a-1][b+5]==' '&&
                        level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&level[a][b+3]==' '&&level[a][b+4]==' '&&level[a][b+5]==' '&&
                        level[a+1][b]=='#'&&level[a+1][b+1]=='#'&&level[a+1][b+2]=='#'&&level[a+1][b+3]=='#'&&level[a+1][b+4]=='#'&&level[a+1][b+5]=='#'
                    ){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+2.5)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*2,game.tileset[1],1))
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+1)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],18))
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+4)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],17))
                        b+=5
                    }else if(a<la-1&&b<lb-4&&floor(random(0,6))==0&&
                        level[a-1][b]==' '&&level[a-1][b+1]==' '&&level[a-1][b+2]==' '&&level[a-1][b+3]==' '&&level[a-1][b+4]==' '&&
                        level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&level[a][b+3]==' '&&level[a][b+4]==' '&&
                        level[a+1][b]=='#'&&level[a+1][b+1]=='#'&&level[a+1][b+2]=='#'&&level[a+1][b+3]=='#'&&level[a+1][b+4]=='#'
                    ){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+2)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],1))
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+1)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],18))
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+3)*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],17))
                        b+=4
                    }
                }
            }
        break
        case 49:
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(59,57,68),
                1.0,color(106,120,129)
            )
        break
        case 51:
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(17,18,20),
                1.0,color(36,37,41)
            )
        break
        case 52:
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(-75,-25,-40),
                1.0,color(30,40,60)
            )
        break
        case 62: case 72: case 81:
            if(graphics.gradient.length==0){
                graphics.gradient=[new p5.LinearGradient(95,graphics.main[0].height)]
                switch(game.level){
                    case 62:
                        graphics.gradient[0].colors(
                            0.0,color(28,39,51),
                            1.0,color(80,99,114)
                        )
                    break
                    case 72: case 81:
                        graphics.gradient[0].colors(
                            0.0,color(50,40,64),
                            1.0,color(100,75,78)
                        )
                    break
                }
                graphics.overlay.push(createGraphics(graphics.main[0].width,graphics.main[0].height))
                setupLayer(graphics.overlay[1])
                graphics.overlay[1].fill(0,0.8)
                graphics.overlay[1].rect(graphics.overlay[1].width/2,graphics.overlay[1].height/2,graphics.overlay[1].width,graphics.overlay[1].height)
                for(let a=0,la=50;a<la;a++){
                    let size=1.05-a/la*0.9
                    graphics.overlay[1].erase(((a+1)/la))
                    graphics.overlay[1].ellipse(graphics.overlay[1].width/2,graphics.overlay[1].height/2,graphics.overlay[1].width*size,graphics.overlay[1].height*size)
                }
                switch(game.level){
                    case 62:
                        graphics.main[0].patternColors([color(78,80,79),color(62,63,65)])
                    break
                    case 72: case 81:
                        graphics.main[0].patternColors([color(132,123,108),color(116,105,91)])
                    break
                }
                graphics.pattern=[
                    (_w,_h,_r)=>{
                        let c=_r.patternColors()
                        _r.fill(c[0])
                        _r.rect(_w/2,_h/2,_w, _h)
                        _r.fill(c[1])
                        let yTick=0
                        let y=game.tileset[1]/6+1.5
                        while(y<=_h){
                            let x=yTick%2?game.tileset[0]/4:0
                            while(x<=_w+10){
                                _r.rect(x,y,game.tileset[0]/2-3,game.tileset[1]/3-3,2)
                                x+=game.tileset[0]/2
                            }
                            y+=game.tileset[1]/3
                            yTick++
                        }
                    },(_w,_h,_r)=>{
                        let c=_r.patternColors()
                        _r.fill(c[0])
                        _r.rect(_w/2,_h/2,_w, _h)
                        _r.fill(c[1])
                        let yTick=0
                        let y=game.tileset[1]/6+1.5
                        while(y<=_h){
                            let x=yTick%2?0:game.tileset[0]/4
                            while(x<=_w+10){
                                _r.rect(x,y,game.tileset[0]/2-3,game.tileset[1]/3-3,2)
                                x+=game.tileset[0]/2
                            }
                            y+=game.tileset[1]/3
                            yTick++
                        }
                    }
                ]
            }
            if(game.level==81){
                game.index=0
            }
        break
        case 64: case 70: case 84:
            graphics.gradient=[new p5.LinearGradient(105,game.edge[1]*1.5)]
            colorset=[]
            for(let a=0,la=20;a<=la;a++){
                let nudge=a%2*0.4+random(0,0.2)+0.2
                colorset.push(
                    a/la,
                    color(102+nudge*68,83+nudge*41,66+nudge*32)
                )
            }
            graphics.gradient[0].colors(...colorset)
            graphics.gradient.push(new p5.LinearGradient(95,graphics.main[0].height))
            graphics.gradient[1].colors(
                0.0,color(208,216,255),
                1.0,color(131,124,132)
            )
        break
        case 65:
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(83,90,132),
                1.0,color(145,143,164)
            )
            game.index=0
        break
        case 66:
            graphics.gradient=[new p5.LinearGradient(75,game.edge[1]*1.5)]
            colorset=[]
            for(let a=0,la=20;a<=la;a++){
                let nudge=a%2*0.4+random(0,0.2)+0.2
                colorset.push(
                    a/la,
                    color(111+nudge*49,117+nudge*53,81+nudge*36)
                )
            }
            graphics.gradient[0].colors(...colorset)
            graphics.gradient.push(new p5.LinearGradient(85,graphics.main[0].height))
            graphics.gradient[1].colors(
                0.0,color(149,187,210),
                1.0,color(65,97,136)
            )
        break
        case 67: case 77:
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(170,203,221),
                1.0,color(128,162,181)
            )
            ticker=0
            for(let a=0,la=entities.walls[0].length;a<la;a++){
                if(entities.walls[0][a].type==3){
                    entities.walls[0][a].position.x+=game.tileset[0]*[-1,0][ticker]
                    entities.walls[0][a].position.y+=game.tileset[1]*0.4
                    entities.walls[0][a].width=[56,56][ticker]*game.tileset[0]
                    entities.walls[0][a].height=[2.6,2.6][ticker]*game.tileset[1]
                    ticker++
                }
            }
            game.point=[0,0]
            game.index=0

            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*41.5,game.tileset[1]*45.5,game.tileset[0]*81,game.tileset[1]*17,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*59.5,game.tileset[1]*35.5,game.tileset[0]*17,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*39.5,game.tileset[1]*35.5,game.tileset[0]*17,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*5.5,game.tileset[1]*35.5,game.tileset[0]*5,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*59,game.tileset[1]*33,game.tileset[0]*8,game.tileset[1]*2,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*58.5,game.tileset[1]*32,game.tileset[0]*7,game.tileset[1]*2,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*58,game.tileset[1]*31,game.tileset[0]*6,game.tileset[1]*2,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*57.5,game.tileset[1]*30,game.tileset[0]*5,game.tileset[1]*2,62))

            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*173.5,game.tileset[1]*45.5,game.tileset[0]*81,game.tileset[1]*17,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*155.5,game.tileset[1]*35.5,game.tileset[0]*17,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*175.5,game.tileset[1]*35.5,game.tileset[0]*17,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*209.5,game.tileset[1]*35.5,game.tileset[0]*5,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*156,game.tileset[1]*33,game.tileset[0]*8,game.tileset[1]*2,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*156.5,game.tileset[1]*32,game.tileset[0]*7,game.tileset[1]*2,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*157,game.tileset[1]*31,game.tileset[0]*6,game.tileset[1]*2,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*157.5,game.tileset[1]*30,game.tileset[0]*5,game.tileset[1]*2,62))

            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*78,game.tileset[1]*36,game.tileset[0]*6,game.tileset[1]*4,1))
            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*137,game.tileset[1]*36,game.tileset[0]*6,game.tileset[1]*4,1))
            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*76.5,game.tileset[1]*49,game.tileset[0]*9,game.tileset[1]*4,1))
            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*138.5,game.tileset[1]*49,game.tileset[0]*9,game.tileset[1]*4,1))
            
            if(game.level==67){
                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*78.5,game.tileset[1]*39,game.tileset[0]*5,game.tileset[1]*4,1))
                entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*136.5,game.tileset[1]*39,game.tileset[0]*5,game.tileset[1]*4,1))
            }

            for(let a=0,la=6;a<la;a++){
                entities.walls[0][a].boundary=[[],[],[],[],[],[],[],[]]
            }
        break
        case 68:
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*69.5,game.tileset[1]*45.5,game.tileset[0]*81,game.tileset[1]*17,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*51.5,game.tileset[1]*35.5,game.tileset[0]*17,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*71.5,game.tileset[1]*35.5,game.tileset[0]*17,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*105.5,game.tileset[1]*35.5,game.tileset[0]*5,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*52,game.tileset[1]*33,game.tileset[0]*8,game.tileset[1]*2,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*52.5,game.tileset[1]*32,game.tileset[0]*7,game.tileset[1]*2,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*53,game.tileset[1]*31,game.tileset[0]*6,game.tileset[1]*2,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*53.5,game.tileset[1]*30,game.tileset[0]*5,game.tileset[1]*2,62))
        break
        case 71:
            graphics.gradient=[new p5.LinearGradient(95,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(154,255,255),
                1.0,color(225,255,255)
            )
        break
        case 74:
            graphics.gradient=[new p5.LinearGradient(95,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(154,192,215),
                1.0,color(106,121,150)
            )
        break
        case 75:
            graphics.gradient=[new p5.LinearGradient(95,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(47,45,58),
                1.0,color(78,84,98)
            )
        break
        case 76: case 86:
            graphics.gradient=[new p5.LinearGradient(85,game.edge[1]*1.5)]
            colorset=[]
            for(let a=0,la=20;a<=la;a++){
                let nudge=a%2*0.4+random(0,0.4)
                colorset.push(
                    a/la,
                    color(192+nudge*41,112+nudge*52,79+nudge*28)
                )
            }
            graphics.gradient[0].colors(...colorset)
            graphics.gradient.push(new p5.LinearGradient(87,graphics.main[0].height))
            graphics.gradient[1].colors(
                0.0,color(148,171,215),
                1.0,color(139,152,184)
            )
            switch(game.level){
                case 76:
                    entities.walls[0].push(new wall(graphics.main,game.edge[0]*0.5,game.edge[1]-game.tileset[1]*8,game.tileset[0],game.tileset[1],67))
                break
                case 86:
                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*142.5,game.edge[1]-game.tileset[1]*8,game.tileset[0],game.tileset[1],67))
                break
            }
            game.index=0
        break
        case 78:
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(170,203,221),
                1.0,color(128,162,181)
            )
            ticker=0
            for(let a=0,la=entities.walls[0].length;a<la;a++){
                if(entities.walls[0][a].type==3){
                    entities.walls[0][a].position.x+=game.tileset[0]*[-1,0][ticker]
                    entities.walls[0][a].position.y+=game.tileset[1]*0.4
                    entities.walls[0][a].width=[44,44][ticker]*game.tileset[0]
                    entities.walls[0][a].height=[2.6,2.6][ticker]*game.tileset[1]
                    ticker++
                }
            }
            game.point=[0,0]
            game.index=0

            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*32.5,game.tileset[1]*45.5,game.tileset[0]*63,game.tileset[1]*17,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*45.5,game.tileset[1]*35.5,game.tileset[0]*13,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*29.5,game.tileset[1]*35.5,game.tileset[0]*13,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*5.5,game.tileset[1]*35.5,game.tileset[0]*5,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*43,game.tileset[1]*33,game.tileset[0]*8,game.tileset[1]*2,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*42.5,game.tileset[1]*32,game.tileset[0]*7,game.tileset[1]*2,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*42,game.tileset[1]*31,game.tileset[0]*6,game.tileset[1]*2,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*41.5,game.tileset[1]*30,game.tileset[0]*5,game.tileset[1]*2,62))

            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*134.5,game.tileset[1]*45.5,game.tileset[0]*63,game.tileset[1]*17,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*121.5,game.tileset[1]*35.5,game.tileset[0]*13,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*137.5,game.tileset[1]*35.5,game.tileset[0]*13,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*161.5,game.tileset[1]*35.5,game.tileset[0]*5,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*124,game.tileset[1]*33,game.tileset[0]*8,game.tileset[1]*2,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*124.5,game.tileset[1]*32,game.tileset[0]*7,game.tileset[1]*2,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*125,game.tileset[1]*31,game.tileset[0]*6,game.tileset[1]*2,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*125.5,game.tileset[1]*30,game.tileset[0]*5,game.tileset[1]*2,62))

            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*61,game.tileset[1]*36,game.tileset[0]*4,game.tileset[1]*4,1))
            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*106,game.tileset[1]*36,game.tileset[0]*4,game.tileset[1]*4,1))
            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*61.5,game.tileset[1]*39,game.tileset[0]*3,game.tileset[1]*4,1))
            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*105.5,game.tileset[1]*39,game.tileset[0]*3,game.tileset[1]*4,1))
            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*59.5,game.tileset[1]*48.5,game.tileset[0]*7,game.tileset[1]*3,1))
            entities.walls[0].splice(0,0,new wall(graphics.main,game.tileset[0]*107.5,game.tileset[1]*48.5,game.tileset[0]*7,game.tileset[1]*3,1))
            
            
            for(let a=0,la=6;a<la;a++){
                entities.walls[0][a].boundary=[[],[],[],[],[],[],[],[]]
            }
        break
        case 87:
            graphics.gradient=[new p5.LinearGradient(91,game.edge[1]*1.5)]
            colorset=[]
            for(let a=0,la=15;a<=la;a++){
                let nudge=a%2*0.6+random(0,0.4)
                colorset.push(
                    a/la,
                    color(...mergeColor([119,89,65],[89,64,44],nudge))
                )
            }
            graphics.gradient[0].colors(...colorset)
            graphics.gradient.push(new p5.LinearGradient(87,graphics.main[0].height))
            graphics.gradient[1].colors(
                0.0,color(255,245,225),
                1.0,color(245,209,164)
            )
            game.index=0
        break
        case 88:
            graphics.gradient=[new p5.LinearGradient(88,game.edge[1]*1.5)]
            colorset=[]
            for(let a=0,la=11;a<=la;a++){
                let nudge=a%2*0.6+random(0,0.1)
                colorset.push(
                    a/la,
                    color(...mergeColor([160,136,119],[78,69,71],nudge))
                )
            }
            graphics.gradient[0].colors(...colorset)
            graphics.gradient.push(new p5.LinearGradient(87,graphics.main[0].height))
            graphics.gradient[1].colors(
                0.0,color(63,98,124),
                1.0,color(139,184,216)
            )
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*70.5,game.tileset[1]*38,game.tileset[0]*25,game.tileset[1]*6,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*38.5,game.tileset[1]*38,game.tileset[0]*15,game.tileset[1]*6,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*102.5,game.tileset[1]*38,game.tileset[0]*15,game.tileset[1]*6,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*52,game.tileset[1]*38.5,game.tileset[0]*14,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*89,game.tileset[1]*38.5,game.tileset[0]*14,game.tileset[1]*5,62))
            game.index=0
        break
        case 89:
            graphics.gradient=[new p5.LinearGradient(84,game.edge[1]*1.5)]
            colorset=[]
            for(let a=0,la=15;a<=la;a++){
                let nudge=a%2*0.6+random(0,0.4)
                colorset.push(
                    a/la,
                    color(...mergeColor([182,115,96],[119,70,63],nudge))
                )
            }
            graphics.gradient[0].colors(...colorset)
            graphics.gradient.push(new p5.LinearGradient(87,graphics.main[0].height))
            graphics.gradient[1].colors(
                0.0,color(126,144,198),
                1.0,color(228,215,194)
            )
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*3.5,game.tileset[1]*44.5,game.tileset[0]*7,game.tileset[1]*4,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*175.5,game.tileset[1]*22.5,game.tileset[0]*7,game.tileset[1]*4,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*75,game.tileset[1]*51.5,game.tileset[0]*8,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*133,game.tileset[1]*53.5,game.tileset[0]*112,game.tileset[1]*15,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*168.5,game.tileset[1]*42.5,game.tileset[0]*45,game.tileset[1]*9,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*178,game.tileset[1]*37,game.tileset[0]*21,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*179,game.tileset[1]*33,game.tileset[0]*15,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*77,game.tileset[1]*48,game.tileset[0]*5,game.tileset[1]*5,62))
            entities.walls[1].splice(0,0,new wall(graphics.main,game.tileset[0]*31.5,game.tileset[1]*49,game.tileset[0],game.tileset[1],67))
            game.index=0
        break
        case 90:
            graphics.gradient=[new p5.LinearGradient(84,game.edge[1]*1.5)]
            colorset=[]
            for(let a=0,la=15;a<=la;a++){
                let nudge=a%2*0.6+random(0,0.4)
                colorset.push(
                    a/la,
                    color(...mergeColor([182,115,96],[119,70,63],nudge))
                )
            }
            graphics.gradient[0].colors(...colorset)
            graphics.gradient.push(new p5.LinearGradient(87,graphics.main[0].height))
            graphics.gradient[1].colors(
                0.0,color(126,144,198),
                1.0,color(228,215,194)
            )
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*81.5,game.tileset[1]*48.5,game.tileset[0]*45,game.tileset[1]*9,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*91,game.tileset[1]*43,game.tileset[0]*21,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*92,game.tileset[1]*39,game.tileset[0]*15,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*88.5,game.tileset[1]*28.5,game.tileset[0]*7,game.tileset[1]*4,62))
        break
        case 91:
            graphics.gradient=[new p5.LinearGradient(88,game.edge[1]*1.5)]
            colorset=[]
            for(let a=0,la=11;a<=la;a++){
                let nudge=a%2*0.6+random(0,0.1)
                colorset.push(
                    a/la,
                    color(...mergeColor([160,136,119],[78,69,71],nudge))
                )
            }
            graphics.gradient[0].colors(...colorset)
            graphics.gradient.push(new p5.LinearGradient(87,graphics.main[0].height))
            graphics.gradient[1].colors(
                0.0,color(63,98,124),
                1.0,color(139,184,216)
            )
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*66.5,game.tileset[1]*43,game.tileset[0]*25,game.tileset[1]*6,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*38.5,game.tileset[1]*43,game.tileset[0]*15,game.tileset[1]*6,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*94.5,game.tileset[1]*43,game.tileset[0]*15,game.tileset[1]*6,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*50,game.tileset[1]*43.5,game.tileset[0]*10,game.tileset[1]*5,62))
            entities.walls[2].splice(0,0,new wall(graphics.main,game.tileset[0]*83,game.tileset[1]*43.5,game.tileset[0]*10,game.tileset[1]*5,62))
            game.index=0
        break
    }
    let clump=listing[floor(random(1.5))]
    let weapon=clump[floor(random(0,clump.length))]
    let shifter=0
    if(game.level==23||game.level==26||game.level==28||game.level==32||game.level==33||game.level==63){
        shifter=floor(random(0,4))
    }else if(game.level==39||game.level==42){
        shifter=floor(random(0,6))
    }else if(game.level==43||game.level==49||game.level==84||game.level==85||game.level==89){
        shifter=floor(random(0,5))
    }
    for(let c=0,lc=game.players+1;c<lc;c++){
        game.det.push(0)
    }
    if(!(game.level==81&&!game.firstGen)){
        for(let c=0,lc=game.players;c<lc;c++){
            let clump=listing[game.classWeapon?3:game.peakWeapon?1:game.level==27&&game.pvp||game.level==37||game.level==38?0:floor(random(0,1.5))]
            let type=game.classWeapon&&(teamMode())||dm()?0:game.selector?findName('PlayerSelector',types.player):game.randomizer?floor(random(listing[1][listing[1].length-1]+1,types.player.length)):game.classicWeapon||c>=game.gaming?(clump[floor(random(0,clump.length))]):(game.level==13||game.level==14||game.level==48||game.level==57||game.level==80?0:game.weapon[game.mainline?lc:c][game.weaponTick[c]%game.weapon[game.mainline?lc:c].length])
            let postC=(game.level==27?c%5:c)
            let encode=teamMode()?'q':game.level==89?'12345'[(postC+shifter)%5]:game.level==43||game.level==49||game.level==84||game.level==85?'qwert'[(postC+shifter)%5]:game.level==39||game.level==42?'qwerty'[(postC+shifter)%5]:(game.level==23||game.level==26||game.level==28||game.level==32||game.level==33||game.level==63)&&postC<4?'qwer'[(postC+shifter)%4]:'qwerty'[postC]
            for(let a=0,la=level.length;a<la;a++){
                for(let b=0,lb=level[a].length;b<lb;b++){
                    if(game.attacker&&game.level!=13&&game.level!=14){
                        if(level[a][b]=='Z'){
                            entities.players.push(new player(layer,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],c+1,0,[],true,type,game.index))
                            if(!game.classicWeapon&&c<game.gaming&&game.level!=13&&game.level!=14&&game.level!=48){
                                game.weaponTick[c]++
                            }
                            game.index++
                        }
                    }else{
                        let playerLength=entities.players.length
                        if(
                            game.level==89&&!game.pvp&&level[a][b]==encode||
                            game.level!=89&&int(level[a][b])==((game.level==48||game.level==57||game.level==80)&&c>=game.gaming&&lc>10?5:game.level==34?0:game.level==32?1:game.level==27?c%5:c)+1&&(!game.pvp||game.level==13||game.level==14||game.level==48||game.level==57)
                        ){
                            entities.players.push(new player(layer,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],c+1,0,[],true,type,game.index))
                            if(!game.classicWeapon&&c<game.gaming&&game.level!=13&&game.level!=14&&game.level!=48){
                                game.weaponTick[c]++
                            }
                            game.index++
                            if(game.level==13||game.level==14||game.level==48||game.level==57||game.level==80){
                                entities.players[entities.players.length-1].weaponType=-1
                            }
                            if(game.level==19||game.level==42){
                                entities.players[entities.players.length-1].position.x=game.edge[0]/2+random(-300,300)
                                entities.players[entities.players.length-1].position.y=0
                                if(entities.players.length>playerLength){
                                    for(let a=playerLength,la=entities.players.length;a<la;a++){
                                        entities.players[a].parachute=true
                                    }
                                }
                            }
                        }
                        if(level[a][b]==encode&&game.pvp){
                            entities.players.push(new player(layer,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],c+1,0,[],true,type,game.index))
                            if(!game.classicWeapon&&c<game.gaming&&game.level!=13&&game.level!=14&&game.level!=48){
                                game.weaponTick[c]++
                            }
                            game.index++
                            if(game.level==13||game.level==14||game.level==48||game.level==57||game.level==80){ 
                                entities.players[entities.players.length-1].weaponType=-1
                            }
                            if((game.level==8||game.level==17)&&a<5){
                                entities.players[entities.players.length-1].position.x=game.edge[0]/2
                                entities.players[entities.players.length-1].position.y=1000
                                if(entities.players.length>playerLength){
                                    for(let a=playerLength,la=entities.players.length;a<la;a++){
                                        entities.players[a].parachute=true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if(game.past){
        for(let c=0,lc=game.players;c<lc;c++){
            entities.players.splice(0,0,entities.players[entities.players.length-1])
            entities.players.splice(entities.players.length-1,1)
        }
    }
    switch(game.level){
        case 23: case 35:
            entities.walls.forEach(set=>set.forEach(item=>item.checkVertical()))
            entities.walls[0]=entities.walls[0].filter(item=>!item.remove)
            entities.walls[1]=entities.walls[1].filter(item=>!item.remove)
            entities.walls.forEach(set=>set.forEach(item=>item.checkHorizontal()))
            entities.walls[0]=entities.walls[0].filter(item=>!item.remove)
            entities.walls[1]=entities.walls[1].filter(item=>!item.remove)
        break
        default:
            entities.walls.forEach(set=>set.forEach(item=>item.checkHorizontal()))
            entities.walls[0]=entities.walls[0].filter(item=>!item.remove)
            entities.walls[1]=entities.walls[1].filter(item=>!item.remove)
            entities.walls.forEach(set=>set.forEach(item=>item.checkVertical()))
            entities.walls[0]=entities.walls[0].filter(item=>!item.remove)
            entities.walls[1]=entities.walls[1].filter(item=>!item.remove)
        break
    }
    entities.walls.forEach(set=>set.forEach(item=>item.formBoundary()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkPrimary()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkRedundancy()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkOverlay()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkGap()))
    switch(game.level){
        case 23: case 35:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==57){
                    entities.walls[1][a].pos=ticker
                    ticker++
                }
            }
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==35){
                    entities.walls[1][a].pos=ticker
                    ticker++
                }
            }
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    if(entities.walls[a][b].type==31||entities.walls[a][b].type==33){
                        entities.walls[a][b].set()
                    }
                }
            }
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    if(entities.walls[a][b].type==36){
                        entities.walls[a][b].set()
                    }
                }
            }
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    if(entities.walls[a][b].type==42){
                        entities.walls[a][b].set()
                    }
                }
            }
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    if(entities.walls[a][b].type!=31&&entities.walls[a][b].type!=33&&entities.walls[a][b].type!=36&&entities.walls[a][b].type!=42){
                        entities.walls[a][b].set()
                    }
                }
            }
            let placer=1
            ticker=0
            for(let a=0,la=entities.walls[placer].length;a<la;a++){
                if(entities.walls[placer][a].type==31||entities.walls[placer][a].type==33){
                    entities.walls[placer][a].pos=[2,0,3,4,1,5,6,8,7][ticker]
                    entities.players[entities.walls[placer][a].index].pos=[2,0,3,4,1,5,6,8,7][ticker]
                    if(entities.walls[placer][a].pos==4){
                        entities.players[entities.walls[placer][a].index].multLife(2)
                    }
                    ticker++
                }
            }
            for(let a=0,la=entities.walls[placer].length;a<la;a++){
                if(entities.walls[placer][a].type==36){
                    entities.walls[placer][a].pos=[2,0,3,4,1,5,6,8,7][ticker]
                    entities.players[entities.walls[placer][a].index].pos=[2,0,3,4,1,5,6,8,7][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1,-1,-1,-1,-1,-1,-1]
            game.pointAnim=[0,0,0,0,0,0,0,0,0]
        break
        case 27:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[1,2,0,3][ticker]
                    entities.walls[1][a].set()
                    entities.players[entities.walls[1][a].index].pos=[1,2,0,3][ticker]
                    ticker++
                }
            }
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    if(entities.walls[a][b].type!=31&&entities.walls[a][b].type!=33){
                        entities.walls[a][b].set()
                    }
                }
            }
        break
        case 38:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36||entities.walls[1][a].type==42){
                    entities.walls[1][a].pos=[0,3,1,2][ticker]
                    entities.walls[1][a].set()
                    entities.players[entities.walls[1][a].index].pos=[0,3,1,2][ticker]
                    ticker++
                }
            }
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    if(entities.walls[a][b].type!=31&&entities.walls[a][b].type!=33&&entities.walls[a][b].type!=36&&entities.walls[a][b].type!=42){
                        entities.walls[a][b].set()
                    }
                }
            }
        break
        case 44:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[1,3,2,0,4][ticker]
                    entities.walls[1][a].set()
                    entities.players[entities.walls[1][a].index].pos=[1,3,2,0,4][ticker]
                    ticker++
                }
            }
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    if(entities.walls[a][b].type!=31&&entities.walls[a][b].type!=33){
                        entities.walls[a][b].set()
                    }
                }
            }
        break
        case 65:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[0,2,4,1,3][ticker]
                    entities.walls[1][a].set()
                    entities.players[entities.walls[1][a].index].pos=[0,2,4,1,3][ticker]
                    ticker++
                }
            }
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    if(entities.walls[a][b].type!=31&&entities.walls[a][b].type!=33){
                        entities.walls[a][b].set()
                    }
                }
            }
        break
        case 76:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[1,0][ticker]
                    entities.walls[1][a].set()
                    entities.players[entities.walls[1][a].index].pos=[1,0][ticker]
                    ticker++
                }
            }
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    if(entities.walls[a][b].type!=31&&entities.walls[a][b].type!=33){
                        entities.walls[a][b].set()
                    }
                }
            }
        break
        case 77:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[2,4,1,5,3,0,6][ticker]
                    entities.walls[1][a].set()
                    entities.players[entities.walls[1][a].index].pos=[2,4,1,5,3,0,6][ticker]
                    ticker++
                }
            }
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    if(entities.walls[a][b].type!=31&&entities.walls[a][b].type!=33){
                        entities.walls[a][b].set()
                    }
                }
            }
        break
        case 89:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[1,3,4,0,5,2][ticker]
                    entities.walls[1][a].set()
                    entities.players[entities.walls[1][a].index].pos=[1,3,4,0,5,2][ticker]
                    ticker++
                }
            }
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    if(entities.walls[a][b].type!=31&&entities.walls[a][b].type!=33){
                        entities.walls[a][b].set()
                    }
                }
            }
        break
        case 92:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==35){
                    entities.walls[1][a].pos=ticker
                    ticker++
                }
            }
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if((entities.walls[1][a].type==8||entities.walls[1][a].type==9||entities.walls[1][a].type==12||entities.walls[1][a].type==16||entities.walls[1][a].type==27||entities.walls[1][a].type==50||entities.walls[1][a].type==61||entities.walls[1][a].type==66||entities.walls[1][a].type==68||entities.walls[1][a].type==69||entities.walls[1][a].type==70||entities.walls[1][a].type==71)&&entities.walls[1][a].position.y>game.tileset[1]*10&&entities.walls[1][a].position.x>game.tileset[0]*10){
                    entities.walls[1][a].pos=ticker
                    ticker++
                }
            }
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(83,90,132),
                1.0,color(145,143,164)
            )
            entities.walls.forEach(set=>set.forEach(item=>item.set()))
        break
        default:
            entities.walls.forEach(set=>set.forEach(item=>item.set()))
        break
    }
    entities.walls.forEach(set=>set.forEach(item=>item.checkBar()))
    entities.walls.forEach(set=>set.forEach(item=>item.formBounder()))
    if(backed()){
        run.fore=[entities.walls[2],entities.projectiles,entities.players,entities.walls[1]]
    }else if(game.pane){
        run.fore=[entities.projectiles,entities.players,entities.walls[1]]
    }else if(game.level!=15&&game.level!=18&&game.level!=19&&game.level!=22&&game.level!=23&&game.level!=24){
        entities.walls[0].forEach(wall=>wall.display(graphics.pane[0]))
        entities.walls[0].forEach(wall=>wall.displayOver(graphics.pane[0]))
        run.fore=[entities.projectiles,entities.players,entities.walls[1]]
    }else{
        run.fore=[entities.projectiles,entities.players,entities.walls[1],entities.walls[0]]
    }
    run.back=[entities.players]
    run.update=[entities.players,entities.walls[0],entities.walls[1],entities.walls[2],entities.projectiles]
    run.info=[entities.players]
    set=[]
    let lister=[]
    switch(game.level){
        case 6:
            graphics.pane.push(createGraphics(game.edge[0],game.edge[1]))
            setupLayer(graphics.pane[graphics.pane.length-1])
            for(let a=0,la=graphics.pane[graphics.pane.length-1].width/25;a<la;a++){
                for(let b=0,lb=graphics.pane[graphics.pane.length-1].height/25-20;b<lb;b++){
                    effectiveA=(a*7+b*3)%la
                    let pos=[effectiveA*25+random(0,25),b*25+500+lsin(effectiveA*30+random(-15,15))*100+lsin(effectiveA*8.5+random(-10,10))*50]
                    let size=random(45,60)
                    let bounce=random(0,1)
                    graphics.pane[graphics.pane.length-1].fill(
                        10+pos[1]/graphics.pane[graphics.pane.length-1].height*10+bounce*20,
                        20-pos[1]/graphics.pane[graphics.pane.length-1].height*5+bounce*20,
                        10+bounce*20
                    )
                    regPoly(graphics.pane[graphics.pane.length-1],pos[0],pos[1],floor(random(4,9)),size/2,size/2,random(0,360))
                }
            }
        break
        case 19:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[2,6,3,7,1,5,4,8,0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[2,6,3,7,1,5,4,8,0][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1,-1,-1,-1,-1,-1,-1]
        break
        case 22:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[2,0,3,4,1][ticker]
                    entities.players[entities.walls[1][a].index].pos=[2,0,3,4,1][ticker]
                    ticker++
                }
            }
            game.point=[true,true,true,true,true]
            game.pointAnim=[0,0,0,0,0]
        break
        case 24:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[0,1][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0,1][ticker]
                    ticker++
                }
            }
        break
        case 25: case 26:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[1,2,3,5,4,0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[1,2,3,5,4,0][ticker]
                    if(entities.walls[1][a].pos==2&&game.level==25){
                        entities.players[entities.walls[1][a].index].multLife(2)
                    }
                    ticker++
                }
            }
            ticker=0
            for(let a=0,la=entities.walls[2].length;a<la;a++){
                if(entities.walls[2][a].type==3){
                    entities.walls[2][a].width=[144,47,16,18,67][ticker]*game.tileset[0]
                    entities.walls[2][a].height=[5,15,3,3,11][ticker]*game.tileset[1]
                    if(ticker==2){
                        entities.walls[2][a].position.x-=game.tileset[0]
                    }else if(ticker==3){
                        entities.walls[2][a].position.y-=game.tileset[1]
                    }
                    ticker++
                }
            }
            if(game.level==26){
                ticker=0
                for(let a=0,la=entities.walls[1].length;a<la;a++){
                    if(entities.walls[1][a].type==35){
                        entities.walls[1][a].pos=ticker
                        ticker++
                    }
                }
            }
            game.point=game.level==26?[-1,-1,-1,-1,-1,-1]:[true,true,true,true,true,true]
            game.pointAnim=[0,0,0,0,0,0]
            game.water=game.tileset[1]*34.5
            game.waterTick=true
        break
        case 27:
            if(game.pvp){
                let position=[]
                game.location=[]
                ticker=[0,0]
                for(let a=0,la=game.players;a<la;a++){
                    position.push(3)
                }
                for(let c=0,lc=6;c<lc;c++){
                    for(let a=0,la=level.length;a<la;a++){
                        for(let b=0,lb=level[a].length;b<lb;b++){
                            if(level[a][b]=='tqwerz'[c]){
                                game.location.push({x:game.tileset[0]*(b+0.5),y:game.tileset[1]*(a+0.5)})
                            }
                        }
                    }
                }
                let placable=[]
                /*if(game.gaming==4){
                    placable=range(4,game.players)
                    let choice=floor(random(0,6))
                    position[0]=[0,1,2].includes(choice)?2:1
                    position[1]=[0,3,4].includes(choice)?2:1
                    position[2]=[1,3,5].includes(choice)?2:1
                    position[3]=[2,4,5].includes(choice)?2:1
                }else if(game.gaming==3){
                    placable=range(3,game.players)
                    let choice=floor(random(0,3))
                    position[choice]=1
                    position[(choice+1)%3]=2
                    position[(choice+2)%3]=3
                }else if(game.gaming==2){
                    placable=range(2,game.players)
                    position[0]=2
                    position[1]=1
                }else{
                    placable=range(0,game.players)
                }*/
                placable=range(0,game.players)
                let assignToEach=floor(placable.length/2)
                for(let a=0,la=assignToEach;a<la;a++){
                    let index=floor(random(0,placable.length))
                    position[placable[index]]=1
                    placable.splice(index,1)
                    index=floor(random(0,placable.length))
                    position[placable[index]]=2
                    placable.splice(index,1)
                }
                for(let a=0,la=position.length;a<la;a++){
                    entities.players[a].id=position[a]
                    entities.players[a].setColor()
                    switch(position[a]){
                        case 1:
                            entities.players[a].position.x=game.location[ticker[0]%2+1].x
                            entities.players[a].position.y=game.location[ticker[0]%2+1].y
                            entities.players[a].ticker=ticker[0]
                            ticker[0]++
                        break
                        case 2:
                            entities.players[a].position.x=game.location[ticker[1]%2+3].x
                            entities.players[a].position.y=game.location[ticker[1]%2+3].y
                            entities.players[a].ticker=ticker[1]
                            ticker[1]++
                        break
                        case 3:
                            entities.players[a].position.x=game.location[0].x
                            entities.players[a].position.y=game.location[0].y
                            entities.players[a].parachute=true
                        break
                    }
                    entities.players[a].base.position.x=entities.players[a].position.x
                    entities.players[a].base.position.y=entities.players[a].position.y
                }
                game.point=[1,1,2,2]
            }else{
                game.point=[-1,-1,-1,-1]
            }
        break
        case 28:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[2,1,3,0,4][ticker]
                    entities.players[entities.walls[1][a].index].pos=[2,1,3,0,4][ticker]
                    ticker++
                }
            }
        break
        case 29:
            let left=range(0,game.players)
            for(let a=0,la=game.players;a<la;a++){
                let index=floor(random(0,left.length))
                entities.players[a].position.x=(left[index]+1.5)/(la+2)*game.edge[0]
                entities.players[a].position.y=0
                entities.players[a].parachute=true
                left.splice(index,1)
            }
            game.placer[0]=sortNumbers2(game.placer[0])
            let amount=2+game.players
            for(let a=0,la=game.placer[0].length-amount;a<la;a++){
                game.placer[0].splice(floor(random(0,game.placer[0].length)),1)
            }
            for(let a=0,la=amount;a<la;a++){
                entities.walls[1].push(new wall(graphics.main,game.placer[0][a][0],game.placer[0][a][1],game.tileset[1]*8,game.tileset[1]*4,33))
                entities.walls[1][entities.walls[1].length-1].pos=a
                entities.walls[1][entities.walls[1].length-1].set()
                entities.walls[1][entities.walls[1].length-1].formBounder()
            }
            set=[]
            for(let a=0,la=game.players+1;a<la;a++){
                set.push(8)
                set.push(9+a%2*3)
                set.push(16)
                set.push(50)
            }
            for(let a=0,la=game.placer[0].length-set.length;a<la;a++){
                game.placer[0].splice(floor(random(0,game.placer[0].length)),1)
            }
            for(let a=0,la=set.length;a<la;a++){
                let index=floor(random(0,game.placer[1].length))
                if(set[a]==16){
                    let cluster=game.classWeapon?3:game.peakWeapon?1:game.level==27&&game.pvp?1:floor(random(1.5))
                    entities.walls[1].push(new wall(graphics.main,game.placer[1][index][0],game.placer[1][index][1],game.tileset[1]*0.6,game.tileset[1]*0.6,set[a]))
                    entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                }else{
                    entities.walls[1].push(new wall(graphics.main,game.placer[1][index][0],game.placer[1][index][1],game.tileset[1]*0.6,game.tileset[1]*0.6,set[a]))
                }
                entities.walls[1][entities.walls[1].length-1].set()
                entities.walls[1][entities.walls[1].length-1].formBounder()
                game.placer[1].splice(index,1)
            }
            game.point=[]
            for(let a=0,la=amount;a<la;a++){
                game.point.push(0)
            }
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==57){
                    if(game.placer[2].length>0){
                        entities.walls[1][a].weapon=game.placer[2][0][0]
                        entities.walls[1][a].ammo=game.placer[2][0][1]
                        entities.walls[1][a].uses=game.placer[2][0][2]
                        game.placer[2].splice(0,1)
                    }
                }
            }
        break
        case 30:
            ticker=0
            for(let a=0,la=entities.walls[0].length;a<la;a++){
                if(entities.walls[0][a].type==3){
                    entities.walls[0][a].width=[16][ticker]*game.tileset[0]
                    entities.walls[0][a].height=[1.6][ticker]*game.tileset[1]
                    entities.walls[0][a].position.x+=entities.walls[0][a].width/2
                    entities.walls[0][a].position.y+=entities.walls[0][a].height/2+game.tileset[1]*0.4
                    if(ticker==0){
                        entities.walls[0][a].position.x-=game.tileset[0]
                    }
                    ticker++
                }
            }
        break
        case 31:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[1,3,2,0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[1,3,2,0][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1,-1]
        break
        case 32:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36||entities.walls[1][a].type==42){
                    entities.walls[1][a].pos=[3,0,1,2][ticker]
                    entities.players[entities.walls[1][a].index].pos=[3,0,1,2][ticker]
                    ticker++
                }
            }
            ticker=0
            for(let a=0,la=entities.walls[0].length;a<la;a++){
                if(entities.walls[0][a].type==3){
                    entities.walls[0][a].width=[2.5][ticker]*game.tileset[0]
                    entities.walls[0][a].height=[8][ticker]*game.tileset[1]
                    entities.walls[0][a].position.x+=entities.walls[0][a].width/2
                    entities.walls[0][a].position.y+=entities.walls[0][a].height/2
                    if(ticker==0){
                        entities.walls[0][a].position.x-=game.tileset[0]
                    }
                    ticker++
                }
            }
            game.point=[-1,-1,-1,-1]
        break
        case 33:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[3,2,1,0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[3,2,1,0][ticker]
                    ticker++
                }
            }
            ticker=0
            for(let a=0,la=entities.walls[0].length;a<la;a++){
                if(entities.walls[0][a].type==3){
                    entities.walls[0][a].width=[2.5][ticker]*game.tileset[0]
                    entities.walls[0][a].height=[8][ticker]*game.tileset[1]
                    entities.walls[0][a].position.x+=entities.walls[0][a].width/2
                    entities.walls[0][a].position.y+=entities.walls[0][a].height/2
                    if(ticker==0){
                        entities.walls[0][a].position.x-=game.tileset[0]
                    }
                    ticker++
                }
            }
            game.point=[-1,-1,-1,-1]
        break
        case 34:
            graphics.gradient=[]
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[1,0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[1,0][ticker]
                    ticker++
                }
            }
            graphics.gradient.push(new p5.LinearGradient(85,game.edge[1]))
            colorset=[]
            for(let a=0,la=10;a<=la;a++){
                let nudge=a%2*0.75+random(0,0.25)
                colorset.push(
                    a/la,
                    color(249+nudge*116,189-nudge*51,129-nudge*26)
                )
            }
            graphics.gradient[0].colors(...colorset)
            graphics.gradient.push(new p5.LinearGradient(85,graphics.main[0].height))
            graphics.gradient[1].colors(
                0.0,color(45,59,62),
                1.0,color(7,19,22)
            )
        break
        case 36: case 51: case 52: case 62: case 64: case 71: case 72: case 74: case 75: case 90:
        case 91: case 92: case 93:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36||entities.walls[1][a].type==42){
                    entities.walls[1][a].pos=[0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0][ticker]
                    ticker++
                }
            }
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==33||entities.walls[1][a].type==42){
                    if(game.placer[2].length>0){
                        for(let b=0,lb=game.placer[2][0].length;b<lb;b++){
                            entities.walls[1][a].timers[b][0]=game.placer[2][0][b][0]
                        }
                        game.placer[2].splice(0,1)
                    }
                 }
            }
        break
        case 37:
            let pos=0
            let total=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    total++
                    entities.walls[1][a].pos=-1
                }
            }
            while(pos<total){
                let minimum=game.edge[0]
                for(let a=0,la=entities.walls[1].length;a<la;a++){
                    if((entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36)&&entities.walls[1][a].pos==-1){
                        minimum=min(minimum,entities.walls[1][a].position.x)
                    }
                }
                for(let a=0,la=entities.walls[1].length;a<la;a++){
                    if((entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36)&&entities.walls[1][a].position.x==minimum){
                        entities.walls[1][a].pos=pos
                        entities.players[entities.walls[1][a].index].pos=pos
                        entities.walls[1][a].left=pos==2?1800:-1
                    }
                }
                pos++
            }
            game.point=[0,0,0]
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==33&&entities.walls[1][a].pos==0){
                    if(game.placer[2].length>0){
                        entities.walls[1][a].timers=game.placer[2][0]
                        game.placer[2].splice(0,1)
                    }
                }
            }
            set=[8,9,12,16,16,57]
            for(let a=0,la=set.length;a<la;a++){
                if(game.placer[1].length>0){
                    let index=floor(random(0,game.placer[1].length))
                    if(set[a]==16){
                        let cluster=game.classWeapon?3:game.peakWeapon?1:game.level==27&&game.pvp?1:floor(random(1.5))
                        entities.walls[1].push(new wall(graphics.main,game.placer[1][index][0],game.placer[1][index][1],game.tileset[1]*0.6,game.tileset[1]*0.6,set[a]))
                        entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                    }else{
                        entities.walls[1].push(new wall(graphics.main,game.placer[1][index][0],game.placer[1][index][1],game.tileset[1]*0.6,game.tileset[1]*0.6,set[a]))
                    }
                    entities.walls[1][entities.walls[1].length-1].set()
                    entities.walls[1][entities.walls[1].length-1].formBounder()
                    game.placer[1].splice(index,1)
                }
            }
        break
        case 38:
            let position=[]
            game.location=[]
            ticker=[0,0]
            for(let a=0,la=game.players;a<la;a++){
                position.push(3)
            }
            for(let c=0,lc=6;c<lc;c++){
                for(let a=0,la=level.length;a<la;a++){
                    for(let b=0,lb=level[a].length;b<lb;b++){
                        if(level[a][b]=='tqwerz'[c]){
                            game.location.push({x:game.tileset[0]*(b+0.5),y:game.tileset[1]*(a+0.5)})
                        }
                    }
                }
            }
            let placable=[]
            placable=range(0,game.players)
            let assignToEach=floor(placable.length/2)
            for(let a=0,la=assignToEach;a<la;a++){
                let index=floor(random(0,placable.length))
                position[placable[index]]=1
                placable.splice(index,1)
                index=floor(random(0,placable.length))
                position[placable[index]]=2
                placable.splice(index,1)
            }
            for(let a=0,la=position.length;a<la;a++){
                entities.players[a].id=position[a]
                entities.players[a].setColor()
                switch(position[a]){
                    case 1:
                        entities.players[a].position.x=game.location[ticker[0]%2+1].x
                        entities.players[a].position.y=game.location[ticker[0]%2+1].y
                        entities.players[a].ticker=ticker[0]
                        ticker[0]++
                    break
                    case 2:
                        entities.players[a].position.x=game.location[ticker[1]%2+3].x
                        entities.players[a].position.y=game.location[ticker[1]%2+3].y
                        entities.players[a].ticker=ticker[1]
                        ticker[1]++
                    break
                    case 3:
                        entities.players[a].position.x=game.location[0].x
                        entities.players[a].position.y=game.location[0].y
                        entities.players[a].parachute=true
                    break
                }
                entities.players[a].base.position.x=entities.players[a].position.x
                entities.players[a].base.position.y=entities.players[a].position.y
            }
            game.point=[1,1,2,2]
        break
        case 39:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33){
                    entities.walls[1][a].pos=[0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0][ticker]
                    ticker++
                }
            }
        break
        case 40:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[2,1,0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[2,1,0][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1]
            game.pointAnim=[0,0,0]
        break
        case 41:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0][ticker]
                    ticker++
                }
            }
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==33){
                    if(game.placer[2].length>0){
                        for(let b=0,lb=game.placer[2][0].length;b<lb;b++){
                            entities.walls[1][a].timers[b][0]=game.placer[2][0][b][0]
                        }
                        game.placer[2].splice(0,1)
                    }
                 }
            }
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==57){
                    if(game.placer[3].length>0){
                        entities.walls[1][a].weapon=game.placer[3][0][0]
                        entities.walls[1][a].ammo=game.placer[3][0][1]
                        entities.walls[1][a].uses=game.placer[3][0][2]
                        game.placer[3].splice(0,1)
                    }
                }
            }
        break
        case 42:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[2,6,3,1,5,4,7,0,9,8][ticker]
                    entities.players[entities.walls[1][a].index].pos=[2,6,3,1,5,4,7,0,9,8][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1,-1,-1,-1,-1,-1]
        break
        case 43:
            game.point=[]
        break
        case 44: case 65: case 67: case 76: case 77: case 78: case 81: case 88:
            if(game.level==81&&!game.firstGen){
                for(let a=0,la=entities.walls[1].length;a<la;a++){
                    if(entities.walls[1][a].type==33||entities.walls[1][a].type==42){
                        if(game.placer[2].length>0){
                            for(let b=0,lb=game.placer[2][0].length;b<lb;b++){
                                entities.walls[1][a].timers[b][0]=game.placer[2][0][b][0]
                            }
                            game.placer[2].splice(0,1)
                        }
                    }
                }
                for(let a=0,la=game.players;a<la;a++){
                    entities.players[a].respawn()
                }
                for(let a=game.players+1,la=entities.players;a<la;a++){
                    entities.players.splice(a,1)
                    a--
                    la--
                }
            }else{
                game.firstGen=false
                let split=[]
                let possible=range(0,game.players)
                let typeList=[range(0,10),range(0,10)]
                for(let a=0,la=possible.length/2;a<la;a++){
                    let index=floor(random(0,possible.length))
                    split.push(possible[index])
                    possible.splice(index,1)
                }
                let loc=[]
                for(let c=0,lc=2;c<lc;c++){
                    for(let a=0,la=level.length;a<la;a++){
                        for(let b=0,lb=level[a].length;b<lb;b++){
                            if(level[a][b]==(game.level==77?'er':game.level==67||game.level==76||game.level==78||game.level==81||game.level==88?'qw':'qt')[c]){
                                loc.push([(b+0.5)*game.tileset[0],(a+0.5)*game.tileset[1]])
                            }
                        }
                    }
                }
                let num=8
                let classPick=[floor(random(0,10)),floor(random(0,10))]
                let options=[[0,...range(0,num-1),[0,...range(0,num-1)][floor(random(0,num))],[0,...range(0,num-1)][floor(random(0,num))]],[0,...range(0,num-1),[0,...range(0,num-1)][floor(random(0,num))],[0,...range(0,num-1)][floor(random(0,num))]]]
                for(let a=0,la=game.players;a<la;a++){
                    let team=split.includes(a)?1:0
                    entities.players[a].id=team+1
                    entities.players[a].setColor()
                    entities.players[a].base.position.x=loc[team][0]+random(-20,20)
                    entities.players[a].base.position.y=loc[team][1]
                    entities.players[a].position.x=loc[team][0]+random(-20,20)
                    entities.players[a].position.y=loc[team][1]
                    if(game.classWeapon){
                        if(game.weapon[0][0]==findName('PlayerClassWars',types.player)){
                            let index=floor(random(0,options[team].length))
                            entities.players[a].newWeaponSet(findName('PlayerScout',types.player)+classPick[team]+options[team][index]*10)
                            options[team].splice(index,1)
                        }else if(a<game.gaming){
                            entities.players[a].newWeaponSet(game.weapon[a][0])
                            if(typeList[team].includes((game.weapon[a][0]-findName('PlayerScout',types.player))%10)){
                                typeList[team].splice(typeList[team].indexOf((game.weapon[a][0]-findName('PlayerScout',types.player))%10),1)
                            }
                        }else{
                            let index=floor(random(0,typeList[team].length))
                            entities.players[a].newWeaponSet(findName('PlayerScout',types.player)+typeList[team][index]+[0,...range(0,num-1)][floor(random(0,num))]*10)
                            typeList[team].splice(index,1)
                        }
                    }
                }
                if(game.level==76){
                    game.point=[-1,-1]
                }else if(game.level==77){
                    game.point=[1,1,1,-1,2,2,2]
                }else if(game.level==67||game.level==78){
                    game.point=[0,0]
                }else{
                    game.point=[1,1,-1,2,2]
                }
            }
            switch(game.level){
                case 81:
                    let delay=[range(0,game.players/2),range(0,game.players/2)]
                    for(let a=0,la=game.players;a<la;a++){
                        let index=a<game.gaming?0:floor(random(0,delay[entities.players[a].id-1].length))
                        entities.players[a].stuckTime=delay[entities.players[a].id-1][index]*60
                        delay[entities.players[a].id-1].splice(index,1)
                    }
                break
                case 88:
                    ticker=0
                    for(let a=0,la=entities.walls[1].length;a<la;a++){
                        if(entities.walls[1][a].type==31||entities.walls[1][a].type==33){
                            entities.walls[1][a].pos=[0][ticker]
                            entities.players[entities.walls[1][a].index].pos=[0][ticker]
                            ticker++
                        }
                    }
                    game.point=[-1]
                break
            }
        break
        case 45:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0][ticker]
                    ticker++
                }
            }
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==33){
                    if(game.placer[2].length>0){
                        for(let b=0,lb=game.placer[2][0].length;b<lb;b++){
                            entities.walls[1][a].timers[b][0]=game.placer[2][0][b][0]
                        }
                        game.placer[2].splice(0,1)
                    }
                 }
            }
            graphics.pane.push(createGraphics(game.edge[0],game.edge[1]))
            setupLayer(graphics.pane[graphics.pane.length-1])
            for(let a=0,la=graphics.pane[graphics.pane.length-1].width/25;a<la;a++){
                for(let b=0,lb=graphics.pane[graphics.pane.length-1].height/25-45;b<lb;b++){
                    effectiveA=(a*7+b*3)%la
                    let pos=[effectiveA*25+random(0,25),b*25+1125+lsin(effectiveA*30+random(-15,15))*100+lsin(effectiveA*8.5+random(-10,10))*50]
                    let size=random(45,60)
                    let bounce=random(0,1)
                    graphics.pane[graphics.pane.length-1].fill(
                        10+pos[1]/graphics.pane[graphics.pane.length-1].height*10+bounce*20,
                        20-pos[1]/graphics.pane[graphics.pane.length-1].height*5+bounce*20,
                        10+bounce*20
                    )
                    regPoly(graphics.pane[graphics.pane.length-1],pos[0],pos[1],floor(random(4,9)),size/2,size/2,random(0,360))
                }
            }
        break
        case 46:
            set=[9,9,12,16,50]
            for(let a=0,la=game.placer[0].length-set.length;a<la;a++){
                game.placer[0].splice(floor(random(0,game.placer[0].length)),1)
            }
        break
        case 47:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==33){
                    entities.walls[1][a].pos=[2,1,0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[2,1,0][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1,-1]
        break
        case 49:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[0,2,3,1][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0,2,3,1][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1,-1]
            game.pointAnim=[0,0,0,0]
        break
        case 50:
            graphics.gradient=[]
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0][ticker]
                    ticker++
                }
            }
            graphics.gradient.push(new p5.LinearGradient(85,game.edge[1]))
            colorset=[]
            for(let a=0,la=10;a<=la;a++){
                let nudge=a%2*0.75+random(0,0.25)
                colorset.push(
                    a/la,
                    color(249+nudge*116,189-nudge*51,129-nudge*26)
                )
            }
            graphics.gradient[0].colors(...colorset)
            graphics.gradient.push(new p5.LinearGradient(85,graphics.main[0].height))
            graphics.gradient[1].colors(
                0.0,color(45,59,62),
                1.0,color(7,19,22)
            )
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==33){
                    if(game.placer[2].length>0){
                        for(let b=0,lb=game.placer[2][0].length;b<lb;b++){
                            entities.walls[1][a].timers[b][0]=game.placer[2][0][b][0]
                        }
                        game.placer[2].splice(0,1)
                    }
                 }
            }
        break
        case 53:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0][ticker]
                    ticker++
                }
            }
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==33){
                    if(game.placer[2].length>0){
                        for(let b=0,lb=game.placer[2][0].length;b<lb;b++){
                            entities.walls[1][a].timers[b][0]=game.placer[2][0][b][0]
                        }
                        game.placer[2].splice(0,1)
                    }
                 }
            }
            set=[8,9,12,27,50,57,61]
            for(let a=0,la=2;a<la;a++){
                set.splice(floor(random(0,set.length)),1)
            }
            for(let a=0,la=game.placer[0].length-set.length;a<la;a++){
                game.placer[0].splice(floor(random(0,game.placer[0].length)),1)
            }
            for(let a=0,la=set.length;a<la;a++){
                let index=floor(random(0,game.placer[1].length))
                if(set[a]==16){
                    let cluster=game.classWeapon?3:game.peakWeapon?1:game.level==27&&game.pvp?1:floor(random(1.5))
                    entities.walls[1].push(new wall(graphics.main,game.placer[1][index][0],game.placer[1][index][1],game.tileset[1]*0.6,game.tileset[1]*0.6,set[a]))
                    entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                }else{
                    entities.walls[1].push(new wall(graphics.main,game.placer[1][index][0],game.placer[1][index][1],game.tileset[1]*0.6,game.tileset[1]*0.6,set[a]))
                }
                entities.walls[1][entities.walls[1].length-1].set()
                entities.walls[1][entities.walls[1].length-1].formBounder()
                game.placer[1].splice(index,1)
            }
        break
        case 54:
            graphics.gradient=[new p5.LinearGradient(92,game.edge[1])]
            colorset=[]
            for(let a=0,la=8;a<=la;a++){
                let nudge=a%2*0.6+random(0,0.4)
                colorset.push(
                    a/la,
                    color(29+nudge*17,18+nudge*12,35+nudge*22)
                )
            }
            graphics.gradient[0].colors(...colorset)
            graphics.gradient.push(new p5.LinearGradient(85,graphics.main[0].height))
            graphics.gradient[1].colors(
                0.0,color(162,165,206),
                1.0,color(125,92,130)
            )
        break
        case 55:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[1,0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[1,0][ticker]
                    ticker++
                }
            }
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==35){
                    entities.walls[1][a].pos=ticker
                    ticker++
                }
            }
            ticker=1
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==8||entities.walls[1][a].type==9||entities.walls[1][a].type==12||entities.walls[1][a].type==16||entities.walls[1][a].type==27||entities.walls[1][a].type==50||entities.walls[1][a].type==61||entities.walls[1][a].type==66||entities.walls[1][a].type==68||entities.walls[1][a].type==69||entities.walls[1][a].type==70||entities.walls[1][a].type==71){
                    entities.walls[1][a].pos=ticker
                    ticker++
                }
            }
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(83,90,132),
                1.0,color(145,143,164)
            )
            game.point=[-1,-1]
            game.pointAnim=[0,0]
        break
        case 56:
            ticker=0
            for(let a=0,la=entities.walls[0].length;a<la;a++){
                if(entities.walls[0][a].type==3){
                    entities.walls[0][a].width=[16][ticker]*game.tileset[0]
                    entities.walls[0][a].height=[1.6][ticker]*game.tileset[1]
                    entities.walls[0][a].position.x+=entities.walls[0][a].width/2
                    entities.walls[0][a].position.y+=entities.walls[0][a].height/2+game.tileset[1]*0.4
                    if(ticker==0){
                        entities.walls[0][a].position.x-=game.tileset[0]
                    }
                    ticker++
                }
            }
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0][ticker]
                    ticker++
                }
            }
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==33){
                    if(game.placer[2].length>0){
                        for(let b=0,lb=game.placer[2][0].length;b<lb;b++){
                            entities.walls[1][a].timers[b][0]=game.placer[2][0][b][0]
                        }
                        game.placer[2].splice(0,1)
                    }
                 }
            }
        break
        case 58:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36||entities.walls[1][a].type==42){
                    entities.walls[1][a].pos=[1,0,2][ticker]
                    entities.players[entities.walls[1][a].index].pos=[1,0,2][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1]
            graphics.gradient=[new p5.LinearGradient(75,game.edge[1]*1.5)]
            colorset=[]
            for(let a=0,la=20;a<=la;a++){
                let nudge=a%2*0.4+random(0,0.2)+0.2
                colorset.push(
                    a/la,
                    color(111+nudge*49,117+nudge*53,81+nudge*36)
                )
            }
            graphics.gradient[0].colors(...colorset)
            graphics.gradient.push(new p5.LinearGradient(85,graphics.main[0].height))
            graphics.gradient[1].colors(
                0.0,color(149,187,210),
                1.0,color(65,97,136)
            )
        break
        case 59:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36||entities.walls[1][a].type==42){
                    entities.walls[1][a].pos=[2,0,1][ticker]
                    entities.players[entities.walls[1][a].index].pos=[2,0,1][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1]
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==3){
                    entities.walls[1][a].width=[77][ticker]*game.tileset[0]
                    entities.walls[1][a].height=[3][ticker]*game.tileset[1]
                    entities.walls[1][a].position.x-=game.tileset[0]
                    entities.walls[1][a].position.y+=game.tileset[1]*0.2
                    ticker++
                }
            }
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(48,46,59),
                1.0,color(87,104,122)
            )
        break
        case 60:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0][ticker]
                    ticker++
                }
            }
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==33){
                    if(game.placer[2].length>0){
                        for(let b=0,lb=game.placer[2][0].length;b<lb;b++){
                            entities.walls[1][a].timers[b][0]=game.placer[2][0][b][0]
                        }
                        game.placer[2].splice(0,1)
                    }
                 }
            }
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==3){
                    entities.walls[1][a].width=[76][ticker]*game.tileset[0]
                    entities.walls[1][a].height=[3][ticker]*game.tileset[1]
                    entities.walls[1][a].position.y+=game.tileset[1]*0.2
                    ticker++
                }
            }
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(48,46,59),
                1.0,color(87,104,122)
            )
        break
        case 61:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36){
                    entities.walls[1][a].pos=[0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0][ticker]
                    ticker++
                }
            }
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==35){
                    entities.walls[1][a].pos=ticker
                    ticker++
                }
            }
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==37){
                    entities.walls[1][a].pos=[0,0,2,2,1,1][ticker]
                    ticker++
                }
            }
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==33){
                    if(game.placer[2].length>0){
                        for(let b=0,lb=game.placer[2][0].length;b<lb;b++){
                            entities.walls[1][a].timers[b][0]=game.placer[2][0][b][0]
                        }
                        game.placer[2].splice(0,1)
                    }
                 }
            }
            game.elevate=0
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(78,155,175),
                1.0,color(184,184,208)
            )
        break
        case 63:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36||entities.walls[1][a].type==42){
                    entities.walls[1][a].pos=[4,3,2,0,1][ticker]
                    entities.players[entities.walls[1][a].index].pos=[4,3,2,0,1][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1]
            graphics.gradient=[new p5.LinearGradient(75,game.edge[1]*1.5)]
            colorset=[]
            for(let a=0,la=20;a<=la;a++){
                let nudge=a%2*0.4+random(0,0.2)+0.2
                colorset.push(
                    a/la,
                    color(111+nudge*49,117+nudge*53,81+nudge*36)
                )
            }
            graphics.gradient[0].colors(...colorset)
            graphics.gradient.push(new p5.LinearGradient(85,graphics.main[0].height))
            graphics.gradient[1].colors(
                0.0,color(149,187,210),
                1.0,color(65,97,136)
            )
        break
        case 68:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36||entities.walls[1][a].type==42){
                    entities.walls[1][a].pos=[0,1,2][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0,1,2][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1]
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(170,203,221),
                1.0,color(128,162,181)
            )
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==3){
                    entities.walls[1][a].position.x-=game.tileset[0]
                    entities.walls[1][a].position.y+=game.tileset[1]*0.4
                    entities.walls[1][a].width=[56][ticker]*game.tileset[0]
                    entities.walls[1][a].height=[2.6][ticker]*game.tileset[1]
                    ticker++
                }
            }
        break
        case 69:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36||entities.walls[1][a].type==42){
                    entities.walls[1][a].pos=[1,0,2][ticker]
                    entities.players[entities.walls[1][a].index].pos=[1,0,2][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1]
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(168,167,173),
                1.0,color(107,138,133)
            )
        break
        case 70:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36||entities.walls[1][a].type==42){
                    entities.walls[1][a].pos=[1,0,2][ticker]
                    entities.players[entities.walls[1][a].index].pos=[1,0,2][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1]
        break
        case 73:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36||entities.walls[1][a].type==42){
                    entities.walls[1][a].pos=[0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0][ticker]
                    ticker++
                }
            }
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==33||entities.walls[1][a].type==42){
                    if(game.placer[2].length>0){
                        for(let b=0,lb=game.placer[2][0].length;b<lb;b++){
                            entities.walls[1][a].timers[b][0]=game.placer[2][0][b][0]
                        }
                        game.placer[2].splice(0,1)
                    }
                }
            }
            game.selected=game.selected==undefined?floor(random(0,game.players)):(game.selected+1)%game.players
            entities.players[game.selected].position.x=game.tileset[0]*(28.5+floor(random(0,2))*68)
            entities.players[game.selected].position.y=game.tileset[1]*26
            entities.players[game.selected].newWeaponSet(findName('PlayerTiny',types.player))
            entities.players[game.selected].multLife(max(1,game.players-1))
        break
        case 79:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36||entities.walls[1][a].type==42){
                    entities.walls[1][a].pos=[2,0,1][ticker]
                    entities.players[entities.walls[1][a].index].pos=[2,0,1][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1]
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==3){
                    entities.walls[1][a].width=[77][ticker]*game.tileset[0]
                    entities.walls[1][a].height=[3][ticker]*game.tileset[1]
                    entities.walls[1][a].position.x-=game.tileset[0]
                    entities.walls[1][a].position.y+=game.tileset[1]*0.2
                    ticker++
                }
            }
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(-32,-34,-21),
                1.0,color(57,74,92)
            )
            set=[9,9,12,27,27,70]
            for(let a=0,la=set.length;a<la;a++){
                let index=floor(random(0,game.placer[1].length))
                if(set[a]==16){
                    let cluster=game.classWeapon?3:game.peakWeapon?1:game.level==27&&game.pvp?1:floor(random(1.5))
                    entities.walls[1].push(new wall(graphics.main,game.placer[1][index][0],game.placer[1][index][1],game.tileset[1]*0.6,game.tileset[1]*0.6,set[a]))
                    entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                }else{
                    entities.walls[1].push(new wall(graphics.main,game.placer[1][index][0],game.placer[1][index][1],game.tileset[1]*0.6,game.tileset[1]*0.6,set[a]))
                }
                entities.walls[1][entities.walls[1].length-1].set()
                entities.walls[1][entities.walls[1].length-1].formBounder()
                game.placer[1].splice(index,1)
            }
            lister=[
                findName('PlayerNightwatchEngineer',types.player),
                findName('PlayerNightwatchSoldier',types.player),
                findName('PlayerNightwatchHeavy',types.player),
                findName('PlayerNightwatchPyro',types.player)
            ]
            for(let a=0,la=game.players;a<la;a++){
                if(game.classWeapon){
                    if(a<game.gaming){
                        entities.players[a].newWeaponSet(game.weapon[a][0])
                        if(lister.includes(game.weapon[a][0])){
                            lister.splice(lister.indexOf(game.weapon[a][0]))
                        }
                    }else{
                        if(lister.length==0){
                            lister=[
                                findName('PlayerNightwatchEngineer',types.player),
                                findName('PlayerNightwatchSoldier',types.player),
                                findName('PlayerNightwatchHeavy',types.player),
                                findName('PlayerNightwatchPyro',types.player)
                            ]
                        }
                        let index=floor(random(0,lister.length))
                        entities.players[a].newWeaponSet(lister[index])
                        lister.splice(index,1)
                    }
                }else if(game.peakWeapon){
                    entities.players[a].newWeaponSet(findName('PlayerDeluxeNightwatch',types.player))
                }else{
                    entities.players[a].newWeaponSet(findName('PlayerNightwatchShotgun',types.player))
                }
            }
        break
        case 82:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36||entities.walls[1][a].type==42){
                    entities.walls[1][a].pos=[0,1,2,3,4][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0,1,2,3,4][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1,-1,-1]
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(5,-5,30),
                1.0,color(68,56,97)
            )
            set=[9,9,9,12,27,27,27,70]
            for(let a=0,la=set.length;a<la;a++){
                let index=floor(random(0,game.placer[1].length))
                if(set[a]==16){
                    let cluster=game.classWeapon?3:game.peakWeapon?1:game.level==27&&game.pvp?1:floor(random(1.5))
                    entities.walls[1].push(new wall(graphics.main,game.placer[1][index][0],game.placer[1][index][1],game.tileset[1]*0.6,game.tileset[1]*0.6,set[a]))
                    entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                }else{
                    entities.walls[1].push(new wall(graphics.main,game.placer[1][index][0],game.placer[1][index][1],game.tileset[1]*0.6,game.tileset[1]*0.6,set[a]))
                }
                entities.walls[1][entities.walls[1].length-1].set()
                entities.walls[1][entities.walls[1].length-1].formBounder()
                game.placer[1].splice(index,1)
            }
            lister=[
                findName('PlayerNightwatchEngineer',types.player),
                findName('PlayerNightwatchSoldier',types.player),
                findName('PlayerNightwatchHeavy',types.player),
                findName('PlayerNightwatchPyro',types.player)
            ]
            for(let a=0,la=game.players;a<la;a++){
                if(game.classWeapon){
                    if(a<game.gaming){
                        entities.players[a].newWeaponSet(game.weapon[a][0])
                        if(lister.includes(game.weapon[a][0])){
                            lister.splice(lister.indexOf(game.weapon[a][0]))
                        }
                    }else{
                        if(lister.length==0){
                            lister=[
                                findName('PlayerNightwatchEngineer',types.player),
                                findName('PlayerNightwatchSoldier',types.player),
                                findName('PlayerNightwatchHeavy',types.player),
                                findName('PlayerNightwatchPyro',types.player)
                            ]
                        }
                        let index=floor(random(0,lister.length))
                        entities.players[a].newWeaponSet(lister[index])
                        lister.splice(index,1)
                    }
                }else if(game.peakWeapon){
                    entities.players[a].newWeaponSet(findName('PlayerDeluxeNightwatch',types.player))
                }else{
                    entities.players[a].newWeaponSet(findName('PlayerNightwatchShotgun',types.player))
                }
            }
        break
        case 83:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36||entities.walls[1][a].type==42){
                    entities.walls[1][a].pos=[0,1,2,3,4][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0,1,2,3,4][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1,-1,-1]
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(30,20,55),
                1.0,color(98,86,127)
            )
            set=[8,8,9,9,9,12,12,16,16,27,27,27,50,57,57,61,69,70,70,73]
            for(let a=0,la=set.length;a<la;a++){
                let index=floor(random(0,game.placer[1].length))
                if(set[a]==16){
                    let cluster=game.classWeapon?3:game.peakWeapon?1:game.level==27&&game.pvp?1:floor(random(1.5))
                    entities.walls[1].push(new wall(graphics.main,game.placer[1][index][0],game.placer[1][index][1],game.tileset[1]*0.6,game.tileset[1]*0.6,set[a]))
                    entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                }else{
                    entities.walls[1].push(new wall(graphics.main,game.placer[1][index][0],game.placer[1][index][1],game.tileset[1]*0.6,game.tileset[1]*0.6,set[a]))
                }
                entities.walls[1][entities.walls[1].length-1].set()
                entities.walls[1][entities.walls[1].length-1].formBounder()
                game.placer[1].splice(index,1)
            }
        break
        case 84:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36||entities.walls[1][a].type==42){
                    entities.walls[1][a].pos=[3,2,0,1][ticker]
                    entities.players[entities.walls[1][a].index].pos=[3,2,0,1][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1]
        break
        case 85:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33||entities.walls[1][a].type==36||entities.walls[1][a].type==42){
                    entities.walls[1][a].pos=[0,1,2,3,4][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0,1,2,3,4][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1,-1,-1]
            graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
            graphics.gradient[0].colors(
                0.0,color(30,20,55),
                1.0,color(98,86,127)
            )
            set=[8,9,12,16,27,57,61,69,70,73]
            for(let a=0,la=set.length;a<la;a++){
                let index=floor(random(0,game.placer[1].length))
                if(set[a]==16){
                    let cluster=game.classWeapon?3:game.peakWeapon?1:game.level==27&&game.pvp?1:floor(random(1.5))
                    entities.walls[1].push(new wall(graphics.main,game.placer[1][index][0],game.placer[1][index][1],game.tileset[1]*0.6,game.tileset[1]*0.6,set[a]))
                    entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                }else{
                    entities.walls[1].push(new wall(graphics.main,game.placer[1][index][0],game.placer[1][index][1],game.tileset[1]*0.6,game.tileset[1]*0.6,set[a]))
                }
                entities.walls[1][entities.walls[1].length-1].set()
                entities.walls[1][entities.walls[1].length-1].formBounder()
                game.placer[1].splice(index,1)
            }
        break
        case 86:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33){
                    entities.walls[1][a].pos=[1,0,2][ticker]
                    entities.players[entities.walls[1][a].index].pos=[1,0,2][ticker]
                    ticker++
                }
            }
            game.point=[-1,-1,-1]
        break
        case 87:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==31||entities.walls[1][a].type==33){
                    entities.walls[1][a].pos=[0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[0][ticker]
                    ticker++
                }
                if(entities.walls[1][a].type==74){
                    entities.walls[1][a].height-=60
                    entities.walls[1][a].bounder.height-=60
                    entities.walls[1][a].internalBounder.height-=60
                    entities.walls[1][a].position.y-=30
                    entities.walls[1][a].bounder.position.y-=30
                    entities.walls[1][a].internalBounder.position.y-=30
                    entities.walls[1][a].velocity.y=-30
                    for(let a=0,la=entities.walls[1][a].boundary.length;a<la;a++){
                        for(let b=0,lb=entities.walls[1][a].boundary[a].length;b<lb;b++){
                            for(let c=0,lc=entities.walls[1][a].boundary[a][b].length;c<lc;c++){
                                if(entities.walls[1][a].boundary[a][b][c].y>entities.walls[1][a].position.y){
                                    entities.walls[1][a].boundary[a][b][c].y-=60
                                }
                            }
                        }
                    }
                }
            }
        break
        case 89:
            if(game.pvp){
                game.firstGen=false
                let split=[[],[]]
                let possible=range(0,game.players)
                let typeList=[range(0,10),range(0,10),range(0,10)]
                for(let b=0,lb=2;b<lb;b++){
                    for(let a=0,la=game.players/3;a<la;a++){
                        let index=floor(random(0,possible.length))
                        split[b].push(possible[index])
                        possible.splice(index,1)
                    }
                }
                let loc=[]
                for(let c=0,lc=3;c<lc;c++){
                    for(let a=0,la=level.length;a<la;a++){
                        for(let b=0,lb=level[a].length;b<lb;b++){
                            if(level[a][b]=='qwe'[c]){
                                loc.push([(b+0.5)*game.tileset[0],(a+0.5)*game.tileset[1]])
                            }
                        }
                    }
                }
                let num=8
                let classPick=[floor(random(0,10)),floor(random(0,10)),floor(random(0,10))]
                let options=[
                    [0,...range(0,num-1),[0,...range(0,num-1)][floor(random(0,num))],[0,...range(0,num-1)][floor(random(0,num))]],
                    [0,...range(0,num-1),[0,...range(0,num-1)][floor(random(0,num))],[0,...range(0,num-1)][floor(random(0,num))]],
                    [0,...range(0,num-1),[0,...range(0,num-1)][floor(random(0,num))],[0,...range(0,num-1)][floor(random(0,num))]]
                ]
                for(let a=0,la=game.players;a<la;a++){
                    let team=split[1].includes(a)?2:split[0].includes(a)?1:0
                    entities.players[a].id=team+1
                    entities.players[a].setColor()
                    entities.players[a].base.position.x=loc[team][0]+random(-20,20)
                    entities.players[a].base.position.y=loc[team][1]
                    entities.players[a].position.x=loc[team][0]+random(-20,20)
                    entities.players[a].position.y=loc[team][1]
                    if(game.classWeapon){
                        if(game.weapon[0][0]==findName('PlayerClassWars',types.player)){
                            let index=floor(random(0,options[team].length))
                            entities.players[a].newWeaponSet(findName('PlayerScout',types.player)+classPick[team]+options[team][index]*10)
                            options[team].splice(index,1)
                        }else if(a<game.gaming){
                            entities.players[a].newWeaponSet(game.weapon[a][0])
                            if(typeList[team].includes((game.weapon[a][0]-findName('PlayerScout',types.player))%10)){
                                typeList[team].splice(typeList[team].indexOf((game.weapon[a][0]-findName('PlayerScout',types.player))%10),1)
                            }
                        }else{
                            let index=floor(random(0,typeList[team].length))
                            entities.players[a].newWeaponSet(findName('PlayerScout',types.player)+typeList[team][index]+[0,...range(0,num-1)][floor(random(0,num))]*10)
                            typeList[team].splice(index,1)
                        }
                    }
                }
                game.point=[1,2,3,-1,-1,-1]
            }else{
                game.point=[-1,-1,-1,-1,-1,-1]
            }
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==3){
                    entities.walls[1][a].position.x-=game.tileset[0]
                    entities.walls[1][a].width=[16][ticker]*game.tileset[0]
                    entities.walls[1][a].height=[3][ticker]*game.tileset[1]
                    ticker++
                }
            }
        break
        case 90:
            ticker=0
            for(let a=0,la=entities.walls[1].length;a<la;a++){
                if(entities.walls[1][a].type==3){
                    entities.walls[1][a].position.x-=game.tileset[0]
                    entities.walls[1][a].width=[16][ticker]*game.tileset[0]
                    entities.walls[1][a].height=[3][ticker]*game.tileset[1]
                    ticker++
                }
            }
        break
    }
    for(let c=0,lc=game.players;c<lc;c++){
        let playerLength=entities.players.length
        entities.players[c].initialWeapon()
        if(dm()&&!(game.level==73&&c==game.selected)){
            entities.players[c].weaponType=-1
            entities.players[c].weapon.uses=0
            if(game.level==73){
                entities.players[c].resetValues()
            }
        }else if(game.level==55&&c>0){
            entities.players[c].peace=true
        }
        if(entities.players[c].parachute&&entities.players.length>playerLength){
            for(let a=playerLength,la=entities.players.length;a<la;a++){
                entities.players[a].parachute=true
            }
        }
    }
}
function newLoop(){
    if(game.past){
        for(let a=0,la=entities.players.length;a<la;a++){
            entities.players[a].selector=0
            entities.players[a].control=1
            entities.players[a].respawn(true)
        }
    }
    switch(game.level){
        case 37:
            let possible=range(0,12)
            let selection=[]
            for(let a=0,la=3;a<la;a++){
                let index=floor(random(0,possible.length))
                selection.push(possible[index])
                possible.splice(index,1)
            }
            let level=[]
            for(let a=0,la=levels[game.level][0].length;a<la;a++){
                level.push(
                    levels[game.level][0][a].substr(0,15)+
                    levels[game.level][1+floor(selection[0]/3)][a].substr(15+(selection[0]%3)*56,55)+
                    levels[game.level][0][a].substr(70,1)+
                    levels[game.level][1+floor(selection[1]/3)][a].substr(15+(selection[1]%3)*56,55)+
                    levels[game.level][0][a].substr(126,1)+
                    levels[game.level][1+floor(selection[2]/3)][a].substr(15+(selection[2]%3)*56,a<25?54:55)+
                    levels[game.level][0][a].substr(a<25?181:182,a<25?19:18)
                )
            }
            generateLevel(level,graphics.main)
        break
        case 73:
            generateLevel(levels[36],graphics.main)
        break
        case 83:
            generateLevel(levels[82],graphics.main)
        break
        default:
            generateLevel(levels[game.level],graphics.main)
        break
    }
}
function newWave(){
    if(display.cycle>=types.mission[game.mission].wave.length){
        display.win=1
        if(display.wait<9999){
            display.wait=999999999999999
        }
        if(game.level!=37){
            game.classicRespawn=false
            game.pvp=true
            game.royale=true
            game.bust=false
            for(let a=0,la=game.players;a<la;a++){
                if(entities.players[a].life<=0){
                    entities.players[a].respawn()
                }
            }
            if(game.level!=6&&game.level!=7&&game.level!=8&&game.level!=17){
                for(let a=0,la=80;a<la;a++){
                    game.stack.push([floor(random(0,6))+6,['CelestialG','CelestialR','CelestialS','CelestialK','CelestialC','CelestialL','CelestialN','CelestialT'][a%8]])
                }
            }
        }
    }else{
        switch(game.level){
            case 8: case 17:
                entities.walls[1].forEach(wall=>wall.exploded=false)
            break
            case 29: case 37:
                entities.players=[]
                newLoop()
            break
            case 89:
                game.spawnPoint=floor(random(0,3))
            break
        }
        if(game.attacker){
            for(let a=0,la=entities.projectiles.length;a<la;a++){
                entities.projectiles.splice(a,1)
                a--
                la--
            }
            for(let a=game.players,la=entities.players.length;a<la;a++){
                if(entities.players[a].fort){
                    entities.players[a].life=0
                    entities.players[a].die.killer=-1
                }else{
                    entities.players.splice(a,1)
                    a--
                    la--
                }
            }
            for(let a=0,la=game.players;a<la;a++){
                entities.players[a].respawn()
            }
        }
        display.anim=1
        game.sendTime=0
        game.spawnIndex=0
        game.initial=true
        for(let a=0,la=types.mission[game.mission].wave[display.cycle].length;a<la;a++){
            let spy=types.mission[game.mission].wave[display.cycle][a][0]=='Spy'||
                types.mission[game.mission].wave[display.cycle][a][0]=='SpyHealSelf'||
                types.mission[game.mission].wave[display.cycle][a][0]=='RapidSpy'||
                types.mission[game.mission].wave[display.cycle][a][0]=='SpyTank'||
                types.mission[game.mission].wave[display.cycle][a][0]=='CritSpy'||
                types.mission[game.mission].wave[display.cycle][a][0]=='RevolverSpy'||
                types.mission[game.mission].wave[display.cycle][a][0]=='SpyHeal'||
                types.mission[game.mission].wave[display.cycle][a][0]=='HyperSpy'||
                types.mission[game.mission].wave[display.cycle][a][0]=='SlightlyFastSpy'||
                (game.level==79||game.level==82)&&floor(random(0,10))==0
            if(types.mission[game.mission].wave[display.cycle][a][0].includes('Boss')){
                game.stack.push([spy?-1:floor(random(0,6))+6,types.mission[game.mission].wave[display.cycle][a][0]])
            }else{
                for(let b=0,lb=ceil(types.mission[game.mission].wave[display.cycle][a][1]*(game.level==37?game.players*0.1+0.25:game.level==29?game.players*0.1+0.4:game.level==55?game.players*0.175+0.325:game.players*0.25+0.25)*(game.classicRespawn?1.25:1)*(game.level==7?0.6:1)*(game.level==8?(game.attacker?0.5:1.5):1)*(game.level==16?0.1:1)*(game.level==17?(game.attacker?0.4:1):1)*(game.level==19||game.level==31||game.level==42&&!game.pvp?2.5:1)*(game.level==29||game.level==37?(types.mission[game.mission].wave.length==1?0.3:1.8):1)*(game.level==32||game.level==33?1.2:1)*(game.level==42?0.5:1)*(game.peakWeapon?2:1)*(game.classWeapon?1.2:1)*game.diff);b<lb;b++){
                    game.stack.push([spy?-1:floor(random(0,6))+6,types.mission[game.mission].wave[display.cycle][a][0]])
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
function formatTime(frames){
    return `${floor(frames/3600)%60}:${floor(frames/60)%60<10?`0`:``}${floor(frames/60)%60}`
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
function checkEnd(level,layer,key){
    for(let a=0,la=game.det.length;a<la;a++){
        game.det[a]=floor(random(0,30))
    }
    if(game.newWave){
        newWave()
        game.newWave=false
    }else if(game.past){
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
    }else if(game.level==13){
        let fail=false
        for(let a=0,la=game.gaming;a<la;a++){
            if(game.weapon[a].length<3){
                fail=true
            }
        }
        if(!fail||game.peakWeapon){
            game.level=14
            entities.players=[]
            newLoop()
        }
    }else if(game.level==14){
        let fail=false
        for(let a=0,la=game.gaming;a<la;a++){
            if(game.weapon[a].length<4&&!game.peakWeapon||game.weapon[a].length<(game.mainline?1:2)){
                fail=true
            }
        }
        if(!fail){
            game.level=menu.level
            entities.players=[]
            if(game.level==29){
                newWave()
            }else{
                newLoop()
            }
        }
    }else if(game.level==43){
        let alive=0
        let winner=0
        for(let a=0,la=game.players;a<la;a++){
            if(entities.players[a].life>0){
                alive++
                winner=entities.players[a].id
            }
        }
        if(alive==1&&display.cycle<4){
            if(display.wait>0){
                display.wait--
            }else{
                for(let a=0,la=entities.projectiles.length;a<la;a++){
                    entities.projectiles[a].active=false
                }
                game.point.push(winner)
                if(game.placer[0].length>0){
                    entities.walls[1].push(new wall(graphics.main,game.placer[0][0][0],game.placer[0][0][1],game.tileset[1]*8,game.tileset[1]*4,33))
                    entities.walls[1][entities.walls[1].length-1].pos=display.cycle
                    entities.walls[1][entities.walls[1].length-1].set()
                    entities.walls[1][entities.walls[1].length-1].formBounder()
                    game.placer[0].splice(0,1)
                }
                if(display.cycle==3){
                    game.classicRespawn=true
                    for(let c=0,lc=game.players;c<lc;c++){
                        let max=game.edge[0]+game.edge[1]
                        let set=[0,0]
                        for(let a=0,la=entities.walls.length;a<la;a++){
                            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                if(
                                    entities.walls[a][b].type==33&&
                                    dist(entities.walls[a][b].position.x,entities.walls[a][b].position.y,entities.players[c].position.x,entities.players[c].position.y)<max&&
                                    (entities.walls[a][b].owner==entities.players[c].id||entities.walls[a][b].owner>0&&entities.players[c].id>0&&!game.pvp)
                                ){
                                    max=dist(entities.walls[a][b].position.x,entities.walls[a][b].position.y,entities.players[c].position.x,entities.players[c].position.y)
                                    set[0]=entities.walls[a][b].position.x
                                    set[1]=entities.walls[a][b].position.y
                                }
                            }
                        }
                        if(max<game.edge[0]+game.edge[1]){
                            entities.players[c].base.position.x=set[0]
                            entities.players[c].base.position.y=set[1]-40
                            entities.players[c].respawn()
                        }else{
                            let playerLength=entities.players.length
                            entities.players[c].base.position.x=game.edge[0]*random(0.4,0.6)
                            entities.players[c].base.position.y=0
                            entities.players[c].respawn()
                            entities.players[c].parachute=true
                            if(entities.players.length>playerLength){
                                for(let a=playerLength,la=entities.players.length;a<la;a++){
                                    entities.players[a].parachute=true
                                }
                            }
                        }
                    }
                }else{
                    shifter=floor(random(0,5))
                    for(let a=0,la=levels[game.level].length;a<la;a++){
                        for(let b=0,lb=levels[game.level][a].length;b<lb;b++){
                            for(let c=0,lc=game.players;c<lc;c++){
                                if(levels[game.level][a][b]==['67890','12345','ABCDE'][display.cycle][(c+shifter)%5]){
                                    entities.players[c].base.position.x=(b+0.5)*game.tileset[0]
                                    entities.players[c].base.position.y=(a+0.25)*game.tileset[1]
                                    entities.players[c].respawn()
                                }
                            }
                        }
                    }
                }
                display.cycle++
                display.wait=120
            }
        }else if(alive==0&&display.cycle<4){
            if(display.wait>0){
                display.wait--
            }else{
                for(let a=0,la=entities.projectiles.length;a<la;a++){
                    entities.projectiles[a].active=false
                }
                for(let c=0,lc=game.players;c<lc;c++){
                    entities.players[c].respawn()
                }
            }
        }
    }else if(game.level==48||game.level==57||game.level==80){
        let fail=false
        for(let a=0,la=game.gaming;a<la;a++){
            if(game.weapon[a].length<1){
                fail=true
            }
        }
        if(!fail){
            game.level=menu.level
            entities.players=[]
            if(game.level==29){
                newWave()
            }else{
                newLoop()
            }
        }
    }else{
        if(game.level==8){
            if((deployer.spawn.length>=5||game.stack.length==0&&deployer.spawn.length>=1)&&deployer.timer<=0){
                for(let a=0,la=level.length;a<la;a++){
                    for(let b=0,lb=level[a].length;b<lb;b++){
                        if(level[a][b]=='A'){
                            entities.walls[1].splice(0,0,new wall(graphics.main,game.tileset[0]/2+(b-7)*game.tileset[0],game.tileset[1]/2+(a+1.7)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,6))
                            entities.walls[1].splice(0,0,new wall(graphics.main,game.tileset[0]/2+(b-3)*game.tileset[0],game.tileset[1]/2+(a+1.7)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,6))
                            entities.walls[1].splice(0,0,new wall(graphics.main,game.tileset[0]/2+(b-5)*game.tileset[0],game.tileset[1]/2+(a+2.4)*game.tileset[1],game.tileset[0]*5,game.tileset[1],6))
                            for(let a=0,la=3;a<la;a++){
                                entities.walls[1][a].formBoundary()
                                entities.walls[1][a].checkRedundancy()
                                entities.walls[1][a].checkOverlay()
                                entities.walls[1][a].set()
                                entities.walls[1][a].checkGap()
                                entities.walls[1][a].checkBar()
                                entities.walls[1][a].formBounder()
                            }
                            let tick=0
                            while(deployer.spawn.length>0){
                                if(tick>=5){
                                    break
                                }
                                entities.players.push(deployer.spawn[0])
                                entities.players[entities.players.length-1].position.x=game.tileset[0]/2+(b-5)*game.tileset[0]+50-tick*25
                                entities.players[entities.players.length-1].position.y=game.tileset[1]/2+(a+1.8)*game.tileset[1]-50
                                entities.players[entities.players.length-1].disable=true
                                entities.walls[1][0].carry.push(entities.players[entities.players.length-1])
                                tick++
                                deployer.spawn.splice(0,1)
                            }
                            deployer.timer=game.classicRespawn?150:240
                        }
                    }4
                }
            }
            if(deployer.timer>0){
                deployer.timer--
            }
        }else if(game.level==16){
            if(deployer.spawn.length>=3||game.stack.length==0&&deployer.spawn.length>=1){
                let position=random(40,game.edge[0]-40)
                let falling=game.edge[1]
                for(let a=0,la=100;a<la;a++){
                    let hit=false
                    for(let b=0,lb=game.gaming;b<lb;b++){
                        if(
                            position>entities.players[b].position.x-(3500-500*game.gaming)&&position<entities.players[b].position.x+(3500-500*game.gaming)||
                            position>entities.players[b].position.x+game.edge[0]-(3500-500*game.gaming)&&position<entities.players[b].position.x+game.edge[0]+(3500-500*game.gaming)||
                            position>entities.players[b].position.x-game.edge[0]-(3500-500*game.gaming)&&position<entities.players[b].position.x-game.edge[0]+(3500-500*game.gaming)
                        ){
                            hit=true
                            position=random(40,game.edge[0]-40)
                            b=lb
                        }
                    }
                    if(!hit){
                        a=la
                    }
                }
                for(let a=0,la=entities.walls.length;a<la;a++){
                    for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                        let c=entities.walls[a][b]
                        if(c.position.x+c.width/2>position-50&&c.position.x-c.width/2<position+50&&c.standard){
                            falling=min(falling,c.position.y-c.height/2)
                        }
                    }
                }
                let tick=0
                while(deployer.spawn.length>0){
                    if(tick>=3){
                        break
                    }
                    entities.players.push(deployer.spawn[0])
                    entities.players[entities.players.length-1].position.x=position+random(-40,40)
                    entities.players[entities.players.length-1].position.y=falling-50
                    tick++
                    deployer.spawn.splice(0,1)
                }
            }
            if(deployer.timer>0){
                deployer.timer--
            }else{
                deployer.timer=floor(random(3600,7200))
            }
            if(deployer.timer==1){
                if(floor(random(0,2))==0){
                    deployer.position=random(0,game.edge[0]*0.2)
                    deployer.speed=random(100,150)
                    deployer.flip=true
                }else{
                    deployer.position=random(game.edge[0]*0.8,game.edge[0])
                    deployer.speed=-random(100,150)
                    deployer.flip=true
                }
                deployer.interval=3
            }
            if(deployer.position>0&&deployer.position<game.edge[0]&&deployer.interval==0){
                if(deployer.flip){
                    entities.projectiles.push(new projectile(graphics.main[0],deployer.position,0,60,0,0,100,600,false,-1))
                    entities.projectiles[entities.projectiles.length-1].velocity.x=random(-3,3)
                    entities.projectiles[entities.projectiles.length-1].velocity.y=0
                    deployer.position+=deployer.speed*random(0.8,1.2)
                    deployer.interval=floor(random(2,5))
                }
                deployer.flip=floor(random(0,20))?!deployer.flip:deployer.flip
            }
            if(deployer.interval>0){
                deployer.interval--
            }
            if(deployer.artillery[0]>0){
                deployer.artillery[0]--
            }else{
                for(let e=0,le=30;e<le;e++){
                    entities.projectiles.push(new projectile(graphics.main[0],0,game.edge[1]-1250,60,random(-157.5,-112.5),0,100,600,false,-1))
                    let mult=random(1,5)
                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult*2
                }
                deployer.artillery[0]=floor(random(3600,7200))
            }
            if(deployer.artillery[1]>0){
                deployer.artillery[1]--
            }else{
                for(let e=0,le=30;e<le;e++){
                    entities.projectiles.push(new projectile(graphics.main[0],game.edge[0],game.edge[1]-1250,60,random(112.5,157.5),0,100,600,false,-1))
                    let mult=random(1,5)
                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult*2
                }
                deployer.artillery[1]=floor(random(3600,7200))
            }
            if(deployer.artillery[2]>0){
                deployer.artillery[2]--
            }else{
                for(let e=0,le=30;e<le;e++){
                    entities.projectiles.push(new projectile(graphics.main[0],game.edge[0]/2,game.edge[1]-1250,60,random(-157.5,-112.5),0,100,600,false,-1))
                    let mult=random(1,5)
                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult*2
                }
                deployer.artillery[2]=floor(random(3600,7200))
            }
            if(deployer.artillery[3]>0){
                deployer.artillery[3]--
            }else{
                for(let e=0,le=30;e<le;e++){
                    entities.projectiles.push(new projectile(graphics.main[0],game.edge[0]/2,game.edge[1]-1250,60,random(112.5,157.5),0,100,600,false,-1))
                    let mult=random(1,5)
                    entities.projectiles[entities.projectiles.length-1].velocity.x*=mult
                    entities.projectiles[entities.projectiles.length-1].velocity.y*=mult*2
                }
                deployer.artillery[3]=floor(random(3600,7200))
            }
        }else if(game.level==17){
            if(deployer.timer<=0){
                for(let a=0,la=level.length;a<la;a++){
                    for(let b=0,lb=level[a].length;b<lb;b++){
                        if(level[a][b]=='1'){
                            entities.walls[1].splice(0,0,new wall(graphics.main,game.tileset[0]/2+(b-7)*game.tileset[0],game.tileset[1]/2+(a+1.8)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,6))
                            entities.walls[1].splice(0,0,new wall(graphics.main,game.tileset[0]/2+(b-3)*game.tileset[0],game.tileset[1]/2+(a+1.8)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,6))
                            entities.walls[1].splice(0,0,new wall(graphics.main,game.tileset[0]/2+(b-5)*game.tileset[0],game.tileset[1]/2+(a+2.5)*game.tileset[1],game.tileset[0]*5,game.tileset[1],6))
                            for(let a=0,la=3;a<la;a++){
                                entities.walls[1][a].formBoundary()
                                entities.walls[1][a].checkRedundancy()
                                entities.walls[1][a].checkOverlay()
                                entities.walls[1][a].set()
                                entities.walls[1][a].checkGap()
                                entities.walls[1][a].checkBar()
                                entities.walls[1][a].formBounder()
                            }
                            deployer.timer=480
                        }
                    }
                }
            }
            if(deployer.timer>0){
                deployer.timer--
            }
        }else if(game.level==22||game.level==40){
            for(let a=0,la=game.point.length;a<la;a++){
                if(!game.point[a]&&game.pointAnim[a]<1){
                    game.pointAnim[a]+=1/300
                }
            }
        }else if(game.level==25){
            for(let a=0,la=game.point.length;a<la;a++){
                if(!game.point[a]&&game.pointAnim[a]<1){
                    game.pointAnim[a]+=a==0?1/600:0.1
                }else if(game.point[a]&&game.pointAnim[a]>0){
                    game.pointAnim[a]-=a==0?1/600:0.1
                }
                game.pointAnim[a]=constrain(game.pointAnim[a],0,1)
            }
            game.water=game.tileset[1]*(53.5-game.pointAnim[0]*19)
        }else if(game.level==26){
            if(!game.waterTick&&game.pointAnim[0]<1){
                game.pointAnim[0]+=1/600
            }else if(game.waterTick&&game.pointAnim[0]>0){
                game.pointAnim[0]-=1/600
            }
            game.water=game.tileset[1]*(34.5+game.pointAnim[0]*19)
        }else if(game.level==28){
            if(game.time%3600==0){
                entities.players.push(new player(graphics.main,random(100,game.edge[0]-100),0,-1,0,[],false,findName('ConstructGust',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].constructify()
            }
            if(game.time%600==0){
                game.stack.push([-1,'HyperSpy'])
            }
        }else if(game.level==33||game.level==63){
            let total=0
            for(let a=0,la=entities.players.length;a<la;a++){
                if(!entities.players[a].fort&&entities.players[a].position.x<400&&entities.players[a].id==0&&entities.players[a].life>0){
                    total++
                }
            }
            if(total>=6+game.players*6&&deployer.timer==0){
                deployer.timer=900
            }
            if(deployer.timer>0){
                deployer.timer--
            }
        }else if(game.level==39){
            if(game.time%2==0){
                entities.projectiles.push(new projectile(graphics.main[0],random(150,game.edge[0]-150),0,336,random(-10,10)+180,-1,10,2400,false,-1))
                entities.projectiles[entities.projectiles.length-1].speed*=0.3
            }
            if(game.time%6==0&&game.time%2400<300){
                entities.projectiles.push(new projectile(graphics.main[0],-50,game.tileset[1]*random(25,35),335,random(-4,4)+90,-1,0.5,2400,false,-1))
            }
            if(game.time%6==0&&game.time%3000<1200&&game.time%3000>=900){
                entities.projectiles.push(new projectile(graphics.main[0],game.edge[0]+50,game.tileset[1]*random(25,35),335,random(-4,4)-90,-1,0.5,2400,false,-1))
            }
        }else if(game.level==44||game.level==65){
            if(game.respawners[0]>=game.players/8&&game.point[0]==1){
                for(let a=0,la=entities.players.length;a<la;a++){
                    if(entities.players[a].id==1&&(entities.players[a].die.timer>480||entities.players[a].die.timer>240&&game.point[1]==1||entities.players[a].die.timer>120&&game.point[3]==1)&&entities.players[a].life<=0){
                        entities.players[a].respawn()
                    }
                }
            }
            if(game.respawners[1]>=game.players/8&&game.point[4]==2){
                for(let a=0,la=entities.players.length;a<la;a++){
                    if(entities.players[a].id==2&&(entities.players[a].die.timer>480||entities.players[a].die.timer>240&&game.point[3]==2||entities.players[a].die.timer>120&&game.point[1]==2)&&entities.players[a].life<=0){
                        entities.players[a].respawn()
                    }
                }
            }
            game.respawners[0]=0
            game.respawners[1]=0
        }else if(game.level==49){
            for(let a=0,la=game.point.length;a<la;a++){
                if(game.point[a]==0&&game.pointAnim[a]<1){
                    game.pointAnim[a]+=0.01
                }else if(game.point[a]!=0&&game.pointAnim[a]>0){
                    game.pointAnim[a]-=0.01
                }
                game.pointAnim[a]=constrain(game.pointAnim[a],0,1)
            }
            game.water=game.tileset[1]*(53.5-game.pointAnim[0]*19)
        }else if(game.level==62){
            if(game.time%1800>=1080){
                for(let a=0,la=3;a<la;a++){
                    entities.projectiles.push(new projectile(graphics.main[0],random(150,game.edge[0]-150),600,336,random(-10,10)+180,-1,10,2400,false,-1))
                    entities.projectiles[entities.projectiles.length-1].speed*=0.6
                }
            }
        }else if(game.level==77){
            if(game.respawners[0]>=game.players/12&&game.point[0]==1){
                for(let a=0,la=entities.players.length;a<la;a++){
                    if(entities.players[a].id==1&&entities.players[a].life<=0){
                        if(entities.players[a].die.timer>(game.point[1]==1?270:540)){
                            entities.players[a].respawn()
                        }else{
                            entities.players[a].die.timer-=game.point[1]==1?180:270
                        }
                    }
                }
            }
            if(game.respawners[1]>=game.players/12&&game.point[6]==2){
                for(let a=0,la=entities.players.length;a<la;a++){
                    if(entities.players[a].id==2&&entities.players[a].life<=0){
                        if(entities.players[a].die.timer>(game.point[5]==2?270:540)){
                            entities.players[a].respawn()
                        }else{
                            entities.players[a].die.timer-=game.point[5]==2?180:270
                        }
                    }
                }
            }
            game.respawners[0]=0
            game.respawners[1]=0
        }
        let temp=[]
        for(let a=0,la=game.spawner.length;a<la;a++){
            temp.push(game.spawner[a])
        }
        if(game.sendTime>0){
            game.sendTime--
        }else if(game.stack.length>0&&!game.assault&&!game.nuke){
            let temp=[]
            for(let a=0,la=game.spawner.length;a<la;a++){
                temp.push(game.spawner[a])
            }
            let dispose=true
            for(let g=0,lg=10;g<lg;g++){
                if(game.stack.length>0&&game.stack[0][1]!='Wait'){
                    if(game.level==42&&game.pvp){
                        deployer.spawn.push(new player(layer,0,0,0,0,[],true,findName(game.stack[0][1],types.player),game.index))
                        game.index++
                        game.spawnIndex++
                    }else if(game.stack[0][0]==-2){
                        let pos=game.stack[0][2]
                        let fail=false
                        for(let a=0,la=game.gaming;a<la;a++){
                            if(
                                dist(pos[0],pos[1],entities.players[a].position.x,entities.players[a].position.y)<graphics.main[a].width*key[a]+50||
                                dist(pos[0],pos[1],entities.players[a].base.position.x,entities.players[a].base.position.y)<graphics.main[a].height*key[a]+50
                            ){
                                fail=true
                            }
                        }
                        if(!fail){
                            entities.players.push(new player(layer,pos[0],pos[1]-60,0,0,[],true,findName(game.stack[0][1],types.player),game.index))
                            game.index++
                            game.spawnIndex++
                        }else{
                            game.stack.push(game.stack[0])
                            game.stack.splice(0,1)
                            g=lg
                            dispose=false
                        }
                    }else if(game.stack[0][0]==-1||game.attacker||game.level==29&&game.initial||game.level==37){
                        let index=floor(random(0,temp.length))
                        let pos=temp[index]
                        let spam=0
                        let fail=true
                        if(game.level==29||game.level==37){
                            while(fail&&spam<100){
                                index=floor(random(0,temp.length))
                                pos=temp[index]
                                spam++
                                fail=false
                                let cut=game.level==37?800:1000
                                if(pos[0]<cut||pos[0]>game.edge[0]-cut){
                                    fail=true
                                }
                            }
                        }else{
                            while(fail&&spam<100){
                                index=floor(random(0,temp.length))
                                pos=temp[index]
                                spam++
                                fail=false
                                for(let a=0,la=game.gaming;a<la;a++){
                                    if(
                                        dist(pos[0],pos[1],entities.players[a].position.x,entities.players[a].position.y)<graphics.main[a].width*0.5*key[a]+50
                                    ){
                                        fail=true
                                    }
                                }
                            }
                        }
                        if(spam<100){
                            entities.players.push(new player(layer,pos[0],pos[1]-60,0,0,[],true,findName(game.stack[0][1],types.player),game.index))
                            game.index++
                            game.spawnIndex++
                            temp.splice(index,1)
                        }
                    }else{
                        let key=game.level==89?'qwe'[game.spawnPoint]:
                            game.level==70||game.level==84?'ABC'[floor(random(0,3))]:
                            game.level==55?'AB'[floor(random(0,1.25))]:
                            game.level==34||game.level==54||game.level==58||game.level==59||game.level==63||game.level==66||game.level==68||game.level==69||game.level==87?'A':
                            game.level==79||game.level==82||game.level==83||game.level==85||game.level==86?'AB'[game.stack[0][0]%2]:
                            '123456ABCDEF'[game.stack[0][0]]
                        for(let a=0,la=level.length;a<la;a++){
                            for(let b=0,lb=level[a].length;b<lb;b++){
                                if(level[a][b]==key){
                                    if((a>5||floor(random(0,2))==0&&types.player[findName(game.stack[0][1],types.player)].sizeBuff>=1.5)&&game.stack[0][0]>=6&&game.level==8||game.level==16){
                                        deployer.spawn.push(new player(layer,game.tileset[0]/2+b*game.tileset[0]+random(-20,20),game.tileset[1]/2+a*game.tileset[1],0,0,[],true,findName(game.stack[0][1],types.player),game.index))
                                        game.index++
                                        game.spawnIndex++
                                    }else{
                                        entities.players.push(new player(layer,(game.level==55?0:game.tileset[0]/2+random(-20,20))+b*game.tileset[0],(game.level==89?0:game.tileset[1]/2)+a*game.tileset[1],0,0,[],true,findName(game.stack[0][1],types.player),game.index))
                                        if(game.level==6||game.level==24||game.level==39&&game.pvp){
                                            entities.players[entities.players.length-1].position.x=floor(random(0,game.edge[0]))
                                            entities.players[entities.players.length-1].position.y=0
                                            entities.players[entities.players.length-1].parachute=true
                                        }else if(game.level==8){
                                            entities.players[entities.players.length-1].position.x=[entities.players[floor(random(0,game.players))].position.x+random(-240,360),random(450,entities.players[floor(random(0,game.players))].position.x+600)][floor(random(0,2))]
                                            entities.players[entities.players.length-1].position.y=1000
                                            entities.players[entities.players.length-1].parachute=true
                                        }else if(game.level==17&&a<=5){
                                            entities.players[entities.players.length-1].position.x=[max(1000,entities.players[floor(random(0,game.players))].position.x+random(-240,240)),random(entities.players[floor(random(0,game.players))].position.x,game.edge[0])][floor(random(0,2))]
                                            entities.players[entities.players.length-1].position.y=1000
                                            entities.players[entities.players.length-1].parachute=true
                                        }else if((game.level==19||game.level==42)&&floor(random(0,6))==0){
                                            entities.players[entities.players.length-1].position.x=game.edge[0]/2+random(-800,800)
                                            entities.players[entities.players.length-1].position.y=0
                                            entities.players[entities.players.length-1].parachute=true
                                        }else if((game.level==25||game.level==26||game.level==27)&&a<=5){
                                            entities.players[entities.players.length-1].position.x=random(500,game.edge[0]-500)
                                            entities.players[entities.players.length-1].position.y=0
                                            entities.players[entities.players.length-1].parachute=true
                                        }else if((game.level==30||game.level==40)&&a<=5||(game.level==35||game.level==79||game.level==82)&&floor(random(0,10))==0){
                                            entities.players[entities.players.length-1].position.x=game.edge[0]*random(0.1,0.9)
                                            entities.players[entities.players.length-1].position.y=0
                                            entities.players[entities.players.length-1].parachute=true
                                        }else if(game.level==31&&a<=5){
                                            entities.players[entities.players.length-1].position.x=game.edge[0]*random(0.1,0.7)
                                            entities.players[entities.players.length-1].position.y=0
                                            entities.players[entities.players.length-1].parachute=true
                                        }
                                        game.index++
                                        game.spawnIndex++
                                    }
                                }
                            }
                        }
                    }
                }
                let total=0
                for(let a=0,la=entities.players.length;a<la;a++){
                    if(!entities.players[a].fort){
                        if(entities.players[a].id==0&&entities.players[a].life>0){
                            total++
                        }
                    }
                }
                game.sendTime=game.attacker||game.level==29&&game.initial||game.level==37?0:
                    types.mission[game.mission].sendTime*2.75/game.diff/
                    max(1,(game.level==55?game.players*0.175+0.325:game.players*0.5+0.5))*
                    (game.classicRespawn?0.8:1)*
                    (
                        game.pvp?(game.level==23||game.level==54?2.5:
                            game.level==19||game.level==26||game.level==30||game.level==31||game.level==33||game.level==49||game.level==63||game.level==69?5:
                            game.level==4?6:20):
                            1
                    )*
                    (game.peakWeapon?0.5:1)*
                    (game.classWeapon?0.875:1)*
                    (game.mission==findName('Survival Lite',types.mission)||game.mission==findName('Survival',types.mission)?1/(6+display.cycle*2):1)*
                    (game.level==7?3:1)*
                    (game.level==15||game.level==18?(game.spawnIndex%6==0?5:0.5):1)*
                    (game.level==16&&game.spawnIndex>10?4:1)*
                    (game.level==17?2:1)*
                    ((game.level==20||game.level==21)&&game.spawnIndex>5?2:1)*
                    (game.level==19||game.level==42&&!game.pvp?0.625:1)*
                    (game.level==22?constrain(0.75+0.025*total,1,1.5):1)*
                    (game.level==25?constrain(0.4+0.02*total,0.8,1):1)*
                    (game.level==27?0.9:1)*
                    (game.level==32?0.875:1)*
                    (game.level==33||game.level==87?1.25:1)*
                    (game.level==34?0.925:1)*
                    (game.level==30&&game.spawnIndex<20?0.4:1)*
                    (game.level==40?0.875:1)*
                    (game.level==47||game.level==70||game.level==84?1.15:1)*
                    (game.level==49?1.3:1)*
                    (game.level==55?1.125:1)*
                    (game.level==58||game.level==63||game.level==66?1.175:1)*
                    (game.level==59||game.level==83||game.level==85?1.2:1)*
                    (game.level==68?1.35:1)*
                    (game.level==79||game.level==82?2:1)
                if(dispose){
                    game.stack.splice(0,1)
                }
                if(game.stack.length==0&&game.initial){
                    game.initial=false
                }
                if(game.sendTime!=0){
                    g=lg
                }
            }
        }else if(game.level==42&&deployer.spawn.length>0){
            let loc=[0,0]
            if(floor(random(0,3))==0){
                loc[0]=game.edge[0]*random(1/3,2/3)
                loc[1]=0
            }else{
                let key='qy'[floor(random(0,2))]
                for(let a=0,la=levels[42].length;a<la;a++){
                    for(let b=0,lb=levels[42][a].length;b<lb;b++){
                        if(levels[42][a][b]==key){
                            loc[0]=game.tileset[0]*(b+0.5)
                            loc[1]=game.tileset[1]*a
                            a=la
                            b=lb
                        }
                    }
                }
            }
            for(let a=0,la=deployer.spawn.length;a<la;a++){
                entities.players.push(deployer.spawn[a])
                entities.players[entities.players.length-1].position.x=loc[0]+(loc[1]==0?random(-200,200):random(-50,50))
                entities.players[entities.players.length-1].position.y=loc[1]+(loc[1]==0?random(-500,0):0)
                entities.players[entities.players.length-1].stuckTime=random(0,300)
                if(loc[1]==0){
                    entities.players[entities.players.length-1].parachute=true
                }
                deployer.spawn.splice(a,1)
                a--
                la--
            }
        }else{
            if(game.level==29){
                if(game.time%30==0){
                    let win=true
                    for(let a=0,la=game.point.length;a<la;a++){
                        if(game.point[a]==0){
                            win=false
                            a=la
                        }
                    }
                    if(win){
                        for(let a=0,la=entities.players.length;a<la;a++){
                            if(entities.players[a].id>0&&entities.players[a].id<=game.gaming&&!entities.players[a].construct&&!entities.players[a].sidekick&&!entities.players[a].fort&&!entities.players[a].auto){
                                if(!(entities.players[a].position.x<500||entities.players[a].position.x>game.edge[0]-500||entities.players[a].position.y<250&&!entities.players[a].parachute&&entities.players[a].velocity.y<4)){
                                    win=false
                                }
                            }
                        }
                    }
                    if(win||display.cycle==0){
                        display.wait-=60
                        if(display.wait<=0){
                            display.wait=240
                            newWave()
                        }
                    }
                }
            }else if(game.level!=37){
                let total=0
                let subTotal=0
                for(let a=0,la=entities.players.length;a<la;a++){
                    if(!entities.players[a].fort&&entities.players[a].playerData.name!='Buster'){
                        if(entities.players[a].id==0&&entities.players[a].life>0){
                            total++
                        }
                        if(entities.players[a].id==0&&entities.players[a].base.life>2000){
                            subTotal++
                        }
                    }
                }
                if((total<(game.level==23?((1+game.players)*(game.peakWeapon?7.5:5)):(game.attacker?1:4))&&(subTotal==0||game.level==23)||game.level==33||game.level==63)&&!(display.cycle==types.mission[game.mission].wave.length&&total>0)){
                    if(!(game.point[4]==0&&game.level==23)){
                        display.wait--
                    }
                    if(display.wait<=0){
                        display.wait=game.level==23?1200:240
                        if(!game.perpetual&&!game.nuke&&!((game.level==27||game.level==28||game.level==38||game.level==43||teamMode()||dm())&&game.pvp)){
                            newWave()
                        }
                    }
                }
            }
        }
    }
}
function kill(index){
    entities.players[index].life=0
    entities.players[index].collect.time=1200
    entities.players[index].die.killer=0
}
function killFree(index){
    entities.players[index].life=0
    entities.players[index].collect.time=1200
    entities.players[index].die.killer=entities.players[entities.players.length-1].index
}
function setupGraphics(){
    setupBase()
    setupMinor()
    setupTrig()
}
function initialGraphics(){
    if(
        menu.level==19||menu.level==22||menu.level==23||menu.level==24||menu.level==25||menu.level==26||menu.level==27||menu.level==28||menu.level==29||menu.level==30||
        menu.level==31||menu.level==32||menu.level==33||menu.level==34||menu.level==35||menu.level==36||menu.level==37||menu.level==38||menu.level==39||menu.level==40||
        menu.level==41||menu.level==42||menu.level==43||menu.level==44||menu.level==45||menu.level==47||menu.level==49||menu.level==50||menu.level==51||menu.level==52||
        menu.level==53||menu.level==54||menu.level==55||menu.level==56||menu.level==58||menu.level==59||menu.level==60||menu.level==61||menu.level==62||menu.level==63||
        menu.level==64||menu.level==65||menu.level==67||menu.level==68||menu.level==69||menu.level==70||menu.level==71||menu.level==72||menu.level==73||menu.level==74||
        menu.level==75||menu.level==76||menu.level==77||menu.level==78||menu.level==79||menu.level==81||menu.level==82||menu.level==83||menu.level==84||menu.level==85||
        menu.level==86||menu.level==87||menu.level==88||menu.level==89||menu.level==90||menu.level==91||menu.level==92||menu.level==93
    ){
        graphics.overlay.push(createGraphics(width,200))
    }
    if(game.gaming==1){
        graphics.main.push(createGraphics(width,height))
        if(game.flash||menu.level==79||menu.level==82){
            graphics.overlay.push(createGraphics(width,height))
        }
    }else if(game.gaming==2){
        graphics.main.push(createGraphics(width/2,height))
        graphics.main.push(createGraphics(width/2,height))
        if(game.flash||menu.level==79||menu.level==82){
            graphics.overlay.push(createGraphics(width/2,height))
            graphics.overlay.push(createGraphics(width/2,height))
        }
    }else if(game.gaming==5){
        for(let a=0,la=5;a<la;a++){
            graphics.main.push(createGraphics(width/3,height/2))
        }
        if(game.flash||menu.level==79||menu.level==82){
            for(let a=0,la=5;a<la;a++){
                graphics.overlay.push(createGraphics(width/3,height/2))
            }
        }
    }else{
        graphics.main.push(createGraphics(width/2,height/2))
        graphics.main.push(createGraphics(width/2,height/2))
        graphics.main.push(createGraphics(width/2,height/2))
        if(game.gaming==4){
            graphics.main.push(createGraphics(width/2,height/2))
        }
        if(game.flash||menu.level==79||menu.level==82){
            graphics.overlay.push(createGraphics(width/2,height/2))
            graphics.overlay.push(createGraphics(width/2,height/2))
            graphics.overlay.push(createGraphics(width/2,height/2))
            if(game.gaming==4){
                graphics.overlay.push(createGraphics(width/2,height/2))
            }
        }
    }
    for(let a=0,la=graphics.main.length;a<la;a++){
        setupLayer(graphics.main[a])
        graphics.main[a].index=a
    }
    for(let a=0,la=graphics.overlay.length;a<la;a++){
        setupLayer(graphics.overlay[a])
    }
}
function setupMinor(){
    graphics.minor=[
        createGraphics(10,20),
        createGraphics(10,20)
    ]
    for(let a=0,la=graphics.minor.length;a<la;a++){
        setupLayer(graphics.minor[a])
        graphics.minor[a].translate(graphics.minor[a].width*0.5,graphics.minor[a].height*0.5)
    }
    for(let a=0,la=2;a<la;a++){
        let layer=graphics.minor[a]
        layer.fill(240-a*200,240,40+a*200)
        layer.rect(0,4,1,8)
        layer.fill(240-a*200,160,40+a*200)
        layer.rect(0,3,1,6)
        layer.fill(240-a*200,80,40+a*200)
        layer.rect(0,2,1,4)
        layer.fill(250)
        layer.ellipse(0,0,3)
    }
}
function setupTrig(){
	for(let a=0,la=360;a<la;a++){
		constants.trig[0].push(sin(a/2))
		constants.trig[1].push(cos(a/2))
		if(abs(constants.trig[0][a])<0.001){
			constants.trig[0][a]=0
		}
		if(abs(constants.trig[1][a])<0.001){
			constants.trig[1][a]=0
		}
	}
	for(let a=0,la=360;a<la;a++){
		constants.trig[0].push(-constants.trig[0][a])
		constants.trig[1].push(-constants.trig[1][a])
	}
}
function lsin(direction){
	return constants.trig[0][floor(((direction+0.25)%360+360)%360*2)]
}
function lcos(direction){
	return constants.trig[1][floor(((direction+0.25)%360+360)%360*2)]
}
function outWalls(){
    let totals=[[],[]]
    for(let a=0,la=60;a<la;a++){
        for(let b=0,lb=totals.length;b<lb;b++){
            totals[b].push(0)
        }
    }
    for(let a=0,la=entities.walls.length;a<la;a++){
        for(let b=0,lb=entities.walls[a].length;b<lb;b++){
            totals[a][entities.walls[a][b].type]++
        }
    }
    print(totals[0])
    print(totals[1])
}
function generateMission(wave,simplify){
    for(let a=0,la=wave.length;a<la;a++){
        let goal=la==100?8+a*2:15+a*5
        let divide=[round(random(goal*0.1,goal*0.2)),0]
        divide[1]=goal-divide[0]
        let bar=findName('Wait',types.player)+1
        let mixer=[]
        while(divide[0]>0){
            let type=floor(random(bar,types.player.length))
            while(
                types.player[type].lifeBuff<=5||types.player[type].name.includes('Damaged')||types.player[type].name.includes('Boss')||
                simplify&&(types.player[type].name.length>=20||types.player[type].weapon>400||types.player[type].name.includes('Splitter'))
            ){
                type=floor(random(bar,types.player.length))
            }
            let num=floor(random(game.players==1?1:2,min(5,ceil(divide[0]*1.5))))
            mixer.push([types.player[type].name,num])
            divide[0]-=num
        }
        while(divide[1]>0){
            let type=floor(random(bar,types.player.length))
            while(
                types.player[type].lifeBuff>5||types.player[type].name.includes('Damaged')||types.player[type].name.includes('Boss')||
                simplify&&(types.player[type].name.length>=20||types.player[type].weapon>400||types.player[type].name.includes('Splitter'))
            ){
                type=floor(random(bar,types.player.length))
            }
            let num=floor(random(2,min(11,ceil(divide[1]*1.5))))
            mixer.push([types.player[type].name,num])
            divide[1]-=num
        }
        if(a%10==9){
            for(let b=0,lb=floor((a+1)/10);b<lb;b++){
                let possible=[]
                for(let c=0,lc=types.player.length;c<lc;c++){
                    if(types.player[c].name.includes('Boss')){
                        possible.push(c)
                    }
                }
                type=possible[floor(random(0,possible.length))]
                mixer.push([types.player[type].name,1])
            }
        }
        while(mixer.length>0){
            let index=floor(random(0,mixer.length))
            wave[a].push(mixer[index])
            mixer.splice(index,1)
        }
    }
}
function compileMission(wave){
    for(let a=0,la=wave.length;a<la;a++){
        let goal=15+a*5
        let templateMission=types.mission[floor(random(0,types.mission.length))]
        while(templateMission.wave[0].length==0||templateMission.wave.length<=1){
            templateMission=types.mission[floor(random(0,types.mission.length))]
        }
        let template=templateMission.wave[floor(random(0,templateMission.wave.length))]
        wave[a]=shuffleArray(template)
        let total=0
        let possible=[]
        for(let b=0,lb=wave[a].length;b<lb;b++){
            total+=wave[a][b][1]
            for(let c=0,lc=wave[a][b][1];c<lc;c++){
                possible.push(b)
            }
        }
        while(total>goal){
            let selection=possible[floor(random(0,possible.length))]
            if(wave[a][selection][1]>1){
                wave[a][selection][1]--
            }
            total--
        }
        while(total<goal){
            let selection=possible[floor(random(0,possible.length))]
            wave[a][selection][1]++
            total++
        }
    }
}
function setupLists(){
    listing[0]=[...safeRange(0,findName('PlayerPanicShotgun',types.player)),...safeRange(0,10)]
    listing[1]=safeRange(findName('PlayerPanicShotgun',types.player),findName('PlayerTripleAuto',types.player)/*485,500*/)
    listing[2]=safeRange(0,10)
    listing[3]=[
        ...safeRange(findName('PlayerScout',types.player),findName('PlayerGun',types.player)),
        ...safeRange(findName('PlayerScout',types.player),findName('PlayerScout2',types.player)),
        ...safeRange(findName('PlayerScout',types.player),findName('PlayerScout2',types.player))
    ]
    //listing[1]=listing[1].filter(item=>types.player[item].weapon>=536)
    if(game.nuke){
        listing[1]=[findName('PlayerGuidedMissile',types.player)]
    }

    menu.list=[[],[],[],[],[],[]]
    for(let a=0,la=types.mission.length;a<la;a++){
        menu.list[types.mission[a].difficulty].push(a)
    }
}
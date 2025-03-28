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
        intersect(corners[3],corners[0],triangle[2],triangle[0])
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
    for(let a=0,la=static.boundary.length;a<la;a++){
        for(let b=0,lb=static.boundary[a].length;b<lb;b++){
            if(a<=3){
                if(intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2*(a==2?1:-1),y:static.boundary[a][b][0].y+mobile.height/2*(a==0?1:-1)-(a==0?0.02:0)},
                    {x:static.boundary[a][b][1].x+mobile.width/2*(a!=3?1:-1),y:static.boundary[a][b][1].y+mobile.height/2*(a!=1?1:-1)-(a==0?0.02:0)})
                ){
                    return a
                }
            }else if(a==4){
                if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2})
                ){
                    return a
                }else if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})
                ){
                    return 8
                }
            }else if(a==5){
                if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2})
                ){
                    return a
                }else if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})
                ){
                    return 9
                }
            }else if(a==6){
                if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2})
                ){
                    return a
                }else if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2})
                ){
                    return 10
                }
            }else if(a==7){
                if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2})
                ){
                    return a
                }else if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2})
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
    if(game.level==19||game.level==22||game.level==23||game.level==24||game.level==25||game.level==26||game.level==27||game.level==28||menu.level==29||menu.level==30||menu.level==31||menu.level==32||menu.level==33){
        image(
            graphics.overlay[0],
            width/2,100,width,200
        )
        graphics.overlay[0].clear()
    }
    if(game.flash&&game.level!=13&&game.level!=14){
        if(game.gaming==1){
            image(
                graphics.overlay[0],
                width/2,height/2,width,height
            )
        }else if(game.gaming==2){
            image(
                graphics.overlay[0],
                width*3/4,height/2,width/2,height
            )
            image(
                graphics.overlay[1],
                width/4,height/2,width/2,height
            )
        }else{
            image(
                graphics.overlay[0],
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
                    graphics.overlay[2],
                    width/4,height*3/4,width/2,height/2
                )
            }
            if(game.gaming>=4){
                image(
                    graphics.overlay[3],
                    width*3/4,height*3/4,width/2,height/2
                )
            }
        }
    }
}
function generateLevel(info,layer){
    let level=[]
    for(let a=0,la=info.length;a<la;a++){
        level.push(info[a].slice())
    }
    entities.projectiles=[]
    switch(game.level){
        case 29:
            game.placer=[[],[],[]]
        break
    }
    if(game.level==29&&display.cycle>0){
        for(let a=0,la=entities.walls[1].length;a<la;a++){
            if(entities.walls[1][a].type==27){
                game.placer[2].push([entities.walls[1][a].weapon,entities.walls[1][a].ammo,entities.walls[1][a].uses])
            }
        }
    }
    entities.walls=[[],[],[]]
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
        case 20:
            game.edge=[4500,1700]
        break
        case 21:
            game.edge=[8500,2000]
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
        case 23:
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
                [game.edge[0]*0.5,game.edge[1]*0.5,game.edge[0],game.edge[1]],
            ]
        break
        case 28:
            game.edge=[level[0].length*42,level.length*42]
        break
        case 29:
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
                [game.edge[0]*0.5,945,game.edge[0],1890],
                [7320,2016,432,252],
                
                [11112,1995,336,210],
                [12072,1995,336,210],
                [6384,2352,480,168],
                [8664,1990,480,210],
                [game.edge[0]*0.5,game.edge[1]*0.5,game.edge[0],game.edge[1]],
            ]
        break
        case 33:
            game.edge=[level[0].length*48,level.length*42]
            game.sectors=[
                [1872,2814,960,168],
                [6216,2520,144,168],
                [492,2436,984,420],
                [game.edge[0]*0.5,945,game.edge[0],1890],
                [7320,2016,432,252],
                
                [11112,1995,336,210],
                [12072,1995,336,210],
                [6384,2352,480,168],
                [0,0,0,0],
                [game.edge[0]*0.5,game.edge[1]*0.5,game.edge[0],game.edge[1]],
            ]
        break
        default:
            //game.edge=[3640,2280]
            game.edge=[level[0].length*40,level.length*40]
        break
    }
    game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
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
    for(let g=0,lg=game.level==25||game.level==26?2:1;g<lg;g++){
        for(let a=0,la=level.length;a<la;a++){
            for(let b=0,lb=level[a].length;b<lb;b++){
                if(!reject.includes(a*lb+b)){
                    switch(level[a][b]){
                        case '>':
                            if(!reject.includes(a*lb+b)){
                                let extent=0
                                for(let e=1,le=min(level.length-a,level[0].length-b);e<le;e++){
                                    if(level[a+e][b+e]=='>'){
                                        let valid=true
                                        for(let f=0,lf=e;f<lf;f++){
                                            if(level[a+e][b+f]!='#'&&level[a+e][b+f]!='.'){
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
                                }else if((game.level==25||game.level==26||game.level==30)&&level[a][b-1]=='m'){
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),51))
                                }else if((game.level==25||game.level==26||game.level==32||game.level==33)&&level[a][b-1]=='.'){
                                    if(level[a][b+1]=='#'){
                                        for(let e=0,le=extent+1;e<le;e++){
                                            level[a+e]=level[a+e].substr(0,b+e)+']'+level[a+e].substr(b+e+1)
                                            if(reject.includes((a+e)*lb+(b+e))){
                                                reject.splice(reject.indexOf((a+e)*lb+(b+e)),1)
                                            }
                                        }
                                    }
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),44))
                                }else{
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),17))
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
                                    if(level[a+e][b-e]=='<'||level[a+e][b-e]=='x'){
                                        let valid=true
                                        for(let f=0,lf=e;f<lf;f++){
                                            if(level[a+e][b-f]!='#'&&level[a+e][b-f]!='.'){
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
                                }else if((game.level==25||game.level==26||game.level==30)&&level[a][b+1]=='m'){
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5-extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),52))
                                }else if((game.level==25||game.level==26||game.level==32||game.level==33)&&(
                                    level[a][b+1]=='.'||
                                    level[a][b+1]=='@'&&level[a][b+2]=='@'&&level[a][b+3]=='@'&&level[a][b+4]=='.'||
                                    level[a][b+1]=='%'&&level[a][b+2]=='%'&&level[a][b+3]=='%'&&level[a][b+4]=='.'
                                )){
                                    if(level[a][b-1]=='#'){
                                        for(let e=0,le=extent+1;e<le;e++){
                                            level[a+e]=level[a+e].substr(0,b-e)+'['+level[a+e].substr(b-e+1)
                                            if(reject.includes((a+e)*lb+(b-e))){
                                                reject.splice(reject.indexOf((a+e)*lb+(b-e)),1)
                                            }
                                        }
                                    }
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5-extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),45))
                                }else{
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5-extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5+extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),18))
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
                                    if(level[a-e][b+e]=='['||level[a-e][b+e]=='v'){
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
                                if((game.level==25||game.level==26||game.level==30)&&level[a][b-1]=='m'){
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5-extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),53))
                                }else if((game.level==25||game.level==26)&&(level[a][b-1]=='.'||level[a][b-1]=='c')){
                                    if(level[a][b+1]=='#'){
                                        for(let e=0,le=extent+1;e<le;e++){
                                            level[a-e]=level[a-e].substr(0,b+e)+'<'+level[a-e].substr(b+e+1)
                                            if(reject.includes((a-e)*lb+(b+e))){
                                                reject.splice(reject.indexOf((a-e)*lb+(b+e)),1)
                                            }
                                        }
                                    }
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5-extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),46))
                                }else{
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5+extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5-extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),20))
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
                                    if(level[a-e][b-e]==']'){
                                        let valid=true
                                        for(let f=0,lf=e;f<lf;f++){
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
                                if((game.level==25||game.level==26||game.level==30)&&level[a][b+1]=='m'){
                                    if(level[a][b-1]=='#'){
                                        for(let e=0,le=extent+1;e<le;e++){
                                            level[a-e]=level[a-e].substr(0,b-e)+'>'+level[a-e].substr(b-e+1)
                                            if(reject.includes((a-e)*lb+(b-e))){
                                                reject.splice(reject.indexOf((a-e)*lb+(b-e)),1)
                                            }
                                        }
                                    }
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5-extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5-extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),54))
                                }else if((game.level==25||game.level==26)&&(level[a][b+1]=='.'||level[a][b+1]=='c')){
                                    if(level[a][b-1]=='#'){
                                        for(let e=0,le=extent+1;e<le;e++){
                                            level[a-e]=level[a-e].substr(0,b-e)+'>'+level[a-e].substr(b-e+1)
                                            if(reject.includes((a-e)*lb+(b-e))){
                                                reject.splice(reject.indexOf((a-e)*lb+(b-e)),1)
                                            }
                                        }
                                    }
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5-extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5-extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),47))
                                }else{
                                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]*(0.5-extent*0.5)+b*game.tileset[0],game.tileset[1]*(0.5-extent*0.5)+a*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*(1+extent),21))
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
    let clumper=[[],[]]
    for(let a=0,la=level.length;a<la;a++){
        for(let b=0,lb=level[a].length;b<lb;b++){
            switch(level[a][b]){
				case '#': case '.':
                    if(level[a][b]=='.'&&(game.level==19||game.level==31)){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],34))
                    }else if(level[a][b]=='.'&&(game.level==25||game.level==26||game.level==32||game.level==33)&&!reject.includes(a*lb+b)){
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
                        if(game.level==23){
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
                                game.level==30&&(
                                    (level[a-1][b]=='_'||level[a-1][b]=='c')&&
                                    !(level[a-1][b+1]=='<'&&level[a-1][b+2]!='#')&&
                                    !(level[a-1][b+2]=='<'&&level[a-1][b+3]!='#')&&
                                    !(level[a-1][b+3]=='<'&&level[a-1][b+4]!='#')&&
                                    !(level[a-1][b+4]=='<'&&level[a-1][b+5]!='#')||
                                    level[a-1][b]=='<'&&level[a-1][b-1]=='_'&&level[a-1][b+1]=='#'
                                )
                            ){
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2+extent/2)*game.tileset[1],game.tileset[0],game.tileset[1]*(1.6+extent),1))
                            }else{
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+extent/2)*game.tileset[1],game.tileset[0],game.tileset[1]*(1+extent),1))
                            }
                        }
                    }
                break
                case '@':
                    switch(game.level){
                        case 25: case 26:
                            if(level[a][b+1]=='.'||level[a][b+2]=='.'||level[a][b+3]=='.'){
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],48))
                            }else{
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],2))
                            }
                        break
                        default:
                            entities.walls[game.level==23?0:1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],2))
                        break
                    }
                break
                case '!':
                    let cluster=game.peakWeapon?1:game.level==27&&game.pvp?1:floor(random(1.5))
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
                        case 19: case 22: case 23: case 24: case 31:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                            entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                        break
                        case 25: case 26:
                            entities.walls[2].push(new wall(graphics.main,b*game.tileset[0],a*game.tileset[1],0,0,3))
                        break
                        case 28:
                            if(a>la-10){
                                entities.walls[1].push(new wall(graphics.main,game.edge[0]*0.5,a*game.tileset[1]*0.5+game.edge[1]*0.5,game.edge[0],game.edge[1]-a*game.tileset[1],3))
                            }else{
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.1)*game.tileset[1],game.tileset[0],game.tileset[1]*0.8,3))
                            }
                        break
                        case 30: case 32: case 33:
                            clumper[1].push(new wall(graphics.main,b*game.tileset[0],a*game.tileset[1],0,0,3))
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
                        case 30: case 32: case 33:
                            if(a<la-1&&(level[a+1][b]=='>'&&level[a+2][b]=='>'||level[a+1][b]=='<'&&level[a+2][b]=='<')){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+1)*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*2,7))
                            }else if(a>0&&level[a-1][b]=='m'||a>1&&level[a-2][b]=='m'){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],55))
                            }else if(a>0&&(level[a-1][b]==']'||level[a-1][b]=='[')){
                                clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1]*2,7))
                            }else if(a<la-1&&(level[a+1][b]=='>'||level[a+1][b]=='<'||level[a+1][b]=='-'||level[a+1][b]=='N')){
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
                    if(game.level==16){
                        for(let a=0,la=game.players;a<la;a++){
                            entities.walls[1].push(new wall(graphics.main,random(100,game.edge[0]-100),random(-2000,0),game.tileset[1]*0.6,game.tileset[1]*0.6,8))
                        }
                    }else{
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+(game.level==7?0.5:0))*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,8))
                    }
                break
                case '*':
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,9))
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
                        case 23:
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
                        case 29:
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
                        case 30:
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
                        default:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                        break
                    }
                break
                case '-':
                    if(game.level!=23){
                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0],game.tileset[1]*0.5,11))
                        if(game.level==30&&level[a-1][b]=='|'){
                            clumper[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                        }
                    }
                break
                case '&':
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,12))
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
                        default:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                        break
                    }
                break
                case '`':
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],13))
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
                                if((game.level==25||game.level==26)&&a>35){
                                    if(level[a][b-1]=='>'&&game.level==22){
                                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*0.3,37))
                                    }else if(level[a][b-1]=='>'){
                                        clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*0.3,37))
                                    }else if(level[a][b-1]=='['){
                                        clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.25)*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*(1.5+extent),game.tileset[1]*0.3,37))
                                    }else{
                                        clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],(a+0.15)*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*0.3,37))
                                    }
                                }else{
                                    if(level[a][b-1]=='>'&&game.level==22){
                                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*0.4,37))
                                    }else if(level[a][b-1]=='>'&&game.level==30){
                                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*0.4,37))
                                    }else if(level[a][b-1]=='>'){
                                        clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.5)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(2+extent),game.tileset[1]*0.4,37))
                                    }else if(level[a][b-1]=='['){
                                        clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2-0.25)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(1.5+extent),game.tileset[1]*0.4,37))
                                    }else{
                                        clumper[1].push(new wall(graphics.main,game.tileset[0]/2+(b+extent/2)*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0]*(1+extent),game.tileset[1]*0.4,37))
                                    }
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
                                let cluster=game.peakWeapon?1:game.level==27&&game.pvp?0:floor(random(1.5))
                                entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                            }
                        break
                        case 15: case 18: case 20: case 21: case 25: case 26: case 30: case 32: case 33:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                            let cluster=game.peakWeapon?1:game.level==27&&game.pvp?0:floor(random(1.5))
                            entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                        break
                        case 28:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                            if(a<20||a>la-5){
                                entities.walls[1][entities.walls[1].length-1].weapon=findName('PlayerUpdraft',types.player)
                            }else if(a>la-10){
                                entities.walls[1][entities.walls[1].length-1].weapon=findName('PlayerGust',types.player)
                            }else{
                                let cluster=game.peakWeapon?1:game.level==27&&game.pvp?0:floor(random(1.5))
                                entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                            }
                        break
                        default:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],15))
                        break
                    }
                break
                case '/':
                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a-0.5)*game.tileset[1],game.tileset[0],game.tileset[1]*2,18))
                break
                case '?':
                    switch(game.level){
                        case 13: case 14:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                        break
                        case 29:
                            game.placer[1].push([game.tileset[0]*(b+0.5),game.tileset[1]*(a+0.5)])
                        break
                        default:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],23))
                        break
                    }
                break
                case 'a':
                    switch(game.level){
                        case 23: case 29: case 30: case 32: case 33:
                            if(level[a+1][b]=='a'){
                                entities.walls[0].push(new wall(graphics.main,-game.tileset[0]*0.06+b*game.tileset[0],game.tileset[1]*0.56+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                            }else{
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]*0.44+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                            }
                        break
                    }
                break
                case 'b':
                    switch(game.level){
                        case 8: case 17:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],18))
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                        break
                        case 22:
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
                        default:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,25))
                        break
                    }
                break
                case 'c':
                    switch(game.level){
                        case 21:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a-0.5)*game.tileset[1],game.tileset[0],game.tileset[1]*2,17))
                        break
                        case 19: case 30: case 31:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,35))
                        break
                        case 22: case 23: case 25: case 26: case 28:  case 32: case 33:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],35))
                        break
                        case 29:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],35))
                            entities.walls[1].push(new wall(graphics.main,-game.tileset[0]/2+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],47))
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]*3/2+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],46))
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
                        case 19: case 22: case 23: case 31:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a-0.5)*game.tileset[1],game.tileset[0],game.tileset[1]*2,17))
                        break
                        case 25: case 26: case 28: case 30:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*0.4+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,50))
                        break
                        case 29:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,27))
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
                        case 23: case 25: case 26: case 30: case 32: case 33:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,27))
                        break
                        case 28:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],40))
                        break
                        default:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],29))
                        break
                    }
                break
                case 'g':
                    switch(game.level){
                        case 23:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],40))
                        break
                        case 32: case 33:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],23))
                        break
                        default:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                        break
                    }
                break
                case 'V':
                    if(game.level==27&&!game.pvp&&b>100){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*2+a*game.tileset[1],game.tileset[1]*8,game.tileset[1]*4,33))
                    }else{
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*2+a*game.tileset[1],game.tileset[1]*8,game.tileset[1]*4,31))
                    }
                break
                case 'Q':
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],32))
                break
                case 'N':
                    switch(game.level){
                        case 29:
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
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*2+a*game.tileset[1],game.tileset[1]*8,game.tileset[1]*4,42))
                break
                case 'X':
                    print(game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1])
                break
                case ':':
                    switch(game.level){
                        case 25: case 26: case 30: case 32:
                            if(a<la-1&&(level[a+1][b]=='<'||level[a+1][b]=='>')){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*2,38))
                            }else{
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1],38))
                            }
                        break
                        case 29:
                            clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.3,game.tileset[1],38))
                        break
                        case 33:
                            if(a<la-1&&(level[a+1][b]=='<'||level[a+1][b]=='>')){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*2,38))
                            }else{
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1],38))
                            }
                        break
                        default:
                            if(game.level==22||a>10&&a<la-10&&game.level==23){
                                entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1],38))
                            }else{
                                entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.5,game.tileset[1],38))
                            }
                        break
                    }
                break
                case 'z':
                    if(game.level==22||game.level==23){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],17))
                    }
                break
                case 'x':
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],18))
                break
                case 'v':
                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],20))
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,37))
                break
                case ';':
                    switch(game.level){
                        case 22: case 23:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],5+a*game.tileset[1],game.tileset[0]*0.5,10,38))
                        break
                        case 30:
                            if(a<la-1&&(level[a+1][b]=='<'||level[a+1][b]=='>')){
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1]*2,56))
                            }else{
                                clumper[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.25,game.tileset[1],56))
                            }
                        break
                    }
                break
                case 'r':
                    if(game.level==23){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                    }
                break
                case 'm':
                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.5)*game.tileset[1],game.tileset[0],game.tileset[1],49))
                break
                
            }
        }
    }
    for(let a=0,la=clumper.length;a<la;a++){
        while(clumper[a].length>0){
            entities.walls[0].splice(0,0,clumper[a][0])
            clumper[a].splice(0,1)
        }
    }
    if(game.level==22||game.level==23){
        let set=[
            [112,65.5,[-90,90,-90,game.level==23?0:-90,-90],[0,1,2,3,4]],

            [112,74.5,[-90,90,90,90],[0,2,3,4]],

            [86.5,55.5,[-90,90,0,90,90],[0,1,2,3,4]],

            [112,54.5,[-90,90,-90,90],[0,1,2,3]],

            [137.5,55.5,[-90,180,0,0,-90],[0,1,2,3,4]],

            [game.level==23?83:99,35.5,[-90,-90,90,90,-90],[0,1,2,3,4]],

            [53,44.5,[-90,-90,90,90],[1,2,3,4]],

            [171,44.5,[-90,-90,90,-90],[0,1,2,4]],

            [26,56,[90,180,0,90,90],[0,1,2,3,4]],

            [112,21.5,[-90,180,90,180],[0,1,3,4]],

            [game.level==23?120:137,35.5,[-90,-90,0,90,90],[0,1,2,3,4]],
        ]
        for(let a=0,la=set.length;a<la;a++){
            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+set[a][0]*game.tileset[0],game.tileset[1]/2+set[a][1]*game.tileset[1],game.tileset[1]*0.8,game.tileset[1]*0.8,39))
            entities.walls[0][entities.walls[0].length-1].dir=set[a][2]
            entities.walls[0][entities.walls[0].length-1].point=set[a][3]
        }
    }
    if(game.level==13){
        let ticker=0
        let temp=[]
        for(let a=0,la=listing[0].length;a<la;a++){
            temp.push(listing[0][a])
        }
        let mixed=[]
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
    }else if(game.level==14){
        let ticker=0
        let temp=[]
        for(let a=0,la=listing[1].length;a<la;a++){
            temp.push(listing[1][a])
        }
        let mixed=[]
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
    }
    if(game.level==6){
        let spawns=[]
        for(let a=0,la=level.length;a<la;a++){
            for(let b=0,lb=level[a].length;b<lb;b++){
                if(a<la-1&&b<lb-6&&floor(random(0,8))==0&&
                    level[a][b]==' '&&level[a][b+1]==' '&&level[a][b+2]==' '&&level[a][b+3]==' '&&level[a][b+4]==' '&&level[a][b+5]==' '&&
                    level[a+1][b]=='#'&&level[a+1][b+1]=='#'&&level[a+1][b+2]=='#'&&level[a+1][b+3]=='#'&&level[a+1][b+4]=='#'&&level[a+1][5+4]=='#'
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
    }else if(game.level==15||game.level==18){
        graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
        graphics.gradient[0].colors(
            0.0,color(-75,-100,-25),
            1.0,color(100,75,175)
        )
    }else if(game.level==30){
        graphics.gradient=[new p5.LinearGradient(85,graphics.main[0].height)]
        graphics.gradient[0].colors(
            0.0,color(-75,-100,-25),
            1.0,color(50,0,75)
        )
    }
    let clump=listing[floor(random(1.5))]
    let weapon=clump[floor(random(0,clump.length))]
    let shifter=0
    if(game.level==23||game.level==26||game.level==28){
        shifter=floor(random(0,4))
    }
    for(let c=0,lc=game.players;c<lc;c++){
        for(let a=0,la=level.length;a<la;a++){
            for(let b=0,lb=level[a].length;b<lb;b++){
                let clump=listing[game.peakWeapon?1:game.level==27&&game.pvp?0:floor(random(0,1.5))]
                if(game.attacker&&game.level!=13&&game.level!=14){
                    if(level[a][b]=='Z'){
                        entities.players.push(new player(layer,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],c+1,0,[],true,game.selector?findName('PlayerSelector',types.player):game.randomizer?floor(random(listing[1][listing[1].length-1]+1,types.player.length)):game.classicWeapon||c>=game.gaming?(game.past?weapon:clump[floor(random(0,clump.length))]):(game.level==13||game.level==14?0:game.weapon[game.mainline?lc:c][game.weaponTick[c]%game.weapon[game.mainline?lc:c].length]),game.index))
                        if(!game.classicWeapon&&c<game.gaming&&game.level!=13&&game.level!=14){
                            game.weaponTick[c]++
                        }
                        game.index++
                    }
                }else{
                    let playerLength=entities.players.length
                    if(int(level[a][b])==(game.level==32?1:game.level==27?c%5:c)+1&&(!game.pvp||game.level==13||game.level==14)){
                        entities.players.push(new player(layer,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],c+1,0,[],true,game.selector?findName('PlayerSelector',types.player):game.randomizer?floor(random(listing[1][listing[1].length-1]+1,types.player.length)):game.classicWeapon||c>=game.gaming?(game.past?weapon:clump[floor(random(0,clump.length))]):(game.level==13||game.level==14?0:game.weapon[game.mainline?lc:c][game.weaponTick[c]%game.weapon[game.mainline?lc:c].length]),game.index))
                        if(!game.classicWeapon&&c<game.gaming&&game.level!=13&&game.level!=14){
                            game.weaponTick[c]++
                        }
                        game.index++
                        if(game.level==13||game.level==14){
                            entities.players[entities.players.length-1].weaponType=-1
                        }
                        if(game.level==19){
                            entities.players[entities.players.length-1].position.x=game.edge[0]/2+random(-300,300)
                            entities.players[entities.players.length-1].position.y=0
                            if(entities.players.length>playerLength){
                                for(let a=playerLength,la=entities.players.length;a<la;a++){
                                    entities.players[a].parachute=true
                                }
                            }
                        }
                    }
                    let postC=(game.level==27?c%5:c)
                    let encode=(game.level==23||game.level==26||game.level==28||game.level==32||game.level==33)&&postC<4?'qwer'[(postC+shifter)%4]:'qwerty'[postC]
                    if(level[a][b]==encode&&game.pvp){
                        entities.players.push(new player(layer,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],c+1,0,[],true,game.selector?findName('PlayerSelector',types.player):game.randomizer?floor(random(listing[1][listing[1].length-1]+1,types.player.length)):game.classicWeapon||c>=game.gaming?(game.past?weapon:clump[floor(random(0,clump.length))]):(game.level==13||game.level==14?0:game.weapon[game.mainline?lc:c][game.weaponTick[c]%game.weapon[game.mainline?lc:c].length]),game.index))
                        if(!game.classicWeapon&&c<game.gaming&&game.level!=13&&game.level!=14){
                            game.weaponTick[c]++
                        }
                        game.index++
                        if(game.level==13||game.level==14){ 
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
    if(game.level==23){
        entities.walls.forEach(set=>set.forEach(item=>item.checkVertical()))
        entities.walls[0]=entities.walls[0].filter(item=>!item.remove)
        entities.walls[1]=entities.walls[1].filter(item=>!item.remove)
        entities.walls.forEach(set=>set.forEach(item=>item.checkHorizontal()))
        entities.walls[0]=entities.walls[0].filter(item=>!item.remove)
        entities.walls[1]=entities.walls[1].filter(item=>!item.remove)
    }else{
        entities.walls.forEach(set=>set.forEach(item=>item.checkHorizontal()))
        entities.walls[0]=entities.walls[0].filter(item=>!item.remove)
        entities.walls[1]=entities.walls[1].filter(item=>!item.remove)
        entities.walls.forEach(set=>set.forEach(item=>item.checkVertical()))
        entities.walls[0]=entities.walls[0].filter(item=>!item.remove)
        entities.walls[1]=entities.walls[1].filter(item=>!item.remove)
    }
    entities.walls.forEach(set=>set.forEach(item=>item.formBoundary()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkPrimary()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkRedundancy()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkOverlay()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkGap()))
    if(game.level==23){
        let ticker=0
        for(let a=0,la=entities.walls[1].length;a<la;a++){
            if(entities.walls[1][a].type==27){
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
    }else if(game.level==27){
        let ticker=0
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
    }else{
        entities.walls.forEach(set=>set.forEach(item=>item.set()))
    }
    entities.walls.forEach(set=>set.forEach(item=>item.checkBar()))
    entities.walls.forEach(set=>set.forEach(item=>item.formBounder()))
    if(game.pane){
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
    let ticker=0
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
                    entities.walls[1][a].pos=[7,4,5,6,2,1,3,0][ticker]
                    entities.players[entities.walls[1][a].index].pos=[7,4,5,6,2,1,3,0][ticker]
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
            let set=[]
            for(let a=0,la=game.players+1;a<la;a++){
                set.push(8)
                set.push(9)
                set.push(16)
                set.push(50)
            }
            for(let a=0,la=game.placer[0].length-set.length;a<la;a++){
                game.placer[0].splice(floor(random(0,game.placer[0].length)),1)
            }
            for(let a=0,la=set.length;a<la;a++){
                let index=floor(random(0,game.placer[1].length))
                if(set[a]==16){
                    let cluster=game.peakWeapon?1:game.level==27&&game.pvp?1:floor(random(1.5))
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
                if(entities.walls[1][a].type==27){
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
    }
    for(let c=0,lc=game.players;c<lc;c++){
        let playerLength=entities.players.length
        entities.players[c].initialWeapon()
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
            entities.players[a].respawn()
        }
    }
    generateLevel(levels[game.level],graphics.main)
}
function newWave(){
    if(display.cycle>=types.mission[game.mission].wave.length){
        display.win=1
        display.wait=999999999999999
        game.classicRespawn=false
        game.pvp=true
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
    }else{
        if(game.level==8||game.level==17){
            entities.walls[1].forEach(wall=>wall.exploded=false)
        }else if(game.level==29){
            entities.players=[]
            newLoop()
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
                types.mission[game.mission].wave[display.cycle][a][0]=='SpyHeal'
            if(types.mission[game.mission].wave[display.cycle][a][0].includes('Boss')){
                game.stack.push([spy?-1:floor(random(0,6))+6,types.mission[game.mission].wave[display.cycle][a][0]])
            }else{
                for(let b=0,lb=ceil(types.mission[game.mission].wave[display.cycle][a][1]*(game.level==29?game.players*0.1+0.4:game.players*0.25+0.25)*(game.classicRespawn?1.25:1)*(game.level==7?0.6:1)*(game.level==8?(game.attacker?0.75:1.5):1)*(game.level==16?0.1:1)*(game.level==17?(game.attacker?0.4:1):1)*(game.level==19||game.level==31?2.5:1)*(game.level==29?(types.mission[game.mission].wave.length==1?0.3:1.8):1)*(game.level==32||game.level==33?1.2:1)*(game.peakWeapon?2:1)*game.diff);b<lb;b++){
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
                    }
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
        }else if(game.level==22){
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
            if(game.time%900==0){
                entities.players.push(new player(graphics.main,random(100,game.edge[0]-100),0,-1,0,[],false,findName('ConstructGust',types.player),game.index))
                game.index++
                entities.players[entities.players.length-1].constructify()
            }
        }else if(game.level==33){
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
                    if(game.stack[0][0]==-2){
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
                    }else if(game.stack[0][0]==-1||game.attacker||game.level==29&&game.initial){
                        let index=floor(random(0,temp.length))
                        let pos=temp[index]
                        let spam=0
                        let fail=true
                        if(game.level==29){
                            while(fail&&spam<100){
                                index=floor(random(0,temp.length))
                                pos=temp[index]
                                spam++
                                fail=false
                                if(pos[0]<1000||pos[0]>game.edge[0]-1000){
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
                                        dist(pos[0],pos[1],entities.players[a].position.x,entities.players[a].position.y)<graphics.main[a].width*0.5*key[a]+50||
                                        dist(pos[0],pos[1],entities.players[a].base.position.x,entities.players[a].base.position.y)<graphics.main[a].height*0.5*key[a]+50
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
                        for(let a=0,la=level.length;a<la;a++){
                            for(let b=0,lb=level[a].length;b<lb;b++){
                                if(level[a][b]=='123456ABCDEF'[game.stack[0][0]]){
                                    if((a>5||floor(random(0,2))==0&&types.player[findName(game.stack[0][1],types.player)].sizeBuff>=1.5)&&game.stack[0][0]>=6&&game.level==8||game.level==16){
                                        deployer.spawn.push(new player(layer,game.tileset[0]/2+b*game.tileset[0]+random(-20,20),game.tileset[1]/2+a*game.tileset[1],0,0,[],true,findName(game.stack[0][1],types.player),game.index))
                                        game.index++
                                        game.spawnIndex++
                                    }else{
                                        entities.players.push(new player(layer,game.tileset[0]/2+b*game.tileset[0]+random(-20,20),game.tileset[1]/2+a*game.tileset[1],0,0,[],true,findName(game.stack[0][1],types.player),game.index))
                                        if(game.level==6||game.level==24){
                                            entities.players[entities.players.length-1].position.x=floor(random(0,game.edge[0]))
                                            entities.players[entities.players.length-1].position.y=0
                                            entities.players[entities.players.length-1].parachute=true
                                        }else if(game.level==8){
                                            entities.players[entities.players.length-1].position.x=[entities.players[floor(random(0,game.players))].position.x+random(-240,240),random(450,entities.players[floor(random(0,game.players))].position.x)][floor(random(0,2))]
                                            entities.players[entities.players.length-1].position.y=1000
                                            entities.players[entities.players.length-1].parachute=true
                                        }else if(game.level==17&&a<=5){
                                            entities.players[entities.players.length-1].position.x=[max(1000,entities.players[floor(random(0,game.players))].position.x+random(-240,240)),random(entities.players[floor(random(0,game.players))].position.x,game.edge[0])][floor(random(0,2))]
                                            entities.players[entities.players.length-1].position.y=1000
                                            entities.players[entities.players.length-1].parachute=true
                                        }else if(game.level==19&&floor(random(0,6))==0){
                                            entities.players[entities.players.length-1].position.x=game.edge[0]/2+random(-800,800)
                                            entities.players[entities.players.length-1].position.y=0
                                            entities.players[entities.players.length-1].parachute=true
                                        }else if((game.level==25||game.level==26||game.level==27)&&a<=5){
                                            entities.players[entities.players.length-1].position.x=random(500,game.edge[0]-500)
                                            entities.players[entities.players.length-1].position.y=0
                                            entities.players[entities.players.length-1].parachute=true
                                        }else if(game.level==30&&a<=5){
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
                game.sendTime=game.attacker||game.level==29&&game.initial?0:types.mission[game.mission].sendTime*2.75/max(1,game.players*0.5+0.5)*(game.classicRespawn?0.8:1)*(game.pvp?(game.level==33?4:game.level==23?2.5:game.level==19||game.level==26||game.level==30||game.level==31?5:20):1)*(game.peakWeapon?0.5:1)/game.diff*(game.level==7?3:1)*(game.level==15||game.level==18?(game.spawnIndex%6==0?5:0.5):1)*(game.mission==49?1/(6+display.cycle*2):1)*(game.level==16&&game.spawnIndex>10?4:1)*(game.level==17?2:1)*((game.level==20||game.level==21)&&game.spawnIndex>5?2:1)*(game.level==19?0.625:1)*(game.level==22?constrain(0.75+0.025*total,1,1.5):1)*(game.level==25?constrain(0.4+0.02*total,0.8,1):1)*(game.level==27?0.9:1)*(game.level==32||game.level==33?5/6:1)*(game.level==30&&game.spawnIndex<20?0.4:1)
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
            }else{
                let total=0
                let subTotal=0
                for(let a=0,la=entities.players.length;a<la;a++){
                    if(!entities.players[a].fort){
                        if(entities.players[a].id==0&&entities.players[a].life>0){
                            total++
                        }
                        if(entities.players[a].id==0&&entities.players[a].base.life>2000){
                            subTotal++
                        }
                    }
                }
                if((total<(game.level==23?((1+game.players)*(game.peakWeapon?7.5:5)):(game.attacker?1:4))&&(subTotal==0||game.level==23)||game.level==33)&&!(display.cycle==types.mission[game.mission].wave.length&&total>0)){
                    if(!(game.point[4]==0&&game.level==23)){
                        display.wait--
                    }
                    if(display.wait<=0){
                        display.wait=game.level==23?1200:240
                        if(!game.perpetual&&!game.nuke&&!(game.level==27&&game.pvp)&&!(game.level==28&&game.pvp)){
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
    entities.players[index].die.killer=game.players
}
function setupGraphics(){
    setupBase()
    setupTrig()
}
function initialGraphics(){
    if(game.gaming==1){
        graphics.main.push(createGraphics(width,height))
        if(game.flash){
            graphics.overlay.push(createGraphics(width,height))
        }
    }else if(game.gaming==2){
        graphics.main.push(createGraphics(width/2,height))
        graphics.main.push(createGraphics(width/2,height))
        if(game.flash){
            graphics.overlay.push(createGraphics(width/2,height))
            graphics.overlay.push(createGraphics(width/2,height))
        }
    }else if(game.gaming==5){
        for(let a=0,la=5;a<la;a++){
            graphics.main.push(createGraphics(width/3,height/2))
        }
        if(game.flash){
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
        if(game.flash){
            graphics.overlay.push(createGraphics(width/2,height/2))
            graphics.overlay.push(createGraphics(width/2,height/2))
            graphics.overlay.push(createGraphics(width/2,height/2))
            if(game.gaming==4){
                graphics.overlay.push(createGraphics(width/2,height/2))
            }
        }
    }
    if(menu.level==19||menu.level==22||menu.level==23||menu.level==24||menu.level==25||menu.level==26||menu.level==27||menu.level==28||menu.level==29||menu.level==30||menu.level==31||menu.level==32||menu.level==33){
        graphics.overlay.push(createGraphics(width,200))
    }
    for(let a=0,la=graphics.main.length;a<la;a++){
        setupLayer(graphics.main[a])
        graphics.main[a].index=a
    }
    for(let a=0,la=graphics.overlay.length;a<la;a++){
        setupLayer(graphics.overlay[a])
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
	return constants.trig[0][floor((direction%360+360)%360*2)]
}
function lcos(direction){
	return constants.trig[1][floor((direction%360+360)%360*2)]
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
function generateMission(wave){
    for(let a=0,la=wave.length;a<la;a++){
        let goal=la==100?8+a*2:15+a*5
        let divide=[round(random(goal*0.1,goal*0.2)),0]
        divide[1]=goal-divide[0]
        let bar=findName('Wait',types.player)+1
        let mixer=[]
        while(divide[0]>0){
            let type=floor(random(bar,types.player.length))
            while(types.player[type].lifeBuff<=5||types.player[type].name.includes('Damaged')||types.player[type].name.includes('Boss')){
                type=floor(random(bar,types.player.length))
            }
            let num=floor(random(game.players==1?1:2,min(5,ceil(divide[0]*1.5))))
            mixer.push([types.player[type].name,num])
            divide[0]-=num
        }
        while(divide[1]>0){
            let type=floor(random(bar,types.player.length))
            while(types.player[type].lifeBuff>5||types.player[type].name.includes('Damaged')||types.player[type].name.includes('Boss')){
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
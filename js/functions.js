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
//calculatory
function inPointBox(point,box){
    return point.position.x>box.position.x-box.width/2&&point.position.x<box.position.x+box.width/2&&point.position.y>box.position.y-box.height/2&&point.position.y<box.position.y+box.height/2
}
function inBoxBox(box1,box2){
    return box1.position.x>box2.position.x-box1.width/2-box2.width/2&&box1.position.x<box2.position.x+box1.width/2+box2.width/2&&box1.position.y>box2.position.y-box1.height/2-box2.height/2&&box1.position.y<box2.position.y+box1.height/2+box2.height/2
}
function triangleArea(triangle){
    return abs(triangle[0].x*(triangle[1].y-triangle[2].y)+triangle[1].x*(triangle[2].y-triangle[0].y)+triangle[2].x*(triangle[0].y-triangle[1].y))
}
function inPointTriangle(point,triangle){
    return abs(triangleArea(triangle)-(triangleArea([point,triangle[0],triangle[1]])+triangleArea([point,triangle[0],triangle[2]])+triangleArea([point,triangle[1],triangle[2]])))<1
}
function inTriangleBoxBasic(triangle,box){
    return inPointTriangle({x:box.position.x-box.width/2,y:box.position.y-box.height/2},triangle)||
        inPointTriangle({x:box.position.x+box.width/2,y:box.position.y-box.height/2},triangle)||
        inPointTriangle({x:box.position.x-box.width/2,y:box.position.y+box.height/2},triangle)||
        inPointTriangle({x:box.position.x+box.width/2,y:box.position.y+box.height/2},triangle)
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
                    {x:static.boundary[a][b][0].x+mobile.width/2*(a==2?1:-1),y:static.boundary[a][b][0].y+mobile.height/2*(a==0?1:-1)},
                    {x:static.boundary[a][b][1].x+mobile.width/2*(a!=3?1:-1),y:static.boundary[a][b][1].y+mobile.height/2*(a!=1?1:-1)})
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
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y})
                ){
                    return a
                }else if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y},
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
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y-mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y})
                ){
                    return a
                }else if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y},
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
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y})
                ){
                    return a
                }else if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y},
                    {x:static.boundary[a][b][1].x-mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2})
                ){
                    return 8
                }
            }else if(a==7){
                if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][0].x+mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2},
                    {x:static.boundary[a][b][0].x-mobile.width/2,y:static.boundary[a][b][0].y+mobile.height/2})||
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y+mobile.height/2},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y})
                ){
                    return a
                }else if(
                    intersect(mobile.position,{x:mobile.previous.position.x+static.velocity.x,y:mobile.previous.position.y+static.velocity.y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y},
                    {x:static.boundary[a][b][1].x+mobile.width/2,y:static.boundary[a][b][1].y-mobile.height/2})
                ){
                    return 9
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
function generateLevel(level,layer){
    entities.projectiles=[]
    entities.walls=[[],[]]
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
            game.edge=[9000,2000]
        break
        default:
            //game.edge=[3640,2280]
            game.edge=[level[0].length*40,level.length*40]
        break
    }
    game.tileset=[game.edge[0]/level[0].length,game.edge[1]/level.length]
    for(let a=0,la=graphics.pane.length;a<la;a++){
        delete graphics.pane[a]
        graphics.pane.splice(a,1)
    }
    if(game.level!=15&&game.level!=18&&game.level!=19){
        graphics.pane=[]
        graphics.pane.push(createGraphics(game.edge[0],game.edge[1]))
        setupLayer(graphics.pane[0])
    }
    let reject=[]
    for(let a=0,la=level.length;a<la;a++){
        for(let b=0,lb=level[a].length;b<lb;b++){
            switch(level[a][b]){
				case '#': case '.':
                    if(level[a][b]=='.'&&game.level==19){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],34))
                    }else if(!reject.includes(a*lb+b)){
                        let extent=0
                        for(let e=1,le=level.length-a;e<le;e++){
                            if(level[a+e][b]=='#'){
                                reject.push((a+e)*lb+b)
                                extent++
                            }else{
                                e=le
                            }
                        }
                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+extent/2)*game.tileset[1],game.tileset[0],game.tileset[1]*(1+extent),1))
                    }
                break
                case '@':
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],2))
                break
                case '!':
                    if(game.level==19){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                        let cluster=game.peakWeapon?1:floor(random(1.5))
                        entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                    }else{
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.1)*game.tileset[1],game.tileset[0],game.tileset[1]*0.8,3))
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
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.4)*game.tileset[1],game.tileset[0]*0.5,game.tileset[1]*0.2,5))
                break
                case '|':
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
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
                        default:
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                        break
                    }
                break
                case '-':
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0],game.tileset[1]*0.5,11))
                break
                case '&':
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,12))
                break
                case '+':
                    switch(game.level){
                        case 8: case 17:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.25)*game.tileset[1],game.tileset[0],game.tileset[1]*0.5,11))
                        break
                        default:
                            entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                            entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,24))
                        break
                    }
                break
                case '`':
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],13))
                break
                case '=':
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a+0.5)*game.tileset[1],game.tileset[1]*1.2,game.tileset[1]*2,14))
                break
                case '~':
                    if(game.level==16){
                        for(let a=0,la=game.players;a<la;a++){
                            entities.walls[1].push(new wall(graphics.main,random(100,game.edge[0]-100),random(-2000,0),game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                            let cluster=game.peakWeapon?1:floor(random(1.5))
                            entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                        }
                    }else if(game.level==15||game.level==18||game.level==20||game.level==21){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                        let cluster=game.peakWeapon?1:floor(random(1.5))
                        entities.walls[1][entities.walls[1].length-1].weapon=listing[cluster][floor(random(listing[cluster].length))]
                    }else{
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],15))
                    }
                break
                case '>':
                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],17))
                break
                case '<':
                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],18))
                break
                case '[':
                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],20))
                break
                case ']':
                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],21))
                break
                case '/':
                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a-0.5)*game.tileset[1],game.tileset[0],game.tileset[1]*2,18))
                break
                case '?':
                    if(game.level==13||game.level==14){
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,16))
                    }else{
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],23))
                    }
                break
                case 'b':
                    if(game.level==8||game.level==17){
                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],18))
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0]*0.15,game.tileset[1],7))
                    }else{
                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,25))
                    }
                break
                case 'c':
                    if(game.level==21){
                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a-0.5)*game.tileset[1],game.tileset[0],game.tileset[1]*2,17))
                    }else if(game.level==19){
                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,35))
                    }else{
                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,26))
                    }
                break
                case 'd':
                    if(game.level==16){
                        for(let a=0,la=game.players;a<la;a++){
                            entities.walls[1].push(new wall(graphics.main,random(100,game.edge[0]-100),random(-2000,0),game.tileset[1]*0.6,game.tileset[1]*0.6,27))
                        }
                    }else if(game.level==19){
                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+(a-0.5)*game.tileset[1],game.tileset[0],game.tileset[1]*2,17))
                    }else{
                        entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[1]*0.6,game.tileset[1]*0.6,27))
                    }
                break
                case 'f':
                    if(game.level==15){
                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],(a+0.2)*game.tileset[1],game.tileset[0],game.tileset[1]*0.4,30))
                    }else{
                        entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],29))
                    }
                break
                case 'g':
                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],28))
                break
                case 'V':
                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*2+a*game.tileset[1],game.tileset[1]*10,game.tileset[1]*10,31))
                break
                case 'Q':
                    entities.walls[1].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],game.tileset[0],game.tileset[1],32))
                break
                case 'N':
                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*2+a*game.tileset[1],game.tileset[1]*10,game.tileset[1]*10,33))
                break
                case 'M':
                    entities.walls[0].push(new wall(graphics.main,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]*2+a*game.tileset[1],game.tileset[1]*10,game.tileset[1]*10,36))
                break
                case 'X':
                    print(game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1])
                break
            }
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
    }
    let clump=listing[floor(random(1.5))]
    let weapon=clump[floor(random(0,clump.length))]
    for(let c=0,lc=game.players;c<lc;c++){
        for(let a=0,la=level.length;a<la;a++){
            for(let b=0,lb=level[a].length;b<lb;b++){
                let clump=listing[game.peakWeapon?1:floor(random(0,1.5))]
                if(game.attacker&&game.level!=13&&game.level!=14){
                    if(level[a][b]=='Z'){
                        entities.players.push(new player(layer,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],c+1,0,[],true,game.selector?findName('PlayerSelector',types.player):game.randomizer?floor(random(listing[1][listing[1].length-1]+1,types.player.length)):game.classicWeapon||c>=game.gaming?(game.past?weapon:clump[floor(random(0,clump.length))]):(game.level==13||game.level==14?0:game.weapon[game.mainline?lc:c][0]),game.index))
                        game.index++
                    }
                }else{
                    if(int(level[a][b])==c+1&&(!game.pvp||game.level==13||game.level==14)){
                        entities.players.push(new player(layer,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],c+1,0,[],true,game.selector?findName('PlayerSelector',types.player):game.randomizer?floor(random(listing[1][listing[1].length-1]+1,types.player.length)):game.classicWeapon||c>=game.gaming?(game.past?weapon:clump[floor(random(0,clump.length))]):(game.level==13||game.level==14?0:game.weapon[game.mainline?lc:c][0]),game.index))
                        game.index++
                        if(game.level==13||game.level==14){
                            entities.players[entities.players.length-1].weaponType=-1
                        }
                        if(game.level==19){
                            entities.players[entities.players.length-1].position.x=game.edge[0]/2+random(-300,300)
                            entities.players[entities.players.length-1].position.y=0
                            entities.players[entities.players.length-1].parachute=true
                        }
                    }
                    if(level[a][b]=='qwerty'[c]&&game.pvp){
                        entities.players.push(new player(layer,game.tileset[0]/2+b*game.tileset[0],game.tileset[1]/2+a*game.tileset[1],c+1,0,[],true,game.selector?findName('PlayerSelector',types.player):game.randomizer?floor(random(listing[1][listing[1].length-1]+1,types.player.length)):game.classicWeapon||c>=game.gaming?(game.past?weapon:clump[floor(random(0,clump.length))]):(game.level==13||game.level==14?0:game.weapon[game.mainline?lc:c][0]),game.index))
                        game.index++
                        if(game.level==13||game.level==14){ 
                            entities.players[entities.players.length-1].weaponType=-1
                        }
                        if((game.level==8||game.level==17)&&a<5){
                            entities.players[entities.players.length-1].position.x=game.edge[0]/2
                            entities.players[entities.players.length-1].position.y=1000
                            entities.players[entities.players.length-1].parachute=true
                        }
                    }
                }
            }
        }
    }
    for(let c=0,lc=game.players;c<lc;c++){
        entities.players[c].initialWeapon()
    }
    entities.walls.forEach(set=>set.forEach(item=>item.checkHorizontal()))
    entities.walls[0]=entities.walls[0].filter(item=>!item.remove)
    entities.walls[1]=entities.walls[1].filter(item=>!item.remove)
    entities.walls.forEach(set=>set.forEach(item=>item.checkVertical()))
    entities.walls[0]=entities.walls[0].filter(item=>!item.remove)
    entities.walls[1]=entities.walls[1].filter(item=>!item.remove)
    entities.walls.forEach(set=>set.forEach(item=>item.formBoundary()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkPrimary()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkRedundancy()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkOverlay()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkGap()))
    entities.walls.forEach(set=>set.forEach(item=>item.set()))
    entities.walls.forEach(set=>set.forEach(item=>item.checkBar()))
    entities.walls.forEach(set=>set.forEach(item=>item.formBounder()))
    if(game.level!=15&&game.level!=18&&game.level!=19){
        entities.walls[0].forEach(wall=>wall.display(graphics.pane[0]))
        entities.walls[0].forEach(wall=>wall.displayOver(graphics.pane[0]))
        run.fore=[entities.projectiles,entities.players,entities.walls[1]]
    }else{
        run.fore=[entities.projectiles,entities.players,entities.walls[1],entities.walls[0]]
    }
    run.back=[entities.players]
    run.update=[entities.players,entities.walls[0],entities.walls[1],entities.projectiles]
    run.info=[entities.players]
    if(game.level==6){
        graphics.pane.push(createGraphics(game.edge[0],game.edge[1]))
        setupLayer(graphics.pane[1])
        for(let a=0,la=graphics.pane[1].width/25;a<la;a++){
            for(let b=0,lb=graphics.pane[1].height/25-20;b<lb;b++){
                effectiveA=(a*7+b*3)%la
                let pos=[effectiveA*25+random(0,25),b*25+500+lsin(effectiveA*30+random(-15,15))*100+lsin(effectiveA*8.5+random(-10,10))*50]
                let size=random(45,60)
                let bounce=random(0,1)
                graphics.pane[1].fill(
                    10+pos[1]/graphics.pane[1].height*10+bounce*20,
                    20-pos[1]/graphics.pane[1].height*5+bounce*20,
                    10+bounce*20
                )
                regPoly(graphics.pane[1],pos[0],pos[1],floor(random(4,9)),size/2,size/2,random(0,360))
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
    generateLevel(levels[game.level],graphics.main)
}
function newWave(level,layer){
    if(display.cycle>=types.mission[game.mission].wave.length){
        display.win=1
        display.wait=999999999999999999999
        game.classicRespawn=false
        game.pvp=true
        game.bust=false
        for(let a=0,la=game.players;a<la;a++){
            if(entities.players[a].life<=0){
                entities.players[a].respawn()
            }
        }
    }else{
        if(game.level==8||game.level==17){
            entities.walls[1].forEach(wall=>wall.exploded=false)
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
                for(let b=0,lb=ceil(types.mission[game.mission].wave[display.cycle][a][1]*(game.players*0.25+0.25)*(game.classicRespawn?1.25:1)*(game.level==7?0.6:1)*(game.level==8?(game.attacker?0.75:1.5):1)*(game.level==16?0.4:1)*(game.level==17?(game.attacker?0.4:1):1)*(game.level==19?2.5:1)*(game.peakWeapon?2:1)*game.diff);b<lb;b++){
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
            newLoop()
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
        }
        if(game.stack.length>0&&!game.assault&&!game.nuke){
            if(game.sendTime>0){
                game.sendTime--
            }else{
                if(game.stack[0][1]!='Wait'){
                    let temp=[]
                    for(let a=0,la=game.spawner.length;a<la;a++){
                        temp.push(game.spawner[a])
                    }
                    if(game.stack[0][0]==-1||game.attacker){
                        let index=floor(random(0,temp.length))
                        let pos=temp[index]
                        let spam=0
                        let fail=true
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
                                        deployer.spawn.push(new player(layer,game.tileset[0]/2+b*game.tileset[0]+random(-20,20),game.tileset[1]/2+a*game.tileset[1]+random(-20,20),0,0,[],true,findName(game.stack[0][1],types.player),game.index))
                                        game.index++
                                        game.spawnIndex++
                                    }else{
                                        entities.players.push(new player(layer,game.tileset[0]/2+b*game.tileset[0]+random(-20,20),game.tileset[1]/2+a*game.tileset[1]+random(-20,20),0,0,[],true,findName(game.stack[0][1],types.player),game.index))
                                        if(game.level==6){
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
                                        }
                                        game.index++
                                        game.spawnIndex++
                                    }
                                }
                            }
                        }
                    }
                }
                game.sendTime=game.attacker?0:types.mission[game.mission].sendTime*2.75/max(1,game.players*0.5+0.5)*(game.classicRespawn?0.8:1)*(game.pvp?20:1)*(game.peakWeapon?0.5:1)/game.diff*(game.level==7?3:1)*(game.level==15||game.level==18?(game.spawnIndex%6==0?5:0.5):1)*(game.mission==49?1/(6+display.cycle*2):1)*(game.level==16&&game.spawnIndex>10?4:1)*(game.level==17?2:1)*((game.level==20||game.level==21)&&game.spawnIndex>5?2:1)*(game.level==19?0.625:1)
                game.stack.splice(0,1)
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
            if(total<(game.attacker?1:4)&&subTotal==0&&!(display.cycle==types.mission[game.mission].wave.length&&total>0)){
                display.wait--
                if(display.wait<=0){
                    display.wait=240
                    if(!game.perpetual&&!game.nuke){
                        newWave(level,layer)
                    }
                }
            }
        }
    }
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
    for(let a=0,la=graphics.main.length;a<la;a++){
        setupLayer(graphics.main[a])
        graphics.main[a].index=a
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
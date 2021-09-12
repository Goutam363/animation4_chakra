const canvas=document.querySelector("canvas");
const c=canvas.getContext('2d');

canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

const mouse={
    x: window.innerWidth/2,
    y: window.innerHeight/2
}

const color_palate=['#2F3AED','#3171F7','#389AE0','#31D9F7','#2FEDD7'];

const n=100;
const inner_radius=50;
const outer_radius=150;

window.addEventListener('mousemove',function(event){
    mouse.x=event.x;
    mouse.y=event.y;
})
window.addEventListener('resize',function(){
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
})

//utility functions
function randomIntFromRange(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function randomColor(color_palate){
    return color_palate[Math.floor(Math.random()*color_palate.length)];
}

//Objects
function Particle(x,y,radius,color)
{
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;
    this.radians=Math.random()*Math.PI*2;
    this.velocity=0.05;
    this.distacneFromCentre=randomIntFromRange(inner_radius,outer_radius);
    this.lastMouse={
        x:x,
        y:y
    }
    this.draw=function(lastPoint){
        c.beginPath();
        c.strokeStyle=this.color;
        c.lineWidth=this.radius;
        c.moveTo(lastPoint.x,lastPoint.y);
        c.lineTo(this.x,this.y);
        c.stroke();
        c.closePath();
    };
    this.update=function(){
        const lastPoint={
            x:this.x,
            y:this.y
        }
        this.radians+=this.velocity;
        this.lastMouse.x+=(mouse.x-this.lastMouse.x)*0.05;
        this.lastMouse.y+=(mouse.y-this.lastMouse.y)*0.05;
        this.x=this.lastMouse.x+Math.cos(this.radians)*this.distacneFromCentre;
        this.y=this.lastMouse.y+Math.sin(this.radians)*this.distacneFromCentre;
        this.draw(lastPoint);
    };
}

//Implementation
let particles;
function init(){
    particles=[];
    for(let i=0;i<n;i++)
    {
        const radius=(Math.random()*2)+1;
        particles.push(new Particle(canvas.width/2,canvas.height/2,radius,randomColor(color_palate)));
    }
}

//Animation logo
function animate(){
    requestAnimationFrame(animate);
    // c.clearRect(0,0,canvas.width,canvas.height);
    c.fillStyle='rgba(255,255,255,0.05)';
    c.fillRect(0,0,canvas.width,canvas.height);
    // c.fillText(" HTML CANVAS BOILERPLATE",mouse.x,mouse.y);
    for(let i=0;i<particles.length;i++)
        particles[i].update();
}

init();
animate();
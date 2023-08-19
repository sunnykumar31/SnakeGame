const canvas=document.getElementById('canvas');
const pen = canvas.getContext('2d');
const start =document.getElementById('start')
const againPlay=document.getElementById('playAgain');
start.style.display='none'
againPlay.style.display='none';
const easy=document.getElementById('Easy');
const medium=document.getElementById('Medium');
const hard=document.getElementById('Hard');
pen.fillStyle='yellow';

const cs=25;
const H=650;
const W=1200;
let food=null;
let score=0;
let maximumScore=0;

const Snake={
    inlen:3,
    cells:[],
    direction:'right',
    CreateSnake:function(){
        for(let i=0;i<this.inlen;i++){
            this.cells.push({
                x:i,
                y:0
            });
        }
    },
    DrawSanke:function(){
        for(let cell of this.cells){
            pen.fillRect(cell.x*cs,cell.y*cs,cs-1,cs-1);
        }
        
    },
    UpdateSnake:function(){
        let headX=this.cells[this.cells.length-1].x;
        let headY=this.cells[this.cells.length-1].y;
        if(headX===food.x && headY===food.y){
            score++;
            food=getRandomfood();
        }
        else{
            this.cells.shift();
        }
        let nextX;
        let nextY;
        if(this.direction==='up'){
            nextX=headX;
            nextY=headY-1;
            if(nextY*cs<0){
                pen.fillStyle='red';
                pen.fillText('Game Over',500,350);
                if(score>=maximumScore){
                    maximumScore=score;
                    pen.fillStyle='Green';
                    pen.fillText(`Highest Score ${maximumScore}`,500,300);
                }
                clearInterval(id);
                againPlay.style.display="";
            }
        }
        else if(this.direction==='down'){
            nextX=headX;
            nextY=headY+1;
            if(nextY*cs>=H){
                pen.fillStyle='red';
                pen.fillText('Game Over',500,350);
                if(score>=maximumScore){
                    maximumScore=score;
                    pen.fillStyle='Green';
                    pen.fillText(`Highest Score ${maximumScore}`,500,300);
                }
                clearInterval(id);
                againPlay.style.display="";
            }
        }
        else if(this.direction==='right'){
            nextX=headX+1;
            nextY=headY;
            if(nextX*cs>=W){
                pen.fillStyle='red';
                pen.fillText('Game Over',500,350);
                if(score>=maximumScore){
                    maximumScore=score;
                    pen.fillStyle='Green';
                    pen.fillText(`Highest Score ${maximumScore}`,500,300);
                }
                clearInterval(id);
                againPlay.style.display="";
            }
        }
        else{
            nextX=headX-1;
            nextY=headY;
            if(nextX*cs<0){
                pen.fillStyle='red';
                pen.fillText('Game Over',500,350);
                if(score>=maximumScore){
                    maximumScore=score;
                    pen.fillStyle='Green';
                    pen.fillText(`Highest Score ${maximumScore}`,500,300);
                }
                clearInterval(id);
                againPlay.style.display="";
                // function PlayAgain(){
                //     init();
                // }

            }
        }
        
        this.cells.push({
            x:nextX,
            y:nextY
        }); 
    }



}

function init(){
    Snake.CreateSnake();
    food=getRandomfood();
    document.addEventListener('keydown',(e)=>{
        if(e.key==='ArrowDown'){
            Snake.direction='down';
        }
        else if(e.key==='ArrowUp'){
            Snake.direction='up';
        }
        else if(e.key==='ArrowRight'){
            Snake.direction='right';
        }
        else if(e.key==='ArrowLeft'){
            Snake.direction='left';
        }
        console.log(Snake.direction);
    });
}

function Draw(){
    pen.clearRect(0, 0, W, H);
    pen.font = '40px sans-serif';
    pen.fillText(`Score ${score}`, 50, 30);
    pen.fillStyle = 'blue';
    pen.fillRect(food.x * cs, food.y * cs, cs, cs);
    pen.fillStyle='yellow';
    Snake.DrawSanke();
}

function Update(){
    Snake.UpdateSnake();
}

function gameLoop(){
    Draw();
    Update();
    
}
function getRandomfood(){
    const foodX=Math.round(Math.random()*(W-cs)/cs);
    const foodY=Math.round(Math.random()*(H-cs)/cs);
    food={
        x:foodX,
        y:foodY
    }
    return food;
}
let speed;
function Easy(){
    speed=200;
    // const id=setInterval(gameLoop,150);
    easy.style.display='none';
    medium.style.display='none';
    hard.style.display='none';
    start.style.display="";
    
} 
function Medium(){
    speed=100;
    easy.style.display='none';
    medium.style.display='none';
    hard.style.display='none';
    start.style.display="";
}
function Hard(){
    speed=0;
    easy.style.display='none';
    medium.style.display='none';
    hard.style.display='none';
    start.style.display="";
}
function Start(){
    init();
    start.style.display='none';
}
function PlayAgain(){
    againPlay.style.display='none';
    window.location.reload();
    
}
const s=speed;
const id=setInterval(gameLoop,s);



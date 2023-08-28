const canvas=document.getElementById('canvas');
const pen = canvas.getContext('2d');
const start =document.getElementById('start')
const againPlay=document.getElementById('playAgain');
// const BackGround_audio=document.getElementById('playAudio');
start.style.display='none'
againPlay.style.display='none';
const easy=document.getElementById('Easy');
const medium=document.getElementById('Medium');
const hard=document.getElementById('Hard');
pen.fillStyle='yellow';
// BackGround_audio.play();
const cs=25;
const H=650;
const W=1200;
let food=null;
let score=0;
let level1="";
let level2="";
let level3="";
let obs=[];
let prevDirection="";
let skip=0;
let ObstacleSkip=true;

var Food_audio = new Audio('sound/carrotnom-92106.mp3');
var Hit_audio= new Audio('sound/punch-140236.mp3');
var BackGround_audio=new Audio('sound/game-music-loop-3-144252.mp3');


if (localStorage.getItem('highestScoreEasy')=== null) {
    localStorage.setItem('highestScoreEasy', 0);
}
if (localStorage.getItem('highestScoreMedium')=== null) {
    localStorage.setItem('highestScoreMedium', 0);
}
if (localStorage.getItem('highestScoreHard') === null) {
    localStorage.setItem('highestScoreHard', 0);
}

let maximumScoreEasy=localStorage.getItem('highestScoreEasy');
let maximumScoreMedium=localStorage.getItem('highestScoreMedium');
let maximumScoreHard=localStorage.getItem('highestScoreHard');
// console.log(maximumScoreEasy+" "+maximumScoreMedium+" "+maximumScoreHard)


const Obstacle={
    // dir:'down',
    obstlen:5,
    obstls:[],
    X:0,
    Y:0,
    CreateObstacle:function(){
        for(let i=0;i<this.obstlen;i++){
            this.obstls.push({
                x1:i+this.X,
                y1:this.Y
            });
            obs.push(i+this.X),
            obs.push(this.Y);
        }
    },
    DrawObstacle:function(){
        pen.fillStyle='rgb(250, 149, 149)';
        for(let obstl of this.obstls){
            pen.fillRect(obstl.x1*cs+200,obstl.y1*cs+200,cs,cs);
            
        }
    },

}


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
        pen.fillStyle='grey';
        pen.fillRect(this.cells[this.cells.length-1].x*cs,this.cells[this.cells.length-1].y*cs,cs,cs);
        pen.fillStyle='brown';
        for(let cell=0;cell<this.cells.length-1;cell++){
            pen.fillRect(this.cells[cell].x*cs,this.cells[cell].y*cs,cs,cs);
            
        }
        
    },
    UpdateSnake:function(){
        // food=getRandomfood();
        let headX=this.cells[this.cells.length-1].x;
        let headY=this.cells[this.cells.length-1].y;
        if(headX===food.x && headY===food.y){
            score++;
            Food_audio.play();
            // alert("ram");
            food=getRandomfood();
            if(level3==='h'){
                while(true){
                    ObstacleSkip=true;
                    for(let i=0;i<obs.length;i+=2){
                        if(food.x*cs===obs[i]*cs+200 && food.y*cs===obs[i+1]*cs+200){
                            // alert("ram");
                            ObstacleSkip=false;
                            food=getRandomfood();
                        }
                    }
                    if(ObstacleSkip) break;
                }
            }
        }
        else{
            
            this.cells.shift();
        }
        let nextX;
        let nextY;

        if(this.direction==='up'){
            prevDirection='up';
            nextX=headX;
            nextY=headY-1;
            if(level2==='m'){
                for(let cell of this.cells){
                    // console.log(cell.x*cs,"ram",cell.y*cs);
                    // con/sole.log(nextX*cs," ",nextY*cs);
                    // console.log()
                    if(nextX*cs===cell.x*cs && nextY*cs===cell.y*cs){
                        pen.fillStyle='red';
                        pen.font='bolder 30pt Ariel';
                        pen.fillText('Game Over',500,350);
                        if(level3==='h' && score>=maximumScoreHard){
                            maximumScoreHard=score;
                            localStorage.setItem('highestScoreHard', maximumScoreHard);
                            pen.fillStyle='Green';
                            pen.fillText(`New Highest Score ${maximumScoreHard}`,500,300);
                        }
                        else if(level2==='m' && score>=maximumScoreMedium){
                            maximumScoreMedium=score;
                            localStorage.setItem('highestScoreMedium', maximumScoreMedium);
                            pen.fillStyle='Green';
                            pen.fillText(`New Highest Score ${maximumScoreMedium}`,500,300);
                        }
                        Hit_audio.play();
                        clearInterval(id);
                        againPlay.style.display="";
                    }
                }
            }
            if(level3==='h'){
                for(let i=0;i<obs.length;i+=2){
                    // console.log(ram);
                    if(nextX*cs===obs[i]*cs+200 && nextY*cs===obs[i+1]*cs+200){
                        pen.fillStyle='red';
                        pen.font='bolder 30pt Ariel';
                        pen.fillText('Game Over',500,350);
                        if(score>=maximumScoreHard){
                            maximumScoreHard=score;
                            localStorage.setItem('highestScoreHard', maximumScoreHard);
                            pen.fillStyle='Green';
                            pen.fillText(`New Highest Score ${maximumScoreHard}`,500,300);
                        }
                        Hit_audio.play();
                        clearInterval(id);
                        againPlay.style.display="";
                    }
                }
            }
            if(nextY*cs<0){
                pen.fillStyle='red';
                pen.font='bolder 30pt Ariel';
                pen.fillText('Game Over',500,350);
                if(level3==='h' && score>=maximumScoreHard){
                    maximumScoreHard=score;
                    localStorage.setItem('highestScoreHard', maximumScoreHard);
                    pen.fillStyle='Green';
                    pen.fillText(`New Highest Score ${maximumScoreHard}`,500,300);
                }
                else if(level2==='m' && score>=maximumScoreMedium){
                    maximumScoreMedium=score;
                    localStorage.setItem('highestScoreMedium', maximumScoreMedium);
                    pen.fillStyle='Green';
                    pen.fillText(`New Highest Score ${maximumScoreMedium}`,500,300);
                }
                else if(level2!=='m' && level3!=='h' && score>=maximumScoreEasy){
                    maximumScoreEasy=score;
                    localStorage.setItem('highestScoreEasy', maximumScoreEasy);
                    pen.fillStyle='Green';
                    pen.fillText(`New Highest Score ${maximumScoreEasy}`,500,300);
                }
                Hit_audio.play();
                clearInterval(id);
                againPlay.style.display="";
            }
        }
        else if(this.direction==='down'){
            prevDirection='down';
            nextX=headX;
            nextY=headY+1;
            if(level2==='m'){
                for(let cell of this.cells){
                    if(nextX*cs===cell.x*cs && nextY*cs===cell.y*cs){
                        pen.fillStyle='red';
                        pen.font='bolder 30pt Ariel';
                        pen.fillText('Game Over',500,350);
                        if(level3==='h' && score>=maximumScoreHard){
                            maximumScoreHard=score;
                            localStorage.setItem('highestScoreHard', maximumScoreHard);
                            pen.fillStyle='Green';
                            pen.fillText(`New Highest Score ${maximumScoreHard}`,500,300);
                        }
                        else if(level2==='m' && score>=maximumScoreMedium){
                            maximumScoreMedium=score;
                            localStorage.setItem('highestScoreMedium', maximumScoreMedium);
                            pen.fillStyle='Green';
                            pen.fillText(`New Highest Score ${maximumScoreMedium}`,500,300);
                        }
                        Hit_audio.play();
                        clearInterval(id);
                        againPlay.style.display="";
                    }
                }
            }
            if(level3==='h'){
                for(let i=0;i<obs.length;i+=2){
                    if(nextX*cs===obs[i]*cs+200 && nextY*cs===obs[i+1]*cs+200){
                        pen.fillStyle='red';
                        pen.font='bolder 30pt Ariel';
                        pen.fillText('Game Over',500,350);
                        if(score>=maximumScoreHard){
                            maximumScoreHard=score;
                            localStorage.setItem('highestScoreHard', maximumScoreHard);
                            pen.fillStyle='Green';
                            pen.fillText(`New Highest Score ${maximumScoreHard}`,500,300);
                        }
                        Hit_audio.play();
                        clearInterval(id);
                        againPlay.style.display="";
                    }
                }
            }
            if(nextY*cs>=H){
                pen.fillStyle='red';
                pen.font='bolder 30pt Ariel';
                pen.fillText('Game Over',500,350);
                if(level3==='h' && score>=maximumScoreHard){
                    maximumScoreHard=score;
                    localStorage.setItem('highestScoreHard', maximumScoreHard);
                    pen.fillStyle='Green';
                    pen.fillText(`New Highest Score ${maximumScoreHard}`,500,300);
                }
                else if(level2==='m' && score>=maximumScoreMedium){
                    maximumScoreMedium=score;
                    localStorage.setItem('highestScoreMedium', maximumScoreMedium);
                    pen.fillStyle='Green';
                    pen.fillText(`New Highest Score ${maximumScoreMedium}`,500,300);
                }
                else if(level2!=='m' && level3!=='h' && score>=maximumScoreEasy){
                    maximumScoreEasy=score;
                    localStorage.setItem('highestScoreEasy', maximumScoreEasy);
                    pen.fillStyle='Green';
                    pen.fillText(`New Highest Score ${maximumScoreEasy}`,500,300);
                }
                Hit_audio.play();
                clearInterval(id);
                againPlay.style.display="";
            }
        }
        else if(this.direction==='right'){
            prevDirection='right';
            nextX=headX+1;
            nextY=headY;
            if(level2==='m'){
                for(let cell of this.cells){
                    if(skip<=3){
                        skip++;
                    }
                    // console.log(cell.x*cs,"ram",cell.y*cs);
                    // console.log(nextX*cs," ",nextY*cs);
                    if(nextX*cs===cell.x*cs && nextY*cs===cell.y*cs && skip>=4){
                        pen.fillStyle='red';
                        pen.font='bolder 30pt Ariel';
                        pen.fillText('Game Over',500,350);
                        if(level3==='h' && score>=maximumScoreHard){
                            maximumScoreHard=score;
                            localStorage.setItem('highestScoreHard', maximumScoreHard);
                            pen.fillStyle='Green';
                            pen.fillText(`New Highest Score ${maximumScoreHard}`,500,300);
                        }
                        else if(level2==='m' && score>=maximumScoreMedium){
                            maximumScoreMedium=score;
                            localStorage.setItem('highestScoreMedium', maximumScoreMedium);
                            pen.fillStyle='Green';
                            pen.fillText(`New Highest Score ${maximumScoreMedium}`,500,300);
                        }
                        Hit_audio.play();
                        clearInterval(id);
                        againPlay.style.display="";
                    }
                }
            }
            if(level3==='h'){
                for(let i=0;i<obs.length;i+=2){
                    // console.log(ram);
                    if(nextX*cs===obs[i]*cs+200 && nextY*cs===obs[i+1]*cs+200){
                        pen.fillStyle='red';
                        pen.font='bolder 30pt Ariel';
                        pen.fillText('Game Over',500,350);
                        if(score>=maximumScoreHard){
                            maximumScoreHard=score;
                            localStorage.setItem('highestScoreHard', maximumScoreHard);
                            pen.fillStyle='Green';
                            pen.fillText(`New Highest Score ${maximumScoreHard}`,500,300);
                        }
                        Hit_audio.play();
                        clearInterval(id);
                        againPlay.style.display="";
                    }
                }
            }
            if(nextX*cs>=W){
                pen.fillStyle='red';
                pen.font='bolder 30pt Ariel';
                pen.fillText('Game Over',500,350);
                if(level3==='h' && score>=maximumScoreHard){
                    maximumScoreHard=score;
                    localStorage.setItem('highestScoreHard', maximumScoreHard);
                    pen.fillStyle='Green';
                    pen.fillText(`New Highest Score ${maximumScoreHard}`,500,300);
                }
                else if(level2==='m' && score>=maximumScoreMedium){
                    maximumScoreMedium=score;
                    localStorage.setItem('highestScoreMedium', maximumScoreMedium);
                    pen.fillStyle='Green';
                    pen.fillText(`New Highest Score ${maximumScoreMedium}`,500,300);
                }
                else if(level2!=='m' && level3!=='h' && score>=maximumScoreEasy){
                    maximumScoreEasy=score;
                    localStorage.setItem('highestScoreEasy', maximumScoreEasy);
                    pen.fillStyle='Green';
                    pen.fillText(`New Highest Score ${maximumScoreEasy}`,500,300);
                }
                Hit_audio.play();
                clearInterval(id);
                againPlay.style.display="";
            }
        }
        else if(this.direction==='left'){
            prevDirection='left';
            nextX=headX-1;
            nextY=headY;
            if(level2==='m'){
                for(let cell of this.cells){
                    if(nextX*cs===cell.x*cs && nextY*cs===cell.y*cs){
                        pen.fillStyle='red';
                        pen.font='bolder 30pt Ariel';
                        pen.fillText('Game Over',500,350);
                        if(level3==='h' && score>=maximumScoreHard){
                            maximumScoreHard=score;
                            localStorage.setItem('highestScoreHard', maximumScoreHard);
                            pen.fillStyle='Green';
                            pen.fillText(`New Highest Score ${maximumScoreHard}`,500,300);
                        }
                        else if(level2==='m' && score>=maximumScoreMedium){
                            maximumScoreMedium=score;
                            localStorage.setItem('highestScoreMedium', maximumScoreMedium);
                            pen.fillStyle='Green';
                            pen.fillText(`New Highest Score ${maximumScoreMedium}`,500,300);
                        }
                        Hit_audio.play();
                        clearInterval(id);
                        againPlay.style.display="";
                    }
                }
            }
            if(level3==='h'){
                for(let i=0;i<obs.length;i+=2){
                    if(nextX*cs===obs[i]*cs+200 && nextY*cs===obs[i+1]*cs+200){
                        pen.fillStyle='red';
                        pen.font='bolder 30pt Ariel';
                        pen.fillText('Game Over',500,350);
                        if(score>=maximumScoreHard){
                            maximumScoreHard=score;
                            localStorage.setItem('highestScoreHard', maximumScoreHard);
                            pen.fillStyle='Green';
                            pen.fillText(`New Highest Score ${maximumScoreHard}`,500,300);
                        }
                        Hit_audio.play();
                        clearInterval(id);
                        againPlay.style.display="";
                    }
                }
            }
            if(nextX*cs<0){
                pen.fillStyle='red';
                pen.font='bolder 30pt Ariel';
                pen.fillText('Game Over',500,350);
                if(level3==='h' && score>=maximumScoreHard){
                    maximumScoreHard=score;
                    localStorage.setItem('highestScoreHard', maximumScoreHard);
                    pen.fillStyle='Green';
                    pen.fillText(`New Highest Score ${maximumScoreHard}`,500,300);
                }
                else if(level2==='m' && score>=maximumScoreMedium){
                    maximumScoreMedium=score;
                    localStorage.setItem('highestScoreMedium', maximumScoreMedium);
                    pen.fillStyle='Green';
                    pen.fillText(`New Highest Score ${maximumScoreMedium}`,500,300);
                }
                else if(level2!=='m' && level3!=='h' && score>=maximumScoreEasy){
                    maximumScoreEasy=score;
                    localStorage.setItem('highestScoreEasy', maximumScoreEasy);
                    pen.fillStyle='Green';
                    pen.fillText(`New Highest Score ${maximumScoreEasy}`,500,300);
                }
                Hit_audio.play();
                clearInterval(id);
                againPlay.style.display="";
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
    // Obstacle.CreateObstacle();
    food=getRandomfood();
    document.addEventListener('keydown',(e)=>{
        if(e.key==='ArrowDown'){
            if(prevDirection==='up'){
                Snake.direction='up';
            }
            else Snake.direction='down';
        }
        else if(e.key==='ArrowUp'){
            if(prevDirection==='down'){
                Snake.direction='down';
            }
            else Snake.direction='up';
        }
        else if(e.key==='ArrowRight'){
            if(prevDirection==='left'){
                Snake.direction='left';
            }
            else Snake.direction='right';
        }
        else if(e.key==='ArrowLeft'){
            if(prevDirection==='right'){
                Snake.direction='right';
            }
            else Snake.direction='left';
        }
    });
}

function Draw(){
    // BackGround_audio.play();
    pen.clearRect(0, 0, W, H);
    pen.font = '20px sans-serif';
    pen.fillStyle = 'yellow';
    if(level3==='h') pen.fillText(`Highest Score Hard ${localStorage.getItem('highestScoreHard')}`, 50, 50);
    else if(level2==='m') pen.fillText(`Highest Score Medium ${localStorage.getItem('highestScoreMedium')}`, 50, 50);
    else if(level1=='e') pen.fillText(`Highest Score Easy ${localStorage.getItem('highestScoreEasy')}`, 50, 50);
    pen.font = '40px sans-serif';
    pen.fillStyle='Orange';
    pen.fillText(`Score ${score}`, 50, 30);
    pen.fillStyle = 'white';
    pen.fillRect(food.x * cs, food.y * cs, cs, cs);
    // pen.fillStyle='yellow
    Snake.DrawSanke();
    Obstacle.DrawObstacle();
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
let speed=100;
function Easy(){
    speed=200;
    level1='e';
    easy.style.display='none';
    medium.style.display='none';
    hard.style.display='none';
    start.style.display="";
    
} 
function Medium(){
    speed=1000;
    level2='m';
    easy.style.display='none';
    medium.style.display='none';
    hard.style.display='none';
    start.style.display="";
}
function Hard(){
    speed=0;
    Obstacle.X=0;
    Obstacle.Y=-1;
    Obstacle.CreateObstacle();
    Obstacle.X=5;
    Obstacle.Y=5;
    Obstacle.CreateObstacle();
    Obstacle.X=10;
    Obstacle.Y=10;
    Obstacle.CreateObstacle();
    Obstacle.X=22;
    Obstacle.Y=5;
    Obstacle.CreateObstacle();
    Obstacle.X=27;
    Obstacle.Y=10;
    Obstacle.CreateObstacle();
    Obstacle.X=32;
    Obstacle.Y=15;
    Obstacle.CreateObstacle();
    level2='m';
    level3='h';
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
const id=setInterval(gameLoop,speed);






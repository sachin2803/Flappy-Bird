const back = document.querySelector(".back");
const pipes = document.querySelector(".pipes");
const bird = document.querySelector(".bird");
const score = document.querySelector(".score");
const warning = document.querySelector(".status");

const gameover = new Event("ongameover");

warning.style.display = "none";
var gameon = true;

var birdtoppos = 250;
var birdleftpos = 200;
var pipeleftpos = window.innerWidth;

var actualscore=0;
var speedmultiple = 1;

var checkstatusVar = setInterval(checkstatus, 1);
var gravityVar = setInterval(gravity, 20);
var birdgoright = setInterval(goright, 20);
var pipegenerator = setInterval(createpipes, 1700);
var scoreVar = setInterval(updatescore, 1);

function updatescore()
{    
    score.innerHTML = "Score: " + parseInt(actualscore);
    actualscore += 0.05;
}

function checkstatus()
{
    if(birdtoppos>468 || !gameon)
    {
        rungameover();
    }
    if(score>speedmultiple*100)
        speedmultiple++;
}

function rungameover()
{
    bird.style.top = 250 + "px";
    gameon = false;
    warning.innerHTML += "</br>Score: " + parseInt(actualscore);
    warning.style.display = "block";
    score.innerHTML = "";
    clearInterval(gravityVar);
    clearInterval(pipegenerator);
    clearInterval(checkstatusVar);
    clearInterval(scoreVar);
}

function gravity()
{
    birdtoppos += 1;
    bird.style.top = birdtoppos + "px";
    if(gameon)
        checkstatus();
}

function goright()
{
    birdleftpos += 5;
    bird.style.left = birdleftpos + "px";
    if(birdleftpos === 500)
        clearInterval(birdgoright);
}

document.onkeydown = checkkey;

function checkkey(e)
{
    if(e.keyCode === 38 && gameon)
    {
        if(birdtoppos>0)
        {
            birdtoppos -= 10;
            bird.style.top = birdtoppos + "px";
        }
    }
    
    if(e.keyCode === 40 && gameon)
    {
        birdtoppos += 8;
        bird.style.top = birdtoppos + "px";
    }

    if(e.keyCode === 37 && gameon)
    {
        if(birdleftpos>0)
        {
            birdleftpos -= 10;
            bird.style.left = birdleftpos + "px";
        }
    }

    if(e.keyCode === 39 && gameon)
    {
        if(birdleftpos<1200)
        {
            birdleftpos += 10;
            bird.style.left = birdleftpos + "px";
        }
    }
}

function createpipes()
{
    var pipeInverted = document.createElement("div");
    var gap = document.createElement("div");
    var pipe = document.createElement("div");
    pipeInverted.classList = "pipeinverted";
    gap.classList = "gap";
    pipe.classList = "pipe";

    let gapheight = 80 + Math.floor(Math.random()*100);
    let margin = -376 + Math.floor(Math.random()*(436-gapheight));

    pipeInverted.style.marginTop = margin + "px";
    gap.style.height = gapheight + "px";

    var newpipes = document.createElement("div");
    newpipes.classList = "pipes";
    newpipes.appendChild(pipeInverted);
    newpipes.appendChild(gap);
    newpipes.appendChild(pipe);
    newpipes.style.zIndex = 1;
    back.appendChild(newpipes);
    
    let newpipesleft = window.innerWidth;

    function movenewpipes()
    {
        if(newpipesleft>750)
            newpipesleft -= 12;
        else
            newpipesleft -= 5;
            
        newpipes.style.left = newpipesleft + "px";
        if(!gameon)
            clearInterval(newpipeVar);
        if(newpipesleft<-60)
            newpipes.remove();
        
        var gaprect = gap.getBoundingClientRect();
        var birdrect = bird.getBoundingClientRect();   
        
        if((gaprect.left <= birdrect.right-3 && birdrect.right-3 <= gaprect.right) || (gaprect.left <= birdrect.left+3 && birdrect.left+3 <= gaprect.right))
        {
            if(birdrect.top+5 <= gaprect.top || birdrect.bottom-2 >= gaprect.bottom)
                gameon = false;
        }
    }
    var newpipeVar = setInterval(movenewpipes, 20);
}

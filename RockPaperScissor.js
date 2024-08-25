const score=JSON.parse(localStorage.getItem('score'))||{
    wins:0,
    losses:0,
    ties:0
};

document.querySelector('.js-rock-button').addEventListener('click',()=>{
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click',()=>{
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click',()=>{
    playGame('scissors');
});

document.querySelector('.js-auto-button').addEventListener('click',()=>{
    autoplay();
});

document.querySelector('.js-reset-score').addEventListener('click',()=>{
    showConformationMsg();
});

function resetScore(){
        score.wins=0;
        score.losses=0;
        score.ties=0;
        localStorage.removeItem('score');
        updateScoreElement();
};

function showConformationMsg(){
    
    document.querySelector('.js-conformation-msg')
    .innerHTML=`Are you sure you want to reset the score?<button class="conform-yes-msg">Yes</button>
    <button class="conform-no-msg">No</button>
    `;

    document.querySelector('.conform-yes-msg').addEventListener('click',()=>{
        resetScore();
        hideConformationMsg();
    });

    document.querySelector('.conform-no-msg').addEventListener('click',()=>{
        hideConformationMsg();
    });

}

function hideConformationMsg(){
    document.querySelector('.js-conformation-msg').innerHTML='';
};

document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
        playGame('rock');
    }
    else if(event.key==='p'){
        playGame('paper');
    }
    else if(event.key==='s'){
        playGame('scissors');
    }
    else if(event.key==='a'){
        autoplay();
    }
    else if(event.key==='Backspace'){
        showConformationMsg();
    }
});
updateScoreElement();
function playGame(playerMove){
    hideConformationMsg();
    const computerMove=pickComputerMove();

    let result='';
    if(playerMove==='scissors'){
    if(computerMove === 'rock'){
        result='You Loss';
    }
    else if(computerMove === 'paper'){
        result='You Win';
    }
    else if(computerMove === 'scissors'){
        result='You Tie';
    }
    }

    else if(playerMove==='paper'){
    if(computerMove === 'rock'){
        result='You Win';
    }
    else if(computerMove === 'paper'){
        result='You Tie';
    }
    else if(computerMove === 'scissors'){
        result='You Loss';
    }
    }

    else if(playerMove==='rock'){
    if(computerMove === 'rock'){
        result='You Tie';
    }
    else if(computerMove === 'paper'){
        result='You Loss';
    }
    else if(computerMove === 'scissors'){
        result='You Win';
    }
    }

    if(result==='You Win'){
        score.wins +=1;
    }
    else if(result==='You Loss'){
        score.losses +=1;
    }
    else if(result=='You Tie'){
        score.ties +=1;
    }
    localStorage.setItem('score',JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result')
    .innerHTML=`${result}`;

    document.querySelector('.js-moves')
    .innerHTML=`You 
    <img src="${playerMove}-emoji.png"
    class="move-icon">
    <img src="${computerMove}-emoji.png"
    class="move-icon">
    Computer`;
}

function updateScoreElement(){
    document.querySelector('.js-score')
    .innerHTML=`Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;
}

function pickComputerMove(){
    const randomNumber= Math.random();
    let computerMove='';
    let result='';
    if(randomNumber>=0 && randomNumber<=1/3){
        computerMove='rock';
    }
    else if (randomNumber>=1/3 && randomNumber<=2/3){
        computerMove='paper';
    }
    else if (randomNumber>=2/3 && randomNumber<=1) {
        computerMove='scissors';
    }
    
    return computerMove;
}
let isAutoPlaying=false;
let intervalID;

function autoplay(){
    if(!isAutoPlaying){
    hideConformationMsg();
    intervalID=setInterval(()=>{
        document.querySelector('.js-auto-button').innerHTML='Stop Playing';
        const playerMove=pickComputerMove();
        playGame(playerMove);
    },1000);
    isAutoPlaying=true;
    }
    else {
        hideConformationMsg();
        document.querySelector('.js-auto-button').innerHTML='Auto Play';
        clearInterval(intervalID);
        isAutoPlaying=false;
    }
}
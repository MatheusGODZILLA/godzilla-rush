// Captura de Elementos-Chave
const kaiju = document.getElementById('kaiju');
const pipe = document.getElementById('pipe');
const clouds = document.querySelector('.clouds');
const restartButton = document.getElementById('restart-button');
const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const gameBoard = document.getElementById('game-board');

const plane = document.querySelector('.plane');
const superX = document.querySelector('.superX');
const gotengo = document.querySelector('.gotengo');

const icon = document.querySelector('.icon');
const scores = document.querySelector('.score');
const highscores = document.querySelector('.highscore');
const scoreBoard = document.querySelector('.score-board');

const somAndando = document.getElementById("somAndando");
const gameover = document.getElementById("gameover");
const collide = document.getElementById("collide");
const fly = document.getElementById("fly");
const fall = document.getElementById("fall");
const pain = document.getElementById("pain");
const bgm = document.getElementById("bgm");
const rush = document.getElementById("rush");

let isGameOver = false;
let isGameStarted = false;
let loopId;
let score = 0;
let highscore = localStorage.getItem('highscore') || 0;

// Variáveis de Dificuldade
let currentPipeSpeed = 1.6;
let currentJumpDuration = 550;

// Cache de Dimensões (Otimização JS: evita recálculo desnecessário de width/height todo frame)
let cachedKaijuWidth = 0;
let cachedKaijuHeight = 0;

const formatScore = (num) => String(num).padStart(4, '0');

const updateHighscore = () => {
    if (score > highscore) {
        highscore = score;
        localStorage.setItem('highscore', score);
    }
    document.getElementById('highscore').textContent = formatScore(highscore);
};

// Mecânica do Pulo Sincronizada via Hardware Acceleration
const jump = (event) => {
    if (event && event.type === 'keydown' && event.code !== 'Space' && event.code !== 'ArrowUp') return;
    
    if (!isGameOver && isGameStarted) {
        if (kaiju.classList.contains('jump')) return;

        kaiju.style.animationDuration = `${currentJumpDuration}ms`;
        kaiju.classList.add('jump');
        
        fly.currentTime = 0;
        fly.play().catch(() => {});

        setTimeout(() => {
            kaiju.classList.remove('jump');
            kaiju.style.animationDuration = ''; 
            
            if (!isGameOver) {
                gameBoard.classList.add('landing-shake');
                setTimeout(() => gameBoard.classList.remove('landing-shake'), 150);
            }

            if (!isGameOver) {
                fall.currentTime = 0;
                fall.play().catch(() => {});
                score += 10;
                document.getElementById('score').textContent = formatScore(score);
                
                if (score > 0 && score % 50 === 0) increaseDifficulty();
            }
            updateHighscore();
        }, currentJumpDuration);
    }
};

const increaseDifficulty = () => {
    currentPipeSpeed = Math.max(0.9, currentPipeSpeed * 0.975);
    pipe.style.animationDuration = `${currentPipeSpeed}s`;

    currentJumpDuration = Math.max(350, currentJumpDuration * 0.98);

    if (score === 100) gameBoard.classList.add('threat-level-1');
    if (score === 200) gameBoard.classList.add('threat-level-2');
    if (score === 300) gameBoard.classList.add('threat-level-3');
    if (score >= 400 && score % 100 === 0) {
        gameBoard.classList.add('threat-level-max');
    }
};

const initPrematch = () => {
    pipe.style.animationPlayState = 'paused';
    pipe.style.display = 'none';
    kaiju.style.animationPlayState = 'paused';
    clouds.style.animationPlayState = 'paused';
    clouds.style.display = 'none';
    plane.style.animationPlayState = 'paused';
    superX.style.animationPlayState = 'paused';
    gotengo.style.animationPlayState = 'paused';
    
    kaiju.src = './img/stop.gif';
    kaiju.style.width = '190px';
    
    gameBoard.classList.remove('threat-level-1', 'threat-level-2', 'threat-level-3', 'threat-level-max');
    currentPipeSpeed = 1.6;
    currentJumpDuration = 550;
    pipe.style.animationDuration = `${currentPipeSpeed}s`;
    
    // Desliga a sirene no fundo
    document.body.classList.remove('is-playing');
    
    updateHighscore();
};

const resumeAnimations = () => {
    pipe.style.animationPlayState = 'running';
    pipe.style.display = 'block';
    
    kaiju.style.animationPlayState = 'running';
    kaiju.src = './img/godzilla.gif';

    clouds.style.animationPlayState = 'running';
    clouds.style.display = 'block';

    plane.style.animationPlayState = 'running';
    superX.style.animationPlayState = 'running';
    gotengo.style.animationPlayState = 'running';
    
    gameBoard.classList.add('is-playing');
    
    // Liga a sirene no fundo global do body
    document.body.classList.add('is-playing');
    
    // Atualiza o cache de dimensões uma única vez no início
    cachedKaijuWidth = kaiju.getBoundingClientRect().width;
    cachedKaijuHeight = kaiju.getBoundingClientRect().height;

    somAndando.play().catch(() => {});

    scoreBoard.style.display = 'flex';
    icon.style.display = 'block';
    scores.style.display = 'block';
    highscores.style.display = 'block';
    
    document.addEventListener('keydown', jump);
    document.addEventListener('touchstart', jump);
};

// Loop de Jogo Principal Altamente Otimizado
const gameLoop = () => {
    if (!isGameStarted) return;

    // getBoundingClientRect é rápido se não houver reflow. Retorna x/y baseados na janela.
    const kaijuRect = kaiju.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();

    // Usando as variáveis cacheadas em vez de ler propriedades repetitivamente
    const kHitbox = {
        left: kaijuRect.left + (cachedKaijuWidth * 0.30),  
        right: kaijuRect.right - (cachedKaijuWidth * 0.15), 
        top: kaijuRect.top + (cachedKaijuHeight * 0.10),    
        bottom: kaijuRect.bottom - 10                      
    };

    const pHitbox = {
        left: pipeRect.left + 5,
        right: pipeRect.right - 5,
        top: pipeRect.top + 5,
        bottom: pipeRect.bottom
    };

    if (
        kHitbox.right > pHitbox.left &&
        kHitbox.left < pHitbox.right &&
        kHitbox.bottom > pHitbox.top &&
        kHitbox.top < pHitbox.bottom
    ) {
        isGameOver = true;
        
        const boardRect = gameBoard.getBoundingClientRect();
        
        gameBoard.classList.add('shake');
        gameBoard.classList.remove('is-playing'); 
        
        // Desliga a sirene no fundo
        document.body.classList.remove('is-playing');

        // Como usamos 'transform' no CSS, precisamos traduzir a posição visual atual
        // para uma posição fixa absoluta na tela ao morrer.
        pipe.style.animation = 'none';
        pipe.style.left = `${pipeRect.left - boardRect.left}px`;
        pipe.style.transform = 'none'; // Zera o transform para não somar duas vezes
        
        kaiju.style.animation = 'none';
        kaiju.style.bottom = `${boardRect.bottom - kaijuRect.bottom}px`; 
        kaiju.style.transform = 'none';
        
        gameBoard.classList.add('game-over');

        kaiju.src = './img/game-over.png';
        kaiju.style.width = '200px';

        gameOverScreen.style.display = 'flex';

        somAndando.pause();
        bgm.pause();
        
        gameover.currentTime = 0;
        collide.currentTime = 0;
        pain.currentTime = 0;
        
        gameover.play().catch(() => {});
        collide.play().catch(() => {});
        pain.play().catch(() => {});

        updateHighscore();
        cancelAnimationFrame(loopId);
        return;
    }

    loopId = requestAnimationFrame(gameLoop);
};

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    isGameStarted = true;
    
    resumeAnimations();
    
    bgm.volume = 0.55;
    bgm.play().catch(() => {});
    rush.pause(); 
    
    loopId = requestAnimationFrame(gameLoop);
});

const restartGame = () => {
    cancelAnimationFrame(loopId);
    window.location.reload();
};

restartButton.addEventListener('click', restartGame);

initPrematch();

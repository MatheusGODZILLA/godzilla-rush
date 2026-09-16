// Captura de Elementos-Chave
const kaiju = document.querySelector('.kaiju');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const restartButton = document.getElementById('restart-button');
const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const gameBoard = document.querySelector('.game-board');

// Elementos Secundários de Fundo
const plane = document.querySelector('.plane');
const superX = document.querySelector('.superX');
const gotengo = document.querySelector('.gotengo');

// HUD
const icon = document.querySelector('.icon');
const scores = document.querySelector('.score');
const highscores = document.querySelector('.highscore');
const scoreBoard = document.querySelector('.score-board');

// Áudios do Jogo
const somAndando = document.getElementById("somAndando");
const gameover = document.getElementById("gameover");
const collide = document.getElementById("collide");
const fly = document.getElementById("fly");
const fall = document.getElementById("fall");
const pain = document.getElementById("pain");
const bgm = document.getElementById("bgm");
const rush = document.getElementById("rush");

// Estado do Jogo
let isGameOver = false;
let isGameStarted = false;
let loopId;
let score = 0;
let highscore = localStorage.getItem('highscore') || 0;
let baseSpeed = 1.6; // Tempo de animação inicial do obstáculo (segundos)

// Sistema de Placar Formatado
const formatScore = (num) => String(num).padStart(4, '0');

const updateHighscore = () => {
    if (score > highscore) {
        highscore = score;
        localStorage.setItem('highscore', score);
    }
    document.getElementById('highscore').textContent = formatScore(highscore);
};

// Mecânica do Pulo
const jump = (event) => {
    // Teclas aceitas: Espaço (Space) ou Seta pra Cima (ArrowUp) ou cliques no mobile
    if (event && event.type === 'keydown' && event.code !== 'Space' && event.code !== 'ArrowUp') return;
    
    // Evita ação fora de jogo ou duplo-pulo consecutivo
    if (!isGameOver && isGameStarted) {
        if (kaiju.classList.contains('jump')) return;

        kaiju.classList.add('jump');
        fly.currentTime = 0;
        fly.play().catch(() => {});

        setTimeout(() => {
            kaiju.classList.remove('jump');
            if (!isGameOver) {
                fall.currentTime = 0;
                fall.play().catch(() => {});
                score += 10;
                document.getElementById('score').textContent = formatScore(score);
                
                // Adaptação de Dificuldade: Acelera o obstáculo levemente a cada 50 pontos
                if (score % 50 === 0) {
                    increaseDifficulty();
                }
            }
            updateHighscore();
        }, 520);
    }
};

// Progressão de Dificuldade (Gameplay interessante!)
const increaseDifficulty = () => {
    const nextSpeed = Math.max(0.7, baseSpeed - (score * 0.0015));
    pipe.style.animationDuration = `${nextSpeed}s`;
};

// Configurações e Preparo Pré-Jogo
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
    kaiju.style.width = '190px'; // Tamanho padronizado

    // Inicializa placares ocultos
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
    
    somAndando.play().catch(() => {});

    // Ativa HUD
    scoreBoard.style.display = 'flex';
    icon.style.display = 'block';
    scores.style.display = 'block';
    highscores.style.display = 'block';
    
    // Listeners
    document.addEventListener('keydown', jump);
    document.addEventListener('touchstart', jump);
};

// Loop de Jogo Principal (Refatorado & Sem Stuttering)
const gameLoop = () => {
    if (!isGameStarted) return;

    const pipePosition = pipe.offsetLeft;
    const kaijuPosition = Number(window.getComputedStyle(kaiju).bottom.replace('px', ''));

    // Detecção Fina de Colisão (Hitbox ajustada para melhor gameplay!)
    // O cano/obstáculo precisa estar entre 45px e 200px da esquerda e o Kaiju abaixo de 68px de altura
    if (pipePosition <= 200 && pipePosition > 45 && kaijuPosition < 68) {
        isGameOver = true;
        
        // Tremor de tela dramático ao colidir
        gameBoard.classList.add('shake');

        // Congela movimentos na hora
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        kaiju.style.animation = 'none';
        kaiju.style.bottom = `${kaijuPosition}px`;
        
        // Ativa classe no container para aplicar blur & opacidade nos secundários via CSS (combate a aglomeração)
        gameBoard.classList.add('game-over');

        kaiju.src = './img/game-over.png';
        kaiju.style.width = '200px';

        // Mostra a Overlay de GameOver e oculta elementos dinâmicos
        gameOverScreen.style.display = 'flex';

        // Sons & Músicas de Derrota
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

// Iniciar Partida
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    isGameStarted = true;
    
    resumeAnimations();
    
    bgm.volume = 0.55;
    bgm.play().catch(() => {});
    rush.pause(); 
    
    // Começa Loop Sincronizado
    loopId = requestAnimationFrame(gameLoop);
});

// Reinício Rápido
const restartGame = () => {
    cancelAnimationFrame(loopId);
    window.location.reload();
};

restartButton.addEventListener('click', restartGame);

// Executa Preparo
initPrematch();

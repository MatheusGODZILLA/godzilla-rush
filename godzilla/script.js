// Atribuindo às variáveis os elementos que serão funcionais/interativos no joguinho
const kaiju = document.querySelector('.kaiju');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const restart = document.querySelector('.restart-button');
const startButton = document.getElementById('start-button');
const beginContainer = document.querySelector('.begin');
const gameBoard = document.querySelector('.game-board');
const perdeu = document.querySelector('.perdeu');
const plane = document.querySelector('.plane');
const superX = document.querySelector('.superX');
const gotengo = document.querySelector('.gotengo');
const icon = document.querySelector('.icon');
const scores = document.querySelector('.score');
const highscores = document.querySelector('.highscore');
const somAndando = document.getElementById("somAndando");
const gameover = document.getElementById("gameover");
const collide = document.getElementById("collide");
const fly = document.getElementById("fly");
const fall = document.getElementById("fall");
const pain = document.getElementById("pain");
const record = document.getElementById("record");
const bgm = document.getElementById("bgm");
const rush = document.getElementById("rush");

let isGameOver = false; // Variável para controlar o estado do jogo
let isGameStarted = false; // Variável para controlar se o jogo foi iniciado

rush.play(); // Toca a melodia de início da corrida

// Trabalhando o sistema de pontuação
let score = 0;
let highscore = localStorage.getItem('highscore') || 0; // Pega o highscore atual da local storage ou define como 0 se não houver

// Função para atualizar o highscore
const updateHighscore = () => {
    if (score > highscore) {
        localStorage.setItem('highscore', score); // Atualiza o highscore se o score atual for maior
    }
    document.getElementById('highscore').textContent = localStorage.getItem('highscore'); // Exibe o highscore na página
};

// Variável que executa a ação e a animação de pular juntamente com os seus respectivos sons (pulo e queda)
const jump = () => {
    if (!isGameOver) { // Verifica se o jogo ainda está em execução
        kaiju.classList.add('jump');
        fly.play();

        setTimeout(() => {
            kaiju.classList.remove('jump');
            fall.play();
            if (!isGameOver){
                score += 10; // Adiciona 10 pontos por cada pulo bem sucedido
                document.getElementById('score').textContent = score; // Atualiza a pontuação
            } else {
                score += 0; // Não adiciona pontos em caso de falha
                document.getElementById('score').textContent = score;
            }
            updateHighscore(); // Atualiza o highscore ao final
        }, 500);
    }
}

// Pausar todas as animações antes da partida iniciar
pipe.style.animationPlayState = 'paused';
pipe.style.display = 'none';
kaiju.style.animationPlayState = 'paused';
clouds.style.animationPlayState = 'paused';
clouds.style.display = 'none';
plane.style.animationPlayState = 'paused';
superX.style.animationPlayState = 'paused';
gotengo.style.animationPlayState = 'paused';
kaiju.src = './img/stop.gif';
kaiju.style.width = '280px'

// Função para iniciar todas as animações
const resumeAnimations = () => {
    pipe.style.animationPlayState = 'running';
    pipe.style.display = 'block';
    kaiju.style.animationPlayState = 'running';
    clouds.style.animationPlayState = 'running';
    clouds.style.display = 'block';
    plane.style.animationPlayState = 'running';
    superX.style.animationPlayState = 'running';
    gotengo.style.animationPlayState = 'running';
    somAndando.play(); // Reprodução do som do caminhado do Kaiju
    kaiju.src = './img/godzilla.gif'; // Animação do Kaiju

    icon.style.display = 'block';
    scores.style.display = 'block';
    highscores.style.display = 'block';
    
    // Adiciona o ouvinte de evento para o salto
    document.addEventListener('keydown', jump);
    document.addEventListener('touchstart', jump);
}

startButton.addEventListener('click', () => {
    // Esconde a tela de início
    beginContainer.style.display = 'none';
    
    // Mostra o tabuleiro do jogo
    gameBoard.style.display = 'block';

    // Marca o jogo como iniciado
    isGameStarted = true;
    
    // Carrega as animações
    resumeAnimations();

    // Toca a música de fundo
    bgm.play();
    
    // Inicie o loop principal do jogo
    loop();
});
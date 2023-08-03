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
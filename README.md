# 🦖 GODZILLA-RUSH
**Missão de Contenção Kaiju**

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

> **"O Rei dos Monstros despertou. Prepare-se para a corrida de sobrevivência."**

**GODZILLA-RUSH** é um web game em estilo *endless runner* desenvolvido com o intuito de praticar e aprimorar fundamentos de programação e arquitetura de software utilizando **JavaScript (Vanilla), HTML5 e CSS3**. 

Inspirado na clássica mecânica do jogo do dinossauro do Google, este projeto substitui o deserto por um cenário de desastre cinematográfico, colocando o jogador no controle do lendário Rei dos Monstros enfrentando a artilharia militar.

---

## 🕹️ Funcionalidades e Implementações Técnicas

Além da mecânica básica de pulo, o projeto foca em boas práticas de performance em navegadores e design responsivo:

* **Física e Hitbox Avançada (AABB):** Sistema de colisão cirúrgico ignorando as áreas vazias dos sprites para uma gameplay justa.
* **Curva de Dificuldade Dinâmica:** Aceleração percentual contínua baseada no *score* do jogador.
* **Transição de Ameaça:** Alteração de atmosfera e cores do cenário (Filtros CSS dinâmicos) conforme o jogador atinge pontuações mais altas.
* **Alta Performance (60 FPS):** Motor de jogo otimizado com `requestAnimationFrame` e renderização de animações delegadas à Placa de Vídeo (*Hardware Acceleration* com `transform` e `will-change`).
* **Design Cyber-Arcade:** Interface baseada em terminais militares antigos com efeitos de tela CRT, scanlines e elementos em *glassmorphism*.

---

## 🚀 Como Jogar

1. O jogo roda diretamente no navegador, sem necessidade de instalar dependências ou servidores locais.
2. Acesse o link na descrição do repositório para jogar online.
3. Para jogar offline, baixe ou clone este repositório.
4. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox).
5. **Comandos:** Pressione `ESPAÇO`, `SETA PARA CIMA` ou **TOQUE NA TELA** (mobile) para pular e desviar das tubulações e armadilhas militares.

---

## 📂 Créditos e Referências

Este projeto foi construído com base em materiais da comunidade para fins estritamente educacionais e de estudo.

**Engenharia Base:**
* Tutorial [Como criar um jogo SIMPLES usando JavaScript e HTML](https://www.youtube.com/watch?v=r9buAwVBDhA) pelo canal *Manual do Dev*.

**Design de Som:**
* Efeitos Sonoros 1: [Godzilla Kaijuu Daikessen (SNES)](https://downloads.khinsider.com/game-soundtracks/album/godzilla-kaijuu-daikessen-snes)
* Efeitos Sonoros 2: [Godzilla Monster of Monsters (NES)](https://www.sounds-resource.com/nes/godzillamonsterofmonsters/sound/4004/)

**Animações e Sprites:**
* Personagens base: [Godzilla Dr. T - Mugen Archive](https://mugenarchive.com/forums/downloads.php?do=file&id=15249-godzilla-dr-t)
* Elementos complementares: [Projeto Scratch (348871879)](https://scratch.mit.edu/projects/348871879)

---

## 👨‍💻 Desenvolvedor

**Matheus da Silva**
* Redes Sociais / Contato: [Meu Linktree](https://linktr.ee/matheusgodzilla)

---

## ⚠️ Aviso Legal

Este é um projeto **não comercial e sem fins lucrativos**, criado exclusivamente como portfólio de programação e estudo de código. Trata-se de uma homenagem não oficial.

> **GODZILLA and its related characters are property of TOHO CO., LTD.**

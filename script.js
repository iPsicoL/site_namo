document.addEventListener('DOMContentLoaded', () => {

    // APENAS UMA DECLARAÇÃO DE heroSection AQUI:
    const heroSection = document.querySelector('.hero'); //

    const backgroundImages = [
        'img/hero-bg1.jpeg',
        'img/hero-bg2.jpeg',
        'img/hero-bg3.jpeg',
        'img/hero-bg4.jpeg',
        'img/hero-bg5.jpeg',
        'img/hero-bg6.jpeg'
        // Adicione mais caminhos de imagens conforme necessário
    ];
    let currentImageIndex = 0;
    const changeBackgroundImageInterval = 5000; // 5000 milissegundos = 5 segundos

    function changeBackgroundImage() {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${backgroundImages[(currentImageIndex % backgroundImages.length)]}')`;
        currentImageIndex++;
    }

    // Inicia o slideshow de fundo
    changeBackgroundImage();
    setInterval(changeBackgroundImage, changeBackgroundImageInterval);


    const startDate = new Date('2024-11-09T20:00:00');
    const countdownElement = document.getElementById('countdown');

    function updateCountdown() {
        const now = new Date();
        const diff = now.getTime() - startDate.getTime();

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const formatTime = (time) => String(time).padStart(2, '0');

        countdownElement.innerHTML = `
            <span id="days">${days}</span> dias
            <span id="hours">${formatTime(hours)}</span> horas
            <span id="minutes">${formatTime(minutes)}</span> minutos
            <span id="seconds">${formatTime(seconds)}</span> segundos
        `;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // ... Seu código dos corações flutuantes existente ...
    // A variável heroSection já foi declarada no início, não declare novamente aqui.
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 8 + 7 + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.opacity = Math.random() * 0.4 + 0.3;
        heart.style.fontSize = Math.random() * 1.5 + 1.5 + 'em';
        heroSection.appendChild(heart); // Usando a heroSection já declarada

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    setInterval(createHeart, 1200);

    document.querySelectorAll('.polaroid').forEach(polaroid => {
        const randomRotation = Math.random() * 10 - 5;
        polaroid.style.setProperty('--rotation', `${randomRotation}deg`);
    });

    // --- Lógica para controle de música ATUALIZADA ---
    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = musicToggle.querySelector('i');

    // Tenta tocar a música assim que a página é carregada
    // Captura o erro se o navegador bloquear o autoplay
    backgroundMusic.play().then(() => {
        // Se a reprodução automática for bem-sucedida
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-pause');
        backgroundMusic.volume = 0.5; // Ajuste o volume se for muito alto inicialmente
    }).catch(error => {
        // Se a reprodução automática for bloqueada
        console.warn('Reprodução automática de áudio bloqueada pelo navegador.', error);
        // O ícone deve permanecer como 'play' se a música não tocar
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-play');
    });

    // Event listener para o botão de toggle (play/pause)
    musicToggle.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                musicIcon.classList.remove('fa-play');
                musicIcon.classList.add('fa-pause');
            }).catch(error => {
                console.error('Erro ao tentar tocar a música por clique do usuário:', error);
            });
        } else {
            backgroundMusic.pause();
            musicIcon.classList.remove('fa-pause');
            musicIcon.classList.add('fa-play');
        }
    });

    // Opcional: Ajusta o ícone se o usuário clicar na página (qualquer lugar)
    // Isso pode ajudar em alguns casos onde o navegador espera qualquer interação
    document.body.addEventListener('click', () => {
        if (backgroundMusic.paused && backgroundMusic.currentTime === 0) { // Tenta tocar apenas se não tiver tocado ainda
            backgroundMusic.play().then(() => {
                musicIcon.classList.remove('fa-play');
                musicIcon.classList.add('fa-pause');
            }).catch(error => {
                // Ignore erros, já que a interação do usuário pode não ser suficiente
            });
        }
    }, { once: true }); // Executa apenas uma vez
});
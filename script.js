document.addEventListener('DOMContentLoaded', () => {

    const heroSection = document.querySelector('.hero');

    const backgroundImages = [
        'img/hero-bg1.jpeg',
        'img/hero-bg2.jpeg',
        'img/hero-bg3.jpeg',
        'img/hero-bg4.jpeg',
        'img/hero-bg5.jpeg',
        'img/hero-bg6.jpeg'
    ];
    let currentImageIndex = 0;
    const changeBackgroundImageInterval = 5000;

    function changeBackgroundImage() {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${backgroundImages[(currentImageIndex % backgroundImages.length)]}')`;
        currentImageIndex++;
    }

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

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 8 + 7 + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.opacity = Math.random() * 0.4 + 0.3;
        heart.style.fontSize = Math.random() * 1.5 + 1.5 + 'em';
        heroSection.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    setInterval(createHeart, 1200);

    document.querySelectorAll('.polaroid').forEach(polaroid => {
        const randomRotation = Math.random() * 10 - 5;
        polaroid.style.setProperty('--rotation', `${randomRotation}deg`);
    });

    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = musicToggle.querySelector('i');

    backgroundMusic.play().then(() => {
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-pause');
        backgroundMusic.volume = 0.5;
    }).catch(error => {
        console.warn('Reprodução automática de áudio bloqueada pelo navegador.', error);
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-play');
    });

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

    document.body.addEventListener('click', () => {
        if (backgroundMusic.paused && backgroundMusic.currentTime === 0) {
            backgroundMusic.play().then(() => {
                musicIcon.classList.remove('fa-play');
                musicIcon.classList.add('fa-pause');
            }).catch(error => {
                // Ignore errors
            });
        }
    }, { once: true });


    // Lógica para o Modal de Imagem
    const galleryGrid = document.querySelector('.gallery-grid');
    let imageModalOverlay;
    let imageModalContent;
    let modalImage;
    let closeModalBtn;

    function createModalElements() {
        // Overlay do modal
        imageModalOverlay = document.createElement('div');
        imageModalOverlay.classList.add('image-modal-overlay');
        document.body.appendChild(imageModalOverlay);

        // Conteúdo do modal (onde a imagem ampliada estará)
        imageModalContent = document.createElement('div');
        imageModalContent.classList.add('image-modal-content');
        imageModalOverlay.appendChild(imageModalContent);

        // Imagem dentro do modal
        modalImage = document.createElement('img');
        imageModalContent.appendChild(modalImage);

        // Botão de fechar
        closeModalBtn = document.createElement('button');
        closeModalBtn.classList.add('close-modal');
        closeModalBtn.innerHTML = '&times;'; // Caractere 'X' para fechar
        imageModalOverlay.appendChild(closeModalBtn); // Adiciona o botão de fechar ao overlay, não ao conteúdo

        // Event listener para fechar o modal
        imageModalOverlay.addEventListener('click', (e) => {
            if (e.target === imageModalOverlay || e.target === closeModalBtn) {
                closeImageModal();
            }
        });

        // Event listener para fechar com a tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageModalOverlay.classList.contains('active')) {
                closeImageModal();
            }
        });
    }

    function openImageModal(imageSrc) {
        if (!imageModalOverlay) { // Se os elementos do modal ainda não existem, crie-os
            createModalElements();
        }
        modalImage.src = imageSrc;
        imageModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita rolagem da página quando o modal está aberto
    }

    function closeImageModal() {
        if (imageModalOverlay) {
            imageModalOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restaura a rolagem da página
        }
    }

    // Adiciona o event listener para cliques nas imagens polaroid
    galleryGrid.addEventListener('click', (e) => {
        const clickedImage = e.target.closest('.polaroid img');
        if (clickedImage) {
            openImageModal(clickedImage.src);
        }
    });
});
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

    // --- Lógica de Corações Flutuantes Refatorada ---
    let heroHeartInterval;
    let modalHeartInterval;

    function createHeart(container) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 8 + 7 + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.opacity = Math.random() * 0.4 + 0.3;
        heart.style.fontSize = Math.random() * 1.5 + 1.5 + 'em';
        container.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    function startHeroHearts() {
        if (!heroHeartInterval) { // Evita criar múltiplos intervalos
            heroHeartInterval = setInterval(() => createHeart(heroSection), 1200);
        }
    }

    function stopHeroHearts() {
        clearInterval(heroHeartInterval);
        heroHeartInterval = null;
        heroSection.querySelectorAll('.heart').forEach(heart => heart.remove());
    }

    function startModalHearts() {
        if (!modalHeartInterval) { // Evita criar múltiplos intervalos
            if (!imageModalOverlay) { // Garante que o modal foi criado para adicionar corações
                createModalElements();
            }
            modalHeartInterval = setInterval(() => createHeart(imageModalOverlay), 1000); // Frequência um pouco maior para o modal
        }
    }

    function stopModalHearts() {
        clearInterval(modalHeartInterval);
        modalHeartInterval = null;
        if (imageModalOverlay) {
             imageModalOverlay.querySelectorAll('.heart').forEach(heart => heart.remove());
        }
    }

    // --- Fim da Lógica de Corações Flutuantes Refatorada ---


    document.querySelectorAll('.polaroid').forEach(polaroid => {
        const randomRotation = Math.random() * 10 - 5;
        polaroid.style.setProperty('--rotation', `${randomRotation}deg`);
    });

    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = musicToggle.querySelector('i');

    // --- Pop-up and Music Control ---
    const accessPopup = document.getElementById('access-popup');
    const enterSiteBtn = document.getElementById('enter-site-btn');

    // Initially hide the main content by adding a class to body
    document.body.classList.add('locked');

    enterSiteBtn.addEventListener('click', () => {
        accessPopup.style.display = 'none'; // Hide the pop-up
        document.body.classList.remove('locked'); // Unlock body scroll

        // Play music
        backgroundMusic.play().then(() => {
            musicIcon.classList.remove('fa-play');
            musicIcon.classList.add('fa-pause');
            backgroundMusic.volume = 0.2; // Volume ajustado
        }).catch(error => {
            console.warn('Reprodução de áudio bloqueada.', error);
        });

        // Inicia os corações da seção hero após o pop-up ser fechado
        startHeroHearts();
    });

    // Handle music toggle for user interaction after pop-up
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

    // Prevent autoplay on load, it will be handled by the pop-up button
    backgroundMusic.pause(); // Ensure it's paused initially
    musicIcon.classList.remove('fa-pause'); // Ensure play icon is shown
    musicIcon.classList.add('fa-play');

    // --- End Pop-up and Music Control ---


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
        closeModalBtn.innerHTML = '&times'; // Caractere 'X' para fechar
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
        startModalHearts(); // Inicia os corações no modal
    }

    function closeImageModal() {
        if (imageModalOverlay) {
            imageModalOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restaura a rolagem da página
            stopModalHearts(); // Para os corações no modal
        }
    }

    // Adiciona o event listener para cliques nas imagens polaroid
    galleryGrid.addEventListener('click', (e) => {
        const clickedImage = e.target.closest('.polaroid img');
        if (clickedImage) {
            openImageModal(clickedImage.src);
        }
    });

    // --- Lógica para o Novo Pop-up de Link Externo ---
    const openExternalLinkBtn = document.getElementById('open-external-link-btn');
    const externalLinkPopup = document.getElementById('external-link-popup');
    const closeExternalPopupBtn = document.querySelector('.close-external-popup');
    const externalIframe = document.getElementById('external-iframe');

    // **Defina o link externo aqui**
    const externalUrl = 'https://im-a-puzzle.com/share/10bd15603dcc6f0'; // Altere este URL para o link desejado

    openExternalLinkBtn.addEventListener('click', () => {
        externalIframe.src = externalUrl; // Define o src do iframe
        externalLinkPopup.classList.add('active'); // Ativa o pop-up
        document.body.style.overflow = 'hidden'; // Evita rolagem da página
    });

    closeExternalPopupBtn.addEventListener('click', () => {
        closeExternalLinkPopup(); // Fecha o pop-up
    });

    externalLinkPopup.addEventListener('click', (e) => {
        // Fecha o pop-up se clicar no overlay (fora do conteúdo)
        if (e.target === externalLinkPopup) {
            closeExternalLinkPopup();
        }
    });

    document.addEventListener('keydown', (e) => {
        // Fecha o pop-up com a tecla ESC
        if (e.key === 'Escape' && externalLinkPopup.classList.contains('active')) {
            closeExternalLinkPopup();
        }
    });

    function closeExternalLinkPopup() {
        externalLinkPopup.classList.remove('active'); // Desativa o pop-up
        document.body.style.overflow = ''; // Restaura a rolagem da página
        externalIframe.src = ''; // Limpa o src do iframe para parar qualquer mídia ou carregamento
    }
});

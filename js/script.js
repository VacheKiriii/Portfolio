// Preloader
window.addEventListener('load', function() {
    // Cacher le loader après le chargement de la page
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 500);
    }
    
    // Animation des éléments avec fade-in
    animateFadeElements();
    
    // Animation de la timeline
    animateTimeline();
    
    // Création des étoiles
    createStars();
    
    // Initialisation des éléments de navigation
    initActiveNavLink();
    
    // Filtre par défaut pour la page de réalisations
    if (document.querySelector('.filter-buttons')) {
        filterProjects('all');
    }
    
    // Observer pour les animations au scroll
    initScrollObserver();
});

// Animation des éléments avec fade-in au scroll
function initScrollObserver() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Animation initiale des éléments fade-in
function animateFadeElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    let delay = 200;
    
    fadeElements.forEach(element => {
        setTimeout(() => {
            element.classList.add('visible');
        }, delay);
        delay += 150;
    });
}

// Fonction pour animer la timeline
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-content');
    let delay = 300;

    timelineItems.forEach(item => {
        setTimeout(() => {
            item.classList.add('visible');
        }, delay);
        delay += 400;
    });
}

// Animation des étoiles scintillantes
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars');
    document.body.appendChild(starsContainer);

    // Création des étoiles fixes
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        star.style.width = `${Math.random() * 2 + 1}px`;
        star.style.height = star.style.width;
        starsContainer.appendChild(star);
    }
    
    // Création des étoiles filantes
    for (let i = 0; i < 5; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');
        shootingStar.style.top = `${Math.random() * 40}%`;
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.animationDelay = `${Math.random() * 10 + 2}s`;
        starsContainer.appendChild(shootingStar);
    }
}

// Définir le lien de navigation actif
function initActiveNavLink() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (currentLocation.includes(linkPath) && linkPath !== '/index.html' && linkPath !== '/') {
            link.parentElement.classList.add('active');
        } else if ((currentLocation === '/' || currentLocation.includes('index.html')) && (linkPath === '/index.html' || linkPath === '../index.html' || linkPath === './index.html' || linkPath === 'index.html')) {
            link.parentElement.classList.add('active');
        }
    });
}

// Toggle menu mobile
function toggleMobileMenu() {
    const nav = document.querySelector('nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
        nav.classList.add('open');
        menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    }
}

// Fonction pour ouvrir un pop-up
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'flex';
        setTimeout(() => {
            popup.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

// Fonction pour fermer un pop-up
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Fermer les pop-ups si on clique en dehors de la fenêtre
window.addEventListener('click', function(event) {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        if (event.target === popup) {
            const popupId = popup.getAttribute('id');
            closePopup(popupId);
        }
    });
});

// Fermer avec la touche Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openPopup = document.querySelector('.popup[style*="display: flex"]');
        if (openPopup) {
            const popupId = openPopup.getAttribute('id');
            closePopup(popupId);
        }
    }
});

// Fonction pour filtrer les projets
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.btn-filter');

    // Retirer la classe active de tous les boutons
    buttons.forEach(button => button.classList.remove('active'));

    // Ajouter la classe active au bouton cliqué
    document.querySelector(`.btn-filter[onclick*="'${category}'"]`).classList.add('active');

    // Afficher ou masquer les projets en fonction de la catégorie
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.opacity = '0';
            project.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'scale(1)';
                }, 50);
            }, 300);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// Fonction pour trier les articles par note ou par date
function trierArticles(critere) {
    const articles = Array.from(document.querySelectorAll('.article'));
    const container = document.querySelector('.articles');
    
    // Animation de disparition
    articles.forEach(article => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(20px)';
    });
    
    setTimeout(() => {
        // Tri des articles
        articles.sort((a, b) => {
            if (critere === 'note') {
                return parseFloat(b.dataset.note) - parseFloat(a.dataset.note);
            } else if (critere === 'date') {
                return new Date(b.dataset.date) - new Date(a.dataset.date);
            }
            return 0;
        });
        
        // Vide le conteneur
        container.innerHTML = '';
        
        // Réinsère les articles triés
        articles.forEach(article => {
            container.appendChild(article);
        });
        
        // Animation de réapparition
        let delay = 100;
        articles.forEach(article => {
            setTimeout(() => {
                article.style.opacity = '1';
                article.style.transform = 'translateY(0)';
            }, delay);
            delay += 100;
        });
    }, 300);
}

// Back to top button functionality
window.addEventListener('scroll', function() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Ajout de l'effet de parallaxe pour les étoiles
window.addEventListener('mousemove', function(e) {
    const stars = document.querySelectorAll('.star');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    stars.forEach(star => {
        const depth = parseFloat(star.style.width) || 1;
        const moveX = (mouseX - 0.5) * depth * 2;
        const moveY = (mouseY - 0.5) * depth * 2;
        
        star.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Fonction spécifique aux popups de la page entreprise
function openPopupEntreprise() {
    openPopup('popup-entreprise');
}

function closePopupEntreprise() {
    closePopup('popup-entreprise');
}

// Fonction spécifique aux popups de la page veille
function openPopupVeille() {
    openPopup('popup-veille');
}

function closePopupVeille() {
    closePopup('popup-veille');
}

// Fonction pour la galerie d'images dans les pages de détail des projets
function openImageModal(imageElement) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    
    modalImg.src = imageElement.src;
    modalCaption.textContent = imageElement.alt;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Initialiser les écouteurs d'événements pour les images de la galerie
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    if (galleryImages) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                openImageModal(this);
            });
        });
    }
    
    // Fermer le modal d'image si on clique dessus
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeImageModal();
            }
        });
    }
    
    // Ajouter une classe pour la transition aux cartes de projet
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.transition = 'all 0.3s ease-in-out';
    });
    
    // Ajouter des effets de survol pour les articles
    const articles = document.querySelectorAll('.article');
    articles.forEach(article => {
        article.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        });
        article.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Fonction pour les onglets (utilisée dans bilan.html)
function openTab(tabId) {
    // Masquer tous les contenus d'onglets
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Désactiver tous les boutons d'onglets
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Afficher le contenu de l'onglet sélectionné
    document.getElementById(tabId).classList.add('active');
    
    // Activer le bouton de l'onglet sélectionné
    event.currentTarget.classList.add('active');
}
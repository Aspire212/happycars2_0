'use strict';
window.addEventListener('load', closePreloader)
window.addEventListener('DOMContentLoaded', loadWindow);

function closePreloader() {
    const body = document.querySelector('body');
    const preload = document.querySelector('.preloadSPA');
    preload.style.opacity = '0';
    setTimeout(() => {
        preload.style.display = "none";
        body.style.overflowY = 'scroll';
    }, 500);
}

function loadWindow() {
    /*Burger_Menu*/
    const burgerBtn = document.querySelector('.btnWrapper');
    const burgerEl = document.querySelector('.burger-btn');
    const dropMenu = document.querySelector('.header-nav');
    burgerBtn.addEventListener('click', function(e) {
        burgerEl.classList.toggle('burger-btn-active');
        dropMenu.classList.toggle('header-nav-active');
    });
    /*Anchors*/
    const anchors = document.querySelectorAll(' a[href*="#"]');
    anchors.forEach(anchor => {
        if (anchor) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                let anchorId = this.getAttribute('href');
                if (anchorId) {
                    burgerEl.classList.contains('burger-btn-active') && burgerEl.classList.remove('burger-btn-active');
                    dropMenu.classList.contains('header-nav-active') && dropMenu.classList.remove('header-nav-active');
                }
                document.querySelector(anchorId).scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
        }
    });

    // swiper

    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        updateOnWindowResize: true,
        autoplay: { delay: 6000 },

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });


}
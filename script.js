'use strict';

const modal = document.querySelector('.modal'),
    overlay = document.querySelector('.overlay'),
    btnCloseModal = document.querySelector('.btn--close-modal'),
    btnsOpenModal = document.querySelectorAll('.btn--show-modal'),
    btnScroll = document.querySelector('.btn--scroll-to'),
    section1 = document.querySelector('#section--1'),
    ulNav = document.querySelector('.nav__links'),
    tabContainer = document.querySelector('.operations__tab-container'),
    tabs = document.querySelectorAll('.operations__tab'),
    contents = document.querySelectorAll('.operations__content'),
    nav = document.querySelector('.nav'),
    header = document.querySelector('.header'),
    allSections = document.querySelectorAll('.section'),
    links = document.querySelectorAll('.nav__link'),
    items = document.querySelectorAll('.nav__item'),
    images = document.querySelectorAll('img[data-src]'),
    slider = document.querySelector('.slider'),
    btnLeft = slider.querySelector('.slider__btn--left'),
    btnRight = slider.querySelector('.slider__btn--right');

///////////////////////////////////////
// Modal window
function openModal(e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

Array.from(btnsOpenModal, el => el.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener(
    'keydown',
    e =>
        e.key === 'Escape' &&
        !modal.classList.contains('hidden') &&
        closeModal()
);

///////////////////////////////////////
// smooth scroll
// 196
// 200
// for btnScrollTo
btnScroll.addEventListener('click', () => {
    // old way
    () => {
        const { left: leftSec1, top: topSec1 } =
            section1.getBoundingClientRect();
        const { pageXOffset, pageYOffset } = window;
        window.scrollTo({
            left: leftSec1 + pageXOffset,
            top: topSec1 + pageYOffset,
            behavior: 'smooth',
        });
    };

    // new way
    section1.scrollIntoView({ behavior: 'smooth' });
});

// for navigation scroll
// first way
() => {
    const links = document.querySelectorAll('.nav__link');

    links.forEach(link =>
        link.addEventListener('click', function (event) {
            event.preventDefault();
            document
                .querySelector(this.getAttribute('href'))
                .scrollIntoView({ behavior: 'smooth' });
        })
    );
};

// for navigation scroll
// best way
// use Delegation Implementing
ulNav.addEventListener('click', event => {
    event.preventDefault();

    const id =
        !event.target.classList.contains('nav__link--btn') &&
        event.target.getAttribute('href');

    const section = document.querySelector(id);

    event.target.classList.contains('nav__link') &&
        section?.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Tabbed Component
// 202
tabContainer.addEventListener('click', e => {
    const clicked = e.target.closest('.operations__tab');

    // remove active class
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    contents.forEach(content =>
        content.classList.remove('operations__content--active')
    );

    // Add active class
    clicked?.classList.add('operations__tab--active');
    const relContent = document.querySelector(
        `.operations__content--${clicked?.dataset.tab}`
    );
    relContent.classList.add('operations__content--active');
});

///////////////////////////////////////
// navigation opacity effect
// 203
const handleHover = function (event, opacity) {
    if (event.target.classList.contains('nav__link')) {
        // add fade
        links.forEach(item => (item.style.opacity = this));

        // remove fade
        event.target.style.opacity = 1;
    }
};

ulNav.addEventListener('mouseover', handleHover.bind(0.5));
ulNav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation
// 204
// first and old way
() =>
    window.addEventListener('scroll', e => {
        section1.getBoundingClientRect().top <= 0
            ? nav.classList.add('sticky')
            : nav.classList.remove('sticky');
    });

// best way
let count = 0;
const observerNav = new IntersectionObserver(
    entries => {
        const [entry] = entries;

        if (!entry.isIntersecting) {
            nav.classList.remove('stickyOut');
            nav.classList.add('stickyIn');
        } else if (count++) {
            nav.classList.remove('stickyIn');
            nav.classList.add('stickyOut');

            nav.addEventListener('animationend', function () {
                this.classList.remove('stickyOut');
            });
        }
    },
    {
        root: null,
        threshold: 0,
        rootMargin: `-${nav.getBoundingClientRect().height}px`,
    }
);
observerNav.observe(header);

///////////////////////////////////////
// Scroll effect
// 206
const observerSec = new IntersectionObserver(
    (entries, observer) => {
        const [{ isIntersecting, target }] = entries;

        if (isIntersecting) {
            target.classList.remove('section--hidden');
            observer.unobserve(target);
        }
    },
    {
        root: null,
        threshold: 0.15,
    }
);

allSections.forEach(section => {
    section.classList.add('section--hidden');
    observerSec.observe(section);
});

///////////////////////////////////////
// Lazy loading images
// 207
const observerImg = new IntersectionObserver(
    (entries, observer) => {
        const [{ isIntersecting, target }] = entries;

        if (isIntersecting) {
            target.src = target.dataset.src;
            target.addEventListener('load', function () {
                this.classList.remove('lazy-img');
            });
            observer.unobserve(target);
        }
    },
    {
        root: null,
        threshold: 0,
        rootMargin: `-200px`,
    }
);

images.forEach(img => observerImg.observe(img));

///////////////////////////////////////
// Slider
// 208
// 209
// Initialize
const dots = document.querySelector('.dots');
let slides = slider.querySelectorAll('.slide'),
    curSlide = 1;

// Add dot element
slides.forEach((_, index) => {
    const doteElement = `<button class="dots__dot ${
        index === 0 ? 'dots__dot--active' : ''
    }" data-slide="${index}"></button>`;

    dots.insertAdjacentHTML('beforeend', doteElement);
});

// Add copy last and first slide
const lastSlide = slides[slides.length - 1];
const firstSlide = slides[0].cloneNode(true);
slider.prepend(lastSlide.cloneNode(true));
lastSlide.after(firstSlide);

// remove and add Active class function
const removeActiveClass = dotActive =>
    dotActive.classList.remove('dots__dot--active');
const addActiveClass = dotActive =>
    dot[curSlide - 1]?.classList.add('dots__dot--active');

// Dots click event
dots.addEventListener('click', event => {
    const { target } = event;

    if (target.closest('.dots__dot')) {
        const dotActive = dots.querySelector('.dots__dot--active');

        removeActiveClass(dotActive);

        !target.classList.contains('dots__dot--active') &&
            target.classList.add('dots__dot--active');

        curSlide = +target.dataset.slide + 1;

        traversSlide();
    }
});

// Get new list slides and dots element
slides = slider.querySelectorAll('.slide');
const dot = dots.querySelectorAll('.dots__dot');

// Initial layout
slides.forEach(
    (slide, index) =>
        (slide.style.transform = `translateX(${100 * (index - 1)}%)`)
);

// Travers slider
function traversSlide() {
    slides.forEach((slide, index) => {
        slide.style.transition = '0.7s';
        slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
    });

    const dotActive = dots.querySelector('.dots__dot--active');

    removeActiveClass(dotActive);
    addActiveClass();
}

function sideSlide() {
    slides.forEach((slide, index) => {
        slide.addEventListener(
            'transitionend',
            () => {
                slide.style.transition = '0s';
                slide.style.transform = `translateX(${
                    100 * (index - curSlide)
                }%)`;
            },
            { once: true }
        );
    });

    addActiveClass();
}

// righ btn handler
function rightBtnHandler() {
    if (curSlide < slides.length - 1) {
        curSlide++;
        traversSlide();

        if (curSlide === slides.length - 1) {
            curSlide = 1;
            sideSlide();
        }
    }
}

// left btn handler
function leftBtnHandler() {
    if (curSlide >= 0) {
        curSlide--;
        traversSlide();

        if (curSlide === 0) {
            curSlide = slides.length - 2;
            sideSlide();
        }
    }
}

// Btns click event
btnRight.addEventListener('click', rightBtnHandler);
btnLeft.addEventListener('click', leftBtnHandler);

// keybord event
document.addEventListener('keydown', event => {
    const { key } = event;

    key === 'ArrowRight' && rightBtnHandler();
    key === 'ArrowLeft' && leftBtnHandler();
});

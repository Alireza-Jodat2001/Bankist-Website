'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal'),
    overlay = document.querySelector('.overlay'),
    btnCloseModal = document.querySelector('.btn--close-modal'),
    btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
const btnScroll = document.querySelector('.btn--scroll-to'),
    section1 = document.querySelector('#section--1');

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
const ulNav = document.querySelector('.nav__links');

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
const tabContainer = document.querySelector('.operations__tab-container'),
    tabs = document.querySelectorAll('.operations__tab'),
    contents = document.querySelectorAll('.operations__content');

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
const ulHeader = document.querySelector('.nav__links'),
    links = document.querySelectorAll('.nav__link'),
    items = document.querySelectorAll('.nav__item');

const handleHover = function (event, opacity) {
    if (event.target.classList.contains('nav__link')) {
        // add fade
        links.forEach(item => (item.style.opacity = this));

        // remove fade
        event.target.style.opacity = 1;
    }
};

ulHeader.addEventListener('mouseover', handleHover.bind(0.5));
ulHeader.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation
// 204
const nav = document.querySelector('.nav');

// first and old way
() =>
    window.addEventListener('scroll', e => {
        section1.getBoundingClientRect().top <= 0
            ? nav.classList.add('sticky')
            : nav.classList.remove('sticky');
    });

// best way
const header = document.querySelector('.header');

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
const allSections = document.querySelectorAll('.section');

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

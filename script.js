'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScroll.addEventListener('click', () => {
    // old way
    // console.log(section1.getBoundingClientRect());
    // const { left: leftSec1, top: topSec1 } = section1.getBoundingClientRect();
    // const { pageXOffset, pageYOffset } = window;
    // console.log(pageYOffset);
    // window.scrollTo({
    //     left: leftSec1 + pageXOffset,
    //     top: topSec1 + pageYOffset,
    //     behavior: 'smooth',
    // });

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

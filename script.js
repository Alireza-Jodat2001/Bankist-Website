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
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// console.log(section1);

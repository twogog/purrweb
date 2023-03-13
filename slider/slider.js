// не стал использовать watcher, не mvc
import caruselSliding from './carusel.js';
import notCaruselSliding from './notcarusel.js';
import { notCaruselButtons } from './buttons.js';

const state = {
  active: 0,
  transformation: 0, // max 60vw
  translationGap: 0, // active * 60   vw
  status: 'done',
}

const sliderEl = {
  slider: document.querySelector('.slider'),
  items: document.querySelectorAll('.slider .slider__item'),
  firstItem: [...document.querySelectorAll('.slider .slider__item')].at(0),
  lastItem: [...document.querySelectorAll('.slider .slider__item')].at(-1),
  dots: document.querySelector('.slider__dots'),
}

document.addEventListener("DOMContentLoaded", () => {
  sliderEl.items.forEach((item, id) => {
    const active = state.active === id ? 'btn--active' : '';
    sliderEl.dots.innerHTML += `
      <li class="slider__dot"><button class="btn ${active}">${id + 1}</button></li>
    `;
  });

  if (sliderEl.items.length < 2) {
    sliderEl.slider.querySelector('.slider__items').style.overflow = 'inherit';
  }
});

sliderEl.slider.addEventListener('click', ({ target }) => {
  const { className } = target;
  const readyToSlide = sliderEl.items.length > 1 && state.status === 'done';
  if (readyToSlide) {

    if (className === 'slider__prev') {
      switch (state.active !== 0) {
        case false: caruselSliding('left', 10, sliderEl, state);
          break;
        default: notCaruselSliding('left', 10, sliderEl, state);
      }
    }

    if (className === 'slider__next') {
      switch (sliderEl.items.length - 1 > state.active) {
        case false: caruselSliding('right', 10, sliderEl, state);
          break;
        default: notCaruselSliding('right', 10, sliderEl, state);
      }
    }

  }

  if (className.trim().endsWith('btn') && readyToSlide) {
    const newActive = target.textContent - 1;
    const prevActive = state.active;
    state.active = newActive;
    newActive > prevActive
      ? notCaruselButtons('right', 10, sliderEl, state, newActive - prevActive)
      : notCaruselButtons('left', 10, sliderEl, state, prevActive - newActive);
  }

});
import { activeButton } from './buttons.js';

export default (direction, time, sliderEl, state) => {
  state.status = 'pending';
  direction === 'left' ? state.translationGap = 60 : '';
  direction === 'left'
    ? state.active = sliderEl.items.length - 1
    : state.active = 0;
  activeButton(sliderEl, state);
  sliderEl.dots.querySelectorAll('button').forEach((item, id) => {
    state.active === id
    ? item.classList.add('btn--active')
    : item.classList.remove('btn--active');
  });

  const fakeItem = direction === 'left'
    ? sliderEl.lastItem.cloneNode(true)
    : sliderEl.firstItem.cloneNode(true);

  direction === 'left' ? fakeItem.style.display = 'none' : '';
  direction === 'left'
    ? sliderEl.firstItem.parentElement.insertBefore(fakeItem, sliderEl.firstItem)
    : sliderEl.firstItem.parentElement.appendChild(fakeItem);

  const fakeItems = sliderEl.slider.querySelectorAll('.slider__item');
  const timer = setInterval(() => {
    state.transformation += 1;
    if (state.transformation > 60) {
      state.transformation = 0;
      clearInterval(timer);
      const nodeChild = direction === 'left'
        ? sliderEl.firstItem.parentElement.firstElementChild
        : sliderEl.firstItem.parentElement.lastChild;

      sliderEl.firstItem.parentElement.removeChild(nodeChild);

      sliderEl.items.forEach((item) => {
      item.style.transform = direction === 'left'
        ? `translate(${-state.translationGap * state.active}vw)`
        : 'translate(0)';
      });
      state.status = 'done';
      return;
    }
    direction === 'left' ? fakeItem.style.display = 'block' : '';
    fakeItems.forEach((item) => {
      item.style.transform = direction === 'left' 
        ? `translate(${-state.translationGap + state.transformation}vw)`
        : `translate(-${state.translationGap + 60 + state.transformation}vw)`;
    });
  }, time);
};
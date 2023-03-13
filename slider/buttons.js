const activeButton = (sliderEl, state) => {
  sliderEl.dots.querySelectorAll('button').forEach((item, id) => {
    state.active === id
    ? item.classList.add('btn--active')
    : item.classList.remove('btn--active');
  }); 
};

const notCaruselButtons =  (direction, time, sliderEl, state, gap) => {
  state.status = 'pending';
  state.translationGap = direction === 'right'
    ? (state.active - 1) * 60 : (state.active + 1) * 60;
  activeButton(sliderEl, state);
    const timer = setInterval(() => {
      state.transformation += 1;
      if (state.transformation > gap * 60) {
        state.transformation = 0;
        clearInterval(timer);
        state.status = 'done';
        return;
      }
      sliderEl.items.forEach((item) => {
        item.style.transform = direction === 'right' 
          ? `translate(-${state.translationGap - 60 * (gap - 1) + state.transformation}vw)`
          : `translate(-${state.translationGap + 60 * (gap - 1) - state.transformation}vw)`;
      });
    }, time);
};

export { activeButton, notCaruselButtons };
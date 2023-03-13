import { activeButton } from './buttons.js';

export default (direction, time, sliderEl, state) => {
  state.status = 'pending';
  state.translationGap = state.active * 60;
  direction === 'right' ? state.active += 1 : state.active -= 1;
  activeButton(sliderEl, state);
    const timer = setInterval(() => {
      state.transformation += 1;
      if (state.transformation > 60) {
        state.transformation = 0;
        clearInterval(timer);
        state.status = 'done';
        return;
      }
      sliderEl.items.forEach((item) => {
        item.style.transform = direction === 'right' 
          ? `translate(-${state.translationGap + state.transformation}vw)`
          : `translate(-${state.translationGap - state.transformation}vw)`;
      });
    }, time);
};
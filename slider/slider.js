// не стал использовать watcher, не mvc
const slider = document.querySelector('.slider');
const items = slider.querySelectorAll('.slider__item');

const state = {
  active: 0,
  transformation: 0, // max 60vw
  translationGap: 0, // active * 60   vw
  status: 'done',
}

const notCaruselSliding = (direction, time) => {
  state.status = 'pending';
  state.translationGap = state.active * 60;
    direction === 'right' ? state.active += 1 : state.active -= 1;
    const timer = setInterval(() => {
      state.transformation += 1;
      if (state.transformation > 60) {
        state.transformation = 0;
        clearInterval(timer);
        state.status = 'done';
        return;
      }
      items.forEach((item) => {
        item.style.transform = `translate(-${
          direction === 'right' 
          ? state.translationGap + state.transformation 
          : state.translationGap - state.transformation}vw)`;
      });
    }, time);
};

const caruselSliding = (direction, time, firstItem, lastItem) => {
  state.status = 'pending';
  direction === 'left' ? state.translationGap = 60 : '';
  direction === 'left'
    ? state.active = items.length - 1
    : state.active = 0;

  const fakeItem = direction === 'left'
    ? lastItem.cloneNode(true)
    : firstItem.cloneNode(true);

  direction === 'left' ? fakeItem.style.display = 'none' : '';
  direction === 'left'
    ? firstItem.parentElement.insertBefore(fakeItem, firstItem)
    : firstItem.parentElement.appendChild(fakeItem);

  const fakeItems = slider.querySelectorAll('.slider__item');
  const timer = setInterval(() => {
    state.transformation += 1;
    if (state.transformation > 60) {
      state.transformation = 0;
      clearInterval(timer);
      const nodeChild = direction === 'left'
        ? firstItem.parentElement.firstElementChild
        : firstItem.parentElement.lastChild;

      firstItem.parentElement.removeChild(nodeChild);

      items.forEach((item) => {
      item.style.transform = direction === 'left'
        ? `translate(${-state.translationGap * state.active}vw)`
        : `translate(0)`;
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

slider.addEventListener('click', ({ target }) => {
  const { className } = target;
  const firstItem = [...items].at(0);
  const lastItem = [...items].at(-1);
    if (className === 'slider__prev' && state.status === 'done') {
      if (state.active) {
        notCaruselSliding('left', 10);
      } else {
        caruselSliding('left', 10, firstItem, lastItem);
      }
    }
    if (className === 'slider__next' && state.status === 'done') {
      if (items.length - 1 > state.active) {
        notCaruselSliding('right', 10);
      } else {
        caruselSliding('right', 10, firstItem, lastItem);
      }
    }
});
const activeButton = (sliderEl, state) => {
  sliderEl.dots.querySelectorAll('button').forEach((item, id) => {
    state.active === id
    ? item.classList.add('btn--active')
    : item.classList.remove('btn--active');
  }); 
};

export { activeButton };
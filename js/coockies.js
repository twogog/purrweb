const coockies = document.querySelector('.coockies');
// getEventListeners(document.querySelector(".coockies"))

const handleClick = (e) => {
  if (e.target.textContent === 'OK') {
    localStorage.setItem('firstVisit', 'no');
    coockies.removeEventListener('click', handleClick);
    coockies.classList.add('coockies--fade');
  }
};

export default () => {
  const notFirstTime = localStorage.getItem('firstVisit');
  if (notFirstTime) {
    coockies.classList.add('coockies--fade');
  } else {
    coockies.addEventListener('click', handleClick);
    let value = -coockies.offsetHeight;
    setTimeout(() => {
      const timer = setInterval(() => {
        value += 1;
        if (value < 1) {
          coockies.style.bottom = `${value}px`;
        } else {
          clearInterval(timer);
        }
      }, 5);
    }, 5000);
  }
};
const missionContainer = document.querySelector('.vision');
const textToHide = missionContainer.querySelector('.description');
const imageToRotate = missionContainer.querySelector('.vision__image');

const keyframes = [
  {marginBottom: '250px'},
  {marginBottom: '250px'},
  {marginBottom: '250px'},
  {marginBottom: '250px'},
  {marginBottom: '250px'},
  {marginBottom: '0'}
];

const options = {
  duration: 6000,
  iterations: 1
};

const handleText = () => {
  const begining = missionContainer.offsetHeight / 100;
  const containerPosition = missionContainer.getBoundingClientRect().top;
  const maxwidth = document.body.getBoundingClientRect().width;

  if (containerPosition - 50 < begining && containerPosition > 30 && maxwidth > 950) {
    imageToRotate.classList.add('vision__image--spin');
    textToHide.classList.add('vision__description--fade');
    
    window.scrollTo({
    top: missionContainer.offsetTop - 170,
    behavior: 'smooth'
    });

    missionContainer.animate(keyframes, options);
    window.removeEventListener('scroll', handleText);
  }
};

export default () => {
  window.addEventListener('scroll', handleText);
};
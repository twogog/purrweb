const form = document.querySelector('.feedback');
const inputs = form.querySelectorAll('.feedback__grid input', '.feedback__grid div *');
const textarea = form.querySelector('textarea');

export default () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const allElements = [...inputs, textarea];
    // const validate = allElements.filter(({ value }) => value);
    if ([...formData.values()].includes('')) {
      allElements.forEach((input) => input.classList.add('invalid'));
    } else {
      allElements.forEach((input) => {
        input.value = '';
        input.classList.remove('invalid');
      });
    }
  });
}
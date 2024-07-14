const STORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');

const formData = {
  email: '',
  message: '',
};

getDataFromLS();

formEl.addEventListener('input', handleInput);
formEl.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  for (const key in formData) {
    if (formEl.elements[key].value.trim() === '') {
      alert('Fill please all fields');
      return;
    }
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
}

function handleInput(event) {
  const value = event.target.value;
  const key = event.target.name;

  formData[key] = value;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.log(error);
    return;
  }
}

function getDataFromLS() {
  let data = {};

  try {
    data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (error) {
    console.log(error);
    return;
  }

  if (!data) {
    return;
  }

  for (const key in data) {
    formEl.elements[key].value = data[key];
  }
}

const STORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');

let formData = {
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

  console.log('User data:', formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = {
    email: '',
    message: '',
  };
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
  } else {
    formData = data;
    for (const key in formData) {
      if (formData[key]) {
        formEl.elements[key].value = formData[key];
      }
    }
  }
}

document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('zip').addEventListener('blur', validateZip);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);

function validateName() {
  const name = document.getElementById('name');
  const re = /^[a-zA-Z]{2,10}$/;

  if(re.test(name.value)) {
    name.classList.remove('is-invalid');
    //name.classList.add('is-valid');
  } else {
    //name.classList.remove('is-valid');
    name.classList.add('is-invalid');
  }
}

function validateZip() {
  const zip = document.getElementById('zip');
  const re = /[0-9]{3,12}/;

  if(re.test(zip.value)) {
    zip.classList.remove('is-invalid');
    zip.classList.add('is-valid');
  } else {
    zip.classList.remove('is-valid');
    zip.classList.add('is-invalid');
  }
}

function validateEmail() {
  const email = document.getElementById('email');
  const re = /([0-9a-zA-Z]{1,10})@([0-9a-zA-Z]{1,10})\.([a-z]{1,5})/;

  if(re.test(email.value)) {
    email.classList.remove('is-invalid');
    email.classList.add('is-valid');
  } else {
    email.classList.remove('is-valid');
    email.classList.add('is-invalid');
  }
}

function validatePhone() {
  const phone = document.getElementById('phone');
  const re = /([0-9]{3})\-([0-9]{3})\-([0-9]{3})/;

  if(re.test(phone.value)) {
    phone.classList.remove('is-invalid');
    phone.classList.add('is-valid');
  } else {
    phone.classList.remove('is-valid');
    phone.classList.add('is-invalid');
  }
}
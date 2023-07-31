const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}


function checkRequired(input) {
  let res = true;   // definisco la variabile res che deve essere true quando c'è scritto qualcosa i TUTTI i campi
 
  if (input.value.trim() === '') {
    showError(input, input.id+ ` is required`);
    res = false;
  } else {      
    showSuccess(input);
  }
  
 return res;
}

// Check email is valid
function checkEmail(input) {
  if (checkRequired(input)) {

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
  } 
} 


// Check input length
function checkLength(input, min, max) {
  let lengthok=false;
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    lengthok = true;
    showSuccess(input);
  }
  return lengthok;
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if(checkRequired(input2)){
      if (input1.value !== input2.value) {
      showError(input2, 'Passwords do not match');
    } 
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  if (checkLength(password2, 6, 25)){checkPasswordsMatch(password, password2);}
  

});

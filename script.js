const successMessage = document.getElementById('success-message');
const form = document.querySelector('form');
const inputs = document.querySelectorAll('input, textarea');
const queryInputs = document.querySelectorAll('input[name="query"]');
const queryError = document.getElementById('query-error');
const queryControls = document.querySelectorAll('.query-control');


// Add click event listener to each query control to update radio button
queryControls.forEach(control => {
  control.addEventListener('click', () => {
    control.querySelector('input').checked = true;
    queryError.hidden = true;
  });
});


// Remove error class and hide error message
const removeError = (e) => {
  e.target.classList.remove('error');
  const errorId = `${e.target.id}-error`;
  const errorElement = document.getElementById(errorId);
  if (errorElement) {
    errorElement.hidden = true;
  }
}

// Add input event listener to each input to remove error class and hide error message
inputs.forEach(input => {
  input.addEventListener('input', removeError);
});

const showMessage = (message) => {
  message.hidden = false; // Remove hidden attribute
  setTimeout(() => {
    message.classList.add('show');
  }, 10); // Wait until the element is not hidden then trigger transition
};

const hideMessage = (message) => {
  message.classList.remove('show');
  setTimeout(() => {
    message.hidden = true; // Add hidden attribute back
  }, 500); // After transition completes
}


// Hide success message when escape key is pressed
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && successMessage.classList.contains('show')) {
    hideMessage(successMessage);
  }
});


// Form submit event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let isValid = true;
  
  // Validate each input
  inputs.forEach(input => {

    // Skip radio buttons, it will be handled separately
    if (input.type === 'radio') return;

    const errorElement = document.getElementById(`${input.id}-error`);

    // if the input is invalid, add error class, show error message, and mark the form as invalide
    // otherwise, remove error class and hide error message
    if (!input.validity.valid) {
      input.classList.add('error');
      if (errorElement) {
        errorElement.hidden = false;
      }
      isValid = false;
    } else {
      input.classList.remove('error');
      if (errorElement) {
        errorElement.hidden = true;
      }
    }
  });
  
  // Handle radio buttons separately (query type)
  const querySelected = Array.from(queryInputs).some(radio => radio.checked);
  
  if (!querySelected) {
    queryError.hidden = false;
    isValid = false;
  } else {
    queryError.hidden = true; 
  }
  
  // Only show success message if form is valid
  if (isValid) {

    showMessage(successMessage);

    form.reset();

    // Hide success message after 3 seconds
    setTimeout(() => {
      hideMessage(successMessage);
    }, 3000);
  }
});

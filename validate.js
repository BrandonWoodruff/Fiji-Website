// validation.js
const stateAbbreviations = ["AL", "AK", "AZ", "AR", "CA", /* Add more states */];

function initValidation(formSelector) {
  const form = document.querySelector(formSelector);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    validateForm();
  });

  const formElements = form.querySelectorAll("input, textarea, select");
  formElements.forEach((element) => {
    element.addEventListener("blur", function () {
      validateField(element);
    });

    element.addEventListener("input", function () {
      clearFieldValidation(element);
    });
  });
}

function validateForm() {
    const form = document.getElementById("myform");
    const formElements = form.querySelectorAll("input, textarea, select");
  
    formElements.forEach((element) => {
      validateField(element);
    });
  
    validateCheckboxGroup("source", "Please select at least one source");
  
    if (form.checkValidity()) {
      // Form is valid, submit the form
      alert("Form submitted successfully!");
      form.submit();  // This line was missing
    }
  }

function validateField(element) {
  const id = element.id;
  const value = element.value.trim();

  switch (id) {
    case "first_name":
    case "last_name":
    case "address":
    case "city":
    case "state":
      checkRequired(id, "This field is required");
      break;

    case "state":
      validateState(id, "Invalid state");
      break;

    case "zip":
      checkFormat(id, "Invalid zip code", /^\d{5}$/);
      break;

    case "phone":
      checkFormat(id, "Invalid phone number", /^\d{10}$/);
      break;

    case "email":
      checkFormat(id, "Invalid email address", /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      break;

    case "source-internet":
    case "source-friend":
    case "source-google":
      checkRequired("source", "Please select at least one source");
      break;

    // Add more cases for other fields as needed

    default:
      break;
  }
}

function checkRequired(fieldId, requiredMessage) {
  const element = document.getElementById(fieldId);
  const value = element.value.trim();
  const valid = value !== "";

  setElementValidity(fieldId, valid, requiredMessage);
}

function checkFormat(fieldId, badFormatMessage, regex) {
  const element = document.getElementById(fieldId);
  const value = element.value.trim();
  const valid = regex.test(value);

  setElementValidity(fieldId, valid, valid ? "" : badFormatMessage);
}

function validateState(fieldId, invalidMessage) {
  const element = document.getElementById(fieldId);
  const value = element.value.trim().toUpperCase();
  const valid = stateAbbreviations.includes(value);

  setElementValidity(fieldId, valid, invalidMessage);
}

function setElementValidity(fieldId, valid, message) {
  const element = document.getElementById(fieldId);
  element.setCustomValidity(valid ? "" : message);
  const errorMsg = element.nextElementSibling;
  errorMsg.textContent = valid ? "" : message;
  errorMsg.style.display = valid ? "none" : "block";
}

function clearFieldValidation(element) {
  const id = element.id;
  setElementValidity(id, true, "");
}

document.addEventListener("DOMContentLoaded", function (event) {
  initValidation("#myform");
});

function validateCheckboxGroup(groupName, errorMessage) {
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]:checked`);
    const valid = checkboxes.length > 0;
  
    setElementValidity(groupName, valid, errorMessage);
  }
  
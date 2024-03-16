/**
 * Validates a username.
 *
 * @param {string} username - The username to be validated.
 * @returns {Object} - An object containing the validation result.
 * @property {boolean} isValid - Indicates whether the username is valid or not.
 * @property {string} message - A message describing the validation result.
 */
function validateUsername(username) {
  const regex = /^[a-zA-Z0-9]{7,15}$/;
  let response = { isValid: false, message: "" };

  if (!regex.test(username)) {
    if (username.length < 7 || username.length > 15) {
      response.message = "Username must be between 7 and 15 characters long.";
    } else {
      response.message = "Username can only contain alphanumeric characters and brackets.";
    }
  } else {
    response.isValid = true;
    response.message = "";
  }

  return response;
}

/**
 * Validates a password based on certain criteria.
 * @param {string} password - The password to be validated.
 * @returns {object} - An object containing the validation result.
 * @property {boolean} isValid - Indicates whether the password is valid or not.
 * @property {string} message - A message describing the validation result.
 */
function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/;
  // Set default background color for password field
  let response = { isValid: true, message: "" };

  // Password validation checks
  if (password.length > 0 && !passwordRegex.test(password)) {
    if (password.length < 8) {
      response.message = "Password should be at least 8 characters long.";
      response.isValid = false;
    } else if (!/[a-z]/.test(password)) {
      // Checks for lowercase letters in password
      response.message = "Password should contain at least one lowercase letter.";
      response.isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      // Checks for Uppercase letters in password
      response.message = "Password should contain at least one uppercase letter.";
      response.isValid = false;
    } else if (!/\d/.test(password)) {
      // Checks for numbers in password
      response.message = "Password should contain at least one number.";
      response.isValid = false;
    } else if (!/\W/.test(password)) {
      // Checks for special characters in password
      response.message = "Password should contain at least one special character.";
      response.isValid = false;
    }
  }
  if (password.includes(" ")) {
    // Check for space in the password
    response.message = "Password should not contain spaces.";
    response.isValid = false;
  }

  return response;
}

export { validateUsername, validatePassword };

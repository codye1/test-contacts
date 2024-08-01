const validateForm = (data) => {
  let errors = {};
  if (!data.firstName) {
    errors.firstName = 'First name is required';
  }
  if (!data.lastName) {
    errors.lastName = 'Last name is required';
  }
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(data.email)) {
    errors.email = 'Email address is invalid';
  }
  return errors;
};

export default validateForm;

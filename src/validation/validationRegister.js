const alphanumeric = /^[a-zA-Z0-9ĄąĘęÓóŁłŚśĄąŻżŹźĆćŃń]*$/gm;
const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validationRegister = (email, userName, password, passwordCheck) => {
  if (!email) {
    throw new Error("Please enter email");
  }
  if (!email.match(mailformat)) {
    throw new Error("Email is not correct");
  }
  if (!userName) {
    throw new Error("Please enter username");
  }
  if (userName.length < 4) {
    throw new Error("The minimum username length is: 4");
  }
  if (userName.length > 16) {
    throw new Error("The maximum username length is: 16");
  }
  if (!userName.match(alphanumeric)) {
    throw new Error("Username must contain only numbers and letters");
  }
  if (!password) {
    throw new Error("Please enter password");
  }
  if (!password.match(alphanumeric)) {
    throw new Error("Password must contain only numbers and letters");
  }
  if (password.length < 7) {
    throw new Error("The minimum password length is: 7");
  }
  if (password.length > 16) {
    throw new Error("The maximum password length is: 16");
  }
  if (password !== passwordCheck) {
    throw new Error("Password must be the same as the veryfy password");
  }
};

export default validationRegister;

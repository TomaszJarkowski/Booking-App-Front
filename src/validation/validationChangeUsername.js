const alphanumeric = /^[a-zA-Z0-9ĄąĘęÓóŁłŚśĄąŻżŹźĆćŃń]*$/gm;

const validationChangeUsername = (changeUsername) => {
  if (!changeUsername) {
    throw new Error("Please enter username");
  }
  if (!changeUsername.match(alphanumeric)) {
    throw new Error("Username must contain only numbers and letters");
  }
  if (changeUsername.length < 4) {
    throw new Error("The minimum username length is: 4");
  }
};

export default validationChangeUsername;

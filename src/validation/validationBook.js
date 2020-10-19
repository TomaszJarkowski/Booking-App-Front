const alphanumeric = /^[a-zA-Z0-9ĄąĘęÓóŁłŚśĄąŻżŹźĆćŃń]*$/gm;

const validationBook = (name, lastName) => {
  if (!name.match(alphanumeric)) {
    throw new Error("Name is not correct");
  }
  if (!lastName.match(alphanumeric)) {
    throw new Error("Last name is not correct");
  }
  if (name.length < 3) {
    throw new Error("The minimum name length is: 3");
  }
  if (lastName.length < 3) {
    throw new Error("The minimum last name length is: 3");
  }
};

export default validationBook;

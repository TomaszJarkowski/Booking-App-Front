const alphanumeric = /^[a-zA-Z0-9ĄąĘęÓóŁłŚśĄąŻżŹźĆćŃń]*$/gm;

const validationChangePassword = (
  oldPassword,
  newPassword,
  confirmNewPassword
) => {
  if (!oldPassword) {
    throw new Error("Please enter old password");
  }
  if (!newPassword) {
    throw new Error("Please enter new password");
  }
  if (!confirmNewPassword) {
    throw new Error("Please enter confirm new password");
  }
  if (!oldPassword.match(alphanumeric)) {
    throw new Error("Old password must contain only numbers and letters");
  }
  if (!newPassword.match(alphanumeric)) {
    throw new Error("New password must contain only numbers and letters");
  }
  if (!confirmNewPassword.match(alphanumeric)) {
    throw new Error(
      "Confirm new password must contain only numbers and letters"
    );
  }
  if (oldPassword.length < 7) {
    throw new Error("The minimum old password length is: 7");
  }
  if (newPassword.length < 7) {
    throw new Error("The minimum new password length is: 7");
  }
  if (confirmNewPassword.length < 7) {
    throw new Error("The minimum confirm new password length is: 7");
  }
  if (newPassword !== confirmNewPassword) {
    throw new Error(
      "New Password must be the same as the confirm new password"
    );
  }
};

export default validationChangePassword;

let passwordLength = 16;
const inputE1 = document.querySelector("#password");

function generatePassword() {
  const chars =
    "abcdefghjklmnpqrstuvwyzABCDEFGHJKLMNPQRSTUVWYZ123456789!@#$%&*()[]";

  let password = " ";

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  inputE1.value = password;

  console.log(password);
}

function copy() {
  navigator.clipboard.writeText(inputE1.value);
}

const passwordLengthE1 = document.querySelector("#password-length");
passwordLengthE1.addEventListener("input", function () {
  passwordLength = passwordLengthE1.value;
  console.log(passwordLength);
  generatePassword();
});

document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#copy-2").addEventListener("click", copy);

generatePassword();

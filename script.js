const inputE1 = document.querySelector("#password");
const upperCaseCheckE1 = document.querySelector("#uppercase-check");
const numberCheckE1 = document.querySelector("#number-check");
const symbolCheckE1 = document.querySelector("#symbol-check");
const indicatorTextE1 = document.querySelector("#security-indicator-string");
const securityIndicatorBarE1 = document.querySelector(
  "#security-indicator-bar"
);

let indicatorText;

let passwordLength = 16;

function generatePassword() {
  let chars = "abcdefghjklmnpqrstuvwyz";

  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWYZ";
  const numbersChars = "123456789";
  const symbolChars = "!@#$%&*()[]";

  if (upperCaseCheckE1.checked) {
    chars += upperCaseChars;
  }

  if (numberCheckE1.checked) {
    chars += numbersChars;
  }

  if (symbolCheckE1.checked) {
    chars += symbolChars;
  }

  let password = " ";

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  inputE1.value = password;
  calculateQuality();
  calculateFontSize()
}

function calculateQuality() {
  const percent = Math.round(
    (passwordLength / 64) * 25 +
      (upperCaseCheckE1.checked ? 15 : 0) +
      (numberCheckE1.checked ? 25 : 0) +
      (symbolCheckE1.checked ? 35 : 0)
  );
  console.log(percent);

  securityIndicatorBarE1.style.width = `${percent}%`;

  if (percent > 69) {
    indicatorText = "Senha: forte";
    securityIndicatorBarE1.classList.remove("critical");
    securityIndicatorBarE1.classList.remove("warning");
    securityIndicatorBarE1.classList.add("safe");
  } else if (percent > 50) {
    indicatorText = "Senha: média";
    securityIndicatorBarE1.classList.remove("critical");
    securityIndicatorBarE1.classList.add("warning");
    securityIndicatorBarE1.classList.remove("safe");
  } else {
    indicatorText = "Senha: fraca";
    securityIndicatorBarE1.classList.add("critical");
    securityIndicatorBarE1.classList.remove("warning");
    securityIndicatorBarE1.classList.remove("safe");
  }
  indicatorTextE1.textContent = indicatorText;

  if (percent >= 100) {
    securityIndicatorBarE1.classList.add("completed");
  } else {
    securityIndicatorBarE1.classList.remove("completed");
  }
}

function calculateFontSize() {
  if (passwordLength > 45) {
    inputE1.classList.remove("font-sm");
    inputE1.classList.remove("font-xs");
    inputE1.classList.add("font-xxs");
  } else if (passwordLength > 32) {
    inputE1.classList.remove("font-sm");
    inputE1.classList.add("font-xs");
    inputE1.classList.remove("font-xxs");
  } else if (passwordLength > 22) {
    inputE1.classList.add("font-sm");
    inputE1.classList.remove("font-xs");
    inputE1.classList.remove("font-xxs");
  } else {
    inputE1.classList.remove("font-sm");
    inputE1.classList.remove("font-xs");
    inputE1.classList.remove("font-xxs");
  }
}

function copy() {
  navigator.clipboard.writeText(inputE1.value);
}

const passwordLengthE1 = document.querySelector("#password-length");
passwordLengthE1.addEventListener("input", function () {
  passwordLength = passwordLengthE1.value;
  document.querySelector("#password-length-text").innerText = passwordLength;
  generatePassword();
});

upperCaseCheckE1.addEventListener("click", generatePassword);
numberCheckE1.addEventListener("click", generatePassword);
symbolCheckE1.addEventListener("click", generatePassword);

document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#copy-2").addEventListener("click", copy);
document.querySelector("#renew").addEventListener("click", generatePassword)

generatePassword();

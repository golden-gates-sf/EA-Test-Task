const eventDate = new Date("2023-07-24");

const printLeftTime = () => {
  const remainder = (eventDate.getTime() - Date.now()) / 1000;
  if (remainder < 0) {
    clearInterval(intervalId);
    return;
  }

  const daysLeft = Math.floor(remainder / 60 / 60 / 24);
  const hoursLeft = Math.floor(remainder / 60 / 60) % 24;
  const minutesLeft = Math.floor(remainder / 60) % 60;
  const secondsLeft = Math.floor(remainder) % 60;

  document.querySelector(".days").textContent =
    daysLeft > 9 ? daysLeft : `0${daysLeft}`;
  document.querySelector(".hours").textContent =
    hoursLeft > 9 ? hoursLeft : `0${hoursLeft}`;
  document.querySelector(".minutes").textContent =
    minutesLeft > 9 ? minutesLeft : `0${minutesLeft}`;
  document.querySelector(".seconds").textContent =
    secondsLeft > 9 ? secondsLeft : `0${secondsLeft}`;
}

printLeftTime();
const intervalId = setInterval(printLeftTime, 1000);

const emailForm = document.getElementById("email-form");
const emailInput = document.getElementById("email-input");

const modalOverlay = document.getElementById("modal-overlay");
const modalCross = document.getElementById("modal-cross");
const modalCloseBtn = document.getElementById("modal-close-btn");

const modalHeading = document.querySelector(".modal-heading");
const modalText = document.querySelector(".modal-text");

// paste u're url to check if it's working
const URL = "";

const setModalErr = () => {
  modalHeading.textContent = "Error(";
  modalText.textContent = "Something went wrong. Please try again a bit later";
};

const setModalSuccess = () => {
  modalHeading.textContent = "Success!";
  modalText.textContent =
    "You have successfully subscribed to the email newsletter";
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

emailInput.addEventListener("input", () => {
  emailForm.classList.remove("invalid-form");
});

emailForm.onsubmit = (e) => {
  e.preventDefault();

  if (!validateEmail(emailInput.value)) {
    emailForm.classList.add("invalid-form");
    return;
  }

  modalOverlay.classList.add("show");
  modalOverlay.classList.add("loading");

  const email = emailInput.value;

  fetch({
    method: "POST",
    url: URL,
    body: { email },
  })
    .catch(setModalErr)
    .then((resp) => {
      if (resp.status != 200) {
        setModalErr();
        return;
      }

      setModalSuccess();
    })
    .finally(() => {
      modalOverlay.classList.remove("loading");
    });
};

const onModalClose = () => {
  modalOverlay.classList.remove("show");
};

modalCross.onclick = onModalClose;
modalCloseBtn.onclick = onModalClose;

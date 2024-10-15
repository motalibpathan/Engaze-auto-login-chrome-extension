chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "manualLogin") {
    const { phoneNumber, password } = request;

    // Check if the "Login again" button exists (to navigate)
    const loginAgainButton = document.querySelector(
      'a[href="/login"] button span'
    );
    if (loginAgainButton && loginAgainButton.textContent === "Login again") {
      const anchorElement = loginAgainButton.closest("a");
      if (anchorElement) {
        anchorElement.click();
      }

      setTimeout(() => {
        performLogin(phoneNumber, password);
      }, 1000);
      return;
    }
    performLogin(phoneNumber, password);
  }
});

const performLogin = (phoneNumber, password) => {
  // Select the phone number input field
  const phoneNumberInput =
    document.querySelector(
      'input[type="text"][placeholder="Enter email or phone number"]'
    ) ||
    document.querySelector(
      'input[type="text"][placeholder="Enter your phone number"]'
    );

  if (phoneNumberInput) {
    phoneNumberInput.value = phoneNumber;
    phoneNumberInput.dispatchEvent(new Event("input", { bubbles: true }));

    setTimeout(() => {
      submitButtonClick();

      const intervalId = setInterval(() => {
        const passwordInput = document.querySelector('input[type="password"]');
        const otpInput = document.querySelector(
          'input[type="text"][placeholder="OTP"]'
        );

        if (otpInput) {
          clearInterval(intervalId);
          chrome.runtime.sendMessage({
            action: "message",
            message: "OTP input found!",
            isError: true,
          });
        }

        if (passwordInput) {
          clearInterval(intervalId);
          passwordInput.value = password;
          passwordInput.dispatchEvent(new Event("input", { bubbles: true }));

          setTimeout(() => {
            submitButtonClick();
          }, 500);
        }
      }, 300);
    }, 500);
  } else {
    chrome.runtime.sendMessage({
      action: "message",
      message: "Phone number input not found!",
      isError: true,
    });
  }
};

const submitButtonClick = () => {
  const submitButton = document.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.click();
  }
};

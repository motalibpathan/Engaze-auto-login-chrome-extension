document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["phoneNumber", "password"], (data) => {
    if (data.phoneNumber) {
      document.getElementById("phoneNumber").value = data.phoneNumber;
    }
    if (data.password) {
      document.getElementById("password").value = data.password;
    }
  });

  document.getElementById("manualLogin").addEventListener("click", () => {
    const phoneNumber = document.getElementById("phoneNumber").value;
    const password = document.getElementById("password").value;

    chrome.storage.sync.set({ phoneNumber, password }, () => {
      showMessage("Credentials saved!", false, 0);
    });

    // Ensure phone number and password are filled before proceeding
    if (!phoneNumber || !password) {
      showMessage("Please fill in the phone number and password!", true);
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];

      if (!currentTab.url.includes("localhost")) {
        showMessage("Please navigate to the localhost!", true, 1000);
        return;
      }

      showMessage("Logging in...", false, 500);

      chrome.tabs.sendMessage(currentTab.id, {
        action: "manualLogin",
        phoneNumber,
        password,
      });
    });
  });
});

const showMessage = (message, isError, delay = 0) => {
  setTimeout(() => {
    const messageElement = document.getElementById("message");
    messageElement.classList.add(isError ? "error" : "success", "message");
    messageElement.textContent = message;
    setTimeout(() => {
      messageElement.textContent = "";
      messageElement.classList.remove(isError ? "error" : "success", "message");
    }, 2000);
  }, delay);
};

// this is popup.js listening for messages from contentScript.js it will show a message on the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "message") {
    showMessage(
      request.message || "Message Listen",
      request.isError ?? false,
      1000
    );
  }
});

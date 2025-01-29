import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

document.addEventListener("DOMContentLoaded", async () => {
  const accountIdInput = document.getElementById("accountIdInput");
  const colorInput = document.getElementById("colorInput");
  const addButton = document.getElementById("addButton");
  const accountList = document.getElementById("accountList");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs.length > 0) {
      const url = new URL(tabs[0].url);
      if (url.hostname.includes("console.aws.amazon.com")) {
        const domainPart = url.hostname.split(".")[0];
        const [accId] = domainPart.split("-");
        accountIdInput.value = accId;
      }
    }
  });

  let { accountColors } = await chrome.storage.sync.get("accountColors");
  if (!accountColors) {
    accountColors = {};
  }

  function renderList() {
    accountList.innerHTML = "";
    for (const [accId, col] of Object.entries(accountColors)) {
      const li = document.createElement("li");
      li.textContent = `${accId} : ${col}`;

      const deleteBtn = document.createElement("span");
      deleteBtn.className = "delete-button";
      deleteBtn.textContent = " [Delete]";
      deleteBtn.addEventListener("click", async () => {
        delete accountColors[accId];
        await chrome.storage.sync.set({ accountColors });
        renderList();
      });

      li.appendChild(deleteBtn);
      accountList.appendChild(li);
    }
  }
  renderList();

  addButton.addEventListener("click", async () => {
    const accId = accountIdInput.value.trim();
    if (!accId) {
      alert("Please enter an Account ID.");

      return;
    }

    const col = colorInput.value.trim();
    accountColors[accId] = col;
    await chrome.storage.sync.set({ accountColors });

    renderList();
    accountIdInput.value = "";
    colorInput.value = "#ffffff";
  });
});

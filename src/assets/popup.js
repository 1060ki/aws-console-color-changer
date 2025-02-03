import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

document.addEventListener("DOMContentLoaded", async () => {
  const accountIdInput = document.getElementById("accountIdInput");
  const colorInput = document.getElementById("colorInput");
  const addButton = document.getElementById("addButton");
  const accountList = document.getElementById("accountList");

  const colorPalette = document.getElementById("colorPalette");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs.length > 0) {
      const url = new URL(tabs[0].url);
      if (url.hostname.includes("console.aws.amazon.com")) {
        const domainPart = url.hostname.split(".")[0];
        const warningEl = document.getElementById("multiSessionWarning");
        // マルチセッション形式のチェック（数字-文字列の形式）
        const isMultiSession = /^\d+-[a-zA-Z0-9]+$/.test(domainPart);

        if (isMultiSession) {
          const [accId] = domainPart.split("-");
          accountIdInput.value = accId;

          // 警告メッセージが表示されている場合は非表示にする
          if (warningEl) warningEl.style.display = "none";
        } else {
          const warningEl = document.getElementById("multiSessionWarning");
          warningEl.style.display = "block";
        }
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
      const colorSpan = document.createElement("span");
      const colorBox = document.createElement("span");

      colorSpan.textContent = col;

      colorBox.style.display = "inline-block";
      colorBox.style.backgroundColor = col;
      colorBox.style.width = "16px";
      colorBox.style.height = "16px";
      colorBox.style.borderRadius = "4px";
      colorBox.style.marginRight = "4px";

      colorSpan.style.cursor = "pointer";
      colorBox.addEventListener("click", () => {
        colorInput.value = col;
      });

      li.textContent = `${accId} : `;
      li.appendChild(colorBox);
      li.appendChild(colorSpan);

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

  colorPalette.addEventListener("click", (e) => {
    if (e.target.classList.contains("color-box")) {
      colorInput.value = e.target.dataset.color;
    }
  });
});

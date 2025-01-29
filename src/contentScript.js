(async function() {
  const domain = window.location.hostname;
  if (!domain.includes("console.aws.amazon.com")) {
    return;
  }

  const accountPart = domain.split(".")[0];
  const [accountId] = accountPart.split("-");  // "123456789012"

  const { accountColors } = await chrome.storage.sync.get("accountColors");
  if (!accountColors) return;

  const color = accountColors[accountId];
  if (!color) return;

  function applyColor(obs) {
    const headerEl = document.querySelector("#awsc-nav-header nav");
    if (headerEl) {
      headerEl.style.backgroundColor = color;
      obs.disconnect();

      return true;
    }
    return false;
  }

  const observer = new MutationObserver((mutations, obs) => {
    applyColor(obs);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();

const codeCopy = () => {
  // this is for coping code-block texts or codes
  let copyButton = document.querySelectorAll(".fa-copy");
  let codeBlock = document.querySelectorAll(".code-block");
  let codeText = document.querySelectorAll(".copy-text");
  if (copyButton && codeBlock && codeText) {
    copyButton.forEach((button, i) => {
      setInterval(() => {
        codeText[i].innerText = "copy";
      }, 1500); // after every 1.5s  .copy-text innerText will change
      button.addEventListener("click", () => {
        navigator.clipboard.writeText(codeBlock[i].innerText);
        codeText[i].innerText = "copied";
        codeText[i].style.left = "-12px";
      });
    });
  }
};

export default codeCopy;

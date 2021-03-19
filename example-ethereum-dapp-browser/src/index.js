import engine from "../../src/web3-provider";

window.launch = (url) => {
  const exIframe = document.querySelector("iframe");
  if (exIframe) {
    exIframe.remove();
  }

  const iframe = document.createElement('iframe');
  iframe.style.height = "100%";
  iframe.style.width = "100%";
  iframe.src = url;
  iframe.onload = () => {
    iframe.contentWindow.ethereum = engine;
  }
  document.body.appendChild(iframe);
}

const urlParams = new URLSearchParams(window.location.search);
const url = urlParams.get('app');
if (url) {
  window.launch(url);
  document.querySelector("#nav").remove();
}
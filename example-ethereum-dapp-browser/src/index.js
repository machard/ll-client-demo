import makeLedgerlive from "../../src/index";
import Transport from "../../src/transport";

const transport = new Transport();
window.ledgerlive = makeLedgerlive(transport);
transport.connect();

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
    iframe.contentWindow.ethereum = { send: () => alert("coucou") };
  }
  document.body.appendChild(iframe);
}

const urlParams = new URLSearchParams(window.location.search);
const url = urlParams.get('app');
if (url) {
  window.launch(url);
  document.querySelector("#nav").remove();
}
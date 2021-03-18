import makeLedgerlive from "../../src/index";
import Transport from "../../src/transport";

const transport = new Transport();
window.ledgerlive = makeLedgerlive(transport);
transport.connect();

var iframe = document.createElement('iframe');
iframe.style.height = "100%";
iframe.style.width = "100%";
iframe.src = "http://app.aave.com";
iframe.onload = () => {
  iframe.contentWindow.ethereum = { send: () => alert("coucou") };
}
document.body.appendChild(iframe);
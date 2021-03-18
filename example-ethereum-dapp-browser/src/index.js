import makeLedgerlive from "../../src/index";
import Transport from "../../src/transport";

const transport = new Transport();
window.ledgerlive = makeLedgerlive(transport);
transport.connect();

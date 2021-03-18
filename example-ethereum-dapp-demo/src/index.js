"use strict";

import makeLedgerlive from "../../src/index";
import Transport from "../../src/transport";

const transport = new Transport();
window.ledgerlive = makeLedgerlive(transport);
transport.connect();

// todo implement a real ethereum provider
window.ethereum = {
  enable: async () => {
    const res = await window.ledgerlive("/v0.0.1/account", { method: "GET" } );
    const account = await res.json();
    alert(account.freshAddress);
  }
};

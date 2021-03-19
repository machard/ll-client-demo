import * as CacheSubprovider from 'web3-provider-engine/subproviders/cache.js';
import * as FixtureSubprovider from 'web3-provider-engine/subproviders/fixture.js';
import * as FilterSubprovider from 'web3-provider-engine/subproviders/filters.js';
import * as VmSubprovider from 'web3-provider-engine/subproviders/vm.js';
import * as NonceSubprovider from 'web3-provider-engine/subproviders/nonce-tracker.js';
import * as ProviderEngine  from 'web3-provider-engine';
import * as RpcSubprovider  from 'web3-provider-engine/subproviders/rpc';
import * as HookedWalletSubprovider from 'web3-provider-engine/subproviders/hooked-wallet';

import makeLedgerlive from "../client/index";
import Transport from "../client/transport";

const transport = new Transport();
const ledgerlive = makeLedgerlive(transport);
transport.connect();

var engine = new ProviderEngine();

// static results
engine.addProvider(new FixtureSubprovider({
  web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
  net_listening: true,
  eth_hashrate: '0x00',
  eth_mining: false,
  eth_syncing: true,
}))

// cache layer
engine.addProvider(new CacheSubprovider())

// filters
engine.addProvider(new FilterSubprovider())

// pending nonce
engine.addProvider(new NonceSubprovider())

// vm
engine.addProvider(new VmSubprovider())

// id mgmt
engine.addProvider(new HookedWalletSubprovider({
  getAccounts: async (cb) => {
    const res = await window.ledgerlive("/v0.0.1/account", { method: "GET" } );
    const account = await res.json();
    cb(null, [account]);
  },
  processTransaction: async (tx, cb) => {
    console.log(tx);
    cb("not implemented");
  },
}));

// data source
engine.addProvider(new RpcSubprovider({
  rpcUrl: "https://mainnet.infura.io/v3/c5f470b29f9946feb13a80a8a4f8faf4",
}))

engine.start();

export default engine;
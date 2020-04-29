'use strict';

let context = {
  web3: {},
  interval: {},
  account: ""
};


export function initService(web3) {
  context.web3 = web3;
}

async function callback() {
  let pendingTransactions = await context.web3.eth.getTransaction("0x63d1b0da79e0e5452bf779622e09925ced9f57fd4feaa326c8a6fc96921e4054");
  console.log(pendingTransactions);
  stop();
}

export function start(account) {
  context.account = account;
  context.interval = setInterval(callback, 5000);
}

export function stop() {
  clearInterval(context.interval);
}
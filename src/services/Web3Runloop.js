'use strict';

let context = {
  web3: {},
  isRunning: false,
  interval: {},
  account: "",
  watchList: [],
  callback: () => {}
};


export function initService(web3, callback) {
  context.web3 = web3;
  context.callback = callback;
}

export function watchTx(txHash) {
  context.watchList.push(txHash);

  if (context.watchList.length > 0 && !context.isRunning) {
    start();
  }
}

async function runloop() {
  try {
    let toBeRemoved = [];
    for (let i = 0; i < context.watchList.length; i++) {
      const txHash = context.watchList[i];
      const tx = await context.web3.eth.getTransaction(txHash);
      if (tx.blockNumber != null) {
        toBeRemoved.push(txHash);
        context.callback(txHash);
      }
    }

    if (toBeRemoved.length > 0) {
      context.watchList = context.watchList.filter((e) => {
        return toBeRemoved.indexOf(e) >= 0;
      });
    }

    if (context.watchList.length == 0) {
      stop();
    }
  } catch (error) {
    console.log(error);
  }
}

export function start(account) {
  context.isRunning = true;
  context.account = account;

  if (context.isRunning) {
    stop();
  }
  
  runloop();
  context.interval = setInterval(runloop, 10000);
}

export function stop() {
  clearInterval(context.interval);
  context.isRunning = false;
}
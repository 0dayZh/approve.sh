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
  console.log("start watch tx: ", txHash);
  
  context.watchList.push(txHash);

  if (context.watchList.length > 0 && !context.isRunning) {
    start();
  }
}

async function runloop() {
  console.log("handle loop tick");
  
  let toBeRemoved = [];
    for (let i = 0; i < context.watchList.length; i++) {
      const txHash = context.watchList[i];
      try {
        const tx = await context.web3.eth.getTransaction(txHash);
        console.log(txHash, " status:\n", tx);
        
        if (tx.blockNumber != null) {
          console.log(txHash," mined");
          
          toBeRemoved.push(txHash);
          context.callback(txHash, txHash, true);
        }
      } catch (error) {
        context.callback(txHash, error, false);
      }
    }

    if (toBeRemoved.length > 0) {
      console.log("to remove watch list: ", toBeRemoved);
      
      context.watchList = context.watchList.filter(e => toBeRemoved.indexOf(e) < 0);
    }

    if (context.watchList.length == 0) {
      console.log("no more tx to watch");
      
      stop();
    }
}

export function start(account) {
  console.log("start watch loop");
  
  context.account = account;

  if (context.isRunning) {
    stop();
  }
  
  context.isRunning = true;
  
  context.interval = setInterval(runloop, 3000);
}

export function stop() {
  console.log("stop watch loop");
  
  clearInterval(context.interval);
  context.isRunning = false;
}
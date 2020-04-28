'use strict';

import * as PlatformService from './PlatformService.js';
import * as TokenService from './TokenService.js';
import hash from 'object-hash';
import Big from 'big.js';
import * as QueueService from './QueueService.js';

var web3 = null;
export const UNLIMITED_ALLOWANCE = new Big("115792089237316195423570985008687907853269984665640564039457584007913129639935");
export const MAX_ALLOWANCE = UNLIMITED_ALLOWANCE.div('1e10');

/**
 * @typedef Approval
 * @property {string} owner - approval's owner
 * @property {Platform} platform - the platform has been approved
 * @property {Token} token - erc20 token
 * @property {BigNumber} balance - owner's token balance
 * @property {BigNumber} allowance - allowance
 * @property {string} key - key to approval
 */

export function initService(web3Instance) {
  web3 = web3Instance;
}

const Task = (token, owner, platform, tokenInfo) => result => {
  return getApproval(token, owner, platform, tokenInfo);
};

export async function fetchAccountApprovals(account) {
  const tokens =  TokenService.tokens;
  const platforms = PlatformService.platforms;

  var tasks = [];
  
  for (let i = 0; i < tokens.length; i++) {
    let tokenInfo = tokens[i];

    let ERC20token = new web3.eth.Contract(require(`@/abi/ERC20.json`), tokenInfo.address);

    for (let j = 0; j < platforms.length; j++) {
      let platform = platforms[j]; 
      const task = Task(ERC20token, account, platform, tokenInfo);

      tasks.push(task);
    }
  }

  let approvals = await QueueService.run(tasks);
  
  return approvals;
}

export async function getApproval(token, owner, platform, tokenInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      let allowance = await getTokenAllowance(token, owner, platform.address);
      if (allowance != "0") {
        let balance = await getTokenBalance(token, owner);
    
        let approval = {
          owner: owner,
          platform: platform,
          token: tokenInfo,
          balance: new Big(balance),
          allowance: new Big(allowance),
          key: ""
        };
        approval.key = hash(`${owner}:${tokenInfo.address}:${platform.address}`);
        
        resolve(approval);
      } else {
        reject("No approval");
      }
    } catch (error) {
      reject(error);
    }
  });  
}

export async function getTokenAllowance(token, owner, spender) {
  return new Promise((resolve, reject) => {
    token.methods.allowance(owner, spender).call()
      .then(result => {
        resolve(result);
      })
      // FIXME: solve error message
      .catch(error => {
        console.log('Failed: ', error.message)
        reject(error);
      });
  });
}

export async function getTokenBalance(token, owner) {
  return new Promise((resolve, reject) =>  {
    token.methods.balanceOf(owner).call()
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        console.log('Failed: ', error.message);
        reject(error);
      })
  });
}

/**
 * Fetch all supported platforms
 * @returns {import('./PlatformService.js').Platform[]}
 */
export function fetchAllPlatforms() {
  return PlatformService.patforms;
}

export function isApprovalInDanger(approval) {
  return approval.allowance.gte(MAX_ALLOWANCE);
}

export function displayAllownace(approval) {
  if (isApprovalInDanger(approval)) {
    return "∞";
  } else {
    let allowance = new Big(approval.allowance);
    allowance = allowance.div(new Big(`1e${approval.token.decimals}`));
    
    return allowance.toFixed().toString();
  }
}
export function displayBalance(approval) {
  let balance = new Big(approval.balance);
  balance = balance.div(new Big(`1e${approval.token.decimals}`));
  return balance.toFixed().toString();
}

export async function updateApproval(approval, newAllowance) {
  let ERC20token = new web3.eth.Contract(require(`@/abi/ERC20.json`), approval.token.address);
  let spender = approval.platform.address;
  let amount = newAllowance.toString();

  return new Promise((resolve, reject) =>  {
    ERC20token.methods.approve(spender, amount).send({from: approval.owner})
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
        console.log('Failed: ', error.message);
      })
  });
}

// /**
//  * Fetch account's approved platforms
//  * @param {string} account - account's address
//  * @returns {import('./PlatformService.js').Platform[]}
//  */
// export function fetchAccountApprovedPlatforms(account) {
  
// }
'use strict';

import * as PlatformService from './PlatformService.js';
import * as TokenService from './TokenService.js';
import hash from 'object-hash';
import Big from 'big.js';

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
 * @property {string} hash - sha1 hash string of the approval data
 */

export function initService(web3Instance) {
  web3 = web3Instance;
}

export async function fetchAccountApprovals(account) {
  const tokens =  TokenService.tokens;
  const platforms = PlatformService.platforms;
  var approvals = [];

  console.log(tokens);
  console.log(platforms);

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    // TODO need a faster way to get token balance and approval info
    let ERC20token = new web3.eth.Contract(require(`@/abi/ERC20.json`), token.address);
    let balance = await getTokenBalance(ERC20token, account);

    for (let j = 0; j < platforms.length; j++) {
      let platform = platforms[j];
      let allowance = await getTokenAllowance(ERC20token, account, platform.address);

      if (allowance != "0") {
        console.log("has approval");

        let approval = {
          owner: account,
          platform: platform,
          token: token,
          balance: new Big(balance),
          allowance: new Big(allowance)
        };
        approval.hash = hash(approval);

        approvals.push(approval);
      } else {
        console.log("no approval");
      }
    }
  }
  
  return approvals;
}

export async function getTokenAllowance(token, owner, spender) {
  return new Promise((resolve, reject) => {
    token.methods.allowance(owner, spender).call()
      .then(result => {
        resolve(result);
      })
      // FIXME: solve error message
      .catch(error => {
        reject(error);
        console.log('Failed: ', error.message)
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
        reject(error);
        console.log('Failed: ', error.message);
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

export function dispalyAllownace(approval) {
  if (isApprovalInDanger(approval)) {
    return "∞";
  } else {
    let allowance = new Big(approval.allowance);
    console.log(allowance);
    
    allowance = allowance.div(new Big(`1e${approval.token.decimals}`));
    console.log(allowance);
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
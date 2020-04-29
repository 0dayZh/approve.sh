'use strict';

import * as PlatformService from './PlatformService.js';
import * as TokenService from './TokenService.js';
import hash from 'object-hash';
import Big from 'big.js';
import * as QueueService from './QueueService.js';
import * as Web3Runloop from './Web3Runloop.js';

let web3 = null;
let callbackFns = {};

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
  Web3Runloop.initService(web3Instance, runloopCallback);
}

async function runloopCallback(txHash) {
  callbackFns[txHash](txHash);
}

const Task = (token, owner, platform, tokenInfo) => getApproval(token, owner, platform, tokenInfo);

export async function fetchAccountApprovals(account) {
  const tokens =  TokenService.tokens;
  const platforms = PlatformService.platforms;

  let tasks = [];
  
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

export async function getApproval(token, owner, platformInfo, tokenInfo) {
  try {
    let allowance = await getTokenAllowance(token, owner, platformInfo.address);
    
    if (allowance != "0") {
      let balance = await getTokenBalance(token, owner);
      
      let approval = {
        owner: owner,
        platform: platformInfo,
        token: tokenInfo,
        balance: new Big(balance),
        allowance: new Big(allowance),
        key: ""
      };
      approval.key = hash(`${owner}:${tokenInfo.address}:${platformInfo.address}`);
      
      return approval;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTokenAllowance(token, owner, spender) {
  try {
    let allowance = await token.methods.allowance(owner, spender).call();
    return allowance;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTokenBalance(token, owner) {
  try {
    let balance = await token.methods.balanceOf(owner).call()
    return balance;
  } catch (error) {
    throw new Error(error.message);
  }
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

export async function updateApproval(approval, newAllowance, callback) {
  let ERC20token = new web3.eth.Contract(require(`@/abi/ERC20.json`), approval.token.address);
  let spender = approval.platform.address;
  let amount = newAllowance.toString();

  try {
    let tx = await ERC20token.methods.approve(spender, amount).send({from: approval.owner});
    const transactionHash = tx.transactionHash;
    console.log("tx: ", transactionHash);

    callbackFns[transactionHash] = callback;
    Web3Runloop.watchTx(transactionHash);

    return transactionHash;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function numberOfPlatforms(approvals) {
  let platforms = [];
  for (let approval of approvals) {
    if (platforms.map(function(e){ return e.address; }).indexOf(approval.platform.address) < 0) {
      platforms.push(approval.platform);
    }
  }

  return platforms.length;
}
'use strict';

/**
 * @typedef Token
 * @property {string} address - token contract address
 * @property {string} name - display name
 * @property {string} symbol - symbol
 * @property {number} decimals - decimals ot the token
 */

export const tokens = [
  {
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    name: "Dai",
    symbol: "dai",
    decimals: 18
  },
  {
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    name: "USDC",
    symbol: "usdc",
    decimals: 6
  },
  {
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    name: "USDT",
    symbol: "usdt",
    decimals: 6
  },
  {
    address: "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
    name: "BAT",
    symbol: "bat",
    decimals: 18
  },
  {
    address: "0x1985365e9f78359a9B6AD760e32412f4a445E862",
    name: "REP",
    symbol: "rep",
    decimals: 18
  },
  {
    address: "0xe41d2489571d322189246dafa5ebde1f4699f498",
    name: "ZRX",
    symbol: "zrx",
    decimals: 18
  },
  {
    address: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
    name: "SAI",
    symbol: "sai",
    decimals: 18
  },
  {
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    name: "WBTC",
    symbol: "wbtc",
    decimals: 8
  },
];
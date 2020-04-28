<template>
  <div class="align-left">
    <h2>APPROVALS</h2>
    <div class="cards">
      <ApprovalCard
        v-for="approval in approvals"
        v-bind:key="approval.key"
        v-bind:approval="approval"
      ></ApprovalCard>
    </div>
  </div>
</template>

<script>
import ApprovalCard from '@/components/ApprovalCard.vue'
import Big from 'big.js';

export default {
  name: 'Approvals',
  components: {
    ApprovalCard
  },
  props: ['approvals'],
  // data: function() {
  //   console.log("Begin: read test data");
    
  //   return {
  //     approvals: [
  //       {
  //         owner: "0x0f413c30c89a7decf0acf2b53890a13ebfcad6ec",
  //         platform: {
  //           address: "0x794e6e91555438afc3ccf1c5076a74f42133d08d",
  //           name: "OasisDEX",
  //           logo: "oasis"
  //         },
  //         token: {
  //           addres: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  //           name: "USDC",
  //           symbol: "usdc",
  //           decimals: 6
  //         },
  //         balance: new Big('1000000000'),
  //         allowance: new Big('12000000000'),
  //         hash: '0'
  //       },
  //       {
  //         owner: "0x0f413c30c89a7decf0acf2b53890a13ebfcad6ec",
  //         platform: {
  //           address: "0x9893292300c4e530a14FB2526271732a2a9b3f05",
  //           name: "Lendf.ME Liquidator",
  //           logo: "lendfme-liquidator"
  //         },
  //         token: {
  //           address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  //           name: "USDT",
  //           symbol: "usdt",
  //           decimals: 6
  //         },
  //         balance: new Big('2000000000'),
  //         allowance: new Big('115792089237316195423570985008687907853269984665640564039457584007913129639935'),
  //         hash: '1'
  //       }
  //     ]
  //   };

  //   console.log("End: read test data");
  // }
};
</script>

<style type='text/css' scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(2, 338px);
  grid-template-rows: 460px;
  grid-gap: 30px;
}
.align-left {
  text-align: left;
}
</style>
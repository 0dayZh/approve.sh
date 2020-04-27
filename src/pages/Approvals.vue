<template>
  <div class="align-left">
    <h2>APPROVALS</h2>
    <div class="cards">
      <ApprovalCard
        v-for="approval in approvals"
        v-bind:key="approval.hash"
        v-bind:approval="approval"
      ></ApprovalCard>
    </div>
  </div>
</template>

<script>
import ApprovalCard from '@/components/ApprovalCard.vue'

export default {
  name: 'Approvals',
  components: {
    ApprovalCard
  },
  // props: ['approvals'],
  data: function() {
    return {
        approvals: [
          {
            owner: "0x0f413c30c89a7decf0acf2b53890a13ebfcad6ec",
            platform: {
              address: "0x794e6e91555438afc3ccf1c5076a74f42133d08d",
              name: "OasisDEX",
              logo: "oasis"
            },
            token: {
              addres: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
              name: "USDC",
              symbol: "usdc",
              decimals: 6
            },
            balance: '1,000',
            allowance: '12,000',
            hash: '0'
          }
        ]
    };
  }
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
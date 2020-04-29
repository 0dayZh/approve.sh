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
// import Big from 'big.js';

export default {
  name: 'Approvals',
  components: {
    ApprovalCard
  },
  props: ['approvals']
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
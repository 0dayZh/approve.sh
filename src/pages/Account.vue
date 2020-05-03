<template>
  <div class="align-left">
    <h2>ACCOUNT</h2>
    <div class="card-container corners card-size relative-position border">
      <h3 v-if="0 != address.length">{{ displayAddress }}</h3>
      <h3 v-else>Need to connect to MetaMask</h3>
      <hr class="line border"/>
      <div class="align-left">
        <h2 class="box">{{ approvalCount }}</h2>
        <p class="box">approvals</p>
      </div>
      <div class="align-left">
        <h2 class="box">{{ platformCount }}</h2>
        <p class="box">platforms</p>
      </div>
    </div>
  </div>
</template>

<script>
import { truncate } from '@/utils/StringHelper.js';

export default {
  name: 'Account',
  props: ['address', 'approvalCount', 'platformCount'],
  computed: {
    displayAddress: function() {
      return truncate(this.address, 13, 12, 3);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-size: 18px;
  color: black;
}
p {
  font-size: 21px;
  color: #5C5C5C;
}
.align-left {
  text-align: left;
}
.card-container {
  padding: 18px;
  text-align: left;
}
.border {
  border: 1px solid #D7D7D7;
}
.line {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.relative-position {
  position: relative;
}
.card-size {
  width: 300px;
  height: 200px;
}
.corners {
  border-radius: 8px;
}
.box {
  display: inline-block;
  margin-right: 8px;
  vertical-align: middle;
}
.row-center {
  text-align: center;
}
</style>

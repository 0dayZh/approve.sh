<template>
  <div class="position card-size">
    <FlipCard
      v-bind:flipped="flipped"
    >
      <template slot="front">
        <BaseCard
          v-bind:backgroundColor="backgroundColor"
          v-bind:borderColor="borderColor"
          v-bind:platform="approval.platform.logo"
          v-bind:allowance="displayAllownace"
          v-bind:balance="displayBalance"
          v-bind:percent="percent"
          v-bind:tokenName="approval.token.name"
          v-bind:tokenSymbol="approval.token.symbol"
          v-bind:usingDefautlBottomView="usingDefautlBottomView"
          v-bind:editing=false
          v-bind:isWarning="isWarning"
          v-bind:placeholder="displayAllownace"
          @editButtonPressed="editButtonPressed"
        ></BaseCard>
      </template>
      <template  slot="back">
        <BaseCard
          v-bind:backgroundColor="backgroundColor"
          v-bind:borderColor="borderColor"
          v-bind:platform="approval.platform.logo"
          v-bind:allowance="displayAllownace"
          v-bind:balance="displayBalance"
          v-bind:percent="percent"
          v-bind:tokenName="approval.token.name"
          v-bind:tokenSymbol="approval.token.symbol"
          v-bind:usingDefautlBottomView="usingDefautlBottomView"
          v-bind:editing=true
          v-bind:isWarning="isWarning"
          v-bind:placeholder="displayAllownace"
          @editButtonPressed="editButtonPressed"
          @doneButtonPressed="doneButtonPressed"
          @declineButtonPressed="declineButtonPressed"
        ></BaseCard>
      </template>
    </FlipCard>
  </div>
</template>

<script>
import BaseCard from '@/components/ui/BaseCard.vue'
import FlipCard from '@/components/ui/FlipCard.vue'
import * as ApprovalService from '@/services/ApprovalService.js'
import Big from 'big.js';

export default {
  name: 'ApprovalCard',
  components: {
    BaseCard,
    FlipCard,
  },
  props: {
    'approval': {},
    'flipped': {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isWarning() {
      return ApprovalService.isApprovalInDanger(this.approval);
    },
    backgroundColor() {
      return this.isWarning ? "#E6DC244D" : "white";
    },
    borderColor() {
      return this.isWarning ? "#E6DC244D" : "#D7D7D7";
    },
    usingDefautlBottomView() {
      return this.isWarning;
    },
    displayAllownace() {
      return ApprovalService.displayAllownace(this.approval);
    },
    displayBalance() {
      return ApprovalService.displayBalance(this.approval);
    },
    percent() {
      let percentNumber = this.approval.balance.div(this.approval.allowance).times(100);
      return percentNumber.toFixed(2).toString();
    }
  },
  methods: {
    editButtonPressed: function() {
      this.flipped = !this.flipped;
    },
    doneButtonPressed: async function(newAllowance) {
      let allowance = new Big(newAllowance);
      let scaledAllowance = allowance.times(new Big(`1e${this.approval.token.decimals}`));

      await ApprovalService.updateApproval(this.approval, scaledAllowance);
    },
    declineButtonPressed: async function() {
      await ApprovalService.updateApproval(this.approval, new Big(0));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.position {
  position: relative;
}
.card-size {
  width: 300px;
  height: 425px;
}
</style>

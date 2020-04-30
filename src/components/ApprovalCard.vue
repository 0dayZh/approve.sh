<template>
  <div class="position card-size">
    <FlipCard
      v-bind:flipped="flipped"
    >
      <template slot="front">
        <BaseCard
          v-bind:isLoading="isLoading"
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
          placeholder=""
          @editButtonPressed="editButtonPressed"
        ></BaseCard>
      </template>
      <template  slot="back">
        <BaseCard
          v-bind:isLoading="isLoading"
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
          placeholder=""
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
import { truncate } from '@/utils/StringHelper.js';
import { log } from 'util';

export default {
  name: 'ApprovalCard',
  components: {
    BaseCard,
    FlipCard,
  },
  props: {
    'approval': {}
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
    },
    displayTx: function() {
      return truncate(this.txHash, 14, 14, 3);
    }
  },
  methods: {
    editButtonPressed: function() {
      this.flipped = !this.flipped;
    },
    handleApproval: function(newAllowance)  {
      this.updateApproval(newAllowance);
      this.isLoading = true;
      this.flipped = !this.flipped;
    },
    updateApproval: async function(newAllowance)  {
      let allowance = new Big(newAllowance);
      let scaledAllowance = allowance.times(new Big(`1e${this.approval.token.decimals}`));
      try {
        let vm = this;
        await ApprovalService.updateApproval(this.approval, scaledAllowance, function(txHash) {
          console.log("got: ", txHash);
          
          vm.txHash = txHash;
          const url = `https://etherscan.io/tx/${vm.txHash}`;
          vm.flash(`🚀 <span class='approve-font'>Approving</span><br/>\
                    tx: <a href=${url} target='_blank'>${vm.displayTx}</a>`, 'info');
        }, 
        this.txCompleted);
      } catch (error) {
        console.log(error);
        if (error.code == 4001) {
          this.flash("🙅 <span class='approve-font'>Rejected</span> 🙅‍♂️<br/>You just denied the transaction signature.", 'info');
        }

        this.txHash = "";
        this.isLoading = false;
      }
    },
    doneButtonPressed: function(newAllowance) {
      this.handleApproval(newAllowance);
    },
    declineButtonPressed: async function() {
      this.handleApproval(0);
    },
    txCompleted: function(txHash, result, success) {
      if (success) {
        if (this.txHash == txHash) {
          const url = `https://etherscan.io/tx/${this.txHash}`;
          this.flash(`👏 <span class='approve-font'>Done</span><br/>\
                  tx: <a href=${url} target='_blank'>${this.displayTx}</a>`, 'success');
        } else {
          console.log("Unhanded: ", txHash);
        }
      } else {
        const url = `https://etherscan.io/tx/${this.txHash}`;
        this.flash(`👀 <span class='approve-font'>Error</span><br/>\
                  tx: <a href=${url} target='_blank'>${this.displayTx}</a>`, 'error');
      }

      this.txHash = "";
      this.isLoading = false;
    }
  },
  data: function() {
    return {
      txHash: "",
      flipped: false,
      isLoading: false
    };
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

<template>
  <div id="app" class="grid-container">
    <div class="header">
      <h1 class="header">Approve<span class="tint-color">.</span>sh</h1>
    </div>

    <div v-if="hasAccount" class="approvals">
      <div v-if="this.$store.approvals.length == 0" class="approvals-loading">
        <RotateSquare background="#EB39DC"/>
      </div>
      <Approvals v-else
        class="approvals"
        :approvals="this.$store.approvals"
      />
    </div>
    <div v-else>
      
    </div>
    
    <Account class="account"
      :address="this.$store.account.address"
      :approvalCount="approvalCount"
      :platformCount="platformCount"
    />
    <Notifications class="notification"/>
    <div class="footer">
      <div class="footer-container">
        <a href="https://github.com/0dayZh/approve.sh" target="_blank">
          <img class="footer-content" src="@/assets/github.png"/>
        </a>
      </div>
    </div>
    <vue-metamask 
      userMessage="approval.sh" 
      @onComplete="onMetaMaskLoadComplete"
    ></vue-metamask>
  </div>
</template>

<script>
import Approvals from '@/pages/Approvals.vue';
import Account from '@/pages/Account.vue';
import Notifications from '@/pages/Notifications.vue';
import VueMetamask from 'vue-metamask';
import * as ApprovalService from '@/services/ApprovalService.js';
import Web3 from 'web3';
import { RotateSquare } from 'vue-loading-spinner';

export default {
  name: 'App',
  components: {
    Approvals,
    Account,
    Notifications,
    VueMetamask,
    RotateSquare
  },
  computed: {
    hasAccount() {
      return !!this.$store.account.address.length;
    }
  },
  data: function() {
    return {
      approvalCount: 0,
      platformCount: 0
    }
  },
  methods: {
    async onMetaMaskLoadComplete(data) {
      let account = data.metaMaskAddress;
      let web3 = new Web3(data.web3.currentProvider);      

      this.$store.web3 = web3;
      this.$store.account.address = account;

      ApprovalService.initService(web3);
      let approvals = await ApprovalService.fetchAccountApprovals(account);

      let dangerCount = 0;
      for (let approval of approvals) {
        console.log(approvals);
        
        if (ApprovalService.isApprovalInDanger(approval)) {
          dangerCount++;
        }
      }
      if (dangerCount > 0) {
        if (1 == dangerCount) {
          this.flash(`🔥<span class='approve-font'>WARNING</span>🔥<br/>There is ${dangerCount} approval having unlimited allownace.`, 'warning');
        } else {
          this.flash(`🔥<span class='approve-font'>WARNING</span>🔥<br/>There are ${dangerCount} approvals having unlimited allownace.`, 'warning');
        }
      }

      this.approvalCount = approvals.length;
      this.platformCount = ApprovalService.numberOfPlatforms(approvals);
      this.$store.approvals = approvals;
    },
  },
  mounted() {
    this.flash("🎉 <span class='approve-font'>Welcome to Approve<span class='tint-color'>.</span>sh</span>.<br/>\
              Learn more about <a href='https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#approve' target='_blank'>ERC20 approve</a>,<br/>\
              and the <a href='https://www.coindesk.com/long-festering-defi-dapp-bug-still-not-fixed-by-industry' target='_blank'>Open Security Issue</a>.", 'info', {
        important: true
      });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;
}
h1 {
  font-family: Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", "sans serif";
  font-size: 48px;
  font-style: normal;
  font-variant: normal;
  font-weight: bold;
  line-height: 48px;
}
h2 {
  font-family: Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", "sans serif";
  font-size: 24px;
  font-style: normal;
  font-variant: normal;
  font-weight: bold;
  line-height: 24px;
  color: #737372;
}
h3 {
  font-family: "Helvetica Neue", "sans serif";
  font-size: 21px;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  line-height: 21px;
  color: #737372;
}
a {
  color: #EB39DC;
}
.approve-font {
  font-family: Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", "sans serif";
}
.tint-color {
  color: #EB39DC;
}
.header { 
  grid-area: header; 
  text-align: left;
}
.approvals { 
  grid-area: approvals;
  min-height: calc(100vh - 390px);
}
.account { grid-area: account }
.notification { grid-area: notification }
.footer {
  grid-area: footer;
}
.footer-container {
  display: block;
}
.footer-content {
  margin-top: 100px;
  display: inline-block;
  vertical-align: bottom;
  widows: 30px;
  height: 30px;
  filter: invert(42%) sepia(6%) saturate(63%) hue-rotate(71deg) brightness(91%) contrast(86%);
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr 670px 60px 300px 1fr;
  grid-template-rows: 80px 310px 1fr 200px;
  grid-template-areas:
    '. header header header .'
    '. approvals . account .'
    '. approvals . notification .'
    '. footer footer footer .';
  grid-gap: 10px;
}

.approvals-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

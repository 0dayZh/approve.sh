<template>
  <div class="container corners card-size relative-position" :style="style">
    <loading 
      v-bind:active.sync="isLoading" 
      v-bind:isFullPage="isFullPage"
      color="#EB39DC"
      v-bind:width="40"
      v-bind:height="40"
      backgroundColor="#000"
      v-bind:opacity="0.233">
    </loading>

    <!-- Header: Platform logo -->
    <div class="align-left flex">
      <img class="platform-logo relative-position box" :src="require('@/assets/platform/' + platform + '.png')">
      <button class="edit-button box" v-on:click="editButtonPressed">{{ editing ? "Cancel" : "Edit" }}</button>
    </div>
    <hr class="line" :style="lineStyle"/>

    <!-- Middle Section: -->
    <!-- Allowance edit -->
    <div v-if="editing">
      <h2>Allowance</h2>
      <input type="number" :placeholder="placeholder" v-model="newAllowance"/>
      <div class="align-left">
        <img class="token-logo box" :src="require('@/assets/token/' + tokenSymbol + '.png')">
        <h3 class="box">{{ tokenName }}</h3>
      </div>
    </div>

    <!-- Allowance info -->
    <div v-else class="box">
      <h1>{{ allowance }}</h1>
      <div class="align-left">
        <img class="token-logo box" :src="require('@/assets/token/' + tokenSymbol + '.png')">
        <h3 class="box">{{ tokenName }}</h3>
      </div>
    </div>


    <!-- Bottom Section: -->
    <div class="bottom">
      <hr class="bottom-line" :style="lineStyle"/>

      <!-- Action buttom view -->
      <div v-if="editing" class="bottom-size bottom-margin left-bottom-corner right-bottom-corner">
        <div class="row-center">
          <button class="done-button box" v-on:click="doneButtonPressed">Done</button>
          <button class="decline-button box" v-on:click="declineButtonPressed">Decline</button>
        </div>
      </div>

      <!-- Warning view -->
      <div v-else-if="isWarning" class="warning bottom-size bottom-margin left-bottom-corner right-bottom-corner">
        <div class="row-center">
          <h1 class="box">WARNING!</h1>
          <div class="row-center">
            <h2 class="white black-background row-center">UNLIMITED</h2>
          </div>
        </div>
      </div>

      <!-- Info view -->
      <div v-else class="bottom-size info-margin left-bottom-corner right-bottom-corner">
        <div class="box">
          <h1>{{ percent }} %</h1>
          <h3>Balance ～ {{ balance }} {{ tokenName }}</h3>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'BaseCard',
  props: ['isLoading', 'backgroundColor', 'borderColor', 'platform', 'allowance', 'percent', 'balance', 'tokenName', 'tokenSymbol', 'editing', 'isWarning', 'placeholder'],
  components: {
    Loading
  },
  computed: {
    style() {
      return {
        backgroundColor: this.backgroundColor,
        border: '1px solid ' + this.borderColor
      };
    },
    lineStyle() {
      return {
        border: '1px solid ' + this.borderColor
      };
    },
    isFullPage() {
      return false;
    }
  },
  data: function() {
    return {
      newAllowance : ""
    }
  },
  methods: {
    editButtonPressed() {
      this.$emit('editButtonPressed');
    },
    doneButtonPressed() {
      this.$emit('doneButtonPressed', this.newAllowance);
    },
    declineButtonPressed() {
      this.$emit('declineButtonPressed');
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding: 18px;
  text-align: left;
}
.platform-logo {
  width: 250px;
  height: 40px;
  object-fit: contain;
  object-position: left;
}
.line {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.bottom {
  position: absolute;
  vertical-align: bottom;
  bottom: 0px;
  width: 300px;
}
.bottom-line {
  width: auto;
  margin-left: -18px;
  margin-right: -18px;
  margin-bottom: 0px;
}
.relative-position {
  position: relative;
}
.card-size {
  width: 300px;
  height: 425px;
}
.corners {
  border-radius: 8px;
}
.token-logo {
  width: 30px;
  height: 30px;
}
h1 {
  margin-bottom:10px;
}
.edit-button {
  border: none;
  position: absolute; 
  right: 0;
  background-color: #00000000;
  width: 80px;
  height: 40px;
  color: #EB39DC;
  font-family: "Helvetica Neue", "sans serif";
  font-size: 21px;
  font-style: normal;
  font-variant: normal;
  font-weight: 500;
  line-height: 21px;
}
.done-button {
  border: 1px solid #E732D7;
  border-radius: 4px;
  background-color: #E732D7CC;
  width: 270px;
  height: 50px;
  color: white;
  font-family: "Helvetica Neue", "sans serif";
  font-size: 21px;
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 21px;
  margin-top: 35px;
}
.decline-button {
  border: 2px solid #D44545;
  border-radius: 4px;
  background-color: #FFFFFFBB;
  width: 270px;
  height: 50px;
  color: #D44545;
  font-family: "Helvetica Neue", "sans serif";
  font-size: 21px;
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 21px;
  margin-top: 30px;
}
input {
  outline-style: none;
  border: 1px solid #E2E2E2; 
  border-radius: 4px;
  background-color: #FFFFFFBB;
  padding: 13px 14px;
  width: 270px;
  font-weight: 700;
  font-family: Impact, Haettenschweiler, "Franklin Gothic Bold", Charcoal, "Helvetica Inserat", "Bitstream Vera Sans Bold", "Arial Black", "sans serif";
  font-size: 24px;
}
.align-left {
  text-align: left;
}
.align-right {
  text-align: right;
}
.flex {
  display: flex;
}
.box {
  display: inline-block;
  margin-right: 8px;
  vertical-align: middle;
}
.warning {
  background-color: #E6DC24;
}
.bottom-size {
  display: block;
  height: 210px;
}
.info-margin {
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
}
.bottom-margin {
  margin-left: -18px;
  margin-right: -18px;
  margin-bottom: 0px;
}
.left-bottom-corner {
  border-bottom-left-radius: 8px;
}
.right-bottom-corner {
  border-bottom-right-radius: 8px;
}
.row-center {
  text-align: center;
}
.black-background {
  background-color: black;
  height: 50px;
  padding-top: 20px;
}
.white {
  color: white;
}
</style>

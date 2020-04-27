<template>
  <div class="container corners card-size relative-position" :style="style">

    <!-- platform logo -->
    <div class="align-left flex">
      <img class="platform-logo relative-position box" :src="require('@/assets/platform/' + platform + '.png')">
      <button class="edit-button box" v-on:click="onClick">{{ editing ? "Cancel" : "Edit" }}</button>
    </div>
    <hr class="line" :style="lineStyle"/>

    <!-- Allowance info -->
    <div v-if="editing">
      <h2>Allowance</h2>
      <input placeholder="2,000"/>
      <div class="align-left">
        <img class="token-logo box" :src="require('@/assets/token/' + tokenSymbol + '.png')">
        <h3 class="box">{{ tokenName }}</h3>
      </div>
    </div>
    <div v-else class="box">
      <h1>{{ allowance }}</h1>
      <div class="align-left">
        <img class="token-logo box" :src="require('@/assets/token/' + tokenSymbol + '.png')">
        <h3 class="box">{{ tokenName }}</h3>
      </div>
    </div>

    <div class="bottom">
      <hr class="bottom-line" :style="lineStyle"/>

      <!-- Custom buttom view -->
      <div v-if="editing" class="bottom-size left-bottom-corner right-bottom-corner">
        <div class="row-center">
          <button class="done-button box">Done</button>
          <button class="decline-button box">Decline</button>
        </div>
      </div>
      <!-- Show warning view -->
      <div v-else-if="isWarning" class="warning bottom-size left-bottom-corner right-bottom-corner">
        <div class="row-center">
          <h1 class="box">WARNING!</h1>
          <div class="row-center">
            <h2 class="white black-background row-center">UNLIMITED</h2>
          </div>
        </div>
      </div>
      <div v-else class="bottom-size left-bottom-corner right-bottom-corner">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: ['backgroundColor', 'borderColor', 'platform', 'allowance', 'tokenName', 'tokenSymbol', 'editing', 'isWarning'],
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
    }
  },
  methods: {
    onClick() {
      this.$emit('buttonPressed');
    }
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
  background-color: #FFFFFFCC;
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

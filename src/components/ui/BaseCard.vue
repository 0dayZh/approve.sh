<template>
  <div class="container corners card-size relative-position" :style="style">

    <!-- platform logo -->
    <div class="align-left flex">
      <img class="platform-logo relative-position box" :src="require('@/assets/platform/' + platform + '.png')">
      <button class="box" v-on:click="onClick">{{ buttonTitle }}</button>
    </div>
    <hr class="line" :style="lineStyle"/>

    <!-- Allowance info -->
    <div class="box">
      <h1>{{ allowance }}</h1>
      <div class="align-left">
        <img class="token-logo box" :src="require('@/assets/token/' + tokenSymbol + '.png')">
        <h3 class="box">{{ tokenName }}</h3>
      </div>
    </div>
    <hr class="bottom-line" :style="lineStyle"/>

    <!-- Custom buttom view -->
    <div v-if="!!bottomView">
    </div>
    <!-- Default warning view -->
    <div v-else class="warning bottom-size left-bottom-corner right-bottom-corner">
      <div class="row-center">
        <h1 class="box">WARNING!</h1>
        <div class="row-center">
          <h2 class="white black-background row-center">OUT OF CONTROL</h2>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: ['backgroundColor', 'borderColor', 'platform', 'allowance', 'tokenName', 'tokenSymbol', 'bottomView', 'buttonTitle'],
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
.bottom-line {
  width: auto;
  margin-left: -18px;
  margin-right: -18px;
  margin-top: 15px;
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
button {
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
  margin: -7px -18px -5px -18px;
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

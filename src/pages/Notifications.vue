<template>
  <div class="align-left">
    <h2>NOTIFICATIONS</h2>
    <flash-message class="notification-container"></flash-message>
  </div>
</template>

<script>
import { truncate } from '@/utils/StringHelper.js';

export default {
  name: 'Notifications',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.align-left {
  text-align: left;
}
.notification-container {
  width: 336px;
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

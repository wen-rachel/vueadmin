<template>
  <div id="app">
    <!-- 顶级出口 login、layout 剩余都在layout中 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.toggle-btn{
    font-size: 20px;
}
.table-bg{
  background-color: #fff;
  padding: 20px;
  margin: 15px 0;
}
</style>

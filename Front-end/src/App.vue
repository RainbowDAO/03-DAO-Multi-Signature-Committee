<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>

export default {
  name:"app",
  created() {
  },
  methods:{
  }
}
</script>
<style lang="scss">

#app {
  font-size: 12px;
}
.page-title{
  position: absolute;
  top: 30px;

  left: calc(50% - 550px);
  width: 800px;
  margin: 0 auto;
}
.no-data{
  text-align: center;
  padding: 10px 0;
}
</style>

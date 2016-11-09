<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style lang="scss">

@import './assets/styles/common/index.scss';
@import "./assets/styles/fonts/iconfont.css";
@import './assets/styles/components/index.scss';
@import './assets/styles/pages/index.scss';

// body,html{
//   margin:0;
//   padding:0;
//   width:100%;
//   // height:100%;
//   // min-width:1366px;
//   // min-height:768px;
// }

#app{
  display:flex;
  flex-direction:column;
  // height:100%;
}
</style>

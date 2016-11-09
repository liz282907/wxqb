<template>
  <div class="app-main">
    <div class="header">
        <main-header></main-header>
    </div>
    <div class="container">
        <router-view></router-view>
    </div>


    <div class="footer">
        <main-footer></main-footer>
    </div>


  </div>
</template>

<script>
// import navigation from './components/navigation'
import MainHeader from '../components/main-header/main-header'
import MainFooter from '../components/main-footer/main-footer'


export default {
  name: 'app',
  components: {
    'main-header': MainHeader,
    'main-footer': MainFooter
  },
  mounted:function(){

  }
}
</script>

<style lang="scss">
$base-background: #F4F4F4;

.app-main{
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: $base-background;
    .header{
      height: 64px;
    }
    .footer{
      height: 64px;
    }
    .container{
      flex: 1;
      height: calc(100vh - 64px);
    }

}
</style>

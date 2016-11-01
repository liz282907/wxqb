<template>
  <div class="management-container">
      <div style="width:200px;height:100%;background:rgb(22,50,65)">
        <div class="management-float-nav-container">
            <div class="management-float-nav" v-for="item in navlistOfManagement">
            <router-link :to="item.url">{{item.name}}</router-link>
            </div>
        </div>
      </div>
      <router-view></router-view>
      <!-- <div style="flex:1;height:100%;background:-webkit-gradient(linear, 0% 0%, 100% 0%,from(rgb(59,125,162)),to(rgb(34,72,94)));display:flex;flex-direction:column"> -->

      </div>
  </div>
</template>

<script>
import { navlistOfManagement } from '../../const/url'
export default {
  name: 'search_result',
  data () {
    return {
      navlistOfManagement
    }
  },
  components:{

  },
  methods:{


  },
  created:function(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.router-link-active{
  width: 100%;
  height: 100%;
  display: inline-block;
  background:rgb(36,89,120);
  box-shadow:none;
}
.management-container{
    display:flex;
    flex:1;
}

.management-float-nav-container{
    position:fixed;
    width:130px;
    left:50px;
    height:100%;
}

.management-float-nav{
    color:white;
    text-align:center;
    background:rgb(71,147,185);
    border-radius:5px;
    margin:10px 0;
    height:3rem;
    line-height:3rem;
    font-family:"Microsoft Yahei";
    cursor:pointer;
    box-shadow:0 3px 0 rgb(36,89,120);
    a{
      color: white;
    }
}

.management-float-nav:hover{
    background:rgb(36,89,120);
    box-shadow:none;
}

</style>
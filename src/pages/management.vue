<template>
  <div class="management-container">
      <aside  class="left-nav"   style="width:200px;height:100%;">
        <div class="management-float-nav-container">
            <div class="management-float-nav" v-for="item in navlistOfManagement">
            <router-link :to="item.url">{{item.name}}</router-link>
            </div>
        </div>
      </aside>
      <section class="right-container">
        <router-view></router-view>
      </section>


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
<template>
  <div id="navigation">
    <!-- <div > -->
      <router-link  v-for="(title,key) in nav" class="nav-div" :to="title.url" >
        {{title.name}}
      </router-link>
<!--     </div> -->
  </div>
</template>

<script>
import {nav} from "../../const/url.js";
import VueRouter from 'vue-router';
var r = new VueRouter();
export default {
  name: 'navigation',
  data () {
    return {

    }
  },
  computed:{
    nav:function(){
      return nav;
    },
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#navigation{
  width:100%;
  height:3rem;
  background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(rgb(41,87,113)),to(rgb(62,131,169)));
  border-bottom:1px solid white;
}

.nav-div{
  margin-left:4rem;
  float:left;
  color:white;
  font-family:"Microsoft";
  font-weight:900;
  font-size:1.2rem;
  line-height:3rem;
  padding:0 2rem 0 2rem;
  cursor:pointer;
  text-decoration:none;
}
/*参见vue-router 文档*/
.router-link-active{
  border-top:3px solid rgb(92,191,210);
}
.nav-div:hover{
  color:rgb(92,191,210);
}
</style>

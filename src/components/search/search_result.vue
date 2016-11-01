<template>
  <div class="search-result-container">
      <div style="width:200px;height:100%;background:rgb(22,50,65)">
        <div class="search-result-float-nav-container">
            <div class="search-result-float-nav" v-for="search_result in search_results" @click="tag_click(search_result.name);">
                {{search_result.name}}
            </div>
        </div>
      </div>
      <div style="flex:1;height:100%;background:-webkit-gradient(linear, 0% 0%, 100% 0%,from(rgb(59,125,162)),to(rgb(34,72,94)));display:flex;flex-direction:column">
        <div class="search-result-searchinput-container">
            <input type="text" class="search-result-search-input" placeholder="输入查询条件" v-model="search_content" @keyup.enter="search_click"/>
        </div>
        <div class="search-result-showId-container">
            {{this.show_content}}
        </div>
        <div class="search-result-show-container">
            <div class="search-result-content-container" v-for="search_result in search_results">
                <a v-bind:id="search_result.name"></a>
                <div class="search-result-content-title">
                    {{search_result.name}}
                </div>
                <div class="search-result-content-div">
                    <show-content :infos="search_result.info"></show-content>
                </div>             
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import show_content from './show_content.vue';

export default {
  name: 'search_result',
  data () {
    return {
        search_content:"",
        show_content:"",
        search_results:[]
    }
  },
  components:{
      showContent:show_content
  },
  methods:{
      search_click:function(){
          this.show_content = this.search_content;
          search_begin(this);
      },
      tag_click:function(name){
          //window.location.hash = name;
          document.getElementById(name).scrollIntoView();
      }
  },
  created:function(){
      this.search_content = this.$route.params.search_content;
      this.show_content = this.search_content;
      search_begin(this);
  }
}

function search_begin(vm){
    vm.$http.get("/wxqb/search/searchId",{
        params:{
            keyword:vm.search_content
        }
    })
    .then(function(res){
        vm.search_results = res.body;
    },function(e){
        console.log(e);
    });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.search-result-container{
    display:flex;
    flex:1;
}

.search-result-float-nav-container{
    position:fixed;
    width:130px;
    left:50px;
    height:100%;
}

.search-result-float-nav{
    color:white;
    text-align:center;
    background:rgb(71,147,185);
    border-radius:5px;
    margin:20px 0;
    height:3rem;
    line-height:3rem;
    font-family:"YouYuan";
    cursor:pointer;
    box-shadow:0 3px 0 rgb(36,89,120);
}

.search-result-float-nav:hover{
    background:rgb(36,89,120);
    box-shadow:none;
}

.search-result-searchinput-container{
    margin-top:20px;
}

.search-result-search-input{
    margin:0 auto 0 100px;
    padding:0 10px;
    width:80%;
    height:2.5rem;
    line-height:2.5rem;
    font-size:1rem;
    border-radius:5px;
    font-family:"Microsoft YaHei";
    background:rgb(235,237,236);
}

.search-result-showId-container{
    text-align:center;
    margin:30px auto 0 100px;
    padding:0 10px;
    width:80%;
    height:2.5rem;
    line-height:2.5rem;
    font-size:1.5rem;
    border-radius:5px;
    font-family:"Microsoft YaHei";
    background:rgb(235,237,236);
    border:2px solid rgb(235,237,236);
}

/*show info*/
.search-result-show-container{
    margin-top:20px;
    width:100%;
    flex:1;
    overflow:auto;
}

.search-result-content-container{
    margin:50px auto 50px 100px;
    width:81%;
}

.search-result-content-title{
    color:white;
    font-size:1.5rem;
    font-family:"STCaiyun";
}

</style>
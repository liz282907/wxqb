<template>
  <div class="search-container">
      <div class="titile-container">
          基于威胁情报的追踪溯源分析支撑系统
      </div>
      <div class="searchinput-container">
          <input type="text" class="search-input" placeholder="输入查询条件" v-model="search_content" @keyup.enter="search_click"/>
      </div>
      <div class="topn-container">
          <div class="topn-div" v-for="topn in topnList">
              <div class="topn-title">
                  {{topn.name}}
              </div>
              <div class="topn-content" v-for="val in topn.list" @click="topn_click(val);">
                  {{val}}
              </div>                 
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  data () {
    return {
        topnList:[],
        search_content:""
    }
  },
  created:function(){
      this.$http.get("/wxqb/search/loadTopn")
        .then(
            function(response){
                this.topnList = response.body;
            },
            function(e){
                console.log(e);
            }
        )
  },
  methods:{
      topn_click:function(id){
          alert(id);
      },
      search_click:function(){
          this.$router.push({ name: 'search_result', params: { search_content: this.search_content }});
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.search-container{
    flex:1;
    background:url('../../assets/images/search_bg.png');
    background-size:cover
}

.titile-container{
    text-align:center;
    color:white;
    font-family:"Microsoft YaHei";
    font-size:3.5rem;
    font-weight:900;
    margin-top:8rem;
}

.searchinput-container{
    margin-top:4rem;
    text-align:center;
}

.search-input{
    padding:0 10px;
    width:60%;
    height:3.5rem;
    line-height:3.5rem;
    font-size:1.5rem;
    border-radius:5px;
    font-family:"Microsoft YaHei";
}

.topn-container{
    width:60%;
    height:45%;
    margin:4rem auto;
    overflow-x:auto;
    display:flex;
}

.topn-div{
    min-width:100px;
    height:100%;
    float:left;
    margin:0 20px;
    background:rgb(235,237,236);
    flex:1;
    border-radius:5px;
    box-shadow:0 0 5px gray inset;
}

.topn-title{
    color:rgb(70,158,216);
    font-family:"Microsoft YaHei";
    font-size:1.5rem;
    font-weight:900;
    margin:5px 20px;
    border-bottom:1px solid rgb(174,174,174);
}

.topn-content{
    color:rgb(174,174,174);
    font-family:"Microsoft YaHei";
    font-size:1rem;
    font-weight:700;
    margin:8px 20px;
    cursor:pointer;
}

.topn-content:hover{
    color:steelblue;
    font-size:1.1rem;
    margin:10px 20px;
}
</style>
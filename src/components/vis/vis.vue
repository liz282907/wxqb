<template>
  <div class="vis-container">
      <div style="width:200px;height:100%;background:rgb(22,50,65)">
        <div class="vis-float-nav-container">
            <div class="vis-float-nav" v-for="title in titles">
                {{title}}
            </div>
        </div>
      </div>
      <div style="flex:1;height:100%;background:-webkit-gradient(linear, 0% 0%, 100% 0%,from(rgb(59,125,162)),to(rgb(34,72,94)));display:flex;flex-direction:column">
        <div class="vis-searchinput-container">
            <input type="text" class="vis-search-input" placeholder="输入查询条件" v-model="search_content" @keyup.enter="search_click"/>
        </div>
        <div class="vis-showId-container">
            {{this.show_id}}          
        </div>
        <association v-if="association_flag" :keyword="search_content" :isSearch="search_flag"></association>
      </div>
  </div>
</template>

<script>
import association from './association.vue';

export default {
  name: 'vis',
  data () {
    return {
        titles:["关联钻取"],
        search_content:"",
        show_id:"",
        current:"关联钻取",
        association_flag:false,
        search_flag:true
    }
  },
  components:{
      association
  },
  methods:{
      search_click:function(){
          this.search_flag = !this.search_flag;
          if(this.current == "关联钻取")
            this.association_flag = true;
      }
  },
  created:function(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.vis-container{
    display:flex;
    flex:1;
}

.vis-searchinput-container{
    margin-top:20px;
}

.vis-search-input{
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

.vis-showId-container{
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

.vis-float-nav-container{
    position:fixed;
    width:130px;
    left:50px;
    height:100%;
}

.vis-float-nav{
    color:white;
    text-align:center;
    background:rgb(71,147,185);
    border-radius:5px;
    margin:10px 0;
    height:3rem;
    line-height:3rem;
    font-family:"YouYuan";
    cursor:pointer;
    box-shadow:0 3px 0 rgb(36,89,120);
}

.vis-float-nav:hover{
    background:rgb(36,89,120);
    box-shadow:none;
}

.network_tip{
	line-height:30px;
	border-radius:5px;
	color:white;
	text-align:center;
	background-color:gray;
	opacity: 0.6; 
	font-family:"Microsoft YaHei";	
	cursor:pointer;
}

.tooltip{
	position: fixed;
	height: auto;
	font-family: Microsoft YaHei;
	font-size: 14px;
	color : white;
	border-style: solid; 
	border-width: 1px;
	background-color: white;
	border-radius: 5px;
	background-color: rgba(96,96,96,0.6);
	padding:5px;
}

</style>
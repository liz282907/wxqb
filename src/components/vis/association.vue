<template>
    <div id="vis_container" class="vis-container" style="flex:1;border:1px solid gray">

    </div>
</template>

<script>
import {network} from '../../assets/js/network.js';

export default {
  name: 'association',
  props:["keyword","isSearch"],
  data () {
    return {

    }
  },
  components:{
 
  },
  methods:{

  },
  watch:{
      isSearch:function(){
          loadData(this);
      }
  },
  mounted:function(){
      loadData(this);
  }
}

function loadData(vm){
    vm.$http.get("/wxqb/search/searchAsso_init",{
        params:{
            id:vm.keyword
        }
    }).then(function(res){
        var o={
            "container":"#vis_container",
            "d":res.body
        }
        var net = new network(o);
    },function(e){
        console.log(e);
    })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
	font-family: "Microsoft YaHei";
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
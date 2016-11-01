<template>
  <div class="info-container">
      <div v-if="isArr">
          <table class="show-info-table">
              <thead>
                  <tr>
                    <th v-for="table_title in table_titles">{{table_title}}</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="info in infos">
                      <td v-for="(value,key) in info">{{value}}</td>
                  </tr>
              </tbody>
          </table>
      </div>
      <div v-if="isObj">
          <div v-for="(value,key) in baseInfo" class="info-div">
              {{key}} ： {{value}}
          </div>
      </div>
  </div>
</template>

<script>
import {nameMap} from "../../assets/js/tools.js";

export default {
  name: 'show_content',
  props:["infos"],
  data () {
    return {
        isArr:false,
        isObj:false,
        table_titles:[],
        baseInfo:{}
    }
  },
  methods:{

  },
  created:function(){
      if(this.infos instanceof Array){
          this.isArr = true;
          if(this.infos.length != 0){
              for(var key in this.infos[0]){
                  key = nameMap(key);
                  this.table_titles.push(key);
              }              
          }
      }else if(typeof(this.infos) === "object"){
          for(var key in this.infos){
              this.baseInfo[nameMap(key)] = this.infos[key];
          }
          this.isObj = true
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.info-container{
    background:rgb(235,237,236);
    border-radius:5px;
    border:2px solid rgb(235,237,236);
    margin-top:10px;
}

.info-div{
    font-family:"Microsoft YaHei";
    font-size:1rem;
    margin:10px 20px;
}

.show-info-table{
    width:100%;
}

.show-info-table thead th{
    background:rgb(22,50,65);
    color:white;
    padding:5px 0;
    font-family:"Microsoft YaHei";
}

.show-info-table tbody td{
    font-family:"Microsoft YaHei";
    font-size:1rem;
    padding:10px 5px;
    color:rgb(70,70,70);
}

.show-info-table tbody tr:nth-child(odd) td{
    background:rgb(247,247,247);
}

.show-info-table tbody tr:nth-child(even) td{
    background:rgb(188,214,227);
}
</style>
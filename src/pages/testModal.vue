<template>
    <div class="my-tool-container">
        <div class="tool-bar">
            <div>
                <span class="tag" @click="testModal('ip')"><el-tag >ip</el-tag></span>
                <span class="tag" @click="testModal('dns')"><el-tag >DNS</el-tag></span>
                <span class="tag" @click="testModal('url')"><el-tag >URL</el-tag></span>
            </div>


        </div>
        <div class="tool-main">

        </div>

        <editModal :wigetList="wigetList"  :show = "editModalVisible" :category="category"
            :onUpdate="onUpdate" :onCancel="onCancel"
            @close="editModalVisible = false"
        ></editModal>

    </div>

</template>

<script>

import draggable from 'vuedraggable'
import editModal from '../components/editModal/editModal'

import { wigetSettings } from '../../const/constants'
export default {

  components: {
    draggable,
    editModal
  },
  data(){
    const wigets = JSON.parse(wigetSettings.ip);
    const serverData = JSON.parse(wigetSettings.ipData);

    return {
        wigets:[...wigets],
        serverData,
        category:'',

        // wigetsForIP: [...wigets],
        // // serverDataOfIp: JSON.parse(wigetSettings.ipData),

        // wigetsForDNS:[],
        // wigetsForURL:[],
        editModalVisible:false
    }
  },

  computed:{
    wigetList(){
        if(!this.wigets.length) return [];
        return this.wigets.map(wiget=>{

            const type = wiget.type;
            let newWiget = wiget;
            if(type==='select'){
                let {options,...others} = {...wiget};
                const valueArr = wiget.options.values.split(',');
                newWiget =  {
                    ...others,
                    options: options.labels.split(',').reduce((prev,cur,index)=>{
                                prev.push({label:cur,value:valueArr[index]});
                                return prev;
                            },[])
                }
            }
            if(this.serverData){
                newWiget.modelValue = this.serverData[wiget.field];
            }

            return newWiget;
        })
    }
  },
  watch:{
    wigetList(val){
        console.log("change wigetList",val)
    }
  },

  methods:{

    onUpdate(){

        this.editModalVisible = false;
    },
    onCancel(){
        this.editModalVisible = false;
    },
    testModal(category){
        this.category = category;
        this.wigets = [...JSON.parse(wigetSettings[category])];
        this.serverData = JSON.parse(wigetSettings[category+'Data']);
        this.editModalVisible = true;
        console.log(this.wigetList);
    },
    parentListener(){
        this.editModalVisible = false;
    }
  }
};
</script>

<style lang='scss'>


.my-tool-container{
    width: 100%;
    height: 100%;
    margin: 0;
    .tool-main,.tool-bar{
        /*float: right;*/
        cursor: pointer;
        padding: 10px 50px;
    }
    .tool-main{
        overflow: auto;
        background-color: white;
        padding: 50px;
    }
}
.row{
    display: flex;
    vertical-align: middle;
    .actions-group{

        margin-left: 20px;
        width: 20%;
        line-height: 36px;
        display: flex;
        span{
            display: flex;
            align-items: center;
            margin-left: 20px;
            .iconfont{
                font-size: 20px;
            }


        }
    }
    .form-item{
        flex: 1;
    }
}
.form-item{
        display: flex;
        line-height: 36px;
        margin: 10px 0;
        .form-left{
            width: 120px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-align: right;
            padding-right: 20px;
            box-sizing: border-box;
        }
        .form-right{
            flex: 1;
            vertical-align: middle;
            // display: inline-block;
        }
    }
.setting{
    .tag{
        text-align: center;
    }
}
.code-area{
    overflow: hidden;
}

/*.tool-main{
    width: 100%;
    height: 100%;
    background-color: white;
}*/
</style>

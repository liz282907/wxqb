<template>
    <div class="my-tool-container">
        <div class="tool-bar">
            <div>
                <span class="tag" @click="testModal"><el-tag >ip</el-tag></span>
            </div>


        </div>
        <div class="tool-main">

        </div>

        <editModal :wigetList="wigetList" :show = "editModalVisible"
            :onYes="onYes" :onCancel="onCancel"
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
    const wigets = JSON.parse(wigetSettings.test);

    return {
        wigets:[...wigets],
        wigetsForIP: [...wigets],
        wigetsForDNS:[],
        wigetsForURL:[],
        editModalVisible:false
    }
  },

  computed:{
    wigetList(){
        if(!this.wigets.length) return [];
        return this.wigets.map(wiget=>{
            const type = wiget.type;
            if(wiget.type==='select'){
                let {options,...others} = {...wiget};
                const valueArr = wiget.options.values.split(',');
                return {
                    ...others,
                    options: options.labels.split(',').reduce((prev,cur,index)=>{
                                prev.push({label:cur,value:valueArr[index]});
                                return prev;
                            },[])
                }
            }
            else return wiget;
        })
    }
  },

  methods:{

    onYes(){
        this.editModalVisible = false;
    },
    onCancel(){
        this.editModalVisible = false;
    },
    testModal(){
        this.editModalVisible = true;
        console.log("----------editModalVisible ",this.editModalVisible);

    },
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

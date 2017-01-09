<template>
    <div class="my-tool-container">
        <div class="tool-bar">
            <div>
                <span class="tag" @click="exportCode"><el-tag >导出</el-tag></span>
                <span class="tag" @click="testModal"><el-tag >测试modal</el-tag></span>
            </div>

            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="textarea"
              class="code-area">
            </el-input>
        </div>
        <div class="tool-main">
            <draggable :list="wigetList" >
                <div ref="wigets" v-for="(wiget,index) in wigetList" class="row">
                    <div class="form-item" v-if="wiget.type==='input' ">
                        <span class="form-left">{{wiget.name}}</span>
                        <el-input
                          :placeholder="wiget.placeholder"
                          v-model=wiget.modelValue>
                        </el-input>
                    </div>

                    <div class="form-item" v-if="wiget.type==='select' ">
                        <span class="form-left">{{wiget.name}}</span>
                         <el-select size="small" v-model=wiget.modelValue>
                            <el-option
                              v-for="item in wiget.options"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                    </div>

                    <div class="form-item" v-if="wiget.type==='slider' ">
                        <span class="form-left">{{wiget.name}}
                            <el-tooltip class="item" effect="dark" :content="wiget.tooltip" placement="top-start">
                                <i class="iconfont">&#xe683;</i>
                            </el-tooltip>
                        :</span>
                        <el-slider class="form-right" v-model=wiget.modelValue show-input
                            :min="wiget.min"
                            :max="wiget.max"
                        ></el-slider>
                    </div>
                    <div class="form-item" v-if="wiget.type==='datepicker' ">
                        <span class="form-left">{{wiget.name}}</span>
                        <el-date-picker class="form-right"
                          v-model=wiget.modelValue
                          type="datetime"
                          placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                    <div class="form-item" v-if="wiget.type==='radio' ">
                        <span class="form-left">{{wiget.name}}</span>
                        <el-radio-group size="small" v-model=wiget.modelValue>
                          <el-radio-button :label="1" >是</el-radio-button>
                          <el-radio-button :label="0" >否</el-radio-button>
                          <el-radio-button :label="-1" >未知</el-radio-button>
                        </el-radio-group>
                    </div>

                    <div class="actions-group">
                        <span @click="editWiget(index)"><i class="iconfont icon-bianji"></i></span>
                        <span @click="deleteWiget(index)"><i class="iconfont icon-shanchu"></i></span>
                    </div>
                </div>
            </draggable>
            <div>
                <span><i class="iconfont icon-tianjia" @click="showAndAdd"></i></span>
            </div>
        </div>



        <el-dialog title="定制栏" v-model="dialogFormVisible">
            <el-form :model="tool">
                <el-form-item label="控件名称" label-width="120px">
                  <el-input v-model="tool.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="服务端field" label-width="120px">
                  <el-input v-model="tool.field" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="控件类型" label-width="120px">
                  <el-select v-model="tool.type" placeholder="请选择控件类型" @change='toggleWiget'>
                    <el-option label="输入框" value="input"></el-option>
                    <el-option label="下拉菜单" value="select"></el-option>
                    <el-option label="拖动栏" value="slider"></el-option>
                    <el-option label="日期选择器" value="datepicker"></el-option>
                    <el-option lable="单选按钮" value="radio"></el-option>
                  </el-select>
                </el-form-item>
                <div class="setting">
                    <div class="tag"><el-tag >设置</el-tag></div>
                    <el-form-item label="提示" label-width="120px" v-if=" tool.type==='input' ">
                        <div class="form-item" >
                            <el-input
                              v-model="tool.input.placeholder">
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="备选项" label-width="120px" v-if=" tool.type==='select' ">
                        <div class="form-item" >
                            <el-radio-group size="small" v-model=tool.select.multiple>
                              <el-radio-button :label="1" >多选</el-radio-button>
                              <el-radio-button :label="0" >单选</el-radio-button>
                            </el-radio-group>
                        </div>
                        <div class="form-item" >
                            <el-input
                            placeholder="各选项显示值(中文)，逗号分隔"
                          v-model="tool.select.options.labels">
                            </el-input>
                        </div>
                        <div class="form-item" >
                            <el-input
                            placeholder="各选项真实值(英文)，逗号分隔"
                          v-model="tool.select.options.values">
                        </el-input>
                        </div>
                    </el-form-item>
                    <div>
                        <el-form-item label="评分说明文字" label-width="120px" v-if=" tool.type==='slider' ">
                            <div class="form-item" >
                                <el-input v-model="tool.slider.tooltip"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="范围" label-width="120px" v-if=" tool.type==='slider' ">
                            <div class="form-item" >
                                <el-input
                                  v-model="tool.slider.min">
                                </el-input>
                                ——
                                <el-input
                                  v-model="tool.slider.max">
                                </el-input>
                            </div>
                        </el-form-item>

                    </div>
                    <!-- <component :is='currentView'></component> -->
                <!-- </el-form-item> -->
                </div>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" v-if="isEditing" @click="updateWiget">更新</el-button>
                <el-button type="primary" v-else @click="addWiget">添加</el-button>
            </div>
        </el-dialog>
        <editModal :wigetList="wigetList" :show = "editModalVisible"
            :onYes="onYes" :onCancel="onCancel"
        ></editModal>

    </div>

</template>

<script>
// import util from '../utils/util'
import { defaultWigets } from '../../const/constants'
import draggable from 'vuedraggable'
import editModal from '../components/editModal/editModal'

const tool = {
            // labelWidth: '120px',
            type:'',
            name:'',
            field:'',
            input:{
                placeholder:''
            },
            select:{
                options:{},
                multiple: false,
            },
            slider:{
                tooltip:'',
                min: 0,
                max: 100
            }
        };

const options = ['option1','option2','option3']
const typeList = ['input','select','slider','datepicker'];
// const tplInput = {
//     template:  `<div class="form-item">
//                     <span class="form-left"> 提示:</span>
//                     <el-input
//                       v-model="tool.input.placeholder">
//                     </el-input>
//                 </div>`,
// }
// const choiceDict = {input:tplInput}









export default {

  components: {
    draggable,
    editModal
  },
  props:['serverInfo'],
  data(){
    return {
        textarea:'',
        isEditing: false,
        dialogFormVisible:false,
        wigets: [...defaultWigets],
        tool:{...tool},
        currentView: null,

        index: 0,
        editModalVisible:false
    }
  },

  computed:{
    wigetList(){
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
    toggleWiget(choice){
        console.log(choice)
        // this.currentView = choiceDict[choice];
    },
    addWiget(){
        const type = this.tool.type;

        const added = {
            modelValue: type+(this.wigets.length),
            name: this.tool.name,
            type: this.tool.type,
            field: this.tool.field,
            ...this.tool[type]
        }

        this.wigets.push(added);
        this.tool = {...tool};
        this.toggleDialog(false);

    },
    deleteWiget(index){
        this.wigets.splice(index,1);
    },
    //更新按钮
    updateWiget(){
        // const {modelValue,...others} = {...this.tool};
        // const cur = {
        //     type,
        //     name,
        //     field,
        //     ...others[type]
        // }
        // debugger
        if(JSON.stringify(this.wigets[this.index])!==JSON.stringify(this.tool))
            this.wigets.splice(this.index,1,Object.assign({},this.wigets[this.index],this.tool));
        this.toggleDialog(false);

    },
    toggleDialog(state){
        this.dialogFormVisible = state;
    },
    editWiget(index){
        this.isEditing = true;
        const {type,modelValue,name,...setting} = this.wigets[index];
        this.tool.type = type;
        this.tool.name = name;
        this.tool[type] = setting
        this.toggleDialog(true);

        this.index = index;
    },
    showAndAdd(){
        this.tool = {...tool};
        this.isEditing = false;
        this.toggleDialog(true);

    },
    exportCode(){
        console.log("--------")
        this.textarea = JSON.stringify(this.wigets);
        console.log(this.textarea)
        // this.$refs.wigets
    },

    testModal(){
        this.editModalVisible = true;
        console.log("----------editModalVisible ",this.editModalVisible);

    },
    onYes(){
        this.editModalVisible = false;
    },
    onCancel(){
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

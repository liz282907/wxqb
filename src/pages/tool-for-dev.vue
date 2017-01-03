<template>
    <div class="my-tool-container">
        <div class="toolbar">

        </div>
        <div class="tool-main">
            <div ref="wigets" v-for="(wiget,index) in wigets">
                <div class="form-item" v-if="wiget.type==='input' ">
                    <span class="form-left">{{wiget.name}}</span>
                    <el-input
                      :placeholder="wiget.placeholder"
                      v-model="wiget.modelName">
                    </el-input>
                </div>

                <div class="form-item" v-if="wiget.type==='select' ">
                    <span class="form-left">{{wiget.name}}</span>
                     <el-select size="small" v-model="wiget.modelName">
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
                    <el-slider class="form-right" v-model="wiget.modelName" show-input
                        :min="wiget.min"
                        :max="wiget.max"
                    ></el-slider>
                </div>
                <div class="form-item" v-if="wiget.type==='datepicker' ">
                    <span class="form-left">{{wiget.name}}</span>
                    <el-date-picker class="form-right"
                      v-model="wiget.modelName"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                </div>
            </div>
            <div>
                <span><i class="iconfont icon-tianjia" @click="dialogFormVisible = true"></i></span>
            </div>
        </div>


        <el-dialog title="定制栏" v-model="dialogFormVisible">
            <el-form :model="tool">
                <el-form-item label="控件名称" :label-width="tool.labelWidth">
                  <el-input v-model="tool.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="控件类型" :label-width="tool.labelWidth">
                  <el-select v-model="tool.type" placeholder="请选择控件类型" @change='toggleWiget'>
                    <el-option label="输入框" value="input"></el-option>
                    <el-option label="下拉菜单" value="select"></el-option>
                    <el-option label="拖动栏" value="slider"></el-option>
                    <el-option label="日期选择器" value="datepicker"></el-option>
                  </el-select>
                </el-form-item>
                <div class="setting">
                    <div class="tag"><el-tag >设置</el-tag></div>
                    <el-form-item label="提示" :label-width="tool.labelWidth" v-if=" tool.type==='input' ">
                        <div class="form-item" >
                            <el-input
                              v-model="tool.input.placeholder">
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="备选项" :label-width="tool.labelWidth" v-if=" tool.type==='select' ">
                        <div class="form-item" >
                            <el-input
                            placeholder="各选项显示值(中文)，逗号分隔"
                          v-model="tool.select.options.keys">
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
                        <el-form-item label="评分说明文字" :label-width="tool.labelWidth" v-if=" tool.type==='slider' ">
                            <div class="form-item" >
                                <el-input v-model="tool.slider.tooltip"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="范围" :label-width="tool.labelWidth" v-if=" tool.type==='slider' ">
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
                <el-button type="primary" @click="addElement">添加</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
// import util from '../utils/util'
import { defaultWigets } from '../../const/constants'

const tool = {
            labelWidth: '120px',
            type:'',
            name:'',
            input:{
                placeholder:''
            },
            select:{
                options:{}
            },
            slider:{
                tooltip:'',
                min: 0,
                max: 100
            }
        };

const options = ['option1','option2','option3']
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

  },
  props:['serverInfo'],
  data(){
    return {
        dialogFormVisible:false,
        wigets: [...defaultWigets],
        tool:{...tool},
        currentView: null,
    }
  },
  methods:{
    toggleWiget(choice){
        console.log(choice)
        // this.currentView = choiceDict[choice];
    },
    addElement(){
        const type = this.tool.type;
        let added;

        const commonParts = {
            modelName: type+(this.wigets.length),
            name: this.tool.name,
            type: this.tool.type,
        }
        if(type==='select'){
            const options = this.tool[type].options;
            const valueArr = options.values.split(',')
            added = {
                ...commonParts,
                options: options.keys.split(',').reduce((prev,cur,index)=>{
                            prev.push({label:cur,value:valueArr[index]});
                            return prev;
                        },[])
            }
        }
        else added = {...commonParts,...this.tool[type]};

        this.wigets.push(added);
        this.tool = {...tool};
        this.dialogFormVisible = false;

    }
  }
};
</script>

<style lang='scss'>

.my-tool-container{
    width: 100%;
    height: 100%;
    margin: 0;
    .tool-main{
        overflow: auto;
        background-color: white;
        padding: 50px;
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

/*.tool-main{
    width: 100%;
    height: 100%;
    background-color: white;
}*/
</style>

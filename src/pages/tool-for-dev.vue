<template>
    <div class="my-tool-container">
        <div class="toolbar">

        </div>
        <div class="tool-main">
            <div ref="wigets">
                <div class="form-item">
                    <span class="form-left">输入框 :</span>
                    <el-input
                      placeholder="请输入"
                      v-model="input1">
                    </el-input>
                </div>
                <div class="form-item">
                    <span class="form-left">datepicker :</span>
                    <el-date-picker
                      v-model="datepicker1"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="form-item">
                    <span class="form-left">slider
                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                            <i class="iconfont">&#xe683;</i>
                        </el-tooltip>
                    :</span>
                    <el-slider class="form-right" v-model="slider1" show-input></el-slider>
                </div>
                <div class="form-item">
                    <span class="form-left">下拉框 : </span>
                     <el-select size="small" v-model="select1" multiple>
                        <el-option
                          v-for="item in options"
                          :label="item"
                          :value="item">
                        </el-option>
                      </el-select>
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
                            placeholder="逗号分隔"
                          v-model="tool.select.options">
                        </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="范围" :label-width="tool.labelWidth" v-if=" tool.type==='slider' ">
                        <div class="form-item" >
                            <el-input v-model="tool.slider.tooltip"></el-input>
                            <el-input
                              v-model="tool.slider.min">
                            </el-input>
                            ——
                            <el-input
                              v-model="tool.slider.max">
                            </el-input>
                        </div>
                    </el-form-item>
                    <!-- <component :is='currentView'></component> -->
                </el-form-item>
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
import util from '../utils/util'

const options = ['option1','option2','option3']
const tplInput = {
    template:  `<div class="form-item">
                    <span class="form-left"> 提示:</span>
                    <el-input
                      v-model="tool.input.placeholder">
                    </el-input>
                </div>`,
}
const choiceDict = {input:tplInput}








export default {

  components: {

  },
  props:['serverInfo'],
  data(){
    return {
        dialogFormVisible:false,
        tool:{
            labelWidth: '120px',
            type:'',
            name:'',
            input:{
                placeholder:''
            },
            select:{
                options:''
            },
            slider:{
                tooltip:'',
                min: 0,
                max: 100
            }
        },
        count: 3,
        currentView: null,

        input1:'',
        options,
        select1:'',
        datepicker1:'',
        slider1:0
    }
  },
  methods:{
    toggleWiget(choice){
        console.log(choice)
        this.currentView = choiceDict[choice];
    },
    addElement(){
        this.count++;
        const type = this.tool.type;
        // debugger
        const wiget = util.generateTemplate(type,{...this.tool[type]},this.count);
        this.$refs.wigets.appendChild(wiget);
        // debugger;

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

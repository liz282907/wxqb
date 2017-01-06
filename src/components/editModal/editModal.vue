<template>
    <el-dialog title="编辑" v-model="showModal" @close="closeOnBtn" :close-on-click-modal='false'>
      <draggable :list="wigets" >
        <div ref="wigets" v-for="(wiget,index) in wigets" class="row">
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

<!--             <div class="actions-group">
                <span @click="editWiget(index)"><i class="iconfont icon-bianji"></i></span>
                <span @click="deleteWiget(index)"><i class="iconfont icon-shanchu"></i></span>
            </div> -->
        </div>
      </draggable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancelClick">取 消</el-button>
        <el-button type="primary" @click="onYesClick">更新</el-button>
      </div>
    </el-dialog>


</template>

<script>
import draggable from 'vuedraggable'
import { serverUrl }from '../../../const/url'
import util from '../../utils/util'



export default {

  props: {
    wigetList:{
      type: Array,
      required:true,
      default:[]
    },
    category:{
      type: String,
      default:''
    },
    onCancel:{
      type:Function
    },
    onUpdate:{
      type: Function
    },
    show:{
      type: Boolean,
      default: false
    },
    // closeOnBtn:{
    //   type: Function
    // }


  },
  components:{
    draggable
  },
  watch:{
    value(val){
      console.log("-------",val);
      this.showModal = val;
    },
    show(val){
      this.showModal = val;
    },
    wigetList(val){
      this.wigets = val;
    }
  },
  data() {
    return {
      showModal: this.show,
      wigets: this.wigetList,
    };
  },

  computed:{
    postBody(){
      return this.wigets.reduce((prev,wiget)=>{
        if(wiget.field.match(/Time/)){
            prev[wiget.field] = util.formatTimeStr(wiget.modelValue);
          }
        else prev[wiget.field] = wiget.modelValue;
        return prev;
      },{})
    }
  },

  created(){

  },

  methods:{
    onCancelClick(){
      this.showModal = false;
      if(this.onCancel) this.onCancel()
    },
    onYesClick(){
      this.updateInfo();
      this.showModal = false;
      if(this.onUpdate) this.onUpdate();
    },
    beforeSubmit(data){

      Object.keys(data).forEach(key=>{
        const value = data[key];
        if(!util.isValidInput(value))
          delete data[key];
        else{
          //transform时间
          if(key.match(/Time/)){
            data[key] = util.formatTimeStr(data[key]);
          }
        }

      });
      return data;
    },
    updateInfo(){

        axios.post(serverUrl.createInfo,{
            [this.category]:this.postBody
        })
        .then(response=> {
            this.reset(target);
            this.$message({message: `更新${this.category}成功`,type:'success'});
        })
        .catch(err=>{
            console.log(err);
            this.$message({message: `更新${this.category}失败`,type:'error'});
        });
    },
    closeOnBtn(){
      this.showModal = false;
      this.$emit('close');
    }




  }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang= "scss">
@import './editModal.scss';



</style>

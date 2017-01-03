<template>
    <el-dialog title="编辑" v-model="showModal">
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
<!--             <div class="actions-group">
                <span @click="editWiget(index)"><i class="iconfont icon-bianji"></i></span>
                <span @click="deleteWiget(index)"><i class="iconfont icon-shanchu"></i></span>
            </div> -->
        </div>
      </draggable>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancelClick">取 消</el-button>
        <el-button type="primary" @click="onYesClick">确 定</el-button>
      </div>
    </el-dialog>


</template>

<script>
import draggable from 'vuedraggable'


export default {

  props: {
    wigetList:{
      type: Array,
      required:true,
      default:[]
    },
    onCancel:{
      type:Function
    },
    onYes:{
      type: Function
    },
    show:{
      type: Boolean,
      default: false
    }

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
    }
    // showModal(val){
    //   this.$emit('input',val);
    //   if(val) this.$emit('open');
    //   else this.$emit('close');
    // }
  },
  data() {
    return {
      showModal: this.show,
      wigets: this.wigetList
    };
  },

  computed:{

  },

  created(){

  },

  methods:{
    onCancelClick(){
      this.showModal = false;
      if(this.onCancel) this.onCancel()
    },
    onYesClick(){
      this.showModal = false;
      console.log(this.wigets)
      if(this.onYes) this.onYes();
    },
    fetchServerData(){
      //
    }



  }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang= "scss">
@import './editModal.scss';



</style>

<template>
  <div :class="['upload-wrapper',{'ondrag':ondrag}]" @drop="handleFileDrop" @dragenter="handleFileDragEnter" @dragover="handleFileDragOver">
    <input type="file" style="display:none" id="fileInput" ref="fileInput" multiple @change="handleChange">
    <div  @click="clickToChooseFile" for="fileInput">
      <p class="upload-icon"><i class="icon iconfont">&#xe6d5;</i></p>
      <p class="upload-text">Click or drag file to this area to upload</p>
      <p class="upload-hint">支持单文件/多文件上传，请选择image类型</p>
    </div>

    <ul :class="fileNameListClass">
      <li v-for="(fileObj,index) in fileObjList" :key="fileObj.file.name" :class="uploadItemClass" v-if="listType==='text'">
        <div class="text-item  clearfix" >
            <i class="iconfont fujian">&#xe69c;</i>
            <span>{{fileObj.file.name}}</span>
            <i class="iconfont delete" @click="removeFile(fileObj.file)">&#xe618;</i>
        </div>

        <transition name="progress">
            <div :class="['progress-line', `progress-${fileObj.status}`]"
                  :style="{width: fileObj.percent}"
                  v-if="fileObj.percent!=='100%' && fileObj.percent !=='0%'"></div>
        </transition>
      </li>
      <li  v-if="listType==='card'" v-for="(fileObj,index) in fileObjList" :key="fileObj.file.name"   :class="uploadItemClass">
          <div class="preview-item">
            <img ref="previewImg"  :alt="fileObj.file.name"/>
            <span >
                <i class="iconfont detail">&#xe785;</i>
                <i class="iconfont delete" @click="removeFile(fileObj.file)">&#xe618;</i>
            </span>
            <div class="card-loading" v-if="fileObj.percent!=='100%' && fileObj.percent !=='0%'">
              <span>文件上传中</span>
              <transition name="progress">
                  <div :class="['progress-line', `progress-${fileObj.status}`]"
                        :style="{width: fileObj.percent}" ></div>
              </transition>
            </div>


          </div>

      </li>
    </ul>
    <!--
    <transition name="progress">
        <div :class="['progress-line', `progress-${totalUpload.status}`]"
              :style="{width: totalUpload.percent}"
              v-if="totalUpload.percent!=='100%'"></div>
    </transition>
    -->
  </div>
</template>

<script>
import uploadUtil from './util.js';
import uploadAjax from './ajax.js';
let loadedFileList = [];


export default {

  props: {
    action:{
      type : String,
      required: true
    },
    multiple: {
      type : Boolean,
      default: true
    },
    showUploadList: {
      type: Boolean,
      default: true
    },
    listType:{
      type: String,
      default: 'card'
    },
    accept:{
      type: String
    },
    beforeUpload:{
      type: Function
    },
    data:{
      type: Object
    }
  },
  data() {
    return {
      // files:[],
      fileObjList: [],
      loadedFileList: [],
      fileDataUrl: [],
      ondrag: false,
      // totalUpload: {
      //   percent: 0,
      //   status: 'normal'
      // }
      // fileStatus:[]     //normal, success

    };
  },

  computed:{
    fileNameList(){
      return this.fileObjList && this.fileObjList.map(obj=> obj.file.name);
    },
    fileNameListClass(){
      return [
        'upload-list',
        'clearfix',
        {'isShown': this.showUploadList && this.fileObjList.length>0}
      ]

    },
    uploadItemClass(){
      return{
        'isText': this.listType==='text',
        'isCard': this.listType==='card'
      }
    }
  },

  created(){
    // fileReader.onprogress(e=>{
    //   debugger;
    //   console.log(e.target.result);
    // })
  },

  methods:{
    clickToChooseFile(){
      this.$refs.fileInput.click();
    },

    handleChange(e){
      const files = e.target.files;
      if(!files || files.length<=0) return;

      this.handleFiles(files);
    },

    handleFilePreview(file){
      const index = uploadUtil.getFileIndex(file,this.fileObjList);
      const src = URL.createObjectURL(file);
      const img = this.$refs.previewImg[index];
      img.src = src;
      img.onload = e=> URL.revokeObjectURL(src);
    },

    handleFileDragEnter(e){
      e.preventDefault();
    },
    handleFileDragOver(e){
      // debugger;
      this.ondrag = true;
      e.preventDefault();
    },
    handleFileDrop(e){
      e.preventDefault();
      this.ondrag = false;
      const fileList = e.dataTransfer.files;
      this.handleFiles(fileList);
    },



    //到内存的进度条
    showProgressOfLoadFile(nextFileObjList){
        nextFileObjList.forEach(fileObj=>{
        const fileReader = new FileReader();
        fileReader.onprogress = updateProgress(fileObj);
        fileReader.onloadend = loadFileEnd(fileObj);
        fileReader.readAsDataURL(fileObj.file);

        function updateProgress(fileObj){
          return e=> fileObj.percent = (e.loaded/e.total)*100+'%';
        }
        function loadFileEnd(fileObj){
          return e=> {
            fileObj.percent = '100%';
            fileObj.status = 'success';
            loadedFileList.push(fileObj.file);

            const contents = e.target.result;
          }
        }
      });
    },

    fileterFilesByType(filelist){
      if(this.accept)
        return filelist.filter(file=> this.accept.split(",").indexOf(file.type)!==-1);
      else return fileList;
    },

    handleFiles(files){

      let nextFiles = Array.prototype.slice.call(files);
      if(!this.multiple) nextFiles = nextFiles.slice(0,1);

      /*新载入的文件*/
      const nextFileObjList = this.fileterFilesByType(nextFiles).map(file=>{
        return {file,status:'normal',percent:0};
      });


      if(!this.multiple)
        this.fileObjList = nextFileObjList;
      else
        this.fileObjList = [...this.fileObjList,...nextFileObjList];


      //this.showProgressOfLoadFile(nextFileObjList);

      this.postFiles(nextFileObjList);


    },

    postFiles(nextFileObjList){
      const that = this;
      let promises = nextFileObjList.map(fileObj=>{
          const curPromise = this.uploadFile(fileObj.file);
          // promises.push(curPromise);
          curPromise.then(responseBody=>{
            this.loadedFileList.push(fileObj.file);
            that.$emit("onSuccess",fileObj.file,responseBody);

          },err=>{

            that.$emit("onError",fileObj.file,err);

          });
          return curPromise;

      });
      Promise.all(promises).then(responseArr=>{
        this.$emit("onAllSuccess",nextFileObjList.map(obj=>obj.file));
      }).catch(err=>{
        //断点重传，接口待定义
        this.$emit("onSomeError",nextFileObjList.map(obj=>obj.file),err);
      });


    },

    //返回promise对象。如果beforeload中返回promise对象了，在resolve中继续返回post请求新创建的promise对象。
    uploadFile(file){

      if(!this.beforeUpload){
        return this.postFile(file);
      }
      const before = this.beforeUpload(file);
      //返回promise对象
      if(before && before.then){
        return before.then(processedFile=>{
          if(uploadUtil.isFile(processedFile))
              return this.postFile(processedFile);

        })
      }else if(before !== false){
        //只要非false，就上传
        if(uploadUtil.isFile(processedFile))
          return this.postFile(processedFile);
      }
      //返回false,不上传



    },

    postFile(file){
        return uploadAjax(this.action,{
                  data: this.data,
                  filename: file.name,
                  file: file,
                  onProgress: this.onFileUploadProgress(file),
                  onRemove: this.removeFile,
                  onPause: this.handleFilePause,
                  onResume: this.handleFileResume
                });
    },

    onFileUploadProgress(file){
      //percent loading
      const that = this;
      return function(e){
        // e.percent
        const index = uploadUtil.getFileIndex(file,that.fileObjList);
        that.fileObjList[index].percent = e.percent+"%";
        that.$emit("onProgress",file);

        if(e.percent===100 && that.listType==='card') that.handleFilePreview(file);



      //上传成功变色
      }

    },

    removeFile(file){
      const index = uploadUtil.getFileIndex(file,this.fileObjList);
      if(index!==-1){
        this.fileObjList.splice(index,1);
        //预留接口
        this.$emit('onRemove',file);
      }


    }
  }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang= "scss">
@import './upload.scss';



</style>

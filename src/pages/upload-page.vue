<template>
    <div class="inner-container">
        <div class="upload-demo">
            <upload @onRemove="handleFileRemove" action="/myupload"
                :before-upload = "beforeUpload"
                accept="image/jpeg,image/png,image/gif"
                :data="formData"
                list-type="text"
                @onSuccess= "handleFileSuccess"
                @onError= "handleFileError"
                @onAllSuccess= "handleFilesSuccess"
                @onSomeError= "handleFilesError"
                @onProgress= "onFileUploadProgress" :multiple = "true">
            </upload>
            <div class="btn-group" ref="buttons">
                <button :class="['btn',{ disabled: isDisabled }]" @click="uploadFile('file')">上传文件</button>
                <button :class="['btn',{ disabled: isDisabled }]" @click="uploadFile('db')">导入数据库</button>
            </div>
        </div>
    </div>


</template>

<script>
import Upload from '../components/upload/upload';

export default {
  data(){
    return {
        formData:{
            btnType:""
        },
        fileListNum:0
    }
  },
  computed:{
    isDisabled(){
        return this.fileListNum<=0;
    }
  },
  components: {
    "upload": Upload
  },
  methods:{
    beforeUpload(file){
        const that = this;
        this.fileListNum++;
        return new Promise((resolve,reject)=>{
            that.$once("upload",resolve.bind(this,file));
        });
    },
    uploadFile(btnType){
        this.formData.btnType = btnType;
        this.$emit("upload");
    },

    handleFileRemove(file){
        this.fileListNum--;
    },
    handleFileSuccess(file,responseBody){
        console.log("fileupload success");
    },
    handleFileError(file,err){
        console.log("文件上传失败",file.name,err,err.msg);
    },
    handleFilesSuccess(fileList){
        console.log("全部文件上传成功 success");
    },
    handleFilesError(fileList,err){
        console.log("部分文件上传失败 error",err);
    },
    onFileUploadProgress(file){
    }
  }
};
</script>


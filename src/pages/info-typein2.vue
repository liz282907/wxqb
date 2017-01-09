<template>
            <div id="event" class="section-item">
                <h3 class="title">安全事件 :
                    <el-input
                      placeholder="请输入事件名称"
                      v-model="event.event">
                    </el-input>
                </h3>
                <el-form ref="eventForm" :model="event"
                    <div class="card-wrapper">
                        <div class="card">
                            <span class="sub-title">基本信息</span>
                            <div class="form-part">

                                <div class="form-item">
                                    <span class="form-left">攻击时间 :</span>
                                    <el-date-picker class="form-right"
                                      v-model="event.AttackTime"
                                      type="daterange"
                                      placeholder="选择日期范围"
                                      style="width: 220px">
                                    </el-date-picker>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">摘要 :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入digest"
                                      v-model="event.Digest">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">代号 :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入代号"
                                      v-model="event.IncidentCode">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">发布机构 :</span>
                                    <el-input class="form-right"
                                      placeholder="名称"
                                      v-model="event.AuthorityName">
                                    </el-input>
                                    <el-input class="form-right"
                                      placeholder="发布机构代号"
                                      v-model="event.AuthorityCode">
                                    </el-input>

                                </div>
                                <div class="form-item">
                                    <span class="form-left">来源 :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入来源"
                                      v-model="event.Source">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">可靠性
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="event.SourceReliability" show-input></el-slider>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <span class="sub-title">详细信息</span>
                            <div class="form-part">
                                <div class="form-item">
                                    <span class="form-left">黑客组织 : </span>
                                     <el-input class="form-right" placeholder="关联黑客组织名称" size="small">
                                        v-model="event.HackingOrg"
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">攻击ip : </span>
                                     <el-input class="form-right" placeholder="攻击ip,回车分隔" size="small" v-model="event.SourceIP">

                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">攻击dns : </span>
                                     <el-input class="form-right"
                                     v-model="event.DNS" placeholder="攻击ip,回车分隔" size="small">

                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">MD5 : </span>
                                     <el-input class="form-right"
                                     v-model="event.MD5" placeholder="MD5" size="small">

                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">动机 : </span>
                                     <el-input class="form-right"
                                     v-model="event.Intention" placeholder="多个请逗号分隔" size="small">

                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">攻击特征 : </span>
                                     <el-input class="form-right"
                                     v-model="event.AttackSignature" placeholder="多个请逗号分隔" size="small">

                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">攻击手法 : </span>
                                     <el-input class="form-right"
                                     v-model="event.AttackMethod" placeholder="多个请逗号分隔" size="small">

                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">关联恶意URL : </span>
                                     <el-input class="form-right"
                                     v-model="event.URL" placeholder="URL,多个请逗号分隔" size="small">

                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">关联钓鱼邮件 : </span>
                                     <el-input class="form-right"
                                     v-model="event.PhishingEmail" placeholder="多个请逗号分隔" size="small">

                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">被攻击ip : </span>
                                     <el-input class="form-right"
                                     v-model="event.TargetIP" placeholder="多个请逗号分隔" size="small">

                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">被攻击公司 : </span>
                                     <el-input  class="form-right"
                                     v-model="event.CompanyName" placeholder="多个请逗号分隔" size="small">

                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">公司资产 : </span>
                                     <el-input class="form-right"
                                     v-model="event.CompanyAsset"
                                      placeholder="多个请逗号分隔" size="small">

                                    </el-input>
                                </div>

                                <div class="form-item">
                                    <span class="form-left">关联漏洞库 : </span>
                                    <el-input  class="form-right"
                                    v-model="event.Hole" placeholder="请输入漏洞库" size="small">

                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left"> :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入来源"
                                      size="small"
                                      v-model="event.dev_source">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">资产脆弱性
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="event.Vulnerability" show-input></el-slider>
                                </div>

                            </div>
                        </div>
                        <div class="card">
                            <span class="sub-title">影响</span>
                            <div class="form-part">

                                <div class="form-item">
                                    <span class="form-left">影响资产 :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入"
                                      size="small"
                                      v-model="event.Asset">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">影响评估
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="event.Evaluate" show-input></el-slider>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <span class="sub-title">其他信息</span>
                            <div class="form-part">
                                <span class="form-left">备注 :</span>
                                <el-input class="form-right"
                                      type="textarea"
                                      :autosize="{ minRows: 4}"
                                      placeholder="请输入内容"
                                      v-model="event.Note">
                                    </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="button-group">
                        <el-button size="small" type="primary"  @click.native="onSaveTargetForm('event')" native-type="submit">保存</el-button>
                        <el-button size="small" @click.native.prevent>取消</el-button>
                    </div>
                </el-form>
            </div>



</template>

<script>
import { sections,methods } from '../../const/constants';
import { serverUrl }from '../../const/url'

import util from '../utils/util'


const event = {
          event:'',
          AttactName:'',
          AttackTime: [],
          // DangerClass: '',
          AuthorityCode:'',
          AuthorityName: '',
          // Attachments
          Source:'',
          SourceReliability:0,
          Digest:'',
          IncidentCode:0,
          HackingOrg:'',
          Intention:'',
          AttackMethods:'',
          SourceIP:'',
          DNS:'',
          MD5:'',
          PhishingEmail:'',
          URL:'',
          AttackSignature:'',
          TargetIP:'',
          Hole:'',
          Vulnerability: 0,
          CompanyName:'',
          CompanyAsset:'',
          Asset:'',
          Evaluate:0,
          Note:'',

}

const initObj = {
  event,
}

export default {
  props:{
    callback: {
      type: Function
    }
  },
  data(){
    return {
        locals:{
            sections,
        },
        event:{...initObj.event},

        fullscreenLoading: false,

    }
  },
  computed:{

  },

  mounted(){
    // this.fullscreenLoading = true;
  },
  components: {

  },
  methods:{

    onSaveTargetForm(target){
        let {[target]:targetValue,...postBody} = this[target];

        Object.keys(postBody).forEach(key=>{
          if(key.match(/Time/)){
            const val = postBody[key];
            if(typeof val === 'string')
              postBody[key] = util.formatTimeStr(postBody[key]);
            else if(Array.isArray(val)){
              postBody[key] = val.map(str=>util.formatTimeStr(str))
            }
          }
        });

        axios.post(serverUrl.createInfo,{
          [target]:{
            [targetValue]:postBody
          }
        })
        .then(response=> {
            this.$message({message: `提交${target}成功`,type:'success'});
            this[target] = initObj[target];
        })
        .catch(err=>{
            console.log(err);

            this.$message({message: `创建${target}失败`,type:'error'});
        });

        if(this.callback)
          this.callback();
    },
  }
};
</script>


<template>
    <div class="my-info-container"  v-loading.fullscreen.lock ="fullscreenLoading">
        <aside class="info-nav">
            <ul >
                <li v-for="section in locals.sections" class="info-out-navitem" >
                    <a :href="'#'+section.id">{{section.name}}</a>
                    <ul >
                        <li v-for="item in section.children" class="info-inner-navitem">
                            <!-- <router-link :to=" '/app/management/info-typein#'+item.id " @click.native.prevent="scrollTo(item.id)">{{item.name}}</router-link> -->
                            <a :href="'/app/management/info-typein#'+item.id"
                                @click.prevent="scrollTo(item.id)"
                            >{{item.name}}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
        <div class="info-main">
            <div id="ip" class="section-item">
                <h3 class="title">IP :
                    <el-input
                      placeholder="请输入ip"
                      v-model="ip.ip">
                    </el-input>
                </h3>
                <el-form ref="ipForm" :model="ip"
                    <div class="card-wrapper">
                        <div class="card">
                            <span class="sub-title">信誉</span>
                            <div class="form-part">
                                <div class="form-item">
                                    <span class="form-left">信誉度
                                        <el-tooltip class="item" effect="dark" content="0-30：低；31-75：中；76-100：高" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="ip.Credibility" show-input></el-slider>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">发现时间 :</span>
                                    <el-date-picker
                                      v-model="ip.DiscoveryTime"
                                      type="datetime"
                                      placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">存活 :</span>
                                    <el-radio-group size="small" v-model="ip.Survivability" class="form-right">
                                      <el-radio-button :label="1" >是</el-radio-button>
                                      <el-radio-button :label="0" >否</el-radio-button>
                                      <el-radio-button :label="-1" >未知</el-radio-button>
                                    </el-radio-group>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">来源 :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入来源"
                                      v-model="ip.CREDIT_Source">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">可靠性
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="ip.CREDIT_SourceReliability" show-input></el-slider>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <span class="sub-title">设备</span>
                            <div class="form-part">
                                <div class="form-item">
                                    <span class="form-left">涉及协议 : </span>
                                     <el-select size="small" v-model="ip.Protocol" multiple>
                                        <el-option
                                          v-for="item in serverInfo.protocols"
                                          :label="item"
                                          :value="item">
                                        </el-option>
                                      </el-select>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">操作系统 : </span>
                                     <el-select size="small" v-model="ip.OS" >
                                        <el-option
                                          v-for="item in serverInfo.osList"
                                          :label="item"
                                          :value="item">
                                        </el-option>
                                      </el-select>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">开放端口 : </span>
                                    <el-input class="form-right" placeholder="请输入端口号" size="small" v-model="ip.Port">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">来源 :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入来源"
                                      size="small"
                                      v-model="ip.DEV_Source">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">可靠性
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="ip.DEV_SourceReliability" show-input></el-slider>
                                </div>

                            </div>
                        </div>
                        <div class="card">
                            <span class="sub-title">地理信息</span>
                            <div class="form-part">
                                <div class="form-item">
                                    <span class="form-left">地理位置：</span>
                                    <div class="form-right">
                                        <div>
                                            <div class="two-column">
                                                <span>国家</span>
                                                <el-select size="small" v-model="ip.Address.country" @change="changeCountry">
                                                    <el-option
                                                      v-for="country in countryList"
                                                      :label="country"
                                                      :value="country">
                                                    </el-option>
                                                </el-select>
                                            </div>
                                            <div class="two-column">
                                                <span>城市</span>
                                                <el-select size="small" v-model="ip.Address.district" >
                                                    <el-option
                                                      v-for="district in districtList"
                                                      :label="district.name"
                                                      :value="district.name">
                                                    </el-option>
                                                  </el-select>
                                            </div>
                                            <div class="two-column">
                                                <span>经度</span>
                                                <el-input size="small"
                                                  placeholder="经度"
                                                  v-model="ip.Address.longtitude">
                                                </el-input>
                                            </div>
                                            <div class="two-column">
                                                <span>纬度</span>
                                                <el-input class="" size="small"
                                                  placeholder="纬度"
                                                  v-model="ip.Address.latitude">
                                                </el-input>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div class="form-item">
                                    <span class="form-left">ISP :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入ISP"
                                      size="small"
                                      v-model="ip.ISP">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">VPS :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入VPS"
                                      size="small"
                                      v-model="ip.VPS">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">来源 :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入来源"
                                      size="small"
                                      v-model="ip.GEO_Source">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">可靠性
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="ip.GEO_SourceReliability" show-input></el-slider>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <span class="sub-title">其他信息</span>
                            <div class="form-part">
                                <div class="form-item">
                                    <span class="form-left">备注</span>
                                    <el-input
                                      type="textarea"
                                      :autosize="{ minRows: 4}"
                                      placeholder="请输入内容"
                                      v-model="ip.Note">
                                    </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="button-group">
                        <el-button size="small" type="primary"  @click.native="onSaveTargetForm('ip')" native-type="submit">保存</el-button>
                        <el-button size="small" @click.native.prevent>取消</el-button>
                    </div>
                </el-form>
            </div>
            <div id="dns" class="section-item" >
                <h3 class="title">DNS :
                    <el-input
                      placeholder="请输入DNS"
                      v-model="dns.dns">
                    </el-input>
                </h3>
                <el-form ref="dnsForm" :model="dns"
                    <div class="card-wrapper">
                        <div class="card">
                            <span class="sub-title">whois</span>
                            <div class="form-part">
                                <div class="form-item">
                                    <span class="form-left">注册人 :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入注册人信息"
                                      v-model="dns.Registrant">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">注册邮箱 :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入注册邮箱"
                                      v-model="dns.RegEmail">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">注册时间 :</span>
                                    <el-date-picker class="form-right"
                                      v-model="dns.RegTime"
                                      type="datetime"
                                      placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">ISP :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入服务提供商"
                                      size="small"
                                      v-model="dns.ISP">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">来源 :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入来源"
                                      size="small"
                                      v-model="dns.WHOIS_Source">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">可靠性
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="dns.WHOIS_SourceReliability" show-input></el-slider>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <span class="sub-title">信誉</span>
                            <div class="form-part">
                                <div class="form-item">
                                    <span class="form-left">信誉度
                                        <el-tooltip class="item" effect="dark" content="0-30：低；31-75：中；76-100：高" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="dns.Credibility" show-input></el-slider>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">发现时间 :</span>
                                    <el-date-picker class="form-right"
                                      v-model="dns.DiscoveryTime"
                                      type="datetime"
                                      placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">来源 :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入来源"
                                      v-model="dns.CREDIT_Source">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">可靠性
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="dns.CREDIT_SourceReliability" show-input></el-slider>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <span class="sub-title">其他信息</span>
                            <div class="form-part">
                                <div class="form-item">
                                    <span class="form-left">备注</span>
                                    <el-input
                                      type="textarea"
                                      :autosize="{ minRows: 4}"
                                      placeholder="请输入内容"
                                      v-model="dns.Note">
                                    </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="button-group">
                        <el-button size="small" type="primary"  @click.native="onSaveTargetForm('dns')" native-type="submit">保存</el-button>
                        <el-button size="small" @click.native.prevent>取消</el-button>
                    </div>
                </el-form>
            </div>
            <div id="url" class="section-item" >
                <h3 class="title">URL :
                    <el-input
                      placeholder="请输入url"
                      v-model="url.url">
                    </el-input>
                </h3>
                <el-form ref="urlForm" :model="url"
                    <div class="card-wrapper">
                        <div class="card">
                            <span class="sub-title">基本信息</span>
                            <div class="form-part">
                                <div class="form-item">
                                    <span class="form-left">存活 :</span>
                                    <el-radio-group class="form-right" size="small" v-model="url.Survivability">
                                      <el-radio-button :label="1" >是</el-radio-button>
                                      <el-radio-button :label="0" >否</el-radio-button>
                                      <el-radio-button :label="-1" >未知</el-radio-button>
                                    </el-radio-group>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">初次发现时间 :</span>
                                    <el-date-picker class="form-right"
                                      v-model="url.FirstDiscoveryTime"
                                      type="datetime"
                                      placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">来源 :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入来源"
                                      size="small"
                                      v-model="url.BASIC_Source">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">可靠性
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="url.BASIC_SourceReliability" show-input></el-slider>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <span class="sub-title">webshell</span>
                            <div class="form-part">
                                <div class="form-item">
                                    <span class="form-left">请求方法 :</span>
                                    <el-select class="form-right" size="small" v-model="url.RequestMethod" multiple>
                                        <el-option
                                          v-for="item in locals.methods"
                                          :label="item"
                                          :value="item">
                                        </el-option>
                                      </el-select>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">webshell类型 :</span>
                                    <el-select class="form-right" size="small" v-model="url.WebshellName" multiple>
                                        <el-option
                                          v-for="item in serverInfo.webshellTypes"
                                          :label="item"
                                          :value="item">
                                        </el-option>
                                      </el-select>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">webshell所属页面名称 :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入所属页面名称"
                                      v-model="url.Title">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">来源 :</span>
                                    <el-input class="form-right"
                                      placeholder="请输入来源"
                                      v-model="url.WS_Source">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">可靠性
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="url.WS_SourceReliability" show-input></el-slider>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <span class="sub-title">其他信息</span>
                            <div class="form-part">
                                <div class="form-item">
                                    <span class="form-left">备注</span>
                                    <el-input
                                      type="textarea"
                                      :autosize="{ minRows: 4}"
                                      placeholder="请输入内容"
                                      v-model="url.Note">
                                    </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="button-group">
                        <el-button size="small" type="primary"  @click.native="onSaveTargetForm('url')" native-type="submit">保存</el-button>
                        <el-button size="small" @click.native.prevent>取消</el-button>
                    </div>
                </el-form>
            </div>
            <library :callback="handleEventSave"></library>
        </div>
    </div>



</template>

<script>

import { sections,methods } from '../../const/constants'
import { serverUrl }from '../../const/url'
import util from '../utils/util'
import localServerInfo from '../../static/constants'
import geo from '../../static/constants_loc'
import Library from './info-typein2.vue';


const initObj = {
  ip:{
            ip: '',
            Credibility: -1,
            DiscoveryTime: null,
            Survivability: -1,
            CREDIT_Source: '',
            CREDIT_SourceReliability: -1,

            Protocol:[],
            OS:'',
            Port:'',
            DEV_Source: '',
            DEV_SourceReliability: -1,

            ISP: '',
            VPS: '',
            GEO_Source: '',
            GEO_SourceReliability: -1,
            Address:{
                country:'',
                district: '',
                longtitude: '',
                latitude: ''
            },
            Note:''

        },
        dns:{
            dns:'',
            Credibility: -1,
            DiscoveryTime: '',
            CREDIT_Source: '',
            CREDIT_SourceReliability: -1,

            Registrant: '',
            RegEmail: '',
            RegTime: null,
            ISP: '',
            WHOIS_Source: '',
            WHOIS_SourceReliability: -1,

            Note:''

        },

        url:{
            url: '',
            FirstDiscoveryTime: null,
            ActionTag: [],
            BASIC_Source: '',
            BASIC_SourceReliability: -1,
            Survivability: -1,

            RequestMethod: '',
            Title:'',
            WebshellName: '',
            WebshellFile: '',
            WS_Source: '',
            WS_SourceReliability: -1,
            Note:''
        }
}

// const formData = {...initObj};

export default {

  data(){
    return {
        locals:{
            sections,
            methods,
        },
        serverInfo:{
            ...localServerInfo,
            geo,

            // protocols: localServerInfo.protocols,
            // osList:[],
            // geo: [],
            webshellTypes:[]
        },
        ip: {...initObj.ip},
        url: {...initObj.url},
        dns: {...initObj.dns},

        fullscreenLoading: false,

    }
  },
  computed:{
    transformedGeo(){
        if(this.serverInfo.geo)
            return this.serverInfo.geo.reduce((prev,countryInfo)=>{
                prev[countryInfo.name] = countryInfo.children;
                return prev;
            },{});
    },
    countryList(){
        return Object.keys(this.transformedGeo);
    },
    districtList(){
        const choice = this.ip.Address.country;
        return this.transformedGeo[choice];
    }
  },

  mounted(){
    // this.fullscreenLoading = true;
    // axios.get(serverUrl.serverInfo)
    //     .then(response=> {
    //         // debugger;
    //         this.fullscreenLoading = false;
    //         this.serverInfo = response.data;
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //         this.fullscreenLoading = false;
    //         this.$message({message: "获取服务器数据失败，请刷新",type:'warning'});
    //     })

  },
  components: {
    'library': Library
  },
  methods:{
    scrollTo(hash){

        // debugger;
        // e.preventDefault();
        const el = document.getElementById(hash);
        if(el){
            window.scroll(el.offsetLeft,el.offsetTop-64);
        }

    },
    changeCountry(){
        this.ip.Address.district = '';
    },
    reset(key){
      this[key] = initObj[key];
    },
    beforeSubmit(data){

      // for(let[key,value] of data){
      //   if(!util.isValidInput(value))
      //     delete data[key];
      // }
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

      //transform时间
      // Object.keys(data).forEach(key=>{
      //     if(key.match(/Time/)){
      //       data[key] = util.formatTimeStr(data[key]);
      //     }
      // });
      return data;
    },
    onSaveTargetForm(target){
        let {[target]:targetValue,...postBody} = this[target];


        postBody = this.beforeSubmit(postBody);
        axios.post(serverUrl.createInfo,{
            [target]:{
                    [targetValue]: postBody
                }
        })
        .then(response=> {
            this.reset(target);
            this.$message({message: `提交${target}成功`,type:'success'});
        })
        .catch(err=>{
            console.log(err);
            this.$message({message: `创建${target}失败`,type:'error'});
        });
    },
    onSaveIpForm(target){

        this.onSaveTargetForm(target);
    },
    handleEventSave(){
        console.log("------test event");
    }
  }
};
</script>


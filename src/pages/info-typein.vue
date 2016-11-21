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
                                    <el-slider class="form-right" v-model="ip.credibility" show-input></el-slider>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">发现时间 :</span>
                                    <el-date-picker
                                      v-model="ip.discoveryTime"
                                      type="datetime"
                                      placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">存活 :</span>
                                    <el-radio-group size="small" v-model="ip.survivability">
                                      <el-radio-button label="是"></el-radio-button>
                                      <el-radio-button label="否"></el-radio-button>
                                    </el-radio-group>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">来源 :</span>
                                    <el-input
                                      placeholder="请输入来源"
                                      v-model="ip.credit_source">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">可靠性
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="ip.credit_sourceReliability" show-input></el-slider>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <span class="sub-title">设备</span>
                            <div class="form-part">
                                <div class="form-item">
                                    <span class="form-left">涉及协议 : </span>
                                     <el-select size="small" v-model="ip.protocals" multiple>
                                        <el-option
                                          v-for="item in serverInfo.protocols"
                                          :label="item"
                                          :value="item">
                                        </el-option>
                                      </el-select>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">操作系统 : </span>
                                     <el-select size="small" v-model="ip.os" >
                                        <el-option
                                          v-for="item in serverInfo.osList"
                                          :label="item"
                                          :value="item">
                                        </el-option>
                                      </el-select>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">开放端口 : </span>
                                    <el-input placeholder="请输入端口号" size="small">
                                        v-model="ip.portList"
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">来源 :</span>
                                    <el-input
                                      placeholder="请输入来源"
                                      size="small"
                                      v-model="ip.dev_source">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">可靠性
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="ip.dev_sourceReliability" show-input></el-slider>
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
                                                <el-select size="small" v-model="ip.geo.country" @change="changeCountry">
                                                    <el-option
                                                      v-for="country in countryList"
                                                      :label="country"
                                                      :value="country">
                                                    </el-option>
                                                  </el-select>
                                            </div>
                                            <div class="two-column">
                                                <span>城市</span>
                                                <el-select size="small" v-model="ip.geo.district" >
                                                    <el-option
                                                      v-for="district in districtList"
                                                      :label="district"
                                                      :value="district">
                                                    </el-option>
                                                  </el-select>
                                            </div>
                                            <div class="two-column">
                                                <span>经度</span>
                                                <el-input size="small"
                                                  placeholder="经度"
                                                  v-model="ip.longtitude">
                                                </el-input>
                                            </div>
                                            <div class="two-column">
                                                <span>纬度</span>
                                                <el-input class="" size="small"
                                                  placeholder="纬度"
                                                  v-model="ip.latitude">
                                                </el-input>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div class="form-item">
                                    <span class="form-left">ISP :</span>
                                    <el-input
                                      placeholder="请输入ISP"
                                      size="small"
                                      v-model="ip.isp">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">VPS :</span>
                                    <el-input
                                      placeholder="请输入VPS"
                                      size="small"
                                      v-model="ip.vps">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">来源 :</span>
                                    <el-input
                                      placeholder="请输入来源"
                                      size="small"
                                      v-model="ip.geo_source">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">可靠性
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="ip.geo_sourceReliability" show-input></el-slider>
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
                                      v-model="ip.note">
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
                <el-form ref="ipForm" :model="dns"
                    <div class="card-wrapper">
                        <div class="card">
                            <span class="sub-title">whois</span>
                            <div class="form-part">
                                <div class="form-item">
                                    <span class="form-left">注册人 :</span>
                                    <el-input
                                      placeholder="请输入注册人信息"
                                      v-model="dns.registerant">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">注册邮箱 :</span>
                                    <el-input
                                      placeholder="请输入注册邮箱"
                                      v-model="dns.regEmail">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">注册时间 :</span>
                                    <el-date-picker
                                      v-model="dns.registerTime"
                                      type="datetime"
                                      placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">ISP :</span>
                                    <el-input
                                      placeholder="请输入服务提供商"
                                      size="small"
                                      v-model="dns.vps">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">来源 :</span>
                                    <el-input
                                      placeholder="请输入来源"
                                      size="small"
                                      v-model="dns.source">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">可靠性
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="dns.sourceReliability" show-input></el-slider>
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
                                    <el-slider class="form-right" v-model="dns.credibility" show-input></el-slider>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">发现时间 :</span>
                                    <el-date-picker
                                      v-model="dns.discoveryTime"
                                      type="datetime"
                                      placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">来源 :</span>
                                    <el-input
                                      placeholder="请输入来源"
                                      v-model="dns.whois_source">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">可靠性
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="dns.whois_sourceReliability" show-input></el-slider>
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
                                      v-model="dns.note">
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
                                    <el-radio-group size="small" v-model="url.survivability">
                                      <el-radio-button label="是"></el-radio-button>
                                      <el-radio-button label="否"></el-radio-button>
                                    </el-radio-group>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">初次发现时间 :</span>
                                    <el-date-picker
                                      v-model="url.firstDiscoveryTime"
                                      type="datetime"
                                      placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">来源 :</span>
                                    <el-input
                                      placeholder="请输入来源"
                                      size="small"
                                      v-model="url.basic_source">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">可靠性
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="url.basic_sourceReliability" show-input></el-slider>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <span class="sub-title">webshell</span>
                            <div class="form-part">
                                <div class="form-item">
                                    <span class="form-left">请求方法 :</span>
                                    <el-select size="small" v-model="url.requestMethod" multiple>
                                        <el-option
                                          v-for="item in locals.methods"
                                          :label="item"
                                          :value="item">
                                        </el-option>
                                      </el-select>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">webshell类型 :</span>
                                    <el-select size="small" v-model="url.webshellType" multiple>
                                        <el-option
                                          v-for="item in serverInfo.webshellTypes"
                                          :label="item"
                                          :value="item">
                                        </el-option>
                                      </el-select>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">webshell所属页面名称 :</span>
                                    <el-input
                                      placeholder="请输入来源"
                                      v-model="url.pageName">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">来源 :</span>
                                    <el-input
                                      placeholder="请输入来源"
                                      v-model="url.ws_source">
                                    </el-input>
                                </div>
                                <div class="form-item">
                                    <span class="form-left">可靠性
                                        <el-tooltip class="item" effect="dark" content="0-30：不可靠；31-75：比较可靠；76-100：可靠" placement="top-start">
                                            <i class="iconfont">&#xe683;</i>
                                        </el-tooltip>
                                    :</span>
                                    <el-slider class="form-right" v-model="url.ws_sourceReliability" show-input></el-slider>
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
                                      v-model="url.note">
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
        </div>
    </div>



</template>

<script>
import { sections,methods } from '../../const/constants';
import { serverUrl }from '../../const/url'


export default {
  data(){
    return {
        locals:{
            sections,
            methods
        },
        serverInfo:{
            protocols:[],
            osList:[],
            geo: [],
            webshellTypes:[]
        },
        fullscreenLoading: false,
        ip:{
            ip: '',
            credibility: 0,
            discoveryTime: '',
            survivability: '是',
            credit_source: '',
            credit_sourceReliability: 0,

            protocals:[],
            os:'',
            portList:[],
            dev_source: '',
            dev_sourceReliability: 0,

            isp: '',
            vps: '',
            geo_source: '',
            geo_sourceReliability: 0,
            geo:{
                country:'',
                district: '',
                longtitude: '',
                latitude: ''
            },
            note:''

        },
        dns:{
            dns:'',
            credibility: 0,
            discoveryTime: '',
            credit_source: '',
            credit_sourceReliability: 0,

            Registrant: '',
            RegEmail: '',
            RegTime: '',
            ISP: '',
            whois_source: '',
            whois_sourceReliability: 0,

            note:''

        },

        url:{
            url: '',
            firstDiscoveryTime: '',
            actionTags: [],
            basic_source: '',
            basic_sourceReliability: 0,
            survivability: '是',

            requestMethod: '',
            webshellFile: '',
            webshellType: '',
            ws_source: '',
            ws_sourceReliability: 0,
            pageName:'',
            originalFile: '',
            note:''
        }
    }
  },
  computed:{
    transformedGeo(){
        return this.serverInfo.geo.reduce((prev,countryInfo)=>{
            prev[countryInfo.country] = countryInfo.district;
            return prev;
        },{});
    },
    countryList(){
        return Object.keys(this.transformedGeo);
    },
    districtList(){
        const choice = this.ip.geo.country;
        return this.transformedGeo[choice];
    }
  },

  mounted(){
    // this.fullscreenLoading = true;
    axios.get(serverUrl.serverInfo)
        .then(response=> {
            // debugger;
            this.fullscreenLoading = false;
            this.serverInfo = response.data;
        })
        .catch(err=>{
            console.log(err);
            this.fullscreenLoading = false;
            this.$message({message: "获取服务器数据失败，请刷新",type:'warning'});
        })

  },
  components: {

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
        this.ip.geo.district = '';
    },
    onSaveTargetForm(target){
        let {[target]:targetValue,...postBody} = this[target];
        axios.post(serverUrl.createInfo,{
            [targetValue]:postBody
        })
        .then(response=> {
            this.$message({message: `提交${target}成功`,type:'success'});
        })
        .catch(err=>{
            console.log(err);
            this.$message({message: `创建${target}失败`,type:'error'});
        });
    },
    onSaveIpForm(target){

        this.onSaveTargetForm(target);
        /*
        let {ip,...postBody} = this.ip;
        axios.post(serverUrl.createInfo,{
            [ip]:postBody
        })
        .then(response=> {
            this.$message({message: "提交ip成功",type:'success'});

        })
        .catch(err=>{
            console.log(err);
            this.$message({message: "创建ip失败",type:'error'});
        });
        console.log(this.ip);
        */
    }
  }
};
</script>


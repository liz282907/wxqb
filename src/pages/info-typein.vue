<template>
    <div class="my-info-container"  v-loading.fullscreen.lock ="fullscreenLoading">
        <aside class="info-nav">
            <ul >
                <li v-for="section in locals.sections" class="info-out-navitem" >
                    <a :href="'#'+section.id">{{section.name}}</a>
                    <ul >
                        <li v-for="item in section.children" class="info-inner-navitem">
                            <router-link :to=" '/app/management/info-typein#'+item.id ">{{item.name}}</router-link>
                            <!-- <a :href="'#'+item.id">{{item.name}}</a> -->
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
                <el-form ref="ipForm" :model="ip"  @submit.native.prevent="onSaveIpForm"
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
                        <el-button size="small" type="primary"  @click.native="onSaveIpForm" native-type="submit">保存</el-button>
                        <el-button size="small" @click.native.prevent>取消</el-button>
                    </div>
                </el-form>

            <div id="dns" class="section-item" ></div>


            </div>
        </div>
    </div>



</template>

<script>
import { sections } from '../../const/constants';
import { serverUrl }from '../../const/url'


export default {
  data(){
    return {
        locals:{
            sections,
        },
        serverInfo:{
            protocols:[],
            osList:[],
            geo: []
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
    this.fullscreenLoading = true;
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
    changeCountry(){
        this.ip.geo.district = '';
    },
    onSaveIpForm(){
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
    }
  }
};
</script>


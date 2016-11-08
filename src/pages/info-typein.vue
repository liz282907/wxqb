<template>
    <div class="my-info-container">
        <aside class="info-nav">
            <ul >
                <li v-for="section in locals.sections" class="info-out-navitem" >
                    <a :href="'#'+section.id">{{section.name}}</a>
                    <ul >
                        <li v-for="item in section.children" class="info-inner-navitem">
                            <a :href="'#'+item.id">{{item.name}}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
        <div class="info-main">
            <div id="ip">
                <h3 class="title">IP</h3>
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
                                 <el-select v-model="ip.protocals" multiple>
                                    <el-option
                                      v-for="item in serverInfo.protocals"
                                      :label="item"
                                      :value="item">
                                    </el-option>
                                  </el-select>
                            </div>
                            <div class="form-item">
                                <span class="form-left">操作系统 : </span>
                                 <el-select v-model="ip.os" >
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
                                  v-model="ip.textarea">
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>



</template>

<script>
import { sections } from '../../const/constants';
const protocals = [
    'HTTP','FTP','SMTP'
];
const osList = ['windows','MacOs','ubuntu'];

export default {
  data(){
    return {
        locals:{
            sections,
        },
        serverInfo:{
            protocals,
            osList
        },
        ip:{
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
        }
    }
  },
  computed:{

  },
  components: {

  },
  methods:{

  }
};
</script>


const navList = [
    { url: '/app/search', zh_name: '情报查询' },
    { url: '/app/management', zh_name: '情报管理' },
    { url: '/app/vis', zh_name: '可视分析' },
    // { url: '/sys-management', zh_name: '系统管理' },
];
const sections = [
    {
        name: '基本信息',
        id: 'ip',
        children: [
            { id: 'ip',name: 'IP'},
            { id: 'dns',name: 'DNS'},
            { id: 'url',name: 'URL'},
        ]
    },
    {
        name: '基础库',
        id: 'sample',
        children: [
            { id: 'sample',name: '样本库'},
            { id: 'socialDB',name: '社工库'},
        ]
    },
    {
        name: '其他',
        id:'hackerGroup',
        children: [
            { id: 'hackerGroup',name: '黑客组织'},
            { id: 'event',name: '安全事件'},
        ]
    },
    {
        name: '提交',
        id:'submit'
    }
];

const methods = ['POST','GET','PUT','PATCH','DELETE','OPTIONS'];

const defaultWigets = [
    {
        type: 'input',
        modelValue: 'input1',
        name: '输入框1',
        field: 'ip',
        placeholder:'',
    },
    {
        type: 'select',
        name: '下拉菜单1',
        modelValue: '选项1',
        field:'OS',
        options:{
            labels:'选项1,选项2,选项3',
            values:'value1,value2,value3'
        }
    },
    {
        type: 'slider',
        modelValue: 4,
        field:'Credibility',
        name: '等级bar',
        tooltip: '0-30：低；31-75：中；76-100：高',
        min:0,
        max:100,
    }
]


const wigetsOfIp = '[{"type":"input","modelValue":"input1","name":"互联网提供商","placeholder":"","field":"ISP","input":{"placeholder":""},"select":{"options":{"labels":"HTTPS,FTP","values":"HTTPS,FTP"}},"slider":{"tooltip":"","min":0,"max":100}},{"type":"select","name":"操作系统标识","modelValue":"select2","options":{"labels":"选项1,选项2,选项3","values":"value1,value2,value3"},"field":"OS","input":{"placeholder":""},"select":{"options":{"labels":"选项1,选项2,选项3","values":"value1,value2,value3"}},"slider":{"tooltip":"","min":0,"max":100}},{"type":"slider","modelValue":0,"name":"信誉度","tooltip":"0-30：低；31-75：中；76-100：高","min":0,"max":100,"field":"Credibility","input":{"placeholder":""},"select":{"options":{"labels":"HTTPS,FTP","values":"HTTP,FTP"}},"slider":{"tooltip":"0-30：低；31-75：中；76-100：高","min":0,"max":100}},{"modelValue":"input3","name":"所属机构","type":"input","field":"Organization","placeholder":""},{"modelValue":"select4","name":"涉及协议或应用","type":"select","field":"Protocol","options":{"labels":"HTTP,FTP","values":"HTTP,FTP"}},{"modelValue":"input5","name":"开放端口","type":"input","field":"Port","placeholder":""}]';
const serverDataOfIp = '{"ISP":"test-ISP","OS": "windows","Credibility": 70,"Organization":"信工所","Protocol": "HTTPS","Port": "443"}';

const wigetsOfDNS = '[{"type":"input","modelValue":"testPerson","name":"注册人","field":"Registrant","placeholder":"","input":{"field":"ip","placeholder":"请输入注册人"},"select":{"options":{}},"slider":{"tooltip":"","min":0,"max":100}},{"modelValue":"","name":"互联网提供商","type":"input","field":"ISP","placeholder":""},{"modelValue":"datepicker2","name":"注册时间","type":"datepicker","field":"RegTime"}]';
const serverDataOfDNS = '{"ISP":"test-ISP","Registrant":"liz","RegTime":""}';

const wigetsOfURL = '[{"type":"radio","modelValue":-1,"name":"存活性","field":"Survivability","placeholder":"","input":{"field":"ip","placeholder":""},"select":{"options":{}},"slider":{"tooltip":"","min":0,"max":100}},{"modelValue":"datepicker3","name":"初次发现时间","type":"datepicker","field":"FirstDiscoveryTime"},{"modelValue":"input4","name":"情报来源","type":"input","field":"Source","placeholder":""}]';
const serverDataOfURL = '{"Survivability":-1,"Source":"liz","FirstDiscoveryTime":""}';


const test = '[{"type":"slider","modelValue":4,"field":"Credibility","name":"等级bar","tooltip":"0-30：低；31-75：中；76-100：高","min":0,"max":100}]';
const wigetSettings = {
    ip: wigetsOfIp,
    ipData: serverDataOfIp,
    dns: wigetsOfDNS,
    dnsData: serverDataOfDNS,
    url: wigetsOfURL,
    urlData: serverDataOfURL,
    test
}


export { navList,sections,methods,defaultWigets,wigetSettings };

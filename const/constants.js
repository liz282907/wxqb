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
        modelName: 'input1',
        name: '输入框1',
        field: 'ip',
        placeholder:'',
    },
    {
        type: 'select',
        name: '下拉菜单1',
        modelName: 'select2',
        field:'OS',
        options:{
            labels:'选项1,选项2,选项3',
            values:'value1,value2,value3'
        }
    },
    {
        type: 'slider',
        modelName: 'slider3',
        field:'Credibility',
        name: '等级bar',
        tooltip: '0-30：低；31-75：中；76-100：高',
        min:0,
        max:100,
    }
]


const wigetsOfIp = '[{"type":"input","modelName":"input1","name":"互联网提供商","placeholder":"","field":"ISP","input":{"placeholder":""},"select":{"options":{"labels":"HTTP,FTP","values":"HTTP,FTP"}},"slider":{"tooltip":"","min":0,"max":100}},{"type":"select","name":"操作系统标识","modelName":"select2","options":{"labels":"选项1,选项2,选项3","values":"value1,value2,value3"},"field":"OS","input":{"placeholder":""},"select":{"options":{"labels":"选项1,选项2,选项3","values":"value1,value2,value3"}},"slider":{"tooltip":"","min":0,"max":100}},{"type":"slider","modelName":0,"name":"信誉度","tooltip":"0-30：低；31-75：中；76-100：高","min":0,"max":100,"field":"Credibility","input":{"placeholder":""},"select":{"options":{"labels":"HTTP,FTP","values":"HTTP,FTP"}},"slider":{"tooltip":"0-30：低；31-75：中；76-100：高","min":0,"max":100}},{"modelName":"input3","name":"所属机构","type":"input","field":"Organization","placeholder":""},{"modelName":"select4","name":"涉及协议或应用","type":"select","field":"Protocol","options":{"labels":"HTTP,FTP","values":"HTTP,FTP"}},{"modelName":"input5","name":"开放端口","type":"input","field":"Port","placeholder":""}]';
const test = '[{"type":"input","modelName":"test1","name":"输入框1","field":"ip","placeholder":""}]';
const wigetSettings = {
    ip: wigetsOfIp,
    test
}


export { navList,sections,methods,defaultWigets,wigetSettings };

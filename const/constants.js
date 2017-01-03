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
        placeholder:'',
    },
    {
        type: 'select',
        name: '下拉菜单1',
        modelName: 'select2',
        options:[
            {
                label: '选项1',
                value: 'value1'
            },
            {
                label: '选项2',
                value: 'value2'
            },
            {
                label: '选项3',
                value: 'value3'
            }
        ]
    },
    {
        type: 'slider',
        modelName: 'slider3',
        name: '等级bar',
        tooltip: '0-30：低；31-75：中；76-100：高',
        min:0,
        max:100,
    }
]


export { navList,sections,methods,defaultWigets };

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



export { navList,sections,methods };

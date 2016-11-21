const nav = [
    {
        "name":"情报查询",
        "id":"search",
        "url":"search"
    },
    {
        "name":"可视分析",
        "id":"vis",
        "url":"vis"
    },
    {
        "name":"情报管理",
        "id":"management",
        "url":"management"
    }
];

const navlistOfManagement = [
    {
        "name":"情报添加",
        "url":"/management/upload"
    },
     {
        "name":"情报修改",
        "url":"/management/update"
    },
     {
        "name":"情报下载",
        "url":"/management/download"
    }
];

// const base = 'http://10.10.20.140:8089/ip';
const localBase = '';
const serverUrl = {
    serverInfo: localBase+'ip/serverInfo',
    createInfo: localBase+ 'ip/serverInfo'
    // createInfo: localBase+ '/management/info/create'
}


export { nav,navlistOfManagement,serverUrl };
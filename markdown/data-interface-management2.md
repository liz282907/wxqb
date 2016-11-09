## 情报添加
>
@author: luchen

>email : chenlu.seu@gmail.com

### ip部分
请仔细核对下接口，包括是否从服务端获取、url定义、以及key,value部分的命名及类型:)

---

#### 从服务端预先获取的数据
1. 协议
2. 操作系统
3. 地理位置：国家、地区

```
//协议
url: yoursite.com/protocols
method: "get"
response:['HTTP','FTP'...]

//os
url: yoursite.com/osList
method: "get"
response:['windows','ubuntu',...]

//地理位置
url: yoursite.com/geo
method: "get"
response:[
    {
        "country": 'china',//如果是代号的话用下面这种
        "country":{
            "name": 'china',
            "id": 1
        },
        district: ['北京','上海'] //数据库中存的是英文的话，给出相应的中文。
        district:[
            {"name":"北京","value":"peking"},...
        ]
    }
]
```

**备注**： 

- 这几个接口是已有的还是还未创建的，如果未创建的话，希望能合并请求。
前端直接请求下示即可：

```
url: yoursite.com/serverInfo
method: "get"
response:{
    "protocols":['HTTP','FTP'...]//同上,
    "osList": [...]  //具体要求同上,
    "geo":{
        "country":
        "district":
    }
}

```

- 端口号的问题，65536个么还是？直接让用户输入？输入的话单个多个？。(用户直接输入，多个，list)


---

#### 情报添加的post请求

Q: 因为表众多，填写的时候是等所有的都填完再提交还是每张表填完提交？也涉及到url的问题。
A: 两者都可以,request里字典做区分

暂时是ip部分
```
url: yoursite.com/management/info/create
method: "post"
request:{
    "ip":{
            "credibility": 0,                 //是否有默认值？（最好没有默认值）
            "discoveryTime": '2016-11-09 13:18:28', //格式
            "survivability": '是',                  // or boolean?
            "credit_source": '',
            "credit_sourceReliability": 0,  //是否有默认值？（最好没有默认值）

            "protocals":['HTTP','FTP'],
            "os":'',                   //string or []?（string）
            "portList":[''],            // []？（[]）
            "dev_source": '',
            "dev_sourceReliability": 0,      

            "isp": '',
            "vps": '',
            "geo_source": '',
            "geo_sourceReliability": 0,    
            "geo":{
                "country":'中国',                // 代号orstring?(string)
                "district": '北京',              //中英文？(英文)
                "longtitude": '',   //string or num?
                "latitude": ''
            },
            note:''

        }
}
```




### 问题
1. 经纬度的输入问题，直接让用户输？
   可输，可不输。不输就是空

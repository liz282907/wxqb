function nameMap(oldName){
    var newName;

    switch(oldName){
    case "Organization":
        return "所属机构"
    case "ISP":
        return "互联网提供商"
    case "Credibility":
        return "信誉度"
    case "OS":
        return "操作系统标识"
    case "Protocol":
        return "涉及协议或应用"
    case "Port":
        return "开放端口"
    case "Tag":
        return "标签"
    case "MD5":
        return "MD5值"
    case "AnalysisTime":
        return "分析时间"       
    case "SampleType":
        return "样本分类"
    case "familycode":
        return "归属家族"
    case "ActionTag":
        return "行为标签"
    case "WebshellName":
        return "WEBShell 名称"
    case "RequestMethod":
        return "WEBShell交互方法"
    case "WebshellFile":
        return "WEBShell文件"
    case "Registrant":
        return "注册人"
    case "RegTime":
        return "注册时间"
    case "Survivability":
        return "存活性"
    case "FirstDiscoveryTime":
        return "初次发现时间"
    case "Source":
        return "情报来源"
    case "FileName":
        return "文件名"
    case "ThreatType":
        return "威胁类型"
    case "ThreatScale":
        return "威胁度"
    case "DownloadSampleMD5":
        return "样本链接"
    case "SourceReliability":
        return "来源可靠性"
    
    default:
        return oldName
    }

}

export{nameMap};